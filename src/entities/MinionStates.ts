import { IState } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { BaseMinion } from "./BaseMinion";
import { LancerMinion } from "./LancerMinion";
import { setVec, zeroVec } from "@/core/VecUtils";
import { TrigLUT } from "@/core/TrigLUT";

export abstract class MinionState implements IState {
  protected owner: BaseMinion;

  constructor(owner: BaseMinion) {
    this.owner = owner;
  }

  public abstract enter(): void;
  public abstract update(dt: number): void;
  public abstract exit(): void;
}

export class TurretPatrolState extends MinionState {
  public enter(): void {
    this.owner.attackState = "PATROL";
    zeroVec(this.owner.velocity);
  }

  public update(_dt: number): void {
    zeroVec(this.owner.velocity);
    const player = this.owner.world.player;
    if (!player || player.isDead) return;

    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const distSq = dx * dx + dy * dy;

    if (distSq > 14400 && distSq < 176400 && this.owner.shootTimer <= 0) {
      if (this.hasLineOfSight(player.position)) {
        this.owner.stateMachine.changeState(new TurretTelegraphState(this.owner));
      }
    }
  }

  private hasLineOfSight(playerPos: { x: number; y: number }): boolean {
    const steps = 6;
    const startX = this.owner.position.x;
    const startY = this.owner.position.y - 12;
    const dx = playerPos.x - startX;
    const dy = playerPos.y - startY;

    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const checkX = startX + dx * t;
      const checkY = startY + dy * t;

      const solidCandidates = this.owner.world.physicsWorld.getOverlapCandidates(
        checkX, checkY, 8, 8, "solid"
      );

      for (const solid of solidCandidates) {
        if (
          checkX > solid.x && checkX < solid.x + solid.width &&
          checkY > solid.y && checkY < solid.y + solid.height
        ) {
          return false;
        }
      }
    }
    return true;
  }

  public exit(): void {}
}

export class TurretTelegraphState extends MinionState {
  public enter(): void {
    this.owner.attackState = "TELEGRAPH";
    this.owner.stateTimer = 0.5;
    zeroVec(this.owner.velocity);
  }

  public update(_dt: number): void {
    zeroVec(this.owner.velocity);
    if (this.owner.stateTimer <= 0) {
      const rand = TrigLUT.randomGameplay();
      
      if (rand < 0.6) {
        this.owner.stateMachine.changeState(new TurretBurstState(this.owner));
      } else {
        const player = this.owner.world.player;
        if (player && !player.isDead) {
          this.owner.fireSingleShotAtPlayer(player);
        }
        this.owner.shootTimer = 2.5;
        this.owner.stateMachine.changeState(new TurretPatrolState(this.owner));
      }
    }
  }

  public exit(): void {}
}

export class TurretBurstState extends MinionState {
  private shotsFired = 0;
  private burstTimer = 0;

  public enter(): void {
    this.owner.attackState = "ATTACK";
    this.shotsFired = 0;
    this.burstTimer = 0;
  }

  public update(dt: number): void {
    zeroVec(this.owner.velocity);
    this.burstTimer -= dt;

    if (this.burstTimer <= 0 && this.shotsFired < 4) {
      const player = this.owner.world.player;
      if (player && !player.isDead) {
        const dx = player.position.x - this.owner.position.x;
        const dy = player.position.y - this.owner.position.y;
        const mag = Math.sqrt(dx * dx + dy * dy);

        if (mag > 0) {
          const dirX = dx / mag;
          const dirY = dy / mag;

          const proj = this.owner.world.spawnProjectile(
            this.owner.position.x + dirX * 30,
            this.owner.position.y - 12 + dirY * 30,
            dirX,
            dirY,
            "boss",
            1,
            240,
            3.5,
            "hsl(180, 100%, 65%)",
            "homing"
          );

          proj.size = { width: 16, height: 16 };
        }
      }

      this.owner.world.audio.playSelectTick();

      this.shotsFired++;
      this.burstTimer = 0.14;
    }

    if (this.shotsFired >= 4) {
      this.owner.shootTimer = 3.0;
      this.owner.stateMachine.changeState(new TurretPatrolState(this.owner));
    }
  }

  public exit(): void {}
}

export class LancerPatrolState extends MinionState {
  public enter(): void {
    this.owner.attackState = "PATROL";
    setVec(this.owner.targetVisualScale, 1.0, 1.0);
  }

  public update(_dt: number): void {
    minionPatrolMovement(this.owner, _dt);

    const player = this.owner.world.player;
    if (player && !player.isDead) {
      const distY = Math.abs(player.position.y - this.owner.position.y);
      const distX = player.position.x - this.owner.position.x;

      if (distY < 40 && Math.abs(distX) < 160 && Math.sign(distX) === this.owner.facingDirection) {
        this.owner.stateMachine.changeState(new LancerTelegraphState(this.owner));
      }
    }
  }

