import { IWorld } from "./Interfaces";
import { SpawnAnchor, MinionType } from "./levelData";
import { MinionFactory } from "@/entities/MinionFactory";
import { TrigLUT } from "./TrigLUT";
import { GAUNTLET_STAGES, StageConfig } from "./design/GauntletStages";

export class EncounterDirector {
  private world: IWorld;
  private currentPhase = 1;
  private currentWaveIndex = 0;
  private waveClearTimer = 1.2;
  private isBetweenWaves = true;
  private activeStageConfig: StageConfig = GAUNTLET_STAGES[0];

  private unsubs: (() => void)[] = [];

  constructor(world: IWorld) {
    this.world = world;
    this.setupSubscriptions();
    this.reset();
  }

  private setupSubscriptions() {
    this.unsubs.push(
      this.world.events.subscribe("BOSS_PHASE_SHIFT", () => {
        this.currentPhase = Math.min(3, this.currentPhase + 1);
      })
    );

    this.unsubs.push(
      this.world.events.subscribe("MINION_DESPAWN_ALL", () => {
        this.despawnAllMinions();
      })
    );
  }

  public loadStage(stage: StageConfig) {
    this.activeStageConfig = stage;
    this.reset();
  }

  public update(dt: number) {
    if (this.world.boss && this.world.boss.isDead) {
      return;
    }

    // Clean up dead minions
    for (let i = this.world.minions.length - 1; i >= 0; i--) {
      const m = this.world.minions[i];
      if (m.isDead) {
        m.teardown();
        this.world.minions.splice(i, 1);
      }
    }

    const activeCount = this.world.minions.length;

    if (activeCount === 0 && !this.isBetweenWaves) {
      this.isBetweenWaves = true;
      this.waveClearTimer = 1.5; // colosseum-style buffer between waves
    }

    if (this.isBetweenWaves) {
      this.waveClearTimer -= dt;
      if (this.waveClearTimer <= 0) {
        this.isBetweenWaves = false;
        this.triggerNextWave();
      }
    }
  }

  private triggerNextWave() {
    const waves = this.activeStageConfig.encounterWaves;
    if (waves.length === 0) return;

    // Cycle through waves sequentially
    const wave = waves[this.currentWaveIndex % waves.length];
    this.currentWaveIndex++;

    const limit = Math.min(wave.maxActiveMinions, 4);

    for (let i = 0; i < limit; i++) {
      const entryRand = TrigLUT.randomGameplay() * 100;
      let accumulatedWeight = 0;
      let selectedEntry = wave.entries[0];

      for (const entry of wave.entries) {
        accumulatedWeight += entry.weight;
        if (entryRand <= accumulatedWeight) {
          selectedEntry = entry;
          break;
        }
      }

      const anchor = this.findSafeAnchor(selectedEntry.anchorIds, selectedEntry.anchorTags);
      if (anchor) {
        this.spawnMinion(selectedEntry.type, anchor);
      }
    }

    // Play colosseum rattle/confirm
    this.world.audio.playDashRecharge();
  }

  private findSafeAnchor(ids?: string[], tags?: string[]): SpawnAnchor | null {
    let candidates = this.activeStageConfig.spawnAnchors;

    if (ids && ids.length > 0) {
      candidates = candidates.filter((a) => ids.includes(a.id));
    } else if (tags && tags.length > 0) {
      candidates = candidates.filter((a) => a.tags.some((t) => tags.includes(t)));
    }

    if (candidates.length === 0) {
      return null;
    }

    const shuffled = [...candidates];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(TrigLUT.randomGameplay() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }

    const player = this.world.player;
    const boss = this.world.boss;

    for (const anchor of shuffled) {
      let isSafe = true;

      if (player) {
        const dx = player.position.x - anchor.x;
        const dy = player.position.y - anchor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 208) isSafe = false;
      }

      if (boss && isSafe) {
        const dx = boss.position.x - anchor.x;
        const dy = boss.position.y - anchor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 96) isSafe = false;
      }

      if (isSafe) {
        return anchor;
      }
    }

    return shuffled[0] || null;
  }

  private spawnMinion(type: MinionType, anchor: SpawnAnchor) {
    const minionId = `minion-${type}-${Date.now()}-${Math.floor(TrigLUT.randomGameplay() * 1000000)}`;
    const minion = MinionFactory.createMinion(type, minionId, { x: anchor.x, y: anchor.y }, this.world);
    this.world.minions.push(minion);
  }

  private despawnAllMinions() {
    for (const m of this.world.minions) {
      m.teardown();
    }
    this.world.minions = [];
  }

  public reset() {
    this.despawnAllMinions();
    this.currentPhase = 1;
    this.currentWaveIndex = 0;
    this.waveClearTimer = 1.2;
    this.isBetweenWaves = true;
  }

  public teardown() {
    this.unsubs.forEach((unsub) => unsub());
    this.unsubs = [];
    this.despawnAllMinions();
  }
}
