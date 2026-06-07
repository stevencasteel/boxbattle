import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DialogueState } from "@/hooks/useGameDialogue";

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
                const baseColor = "hsl(350, 82%, 58%)";
                ctx.fillStyle = baseColor;
                ctx.fillRect(0, 0, w, h);
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
    const bossName = "PRIME WOUND";

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
