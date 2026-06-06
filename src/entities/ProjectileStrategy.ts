import { IWorld, IEntity, IEventPublisher, EntityStatus } from "@/core/Interfaces";
import { TrigLUT } from "@/core/TrigLUT";

export type ProjectileKind =
  | "player-basic"
  | "player-charged"
  | "boss-bolt"
  | "boss-fan"
  | "boss-ring"
  | "minion-shot"
  | "shockwave";

export interface ProjectileOptions {
  kind: ProjectileKind;
  radius: number;
  trailLength: number;
  trailWidth: number;
  coreColor: string;
  rimColor: string;
  canClash: boolean;
  pierce: number;
  maxLifetime: number;
}

export interface TrailPoint {
  x: number;
  y: number;
}

export interface TrailDrawData {
  drawX: number;
  drawY: number;
  oldestX: number;
  oldestY: number;
  trail: TrailPoint[];
  trailHead: number;
  trailCount: number;
  trailRingSize: number;
  damage: number;
  customColor: string | null;
  projWidth: number;
  kind?: string;
}

export interface BodyDrawData {
  width: number;
  height: number;
  damage: number;
  customColor: string | null;
  kind?: string;
}

export interface IProjectileStrategy {
  updateSparks(world: IEventPublisher, posX: number, posY: number, velX: number, velY: number, damage: number): void;
  shouldCheckClashes(): boolean;
  getTargets(world: IWorld): IEntity[];
  getProjIntensity(damage: number): number;
  getBlastColor(damage: number, customColor: string | null): string;
  getSparkCount(damage: number): number;
  getSparkTurbulence(damage: number): number;
  drawTrail(ctx: CanvasRenderingContext2D, data: TrailDrawData): void;
  drawBody(ctx: CanvasRenderingContext2D, data: BodyDrawData): void;
}

function drawTrailPath(
  ctx: CanvasRenderingContext2D,
  startX: number, startY: number,
  trail: TrailPoint[], trailHead: number, trailCount: number, trailRingSize: number
) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  for (let j = 0; j < trailCount; j++) {
    const idx = (trailHead - 1 - j + trailRingSize) % trailRingSize;
    ctx.lineTo(trail[idx].x, trail[idx].y);
  }
  ctx.stroke();
}

export class PlayerProjectileStrategy implements IProjectileStrategy {
  updateSparks(world: IEventPublisher, posX: number, posY: number, velX: number, velY: number, damage: number): void {
    const isLvl2 = damage >= 3;
    const sparkChance = isLvl2 ? 0.35 : 0.08;
    if (TrigLUT.random() < sparkChance) {
      const angle = TrigLUT.atan2(velY, velX) + Math.PI + (TrigLUT.random() * 0.4 - 0.2);
      world.publishSpark(posX, posY, angle, isLvl2 ? "hsl(45, 100%, 65%)" : "hsl(142, 71%, 58%)", false, 1, "line");
    }
  }

  shouldCheckClashes(): boolean { return true; }

  getTargets(world: IWorld): IEntity[] {
    const targets: IEntity[] = [];
    if (world.boss && !world.boss.isDead) {
      targets.push(world.boss);
    }
    for (const minion of world.minions) {
      if (minion && minion.status === EntityStatus.ACTIVE) {
        targets.push(minion);
      }
    }
    return targets;
  }

  getProjIntensity(damage: number): number {
    return damage >= 3 ? 1.6 : 0.6;
  }

  getBlastColor(damage: number, _customColor: string | null): string {
    return damage >= 3 ? "hsl(45, 100%, 65%)" : "hsl(142, 71%, 58%)";
  }

  getSparkCount(damage: number): number {
    return damage >= 3 ? 18 : 4;
  }

  getSparkTurbulence(damage: number): number {
    return damage >= 3 ? 20 : 5;
  }