  public exit(): void {}
}

export class LancerTelegraphState extends MinionState {
  public enter(): void {
    this.owner.attackState = "TELEGRAPH";
    this.owner.stateTimer = 0.4;
    this.owner.velocity.x = 0;
    setVec(this.owner.visualScale, 1.18, 0.82);
    setVec(this.owner.targetVisualScale, 1.1, 0.9);
  }

  public update(_dt: number): void {
    this.owner.velocity.x = 0;
    if (this.owner.stateTimer <= 0) {
      this.owner.stateMachine.changeState(new LancerAttackState(this.owner));
    }
  }

  public exit(): void {}
}

export class LancerAttackState extends MinionState {
  public enter(): void {
    this.owner.attackState = "ATTACK";
    this.owner.stateTimer = 0.25;
    this.owner.velocity.x = this.owner.facingDirection * 450;
    setVec(this.owner.visualScale, 1.26, 0.74);
    setVec(this.owner.targetVisualScale, 1.15, 0.85);
  }

  public update(_dt: number): void {
    this.owner.velocity.x = this.owner.facingDirection * 450;
    const physics = this.owner.physics;
    const hitWall = physics ? physics.isOnWallLeft || physics.isOnWallRight : false;

    const elapsed = 0.25 - this.owner.stateTimer;
    if (this.owner instanceof LancerMinion) {
      this.owner.lanceExtended = elapsed >= 0.05 && elapsed <= 0.22;
    }

    if (this.owner.stateTimer <= 0 || hitWall) {
      this.owner.stateMachine.changeState(new LancerCooldownState(this.owner));
    }
  }

  public exit(): void {
    if (this.owner instanceof LancerMinion) {
      this.owner.lanceExtended = false;
    }
  }
}

export class LancerCooldownState extends MinionState {
  public enter(): void {
    this.owner.attackState = "COOLDOWN";
    this.owner.stateTimer = 1.0;
    this.owner.velocity.x = 0;
    setVec(this.owner.visualScale, 0.85, 1.15);
    setVec(this.owner.targetVisualScale, 1.0, 1.0);
  }

  public update(_dt: number): void {
    this.owner.velocity.x = 0;
    if (this.owner.stateTimer <= 0) {
      this.owner.stateMachine.changeState(new LancerPatrolState(this.owner));
    }
  }

  public exit(): void {}
}

function minionPatrolMovement(minion: BaseMinion, dt: number) {
  const targetSpeed = minion.facingDirection * minion.patrolSpeed;
  const rate = targetSpeed !== 0 ? UNITS.MINION_ACCEL : UNITS.MINION_DECEL;
  minion.velocity.x += (targetSpeed - minion.velocity.x) * rate * dt;
  const physics = minion.physics;
  if (physics) {
    if (physics.isOnWallLeft) minion.facingDirection = 1;
    else if (physics.isOnWallRight) minion.facingDirection = -1;
  }

  if (physics && physics.isGrounded) {
    const checkDist = 20;
    const forwardX = minion.position.x + minion.facingDirection * checkDist;
    const belowY = minion.position.y + minion.size.height / 2 + 10;
    
    const solids = minion.world.physicsWorld.getOverlapCandidates(forwardX, belowY, 8, 8, "solid");
    const platforms = minion.world.physicsWorld.getOverlapCandidates(forwardX, belowY, 8, 8, "platform");

    let hasGroundAhead = false;
    for (const solid of solids) {
      if (forwardX > solid.x && forwardX < solid.x + solid.width && belowY > solid.y && belowY < solid.y + solid.height) {
        hasGroundAhead = true;
        break;
      }
    }
    if (!hasGroundAhead) {
      for (const plat of platforms) {
        if (forwardX > plat.x && forwardX < plat.x + plat.width && belowY > plat.y && belowY < plat.y + plat.height) {
          hasGroundAhead = true;
          break;
        }
      }
    }

    if (!hasGroundAhead) {
      minion.facingDirection *= -1;
      minion.velocity.x = 0;
    }
  }
}

export class FlyerPatrolState extends MinionState {
  public enter(): void {
    this.owner.attackState = "PATROL";
  }

