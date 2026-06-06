import GameLoop from "@/core/GameLoop";
import { Player } from "@/entities/Player";
import { Boss } from "@/entities/Boss";
import { ObjectPool } from "@/core/ObjectPool";
import { Projectile } from "@/entities/Projectile";
import { Camera } from "@/core/Camera";
import { EncounterDirector } from "@/core/EncounterDirector";
import { World } from "@/core/World";
import { SimulationSystems } from "@/core/SimulationSystems";
import { Rectangle } from "@/core/Interfaces";
import { BaseEntity } from "@/entities/BaseEntity";
import { WorldRenderer } from "@/core/WorldRenderer";
import { ParticleSystem } from "@/core/ParticleSystem";
import { BattleDirector } from "@/core/BattleDirector";
import { StateProjectionSystem } from "@/core/StateProjectionSystem";
import { MinionCollisionSystem } from "@/core/systems/MinionCollisionSystem";
import { EntityResetService } from "@/core/systems/EntityResetService";
import { setVec, copyVec, zeroVec } from "@/core/VecUtils";
import { GAUNTLET_STAGES, StageConfig } from "./design/GauntletStages";
import { useSessionStore } from "@/store/useGameStore";
import { DissolvePlatform, PogoPost, DashResetGate } from "./systems/TraversalHazards";

export class Engine {
  private renderer: WorldRenderer;

  private loop!: GameLoop;
  private systems!: SimulationSystems;
  private world: World;
  private battleDirector!: BattleDirector;
  private particleSystem!: ParticleSystem;
  private stateProjection: StateProjectionSystem;
  private minionCollisionSystem: MinionCollisionSystem;
  private entityResetService: EntityResetService;

  private pool!: ObjectPool<Projectile>;
  private player!: Player;
  private boss!: Boss;
  private encounterDirector!: EncounterDirector;
  private springPlatforms: { rect: Rectangle; offsetY: number; velocityY: number }[] = [];
  private unsubPlatformImpact!: () => void;
  private unsubLoadStage!: () => void;

  public activeDissolvePlatforms: DissolvePlatform[] = [];
  public activePogoPosts: PogoPost[] = [];
  public activeDashResetGates: DashResetGate[] = [];

  public isPaused: boolean = false;
  private accumulator: number = 0;
  private currentScale: number = 1.0;
  private readonly fixedTimeStep: number = 1 / 60;

  private levelConfig: StageConfig;
  private solids: Rectangle[] = [];
  private onewayPlatforms: Rectangle[] = [];
  private hazards: Rectangle[] = [];

  constructor(world: World, renderer: WorldRenderer) {
    this.world = world;
    this.renderer = renderer;
    this.stateProjection = new StateProjectionSystem(this.world.events);
    this.minionCollisionSystem = new MinionCollisionSystem();
    this.entityResetService = new EntityResetService();

    const activeStageIdx = useSessionStore.getState().currentStageIndex;
    this.levelConfig = GAUNTLET_STAGES[activeStageIdx] || GAUNTLET_STAGES[0];

    this.solids = this.levelConfig.solids;
    this.onewayPlatforms = this.levelConfig.onewayPlatforms;
    this.hazards = this.levelConfig.hazards;

    this.init();
  }

