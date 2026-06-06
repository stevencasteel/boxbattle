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
          sctx.moveTo(hazard.x + i * spikeWidth, hazard.y + hazard.height);
          sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth / 2, hazard.y);
          sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth, hazard.y + hazard.height);
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
    for (const solid of solids) {
      const isBoundary = solid.x <= 40 || solid.x + solid.width >= 960 || solid.y <= 40 || solid.y + solid.height >= 920;
      if (!isBoundary) {
        this.drawRoundedRectPath(sctx, solid.x + 1.6, solid.y + 1.6, solid.width - 3.2, solid.height - 3.2, 6.4);
      }
    }
    sctx.stroke();
    sctx.shadowBlur = 0;

    sctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    sctx.lineWidth = 0.8;
    sctx.beginPath();
    for (const solid of solids) {
      const isBoundary = solid.x <= 40 || solid.x + solid.width >= 960 || solid.y <= 40 || solid.y + solid.height >= 920;
      if (!isBoundary) {
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
