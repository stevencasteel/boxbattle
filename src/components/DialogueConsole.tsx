import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DialogueState } from "@/hooks/useGameDialogue";
import { useSessionStore } from "@/store/useGameStore";
import { GAUNTLET_STAGES } from "@/core/design/GauntletStages";
import { Software3DRenderer } from "@/core/visuals/Software3DRenderer";

interface DialogueConsoleProps { playerDialogue: DialogueState; bossDialogue: DialogueState; isTouchDevice: boolean; }

function PortraitCanvas({ speaker, typing }: { speaker: "player" | "boss"; typing: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext("2d"); if (!ctx) return;
        let frameId: number;
        const render = () => {
            const w = canvas.width, h = canvas.height, t = performance.now() / 1000;
            ctx.clearRect(0, 0, w, h);
            if (speaker === "player") {
                ctx.fillStyle = "hsl(142, 72%, 56%)"; ctx.fillRect(0, 0, w, h);
                if (typing) { ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(w / 2, h / 2, 4 + Math.sin(t * 12) * 2, 0, Math.PI * 2); ctx.fill(); }
            } else {
                const stageIdx = useSessionStore.getState().currentStageIndex;
                const colors = ["hsl(350, 82%, 58%)", "hsl(4, 88%, 54%)", "hsl(338, 76%, 55%)", "hsl(356, 94%, 62%)", "hsl(82, 38%, 44%)", "hsl(15, 82%, 48%)", "hsl(345, 58%, 46%)"];
                const baseColor = colors[stageIdx] || colors[0];
                
                ctx.fillStyle = "hsl(220, 12%, 10%)";
                ctx.fillRect(0, 0, w, h);

                ctx.save();
                ctx.fillStyle = baseColor;
                ctx.translate(w / 2, h / 2);
                
                const scale = 1.0 + Math.sin(t * 4) * 0.05;
                ctx.scale(scale, scale);
                
                let boxW = w * 0.7;
                let boxH = h * 0.7;
                if (stageIdx === 1) { boxW = w * 0.42; boxH = h * 0.85; }
                else if (stageIdx === 2) { boxW = w * 0.85; boxH = h * 0.35; }
                else if (stageIdx === 3) { boxW = w * 0.55; boxH = h * 0.80; }
                else if (stageIdx === 4) { boxW = w * 0.80; boxH = h * 0.55; }
                
                ctx.fillRect(-boxW / 2, -boxH / 2, boxW, boxH);
                ctx.restore();

                const strokeColor = "#ffffff";
                const patternRadius = Math.min(boxW, boxH) * 0.52;
                Software3DRenderer.drawSacredGeometry(ctx, stageIdx, w / 2, h / 2, patternRadius, t, strokeColor);
            }
            frameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(frameId);
    }, [speaker, typing]);
    return <canvas ref={canvasRef} width={48} height={48} style={{ width: "100%", height: "100%", display: "block", borderRadius: "5px" }} />;
}

export function DialogueConsole({ playerDialogue, bossDialogue, isTouchDevice }: DialogueConsoleProps) {
    const mobileClass = isTouchDevice ? "is-mobile" : "";
    const leftState = playerDialogue.active ? "active" : bossDialogue.active ? "inactive" : "idle";
    const rightState = bossDialogue.active ? "active" : playerDialogue.active ? "inactive" : "idle";
    const currentStageIndex = useSessionStore((state) => state.currentStageIndex);
    const activeStage = GAUNTLET_STAGES[currentStageIndex];
    const bossName = activeStage ? activeStage.midBossDisplayName : "BOSS";

    const getVariants = (speaker: "player" | "boss") => ({
        active: { scale: 1.02, opacity: 1, borderColor: speaker === "player" ? "rgba(34, 197, 94, 0.45)" : "rgba(239, 68, 68, 0.45)", boxShadow: speaker === "player" ? "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 16px rgba(34, 197, 94, 0.15)" : "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 16px rgba(239, 68, 68, 0.15)" },
        inactive: { scale: 0.96, opacity: 0.15, borderColor: "rgba(0, 0, 0, 0.3)", boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9)" },
        idle: { scale: 0.98, opacity: 0.35, borderColor: "rgba(0, 0, 0, 0.3)", boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9)" }
    });

    return (
        <div className={`dialogue-console ${mobileClass}`}>
            <motion.div animate={leftState} variants={getVariants("player")} transition={{ type: "spring", stiffness: 220, damping: 25 }} className={`dialogue-box-left neo-pressed ${mobileClass}`}>
                <div className={`portrait-square led-green ${playerDialogue.isTyping ? "portrait-rumble" : ""} ${mobileClass}`} style={{ overflow: "hidden", display: "flex", padding: 0 }}>
                    <PortraitCanvas speaker="player" typing={playerDialogue.isTyping} />
                </div>
                <div className="dialogue-text-container">
                    <div className={`dialogue-speaker-label ${mobileClass}`}>PLAYER</div>
                    <div className={`dialogue-body-text ${mobileClass}`}>{playerDialogue.active ? playerDialogue.displayed : "[ NO SIGNAL ]"}</div>
                </div>
            </motion.div>
            <motion.div animate={rightState} variants={getVariants("boss")} transition={{ type: "spring", stiffness: 220, damping: 25 }} className={`dialogue-box-right neo-pressed ${mobileClass}`}>
                <div className="dialogue-text-container" style={{ textAlign: "right" }}>
                    <div className={`dialogue-speaker-label ${mobileClass}`} style={{ color: "var(--signal-red)" }}>{bossName}</div>
                    <div className={`dialogue-body-text ${mobileClass}`}>{bossDialogue.active ? bossDialogue.displayed : "[ NO SIGNAL ]"}</div>
                </div>
                <div className={`portrait-square led-red ${bossDialogue.isTyping ? "portrait-rumble" : ""} ${mobileClass}`} style={{ overflow: "hidden", display: "flex", padding: 0 }}>
                    <PortraitCanvas speaker="boss" typing={bossDialogue.isTyping} />
                </div>
            </motion.div>
        </div>
    );
}