  public update(_dt: number): void {
    const targetPos = this.owner.flyerTarget === "A" ? this.owner.pointA : this.owner.pointB;
    const dx = targetPos.x - this.owner.position.x;
    const dy = targetPos.y - this.owner.position.y;
    const distSq = dx * dx + dy * dy;

    if (distSq < 25) {
      this.owner.flyerTarget = this.owner.flyerTarget === "A" ? "B" : "A";
    } else {
      const dist = Math.sqrt(distSq);
      const targetVelX = (dx / dist) * this.owner.patrolSpeed;
      const targetVelY = (dy / dist) * this.owner.patrolSpeed;
      this.owner.velocity.x += (targetVelX - this.owner.velocity.x) * UNITS.MINION_ACCEL * _dt;
      this.owner.velocity.y += (targetVelY - this.owner.velocity.y) * UNITS.MINION_ACCEL * _dt;
    }

    const player = this.owner.world.player;
    if (player && !player.isDead) {
      const dxP = player.position.x - this.owner.position.x;
      const dyP = player.position.y - this.owner.position.y;
      const playerDistSq = dxP * dxP + dyP * dyP;

      if (playerDistSq < 62500 && this.owner.shootTimer <= -3.0) {
        this.owner.stateMachine.changeState(new FlyerDiveState(this.owner));
        return;
      }

      if (playerDistSq < 230400 && this.owner.shootTimer <= 0 && this.owner.volleyCount === 0) {
        this.owner.stateMachine.changeState(new FlyerTelegraphState(this.owner));
      }
    }
  }

  public exit(): void {}
}

export class FlyerTelegraphState extends MinionState {
  public enter(): void {
    this.owner.attackState = "TELEGRAPH";
    this.owner.stateTimer = 0.5;
    zeroVec(this.owner.velocity);
  }

  public update(_dt: number): void {
    zeroVec(this.owner.velocity);
    if (this.owner.stateTimer <= 0) {
      this.owner.stateMachine.changeState(new FlyerAttackState(this.owner));
    }
  }

  public exit(): void {}
}

export class FlyerAttackState extends MinionState {
  public enter(): void {
    this.owner.attackState = "ATTACK";
    this.owner.volleyCount = 5;
    this.owner.volleyTimer = 0;
    this.owner.shootTimer = 3.5;
  }

  public update(dt: number): void {
    this.owner.velocity = { x: this.owner.velocity.x * 0.9, y: this.owner.velocity.y * 0.9 };
    const player = this.owner.world.player;

    if (this.owner.volleyCount > 0) {
      this.owner.volleyTimer -= dt;
      if (this.owner.volleyTimer <= 0 && player && !player.isDead) {
        this.owner.fireSingleShotAtPlayer(player);
        this.owner.volleyCount--;
        this.owner.volleyTimer = 0.16;
      }
    }

    if (this.owner.volleyCount === 0) {
      this.owner.stateMachine.changeState(new FlyerPatrolState(this.owner));
    }
  }

  public exit(): void {}
}

export class FlyerDiveState extends MinionState {
  private diveTimer = 0;
  private stage: "DIVE" | "PAUSE" | "RECOVER" = "DIVE";

  public enter(): void {
    this.owner.attackState = "ATTACK";
    this.stage = "DIVE";
    this.diveTimer = 0.8;
    setVec(this.owner.visualScale, 0.85, 1.15);

    const player = this.owner.world.player;
    if (player) {
      const dx = player.position.x - this.owner.position.x;
      const dy = player.position.y - this.owner.position.y;
      const mag = Math.sqrt(dx * dx + dy * dy);
      if (mag > 0) {
        this.owner.velocity.x = (dx / mag) * 650;
        this.owner.velocity.y = (dy / mag) * 650;
      }
    }
  }

  public update(dt: number): void {
    if (this.stage === "DIVE") {
      this.diveTimer -= dt;
      const hitObstacle = this.owner.physics.isGrounded;

      if (this.diveTimer <= 0 || hitObstacle) {
        this.stage = "PAUSE";
        this.diveTimer = 0.5;
        zeroVec(this.owner.velocity);
        setVec(this.owner.visualScale, 1.25, 0.75);
        this.owner.world.events.publishSpark(this.owner.position.x, this.owner.position.y + 12, 0, "hsl(200, 80%, 65%)", true, 10);
      }
    } else if (this.stage === "PAUSE") {
      this.diveTimer -= dt;
      zeroVec(this.owner.velocity);
      if (this.diveTimer <= 0) {
        this.stage = "RECOVER";
        this.diveTimer = 1.0;
        setVec(this.owner.targetVisualScale, 1.0, 1.0);
      }
    } else if (this.stage === "RECOVER") {
      this.diveTimer -= dt;
      const startPos = this.owner.pointA;
      const dx = startPos.x - this.owner.position.x;
      const dy = startPos.y - this.owner.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        this.owner.velocity.x = (dx / dist) * 180;
        this.owner.velocity.y = (dy / dist) * 180;
      }

      if (this.diveTimer <= 0 || dist <= 15) {
        this.owner.shootTimer = 3.5;
        this.owner.stateMachine.changeState(new FlyerPatrolState(this.owner));
      }
    }
  }

  public exit(): void {}
}
