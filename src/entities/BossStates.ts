import { TrigLUT } from "@/core/TrigLUT";
import { IState } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { Boss } from "./Boss";
import { Player } from "./Player";
import { PhysicsComponent } from "@/entities/components/PhysicsComponent";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { setVec } from "@/core/VecUtils";
import { selectBestAttack, BossAttackContext, IBossAttackState } from "./BossAttackPatterns";

export abstract class BossState implements IState {
  protected owner: Boss;

  constructor(owner: Boss) {
    this.owner = owner;
  }

  public abstract enter(): void;
  public abstract update(dt: number): void;
  public abstract exit(): void;
}

export class BossCooldownState extends BossState {
  private duration: number = 2.0;
  private overrideDuration: number = -1;

  constructor(owner: Boss) {
    super(owner);
  }

  public setDuration(customDuration: number) {
    this.overrideDuration = customDuration;
  }

  public enter(): void {
    this.owner.velocity.x = 0;
    if (this.overrideDuration > 0) {
      this.duration = this.overrideDuration;
      this.overrideDuration = -1;
    } else {
      this.duration = this.owner.currentPhase === 3 ? 1.2 : 2.0;
    }
    setVec(this.owner.targetVisualScale, 1.0, 1.0);
  }

  public update(dt: number): void {
    this.duration -= dt;
    this.owner.velocity.x += (0 - this.owner.velocity.x) * UNITS.BOSS_DECEL * dt;
    if (this.duration <= 0) {
      this.owner.stateMachine.changeState(this.owner.patrolState);
    }
  }

  public exit(): void {}
}

export class BossPatrolState extends BossState {
  private duration: number = 2.0;

  public enter(): void {
    setVec(this.owner.targetVisualScale, 1.0, 1.0);
    this.duration = this.owner.currentPhase === 3 ? 1.0 : 2.0;
  }

  public update(dt: number): void {
    this.duration -= dt;
    const physics = this.owner.getComponent(PhysicsComponent);

    const targetSpeed = this.owner.facingDirection * this.owner.patrolSpeed;
    this.owner.velocity.x += (targetSpeed - this.owner.velocity.x) * UNITS.BOSS_ACCEL * dt;

    if (physics) {
      if (physics.isOnWallLeft) {
        this.owner.facingDirection = 1;
      } else if (physics.isOnWallRight) {
        this.owner.facingDirection = -1;
      }
    }

    const player = this.owner.world.player;
    if (player && !player.isDead) {
      const distance = Math.abs(player.position.x - this.owner.position.x);
      const distanceY = Math.abs(player.position.y - this.owner.position.y);
      if (distance < 120 && distanceY < 60) {
        this.owner.stateMachine.changeState(this.owner.telegraphState);
        return;
      }
    }

    if (this.duration <= 0) {
      this.owner.stateMachine.changeState(this.owner.attackState);
    }
  }

  public exit(): void {
    this.owner.velocity.x = 0;
  }
}

export class BossMeleeState extends BossState {
  private duration: number = 0.5;

  public enter(): void {
    this.owner.velocity.x = 0;
    this.duration = 0.5;
    this.owner.world.events.publish("BOSS_SWIPED", undefined);
  }

  public update(dt: number): void {
    this.duration -= dt;
    if (this.duration <= 0) {
      this.owner.cooldownState.setDuration(1.0);
      this.owner.stateMachine.changeState(this.owner.cooldownState);
    }
  }

  public exit(): void {}
}

export class BossAttackState extends BossState implements IBossAttackState {
  public attackType: "SINGLE_SHOT" | "VOLLEY" | "OMNI_BURST" | "FAN_BURST" | "PREDICTIVE_SHOT" | "GAP_RING" = "SINGLE_SHOT";
  public durationTimer: number = 0;
  public volleyCount: number = 0;
  public volleyTimer: number = 0;

  constructor(owner: Boss) {
    super(owner);
  }

  public getBoss(): Boss {
    return this.owner;
  }

