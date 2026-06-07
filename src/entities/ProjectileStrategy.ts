import { IWorld, IEntity, IEventPublisher, EntityStatus } from "@/core/Interfaces";
import { TrigLUT } from "@/core/TrigLUT";
import { Software3DRenderer } from "@/core/visuals/Software3DRenderer";

export interface TrailDrawData {
    drawX: number; drawY: number; oldestX: number; oldestY: number;
    trail: {x: number, y: number}[]; trailHead: number; trailCount: number; trailRingSize: number;
    damage: number; customColor: string | null; projWidth: number; kind?: string;
}
export interface BodyDrawData {
    width: number; height: number; damage: number; customColor: string | null; kind?: string;
    velX: number; velY: number;
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

function drawTrailPath(ctx: CanvasRenderingContext2D, startX: number, startY: number, trail: {x: number, y: number}[], trailHead: number, trailCount: number, trailRingSize: number) {
    ctx.beginPath(); ctx.moveTo(startX, startY);
    for (let j = 0; j < trailCount; j++) {
        const idx = (trailHead - 1 - j + trailRingSize) % trailRingSize;
        ctx.lineTo(trail[idx].x, trail[idx].y);
    }
    ctx.stroke();
}

export class PlayerProjectileStrategy implements IProjectileStrategy {
    updateSparks(world: IEventPublisher, posX: number, posY: number, velX: number, velY: number, damage: number): void {
        const isLvl2 = damage >= 3;
        if (TrigLUT.random() < (isLvl2 ? 0.35 : 0.08)) {
            const angle = TrigLUT.atan2(velY, velX) + Math.PI + (TrigLUT.random() * 0.4 - 0.2);
            world.publishSpark(posX, posY, angle, isLvl2 ? "hsl(45, 100%, 65%)" : "hsl(142, 71%, 58%)", false, 1, "line");
        }
    }
    shouldCheckClashes(): boolean { return true; }
    getTargets(world: IWorld): IEntity[] {
        const targets: IEntity[] = [];
        if (world.boss && !world.boss.isDead) targets.push(world.boss);
        for (const minion of world.minions) if (minion && minion.status === EntityStatus.ACTIVE) targets.push(minion);
        return targets;
    }
    getProjIntensity(damage: number): number { return damage >= 3 ? 1.6 : 0.6; }
    getBlastColor(damage: number, _customColor: string | null): string { return damage >= 3 ? "hsl(45, 100%, 65%)" : "hsl(142, 71%, 58%)"; }
    getSparkCount(damage: number): number { return damage >= 3 ? 18 : 4; }
    getSparkTurbulence(damage: number): number { return damage >= 3 ? 20 : 5; }
    
    drawTrail(ctx: CanvasRenderingContext2D, data: TrailDrawData): void {
        const isLvl2 = data.damage >= 3;
        ctx.save(); ctx.lineCap = "round"; ctx.lineJoin = "round";
        const mainColor = isLvl2 ? "rgba(234, 179, 8, " : "rgba(34, 197, 94, ";
        const outerGrad = ctx.createLinearGradient(data.drawX, data.drawY, data.oldestX, data.oldestY);
        outerGrad.addColorStop(0.0, mainColor + "0.45)"); outerGrad.addColorStop(1.0, mainColor + "0.0)");
        ctx.strokeStyle = outerGrad; ctx.lineWidth = data.projWidth * 1.5;
        ctx.shadowColor = isLvl2 ? "rgba(234, 179, 8, 0.6)" : "rgba(34, 197, 94, 0.6)"; ctx.shadowBlur = 12;
        drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);
        ctx.restore();
    }

    drawBody(ctx: CanvasRenderingContext2D, data: BodyDrawData): void {
        const isLvl2 = data.damage >= 3;
        const angle = TrigLUT.atan2(data.velY, data.velX);
        ctx.save();
        ctx.translate(data.width / 2, data.height / 2); // Offset to center
        
        if (isLvl2) {
            const geom = Software3DRenderer.getPrismGeometry("proj-diamond", [{x:0,y:-0.5},{x:0.3,y:0},{x:0,y:0.5},{x:-0.3,y:0}], 0.8);
            Software3DRenderer.drawGeometry(ctx, geom, 0, 0, data.width * 1.5, data.height * 1.5, 1, 1, 0, 0, angle + Math.PI/2, "hsl(45, 100%, 60%)", 1.0, "center");
        } else {
            Software3DRenderer.drawGeometry(ctx, Software3DRenderer.BOX_GEOMETRY, 0, 0, data.width, data.height, 1, 1, 0, 0, angle + Math.PI/4, "hsl(142, 72%, 56%)", 1.0, "center");
        }
        ctx.restore();
    }
}

export class BossProjectileStrategy implements IProjectileStrategy {
    updateSparks(): void {}
    shouldCheckClashes(): boolean { return false; }
    getTargets(world: IWorld): IEntity[] { return world.player && !world.player.isDead ? [world.player] : []; }
    getProjIntensity(): number { return 1.0; }
    getBlastColor(_damage: number, customColor: string | null): string { return customColor || "hsl(350, 80%, 60%)"; }
    getSparkCount(): number { return 8; }
    getSparkTurbulence(): number { return 5; }
    
    drawTrail(ctx: CanvasRenderingContext2D, data: TrailDrawData): void {
        const trailColor = data.customColor || "hsl(350, 80%, 60%)";
        const alphaColor0 = trailColor.startsWith("hsl") ? trailColor.replace("hsl", "hsla").replace(")", ", 0.45)") : "rgba(239, 68, 68, 0.45)";
        const alphaColor1 = trailColor.startsWith("hsl") ? trailColor.replace("hsl", "hsla").replace(")", ", 0.0)") : "rgba(239, 68, 68, 0.0)";
        const grad = ctx.createLinearGradient(data.drawX, data.drawY, data.oldestX, data.oldestY);
        grad.addColorStop(0.0, alphaColor0); grad.addColorStop(1.0, alphaColor1);
        ctx.strokeStyle = grad; ctx.lineWidth = data.projWidth; ctx.lineCap = "round"; ctx.shadowBlur = 12;
        drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);
    }

    drawBody(ctx: CanvasRenderingContext2D, data: BodyDrawData): void {
        const angle = TrigLUT.atan2(data.velY, data.velX);
        const geom = Software3DRenderer.getPrismGeometry("proj-needle", [{x:0,y:-0.5},{x:0.2,y:0},{x:0,y:0.5},{x:-0.2,y:0}], 0.6);
        ctx.save();
        ctx.translate(data.width / 2, data.height / 2);
        Software3DRenderer.drawGeometry(ctx, geom, 0, 0, data.width * 2, data.height * 2, 1, 1, 0, 0, angle + Math.PI/2, data.customColor || "hsl(350, 82%, 58%)", 1.0, "center");
        ctx.restore();
    }
}

export const playerProjectileStrategy = new PlayerProjectileStrategy();
export const bossProjectileStrategy = new BossProjectileStrategy();
