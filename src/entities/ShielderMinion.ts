import { BaseMinion } from "./BaseMinion";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { IWorld } from "@/core/Interfaces";
import { IState } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { TrigLUT } from "@/core/TrigLUT";
import { VisualProfile } from "@/core/visuals/ShapeRenderer";

export class ShielderPatrolState implements IState {
  private owner: ShielderMinion;

  constructor(owner: ShielderMinion) {
    this.owner = owner;
  }

  public enter(): void {
    this.owner.attackState = "PATROL";
  }

  public update(dt: number): void {
    const targetSpeed = this.owner.facingDirection * this.owner.patrolSpeed;
    this.owner.velocity.x += (targetSpeed - this.owner.velocity.x) * UNITS.MINION_ACCEL * dt;

    const physics = this.owner.physics;
    if (physics) {
      if (physics.isOnWallLeft) {
        this.owner.facingDirection = 1;
      } else if (physics.isOnWallRight) {
        this.owner.facingDirection = -1;
      }
    }

    const player = this.owner.world.player;
    if (player && !player.isDead) {
      const distX = Math.abs(player.position.x - this.owner.position.x);
      if (distX < 350) {
        this.owner.facingDirection = Math.sign(player.position.x - this.owner.position.x) || 1;
      }
    }
  }

  public exit(): void {}
}

export class ShielderMinion extends BaseMinion {
  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 35.2, height: 40 };
    this.patrolSpeed = 80;

    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 5,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });

    this.bodyColorValue = "hsl(180, 50%, 45%)";
    this.cageColorValue = "hsla(180,85%,65%,";
    this.dissolveColorValue = "hsl(180,70%,45%)";

    this.health.onBeforeDamage = (amount: number, sourceX: number): boolean => {
      if (this.isSpawning || this.isDying || this.isDead) {
        return false;
      }

      if (amount < 3) {
        const isAttackedFromFront =
          (this.facingDirection > 0 && sourceX > this.position.x) ||
          (this.facingDirection < 0 && sourceX < this.position.x);

        if (isAttackedFromFront) {
          this.world.events.publishSpark(
            this.position.x + this.facingDirection * 18,
            this.position.y,
            this.facingDirection > 0 ? 0 : Math.PI,
            "hsl(45, 100%, 65%)",
            true,
            12
          );
          this.world.audio.playErrorTick();
          
          this.applyScaleImpulse(-0.15, 0.3);
          return false;
        }
      }

      return true;
    };

    this.initState(new ShielderPatrolState(this));
  }

  get minionColor(): string {
    return "hsl(180, 50%, 45%)";
  }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "hex",
      danger: 0.1,
      weight: 0.8,
      corruption: 0.2,
      hueRole: "minion-logic",
      strokePx: 2.5,
      spinRate: 0,
      wobbleAmp: 0,
      cornerRadius: 4,
      phaseOffset: 0
    };
  }

  protected updateExhaust(): void {
    if (Math.abs(this.velocity.x) > 0 && this.physics.isGrounded) {
      this.exhaustTimer = 0.15;
      this.world.events.publishSpark(
        this.position.x - this.facingDirection * (this.size.width / 2),
        this.position.y + this.size.height / 2,
        TrigLUT.atan2(0.5, -this.facingDirection) + (TrigLUT.random() * 0.3 - 0.15),
        "rgba(255, 255, 255, 0.25)",
        false,
        1
      );
    }
  }
}
