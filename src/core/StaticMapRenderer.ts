import { Rectangle } from "./Interfaces";
import { UNITS } from "@/core/Units";
import { useSessionStore } from "@/store/useGameStore";

export class StaticMapRenderer {
  private ctx: CanvasRenderingContext2D;
  private staticCanvas: HTMLCanvasElement;
  private staticCtx: CanvasRenderingContext2D;
  private staticCacheBuilt = false;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.staticCanvas = document.createElement("canvas");
    this.staticCanvas.width = UNITS.WORLD_SIZE;
    this.staticCanvas.height = UNITS.WORLD_SIZE;
    const staticCtx = this.staticCanvas.getContext("2d");
    if (!staticCtx) throw new Error("Could not create static canvas context");
    this.staticCtx = staticCtx;
  }

  public buildStaticCache(solids: Rectangle[], hazards: Rectangle[]): void {
    if (this.staticCacheBuilt) return;
    const sctx = this.staticCtx;

    sctx.fillStyle = "#07080b";
    sctx.fillRect(0, 0, UNITS.WORLD_SIZE, UNITS.WORLD_SIZE);

    if (hazards.length > 0) {
      sctx.fillStyle = "hsl(350, 80%, 60%)";
      sctx.beginPath();
      for (const hazard of hazards) {
        const spikeWidth = 20;
        const spikeCount = Math.floor(hazard.width / spikeWidth);
        const startY = (hazard.y === 920 && hazard.height === 80) ? 960 : hazard.y + hazard.height;
        for (let i = 0; i < spikeCount; i++) {
          sctx.moveTo(hazard.x + i * spikeWidth, startY);
          sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth / 2, hazard.y);
          sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth, startY);
        }
      }
      sctx.fill();
    }

    sctx.fillStyle = "#13151a";
    sctx.beginPath();
    for (const solid of solids) {
      this.drawRoundedRectPath(sctx, solid.x, solid.y, solid.width, solid.height, 8);
    }
    sctx.fill();

    const stageIdx = useSessionStore.getState().currentStageIndex;

    sctx.strokeStyle = "rgba(34, 197, 94, 0.45)";
    sctx.lineWidth = 3.2;
    sctx.lineJoin = "round";
    sctx.shadowColor = "rgba(34, 197, 94, 0.25)";
    sctx.shadowBlur = 6.4;
    
    sctx.beginPath();
    this.drawInnerPerimeterPath(sctx, 1.6, stageIdx);
    
    for (const solid of solids) {
      const isBoundary = solid.x <= 40 || solid.x + solid.width >= 960 || solid.y <= 40 || solid.y + solid.height >= 920;
      const isStage2Boundary = stageIdx === 1 && (solid.x <= 220 || solid.x + solid.width >= 780);
      if (!isBoundary && !isStage2Boundary) {
        this.drawRoundedRectPath(sctx, solid.x + 1.6, solid.y + 1.6, solid.width - 3.2, solid.height - 3.2, 6.4);
      }
    }
    sctx.stroke();
    sctx.shadowBlur = 0;

    sctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    sctx.lineWidth = 0.8;
    sctx.beginPath();
    this.drawInnerPerimeterPath(sctx, 2.8, stageIdx);
    
    for (const solid of solids) {
      const isBoundary = solid.x <= 40 || solid.x + solid.width >= 960 || solid.y <= 40 || solid.y + solid.height >= 920;
      const isStage2Boundary = stageIdx === 1 && (solid.x <= 220 || solid.x + solid.width >= 780);
      if (!isBoundary && !isStage2Boundary) {
        this.drawRoundedRectPath(sctx, solid.x + 4, solid.y + 4, solid.width - 8, solid.height - 8, 4);
      }
    }
    sctx.stroke();

    this.staticCacheBuilt = true;
  }

  private drawRoundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    const rad = Math.min(r, w / 2, h / 2);
    ctx.moveTo(x + rad, y);
    ctx.lineTo(x + w - rad, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
    ctx.lineTo(x + w, y + h - rad);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
    ctx.lineTo(x + rad, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
    ctx.lineTo(x, y + rad);
    ctx.quadraticCurveTo(x, y, x + rad, y);
  }

  private drawInnerPerimeterPath(ctx: CanvasRenderingContext2D, inset: number, stageIdx: number) {
    if (stageIdx === 1) { // Stage 2: Narrow Redoubt
      const ceilingY = 40 - inset;
      const leftWallX = 220 - inset;
      const rightWallX = 780 + inset;
      const floorY = 920 + inset;

      ctx.moveTo(leftWallX, ceilingY);
      ctx.lineTo(rightWallX, ceilingY);
      ctx.lineTo(rightWallX, floorY);
      ctx.lineTo(leftWallX, floorY);
      ctx.closePath();
    } else if (stageIdx === 3 || stageIdx === 4) { // Stage 4: Dissolving Choir / Stage 5: Marrow Rot
      const ceilingY = 40 - inset;
      const leftWallX = 40 - inset;
      const rightWallX = 960 + inset;
      const leftFloorY = 920 + inset;
      const rightFloorY = 920 + inset;
      const leftPitWallX = (stageIdx === 3 ? 260 : 340) - inset;
      const rightPitWallX = (stageIdx === 3 ? 740 : 660) + inset;
      const pitFloorY = 960 + inset;

      ctx.moveTo(leftWallX, ceilingY);
      ctx.lineTo(rightWallX, ceilingY);
      ctx.lineTo(rightWallX, rightFloorY);
      ctx.lineTo(rightPitWallX, rightFloorY);
      ctx.lineTo(rightPitWallX, pitFloorY);
      ctx.lineTo(leftPitWallX, pitFloorY);
      ctx.lineTo(leftPitWallX, leftFloorY);
      ctx.lineTo(leftWallX, leftFloorY);
      ctx.closePath();
    } else if (stageIdx === 5) { // Stage 6: Rust Cathedral
      const ceilingY = 40 - inset;
      const leftWallX = 40 - inset;
      const rightWallX = 960 + inset;
      const floorY = 900 + inset;

      ctx.moveTo(leftWallX, ceilingY);
      ctx.lineTo(rightWallX, ceilingY);
      ctx.lineTo(rightWallX, floorY);
      ctx.lineTo(leftWallX, floorY);
      ctx.closePath();
    } else { // Stage 1, Stage 3, Stage 7
      const ceilingY = 40 - inset;
      const leftWallX = 40 - inset;
      const rightWallX = 960 + inset;
      const leftFloorY = 920 + inset;
      const rightFloorY = 920 + inset;
      const leftPitWallX = 320 - inset;
      const rightPitWallX = 680 + inset;
      const pitFloorY = 960 + inset;

      ctx.moveTo(leftWallX, ceilingY);
      ctx.lineTo(rightWallX, ceilingY);
      ctx.lineTo(rightWallX, rightFloorY);
      ctx.lineTo(rightPitWallX, rightFloorY);
      ctx.lineTo(rightPitWallX, pitFloorY);
      ctx.lineTo(leftPitWallX, pitFloorY);
      ctx.lineTo(leftPitWallX, leftFloorY);
      ctx.lineTo(leftWallX, leftFloorY);
      ctx.closePath();
    }
  }

  public renderBackground(): void {
    this.ctx.drawImage(this.staticCanvas, 0, 0);
  }

  public renderOnewayPlatforms(
    onewayPlatforms: Rectangle[],
    springPlatforms: { rect: Rectangle; offsetY: number }[]
  ): void {
    this.ctx.fillStyle = "#2c3e50";
    for (const platform of onewayPlatforms) {
      const sp = springPlatforms.find((s) => s.rect === platform);
      const offsetY = sp ? sp.offsetY : 0;

      this.ctx.save();
      this.ctx.translate(0, offsetY);
      this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
      this.ctx.restore();
    }
  }

  public resetCache(): void {
    this.staticCacheBuilt = false;
  }
}
