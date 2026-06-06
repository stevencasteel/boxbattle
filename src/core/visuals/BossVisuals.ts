import { Boss } from "@/entities/Boss";
import { Software3DRenderer } from "./Software3DRenderer";

export class BossVisuals {
  static draw(ctx: CanvasRenderingContext2D, boss: Boss, alpha: number): void {
    if (boss.isDead) return;

    const alphaVal = alpha !== undefined ? alpha : 1.0;
    const drawX = boss.previousPosition.x + (boss.position.x - boss.previousPosition.x) * alphaVal;
    const drawY = boss.previousPosition.y + (boss.position.y - boss.previousPosition.y) * alphaVal;

    const activeState = boss.activeStateName;

    ctx.save();
    if (boss.health.isFlashing()) {
      ctx.fillStyle = "white";
    } else if (activeState === "TELEGRAPH") {
      ctx.fillStyle = "hsl(45, 100%, 50%)";
      ctx.shadowColor = "rgba(234, 179, 8, 0.8)";
      ctx.shadowBlur = 20;
    } else {
      ctx.fillStyle = "hsl(350, 80%, 60%)";
      if (boss.currentPhase === 3) {
        ctx.shadowColor = "rgba(239, 68, 68, 0.8)";
        ctx.shadowBlur = 25;
      }
    }

    const feetY = drawY + boss.size.height / 2;

    ctx.translate(drawX, feetY);
    ctx.rotate(boss.rotation);

    const yaw = 0.15 * boss.facingDirection + (boss.velocity.x / boss.lungeSpeed) * 0.45;
    const pitch = 0.08 + (boss.velocity.y / 1200) * 0.25;
    let baseColor = "hsl(350, 80%, 60%)";
    if (boss.health.isFlashing()) {
      baseColor = "hsl(0, 0%, 100%)";
    } else if (activeState === "TELEGRAPH") {
      baseColor = "hsl(45, 100%, 50%)";
    }

    Software3DRenderer.drawGeometry(
      ctx,
      Software3DRenderer.BOX_GEOMETRY,
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

    ctx.shadowBlur = 0;
    ctx.restore();
  }
}
