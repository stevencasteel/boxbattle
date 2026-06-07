import { Boss } from "@/entities/Boss";
import { Software3DRenderer } from "./Software3DRenderer";
import { GAUNTLET_STAGES } from "@/core/design/GauntletStages";
import { useSessionStore } from "@/store/useGameStore";

const getBossGeometry = (stageIdx: number, phase: number) => {
  const stage = GAUNTLET_STAGES[stageIdx] || GAUNTLET_STAGES[0];
  const seed = stageIdx * 1.37 + phase * 0.41;
  const corruption = 0.42 + stageIdx * 0.055 + phase * 0.08;

  if (stage.midBossId === "scarlet-lock") {
    return Software3DRenderer.getPrismGeometry("boss-scarlet-lock", [
      { x: -0.42, y: -0.5 }, { x: 0.42, y: -0.5 }, { x: 0.5, y: -0.08 },
      { x: 0.30, y: 0.5 }, { x: -0.30, y: 0.5 }, { x: -0.5, y: -0.08 }
    ], 0.68);
  }
  if (stage.midBossId === "carminal-orbit") {
    return Software3DRenderer.getRadialGeometry("boss-carminal-orbit", 8, 0.72 - phase * 0.05, Math.PI / 8, 0.7);
  }
  if (stage.midBossId === "vermilion-needle") {
    return Software3DRenderer.getPrismGeometry("boss-vermilion-needle", [
      { x: 0, y: -0.62 }, { x: 0.46, y: -0.16 }, { x: 0.18, y: 0.04 },
      { x: 0.36, y: 0.54 }, { x: 0, y: 0.36 }, { x: -0.36, y: 0.54 },
      { x: -0.18, y: 0.04 }, { x: -0.46, y: -0.16 }
    ], 0.62);
  }
  if (stage.midBossId === "marrow-king") {
    return Software3DRenderer.getRadialGeometry("boss-marrow-king", 10, 0.82, seed, 0.86);
  }
  if (stage.midBossId === "rust-cathedral") {
    return Software3DRenderer.getPrismGeometry("boss-rust-cathedral", [
      { x: -0.5, y: -0.44 }, { x: -0.12, y: -0.58 }, { x: 0.12, y: -0.58 },
      { x: 0.5, y: -0.44 }, { x: 0.42, y: 0.5 }, { x: 0.08, y: 0.34 },
      { x: -0.08, y: 0.34 }, { x: -0.42, y: 0.5 }
    ], 0.82);
  }
  if (stage.midBossId === "false-square") {
    return Software3DRenderer.getCorruptedBoxGeometry("boss-false-square", 0.95, performance.now() * 0.0006, 2);
  }

  return Software3DRenderer.getCorruptedBoxGeometry(stage.midBossId, corruption, seed, phase);
};

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
    const stage = GAUNTLET_STAGES[stageIdx] || GAUNTLET_STAGES[0];

    ctx.save();

    const baseColor = getBossColor(stageIdx, activeState, boss.health.isFlashing());

    const feetY = drawY + boss.size.height / 2;

    ctx.translate(drawX, feetY);
    ctx.rotate(boss.rotation);

    const yaw = 0.15 * boss.facingDirection + (boss.velocity.x / boss.lungeSpeed) * 0.45;
    const pitch = 0.08 + (boss.velocity.y / 1200) * 0.25;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = activeState === "TELEGRAPH" ? "hsla(45, 100%, 70%, 0.65)" : "hsla(350, 80%, 60%, 0.28)";
    ctx.lineWidth = activeState === "TELEGRAPH" ? 3.5 : 1.4;
    ctx.beginPath();
    ctx.ellipse(0, -boss.size.height / 2, boss.size.width * (0.74 + boss.currentPhase * 0.08), boss.size.height * 0.72, performance.now() * 0.0015, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    Software3DRenderer.drawGeometry(
      ctx,
      getBossGeometry(stageIdx, boss.currentPhase),
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
      "feet"
    );

    ctx.save();
    const localY = -boss.size.height / 2;
    ctx.globalAlpha = boss.health.isFlashing() ? 0.25 : 0.9;
    ctx.fillStyle = "rgba(4, 5, 8, 0.82)";
    if (stage.midBossId === "carminal-orbit") {
      ctx.beginPath();
      ctx.arc(0, localY, 8, 0, Math.PI * 2);
      ctx.arc(0, localY, 15, 0, Math.PI * 2);
      ctx.fill("evenodd");
    } else if (stage.midBossId === "false-square") {
      ctx.fillRect(-17, localY - 12, 10, 24);
      ctx.fillRect(7, localY - 12, 10, 24);
      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.fillRect(-3, localY - 3, 6, 6);
    } else {
      ctx.fillRect(boss.facingDirection * 7 - 3, localY - 7, 6, 5);
      ctx.fillRect(-boss.facingDirection * 8 - 2, localY - 5, 4, 4);
    }
    ctx.restore();

    ctx.restore();
  }
}