  private init() {
    this.systems = new SimulationSystems(this.world.events, this.world.audio, this.world.input);
    this.systems.setup(
      () => this.player.position.x,
      () => this.boss.position.x,
      (id) => this.world.minions.find((m) => m.id === id)?.position.x ?? 500
    );

    this.pool = new ObjectPool(() => new Projectile(), 500);
    this.world.projectilePool = this.pool;

    this.player = new Player("player-01", this.world);
    setVec(this.player.position, this.levelConfig.playerStart.x, this.levelConfig.playerStart.y);
    setVec(this.player.previousPosition, this.levelConfig.playerStart.x, this.levelConfig.playerStart.y);

    this.boss = new Boss("boss-01", this.world);
    setVec(this.boss.position, this.levelConfig.bossStart.x, this.levelConfig.bossStart.y);
    setVec(this.boss.previousPosition, this.levelConfig.bossStart.x, this.levelConfig.bossStart.y);

    this.world.player = this.player;
    this.world.boss = this.boss;

    this.encounterDirector = new EncounterDirector(this.world);
    this.encounterDirector.loadStage(this.levelConfig);

    Camera.reset();

    this.stateProjection.project(this.player, this.boss);

    this.particleSystem = new ParticleSystem(this.world.events);
    this.battleDirector = new BattleDirector(this.world.events, this.world.audio, () => {});

    this.activeDissolvePlatforms = (this.levelConfig.dissolvePlatforms || []).map((r) => new DissolvePlatform(r));
    this.activePogoPosts = (this.levelConfig.pogoPosts || []).map((r) => new PogoPost(r));
    this.activeDashResetGates = (this.levelConfig.dashResetGates || []).map((r) => new DashResetGate(r));

    this.springPlatforms = this.onewayPlatforms.map((rect) => ({
      rect,
      offsetY: 0,
      velocityY: 0,
    }));

    this.unsubPlatformImpact = this.world.events.subscribe("PLATFORM_IMPACT", ({ platform, velocityY, massMultiplier }) => {
      const sp = this.springPlatforms.find((s) => s.rect === platform);
      if (sp) {
        sp.velocityY += velocityY * massMultiplier * 0.25;
      }
    });

    this.unsubLoadStage = this.world.events.subscribe("LOAD_STAGE", ({ stageIndex }) => {
      this.loadStage(stageIndex);
    });

    this.rebuildPhysics();

    this.loop = new GameLoop(
      (dt) => this.update(dt),
      () => this.render()
    );
  }

  private rebuildPhysics() {
    const activeSolids = [
      ...this.solids,
      ...this.activeDissolvePlatforms
        .filter((dp) => dp.state === "idle" || dp.state === "cracking")
        .map((dp) => dp.rect)
    ];
    this.world.physicsWorld.rebuild(activeSolids, this.hazards, this.onewayPlatforms);
  }

  public loadStage(stageIndex: number) {
    const stage = GAUNTLET_STAGES[stageIndex];
    if (!stage) return;

    this.levelConfig = stage;
    this.solids = stage.solids;
    this.onewayPlatforms = stage.onewayPlatforms;
    this.hazards = stage.hazards;

    this.activeDissolvePlatforms = (stage.dissolvePlatforms || []).map((r) => new DissolvePlatform(r));
    this.activePogoPosts = (stage.pogoPosts || []).map((r) => new PogoPost(r));
    this.activeDashResetGates = (stage.dashResetGates || []).map((r) => new DashResetGate(r));

    this.rebuildPhysics();
    this.renderer.resetCache();

    this.isPaused = false;
    this.accumulator = 0;
    Camera.reset();
    this.pool.clear();

    this.springPlatforms = this.onewayPlatforms.map((rect) => ({
      rect,
      offsetY: 0,
      velocityY: 0,
    }));

    this.entityResetService.resetPlayer(this.player, stage.playerStart, 1);
    this.entityResetService.resetBoss(this.boss, stage.bossStart, -1);

    this.boss.currentPhase = 1;
    this.boss.patrolSpeed = 200;
    this.boss.lungeSpeed = 1200;
    this.boss.stateMachine.changeState(this.boss.cooldownState);

    this.encounterDirector.loadStage(stage);

    this.particleSystem.cleanup();
    this.particleSystem = new ParticleSystem(this.world.events);
    this.battleDirector.cleanup();
    this.battleDirector = new BattleDirector(this.world.events, this.world.audio, () => {});
    this.stateProjection.reset();

    this.stateProjection.project(this.player, this.boss);
    this.world.events.publish("CLEAR_DIALOGUES", undefined);
    this.world.events.publish("SESSION_RESET", undefined);
  }

  public start() {
    this.loop.start();
  }

  public stop() {
    this.loop.stop();
  }

  public reset() {
    const activeStageIdx = useSessionStore.getState().currentStageIndex;
    this.loadStage(activeStageIdx);
  }

