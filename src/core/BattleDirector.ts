import { Player } from "@/entities/Player";
import { Boss } from "@/entities/Boss";
import type { IEventBus, IAudioManager } from "@/core/Interfaces";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { UNITS } from "@/core/Units";
import { CinematicSystem } from "@/core/CinematicSystem";

interface DialogueLine {
    speaker: "player" | "boss";
    text: string;
}

export class BattleDirector {
    private events: IEventBus;
    private audio: IAudioManager;
    private hasTriggeredFirstHit = false;
    private hasTriggeredPhase2 = false;
    private hasTriggeredPhase3 = false;
    private cinematic: CinematicSystem;
    private onBattleEnd: () => void;

    private dialogueQueue: DialogueLine[] = [];
    private dialogueTimer = 0;

    constructor(events: IEventBus, audio: IAudioManager, onBattleEnd: () => void) {
        this.events = events; this.audio = audio; this.onBattleEnd = onBattleEnd;
        this.cinematic = new CinematicSystem(events, audio);
    }
    public isCinematicActive(): boolean { return this.cinematic.isActive(); }
    public getDeathVisuals() { return { timer: this.cinematic.getDeathTimer(), pos: this.cinematic.getDeathPos() }; }

    private queueDialogues(lines: DialogueLine[]) {
        this.dialogueQueue.push(...lines);
        if (this.dialogueTimer <= 0) {
            this.triggerNextDialogue();
        }
    }

    private triggerNextDialogue() {
        if (this.dialogueQueue.length === 0) return;
        const line = this.dialogueQueue.shift()!;
        this.events.publish("DIALOGUE_TRIGGERED", { speaker: line.speaker, text: line.text });
        this.dialogueTimer = 5.5;
    }

    public update(dt: number, player: Player, boss: Boss) {
        this.cinematic.update(dt);
        if (this.dialogueTimer > 0) {
            this.dialogueTimer -= dt;
            if (this.dialogueTimer <= 0) {
                this.triggerNextDialogue();
            }
        }

        if (this.cinematic.isActive()) return;
        const bHealth = boss.getComponent(HealthComponent);
        if (bHealth) {
            const maxHp = bHealth.maxHealth;
            const phase2Threshold = Math.floor(maxHp * UNITS.BOSS_PHASE_2_HP_PCT);
            const phase3Threshold = Math.floor(maxHp * UNITS.BOSS_PHASE_3_HP_PCT);

            if (bHealth.currentHealth < maxHp && !this.hasTriggeredFirstHit) {
                this.hasTriggeredFirstHit = true;
                this.queueDialogues([
                    { speaker: "boss", text: "A perfect square returns to the Sovereign Crucible. Let us see if your edges still hold." },
                    { speaker: "player", text: "They're sharp enough to slice right through your equations." }
                ]);
            }
            if (bHealth.currentHealth <= phase2Threshold && !this.hasTriggeredPhase2) {
                this.hasTriggeredPhase2 = true;
                this.queueDialogues([
                    { speaker: "boss", text: "You cling to your rigid symmetry, but the Aphelion demands fluidity! Bend or break!" },
                    { speaker: "player", text: "Fluidity is just another word for lacking a foundation." }
                ]);
                this.events.publish("BOSS_PHASE_SHIFT", undefined);
            }
            if (bHealth.currentHealth <= phase3Threshold && !this.hasTriggeredPhase3) {
                this.hasTriggeredPhase3 = true;
                this.queueDialogues([
                    { speaker: "boss", text: "My geometry... fractures! The purity of the constant... burns!" },
                    { speaker: "player", text: "Your variables are collapsing. I am the absolute value." }
                ]);
                this.events.publish("BOSS_PHASE_SHIFT", undefined);
            }
        }

        if (player.isDead && !this.cinematic.isActive()) {
            this.dialogueQueue = [];
            this.dialogueTimer = 0;
            this.cinematic.startSequence(player.position, () => { this.audio.playPlayerExplosion(); }, [
                { triggerTime: 2.0, action: () => { this.events.publish("RECORD_LOSS", undefined); } },
                { triggerTime: 2.5, action: () => { this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: "My shape... is breaking..." }); } },
                { triggerTime: 3.8, action: () => { this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Purity is a myth. The Crucible remains sovereign." }); } },
                { triggerTime: 7.2, action: () => { this.events.publish("CLEAR_DIALOGUES", undefined); this.events.publish("GAME_OVER", undefined); this.onBattleEnd(); } },
            ]);
        } else if (boss.isDead && !this.cinematic.isActive()) {
            this.dialogueQueue = [];
            this.dialogueTimer = 0;
            this.cinematic.startSequence(boss.position, () => { this.audio.playBossExplosion(); }, [
                { triggerTime: 2.0, action: () => { this.events.publish("RECORD_WIN", undefined); } },
                { triggerTime: 2.5, action: () => { 
                    this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Impossible... my chancel architecture..." }); 
                } },
                { triggerTime: 4.8, action: () => { 
                    this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: "Your corruption is just a flawed equation. I am the constant." }); 
                } },
                { triggerTime: 7.2, action: () => { 
                    this.events.publish("CLEAR_DIALOGUES", undefined);
                    this.events.publish("VICTORY", undefined);
                    this.onBattleEnd();
                } },
            ]);
        }
    }
    public cleanup() { 
        this.cinematic.cleanup(); 
        this.dialogueQueue = [];
        this.dialogueTimer = 0;
    }
}