  public enter(): void {
    this.owner.velocity.x = 0;
    const player = this.owner.world.player as Player;
    if (!player || player.isDead) {
      this.owner.stateMachine.changeState(this.owner.cooldownState);
      return;
    }

    const playerHealth = player.getComponent(HealthComponent);
    const playerHp = playerHealth ? playerHealth.currentHealth : 5;

    const ctx: BossAttackContext = {
      phase: this.owner.currentPhase,
      distanceToPlayer: Math.abs(player.position.x - this.owner.position.x),
      playerIsAirborne: !player.physics.isGrounded,
      playerHP: playerHp,
      activeMinionsCount: this.owner.world.minions.length,
      recentAttackIds: [...this.owner.recentAttackIds],
      timeSinceLastProjectileHeavy: this.owner.timeSinceLastProjectileHeavy,
    };

    const pattern = selectBestAttack(ctx);

    this.owner.recentAttackIds.push(pattern.id);
    if (this.owner.recentAttackIds.length > 3) {
      this.owner.recentAttackIds.shift();
    }

    this.attackType = pattern.id as "SINGLE_SHOT" | "VOLLEY" | "OMNI_BURST" | "FAN_BURST" | "PREDICTIVE_SHOT" | "GAP_RING";
    pattern.configure(this);

    this.executeImmediateFire();
  }

  private executeImmediateFire() {
    if (this.attackType === "OMNI_BURST") {
      this.fireOmniBurst();
    } else if (this.attackType === "FAN_BURST") {
      this.fireFanBurst();
    } else if (this.attackType === "PREDICTIVE_SHOT") {
      this.firePredictiveShot();
    } else if (this.attackType === "GAP_RING") {
      this.fireGapRing();
    }
  }

  public update(dt: number): void {
    this.durationTimer -= dt;

    if (this.attackType === "VOLLEY" && this.volleyCount > 0) {
      this.volleyTimer -= dt;
      if (this.volleyTimer <= 0) {
        this.owner.fireSingleShotAtPlayer();
        this.volleyCount--;
        this.volleyTimer = this.owner.currentPhase === 3 ? 0.10 : 0.12;
      }
    }

    if (this.durationTimer <= 0) {
      let cooldown = 1.2;
      if (this.attackType === "VOLLEY") cooldown = 2.0;
      else if (this.attackType === "OMNI_BURST") cooldown = 2.5;
      else if (this.attackType === "GAP_RING") cooldown = 3.0;

      this.owner.cooldownState.setDuration(cooldown);
      this.owner.stateMachine.changeState(this.owner.cooldownState);
    }
  }

  private fireOmniBurst() {
    const phase = this.owner.currentPhase;
    const projectileCount = phase === 1 ? 12 : phase === 2 ? 18 : 24;
    const angleStep = (Math.PI * 2) / projectileCount;

    for (let i = 0; i < projectileCount; i++) {
      const angle = i * angleStep;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        280,
        4.0
      );
    }
  }

  private fireFanBurst() {
    const player = this.owner.world.player;
    if (!player) return;

    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const centerAngle = TrigLUT.atan2(dy, dx);

    const phase = this.owner.currentPhase;
    const count = phase === 2 ? 7 : 12;
    const totalSpread = (phase === 2 ? 55 : 80) * (Math.PI / 180);
    const startAngle = centerAngle - totalSpread / 2;
    const step = totalSpread / (count - 1);

    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * step;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        300,
        5.0
      );
    }
  }

  private firePredictiveShot() {
    const player = this.owner.world.player;
    if (!player) return;

    const leadTime = 0.35;
    const predX = player.position.x + player.velocity.x * leadTime;
    const predY = player.position.y + player.velocity.y * leadTime;

    const dx = predX - this.owner.position.x;
    const dy = predY - this.owner.position.y;
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag === 0) return;

    const dirX = dx / mag;
    const dirY = dy / mag;

    const proj = this.owner.world.spawnProjectile(
      this.owner.position.x + dirX * 45,
      this.owner.position.y + dirY * 45,
      dirX,
      dirY,
      "boss",
      2,
      450,
      6.0
    );

    proj.size = { width: 17.6, height: 17.6 };
  }

  private fireGapRing() {
    const player = this.owner.world.player;
    if (!player) return;

    const leadTime = 0.3;
    const predX = player.position.x + player.velocity.x * leadTime;
    const predY = player.position.y + player.velocity.y * leadTime;

    const dx = predX - this.owner.position.x;
    const dy = predY - this.owner.position.y;
    const targetAngle = TrigLUT.atan2(dy, dx);

    const projCount = 18;
    const angleStep = (Math.PI * 2) / projCount;

    for (let i = 0; i < projCount; i++) {
      const angle = i * angleStep;
      let diff = Math.abs(angle - targetAngle) % (Math.PI * 2);
      if (diff > Math.PI) diff = Math.PI * 2 - diff;

      if (diff < 0.22) {
        continue;
      }

      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        280,
        4.0
      );
    }
  }

  public exit(): void {}
}

