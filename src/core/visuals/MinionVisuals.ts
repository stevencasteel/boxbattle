import { Software3DRenderer } from "./Software3DRenderer";
import { TrigLUT } from "@/core/TrigLUT";
import { BaseMinion } from "@/entities/BaseMinion";
import { Boss } from "@/entities/Boss";
import { ShapeFamily } from "./ShapeRenderer";

interface CageSegment { x1: number; y1: number; x2: number; y2: number; color: string; width: number; }
const backCageScratch: CageSegment[] = [];
const frontCageScratch: CageSegment[] = [];

const getShapePoints = (family: ShapeFamily): {x: number, y: number}[] => {
    switch(family) {
        case "diamond": return [{x:0,y:-0.5},{x:0.5,y:0},{x:0,y:0.5},{x:-0.5,y:0}];
        case "kite": return [{x:0,y:-0.5},{x:0.4,y:-0.1},{x:0,y:0.5},{x:-0.4,y:-0.1}];
        case "needle": return [{x:0,y:-0.5},{x:0.15,y:0},{x:0,y:0.5},{x:-0.15,y:0}];
        case "hex": return Array.from({length: 6}, (_, i) => ({ x: Math.cos(i * Math.PI / 3) * 0.5, y: Math.sin(i * Math.PI / 3) * 0.5 }));
        case "saw": return Array.from({length: 16}, (_, i) => {
            const r = i % 2 === 0 ? 0.52 : 0.33;
            return { x: Math.cos(i * Math.PI / 8) * r, y: Math.sin(i * Math.PI / 8) * r };
        });
        case "orb":
        case "blister": return Array.from({length: 10}, (_, i) => {
            const wobble = family === "blister" ? 1 + Math.sin(i * 2.1) * 0.09 : 1;
            return { x: Math.cos(i * Math.PI / 5) * 0.45 * wobble, y: Math.sin(i * Math.PI / 5) * 0.45 * wobble };
        });
        default: return [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5}]; // corrupted-box fallback
    }
};

