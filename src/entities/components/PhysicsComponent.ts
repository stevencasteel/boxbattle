import { IEntityComponent } from "@/entities/EntityComponent";
import { BaseEntity } from "@/entities/BaseEntity";
import { Rectangle } from "@/core/Interfaces";
import { UNITS } from "@/core/Units";

export interface PhysicsComponentOptions {
  gravity?: number;
}

export interface SweepResult {
  collided: boolean;
  t: number;
  normalX: number;
  normalY: number;
}

export class PhysicsComponent implements IEntityComponent {
  public owner!: BaseEntity;
  public gravity: number = 1200;
  public isGrounded: boolean = false;
  public isOnWallLeft: boolean = false;
  public isOnWallRight: boolean = false;

  public disablePlatformCollisionTimer: number = 0;

  private overlapScratch: Rectangle[] = [];
  private readonly cornerNudgeThreshold: number = UNITS.CORNER_NUDGE_MAX_OVERLAP;
  private readonly groundDetectionOffset: number = UNITS.GROUND_DETECTION_OFFSET;

  public setup(owner: BaseEntity, dependencies?: PhysicsComponentOptions): void {
    this.owner = owner;
    if (dependencies) {
      if (dependencies.gravity !== undefined) {
        this.gravity = dependencies.gravity;
      }
    }
  }

  public update(dt: number): void {
    if (this.disablePlatformCollisionTimer > 0) {
      this.disablePlatformCollisionTimer -= dt;
    }

    if (!this.isGrounded) {
      this.owner.velocity.y += this.gravity * dt;
    }

    this.executeSweptMovement(dt);
    this.evaluateGroundedStatus();
  }

  private executeSweptMovement(dt: number): void {
    this.isOnWallLeft = false;
    this.isOnWallRight = false;

    let timeLeft = 1.0;
    let iterations = 0;
    const maxIterations = 3;

    const halfH = this.owner.size.height / 2;

    this.resolveStaticOverlaps();

    while (timeLeft > 0 && iterations < maxIterations) {
      iterations++;

      const vx = this.owner.velocity.x;
      const vy = this.owner.velocity.y;

      if (vx === 0 && vy === 0) break;

      const pathW = this.owner.size.width + Math.abs(vx * dt) + 32;
      const pathH = this.owner.size.height + Math.abs(vy * dt) + 32;

      const solidCandidates = this.owner.world.physicsWorld.getOverlapCandidates(
        this.owner.position.x,
        this.owner.position.y,
        pathW,
        pathH,
        "solid",
        this.overlapScratch
      );

      let earliestT = 1.0;
      let normX = 0;
      let normY = 0;
      let hitFound = false;

      for (const solid of solidCandidates) {
        const sweep = this.sweptAABBCheck(this.owner.position, this.owner.size, vx, vy, solid, dt * timeLeft);
        if (sweep.collided && sweep.t < earliestT) {
          earliestT = sweep.t;
          normX = sweep.normalX;
          normY = sweep.normalY;
          hitFound = true;
        }
      }

      if (this.disablePlatformCollisionTimer <= 0 && vy >= 0) {
        const platformCandidates = this.owner.world.physicsWorld.getOverlapCandidates(
          this.owner.position.x,
          this.owner.position.y,
          pathW,
          pathH,
          "platform"
        );

        for (const platform of platformCandidates) {
          const prevFeetY = this.owner.position.y + halfH;
          if (prevFeetY - 2 <= platform.y) {
            const sweep = this.sweptAABBCheck(this.owner.position, this.owner.size, vx, vy, platform, dt * timeLeft);
            if (sweep.collided && sweep.t < earliestT && sweep.normalY === -1) {
              earliestT = sweep.t;
              normX = sweep.normalX;
              normY = sweep.normalY;
              hitFound = true;

              this.owner.world.events.publish("PLATFORM_IMPACT", {
                platform,
                velocityY: vy,
                massMultiplier: this.owner.id === "boss-01" ? 2.5 : 1.0
              });
            }
          }
        }
      }

      const stepEpsilon = 0.001;
      const moveFraction = Math.max(0, earliestT - stepEpsilon);
      this.owner.position.x += vx * moveFraction * dt * timeLeft;
      this.owner.position.y += vy * moveFraction * dt * timeLeft;

      timeLeft -= earliestT * timeLeft;

      if (hitFound) {
        if (normX !== 0) {
          this.owner.velocity.x = 0;
          if (normX > 0) this.isOnWallLeft = true;
          if (normX < 0) this.isOnWallRight = true;
        }
        if (normY !== 0) {
          this.owner.velocity.y = 0;
          if (normY < 0) {
            this.isGrounded = true;
          }
        }
      }
    }
  }

