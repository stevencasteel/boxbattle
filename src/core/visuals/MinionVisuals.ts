import { drawVisualProfile } from "./ShapeRenderer";
import { TrigLUT } from "@/core/TrigLUT";
import { BaseMinion } from "@/entities/BaseMinion";
import { Boss } from "@/entities/Boss";

interface CageSegment { x1: number; y1: number; x2: number; y2: number; color: string; width: number; }
const backCageScratch: CageSegment[] = [];
const frontCageScratch: CageSegment[] = [];

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
      const secondHalfProgress = spawnPct <= 0.5 ? 0 : (spawnPct - 0.5) / 0.5;

      const firstHalfProgress = spawnPct <= 0.5 ? spawnPct / 0.5 : 1.0;
      const t = 1.0 - firstHalfProgress;
      const accordionScale = 1.0 - t * t * t * TrigLUT.cos(firstHalfProgress * 3.5 * Math.PI);

      const staticFlicker = TrigLUT.random() < 0.04 ? 0.45 : 1.0;
      const cageAlpha = spawnPct <= 0.5 ? 0.85 * staticFlicker : (1.0 - secondHalfProgress) * 0.85 * staticFlicker;

      const boss = minion.world.boss;
      const phase = boss ? (boss as Boss).currentPhase || 1 : 1;
      let mColor = `hsla(194, 62%, 52%, ${cageAlpha})`;
      if (phase === 2) {
        mColor = `hsla(45, 100%, 60%, ${cageAlpha})`;
      } else if (phase === 3) {
        mColor = `hsla(350, 82%, 58%, ${cageAlpha})`;
      }

      const H = minion.size.height;
      const W = minion.size.width;
      const R = W * 0.72;

      const hMid = H / 2;

      const hBottom = hMid - hMid * accordionScale;
      const hTop = hMid + hMid * accordionScale;

      const isHex = minion.id.includes("TURRET") || minion.id.includes("SHIELDER") || minion.id.includes("BELL_HAMMER");
      const isTri = minion.id.includes("LANCER") || minion.id.includes("PIT_LANCER");
      const isFork = minion.id.includes("HYMN_NAIL");
      const isBubble = minion.id.includes("BLISTER_OX");

      if (isHex) {
        const segments = 6;
        const step = (Math.PI * 2) / segments;
        for (let i = 0; i < segments; i++) {
          const theta1 = i * step + nowTime * 0.001;
          const theta2 = (i + 1) * step + nowTime * 0.001;
          const x1 = R * TrigLUT.cos(theta1);
          const y1 = -hBottom + R * TrigLUT.sin(theta1) * 0.28;
          const x2 = R * TrigLUT.cos(theta2);
          const y2 = -hBottom + R * TrigLUT.sin(theta2) * 0.28;

          const isBehind = TrigLUT.sin((theta1 + theta2) / 2) < 0;
          const seg = { x1, y1, x2, y2, color: mColor, width: 2.0 };
          if (isBehind) backCageScratch.push(seg);
          else frontCageScratch.push(seg);
        }
      } else if (isTri) {
        const segments = 3;
        const step = (Math.PI * 2) / segments;
        for (let i = 0; i < segments; i++) {
          const theta1 = i * step + nowTime * 0.0015;
          const theta2 = (i + 1) * step + nowTime * 0.0015;
          const x1 = R * 1.2 * TrigLUT.cos(theta1);
          const y1 = -hBottom + R * 0.8 * TrigLUT.sin(theta1) * 0.28;
          const x2 = R * 1.2 * TrigLUT.cos(theta2);
          const y2 = -hBottom + R * 0.8 * TrigLUT.sin(theta2) * 0.28;

          const isBehind = TrigLUT.sin((theta1 + theta2) / 2) < 0;
          const seg = { x1, y1, x2, y2, color: mColor, width: 2.5 };
          if (isBehind) backCageScratch.push(seg);
          else frontCageScratch.push(seg);
        }
      } else if (isFork) {
        const xLeft = -W * 0.4;
        const xRight = W * 0.4;
        backCageScratch.push({ x1: xLeft, y1: -hBottom, x2: xLeft, y2: -hTop, color: mColor, width: 2.0 });
        frontCageScratch.push({ x1: xRight, y1: -hBottom, x2: xRight, y2: -hTop, color: mColor, width: 2.0 });
      } else if (isBubble) {
        const segments = 16;
        const step = (Math.PI * 2) / segments;
        for (let i = 0; i < segments; i++) {
          const theta1 = i * step;
          const theta2 = (i + 1) * step;
          const rPulse = R * (1.0 + 0.1 * Math.sin(nowTime * 0.008 + i));
          const x1 = rPulse * TrigLUT.cos(theta1);
          const y1 = -hBottom + rPulse * TrigLUT.sin(theta1) * 0.35;
          const x2 = rPulse * TrigLUT.cos(theta2);
          const y2 = -hBottom + rPulse * TrigLUT.sin(theta2) * 0.35;

          const isBehind = TrigLUT.sin((theta1 + theta2) / 2) < 0;
          const seg = { x1, y1, x2, y2, color: mColor, width: 1.5 };
          if (isBehind) backCageScratch.push(seg);
          else frontCageScratch.push(seg);
        }
      } else {
        const segments = 12;
        const step = (Math.PI * 2) / segments;
        for (let i = 0; i < segments; i++) {
          const theta1 = i * step + nowTime * 0.002;
          const theta2 = (i + 1) * step + nowTime * 0.002;
          const x1 = R * TrigLUT.cos(theta1);
          const y1 = -hBottom + R * TrigLUT.sin(theta1) * 0.28;
          const x2 = R * TrigLUT.cos(theta2);
          const y2 = -hBottom + R * TrigLUT.sin(theta2) * 0.28;

          const isBehind = TrigLUT.sin((theta1 + theta2) / 2) < 0;
          const seg = { x1, y1, x2, y2, color: mColor, width: 1.5 };
          if (isBehind) backCageScratch.push(seg);
          else frontCageScratch.push(seg);
        }
      }
    }

    const feetY = drawY + minion.size.height / 2;
    ctx.translate(drawX, feetY);
    ctx.rotate(minion.rotation);

    const drawCageSegments = (segments: CageSegment[]) => {
      for (let s = 0; s < segments.length; s++) {
        const seg = segments[s];
        ctx.strokeStyle = seg.color;
        ctx.lineWidth = seg.width;
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.stroke();
      }
    };

    if (minion.isSpawning) {
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.lineCap = "round";
      drawCageSegments(backCageScratch);
      ctx.restore();
    }

    ctx.save();

    if (minion.isSpawning) {
      const secondHalfProgress = spawnPct <= 0.5 ? 0 : (spawnPct - 0.5) / 0.5;
      ctx.globalAlpha = secondHalfProgress;
    } else if (minion.isDying) {
      const pct = minion.dissolveTimer / 0.5;
      ctx.globalAlpha = pct;
      ctx.translate(0, -minion.size.height / 2);
      ctx.scale(pct, pct);
      ctx.translate(0, minion.size.height / 2);
    }

    const profile = minion.getVisualProfile();
    const isTelegraph = minion.attackState === "TELEGRAPH";

    if (minion.health.isFlashing()) {
      profile.hueRole = "impact-white";
    } else if (isTelegraph) {
      profile.hueRole = "telegraph";
    }

    const drawW = minion.size.width * minion.visualScale.x;
    const drawH = minion.size.height * minion.visualScale.y;

    drawVisualProfile(ctx, 0, -minion.size.height / 2, drawW, drawH, profile, nowTime / 1000);

    const localY = -minion.size.height / 2;
    ctx.fillStyle = "black";
    ctx.fillRect(minion.facingDirection * 6.4 - 1.6, localY - 9.6, 4.8, 3.2);
    ctx.restore();

    if (minion.isSpawning) {
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.lineCap = "round";
      drawCageSegments(frontCageScratch);
      ctx.restore();
    }

    ctx.restore();
  }
}
