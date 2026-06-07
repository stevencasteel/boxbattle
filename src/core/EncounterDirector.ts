import { distance } from "@/core/VecUtils";
import { IWorld } from "./Interfaces";
import { SpawnAnchor, MinionType, EncounterWave } from "./levelData";
import { BaseMinion } from "@/entities/BaseMinion";
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

  private spawnsLeftInWave = 0;
  private spawnCooldownTimer = 0;
  private readonly trickleCooldown = 0.8;

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

    for (let i = this.world.minions.length - 1; i >= 0; i--) {
      const m = this.world.minions[i];
      if (m.isDead) {
        m.teardown();
        this.world.minions.splice(i, 1);
      }
    }

    const waves = this.activeStageConfig.encounterWaves;
    if (waves.length === 0) return;

    const activeWave = waves[this.currentWaveIndex % waves.length];
    const activeCount = this.world.minions.length;

    const scaledMaxActive = Math.ceil(activeWave.maxActiveMinions * 1.5);

    if (this.isBetweenWaves) {
      this.waveClearTimer -= dt;
      if (this.waveClearTimer <= 0) {
        this.isBetweenWaves = false;
        this.startNewWave(activeWave, scaledMaxActive);
      }
    } else {
      if (this.spawnsLeftInWave > 0 && activeCount < scaledMaxActive) {
        this.spawnCooldownTimer -= dt;
        if (this.spawnCooldownTimer <= 0) {
          this.spawnCooldownTimer = this.trickleCooldown;
          const spawnCountToTrigger = Math.min(2, scaledMaxActive - activeCount);
          for (let k = 0; k < spawnCountToTrigger; k++) {
            this.spawnNextMinion(activeWave);
          }
        }
      }

      if (this.spawnsLeftInWave <= 0 && activeCount === 0) {
        this.isBetweenWaves = true;
        this.waveClearTimer = 2.0;
        this.currentWaveIndex++;
      }
    }
  }

  private startNewWave(wave: EncounterWave, scaledMaxActive: number) {
    const quotaMultiplier = 2.0;
    this.spawnsLeftInWave = Math.max(scaledMaxActive, Math.floor(scaledMaxActive * quotaMultiplier));
    this.spawnCooldownTimer = 0.5;

    const initialSpawns = Math.min(this.spawnsLeftInWave, scaledMaxActive);
    for (let i = 0; i < initialSpawns; i++) {
      this.spawnNextMinion(wave);
    }
  }

  private getMinionThreatValue(type: MinionType): number {
    switch (type) {
      case "TURRET": return 2;
      case "LANCER": return 2;
      case "PIT_LANCER": return 3;
      case "FLYER": return 2;
      case "COMPASS_WASP": return 3;
      case "CLAMPJAW": return 4;
      case "SHIELDER": return 3;
      case "HYMN_NAIL": return 2;
      case "BLISTER_OX": return 5;
      case "BELL_HAMMER": return 4;
      case "SHARD_CHOIR": return 1;
      default: return 2;
    }
  }

  private spawnNextMinion(wave: EncounterWave) {
    if (this.spawnsLeftInWave <= 0) return;

    const bossActive = this.world.boss && !this.world.boss.isDead;
    const maxThreatBudget = bossActive ? 6 : 12;

    let activeThreat = 0;
    for (const m of this.world.minions) {
      activeThreat += this.getMinionThreatValue((m as BaseMinion).minionType);
    }

    let totalWeight = 0;
    for (const entry of wave.entries) totalWeight += entry.weight;
    const entryRand = TrigLUT.randomGameplay() * totalWeight;
    let accumulatedWeight = 0;
    let selectedEntry = wave.entries[0];

    for (const entry of wave.entries) {
      accumulatedWeight += entry.weight;
      if (entryRand <= accumulatedWeight) {
        selectedEntry = entry;
        break;
      }
    }

    const candidateThreat = this.getMinionThreatValue(selectedEntry.type);
    if (activeThreat + candidateThreat > maxThreatBudget) {
      return;
    }

    const anchor = this.findSafeAnchor(selectedEntry.anchorIds, selectedEntry.anchorTags);
    if (anchor) {
      this.spawnMinion(selectedEntry.type, anchor);
      this.spawnsLeftInWave--;
      this.world.audio.playDashRecharge();
    }
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

    const player = this.world.player;
    const boss = this.world.boss;

    let bestAnchor: SpawnAnchor | null = null;
    let highestSafetyScore = -Infinity;

    for (const anchor of candidates) {
      const dp = player ? distance(player.position, anchor) : 500;
      const db = boss ? distance(boss.position, anchor) : 500;

      let safetyScore = dp * 1.0 + db * 0.45;

      if (dp < 160) safetyScore -= 300;
      if (db < 80) safetyScore -= 150;

      if (safetyScore > highestSafetyScore) {
        highestSafetyScore = safetyScore;
        bestAnchor = anchor;
      }
    }

    return bestAnchor || candidates[0] || null;
  }

  private spawnMinion(type: MinionType, anchor: SpawnAnchor) {
    if (type === "SHARD_CHOIR") {
      const offsets = [
        { dx: 0, dy: -30 },
        { dx: -35, dy: 15 },
        { dx: 35, dy: 15 }
      ];
      offsets.forEach((offset, idx) => {
        const minionId = `minion-SHARD_CHOIR-${Date.now()}-${idx}-${Math.floor(TrigLUT.randomGameplay() * 1000000)}`;
        const minion = MinionFactory.createMinion("SHARD_CHOIR", minionId, { x: anchor.x + offset.dx, y: anchor.y + offset.dy }, this.world);
        this.world.minions.push(minion);
      });
    } else {
      const minionId = `minion-${type}-${Date.now()}-${Math.floor(TrigLUT.randomGameplay() * 1000000)}`;
      const minion = MinionFactory.createMinion(type, minionId, { x: anchor.x, y: anchor.y }, this.world);
      this.world.minions.push(minion);
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
    this.currentWaveIndex = 0;
    this.waveClearTimer = 1.2;
    this.isBetweenWaves = true;
    this.spawnsLeftInWave = 0;
    this.spawnCooldownTimer = 0;
  }

  public teardown() {
    this.unsubs.forEach((unsub) => unsub());
    this.unsubs = [];
    this.despawnAllMinions();
  }
}
