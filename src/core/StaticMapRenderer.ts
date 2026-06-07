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
        const stageIdx = useSessionStore.getState().currentStageIndex;
        const stageConfig = GAUNTLET_STAGES[stageIdx];
        const bg = sctx.createLinearGradient(0, 0, UNITS.WORLD_SIZE, UNITS.WORLD_SIZE);
        bg.addColorStop(0, "hsl(230, 12%, 5%)");
        bg.addColorStop(0.45, stageIdx === 4 ? "hsl(82, 18%, 8%)" : "hsl(220, 10%, 8%)");
        bg.addColorStop(1, "hsl(322, 30%, 9%)");
        sctx.fillStyle = bg;
        sctx.fillRect(0, 0, UNITS.WORLD_SIZE, UNITS.WORLD_SIZE);

        this.drawBackgroundArchitecture(sctx, stageIdx);

        // Draw Organic Visual Shapes (Infection / Stone)
        if (stageConfig && stageConfig.visualShapes) {
            for (const shape of stageConfig.visualShapes) {
                sctx.fillStyle = shape.colorRole === "arena-infection" ? "hsla(330, 28%, 25%, 0.78)" : "hsl(220, 10%, 12%)";
                sctx.strokeStyle = "hsla(336, 42%, 38%, 0.62)";
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
            sctx.fillStyle = "hsl(358, 92%, 52%)";
            sctx.shadowColor = "hsla(358, 92%, 52%, 0.48)";
            sctx.shadowBlur = 12;
            sctx.beginPath();
            for (const hazard of hazards) {
                const spikeWidth = 18;
                const spikeCount = Math.floor(hazard.width / spikeWidth);
                const startY = (hazard.y === 920 && hazard.height === 80) ? 960 : hazard.y + hazard.height;
                for (let i = 0; i < spikeCount; i++) {
                    sctx.moveTo(hazard.x + i * spikeWidth, startY);
                    sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth / 2, hazard.y);
                    sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth, startY);
                }
            }
            sctx.fill();
            sctx.shadowBlur = 0;
            sctx.strokeStyle = "hsla(12, 100%, 66%, 0.62)";
            sctx.lineWidth = 1.5;
            sctx.stroke();
        }

        sctx.fillStyle = "hsl(220, 10%, 12%)";
        sctx.beginPath();
        for (const solid of solids) {
            this.drawRoundedRectPath(sctx, solid.x, solid.y, solid.width, solid.height, 8);
        }
        sctx.fill();

        sctx.save();
        sctx.clip();
        sctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
        sctx.lineWidth = 1;
        for (let x = -1000; x < 1600; x += 42) {
            sctx.beginPath();
            sctx.moveTo(x, 0);
            sctx.lineTo(x + 1000, 1000);
            sctx.stroke();
        }
        sctx.restore();

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

    private drawBackgroundArchitecture(ctx: CanvasRenderingContext2D, stageIdx: number) {
        ctx.save();
        ctx.globalAlpha = 0.45;
        ctx.strokeStyle = "hsla(215, 12%, 22%, 0.55)";
        ctx.lineWidth = 2;
        const offset = (stageIdx * 73) % 180;
        for (let i = 0; i < 8; i++) {
            const x = 80 + i * 130 - offset;
            ctx.beginPath();
            ctx.moveTo(x, 80);
            ctx.lineTo(x + 70, 220);
            ctx.lineTo(x + 20, 360);
            ctx.lineTo(x + 110, 520);
            ctx.lineTo(x + 40, 760);
            ctx.stroke();
        }

        ctx.globalAlpha = 0.36;
        ctx.fillStyle = stageIdx === 2 ? "hsla(338, 76%, 25%, 0.18)" : "hsla(330, 28%, 25%, 0.22)";
        for (let i = 0; i < 5; i++) {
            const cx = 160 + ((i * 221 + stageIdx * 89) % 720);
            const cy = 150 + ((i * 157 + stageIdx * 51) % 650);
            ctx.beginPath();
            ctx.ellipse(cx, cy, 46 + i * 9, 18 + (i % 3) * 10, (i + stageIdx) * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
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
            ctx.moveTo(220 - inset, 40 - inset); 
            ctx.lineTo(780 + inset, 40 - inset);
            ctx.lineTo(780 + inset, 920 + inset); 
            ctx.lineTo(220 - inset, 920 + inset); 
            ctx.closePath();
        } else { 
            ctx.moveTo(40 - inset, 40 - inset); 
            ctx.lineTo(960 + inset, 40 - inset);
            
            if (stageIdx === 5) {
                ctx.lineTo(960 + inset, 900 + inset);
            } else {
                ctx.lineTo(960 + inset, 920 + inset);
            }
            
            if (stageIdx === 0 || stageIdx === 6) {
                ctx.lineTo(680 + inset, 920 + inset);
                ctx.lineTo(680 + inset, 960 + inset);
                ctx.lineTo(320 - inset, 960 + inset);
                ctx.lineTo(320 - inset, 920 + inset);
            } else if (stageIdx === 3) {
                ctx.lineTo(740 + inset, 920 + inset);
                ctx.lineTo(740 + inset, 960 + inset);
                ctx.lineTo(260 - inset, 960 + inset);
                ctx.lineTo(260 - inset, 920 + inset);
            } else if (stageIdx === 4) {
                ctx.lineTo(660 + inset, 920 + inset);
                ctx.lineTo(660 + inset, 960 + inset);
                ctx.lineTo(340 - inset, 960 + inset);
                ctx.lineTo(340 - inset, 920 + inset);
            }
            
            ctx.lineTo(40 - inset, stageIdx === 5 ? 900 + inset : 920 + inset);
            ctx.closePath();
        }
    }

    public renderBackground(): void { this.ctx.drawImage(this.staticCanvas, 0, 0); }
    public renderOnewayPlatforms(onewayPlatforms: Rectangle[], springPlatforms: { rect: Rectangle; offsetY: number }[]): void {
        for (const platform of onewayPlatforms) {
            const sp = springPlatforms.find((s) => s.rect === platform);
            const offsetY = sp ? sp.offsetY : 0;
            this.ctx.save(); this.ctx.translate(0, offsetY);
            const grad = this.ctx.createLinearGradient(platform.x, platform.y, platform.x, platform.y + platform.height);
            grad.addColorStop(0, "hsl(215, 16%, 24%)");
            grad.addColorStop(1, "hsl(220, 10%, 10%)");
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            this.ctx.strokeStyle = "hsla(194, 62%, 52%, 0.35)";
            this.ctx.lineWidth = 1.8;
            this.ctx.beginPath();
            this.ctx.moveTo(platform.x + 5, platform.y + 2);
            this.ctx.lineTo(platform.x + platform.width - 5, platform.y + 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }
    public resetCache(): void { this.staticCacheBuilt = false; }
}
