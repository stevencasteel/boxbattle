import { BaseMinion } from "./BaseMinion";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { IWorld } from "@/core/Interfaces";
import { IState } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { TrigLUT } from "@/core/TrigLUT";
import { VisualProfile } from "@/core/visuals/ShapeRenderer";
import { zeroVec } from "@/core/VecUtils";
import { Player } from "@/entities/Player";

export class SimplePatrolState implements IState {
  private owner: BaseMinion;
  constructor(owner: BaseMinion) { this.owner = owner; }
  public enter(): void { this.owner.attackState = "PATROL"; }
  public update(dt: number): void {
    const targetSpeed = this.owner.facingDirection * this.owner.patrolSpeed;
    this.owner.velocity.x += (targetSpeed - this.owner.velocity.x) * UNITS.MINION_ACCEL * dt;

    const physics = this.owner.physics;
    if (physics) {
      if (physics.isOnWallLeft) this.owner.facingDirection = 1;
      else if (physics.isOnWallRight) this.owner.facingDirection = -1;
    }

    if (physics && physics.isGrounded) {
      const checkDist = 20;
      const forwardX = this.owner.position.x + this.owner.facingDirection * checkDist;
      const belowY = this.owner.position.y + this.owner.size.height / 2 + 10;
      
      const solids = this.owner.world.physicsWorld.getOverlapCandidates(forwardX, belowY, 8, 8, "solid");
      const platforms = this.owner.world.physicsWorld.getOverlapCandidates(forwardX, belowY, 8, 8, "platform");

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
        this.owner.facingDirection *= -1;
        this.owner.velocity.x = 0;
      }
    }
  }
  public exit(): void {}
}

export class PitLancerMinion extends BaseMinion {
  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 32, height: 44 };
    this.patrolSpeed = 120;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 6,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "feet";
    this.bodyColorValue = "hsl(350, 82%, 58%)";
    this.dissolveColorValue = "hsl(350, 80%, 40%)";
    this.initState(new SimplePatrolState(this));
  }

  get minionColor(): string { return "hsl(350, 82%, 58%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "kite",
      danger: 0.8,
      weight: 0.5,
      corruption: 0.3,
      hueRole: "boss-lethal",
      strokePx: 2.5,
      spinRate: 0,
      wobbleAmp: 0,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  protected updateExhaust(): void {
    if (Math.abs(this.velocity.x) > 0 && this.physics.isGrounded) {
      this.exhaustTimer = 0.12;
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

export class CompassWaspMinion extends BaseMinion {
  private angle = 0;
  private orbitRadius = 110;
  private diveTimer = 0;
  private state: "orbit" | "diving" = "orbit";

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 28, height: 28 };
    this.physics.gravity = 0;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 3,
      invincibilityDuration: 0.12,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "center";
    this.bodyColorValue = "hsl(45, 100%, 60%)";
    this.dissolveColorValue = "hsl(45, 100%, 40%)";
    this.angle = TrigLUT.random() * Math.PI * 2;
  }

  get minionColor(): string { return this.state === "diving" ? "hsl(45, 100%, 60%)" : "hsl(194, 62%, 52%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "diamond",
      danger: 0.9,
      weight: 0.1,
      corruption: 0.2,
      hueRole: this.state === "diving" ? "telegraph" : "minion-logic",
      strokePx: 2,
      spinRate: 3.5,
      wobbleAmp: 0.3,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    if (this.state === "orbit") {
      this.angle += 1.8 * dt;
      const targetX = this.pointA.x + Math.cos(this.angle) * this.orbitRadius;
      const targetY = this.pointA.y + Math.sin(this.angle) * this.orbitRadius * 0.6;
      this.velocity.x = (targetX - this.position.x) * 4.0;
      this.velocity.y = (targetY - this.position.y) * 4.0;

      const player = this.world.player;
      if (player && !player.isDead) {
        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 260) {
          this.state = "diving";
          this.diveTimer = 1.5;
          this.velocity.x = (dx / dist) * 580;
          this.velocity.y = (dy / dist) * 580;
          this.world.events.publish("CAMERA_SHAKE", { amplitude: 3, duration: 0.12 });
        }
      }
    } else {
      this.diveTimer -= dt;
      const physics = this.physics;
      const hitWall = physics ? physics.isOnWallLeft || physics.isOnWallRight || physics.isGrounded : false;
      
      if (this.diveTimer <= 0 || hitWall) {
        this.state = "orbit";
        this.pointA = { x: this.position.x, y: this.position.y };
        zeroVec(this.velocity);
      }
    }

    super.update(dt);

    this.position.x = Math.max(40 + this.size.width/2, Math.min(UNITS.WORLD_SIZE - 40 - this.size.width/2, this.position.x));
    this.position.y = Math.max(40 + this.size.height/2, Math.min(UNITS.WORLD_SIZE - 80 - this.size.height/2, this.position.y));
  }

  protected updateExhaust(): void {
    this.exhaustTimer = 0.06;
    this.world.events.publishSpark(
      this.position.x,
      this.position.y,
      Math.PI,
      "hsl(45, 100%, 60%)",
      false,
      1
    );
  }
}

