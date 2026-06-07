import { Rectangle } from "./Interfaces";
import { UNITS } from "@/core/Units";
import { useSessionStore } from "@/store/useGameStore";
import { GAUNTLET_STAGES } from "./design/GauntletStages";

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
        this.staticCtx = this.staticCanvas.getContext("2d")!;
    }

    public buildStaticCache(solids: Rectangle[], hazards: Rectangle[]): void {
        if (this.staticCacheBuilt) return;
        const sctx = this.staticCtx;
        sctx.fillStyle = "#07080b";
        sctx.fillRect(0, 0, UNITS.WORLD_SIZE, UNITS.WORLD_SIZE);

        const stageIdx = useSessionStore.getState().currentStageIndex;
        const stageConfig = GAUNTLET_STAGES[stageIdx];

        // Draw Organic Visual Shapes (Infection / Stone)
        if (stageConfig && stageConfig.visualShapes) {
            for (const shape of stageConfig.visualShapes) {
                sctx.fillStyle = shape.colorRole === "arena-infection" ? "hsl(330, 28%, 25%)" : "#13151a";
                sctx.strokeStyle = "hsl(336, 42%, 38%)";
                sctx.lineWidth = 2;
                sctx.beginPath();
                if (shape.type === "circle" && shape.center && shape.radius) {
                    sctx.arc(shape.center.x, shape.center.y, shape.radius, 0, Math.PI * 2);
                } else if (shape.points && shape.points.length > 0) {
                    sctx.moveTo(shape.points[0].x, shape.points[0].y);
                    for (let i = 1; i < shape.points.length; i++) sctx.lineTo(shape.points[i].x, shape.points[i].y);
                    sctx.closePath();
                }
                sctx.fill();
                if (shape.infectionSeams) sctx.stroke();
            }
        }

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

        // GRAMMAR FIX: Inset line is now Arena Infection (Magenta/Red), NOT Green (Player Agency)
        sctx.strokeStyle = "hsl(336, 42%, 38%)"; 
        sctx.lineWidth = 3.2;
        sctx.lineJoin = "round";
        sctx.shadowColor = "hsl(330, 28%, 25%)";
        sctx.shadowBlur = 6.4;
        sctx.beginPath();
        this.drawInnerPerimeterPath(sctx, 1.6, stageIdx);
        for (const solid of solids) {
            const isBoundary = solid.x <= 40 || solid.x + solid.width >= 960 || solid.y <= 40 || solid.y + solid.height >= 920;
            if (!isBoundary) {
                this.drawRoundedRectPath(sctx, solid.x + 1.6, solid.y + 1.6, solid.width - 3.2, solid.height - 3.2, 6.4);
            }
        }
        sctx.stroke();
        sctx.shadowBlur = 0;

        this.staticCacheBuilt = true;
    }

    private drawRoundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
        const rad = Math.min(r, w / 2, h / 2);
        ctx.moveTo(x + rad, y); ctx.lineTo(x + w - rad, y); ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
        ctx.lineTo(x + w, y + h - rad); ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
        ctx.lineTo(x + rad, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
        ctx.lineTo(x, y + rad); ctx.quadraticCurveTo(x, y, x + rad, y);
    }

    private drawInnerPerimeterPath(ctx: CanvasRenderingContext2D, inset: number, stageIdx: number) {
        if (stageIdx === 1) { 
            ctx.moveTo(220 - inset, 40 - inset); ctx.lineTo(780 + inset, 40 - inset);
            ctx.lineTo(780 + inset, 920 + inset); ctx.lineTo(220 - inset, 920 + inset); ctx.closePath();
        } else { 
            ctx.moveTo(40 - inset, 40 - inset); ctx.lineTo(960 + inset, 40 - inset);
            ctx.lineTo(960 + inset, 920 + inset); ctx.lineTo(40 - inset, 920 + inset); ctx.closePath();
        }
    }

    public renderBackground(): void { this.ctx.drawImage(this.staticCanvas, 0, 0); }
    public renderOnewayPlatforms(onewayPlatforms: Rectangle[], springPlatforms: { rect: Rectangle; offsetY: number }[]): void {
        this.ctx.fillStyle = "#2c3e50";
        for (const platform of onewayPlatforms) {
            const sp = springPlatforms.find((s) => s.rect === platform);
            const offsetY = sp ? sp.offsetY : 0;
            this.ctx.save(); this.ctx.translate(0, offsetY);
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            this.ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
            this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
            this.ctx.restore();
        }
    }
    public resetCache(): void { this.staticCacheBuilt = false; }
}
