import { BaseMinion } from "./BaseMinion";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { IWorld } from "@/core/Interfaces";
import { FlyerPatrolState } from "./MinionStates";
import { setVec } from "@/core/VecUtils";
import { VisualProfile } from "@/core/visuals/ShapeRenderer";

export class FlyerMinion extends BaseMinion {
  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 32, height: 32 };
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 3,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.physics.gravity = 0;

    this.pointA = { ...startPos };
    setVec(this.pointB, startPos.x, startPos.y - 180);
    this.squashPivot = "center";
    this.bodyColorValue = "hsl(200, 70%, 55%)";
    this.cageColorValue = "hsla(200,85%,65%,";
    this.dissolveColorValue = "hsl(200,80%,65%)";
    this.initState(new FlyerPatrolState(this));
  }

  get minionColor(): string {
    return "hsl(200, 70%, 55%)";
  }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "needle",
      danger: 0.3,
      weight: 0.1,
      corruption: 0.3,
      hueRole: "minion-logic",
      strokePx: 1.5,
      spinRate: 1.2,
      wobbleAmp: 0.2,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  protected updateExhaust(): void {
    const isTelegraph = this.attackState === "TELEGRAPH";
    this.exhaustTimer = isTelegraph ? 0.04 : 0.08;
    const sparkColor = isTelegraph ? "hsl(45, 100%, 60%)" : "hsl(200, 80%, 65%)";
    this.world.events.publishSpark(
      this.position.x,
      this.position.y + this.size.height / 2,
      Math.PI / 2,
      sparkColor,
      false,
      isTelegraph ? 6 : 2
    );
  }
}