  drawTrail(ctx: CanvasRenderingContext2D, data: TrailDrawData): void {
    const isLvl2 = data.damage >= 3;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (isLvl2) {
      const outerGrad = ctx.createLinearGradient(data.drawX, data.drawY, data.oldestX, data.oldestY);
      outerGrad.addColorStop(0.0, "rgba(234, 179, 8, 0.45)");
      outerGrad.addColorStop(0.4, "rgba(34, 197, 94, 0.35)");
      outerGrad.addColorStop(1.0, "rgba(34, 197, 94, 0.0)");
      ctx.strokeStyle = outerGrad;
      ctx.lineWidth = data.projWidth * 1.5;
      ctx.shadowColor = "rgba(34, 197, 94, 0.6)";
      ctx.shadowBlur = 20;
      drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);

      const innerGrad = ctx.createLinearGradient(data.drawX, data.drawY, data.oldestX, data.oldestY);
      innerGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.95)");
      innerGrad.addColorStop(0.4, "rgba(234, 179, 8, 0.6)");
      innerGrad.addColorStop(1.0, "rgba(34, 197, 94, 0.0)");
      ctx.strokeStyle = innerGrad;
      ctx.lineWidth = data.projWidth * 0.45;
      ctx.shadowBlur = 0;
      drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);
    } else {
      const mainColor = "rgba(34, 197, 94, ";
      const outerGrad = ctx.createLinearGradient(data.drawX, data.drawY, data.oldestX, data.oldestY);
      outerGrad.addColorStop(0.0, mainColor + "0.35)");
      outerGrad.addColorStop(1.0, mainColor + "0.0)");
      ctx.strokeStyle = outerGrad;
      ctx.lineWidth = data.projWidth * 1.5;
      ctx.shadowColor = "rgba(34, 197, 94, 0.6)";
      ctx.shadowBlur = 12;
      drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);

      const innerGrad = ctx.createLinearGradient(data.drawX, data.drawY, data.oldestX, data.oldestY);
      innerGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.95)");
      innerGrad.addColorStop(1.0, mainColor + "0.0)");
      ctx.strokeStyle = innerGrad;
      ctx.lineWidth = data.projWidth * 0.45;
      ctx.shadowBlur = 0;
      drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);
    }
    ctx.restore();
  }

  drawBody(ctx: CanvasRenderingContext2D, data: BodyDrawData): void {
    const isLvl2 = data.damage >= 3;
    const radius = data.width / 2;
    ctx.save();
    if (isLvl2) {
      ctx.fillStyle = "hsl(45, 100%, 60%)";
      ctx.strokeStyle = "hsl(142, 72%, 56%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-radius, -radius);
      ctx.quadraticCurveTo(0, -radius * 1.5, radius, -radius);
      ctx.quadraticCurveTo(radius * 1.5, 0, radius, radius);
      ctx.quadraticCurveTo(0, radius * 1.5, -radius, radius);
      ctx.quadraticCurveTo(-radius * 1.5, 0, -radius, -radius);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-radius * 0.45, -radius * 0.45, radius * 0.9, radius * 0.9);
    } else {
      ctx.fillStyle = "hsl(142, 72%, 56%)";
      ctx.strokeStyle = "hsl(142, 100%, 80%)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.rect(-radius, -radius, data.width, data.height);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-radius * 0.4, -radius * 0.4, radius * 0.8, radius * 0.8);
    }
    ctx.restore();
  }
}

export class BossProjectileStrategy implements IProjectileStrategy {
  updateSparks(_world: IEventPublisher, _posX: number, _posY: number, _velX: number, _velY: number, _damage: number): void {
  }

  shouldCheckClashes(): boolean { return false; }

  getTargets(world: IWorld): IEntity[] {
    if (world.player && !world.player.isDead) {
      return [world.player];
    }
    return [];
  }

  getProjIntensity(_damage: number): number {
    return 1.0;
  }

  getBlastColor(_damage: number, customColor: string | null): string {
    return customColor || "hsl(350, 80%, 60%)";
  }

  getSparkCount(_damage: number): number {
    return 8;
  }

  getSparkTurbulence(_damage: number): number {
    return 5;
  }

  drawTrail(ctx: CanvasRenderingContext2D, data: TrailDrawData): void {
    const trailColor = data.customColor || "hsl(350, 80%, 60%)";
    const alphaColor0 = trailColor.startsWith("hsl")
      ? trailColor.replace("hsl", "hsla").replace(")", ", 0.45)")
      : "rgba(239, 68, 68, 0.45)";
    const alphaColor1 = trailColor.startsWith("hsl")
      ? trailColor.replace("hsl", "hsla").replace(")", ", 0.0)")
      : "rgba(239, 68, 68, 0.0)";
    const shadowCol = trailColor.startsWith("hsl")
      ? trailColor.replace("hsl", "hsla").replace(")", ", 0.5)")
      : "rgba(239, 68, 68, 0.5)";

    const grad = ctx.createLinearGradient(data.drawX, data.drawY, data.oldestX, data.oldestY);
    grad.addColorStop(0.0, alphaColor0);
    grad.addColorStop(1.0, alphaColor1);
    ctx.strokeStyle = grad;
    ctx.shadowColor = shadowCol;
    ctx.lineWidth = data.projWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowBlur = 12;
    drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);
  }

  drawBody(ctx: CanvasRenderingContext2D, data: BodyDrawData): void {
    const radius = data.width / 2;
    ctx.save();
    const bodyColor = data.customColor || "hsl(350, 82%, 58%)";
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = "hsl(0, 100%, 72%)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(-radius * 1.8, 0);
    ctx.lineTo(0, -radius * 0.35);
    ctx.lineTo(radius * 1.2, 0);
    ctx.lineTo(0, radius * 0.35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

export const playerProjectileStrategy = new PlayerProjectileStrategy();
export const bossProjectileStrategy = new BossProjectileStrategy();
