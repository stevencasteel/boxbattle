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
        const spikeWidth = 20;
        const spikeCount = Math.floor(hazard.width / spikeWidth);
        for (let i = 0; i < spikeCount; i++) {
          sctx.moveTo(hazard.x + i * spikeWidth, 960);
          sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth / 2, 920);
          sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth, 960);
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

    sctx.strokeStyle = "rgba(34, 197, 94, 0.45)";
    sctx.lineWidth = 3.2;
    sctx.lineJoin = "round";
    sctx.shadowColor = "rgba(34, 197, 94, 0.25)";
    sctx.shadowBlur = 6.4;
    
    sctx.beginPath();
    this.drawInnerPerimeterPath(sctx, 1.6);
    
    const floatingPlatform = solids.find(s => s.x === 340 && s.y === 640);
    if (floatingPlatform) {
      this.drawRoundedRectPath(sctx, floatingPlatform.x + 1.6, floatingPlatform.y + 1.6, floatingPlatform.width - 3.2, floatingPlatform.height - 3.2, 6.4);
    }
    sctx.stroke();
    sctx.shadowBlur = 0;

    sctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    sctx.lineWidth = 0.8;
    sctx.beginPath();
    this.drawInnerPerimeterPath(sctx, 2.8);
    
    if (floatingPlatform) {
      this.drawRoundedRectPath(sctx, floatingPlatform.x + 4, floatingPlatform.y + 4, floatingPlatform.width - 8, floatingPlatform.height - 8, 4);
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
