import { IWorld } from "./Interfaces";
import { SpawnAnchor, defaultLevelConfig, MinionType } from "./levelData";
import { MinionFactory } from "@/entities/MinionFactory";
import { TrigLUT } from "./TrigLUT";

export class EncounterDirector {
  private world: IWorld;
  private currentPhase = 1;
  private elapsedFightTime = 0;
  private spawnCooldownTimer = 12.0;

  private unsubs: (() => void)[] = [];

  constructor(world: IWorld) {
    this.world = world;
    this.setupSubscriptions();
    this.spawnInitialPlaytestMinions();
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

  public update(dt: number) {
    if (this.world.boss && this.world.boss.isDead) {
      return;
    }

    this.elapsedFightTime += dt;

    for (let i = this.world.minions.length - 1; i >= 0; i--) {
      const m = this.world.minions[i];
      if (m.isDead) {
        m.teardown();
        this.world.minions.splice(i, 1);
      }
    }

    const activeCount = this.world.minions.length;
    const maxBudget = this.currentPhase === 1 ? 2 : this.currentPhase === 2 ? 3 : 5;

    if (this.spawnCooldownTimer > 0) {
      this.spawnCooldownTimer -= dt;
      return;
    }

    if (activeCount < maxBudget) {
      this.triggerNextWave();
    }
  }

  private triggerNextWave() {
    const waves = defaultLevelConfig.encounterWaves.filter(
      (w) => w.phase === this.currentPhase && this.elapsedFightTime >= (w.earliestTime || 0)
    );

    if (waves.length === 0) return;

    const rand = TrigLUT.randomGameplay();
    const waveIdx = Math.floor(rand * waves.length);
    const selectedWave = waves[waveIdx];

    const entriesToSpawn = selectedWave.maxActiveMinions;
    const activeCount = this.world.minions.length;
    const maxBudget = this.currentPhase === 1 ? 2 : this.currentPhase === 2 ? 3 : 5;
    const spaceInBudget = maxBudget - activeCount;
    const limit = Math.min(entriesToSpawn, spaceInBudget);

    for (let i = 0; i < limit; i++) {
      const entryRand = TrigLUT.randomGameplay() * 100;
      let accumulatedWeight = 0;
      let selectedEntry = selectedWave.entries[0];

      for (const entry of selectedWave.entries) {
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

    const minCd = selectedWave.cooldownRange[0];
    const maxCd = selectedWave.cooldownRange[1];
    this.spawnCooldownTimer = minCd + TrigLUT.randomGameplay() * (maxCd - minCd);
  }

  private findSafeAnchor(ids?: string[], tags?: string[]): SpawnAnchor | null {
    let candidates = defaultLevelConfig.spawnAnchors;

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
        if (dist < 260) isSafe = false;
      }

      if (boss && isSafe) {
        const dx = boss.position.x - anchor.x;
        const dy = boss.position.y - anchor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) isSafe = false;
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

  private spawnInitialPlaytestMinions() {
    const turretAnchor = defaultLevelConfig.spawnAnchors.find(a => a.id === "left-catwalk");
    if (turretAnchor) {
      this.spawnMinion("TURRET", turretAnchor);
    }

    const lancerAnchor = defaultLevelConfig.spawnAnchors.find(a => a.id === "center-bridge");
    if (lancerAnchor) {
      this.spawnMinion("LANCER", lancerAnchor);
    }

    const flyerAnchor = defaultLevelConfig.spawnAnchors.find(a => a.id === "upper-air-left");
    if (flyerAnchor) {
      this.spawnMinion("FLYER", flyerAnchor);
    }

    const shielderAnchor = defaultLevelConfig.spawnAnchors.find(a => a.id === "left-ground");
    if (shielderAnchor) {
      this.spawnMinion("SHIELDER", shielderAnchor);
    }
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
    this.elapsedFightTime = 0;
    this.spawnCooldownTimer = 12.0;
    this.spawnInitialPlaytestMinions();
  }

  public teardown() {
    this.unsubs.forEach((unsub) => unsub());
    this.unsubs = [];
    this.despawnAllMinions();
  }
}
