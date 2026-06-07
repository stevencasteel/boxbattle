import { CinematicDeathRenderer } from "@/core/effects/CinematicDeathRenderer";
import { Camera } from "./Camera";
import { World } from "./World";
import { Rectangle, Particle } from "./Interfaces";
import { Projectile } from "@/entities/Projectile";
import { ObjectPool } from "./ObjectPool";
import { UNITS } from "@/core/Units";
import { StaticMapRenderer } from "@/core/StaticMapRenderer";
import { EntityRenderer } from "@/core/EntityRenderer";
import { ParticleRenderer } from "@/core/ParticleRenderer";
import { DissolvePlatform, PogoPost, DashResetGate } from "./systems/TraversalHazards";
import { useGameplayStore } from "@/store/useGameStore";

export class WorldRenderer {
  private ctx: CanvasRenderingContext2D;
  private staticMap: StaticMapRenderer;
  private entityRenderer: EntityRenderer;
  private particleRenderer: ParticleRenderer;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.staticMap = new StaticMapRenderer(ctx);
    this.entityRenderer = new EntityRenderer(ctx);
    this.particleRenderer = new ParticleRenderer(ctx);
  }

  public getCanvas(): HTMLCanvasElement {
    return this.ctx.canvas;
  }

  public resetCache(): void {
    this.staticMap.resetCache();
  }

  public render(
    world: World,
    particles: readonly Particle[],
    solids: Rectangle[],
    onewayPlatforms: Rectangle[],
    hazards: Rectangle[],
    projectilePool: ObjectPool<Projectile>,
    isPaused: boolean,
    bossDeathTimer: number,
    bossDeathPos: { x: number; y: number } | null,
    springPlatforms: { rect: Rectangle; offsetY: number }[],
    alpha: number,
    dissolvePlatforms?: DissolvePlatform[],
    pogoPosts?: PogoPost[],
    dashResetGates?: DashResetGate[]
  ) {
    this.staticMap.buildStaticCache(solids, hazards);

    this.ctx.save();
    this.ctx.translate(Camera.offsetX, Camera.offsetY);

    this.staticMap.renderBackground();
    this.staticMap.renderOnewayPlatforms(onewayPlatforms, springPlatforms);

    if (dissolvePlatforms) {
      for (const dp of dissolvePlatforms) {
        if (dp.state === "gone") continue;
        this.ctx.save();
        if (dp.state === "idle") {
          this.ctx.fillStyle = "hsl(215, 10%, 12%)";
          this.ctx.strokeStyle = "rgba(34, 197, 94, 0.45)";
          this.ctx.lineWidth = 2.0;
          this.ctx.fillRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);
          this.ctx.strokeRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);
        } else if (dp.state === "cracking") {
          this.ctx.fillStyle = "hsl(215, 10%, 8%)";
          this.ctx.fillRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);
          this.ctx.strokeStyle = "hsl(45, 100%, 60%)";
          this.ctx.lineWidth = 2.5;
          this.ctx.strokeRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);

          this.ctx.beginPath();
          this.ctx.moveTo(dp.rect.x + 10, dp.rect.y);
          this.ctx.lineTo(dp.rect.x + dp.rect.width / 3, dp.rect.y + dp.rect.height);
          this.ctx.moveTo(dp.rect.x + dp.rect.width - 20, dp.rect.y);
          this.ctx.lineTo(dp.rect.x + dp.rect.width / 2, dp.rect.y + dp.rect.height / 2);
          this.ctx.stroke();
        } else if (dp.state === "respawning") {
          this.ctx.strokeStyle = "rgba(34, 197, 94, 0.4)";
          this.ctx.lineWidth = 1.5;
          this.ctx.setLineDash([4, 4]);
          this.ctx.strokeRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);
        }
        this.ctx.restore();
      }
    }

    if (pogoPosts) {
      for (const post of pogoPosts) {
        this.ctx.save();
        const cx = post.rect.x + post.rect.width / 2;
        const cy = post.rect.y + post.rect.height / 2;
        const w = post.rect.width;
        const h = post.rect.height;

        this.ctx.translate(cx, cy);
        this.ctx.rotate(performance.now() * 0.001);
        
        this.ctx.fillStyle = "hsl(286, 85%, 62%)";
        this.ctx.strokeStyle = "hsl(194, 62%, 52%)";
        this.ctx.lineWidth = 2.0;

        this.ctx.beginPath();
        this.ctx.moveTo(0, -h / 2);
        this.ctx.lineTo(w / 2, 0);
        this.ctx.lineTo(0, h / 2);
        this.ctx.lineTo(-w / 2, 0);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.fillStyle = "hsl(350, 82%, 58%)";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 6, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
      }
    }

    if (dashResetGates) {
      for (const gate of dashResetGates) {
        this.ctx.save();
        const cx = gate.rect.x + gate.rect.width / 2;
        const cy = gate.rect.y + gate.rect.height / 2;
        const w = gate.rect.width;
        const h = gate.rect.height;

        this.ctx.translate(cx, cy);
        this.ctx.rotate(-performance.now() * 0.002);

        if (gate.active) {
          this.ctx.strokeStyle = "hsl(142, 72%, 56%)";
          this.ctx.lineWidth = 2.5;
          this.ctx.shadowColor = "rgba(34, 197, 94, 0.6)";
          this.ctx.shadowBlur = 10;
        } else {
          this.ctx.strokeStyle = "rgba(113, 128, 150, 0.4)";
          this.ctx.lineWidth = 1.5;
          this.ctx.shadowBlur = 0;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(0, -h / 2);
        this.ctx.lineTo(w / 2, 0);
        this.ctx.lineTo(0, h / 2);
        this.ctx.lineTo(-w / 2, 0);
        this.ctx.closePath();
        this.ctx.stroke();

        if (gate.active) {
          this.ctx.fillStyle = "#ffffff";
          this.ctx.fillRect(-3, -3, 6, 6);
        }
        this.ctx.restore();
      }
    }

    // Render dynamic entities and particles with a procedural zero-latency chromatic ghosting offset when glitching
    const isGlitching = useGameplayStore.getState().isGlitching;
    if (isGlitching) {
      // Left offset ghost
      this.ctx.save();
      this.ctx.globalAlpha = 0.35;
      this.ctx.translate(-6, 0);
      this.entityRenderer.renderEntities(world, projectilePool, alpha);
      this.particleRenderer.renderParticles(particles);
      this.ctx.restore();

      // Right offset ghost
      this.ctx.save();
      this.ctx.globalAlpha = 0.35;
      this.ctx.translate(6, 0);
      this.entityRenderer.renderEntities(world, projectilePool, alpha);
      this.particleRenderer.renderParticles(particles);
      this.ctx.restore();
    }

    // Main sharp foreground layer rendered normally (zero-latency)
    this.entityRenderer.renderEntities(world, projectilePool, alpha);
    this.particleRenderer.renderParticles(particles);

    if (bossDeathTimer >= 0 && bossDeathPos) {
      CinematicDeathRenderer.render(this.ctx, world, bossDeathTimer, bossDeathPos);
    }

    if (isPaused) {
      this.ctx.fillStyle = "rgba(12, 13, 17, 0.65)";
      this.ctx.fillRect(0, 0, UNITS.WORLD_SIZE, UNITS.WORLD_SIZE);

      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "bold 44px monospace";
      this.ctx.textAlign = "center";
      this.ctx.fillText("SIMULATION PAUSED", UNITS.WORLD_HALF_SIZE, 600);

      this.ctx.font = "bold 18px monospace";
      this.ctx.fillStyle = "var(--signal-green)";
      this.ctx.fillText("PRESS 'P' TO RESUME RUNTIME STEPPERS", UNITS.WORLD_HALF_SIZE, 650);
    }

    this.ctx.restore();
  }
}
