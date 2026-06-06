import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DialogueState } from "@/hooks/useGameDialogue";
import { useSessionStore } from "@/store/useGameStore";
import { GAUNTLET_STAGES } from "@/core/design/GauntletStages";

interface DialogueConsoleProps {
  playerDialogue: DialogueState;
  bossDialogue: DialogueState;
  isTouchDevice: boolean;
}

function PortraitCanvas({ speaker, typing }: { speaker: "player" | "boss"; typing: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const t = performance.now() / 1000;

      ctx.clearRect(0, 0, w, h);

      if (speaker === "player") {
        ctx.fillStyle = "hsl(142, 72%, 56%)";
        ctx.fillRect(4, 4, w - 8, h - 8);

        ctx.strokeStyle = "hsl(142, 100%, 80%)";
        ctx.lineWidth = 2;
        ctx.strokeRect(4, 4, w - 8, h - 8);

        if (typing) {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, 4 + Math.sin(t * 12) * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const stageIdx = useSessionStore.getState().currentStageIndex;

        ctx.fillStyle = "hsl(350, 82%, 58%)";
        if (stageIdx === 4) ctx.fillStyle = "hsl(82, 38%, 44%)"; // Marrow King lumpy bruised HSL
        ctx.fillRect(4, 4, w - 8, h - 8);

        if (stageIdx === 0) {
          ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(4, 4);
          ctx.lineTo(w - 4, h - 4);
          ctx.stroke();
        } else if (stageIdx === 1) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
          ctx.fillRect(12, 4, 6, h - 8);
          ctx.fillRect(21, 4, 6, h - 8);
          ctx.fillRect(30, 4, 6, h - 8);
        } else if (stageIdx === 2) {
          ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, 10, 0, Math.PI * 2);
          ctx.arc(w / 2, h / 2, 16, 0, Math.PI * 2);
          ctx.stroke();
        } else if (stageIdx === 3) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
          ctx.beginPath();
          ctx.moveTo(w / 2, 4);
          ctx.lineTo(w / 2 + 10, 18);
          ctx.lineTo(w / 2 - 10, 18);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(w / 2, h - 4);
          ctx.lineTo(w / 2 + 10, h - 18);
          ctx.lineTo(w / 2 - 10, h - 18);
          ctx.closePath();
          ctx.fill();
        } else if (stageIdx === 4) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
          ctx.beginPath();
          ctx.arc(14, 14, 6 + Math.sin(t * 4) * 1.5, 0, Math.PI * 2);
          ctx.arc(34, 34, 8 + Math.cos(t * 3.5) * 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (stageIdx === 5) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
          ctx.fillRect(8, 8, 12, 12);
          ctx.fillRect(28, 24, 12, 12);
        } else if (stageIdx === 6) {
          const split = (t * 8) % 4 === 0;
          if (split) {
            ctx.fillStyle = "rgba(0,0,0,0.9)";
            ctx.fillRect(w / 2 - 8, 4, 16, h - 8);
          } else {
            ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(10, 10, w - 20, h - 20);
          }
        }

        ctx.strokeStyle = "hsl(0, 100%, 72%)";
        ctx.lineWidth = 2.5;
        ctx.strokeRect(4, 4, w - 8, h - 8);
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [speaker, typing]);

  return <canvas ref={canvasRef} width={48} height={48} style={{ width: "48px", height: "48px", borderRadius: "6px" }} />;
}

export function DialogueConsole({ playerDialogue, bossDialogue, isTouchDevice }: DialogueConsoleProps) {
  const mobileClass = isTouchDevice ? "is-mobile" : "";

  const leftState = playerDialogue.active 
    ? "active" 
    : bossDialogue.active 
      ? "inactive" 
      : "idle";

  const rightState = bossDialogue.active 
    ? "active" 
    : playerDialogue.active 
      ? "inactive" 
      : "idle";

  const currentStageIndex = useSessionStore((state) => state.currentStageIndex);
  const activeStage = GAUNTLET_STAGES[currentStageIndex];
  const bossName = activeStage ? activeStage.midBossDisplayName : "BOSS";

  const getVariants = (speaker: "player" | "boss") => ({
    active: {
      scale: 1.02,
      opacity: 1,
      borderColor: speaker === "player" ? "rgba(34, 197, 94, 0.45)" : "rgba(239, 68, 68, 0.45)",
      boxShadow: speaker === "player" 
        ? "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 16px rgba(34, 197, 94, 0.15)"
        : "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 16px rgba(239, 68, 68, 0.15)",
    },
    inactive: {
      scale: 0.96,
      opacity: 0.15,
      borderColor: "rgba(0, 0, 0, 0.3)",
      boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9)",
    },
    idle: {
      scale: 0.98,
      opacity: 0.35,
      borderColor: "rgba(0, 0, 0, 0.3)",
      boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9)",
    }
  });

  return (
    <div className={`dialogue-console ${mobileClass}`}>
      <motion.div
        animate={leftState}
        variants={getVariants("player")}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        className={`dialogue-box-left neo-pressed ${mobileClass}`}
      >
        <PortraitCanvas speaker="player" typing={playerDialogue.isTyping} />
        <div className="dialogue-text-container">
          <div className={`dialogue-speaker-label ${mobileClass}`}>
            PLAYER
          </div>
          <div className={`dialogue-body-text ${mobileClass}`}>
            {playerDialogue.active ? playerDialogue.displayed : "[ NO SIGNAL ]"}
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={rightState}
        variants={getVariants("boss")}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        className={`dialogue-box-right neo-pressed ${mobileClass}`}
      >
        <div className="dialogue-text-container" style={{ textAlign: "right" }}>
          <div
            className={`dialogue-speaker-label ${mobileClass}`}
            style={{ color: "var(--signal-red)" }}
          >
            {bossName}
          </div>
          <div className={`dialogue-body-text ${mobileClass}`}>
            {bossDialogue.active ? bossDialogue.displayed : "[ NO SIGNAL ]"}
          </div>
        </div>
        <PortraitCanvas speaker="boss" typing={bossDialogue.isTyping} />
      </motion.div>
    </div>
  );
}
