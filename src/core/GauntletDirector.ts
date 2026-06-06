import { eventBroker } from "./eventBroker";
import { useSessionStore, useGameplayStore } from "@/store/useGameStore";
import { GAUNTLET_STAGES } from "./design/GauntletStages";

export class GauntletDirector {
  private static initialized = false;

  public static init() {
    if (GauntletDirector.initialized) return;
    GauntletDirector.initialized = true;

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", (e) => {
        const code = e.code;
        if (code.startsWith("Digit")) {
          const num = parseInt(code.replace("Digit", ""));
          if (num >= 1 && num <= 7) {
            e.preventDefault();
            GauntletDirector.warpToStage(num - 1);
          }
        }
      });
    }
  }

  public static warpToStage(stageIndex: number) {
    const stage = GAUNTLET_STAGES[stageIndex];
    if (!stage) return;

    useGameplayStore.getState().resetGameSession();
    useSessionStore.getState().setCurrentStageIndex(stageIndex);
    useSessionStore.getState().navTo("PLAYING");

    setTimeout(() => {
      eventBroker.publish("LOAD_STAGE", { stageIndex });
    }, 100);
  }
}
