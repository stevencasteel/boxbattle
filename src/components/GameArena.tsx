import confetti from "canvas-confetti";
import "./GameArena.css";
import { useEffect, useRef, useState } from "react";
import { Engine } from "@/core/Engine";
import { World } from "@/core/World";
import { WorldRenderer } from "@/core/WorldRenderer";
import { defaultLevelConfig } from "@/core/levelData";
import { inputProvider } from "@/core/InputProvider";
import { useSessionStore, useGameplayStore } from "@/store/useGameStore";
import { eventBroker } from "@/core/eventBroker";
import { soundSynth } from "@/core/SoundSynth";
import { saveManager } from "@/core/SaveManager";
import { settingsManager } from "@/core/SettingsManager";
import { Trophy, Skull, RotateCcw, Home, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GameArenaProps {
  triggerDialogue?: (speaker: "player" | "boss", text: string) => void;
  playHoverTick: () => void;
}

export function GameArena({ playHoverTick }: GameArenaProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);

  const [stagger, setStagger] = useState(0);
  const [displayWins, setDisplayWins] = useState(0);
  const [displayLosses, setDisplayLosses] = useState(0);

  const currentScreen = useSessionStore((state) => state.currentScreen);
  const gameResult = useSessionStore((state) => state.gameResult);
  const menuIndex = useSessionStore((state) => state.menuIndex);
  const navTo = useSessionStore((state) => state.navTo);
  const setMenuIndex = useSessionStore((state) => state.setMenuIndex);
  const retryCount = useSessionStore((state) => state.retryCount);
  const resetGameSession = useGameplayStore((state) => state.resetGameSession);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not construct 2D context.");

    const world = new World(defaultLevelConfig.solids, defaultLevelConfig.hazards, defaultLevelConfig.onewayPlatforms, eventBroker, soundSynth, inputProvider);
    const renderer = new WorldRenderer(ctx);
    const engine = new Engine(world, renderer);
    engineRef.current = engine;
    inputProvider.setKeyMap(settingsManager.getKeyMap());
    engine.start();

    useSessionStore.getState().setGameResult("PLAYING");

    const vignette = canvas.parentElement?.querySelector(".vignette-overlay") as HTMLDivElement | null;

    const updateVignette = (hp: number) => {
      const isGameOver = useSessionStore.getState().gameResult !== "PLAYING";
      if (vignette) {
        if (hp === 1 && !isGameOver) {
          vignette.classList.add("vignette-pulse");
        } else {
          vignette.classList.remove("vignette-pulse");
        }
      }
    };

    const unsubHurt = eventBroker.subscribe("PLAYER_HURT", ({ currentHealth }) => {
      updateVignette(currentHealth);
    });
    const unsubHealed = eventBroker.subscribe("PLAYER_HEALED", ({ currentHealth }) => {
      updateVignette(currentHealth);
    });

    const unsubSession = useSessionStore.subscribe((state) => {
      if (state.gameResult !== "PLAYING") {
        updateVignette(0);
      } else {
        updateVignette(useGameplayStore.getState().playerHP);
      }
    });

    const initialHP = useGameplayStore.getState().playerHP;
    updateVignette(initialHP);

    const unsubStateProjected = eventBroker.subscribe("STATE_PROJECTED", (payload) => {
      const store = useGameplayStore.getState();
      store.setPlayerHP(payload.playerHP);
      store.setBossHP(payload.bossHP);
      store.setHealingCharges(payload.healingCharges);
      store.setDetermination(payload.determination);
    });

    const unsubGameOver = eventBroker.subscribe("GAME_OVER", () => {
      useSessionStore.getState().setGameResult("GAMEOVER");
    });

    const unsubVictory = eventBroker.subscribe("VICTORY", () => {
      useSessionStore.getState().setGameResult("VICTORY");
    });

    const unsubRecordLoss = eventBroker.subscribe("RECORD_LOSS", () => {
      saveManager.recordLoss();
    });

    const unsubRecordWin = eventBroker.subscribe("RECORD_WIN", () => {
      saveManager.recordWin();
    });

    const unsubSessionReset = eventBroker.subscribe("SESSION_RESET", () => {
      useSessionStore.getState().setGameResult("PLAYING");
    });

    return () => {
      unsubHurt();
      unsubHealed();
      unsubSession();
      unsubStateProjected();
      unsubGameOver();
      unsubVictory();
      unsubRecordLoss();
      unsubRecordWin();
      unsubSessionReset();
      engine.cleanup();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const unsub = useSessionStore.subscribe((state) => {
      if (!engineRef.current) return;
      const isPlaying = state.currentScreen === "PLAYING";
      engineRef.current.isPaused = !isPlaying;
      inputProvider.setActive(isPlaying);
    });

    const isPlaying = useSessionStore.getState().currentScreen === "PLAYING";
    engine.isPaused = !isPlaying;
    inputProvider.setActive(isPlaying);

    return () => unsub();
  }, []);

  const tickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (gameResult === "PLAYING") {
      queueMicrotask(() => {
        setStagger(0);
        setDisplayWins(0);
        setDisplayLosses(0);
      });
      return;
    }

    const t1 = setTimeout(() => {
      setStagger(1);
      soundSynth.playMenuConfirm();
    }, 200);

    const t2 = setTimeout(() => {
      setStagger(2);
      eventBroker.publish("CAMERA_SHAKE", { amplitude: 10, duration: 0.2 });
      if (gameResult === "VICTORY") {
        soundSynth.playHealComplete();
        if (soundSynth.playCrowdVictory) {
          soundSynth.playCrowdVictory();
        }
      } else {
        soundSynth.playHealCancel();
        if (soundSynth.playCrowdDefeat) {
          soundSynth.playCrowdDefeat();
        }
      }
    }, 750);

    const t3 = setTimeout(() => {
      setStagger(3);

      const startTickTimeout = setTimeout(() => {
        const slotIdx = saveManager.getCurrentSlotIndex();
        const slot = slotIdx !== -1 ? saveManager.getSlot(slotIdx) : null;
        const targetWins = slot ? slot.wins : 0;
        const targetLosses = slot ? slot.losses : 0;

        let currentW = 0;
        let currentL = 0;

        const getDelay = (current: number, target: number) => {
          if (target <= 1) return 180;
          const progress = current / target;
          const minDelay = 25;
          const maxDelay = 260;
          return minDelay + (maxDelay - minDelay) * Math.pow(progress, 2);
        };

        const tickWins = () => {
          if (currentW < targetWins) {
            const delay = getDelay(currentW, targetWins);
            currentW++;
            setDisplayWins(currentW);
            soundSynth.playSelectTick();
            tickTimeoutRef.current = setTimeout(tickWins, delay);
          } else {
            tickTimeoutRef.current = setTimeout(tickLosses, 150);
          }
        };

        const tickLosses = () => {
          if (currentL < targetLosses) {
            const delay = getDelay(currentL, targetLosses);
            currentL++;
            setDisplayLosses(currentL);
            soundSynth.playSelectTick();
            tickTimeoutRef.current = setTimeout(tickLosses, delay);
          } else {
            setStagger(4);
            soundSynth.playDashRecharge();
          }
        };

        if (targetWins > 0) {
          tickWins();
        } else {
          tickLosses();
        }
      }, 900);

      tickTimeoutRef.current = startTickTimeout;
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (tickTimeoutRef.current) {
        clearTimeout(tickTimeoutRef.current);
      }
    };
  }, [gameResult]);

  const initialRetryCountRef = useRef(retryCount);

  useEffect(() => {
    if (currentScreen === "PLAYING" && retryCount > initialRetryCountRef.current) {
      engineRef.current?.reset();
    }
  }, [retryCount, currentScreen]);

  useEffect(() => {
    if (gameResult === "PLAYING") return;

    let cleanupFn: (() => void) | undefined = undefined;

    const delayTimeout = setTimeout(() => {
      const confettiCanvas = document.getElementById("confetti-canvas") as HTMLCanvasElement | null;
      if (confettiCanvas) {
        const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });

        if (gameResult === "VICTORY") {
          const fireConfetti = () => {
            myConfetti({
              particleCount: 360,
              spread: 80,
              origin: { y: 0.55, x: 0.5 },
              colors: ["#22c55e", "#4ade80", "#86efac", "#ffffff"]
            });
            myConfetti({
              particleCount: 200,
              spread: 45,
              angle: 135,
              origin: { y: 0.55, x: 0.5 },
              colors: ["#22c55e", "#4ade80", "#86efac", "#ffffff"]
            });
            myConfetti({
              particleCount: 200,
              spread: 45,
              angle: 45,
              origin: { y: 0.55, x: 0.5 },
              colors: ["#22c55e", "#4ade80", "#86efac", "#ffffff"]
            });
          };

          fireConfetti();
          const intervalId = setInterval(fireConfetti, 3000);

          // Constant celebratory streamers (downward rain) centering around the main jets, behind the modal
          let rainIndex = 0;
          const victoryColors = ["#22c55e", "#4ade80", "#86efac", "#ffffff"];
          const rainIntervalId = setInterval(() => {
            for (let k = 0; k < 24; k++) {
              const xCoord = 0.32 + ((rainIndex + k) % 8) * 0.05 + (Math.random() - 0.5) * 0.03;
              const randomColor = victoryColors[Math.floor(Math.random() * victoryColors.length)];
              myConfetti({
                particleCount: 1,
                angle: 270 + (Math.random() - 0.5) * 10,
                spread: 15,
                startVelocity: 14 + Math.random() * 8,
                decay: 0.95,
                gravity: 0.85,
                origin: {
                  y: 0.55,
                  x: Math.max(0.01, Math.min(0.99, xCoord))
                },
                colors: [randomColor]
              });
            }
            rainIndex = (rainIndex + 1) % 8;
          }, 120);

          cleanupFn = () => {
            clearInterval(intervalId);
            clearInterval(rainIntervalId);
            myConfetti.reset();
          };
        } else if (gameResult === "GAMEOVER") {
          let laneIndex = 0;
          const NUM_LANES = 8;
          const defeatColors = ["#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"];
          
          const intervalId = setInterval(() => {
            for (let k = 0; k < 30; k++) {
              const currentLane = (laneIndex + k) % NUM_LANES;
              const xCoord = (currentLane / (NUM_LANES - 1)) * 0.9 + 0.05 + (Math.random() - 0.5) * 0.05;
              const randomColor = defeatColors[Math.floor(Math.random() * defeatColors.length)];
              
              myConfetti({
                particleCount: 1,
                angle: 270 + (Math.random() - 0.5) * 10,
                spread: 15,
                startVelocity: 14 + Math.random() * 8,
                decay: 0.95,
                gravity: 0.85,
                scalar: 0.65 + Math.random() * 0.3,
                origin: { 
                  y: -0.15,
                  x: Math.max(0.01, Math.min(0.99, xCoord)) 
                },
                colors: [randomColor]
              });
            }
            laneIndex = (laneIndex + 3) % NUM_LANES;
          }, 120);

          cleanupFn = () => {
            clearInterval(intervalId);
            myConfetti.reset();
          };
        }
      }
    }, 750);

    return () => {
      clearTimeout(delayTimeout);
      if (cleanupFn) cleanupFn();
    };
  }, [gameResult]);

  return (
    <div className="w-full" style={{ display: "flex", flexDirection: "column", flexGrow: 1, minHeight: 0 }}>
      <div
        style={{ flexGrow: 1, position: "relative", display: "flex", width: "100%", overflow: "hidden", minHeight: 0 }}
      >
        <div
          style={{
            position: "relative",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            maxHeight: "100%",
            aspectRatio: "1/1",
            width: "100%",
            height: "100%",
          }}
        >
          <canvas
            ref={canvasRef}
            width={1250}
            height={1250}
            className="crt-scanlines crt-flicker"
            style={{
              background: "#0c0d11",
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

          <div className="vignette-overlay" />

          {gameResult !== "PLAYING" && stagger >= 1 && (
            <div className="absolute inset-0 bg-black/94 backdrop-blur-md flex flex-col items-center justify-center z-[99] p-3 sm:p-6 animate-overlay-fade-in opacity-0 will-change-opacity">
              <canvas id="confetti-canvas" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />
              <AnimatePresence>
                <motion.div
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`flex flex-col items-center justify-center p-4 max-w-[440px] w-[90%] text-center neo-elevated border-2 transition-all duration-300 rounded-[20px] bg-[#0c0e12]/96 max-h-[750px]:p-6 max-h-[560px]:p-3 max-[768px]:p-6 max-[380px]:p-3 ${gameResult === "GAMEOVER" ? "border-red-500/35 shadow-[0_0_30px_rgba(239,68,68,0.15),_inset_0_0_20px_rgba(239,68,68,0.1)]" : "border-green-500/35 shadow-[0_0_30px_rgba(34,197,94,0.15),_inset_0_0_20px_rgba(34,197,94,0.1)]"}`}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  style={{ position: "relative", zIndex: 2 }}
                >
                  <AnimatePresence mode="wait">
                    {stagger >= 2 && (
                      <motion.div
                        key="title-section"
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="flex flex-col items-center justify-center"
                      >
                        {gameResult === "GAMEOVER" ? (
                          <div className="flex flex-col items-center justify-center">
                            <Skull
                              size={64}
                              className="defeat-icon-anim w-16 h-16 mb-4 max-h-[750px]:w-11 max-h-[750px]:h-11 max-h-[750px]:mb-2 max-h-[560px]:w-8 max-h-[560px]:h-8 max-h-[560px]:mb-1 max-[768px]:w-11 max-[768px]:h-11 max-[768px]:mb-2 max-[380px]:w-8 max-[380px]:h-8 max-[380px]:mb-1"
                              style={{ color: "var(--signal-red)" }}
                            />
                            <h1 className="defeat-title-anim text-3xl font-bold leading-none max-[768px]:text-2xl max-h-[750px]:text-2xl max-[380px]:text-lg max-h-[560px]:text-lg" style={{ color: "var(--signal-red)" }}>
                              DEFEATED
                            </h1>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <Trophy
                              size={64}
                              className="victory-icon-anim w-16 h-16 mb-4 max-h-[750px]:w-11 max-h-[750px]:h-11 max-h-[750px]:mb-2 max-h-[560px]:w-8 max-h-[560px]:h-8 max-h-[560px]:mb-1 max-[768px]:w-11 max-[768px]:h-11 max-[768px]:mb-2 max-[380px]:w-8 max-[380px]:h-8 max-[380px]:mb-1"
                              style={{ color: "var(--signal-green)" }}
                            />
                            <h1 className="victory-title-anim text-3xl font-bold leading-none max-[768px]:text-2xl max-h-[750px]:text-2xl max-[380px]:text-lg max-h-[560px]:text-lg" style={{ color: "var(--signal-green)" }}>
                              VICTORY
                            </h1>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {stagger >= 3 && (
                      <motion.div
                        key="stats-section"
                        initial={{ opacity: 0, height: 0, y: 15 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 24 }}
                        className="w-full mt-6 p-4 max-h-[750px]:mt-3 max-h-[750px]:p-2 max-h-[750px]:gap-1 max-h-[560px]:mt-2 max-h-[560px]:p-1 bg-[#07080b]/60 border border-white/3 rounded-lg flex flex-col gap-2.5 max-[768px]:mt-3 max-[768px]:p-2 max-[768px]:gap-1.5 max-[380px]:mt-2 max-[380px]:p-1.5 max-[380px]:gap-1 overflow-hidden"
                      >
                        <div className="flex items-center gap-2 justify-center text-slate-400">
                          <BarChart2 size={14} />
                          <span className="text-[11px] font-bold tracking-widest uppercase">
                            SAVE SLOT PERFORMANCE
                          </span>
                        </div>
                        <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", width: "100%" }} />
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-600 font-bold tracking-wider max-[768px]:text-[11px] max-h-[750px]:text-[11px] max-[380px]:text-[10px] max-h-[560px]:text-[10px]">TOTAL WINS</span>
                          <span className="text-lg font-bold font-mono max-[768px]:text-sm max-h-[750px]:text-sm max-[380px]:text-xs max-h-[560px]:text-xs text-green-500">{displayWins}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-600 font-bold tracking-wider max-[768px]:text-[11px] max-h-[750px]:text-[11px] max-[380px]:text-[10px] max-h-[560px]:text-[10px]">TOTAL LOSSES</span>
                          <span className="text-lg font-bold font-mono max-[768px]:text-sm max-h-[750px]:text-sm max-[380px]:text-xs max-h-[560px]:text-xs text-red-500">{displayLosses}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {stagger >= 3 && (
                      <motion.div
                        key="buttons-section"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.3 }}
                        style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
                      >
                        <div className="h-px w-[60px] bg-white/8 my-6 max-h-[750px]:my-3 max-h-[560px]:my-2 max-[768px]:my-3 max-[380px]:my-2" />

                        <div className="flex flex-row gap-4 w-full justify-center max-[768px]:gap-2.5 max-h-[750px]:gap-2.5 max-[380px]:gap-2 max-h-[560px]:gap-2">
                          <button
                            onClick={() => {
                              resetGameSession();
                              navTo("PLAYING");
                            }}
                            onMouseEnter={() => {
                              playHoverTick();
                              setMenuIndex(0);
                            }}
                            className={`neo-btn flex-1 !p-2 sm:!p-3 md:!p-4 !text-[11px] sm:!text-xs md:!text-sm !rounded-md md:!rounded-lg flex items-center justify-center !gap-1.5 sm:!gap-2 !tracking-wider !h-auto !min-h-0 ${menuIndex === 0 ? "neo-btn-focused" : ""}`}
                            style={
                              gameResult === "GAMEOVER" && menuIndex === 0
                                ? {
                                    color: "var(--signal-red)",
                                    borderColor: "rgba(239, 68, 68, 0.25)",
                                    textShadow: "0 0 8px var(--signal-red-glow)",
                                  }
                                : {}
                            }
                          >
                            <span
                              className="inline-block font-mono font-bold animate-pulse text-sm max-[768px]:text-xs max-h-[750px]:text-xs max-[380px]:text-[11px] max-h-[560px]:text-[11px]"
                              style={{
                                marginRight: "6px",
                                visibility: menuIndex === 0 ? "visible" : "hidden",
                                color: gameResult === "GAMEOVER" ? "var(--signal-red)" : undefined,
                              }}
                            >
                              ▶
                            </span>
                            <RotateCcw size={16} style={{ flexShrink: 0 }} />
                            RETRY
                            <span
                              className="inline-block font-mono font-bold animate-pulse text-sm max-[768px]:text-xs max-h-[750px]:text-xs max-[380px]:text-[11px] max-h-[560px]:text-[11px]"
                              style={{
                                marginLeft: "6px",
                                visibility: menuIndex === 0 ? "visible" : "hidden",
                                color: gameResult === "GAMEOVER" ? "var(--signal-red)" : undefined,
                              }}
                            >
                              ◀
                            </span>
                          </button>
                          <button
                            onClick={() => navTo("TITLE")}
                            onMouseEnter={() => {
                              playHoverTick();
                              setMenuIndex(1);
                            }}
                            className={`neo-btn flex-1 !p-2 sm:!p-3 md:!p-4 !text-[11px] sm:!text-xs md:!text-sm !rounded-md md:!rounded-lg flex items-center justify-center !gap-1.5 sm:!gap-2 !tracking-wider !h-auto !min-h-0 ${menuIndex === 1 ? "neo-btn-focused" : ""}`}
                            style={
                              gameResult === "GAMEOVER" && menuIndex === 1
                                ? {
                                    color: "var(--signal-red)",
                                    borderColor: "rgba(239, 68, 68, 0.25)",
                                    textShadow: "0 0 8px var(--signal-red-glow)",
                                  }
                                : {}
                            }
                          >
                            <span
                              className="inline-block font-mono font-bold animate-pulse text-sm max-[768px]:text-xs max-h-[750px]:text-xs max-[380px]:text-[11px] max-h-[560px]:text-[11px]"
                              style={{
                                marginRight: "6px",
                                visibility: menuIndex === 1 ? "visible" : "hidden",
                                color: gameResult === "GAMEOVER" ? "var(--signal-red)" : undefined,
                              }}
                            >
                              ▶
                            </span>
                            <Home size={16} style={{ flexShrink: 0 }} />
                            MENU
                            <span
                              className="inline-block font-mono font-bold animate-pulse text-sm max-[768px]:text-xs max-h-[750px]:text-xs max-[380px]:text-[11px] max-h-[560px]:text-[11px]"
                              style={{
                                marginLeft: "6px",
                                visibility: menuIndex === 1 ? "visible" : "hidden",
                                color: gameResult === "GAMEOVER" ? "var(--signal-red)" : undefined,
                              }}
                            >
                              ◀
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