const drawRoleGlyph = (ctx: CanvasRenderingContext2D, family: ShapeFamily, facing: number, localY: number, width: number, height: number) => {
    ctx.save();
    ctx.fillStyle = "rgba(3, 5, 8, 0.78)";
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 1;
    if (family === "needle" || family === "kite") {
        ctx.beginPath();
        ctx.moveTo(facing * 3, localY - height * 0.28);
        ctx.lineTo(facing * 10, localY);
        ctx.lineTo(facing * 3, localY + height * 0.28);
        ctx.stroke();
    } else if (family === "diamond" || family === "hex") {
        ctx.fillRect(facing * 6 - 2, localY - 8, 4, 4);
        ctx.fillRect(-facing * 4 - 1.5, localY + 4, 3, 3);
    } else if (family === "blister" || family === "corrupted-box") {
        ctx.beginPath();
        ctx.arc(-width * 0.15, localY - 4, 4, 0, Math.PI * 2);
        ctx.arc(width * 0.18, localY + 5, 5, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillRect(facing * 6.4 - 1.6, localY - 9.6, 4.8, 3.2);
    }
    ctx.restore();
};

export class MinionVisuals {
    static draw(ctx: CanvasRenderingContext2D, minion: BaseMinion, alpha: number): void {
        if (minion.isDead) return;
        const alphaVal = alpha !== undefined ? alpha : 1.0;
        const drawX = minion.previousPosition.x + (minion.position.x - minion.previousPosition.x) * alphaVal;
        const drawY = minion.previousPosition.y + (minion.position.y - minion.previousPosition.y) * alphaVal;
        const nowTime = performance.now();
        
        backCageScratch.length = 0;
        frontCageScratch.length = 0;
        const totalSpawnTime = 1.2;
        const elapsedTime = totalSpawnTime - minion.spawnTimer;
        const spawnPct = Math.max(0, Math.min(1.0, elapsedTime / totalSpawnTime));

        ctx.save();
        if (minion.isSpawning) {
            const profile = minion.getVisualProfile();
            const points = getShapePoints(profile.shapeFamily);
            const sides = points.length;
            const H = minion.size.height;
            const W = minion.size.width;
            const R = W * 0.72;
            const rotation = nowTime * 0.005;
            const hBottom = (H / 2) - (H / 2) * (1.0 - spawnPct);
            const hTop = (H / 2) + (H / 2) * (1.0 - spawnPct);
            const ringHeights = [hBottom, (hBottom + hTop) / 2, hTop];
            
            const boss = minion.world.boss;
            const phase = boss ? (boss as Boss).currentPhase || 1 : 1;
            let mColor = `hsla(194, 62%, 52%, ${0.85})`;
            if (phase === 2) mColor = `hsla(45, 100%, 60%, ${0.85})`;
            else if (phase === 3) mColor = `hsla(350, 82%, 58%, ${0.85})`;

            for (let rIdx = 0; rIdx < ringHeights.length; rIdx++) {
                const hHeight = ringHeights[rIdx];
                const dir = rIdx % 2 === 0 ? 1 : -1;
                const ringRotation = rotation * dir;
                for (let i = 0; i < sides; i++) {
                    const p1 = points[i];
                    const p2 = points[(i + 1) % sides];
                    const x1 = p1.x * R * 2; const y1 = -hHeight + p1.y * R * 0.5;
                    const x2 = p2.x * R * 2; const y2 = -hHeight + p2.y * R * 0.5;
                    const thetaMid = ((i + 0.5) * Math.PI * 2) / sides + ringRotation;
                    const isBehind = TrigLUT.sin(thetaMid) < 0;
                    const segment = { x1, y1, x2, y2, color: mColor, width: 1.5 };
                    if (isBehind) backCageScratch.push(segment); else frontCageScratch.push(segment);
                }
            }
        }

        const feetY = drawY + minion.size.height / 2;
        ctx.translate(drawX, feetY);
        ctx.rotate(minion.rotation);

        if (minion.isSpawning) {
            ctx.save();
            ctx.shadowBlur = 10; ctx.lineCap = "round";
            for (const seg of backCageScratch) { ctx.strokeStyle = seg.color; ctx.lineWidth = seg.width; ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke(); }
            ctx.restore();
        }

        ctx.save();
        if (minion.isSpawning) {
            ctx.globalAlpha = spawnPct;
        } else if (minion.isDying) {
            const pct = minion.dissolveTimer / 0.5;
            ctx.globalAlpha = pct;
            ctx.translate(0, -minion.size.height / 2);
            ctx.scale(pct, pct);
            ctx.translate(0, minion.size.height / 2);
        }

        const profile = minion.getVisualProfile();
        const points = getShapePoints(profile.shapeFamily);
        const geom = profile.shapeFamily === "corrupted-box"
            ? Software3DRenderer.getCorruptedBoxGeometry(minion.id, profile.corruption, profile.phaseOffset + minion.size.width, profile.danger > 0.5 ? 1 : 0)
            : profile.shapeFamily === "saw"
              ? Software3DRenderer.getRadialGeometry(minion.id + "-saw", profile.spikeCount || 8, 0.62, profile.phaseOffset, 0.44)
              : Software3DRenderer.getPrismGeometry(minion.id + "-geom-" + profile.shapeFamily, points, 0.4 + profile.weight * 0.28);
        
        const yaw = 0.15 * minion.facingDirection + (minion.velocity.x / 450) * 0.35;
        const pitch = 0.08 + (minion.velocity.y / 1000) * 0.22;
        const pivotY = minion.squashPivot === "feet" ? "feet" : "center";
        const posY = pivotY === "feet" ? 0 : -minion.size.height / 2;
        const localY = minion.squashPivot === "feet" ? -minion.size.height / 2 : 0;

        let baseColor = minion.minionColor;
        if (minion.health.isFlashing()) baseColor = "hsl(0, 0%, 100%)";
        else if (minion.attackState === "TELEGRAPH") baseColor = "hsl(45, 100%, 50%)";

        const roll = profile.spinRate !== 0 ? nowTime * 0.001 * profile.spinRate : 0;
        Software3DRenderer.drawGeometry(ctx, geom, 0, posY, minion.size.width, minion.size.height, minion.visualScale.x, minion.visualScale.y, yaw, pitch, roll, baseColor, 1.0, pivotY);

        drawRoleGlyph(ctx, profile.shapeFamily, minion.facingDirection, localY, minion.size.width, minion.size.height);
        ctx.restore();

        if (minion.isSpawning) {
            ctx.save();
            ctx.shadowBlur = 10; ctx.lineCap = "round";
            for (const seg of frontCageScratch) { ctx.strokeStyle = seg.color; ctx.lineWidth = seg.width; ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke(); }
            ctx.restore();
        }
        ctx.restore();
    }
}
