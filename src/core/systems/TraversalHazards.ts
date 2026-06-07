import { Rectangle } from "../Interfaces";
import { Player } from "@/entities/Player";
import { HealthComponent } from "@/entities/components/HealthComponent";

export class DissolvePlatform {
  public rect: Rectangle;
  public state: "idle" | "cracking" | "gone" | "respawning" = "idle";
  public timer: number = 0;

  constructor(rect: Rectangle) {
    this.rect = { ...rect };
  }

  public update(dt: number, player: Player): void {
    const halfW = player.size.width / 2;
    const halfH = player.size.height / 2;
    const feetY = player.position.y + halfH;

    const playerOnTop =
      player.position.x + halfW > this.rect.x &&
      player.position.x - halfW < this.rect.x + this.rect.width &&
      Math.abs(feetY - this.rect.y) <= 6 &&
      player.velocity.y >= 0;

    if (this.state === "idle") {
      if (playerOnTop) {
        this.state = "cracking";
        this.timer = 0.45;
        player.world.events.publish("CAMERA_SHAKE", { amplitude: 3, duration: 0.15 });
      }
    } else if (this.state === "cracking") {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.state = "gone";
        this.timer = 1.6;
        player.world.events.publish("CAMERA_SHAKE", { amplitude: 8, duration: 0.25 });
        player.world.events.publishSpark(
          this.rect.x + this.rect.width / 2,
          this.rect.y,
          -Math.PI / 2,
          "hsl(45, 100%, 60%)",
          true,
          12,
          "line"
        );
        player.world.audio.playErrorTick();
      }
    } else if (this.state === "gone") {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.state = "respawning";
        this.timer = 0.5;
      }
    } else if (this.state === "respawning") {
      this.timer -= dt;
      if (this.timer <= 0) {
        const pW = player.size.width / 2;
        const pH = player.size.height / 2;
        const isOverlapping =
          player.position.x + pW > this.rect.x &&
          player.position.x - pW < this.rect.x + this.rect.width &&
          player.position.y + pH > this.rect.y &&
          player.position.y - pH < this.rect.y + this.rect.height;

        if (isOverlapping) {
          this.timer = 0.05; // Delay solidification until player clears the area
        } else {
          this.state = "idle";
        }
      }
    }
  }
}

export class PogoPost {
  public rect: Rectangle;

  constructor(rect: Rectangle) {
    this.rect = { ...rect };
  }

  public update(_dt: number, player: Player): void {
    const pW = player.size.width / 2;
    const pH = player.size.height / 2;

    const isOverlapping =
      player.position.x + pW > this.rect.x &&
      player.position.x - pW < this.rect.x + this.rect.width &&
      player.position.y + pH > this.rect.y &&
      player.position.y - pH < this.rect.y + this.rect.height;

    if (isOverlapping) {
      const isPogoActive = player.meleeComponent.attackActive && player.meleeComponent.attackDirection === "down";
      if (isPogoActive && player.velocity.y >= 0) {
        player.velocity.y = -450;
        player.position.y -= 4;
        player.meleeComponent.hasHitEnemyThisSwing = true;
        player.hasDoubleJump = true;
        player.dashComponent.resetDashCharge();
        player.world.events.publish("PLAYER_POGOED", undefined);
        player.world.events.publishSpark(
          this.rect.x + this.rect.width / 2,
          this.rect.y,
          -Math.PI / 2,
          "hsl(280, 100%, 75%)",
          true,
          12
        );
      } else {
        const health = player.getComponent(HealthComponent);
        if (health && !health.isInvincible()) {
          const damaged = health.takeDamage(1, this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
          if (damaged) {
            const dir = Math.sign(player.position.x - (this.rect.x + this.rect.width / 2)) || 1;
            player.velocity.x = dir * 450;
            player.velocity.y = -350;
          }
        }
      }
    }
  }
}

export class DashResetGate {
  public rect: Rectangle;
  public active: boolean = true;
  public cooldownTimer: number = 0;

  constructor(rect: Rectangle) {
    this.rect = { ...rect };
  }

  public update(dt: number, player: Player): void {
    if (this.cooldownTimer > 0) {
      this.cooldownTimer -= dt;
      if (this.cooldownTimer <= 0) {
        this.active = true;
      }
    }

    if (!this.active) return;

    const pW = player.size.width / 2;
    const pH = player.size.height / 2;

    const isOverlapping =
      player.position.x + pW > this.rect.x &&
      player.position.x - pW < this.rect.x + this.rect.width &&
      player.position.y + pH > this.rect.y &&
      player.position.y - pH < this.rect.y + this.rect.height;

    if (isOverlapping && this.active) {
      this.active = false;
      this.cooldownTimer = 2.0;

      player.dashComponent.resetDashCharge();
      player.hasDoubleJump = true;

      player.world.events.publishSpark(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height / 2,
        0,
        "hsl(142, 72%, 56%)",
        true,
        16,
        "line"
      );
      player.world.events.publishBlast(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height / 2,
        "hsl(142, 100%, 80%)"
      );
      player.world.audio.playDashRecharge();
    }
  }
}
