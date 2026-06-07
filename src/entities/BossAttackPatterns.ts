import { Boss } from "./Boss";

export type AttackTag = "projectile-heavy" | "melee" | "arena-denial" | "reposition";

export interface BossAttackContext {
  phase: number;
  distanceToPlayer: number;
  playerIsAirborne: boolean;
  playerHP: number;
  activeMinionsCount: number;
  recentAttackIds: string[];
  timeSinceLastProjectileHeavy: number;
}

export interface IBossAttackState {
  volleyCount: number;
  volleyTimer: number;
  durationTimer: number;
  getBoss(): Boss;
}

export interface AttackPattern {
  id: string;
  tags: AttackTag[];
  minPhase: 1 | 2 | 3;
  basePriority: number;
  score(ctx: BossAttackContext): number;
  configure(state: IBossAttackState): void;
}

// Stage 1 (Prime Wound) patterns
export class OmniBurstPattern implements AttackPattern {
  public id = "OMNI_BURST";
  public tags: AttackTag[] = ["projectile-heavy", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 40;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    let s = this.basePriority;
    if (ctx.distanceToPlayer < 250) s += 30;
    if (ctx.phase === 3) s += 15;
    return s;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.8;
  }
}

export class VolleyPattern implements AttackPattern {
  public id = "VOLLEY";
  public tags: AttackTag[] = ["projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 45;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    let s = this.basePriority;
    if (ctx.distanceToPlayer > 300) s += 25;
    if (ctx.phase === 1) s -= 10;
    return s;
  }

  public configure(state: IBossAttackState): void {
    const phase = state.getBoss().currentPhase;
    state.volleyCount = phase === 1 ? 3 : phase === 2 ? 6 : 10;
    state.volleyTimer = 0;
    state.durationTimer = phase === 1 ? 0.8 : phase === 2 ? 1.2 : 1.6;
  }
}

// Stage 2 (Scarlet Lock) patterns
export class GateDropPattern implements AttackPattern {
  public id = "GATE_DROP";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.phase * 10);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 3;
    state.volleyTimer = 0;
    state.durationTimer = 1.5;
  }
}

export class LockstepVolleyPattern implements AttackPattern {
  public id = "LOCKSTEP_VOLLEY";
  public tags: AttackTag[] = ["projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 40;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.distanceToPlayer > 200 ? 15 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 4;
    state.volleyTimer = 0;
    state.durationTimer = 1.4;
  }
}

// Stage 3 (Carminal Orbit) patterns
export class AphelionRingPattern implements AttackPattern {
  public id = "APHELION_RING";
  public tags: AttackTag[] = ["projectile-heavy", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 55;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.2;
  }
}

export class PerihelionDivePattern implements AttackPattern {
  public id = "PERIHELION_DIVE";
  public tags: AttackTag[] = ["melee", "reposition"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 60;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.playerIsAirborne ? 20 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

// Stage 4 (Vermilion Needle) patterns
export class NeedleRainPattern implements AttackPattern {
  public id = "NEEDLE_RAIN";
  public tags: AttackTag[] = ["projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 5;
    state.volleyTimer = 0;
    state.durationTimer = 1.5;
  }
}

export class DashThreadPattern implements AttackPattern {
  public id = "DASH_THREAD";
  public tags: AttackTag[] = ["melee", "reposition"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 55;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.9;
  }
}

// Stage 5 (Marrow King) patterns
export class BellyTidePattern implements AttackPattern {
  public id = "BELLY_TIDE";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (!ctx.playerIsAirborne ? 20 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class BlisterSpawnPattern implements AttackPattern {
  public id = "BLISTER_SPAWN";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 45;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.activeMinionsCount < 2 ? 25 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.6;
  }
}

// Stage 6 (Rust Cathedral) patterns
export class CathedralTollPattern implements AttackPattern {
  public id = "CATHEDRAL_TOLL";
  public tags: AttackTag[] = ["arena-denial", "projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 60;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.5;
  }
}

export class FallingNavePattern implements AttackPattern {
  public id = "FALLING_NAVE";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.distanceToPlayer < 200 ? 15 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 4;
    state.volleyTimer = 0;
    state.durationTimer = 1.8;
  }
}

// Base helper patterns
export class FanBurstPattern implements AttackPattern {
  public id = "FAN_BURST";
  public tags: AttackTag[] = ["projectile-heavy", "reposition"];
  public minPhase: 1 | 2 | 3 = 2;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    if (ctx.phase < this.minPhase) return 0;
    let s = this.basePriority;
    if (ctx.playerIsAirborne) s += 35;
    return s;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.7;
  }
}

export class PredictiveShotPattern implements AttackPattern {
  public id = "PREDICTIVE_SHOT";
  public tags: AttackTag[] = ["projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 30;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    let s = this.basePriority;
    if (ctx.distanceToPlayer > 200) s += 20;
    return s;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.6;
  }
}

export class GapRingPattern implements AttackPattern {
  public id = "GAP_RING";
  public tags: AttackTag[] = ["projectile-heavy", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 3;
  public basePriority = 70;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    if (ctx.phase < this.minPhase) return 0;
    return this.basePriority + (ctx.playerHP <= 2 ? 20 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class CompressionMarchPattern implements AttackPattern {
  public id = "COMPRESSION_MARCH";
  public tags: AttackTag[] = ["arena-denial", "reposition"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.2;
  }
}

export class SatelliteTaxPattern implements AttackPattern {
  public id = "SATELLITE_TAX";
  public tags: AttackTag[] = ["projectile-heavy", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 55;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class PogoTaxPattern implements AttackPattern {
  public id = "POGO_TAX";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 55;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class SicknessLeanPattern implements AttackPattern {
  public id = "SICKNESS_LEAN";
  public tags: AttackTag[] = ["arena-denial", "reposition"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class WeightTransferPattern implements AttackPattern {
  public id = "WEIGHT_TRANSFER";
  public tags: AttackTag[] = ["melee", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 60;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.5;
  }
}

export const ALL_PATTERNS: AttackPattern[] = [
  new CompressionMarchPattern(),
  new SatelliteTaxPattern(),
  new PogoTaxPattern(),
  new SicknessLeanPattern(),
  new WeightTransferPattern(),

  new OmniBurstPattern(),
  new VolleyPattern(),
  new GateDropPattern(),
  new LockstepVolleyPattern(),
  new AphelionRingPattern(),
  new PerihelionDivePattern(),
  new NeedleRainPattern(),
  new DashThreadPattern(),
  new BellyTidePattern(),
  new BlisterSpawnPattern(),
  new CathedralTollPattern(),
  new FallingNavePattern(),
  new FanBurstPattern(),
  new PredictiveShotPattern(),
  new GapRingPattern()
];

export function selectBestAttack(ctx: BossAttackContext): AttackPattern {
  // Allow our unified single boss to access all attack patterns
  const candidates = ALL_PATTERNS;

  let bestPattern = candidates[0] || ALL_PATTERNS[0];
  let highestScore = -1;

  for (const p of candidates) {
    const score = p.score(ctx);
    if (score > highestScore) {
      highestScore = score;
      bestPattern = p;
    }
  }

  return bestPattern;
}