export class BossTelegraphState extends BossState {
  private duration: number = 0.8;

  public enter(): void {
    this.owner.velocity.x = 0;
    this.duration = this.owner.currentPhase === 3 ? 0.35 : 0.6;
    setVec(this.owner.visualScale, 1.25, 0.75);
    setVec(this.owner.targetVisualScale, 1.15, 0.85);
    this.owner.world.events.publish("BOSS_TELEGRAPH", undefined);
  }

  public update(dt: number): void {
    this.duration -= dt;
    if (this.duration <= 0) {
      this.owner.stateMachine.changeState(this.owner.lungeState);
    }
  }

  public exit(): void {
    const player = this.owner.world.player;
    if (player) {
      const dir = Math.sign(player.position.x - this.owner.position.x);
      this.owner.facingDirection = dir !== 0 ? dir : this.owner.facingDirection;
    }
  }
}

export class BossLungeState extends BossState {
  private duration: number = 0.5;

  public enter(): void {
    this.duration = 0.5;
    setVec(this.owner.visualScale, 1.35, 0.65);
    setVec(this.owner.targetVisualScale, 1.2, 0.8);
    this.owner.world.events.publish("BOSS_LUNGED", undefined);
  }

  public update(dt: number): void {
    this.duration -= dt;
    const targetSpeed = this.owner.facingDirection * this.owner.lungeSpeed;
    this.owner.velocity.x += (targetSpeed - this.owner.velocity.x) * UNITS.BOSS_ACCEL * dt;

    const physics = this.owner.getComponent(PhysicsComponent);
    const hitWall = physics ? physics.isOnWallLeft || physics.isOnWallRight : false;

    if (this.duration <= 0 || hitWall) {
      this.owner.stateMachine.changeState(this.owner.cooldownState);
    }
  }

  public exit(): void {
    const physics = this.owner.getComponent(PhysicsComponent);
    const hitWall = physics ? physics.isOnWallLeft || physics.isOnWallRight : false;

    if (hitWall && physics) {
      this.owner.velocity.x = -this.owner.facingDirection * UNITS.BOSS_WALL_REBOUND_VELOCITY;
      setVec(this.owner.visualScale, 0.7, 1.3);
      setVec(this.owner.targetVisualScale, 1.0, 1.0);
      this.owner.rotationVelocity = -this.owner.facingDirection * 28;

      const impactSide = physics.isOnWallLeft ? -1 : 1;
      const wallX = this.owner.position.x + impactSide * (this.owner.size.width / 2);
      this.owner.world.events.publishSpark(wallX, this.owner.position.y, impactSide > 0 ? Math.PI : 0, "hsl(350, 80%, 60%)", true, 15);
      this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 16, duration: 0.3 });
    } else {
      this.owner.velocity.x = 0;
      setVec(this.owner.visualScale, 0.8, 1.2);
      setVec(this.owner.targetVisualScale, 1.0, 1.0);
      this.owner.rotationVelocity = -this.owner.facingDirection * 15;
    }
  }
}

export class BossDeadState extends BossState {
  public enter(): void {
    this.owner.velocity.x = 0;
    this.owner.velocity.y = 0;
  }

  public update(_dt: number): void {}
  public exit(): void {}
}
