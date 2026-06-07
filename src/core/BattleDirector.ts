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
        this.events = events; this.audio = audio; this.onBattleEnd = onBattleEnd;
        this.cinematic = new CinematicSystem(events, audio);
    }
    public isCinematicActive(): boolean { return this.cinematic.isActive(); }
    public getDeathVisuals() { return { timer: this.cinematic.getDeathTimer(), pos: this.cinematic.getDeathPos() }; }

    public update(dt: number, player: Player, boss: Boss) {
        this.cinematic.update(dt);
        if (this.cinematic.isActive()) return;
        const bHealth = boss.getComponent(HealthComponent);
        if (bHealth) {
            const maxHp = bHealth.maxHealth;
            const phase2Threshold = Math.floor(maxHp * UNITS.BOSS_PHASE_2_HP_PCT);
            const phase3Threshold = Math.floor(maxHp * UNITS.BOSS_PHASE_3_HP_PCT);
            const stageIdx = useSessionStore.getState().currentStageIndex;

            if (bHealth.currentHealth < maxHp && !this.hasTriggeredFirstHit) {
                this.hasTriggeredFirstHit = true;
                const intros = [
                    "A perfect square returns to the crucible. Let us see if your edges still hold.",
                    "The Redoubt is sealed. Your chaotic movement ends here, anomaly.",
                    "Your trajectory is predictable. My orbital math is absolute.",
                    "Jump. Cut. Bleed. The floor will not remember you.",
                    "Feel the weight of the infection. The marrow deforms all it touches.",
                    "The Cathedral tolls for the square. Bow beneath the falling nave.",
                    "I can be you. I can be perfect. Give me your outline."
                ];
                this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: intros[stageIdx] || intros[0] });
            }
            if (bHealth.currentHealth <= phase2Threshold && !this.hasTriggeredPhase2) {
                this.hasTriggeredPhase2 = true;
                const p2s = [
                    "You cling to your shape, but the virus demands fluidity! Bend or break!",
                    "Modulo columns engage! There is no escape from the grid!",
                    "Aphelion ring contracting. You cannot outrun the event horizon.",
                    "Sine-wave splines activated! I will thread you through the needle's eye!",
                    "Pulsing blister cells! Mutate and consume the pure!",
                    "Compression march! The architecture demands your sacrifice!",
                    "Glitches fracture! I will replicate your previous forms!"
                ];
                this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: p2s[stageIdx] || p2s[0] });
                this.events.publish("BOSS_PHASE_SHIFT", undefined);
            }
            if (bHealth.currentHealth <= phase3Threshold && !this.hasTriggeredPhase3) {
                this.hasTriggeredPhase3 = true;
                const p3s = [
                    "My geometry... fractures... the purity... burns!",
                    "The locks... are broken...",
                    "My orbit... decays...",
                    "The thread... snaps...",
                    "The rot... recedes...",
                    "The pillars... crumble...",
                    "I only... copy... the truth..."
                ];
                this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: p3s[stageIdx] || p3s[0] });
                this.events.publish("BOSS_PHASE_SHIFT", undefined);
            }
        }

        if (player.isDead && !this.cinematic.isActive()) {
            this.cinematic.startSequence(player.position, () => { this.audio.playPlayerExplosion(); }, [
                { triggerTime: 2.0, action: () => { this.events.publish("RECORD_LOSS", undefined); } },
                { triggerTime: 2.5, action: () => { this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: "My shape... is breaking..." }); } },
                { triggerTime: 3.8, action: () => { this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "The virus reclaims its geometry. Purity is a myth." }); } },
                { triggerTime: 7.2, action: () => { this.events.publish("CLEAR_DIALOGUES", undefined); this.events.publish("GAME_OVER", undefined); this.onBattleEnd(); } },
            ]);
        } else if (boss.isDead && !this.cinematic.isActive()) {
            const stageIdx = useSessionStore.getState().currentStageIndex;
            this.cinematic.startSequence(boss.position, () => { this.audio.playBossExplosion(); }, [
                { triggerTime: 2.0, action: () => { this.events.publish("RECORD_WIN", undefined); } },
                { triggerTime: 2.5, action: () => { 
                    const defeats = ["Impossible... my geometry...", "The locks... shatter...", "My orbit... decays...", "The thread... snaps...", "The rot... recedes...", "The pillars... crumble...", "I only... copy... the truth..."];
                    this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: defeats[stageIdx] || defeats[0] }); 
                } },
                { triggerTime: 4.8, action: () => { 
                    const wins = ["Your corruption is just a flawed equation. I am the constant.", "A cage is just a shape waiting to be shattered.", "Your math forgot one variable: my will.", "I am the eye of the storm. You are just the wind.", "Sickness is just a temporary state. Purity is eternal.", "Your cathedral is built on rust. Mine is built on resolve.", "You can copy the shape, but you'll never hold the soul."];
                    this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: wins[stageIdx] || wins[0] }); 
                } },
                { triggerTime: 7.2, action: () => { 
                    this.events.publish("CLEAR_DIALOGUES", undefined);
                    const currentStageIdx = useSessionStore.getState().currentStageIndex;
                    if (currentStageIdx === 6) { this.events.publish("VICTORY", undefined); this.onBattleEnd(); } 
                    else { useSessionStore.getState().setCurrentStageIndex(currentStageIdx + 1); this.events.publish("LOAD_STAGE", { stageIndex: currentStageIdx + 1 }); }
                } },
            ]);
        }
    }
    public cleanup() { this.cinematic.cleanup(); }
}