  private sweptAABBCheck(
    pos: { x: number; y: number },
    size: { width: number; height: number },
    vx: number, vy: number,
    solid: Rectangle,
    timeWindow: number
  ): SweepResult {
    const result: SweepResult = { collided: false, t: 1.0, normalX: 0, normalY: 0 };

    if (vx === 0 && vy === 0) return result;

    const halfW = size.width / 2;
    const halfH = size.height / 2;

    const pLeft = pos.x - halfW;
    const pRight = pos.x + halfW;
    const pTop = pos.y - halfH;
    const pBottom = pos.y + halfH;

    const dx = vx * timeWindow;
    const dy = vy * timeWindow;

    const xInvEntry = dx > 0 ? (solid.x - pRight) : ((solid.x + solid.width) - pLeft);
    const xInvExit  = dx > 0 ? ((solid.x + solid.width) - pLeft) : (solid.x - pRight);

    const yInvEntry = dy > 0 ? (solid.y - pBottom) : ((solid.y + solid.height) - pTop);
    const yInvExit  = dy > 0 ? ((solid.y + solid.height) - pTop) : (solid.y - pBottom);

    let rxEntry: number;
    let rxExit: number;
    if (dx !== 0) {
      rxEntry = xInvEntry / dx;
      rxExit = xInvExit / dx;
    } else {
      if (pRight > solid.x && pLeft < solid.x + solid.width) {
        rxEntry = -Infinity;
        rxExit = Infinity;
      } else {
        return result;
      }
    }

    let ryEntry: number;
    let ryExit: number;
    if (dy !== 0) {
      ryEntry = yInvEntry / dy;
      ryExit = yInvExit / dy;
    } else {
      if (pBottom > solid.y && pTop < solid.y + solid.height) {
        ryEntry = -Infinity;
        ryExit = Infinity;
      } else {
        return result;
      }
    }

    const tEntry = Math.max(rxEntry, ryEntry);
    const tExit = Math.min(rxExit, ryExit);

    if (tEntry > tExit || rxExit < 0 || ryExit < 0 || rxEntry > 1 || ryEntry > 1) {
      return result;
    }

    result.collided = true;
    result.t = Math.max(0, tEntry);

    if (rxEntry > ryEntry) {
      result.normalX = dx > 0 ? -1 : 1;
      result.normalY = 0;
    } else {
      result.normalX = 0;
      result.normalY = dy > 0 ? -1 : 1;
    }

    return result;
  }

  private resolveStaticOverlaps() {
    const halfW = this.owner.size.width / 2;
    const halfH = this.owner.size.height / 2;

    const solidCandidates = this.owner.world.physicsWorld.getOverlapCandidates(
      this.owner.position.x,
      this.owner.position.y,
      this.owner.size.width,
      this.owner.size.height,
      "solid",
      this.overlapScratch
    );

    for (const solid of solidCandidates) {
      if (this.isOverlapping(this.owner.position.x, this.owner.position.y, solid)) {
        const overlapX1 = (solid.x + solid.width) - (this.owner.position.x - halfW);
        const overlapX2 = (this.owner.position.x + halfW) - solid.x;
        const overlapY1 = (solid.y + solid.height) - (this.owner.position.y - halfH);
        const overlapY2 = (this.owner.position.y + halfH) - solid.y;

        const minX = Math.min(overlapX1, overlapX2);
        const minY = Math.min(overlapY1, overlapY2);

        if (minX < minY && minX <= this.cornerNudgeThreshold) {
          if (overlapX1 < overlapX2) {
            this.owner.position.x += overlapX1;
          } else {
            this.owner.position.x -= overlapX2;
          }
        } else if (minY <= this.cornerNudgeThreshold) {
          if (overlapY1 < overlapY2) {
            this.owner.position.y += overlapY1;
          } else {
            this.owner.position.y -= overlapY2;
            this.owner.velocity.y = 0;
          }
        }
      }
    }
  }

  private evaluateGroundedStatus(): void {
    this.isGrounded = false;
    const physicsWorld = this.owner.world.physicsWorld;
    const testPosY = this.owner.position.y + this.groundDetectionOffset;

    if (this.owner.velocity.y >= 0) {
      const solidCandidates = physicsWorld.getOverlapCandidates(
        this.owner.position.x,
        testPosY,
        this.owner.size.width + UNITS.BROAD_PHASE_PADDING_STANDARD,
        this.owner.size.height + UNITS.BROAD_PHASE_PADDING_STANDARD,
        "solid",
        this.overlapScratch
      );
      for (const solid of solidCandidates) {
        if (this.isOverlapping(this.owner.position.x, testPosY, solid)) {
          this.isGrounded = true;
          break;
        }
      }

      if (!this.isGrounded && this.disablePlatformCollisionTimer <= 0) {
        const platformCandidates = physicsWorld.getOverlapCandidates(
          this.owner.position.x,
          testPosY,
          this.owner.size.width + UNITS.BROAD_PHASE_PADDING_STANDARD,
          this.owner.size.height + UNITS.BROAD_PHASE_PADDING_STANDARD,
          "platform",
          this.overlapScratch
        );
        for (const platform of platformCandidates) {
          if (this.isOverlapping(this.owner.position.x, testPosY, platform)) {
            this.isGrounded = true;
            break;
          }
        }
      }
    }
  }

  private isOverlapping(x: number, y: number, rect: Rectangle): boolean {
    const halfWidth = this.owner.size.width / 2;
    const halfHeight = this.owner.size.height / 2;

    const left = x - halfWidth;
    const right = x + halfWidth;
    const top = y - halfHeight;
    const bottom = y + halfHeight;

    return right > rect.x && left < rect.x + rect.width && bottom > rect.y && top < rect.y + rect.height;
  }

  public teardown(): void {}
}
