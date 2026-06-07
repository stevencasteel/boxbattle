import { eventBroker } from "./eventBroker";
import { useSessionStore, useGameplayStore } from "@/store/useGameStore";
import { GAUNTLET_STAGES } from "./design/GauntletStages";

export class GauntletDirector {
  private static initialized = false;

  public static init() {
    if (GauntletDirector.initialized) return;
    GauntletDirector.initialized = true;

    if (typeof window !== "undefined") {
      // Removed stage warping hotkeys for streamlined production single-stage chancel
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
