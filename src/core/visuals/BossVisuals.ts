import { Boss } from "@/entities/Boss";
import { drawVisualProfile, VisualProfile } from "./ShapeRenderer";
import { useSessionStore } from "@/store/useGameStore";

export class BossVisuals {
  static draw(ctx: CanvasRenderingContext2D, boss: Boss, alpha: number): void {
    if (boss.isDead) return;

    const alphaVal = alpha !== undefined ? alpha : 1.0;
    const drawX = boss.previousPosition.x + (boss.position.x - boss.previousPosition.x) * alphaVal;
    const drawY = boss.previousPosition.y + (boss.position.y - boss.previousPosition.y) * alphaVal;

    const activeState = boss.activeStateName;

    ctx.save();

    const stageIdx = useSessionStore.getState().currentStageIndex;

    const profile: VisualProfile = {
      shapeFamily: "corrupted-box",
      danger: boss.currentPhase === 3 ? 0.9 : 0.4,
      weight: 0.8,
      corruption: 0.15,
      hueRole: "boss-lethal",
      strokePx: 3.0,
      spinRate: 0.05,
      wobbleAmp: 0.1,
      cornerRadius: 0,
      phaseOffset: stageIdx * 10
    };

    if (stageIdx === 1) { // Scarlet Lock
      profile.shapeFamily = "corrupted-box";
      profile.corruption = 0.35;
    } else if (stageIdx === 2) { // Carminal Orbit
      profile.shapeFamily = "diamond";
      profile.spinRate = 1.0;
    } else if (stageIdx === 3) { // Vermilion Needle
      profile.shapeFamily = "needle";
      profile.hueRole = "hazard";
      profile.spinRate = 2.0;
    } else if (stageIdx === 4) { // Marrow King
      profile.shapeFamily = "blister";
      profile.hueRole = "minion-organic";
      profile.corruption = 0.65;
    } else if (stageIdx === 5) { // Rust Cathedral
      profile.shapeFamily = "corrupted-box";
      profile.corruption = 0.55;
    } else if (stageIdx === 6) { // False Square
      profile.shapeFamily = "perfect-square";
      profile.spinRate = Math.sin(performance.now() * 0.005) * 0.4;
      profile.wobbleAmp = 0.4;
      profile.hueRole = performance.now() % 1000 < 500 ? "boss-lethal" : "hazard";
    }

    if (boss.health.isFlashing()) {
      profile.hueRole = "impact-white";
    } else if (activeState === "TELEGRAPH") {
      profile.hueRole = "telegraph";
    }

    const feetY = drawY + boss.size.height / 2;
    const drawW = boss.size.width * boss.visualScale.x;
    const drawH = boss.size.height * boss.visualScale.y;

    drawVisualProfile(ctx, drawX, feetY - boss.size.height / 2, drawW, drawH, profile, performance.now() / 1000);

    ctx.restore();
  }
}
