import { TrigLUT } from "@/core/TrigLUT";
import { IState } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { Boss } from "./Boss";
import { Player } from "./Player";
import { PhysicsComponent } from "@/entities/components/PhysicsComponent";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { setVec } from "@/core/VecUtils";
import { selectBestAttack, BossAttackContext, IBossAttackState } from "./BossAttackPatterns";
import { useSessionStore, useGameplayStore } from "@/store/useGameStore";
import { GAUNTLET_STAGES } from "@/core/design/GauntletStages";
import { MinionFactory } from "./MinionFactory";

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
      this.duration = this.owner.currentPhase === 3 ? 1.0 : 1.8;
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
    this.duration = this.owner.currentPhase === 3 ? 0.8 : 1.8;
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
      if (distance < 130 && distanceY < 60) {
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
  public attackType: string = "SINGLE_SHOT";
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

    this.attackType = pattern.id;
    pattern.configure(this);

    this.executeImmediateFire();
  }

  private executeImmediateFire() {
    switch (this.attackType) {
      case "OMNI_BURST":
        this.fireOmniBurst();
        break;
      case "FAN_BURST":
        this.fireFanBurst();
        break;
      case "PREDICTIVE_SHOT":
        this.firePredictiveShot();
        break;
      case "GAP_RING":
        this.fireGapRing();
        break;
      case "APHELION_RING":
        this.fireAphelionRing();
        break;
      case "PERIHELION_DIVE":
        this.firePerihelionDive();
        break;
      case "DASH_THREAD":
        this.fireDashThread();
        break;
      case "BELLY_TIDE":
        this.fireBellyTide();
        break;
      case "BLISTER_SPAWN":
        this.fireBlisterSpawn();
        break;
      case "CATHEDRAL_TOLL":
        this.fireCathedralToll();
        break;
      case "COMPRESSION_MARCH":
        this.fireCompressionMarch();
        break;
      case "SATELLITE_TAX":
        this.fireSatelliteTax();
        break;
      case "POGO_TAX":
        this.firePogoTax();
        break;
      case "SICKNESS_LEAN":
        this.fireSicknessLean();
        break;
      case "WEIGHT_TRANSFER":
        this.fireWeightTransfer();
        break;
    }
  }

  public update(dt: number): void {
    this.durationTimer -= dt;

    const player = this.owner.world.player;
    if (!player || player.isDead) return;

    if (this.volleyCount > 0) {
      this.volleyTimer -= dt;
      if (this.volleyTimer <= 0) {
        this.executeVolleyStep();
        this.volleyCount--;
        this.volleyTimer = this.getVolleyInterval();
      }
    }

    if (this.durationTimer <= 0) {
      let cooldown = 1.0;
      if (this.attackType === "VOLLEY" || this.attackType === "LOCKSTEP_VOLLEY") cooldown = 1.6;
      else if (["OMNI_BURST", "APHELION_RING", "GAP_RING", "CATHEDRAL_TOLL"].includes(this.attackType)) cooldown = 2.2;

      this.owner.cooldownState.setDuration(cooldown);
      this.owner.stateMachine.changeState(this.owner.cooldownState);
    }
  }

  private getVolleyInterval(): number {
    const phase = this.owner.currentPhase;
    switch (this.attackType) {
      case "VOLLEY":
        return phase === 3 ? 0.08 : 0.12;
      case "LOCKSTEP_VOLLEY":
        return 0.25;
      case "GATE_DROP":
        return 0.3;
      case "NEEDLE_RAIN":
        return 0.14;
      case "FALLING_NAVE":
        return 0.35;
      default:
        return 0.15;
    }
  }

  private executeVolleyStep() {
    const player = this.owner.world.player;
    if (!player || player.isDead) return;

    const phase = this.owner.currentPhase;

    if (this.attackType === "VOLLEY") {
      this.owner.fireSingleShotAtPlayer();
    } else if (this.attackType === "LOCKSTEP_VOLLEY") {
      // Fire modulo repeating lane projectiles with segmented-spine trails
      const laneCount = 5;
      const stepWidth = 140;
      const originX = 220;
      const activeLane = (this.volleyCount + phase) % laneCount;
      const targetX = originX + activeLane * stepWidth;

      this.owner.world.spawnProjectile(
        targetX,
        80,
        0,
        1,
        "boss",
        1,
        420,
        3.0,
        "hsl(4, 88%, 54%)",
        "segmented-spine"
      );
      this.owner.world.audio.playSelectTick();
    } else if (this.attackType === "GATE_DROP") {
      // Gate Drop warning line spawning red vertical bars
      const targetX = player.position.x + (TrigLUT.randomGameplay() * 120 - 60);
      this.owner.world.events.publishSpark(targetX, 80, Math.PI/2, "hsl(4, 100%, 72%)", false, 8, "line");

      // Spawn column of hazard-like needles
      for (let yOffset = 80; yOffset < 900; yOffset += 96) {
        this.owner.world.spawnProjectile(
          targetX,
          yOffset,
          0,
          1,
          "boss",
          1,
          500,
          2.0,
          "hsl(4, 88%, 54%)",
          "needle"
        );
      }
      this.owner.world.audio.playErrorTick();
    } else if (this.attackType === "NEEDLE_RAIN") {
      // Fast, narrow descending needles
      const offset = (this.volleyCount * 140) % 600;
      const targetX = 200 + offset;
      this.owner.world.spawnProjectile(
        targetX,
        80,
        0,
        1,
        "boss",
        1,
        640,
        2.5,
        "hsl(356, 94%, 62%)",
        "needle"
      );
    } else if (this.attackType === "FALLING_NAVE") {
      // Heavy blocks descending from the ceiling
      const targetX = player.position.x;
      this.owner.world.events.publishSpark(targetX, 40, Math.PI/2, "hsl(45, 100%, 60%)", true, 16);
      
      const proj = this.owner.world.spawnProjectile(
        targetX,
        40,
        0,
        1,
        "boss",
        2,
        350,
        3.0,
        "hsl(15, 82%, 48%)",
        "heavy-block"
      );
      proj.size = { width: 44, height: 44 };
    }
  }

  private fireOmniBurst() {
    const phase = this.owner.currentPhase;
    const projectileCount = phase === 1 ? 12 : phase === 2 ? 18 : 24;
    const angleStep = (Math.PI * 2) / projectileCount;
    const stageIdx = useSessionStore.getState().currentStageIndex;

    for (let i = 0; i < projectileCount; i++) {
      const angle = i * angleStep;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);
      const color = stageIdx === 4 ? "hsl(82, 38%, 44%)" : undefined;

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        280,
        4.0,
        color,
        "needle"
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
    const stageIdx = useSessionStore.getState().currentStageIndex;

    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * step;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);
      const color = stageIdx === 2 ? "hsl(338, 76%, 55%)" : undefined;

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        300,
        5.0,
        color,
        "needle"
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
    const stageIdx = useSessionStore.getState().currentStageIndex;
    const color = stageIdx === 3 ? "hsl(356, 94%, 62%)" : undefined;

    const proj = this.owner.world.spawnProjectile(
      this.owner.position.x + dirX * 45,
      this.owner.position.y + dirY * 45,
      dirX,
      dirY,
      "boss",
      2,
      450,
      6.0,
      color,
      "needle"
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
        4.0,
        undefined,
        "needle"
      );
    }
  }

  private fireAphelionRing() {
    const player = this.owner.world.player;
    if (!player) return;

    // Expanding ring leaving precisely one angular gap centered roughly on the player
    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const targetAngle = TrigLUT.atan2(dy, dx);

    const projCount = 20;
    const angleStep = (Math.PI * 2) / projCount;
    const gapWidth = 0.45;

    for (let i = 0; i < projCount; i++) {
      const angle = i * angleStep;
      let diff = Math.abs(angle - targetAngle) % (Math.PI * 2);
      if (diff > Math.PI) diff = Math.PI * 2 - diff;

      if (diff < gapWidth) continue;

      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        220,
        5.0,
        "hsl(338, 76%, 55%)",
        "needle"
      );
    }
    this.owner.world.audio.playBossTelegraph();
  }

  private firePerihelionDive() {
    const player = this.owner.world.player;
    if (!player) return;

    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      this.owner.velocity.x = (dx / dist) * this.owner.lungeSpeed * 0.95;
      this.owner.velocity.y = (dy / dist) * this.owner.lungeSpeed * 0.5;
      this.owner.physics.isGrounded = false;
      this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 10, duration: 0.2 });
    }
  }

  private fireDashThread() {
    const player = this.owner.world.player;
    if (!player) return;

    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      const dirX = dx / dist;
      const dirY = dy / dist;

      this.owner.world.events.publishSpark(
        this.owner.position.x,
        this.owner.position.y,
        TrigLUT.atan2(dirY, dirX),
        "hsl(356, 94%, 62%)",
        false,
        20,
        "line"
      );

      this.owner.velocity.x = dirX * this.owner.lungeSpeed * 1.1;
      this.owner.velocity.y = dirY * this.owner.lungeSpeed * 0.45;
      this.owner.physics.isGrounded = false;
    }
  }

  private fireBellyTide() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 12, duration: 0.3 });
    this.owner.applyScaleImpulse(-0.3, 0.3);

    this.owner.world.spawnProjectile(
      this.owner.position.x - 40,
      this.owner.position.y + 12,
      -1,
      0,
      "boss",
      1,
      300,
      3.0,
      "hsl(82, 38%, 44%)",
      "swirl"
    );

    this.owner.world.spawnProjectile(
      this.owner.position.x + 40,
      this.owner.position.y + 12,
      1,
      0,
      "boss",
      1,
      300,
      3.0,
      "hsl(82, 38%, 44%)",
      "swirl"
    );
    this.owner.world.audio.playBossSwipe();
  }

  private fireBlisterSpawn() {
    const player = this.owner.world.player;
    if (!player) return;

    const spawnX = this.owner.position.x + (player.position.x > this.owner.position.x ? -120 : 120);
    const mId = `cyst-spawn-${Date.now()}`;
    
    const type = TrigLUT.randomGameplay() < 0.5 ? "CLAMPJAW" : "PIT_LANCER";
    const cyst = MinionFactory.createMinion(type, mId, { x: spawnX, y: this.owner.position.y }, this.owner.world);
    this.owner.world.minions.push(cyst);
    
    this.owner.world.events.publishBlast(spawnX, this.owner.position.y, "hsl(82, 38%, 44%)");
  }

  private fireCompressionMarch() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 6, duration: 0.3 });
    this.owner.velocity.x = this.owner.facingDirection * 150;
    for (let y = 300; y <= 800; y += 150) {
      this.owner.world.spawnProjectile(
        40, y, 1, 0, "boss", 1, 350, 2.5, "hsl(4, 88%, 54%)", "needle"
      );
      this.owner.world.spawnProjectile(
        960, y, -1, 0, "boss", 1, 350, 2.5, "hsl(4, 88%, 54%)", "needle"
      );
    }
    this.owner.world.audio.playBossSwipe();
  }

  private fireSatelliteTax() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 4, duration: 0.2 });
    const projectileCount = 6;
    const angleStep = (Math.PI * 2) / projectileCount;
    for (let i = 0; i < projectileCount; i++) {
      const angle = i * angleStep;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);
      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 50,
        this.owner.position.y + dirY * 50,
        dirX,
        dirY,
        "boss",
        1,
        320,
        4.0,
        "hsl(338, 76%, 55%)",
        "homing"
      );
    }
    this.owner.world.audio.playBossTelegraph();
  }

  private firePogoTax() {
    const stage = GAUNTLET_STAGES[3];
    const pogoX = stage.pogoPosts && stage.pogoPosts[0] ? stage.pogoPosts[0].x + stage.pogoPosts[0].width / 2 : 500;
    this.owner.world.events.publishSpark(pogoX, 80, Math.PI / 2, "hsl(356, 94%, 62%)", true, 12);
    for (let i = -2; i <= 2; i++) {
      this.owner.world.spawnProjectile(
        pogoX + i * 30,
        80,
        0,
        1,
        "boss",
        1,
        600,
        2.5,
        "hsl(356, 94%, 62%)",
        "needle"
      );
    }
    this.owner.world.audio.playErrorTick();
  }

  private fireSicknessLean() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 10, duration: 0.45 });
    this.owner.world.events.publish("STATE_PROJECTED", {
      playerHP: useGameplayStore.getState().playerHP,
      bossHP: this.owner.health.currentHealth,
      healingCharges: this.owner.world.player ? (this.owner.world.player as Player).healingCharges : 0,
      determination: this.owner.world.player ? (this.owner.world.player as Player).determinationCounter : 0
    });
    useGameplayStore.getState().triggerGlitch(250);
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);
      this.owner.world.spawnProjectile(
        this.owner.position.x,
        this.owner.position.y,
        dirX,
        dirY,
        "boss",
        1,
        260,
        3.0,
        "hsl(82, 38%, 44%)",
        "swirl"
      );
    }
    this.owner.world.audio.playBossPhaseShift();
  }

  private fireWeightTransfer() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 12, duration: 0.4 });
    this.owner.velocity.y = -650;
    this.owner.physics.isGrounded = false;
    
    setTimeout(() => {
      if (this.owner && !this.owner.isDead) {
        this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 20, duration: 0.4 });
        this.owner.world.events.publishSpark(this.owner.position.x, 900, 0, "hsl(15, 82%, 48%)", true, 20, "line");
        this.owner.world.events.publishBlast(this.owner.position.x, 900, "hsl(15, 82%, 48%)");
        
        if (this.owner.world.player) {
          const playerPhys = this.owner.world.player.getComponent(PhysicsComponent);
          if (playerPhys) {
            playerPhys.disablePlatformCollisionTimer = 1.5;
          }
        }
      }
    }, 600);
    this.owner.world.audio.playBossSwipe();
  }

  private fireCathedralToll() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 15, duration: 0.4 });
    const rings = 2;
    for (let i = 0; i < rings; i++) {
      const delay = i * 0.25;
      setTimeout(() => {
        if (this.owner && !this.owner.isDead) {
          this.owner.world.events.publishBlast(this.owner.position.x, this.owner.position.y, "hsl(15, 82%, 48%)");
          this.owner.fireSingleShotAtPlayer();
        }
      }, delay * 1000);
    }
  }

  public exit(): void {}
}

export class BossTelegraphState extends BossState {
  private duration: number = 0.8;

  public enter(): void {
    this.owner.velocity.x = 0;
    this.duration = this.owner.currentPhase === 3 ? 0.3 : 0.55;
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