  private update(dt: number) {
    if (this.isPaused) {
      this.world.input.update();
      if (this.world.input.isPauseJustPressed()) {
        this.isPaused = false;
        this.world.audio.playHitConfirm();
      }
      this.world.input.postUpdate();
      return;
    }

    this.stateProjection.tickCrisisTimer(dt);

    const targetScale = this.stateProjection.getCrisisTimer() > 0 ? 0.45 : 1.0;
    this.currentScale += (targetScale - this.currentScale) * 6.0 * dt;

    this.accumulator += dt * this.currentScale;
    if (this.accumulator > 0.25) {
      this.accumulator = 0.25;
    }

    while (this.accumulator >= this.fixedTimeStep) {
      this.fixedUpdate(this.fixedTimeStep);
      this.accumulator -= this.fixedTimeStep;
    }
  }

  private cachePreIntegrationPositions() {
    copyVec(this.player.previousPosition, this.player.position);
    copyVec(this.boss.previousPosition, this.boss.position);
    for (const minion of this.world.minions) {
      copyVec((minion as BaseEntity).previousPosition, minion.position);
    }
    for (const proj of this.pool.getActive()) {
      copyVec(proj.previousPosition, proj.position);
    }
  }

  private handleCinematicUpdate(dt: number) {
    zeroVec(this.player.velocity);
    zeroVec(this.boss.velocity);

    const activeProjectiles = this.pool.getActive();
    for (let i = activeProjectiles.length - 1; i >= 0; i--) {
      if (activeProjectiles[i].update(dt)) {
        this.pool.releaseAt(i);
      }
    }
    this.world.input.postUpdate();
    this.stateProjection.project(this.player, this.boss);
  }

  private fixedUpdate(dt: number) {
    this.world.input.update();
    if (this.world.input.isPauseJustPressed()) {
      this.isPaused = true;
      this.world.audio.playErrorTick();
      this.world.input.postUpdate();
      return;
    }
    if (Camera.hitStopTimer > 0) {
      Camera.update(dt);
      return;
    }

    Camera.update(dt);

    const K = 320;
    const D = 14;
    for (const sp of this.springPlatforms) {
      const force = -K * sp.offsetY - D * sp.velocityY;
      sp.velocityY += force * dt;
      sp.offsetY += sp.velocityY * dt;
    }

    this.battleDirector.update(dt, this.player, this.boss);

    this.cachePreIntegrationPositions();

    if (this.battleDirector.isCinematicActive()) {
      this.handleCinematicUpdate(dt);
      return;
    }

    let rebuildNeeded = false;
    for (const dp of this.activeDissolvePlatforms) {
      const oldState = dp.state;
      dp.update(dt, this.player);
      if (dp.state !== oldState) {
        rebuildNeeded = true;
      }
    }
    if (rebuildNeeded) {
      this.rebuildPhysics();
    }

    for (const post of this.activePogoPosts) {
      post.update(dt, this.player);
    }

    for (const gate of this.activeDashResetGates) {
      gate.update(dt, this.player);
    }

    this.particleSystem.update(dt);

    this.player.update(dt);
    this.boss.update(dt);

    this.encounterDirector.update(dt);

    this.minionCollisionSystem.update(this.world.minions, this.player, dt);

    const activeProjectiles = this.pool.getActive();
    for (let i = activeProjectiles.length - 1; i >= 0; i--) {
      if (activeProjectiles[i].update(dt)) {
        this.pool.releaseAt(i);
      }
    }
    this.world.input.postUpdate();
    this.stateProjection.project(this.player, this.boss);
  }

  private render() {
    const alpha = this.accumulator / this.fixedTimeStep;
    this.renderer.render(
      this.world,
      this.particleSystem.getParticles(),
      this.solids,
      this.onewayPlatforms,
      this.hazards,
      this.pool,
      this.isPaused,
      this.battleDirector.getDeathVisuals().timer,
      this.battleDirector.getDeathVisuals().pos,
      this.springPlatforms,
      alpha,
      this.activeDissolvePlatforms,
      this.activePogoPosts,
      this.activeDashResetGates
    );
  }

  public cleanup() {
    this.battleDirector.cleanup();
    this.stateProjection.reset();
    this.loop.cleanup();
    this.player.teardown();
    this.boss.teardown();
    this.pool.clear();
    Camera.reset();
    this.systems.teardown();
    this.particleSystem.cleanup();

    if (this.unsubPlatformImpact) {
      this.unsubPlatformImpact();
    }
    if (this.unsubLoadStage) {
      this.unsubLoadStage();
    }

    this.encounterDirector.teardown();
  }
}
