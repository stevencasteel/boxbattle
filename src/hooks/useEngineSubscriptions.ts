import { useEffect, useRef } from "react";
import { eventBroker } from "@/core/eventBroker";
import { useGameplayStore } from "@/store/useGameStore";

export function useEngineSubscriptions(
  triggerDialogue: (speaker: "player" | "boss", text: string) => void,
  resetDialogues: () => void
) {
  const triggerRef = useRef(triggerDialogue);
  const resetRef = useRef(resetDialogues);

  useEffect(() => {
    triggerRef.current = triggerDialogue;
    resetRef.current = resetDialogues;
  });

  useEffect(() => {
    const unsubs = [
      eventBroker.subscribe("DIALOGUE_TRIGGERED", ({ speaker, text }) => {
        triggerRef.current(speaker, text);
      }),
      eventBroker.subscribe("CLEAR_DIALOGUES", () => {
        resetRef.current();
      }),
      eventBroker.subscribe("PLAYER_LANDED", () => {
        useGameplayStore.getState().resetCombo();
      }),
      eventBroker.subscribe("BOSS_HURT", () => {
        useGameplayStore.getState().incrementCombo();
      }),
      eventBroker.subscribe("MINION_HURT", () => {
        useGameplayStore.getState().incrementCombo();
      }),
    ];

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, []);
}
