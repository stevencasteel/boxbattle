import { Rectangle } from "./Interfaces";
import { UNITS } from "@/core/Units";

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
        const spikeWidth = 25;
        const spikeCount = Math.floor(hazard.width / spikeWidth);
        for (let i = 0; i < spikeCount; i++) {
          sctx.moveTo(hazard.x + i * spikeWidth, 1200);
          sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth / 2, 1150);
          sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth, 1200);
        }
      }
      sctx.fill();
    }

    sctx.fillStyle = "#13151a";
    sctx.beginPath();
    for (const solid of solids) {
      this.drawRoundedRectPath(sctx, solid.x, solid.y, solid.width, solid.height, 10);
    }
    sctx.fill();

    sctx.strokeStyle = "rgba(34, 197, 94, 0.45)";
    sctx.lineWidth = 4;
    sctx.lineJoin = "round";
    sctx.shadowColor = "rgba(34, 197, 94, 0.25)";
    sctx.shadowBlur = 8;
    
    sctx.beginPath();
    this.drawInnerPerimeterPath(sctx, 2);
    
    const floatingPlatform = solids.find(s => s.x === 425 && s.y === 800);
    if (floatingPlatform) {
      this.drawRoundedRectPath(sctx, floatingPlatform.x + 2, floatingPlatform.y + 2, floatingPlatform.width - 4, floatingPlatform.height - 4, 8);
    }
    sctx.stroke();
    sctx.shadowBlur = 0;

    sctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    sctx.lineWidth = 1;
    sctx.beginPath();
    this.drawInnerPerimeterPath(sctx, 3.5);
    
    if (floatingPlatform) {
      this.drawRoundedRectPath(sctx, floatingPlatform.x + 5, floatingPlatform.y + 5, floatingPlatform.width - 10, floatingPlatform.height - 10, 5);
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

  private drawInnerPerimeterPath(ctx: CanvasRenderingContext2D, inset: number) {
    const ceilingY = 50 - inset;
    const leftWallX = 50 - inset;
    const rightWallX = 1200 + inset;
    const leftFloorY = 1150 + inset;
    const rightFloorY = 1150 + inset;
    const leftPitWallX = 400 - inset;
    const rightPitWallX = 850 + inset;
    const pitFloorY = 1200 + inset;

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