export class ClampjawMinion extends BaseMinion {
  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 48, height: 36 };
    this.patrolSpeed = 70;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 10,
      invincibilityDuration: 0.2,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "feet";
    this.bodyColorValue = "hsl(82, 38%, 44%)";
    this.dissolveColorValue = "hsl(82, 30%, 30%)";
    this.initState(new SimplePatrolState(this));
  }

  get minionColor(): string { return "hsl(82, 38%, 44%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "corrupted-box",
      danger: 0.3,
      weight: 0.9,
      corruption: 0.4,
      hueRole: "minion-organic",
      strokePx: 3,
      spinRate: 0,
      wobbleAmp: 0.15,
      cornerRadius: 3,
      phaseOffset: 0
    };
  }

  protected updateExhaust(): void {
    if (Math.abs(this.velocity.x) > 0 && this.physics.isGrounded) {
      this.exhaustTimer = 0.18;
      this.world.events.publishSpark(
        this.position.x - this.facingDirection * (this.size.width / 2),
        this.position.y + this.size.height / 2,
        Math.PI,
        "rgba(255, 255, 255, 0.15)",
        false,
        1
      );
    }
  }
}

export class HymnNailMinion extends BaseMinion {
  private pogoCount = 0;

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 32, height: 64 };
    this.physics.gravity = 0;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 4,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "center";
    this.bodyColorValue = "hsl(286, 85%, 62%)";
    this.dissolveColorValue = "hsl(286, 80%, 40%)";
  }

  get minionColor(): string { return "hsl(286, 85%, 62%)"; }

  public getVisualProfile(): VisualProfile {
    const isEnraged = this.pogoCount >= 3;
    return {
      shapeFamily: "needle",
      danger: isEnraged ? 0.9 : 0.1,
      weight: 0.3,
      corruption: isEnraged ? 0.6 : 0.1,
      hueRole: isEnraged ? "boss-lethal" : "determination",
      strokePx: 2,
      spinRate: isEnraged ? 2.5 : 0.1,
      wobbleAmp: isEnraged ? 0.4 : 0,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    const player = this.world.player;
    if (player && !player.isDead) {
      const isRebounding = player.velocity.y < 0 && (player as Player).meleeComponent.hasHitEnemyThisSwing;
      if (isRebounding && Math.abs(player.position.x - this.position.x) < 40 && player.position.y < this.position.y) {
        this.pogoCount++;
        if (this.pogoCount >= 3) {
          this.world.events.publish("CAMERA_SHAKE", { amplitude: 6, duration: 0.2 });
          this.world.events.publishSpark(this.position.x, this.position.y, 0, "hsl(350, 82%, 58%)", true, 8);
        }
      }
    }

    if (this.pogoCount >= 3) {
      if (player && !player.isDead) {
        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          this.velocity.x = (dx / dist) * 180;
          this.velocity.y = (dy / dist) * 180;
        }
      }
    }

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;

    super.update(dt);
  }

  protected updateExhaust(): void {
    this.exhaustTimer = 0.1;
    this.world.events.publishSpark(
      this.position.x,
      this.position.y,
      Math.PI / 2,
      "hsl(286, 85%, 62%)",
      false,
      1
    );
  }
}

export class BlisterOxMinion extends BaseMinion {
  private jumpCooldown = 2.0;

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 64, height: 48 };
    this.patrolSpeed = 40;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 12,
      invincibilityDuration: 0.2,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "feet";
    this.bodyColorValue = "hsl(82, 38%, 44%)";
    this.dissolveColorValue = "hsl(82, 30%, 30%)";
  }

  get minionColor(): string { return "hsl(82, 38%, 44%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "blister",
      danger: 0.1,
      weight: 1.0,
      corruption: 0.5,
      hueRole: "minion-organic",
      strokePx: 3.5,
      spinRate: 0.05,
      wobbleAmp: 0.25,
      cornerRadius: 8,
      phaseOffset: 0
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    this.jumpCooldown -= dt;

    if (this.physics.isGrounded) {
      const speed = this.facingDirection * this.patrolSpeed;
      this.velocity.x += (speed - this.velocity.x) * 3.0 * dt;

      if (this.jumpCooldown <= 0) {
        this.jumpCooldown = 2.5 + TrigLUT.random() * 1.5;
        this.velocity.y = -480;
        this.velocity.x = this.facingDirection * 150;
        this.physics.isGrounded = false;
        this.applyScaleImpulse(0.3, -0.3);
      }
    }

    const wasAirborne = !this.physics.isGrounded;
    super.update(dt);

    if (wasAirborne && this.physics.isGrounded) {
      this.world.events.publish("CAMERA_SHAKE", { amplitude: 6, duration: 0.2 });
      this.applyScaleImpulse(-0.4, 0.4);

      this.world.spawnProjectile(
        this.position.x - 20,
        this.position.y + 12,
        -1,
        0,
        "boss",
        1,
        250,
        1.5,
        this.minionColor
      );
      this.world.spawnProjectile(
        this.position.x + 20,
        this.position.y + 12,
        1,
        0,
        "boss",
        1,
        250,
        1.5,
        this.minionColor
      );
    }
  }

  protected updateExhaust(): void {
    if (!this.physics.isGrounded) {
      this.exhaustTimer = 0.08;
      this.world.events.publishSpark(
        this.position.x,
        this.position.y + 12,
        Math.PI / 2,
        "rgba(255,255,255,0.25)",
        false,
        2
      );
    }
  }
}

