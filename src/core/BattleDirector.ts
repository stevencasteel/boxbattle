import { Player } from "@/entities/Player";
import { Boss } from "@/entities/Boss";
import type { IEventBus, IAudioManager } from "@/core/Interfaces";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { UNITS } from "@/core/Units";
import { CinematicSystem } from "@/core/CinematicSystem";
import { useSessionStore } from "@/store/useGameStore";

export class BattleDirector {
  private events: IEventBus;
  private audio: IAudioManager;
  private hasTriggeredFirstHit = false;
  private hasTriggeredPhase2 = false;
  private hasTriggeredPhase3 = false;
  private cinematic: CinematicSystem;
  private onBattleEnd: () => void;

  constructor(events: IEventBus, audio: IAudioManager, onBattleEnd: () => void) {
    this.events = events;
    this.audio = audio;
    this.onBattleEnd = onBattleEnd;
    this.cinematic = new CinematicSystem(events, audio);
  }

  public isCinematicActive(): boolean {
    return this.cinematic.isActive();
  }

  public getDeathVisuals() {
    return {
      timer: this.cinematic.getDeathTimer(),
      pos: this.cinematic.getDeathPos(),
    };
  }

  public update(dt: number, player: Player, boss: Boss) {
    this.cinematic.update(dt);

    if (this.cinematic.isActive()) {
      return;
    }

    const bHealth = boss.getComponent(HealthComponent);
    if (bHealth) {
      const maxHp = bHealth.maxHealth;
      const phase2Threshold = Math.floor(maxHp * UNITS.BOSS_PHASE_2_HP_PCT);
      const phase3Threshold = Math.floor(maxHp * UNITS.BOSS_PHASE_3_HP_PCT);

      const stageIdx = useSessionStore.getState().currentStageIndex;

      if (bHealth.currentHealth < maxHp && !this.hasTriggeredFirstHit) {
        this.hasTriggeredFirstHit = true;
        if (stageIdx === 0) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "A square returns to be measured." });
        } else if (stageIdx === 1) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Every exit is a rule." });
        } else if (stageIdx === 2) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Target locked in orbital coordinates." });
        } else if (stageIdx === 3) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Jump. Cut. Beg the floor to remember you." });
        } else if (stageIdx === 4) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "The lumpy marrow deforms. Feel the weight." });
        } else if (stageIdx === 5) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Cathedral toll rings. Slabs descend." });
        } else if (stageIdx === 6) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "I can be you." });
        }
      }

      if (bHealth.currentHealth <= phase2Threshold && !this.hasTriggeredPhase2) {
        this.hasTriggeredPhase2 = true;
        if (stageIdx === 0) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Edges teach faster than mercy." });
        } else if (stageIdx === 1) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Lock step! Modulo columns commit!" });
        } else if (stageIdx === 2) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Perihelion dive. No intersection." });
        } else if (stageIdx === 3) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Sine-offset splines activated. Accelerate!" });
        } else if (stageIdx === 4) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Pulsing blister cells, mutate!" });
        } else if (stageIdx === 5) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Cathedral toll commits. Sickness lean." });
        } else if (stageIdx === 6) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Glitches fracture. Replicate previous forms." });
        }
        this.events.publish("BOSS_PHASE_SHIFT", undefined);
      }

      if (bHealth.currentHealth <= phase3Threshold && !this.hasTriggeredPhase3) {
        this.hasTriggeredPhase3 = true;
        if (stageIdx === 0) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Good. Now the pit gets a vote." });
        } else if (stageIdx === 1) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Align or compress!" });
        } else if (stageIdx === 2) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Aphelion ring contracting." });
        } else if (stageIdx === 3) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Pogo taxes. Dissolving choir screams." });
        } else if (stageIdx === 4) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Contamination limits full." });
        } else if (stageIdx === 5) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Falling Nave commits." });
        } else if (stageIdx === 6) {
          this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Unstable square fails." });
        }
        this.events.publish("BOSS_PHASE_SHIFT", undefined);
      }
    }

    if (player.isDead && !this.cinematic.isActive()) {
      this.cinematic.startSequence(
        player.position,
        () => {
          this.audio.playPlayerExplosion();
        },
        [
          {
            triggerTime: 2.0,
            action: () => {
              this.events.publish("RECORD_LOSS", undefined);
            },
          },
          {
            triggerTime: 2.5,
            action: () => {
              this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: "No... I can't hold my shape..." });
            },
          },
          {
            triggerTime: 3.8,
            action: () => {
              this.events.publish("DIALOGUE_TRIGGERED", {
                speaker: "boss",
                text: "purity bends to the rules.",
              });
            },
          },
          {
            triggerTime: 7.2,
            action: () => {
              this.events.publish("CLEAR_DIALOGUES", undefined);
              this.events.publish("GAME_OVER", undefined);
              this.onBattleEnd();
            },
          },
        ]
      );
    } else if (boss.isDead && !this.cinematic.isActive()) {
      const stageIdx = useSessionStore.getState().currentStageIndex;

      this.cinematic.startSequence(
        boss.position,
        () => {
          this.audio.playBossExplosion();
        },
        [
          {
            triggerTime: 2.0,
            action: () => {
              this.events.publish("RECORD_WIN", undefined);
            },
          },
          {
            triggerTime: 2.5,
            action: () => {
              if (stageIdx === 0) {
                this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "No... You were meant to bend." });
              } else if (stageIdx === 6) {
                this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Purity... restored." });
              } else {
                this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "The outline... fractures..." });
              }
            },
          },
          {
            triggerTime: 4.8,
            action: () => {
              if (stageIdx === 0) {
                this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: "I did. I came back square." });
              } else if (stageIdx === 6) {
                this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: "I only copy the truth." });
              } else {
                this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: "The gauntlet records the measurement." });
              }
            },
          },
          {
            triggerTime: 7.2,
            action: () => {
              this.events.publish("CLEAR_DIALOGUES", undefined);
              this.events.publish("VICTORY", undefined);
              this.onBattleEnd();
            },
          },
        ]
      );
    }
  }

  public cleanup() {
    this.cinematic.cleanup();
  }
}
