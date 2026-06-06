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

export const ALL_PATTERNS: AttackPattern[] = [
  new OmniBurstPattern(),
  new VolleyPattern(),
  new FanBurstPattern(),
  new PredictiveShotPattern(),
  new GapRingPattern()
];

export function selectBestAttack(ctx: BossAttackContext): AttackPattern {
  let bestPattern = ALL_PATTERNS[0];
  let highestScore = -1;

  for (const p of ALL_PATTERNS) {
    const score = p.score(ctx);
    if (score > highestScore) {
      highestScore = score;
      bestPattern = p;
    }
  }

  return bestPattern;
}