export class BellHammerMinion extends BaseMinion {
  private slamTimer = 1.5;

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 48, height: 48 };
    this.patrolSpeed = 60;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 8,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "feet";
    this.bodyColorValue = "hsl(358, 92%, 52%)";
    this.dissolveColorValue = "hsl(358, 80%, 30%)";
  }

  get minionColor(): string { return "hsl(358, 92%, 52%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "hex",
      danger: 0.8,
      weight: 0.9,
      corruption: 0.3,
      hueRole: "hazard",
      strokePx: 3,
      spinRate: 0.5,
      wobbleAmp: 0.1,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    this.slamTimer -= dt;

    if (this.physics.isGrounded) {
      const speed = this.facingDirection * this.patrolSpeed;
      this.velocity.x += (speed - this.velocity.x) * 4.0 * dt;

      if (this.slamTimer <= 0) {
        this.slamTimer = 2.0;
        this.velocity.y = -550;
        this.velocity.x = this.facingDirection * 180;
        this.physics.isGrounded = false;
        this.applyScaleImpulse(0.2, -0.2);
      }
    }

    const wasAirborne = !this.physics.isGrounded;
    super.update(dt);

    if (wasAirborne && this.physics.isGrounded) {
      this.world.events.publish("CAMERA_SHAKE", { amplitude: 8, duration: 0.25 });
      this.applyScaleImpulse(-0.5, 0.5);

      this.world.events.publishSpark(
        this.position.x,
        this.position.y + 12,
        0,
        "hsl(358, 92%, 52%)",
        true,
        18,
        "line"
      );
    }
  }

  protected updateExhaust(): void {
    if (!this.physics.isGrounded) {
      this.exhaustTimer = 0.08;
      this.world.events.publishSpark(
        this.position.x,
        this.position.y + 12,
        Math.PI / 2,
        "hsl(358, 92%, 52%)",
        false,
        2
      );
    }
  }
}


export class ShardChoirMinion extends BaseMinion {
  private hoverTimer = 0;

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 24, height: 24 };
    this.physics.gravity = 0;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 2,
      invincibilityDuration: 0.1,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "center";
    this.bodyColorValue = "hsl(194, 62%, 52%)";
    this.dissolveColorValue = "hsl(194, 70%, 40%)";
    this.hoverTimer = TrigLUT.random() * Math.PI * 2;
  }

  get minionColor(): string { return "hsl(194, 62%, 52%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "triangle",
      danger: 0.7,
      weight: 0.2,
      corruption: 0.1,
      hueRole: "minion-logic",
      strokePx: 2,
      spinRate: 1.8,
      wobbleAmp: 0.2,
      cornerRadius: 0,
      phaseOffset: this.hoverTimer
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    this.hoverTimer += dt * 3.5;
    
    const player = this.world.player;
    if (player && !player.isDead) {
      const dx = player.position.x - this.position.x;
      const dy = player.position.y - this.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 0) {
        const driftSpeed = 90;
        const targetVelX = (dx / dist) * driftSpeed;
        const targetVelY = (dy / dist) * driftSpeed + Math.sin(this.hoverTimer) * 35;
        this.velocity.x += (targetVelX - this.velocity.x) * 3.0 * dt;
        this.velocity.y += (targetVelY - this.velocity.y) * 3.0 * dt;
      }
    }

    super.update(dt);
    
    this.position.x = Math.max(40 + this.size.width/2, Math.min(UNITS.WORLD_SIZE - 40 - this.size.width/2, this.position.x));
    this.position.y = Math.max(40 + this.size.height/2, Math.min(UNITS.WORLD_SIZE - 80 - this.size.height/2, this.position.y));
  }

  protected updateExhaust(): void {
    this.exhaustTimer = 0.14;
    this.world.events.publishSpark(
      this.position.x,
      this.position.y,
      Math.PI / 2,
      "hsl(194, 62%, 52%)",
      false,
      1
    );
  }
}
