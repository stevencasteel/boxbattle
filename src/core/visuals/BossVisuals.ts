import { Boss } from "@/entities/Boss";
import { Software3DRenderer } from "./Software3DRenderer";
import { useSessionStore } from "@/store/useGameStore";

const getBossColor = (stageIdx: number, activeState: string, flashing: boolean): string => {
  if (flashing) return "hsl(0, 0%, 100%)";
  if (activeState === "TELEGRAPH") return "hsl(45, 100%, 60%)";
  if (stageIdx === 2) return "hsl(338, 76%, 55%)";
  if (stageIdx === 3) return "hsl(356, 94%, 62%)";
  if (stageIdx === 4) return "hsl(82, 38%, 44%)";
  if (stageIdx === 5) return "hsl(14, 76%, 48%)";
  if (stageIdx === 6) return "hsl(330, 82%, 64%)";
  return "hsl(350, 82%, 58%)";
};

export class BossVisuals {
  static draw(ctx: CanvasRenderingContext2D, boss: Boss, alpha: number): void {
    if (boss.isDead) return;

    const alphaVal = alpha !== undefined ? alpha : 1.0;
    const drawX = boss.previousPosition.x + (boss.position.x - boss.previousPosition.x) * alphaVal;
    const drawY = boss.previousPosition.y + (boss.position.y - boss.previousPosition.y) * alphaVal;

    const activeState = boss.activeStateName;
    const stageIdx = useSessionStore.getState().currentStageIndex;

    ctx.save();

    const baseColor = getBossColor(stageIdx, activeState, boss.health.isFlashing());
    const feetY = drawY + boss.size.height / 2;

    ctx.translate(drawX, feetY);
    ctx.rotate(boss.rotation);

    const nowTime = performance.now();
    const time = nowTime / 1000;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = activeState === "TELEGRAPH" ? "hsla(45, 100%, 70%, 0.65)" : "hsla(350, 80%, 60%, 0.28)";
    ctx.lineWidth = activeState === "TELEGRAPH" ? 3.5 : 1.4;
    ctx.beginPath();
    ctx.ellipse(0, -boss.size.height / 2, boss.size.width * (0.74 + boss.currentPhase * 0.08), boss.size.height * 0.72, time * 1.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    const geometry = Software3DRenderer.getTransformedBossGeometry(stageIdx, boss.currentPhase, time);

    const yaw = 0.15 * boss.facingDirection + (boss.velocity.x / boss.lungeSpeed) * 0.45;
    const pitch = 0.08 + (boss.velocity.y / 1200) * 0.25;

    Software3DRenderer.drawGeometry(
      ctx,
      geometry,
      0,
      0,
      boss.size.width,
      boss.size.height,
      boss.visualScale.x,
      boss.visualScale.y,
      yaw,
      pitch,
      0,
      baseColor,
      1.0,
      "feet",
      stageIdx
    );

    ctx.save();
    const localY = -boss.size.height / 2;
    ctx.globalAlpha = boss.health.isFlashing() ? 0.25 : 0.9;
    ctx.fillStyle = "rgba(4, 5, 8, 0.82)";
    ctx.fillRect(boss.facingDirection * 7 - 3, localY - 7, 6, 5);
    ctx.fillRect(-boss.facingDirection * 8 - 2, localY - 5, 4, 4);
    ctx.restore();

    ctx.restore();
  }
}
