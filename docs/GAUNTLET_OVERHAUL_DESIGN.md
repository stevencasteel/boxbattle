# Box Battle Gauntlet Overhaul Design

Implementation design for transforming the current vertical slice into a complete Hollow Knight Colosseum of Fools + Pantheon + Path of Pain inspired challenge mode.

This document is written for the next AI implementer. It intentionally includes concrete formulas, data structures, migration steps, and file-level hooks so the work can be built without rediscovering the whole codebase.

## North Star

Box Battle should become a precision combat gauntlet where every new stage feels like a different cruel lesson in geometry.

The player is the only perfect square. Every other shape expresses contamination, possession, illness, weight, speed, or danger through geometric drift. The game should read instantly in motion: green means player agency, red means lethal boss pressure, yellow means imminent action, violet means determination/healing, blue/cyan means mechanical minion logic, and the arena itself remains mostly desaturated so those signals stay loud.

The complete mode is a chained ordeal:

1. Colosseum waves: escalating minion fights inside bespoke arenas.
2. Mid-stage boss intrusions: each arena introduces a unique boss after half of that arena's waves.
3. Pantheon continuity: bosses do not vanish from the story; the gauntlet remembers them, remixes them, and later combines pressure patterns.
4. Path of Pain traversal interludes: short precision platforming trials between combat stages, using pogo, dissolving platforms, spikes, wall movement, dash resets, and stage morphs.
5. Final synthesis: the last sequence tests all shape, color, movement, and reading grammar taught earlier.

The current game already has useful foundations: player movement, dash, double jump, pogo reset, healing/determination, boss phases, minion factory, projectile strategies, spawn cages, a static map renderer, particles, dialogue console, and event bus. The overhaul should evolve these systems into a data-driven gauntlet instead of replacing everything.

## Existing Code Hooks

Start from these files:

- `src/core/levelData.ts`: current single `LevelConfig`, spawn anchors, waves.
- `src/core/EncounterDirector.ts`: weighted minion spawning and phase budget logic.
- `src/core/BattleDirector.ts`: dialogue timing, boss phase events, win/loss cinematics.
- `src/entities/Boss.ts`, `src/entities/BossStates.ts`, `src/entities/BossAttackPatterns.ts`: current boss AI and attack scoring.
- `src/entities/BaseMinion.ts`, `src/entities/MinionFactory.ts`, `src/entities/*Minion.ts`, `src/entities/MinionStates.ts`: minion architecture.
- `src/entities/Projectile.ts`, `src/entities/ProjectileStrategy.ts`: projectile kinds, body/trail rendering, collisions.
- `src/core/StaticMapRenderer.ts`: arena, platforms, hazards, cache invalidation.
- `src/core/EntityRenderer.ts`, `src/core/visuals/BossVisuals.ts`, `src/core/visuals/MinionVisuals.ts`, `src/entities/handlers/PlayerVisuals.ts`: shape and color rendering.
- `src/core/ParticleSystem.ts`, `src/core/ParticleRenderer.ts`: sparks, lines, rings, blast effects.
- `src/hooks/useGameDialogue.ts`, `src/components/DialogueConsole.tsx`, `src/components/GameArena.css`: dialogue timing and portraits.

Important current constraints:

- Player is currently `32x64`; change visual and collision target to a perfect square.
- Current boss is `48x48`, which can remain square-like only if boss silhouettes are corrupted square derivatives, never perfect squares.
- Current minion colors use many saturated hues with mixed meanings; move them into the new chromatic grammar.
- Static map cache currently assumes one layout; stage morphs need cache invalidation and dynamic geometry support.
- Projectile `kind` exists but is lightly used; expand it into a real shape/trail grammar.
- Minion spawn cage visuals are centralized in `MinionVisuals`; replace with shape-specific cages using the new visual language.

## Core Design Laws

### 1. Silhouette First

Every gameplay entity must be identifiable in a 48x48 greyscale thumbnail.

QA rule:

```ts
// Future visual regression helper.
// Render an entity's neutral frame into 48x48, desaturate it,
// then compare edge density and occupied bounds against every other entity.
interface SilhouetteFingerprint {
  areaRatio: number;        // filled pixels / 2304
  perimeterRatio: number;   // edge pixels / 2304
  convexity: number;        // filled area / convex hull area
  aspect: number;           // bounds width / bounds height
  cornerEnergy: number;     // high curvature count / perimeter
  radialVariance: number;   // variance of outline radius from center
}
```

Minimum silhouette separation:

```txt
abs(areaRatioA - areaRatioB)
+ abs(aspectA - aspectB) * 0.45
+ abs(cornerEnergyA - cornerEnergyB) * 0.75
+ abs(radialVarianceA - radialVarianceB) * 0.60
>= 0.18
```

If this fails, change shape before changing color.

### 2. Shape Contrast Carries Narrative

Danger axis:

```txt
round/soft -> chamfered -> square -> sheared -> cut/concave -> pointed/spiked
safe          neutral       pure      unstable   hostile       lethal
```

Weight axis:

```txt
small/thin/fast -> medium -> large/thick/slow
needle threat      duelist  boulder threat
```

These axes are independent. Do not equate sharp with big. A small sharp thing should feel like a wasp or blade. A large round thing should feel slow, heavy, oppressive, and difficult to route around.

### 3. The Player Is The Only Perfect Square

Change player to a true square in both collision and rendering:

```ts
// src/entities/Player.ts
this.size = { width: 40, height: 40 };
this.squashPivot = "center";
```

Then retune movement if needed:

- Keep player centerline visually lower with foot sparks, not taller body geometry.
- Preserve jump height by keeping `PLAYER_JUMP_FORCE` initially unchanged.
- Recheck wall slide feel because square height reduces wall contact forgiveness.
- If wall cling becomes too strict, expand wall probe only, not the player body:

```ts
const wallProbeHeight = player.size.height + 18;
const wallProbeWidth = player.size.width + 4;
```

The player's square may squash/stretch briefly during motion, but its resting identity is exact square. During dash and charge, deformation should read as energy acting on purity, not as a new permanent silhouette.

### 4. Hitboxes And Silhouettes May Differ

Do not make advanced shapes break collision. Keep physics mostly AABB for performance and feel, but add a separate `VisualProfile` per entity.

```ts
export type ShapeFamily =
  | "perfect-square"
  | "corrupted-box"
  | "hex"
  | "diamond"
  | "kite"
  | "needle"
  | "saw"
  | "orb"
  | "blister"
  | "cage"
  | "organic-platform";

export interface VisualProfile {
  shapeFamily: ShapeFamily;
  danger: number;          // 0 round/safe, 1 spiked/lethal
  weight: number;          // 0 light, 1 massive
  corruption: number;      // 0 clean, 1 heavily deformed
  hueRole: ColorRole;
  patternId?: PatternId;
  strokePx: number;
  spinRate: number;        // radians/sec
  wobbleAmp: number;       // pixels or normalized path deformation
  cornerRadius: number;    // 0 for perfect, larger for round
  spikeCount?: number;
  phaseOffset: number;
}
```

## Chromatic Grammar

Base on `docs/Limited Chromatic Hierarchy.txt`, but make it game-specific.

### Screen Quantity Budget

Use Itten's Contrast of Quantity so rare saturated colors dominate attention without flooding the screen.

Target screen coverage:

```txt
Tier 1: 60-70% desaturated arena/background
Tier 2: 18-25% structural outlines, platform rims, inactive cages
Tier 3: 6-10% active entities
Tier 4: 2-4% telegraphs, critical danger, healing/determination bursts
Tier 5: <1% pure white impact cores
```

Runtime approximation:

```ts
const quantityWeight = saturation01 * Math.max(0.2, lightness01) * screenArea01;
// Keep total quantityWeight of lethal red below 0.055 outside of boss ultimates.
// Keep pure white quantityWeight below 0.006 except explosions.
```

### Color Roles

```ts
export type ColorRole =
  | "player-agency"
  | "boss-lethal"
  | "minion-logic"
  | "minion-organic"
  | "telegraph"
  | "determination"
  | "arena-stone"
  | "arena-infection"
  | "hazard"
  | "neutral-ui"
  | "impact-white";

export const COLOR_ROLES = {
  playerAgency: {
    core: "hsl(142, 72%, 56%)",
    light: "hsl(142, 100%, 78%)",
    dark: "hsl(148, 65%, 24%)",
    use: "player body, player basic projectiles, dash echoes"
  },
  bossLethal: {
    core: "hsl(350, 82%, 58%)",
    light: "hsl(0, 100%, 72%)",
    dark: "hsl(348, 70%, 28%)",
    use: "boss bodies, boss projectiles, lethal boss arena ownership"
  },
  hazard: {
    core: "hsl(358, 92%, 52%)",
    light: "hsl(12, 100%, 66%)",
    dark: "hsl(350, 80%, 22%)",
    use: "spikes, saws, instant danger geometry"
  },
  telegraph: {
    core: "hsl(45, 100%, 60%)",
    light: "hsl(52, 100%, 78%)",
    dark: "hsl(34, 90%, 36%)",
    use: "pre-attack warning only"
  },
  determination: {
    core: "hsl(286, 85%, 62%)",
    light: "hsl(292, 100%, 80%)",
    dark: "hsl(276, 75%, 26%)",
    use: "healing, resolve, swirls, recovery windows"
  },
  minionLogic: {
    core: "hsl(194, 62%, 52%)",
    light: "hsl(188, 85%, 70%)",
    dark: "hsl(204, 45%, 24%)",
    use: "mechanical minions, tracking projectiles, spawn cage math"
  },
  minionOrganic: {
    core: "hsl(82, 38%, 44%)",
    light: "hsl(90, 50%, 62%)",
    dark: "hsl(76, 34%, 22%)",
    use: "contaminated arena organisms and heavy organic minions"
  },
  arenaStone: {
    core: "hsl(220, 10%, 12%)",
    light: "hsl(215, 12%, 22%)",
    dark: "hsl(230, 12%, 5%)",
    use: "majority of arena mass"
  },
  arenaInfection: {
    core: "hsl(330, 28%, 25%)",
    light: "hsl(336, 42%, 38%)",
    dark: "hsl(322, 30%, 12%)",
    use: "background contamination and geometric drift"
  }
} as const;
```

Rules:

- Green is player agency only. Never use green for decorative arena rims except old code migration placeholders.
- Red is lethal danger. Bosses can use different red families, but all must remain in the red/magenta/orange-red danger band.
- Yellow is a warning state, not a faction. It should disappear after the attack commits.
- Violet is determination/healing/metaphysical resolve. Avoid using it as arbitrary minion body color.
- Blue/cyan is machine logic, prediction, tracking, cages, and non-lethal setup. Cyan projectiles can hurt only if they also carry red rims or yellow telegraph.
- Arena colors are low saturation. The arena may glow only at edges, not fill the whole playfield.

### Boss Red Variants

Each boss has a unique shade, avatar pattern, and mathematical demarcation.

```ts
export interface BossIdentity {
  id: BossId;
  displayName: string;
  coreHsl: [number, number, number];
  rimHsl: [number, number, number];
  portraitPattern: PortraitPattern;
  attackMath: BossMathSignature;
}
```

Boss palette examples:

```txt
PRIME WOUND:       hsl(350, 82%, 58%) / clean red square-corruption
THE SCARLET LOCK:  hsl(4, 88%, 54%)   / vertical prison bars, modular symmetry
CARMINAL ORBIT:    hsl(338, 76%, 55%) / orbital ring glyphs, polar math
RUST CATHEDRAL:    hsl(15, 82%, 48%)  / heavy orange-red, block compression
VERMILION NEEDLE:  hsl(356, 94%, 62%) / tiny sharp repeated spikes
MARROW KING:       hsl(345, 58%, 46%) / bruised red, organic rounded mass
```

Boss dialogue avatars are fully filled square portraits, but no two read alike:

- Prime Wound: filled red square with one black diagonal fault line.
- Scarlet Lock: filled red square with three darker vertical prison bars.
- Carminal Orbit: filled magenta-red square with thin concentric circular cuts.
- Rust Cathedral: filled orange-red square with heavy black block insets.
- Vermilion Needle: filled bright red square with inward triangular teeth around edges.
- Marrow King: filled bruised red square with organic darker blisters.

Portrait generation formula:

```ts
function drawBossPortrait(ctx: CanvasRenderingContext2D, boss: BossIdentity, x: number, y: number, size: number, time: number) {
  ctx.fillStyle = hsl(boss.coreHsl);
  ctx.fillRect(x, y, size, size);

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, size, size);
  ctx.clip();

  // Pattern coordinates are normalized 0..1 so the portrait remains readable on mobile.
  boss.portraitPattern.draw(ctx, x, y, size, time);
  ctx.restore();

  ctx.strokeStyle = hsl(boss.rimHsl);
  ctx.lineWidth = Math.max(2, size * 0.045);
  ctx.strokeRect(x + 1, y + 1, size - 2, size - 2);
}
```

## Shape Grammar

### Entity Families

```txt
Player: perfect square, green, exact stable rotation at rest.
Bosses: corrupted square derivatives, red, high health, named pattern math.
Minions: non-square silhouettes. They may be more dangerous than bosses moment-to-moment.
Projectiles/weapons: points, spikes, needles, saw petals, shards.
Platforms/background: round organic custom silhouettes, contaminated drift.
Spawn cages: mathematical prisons that reveal the entity's shape before it spawns.
Hazards: red spikes/saws/inner cuts. Always sharp.
```

### Procedural Shape Construction

Use normalized local points and draw through a reusable shape renderer. Avoid a pile of bespoke `ctx.lineTo` code spread across entities.

```ts
export interface ShapePathSpec {
  points?: Array<{ x: number; y: number }>;
  radiusFn?: (theta: number, t: number) => number;
  cornerRadius?: number;
  innerCuts?: Array<{ angle: number; depth: number; widthRad: number }>;
  spikeCount?: number;
  spikeAmp?: number;
  shear?: number;
  wobble?: number;
}
```

Star/spike projectile formula:

```ts
function spikyRadius(theta: number, base: number, points: number, amp: number, sharpness = 3): number {
  // abs(cos) gives evenly repeated spikes. pow sharpens tips without adding extra vertices.
  const wave = Math.pow(Math.abs(Math.cos(theta * points * 0.5)), sharpness);
  return base * (1 + amp * wave);
}
```

Organic platform formula:

```ts
function organicRadius(theta: number, base: number, seed: number, contamination: number): number {
  return base * (
    1
    + 0.06 * Math.sin(theta * 2 + seed)
    + 0.04 * Math.sin(theta * 3.7 + seed * 1.9)
    + contamination * 0.10 * Math.sin(theta * 7 + seed * 0.6)
  );
}
```

Corrupted box formula:

```ts
function corruptedBoxPoint(x: number, y: number, corruption: number, time: number, seed: number) {
  const shear = corruption * 0.16 * Math.sin(seed);
  const wobbleX = corruption * 3.0 * Math.sin(time * 4 + y * 0.08 + seed);
  const wobbleY = corruption * 2.0 * Math.cos(time * 3 + x * 0.07 + seed);
  return { x: x + y * shear + wobbleX, y: y + wobbleY };
}
```

Inner cut formula for dangerous boxes:

```ts
// Cut triangular bites into a box edge. Use for bosses and cages, not player.
interface InnerCut {
  edge: "top" | "right" | "bottom" | "left";
  center01: number;
  width01: number;
  depthPx: number;
}
```

### Rotation And Motion

Spinning communicates instability and danger. Use it sparingly and semantically.

```txt
Stable:        0 to 0.3 rad/sec, eases back to cardinal angles.
Agitated:      0.8 to 1.6 rad/sec, telegraph wobble.
Dangerous:     2.4 to 5.0 rad/sec, active saw/projectile/minion attack.
Unreadable:    >6.0 rad/sec, avoid except short impact bursts.
```

Rotation direction can encode behavior:

- Clockwise: pursuing/player-targeting.
- Counter-clockwise: arena hazard/environmental cycle.
- Oscillating: telegraphing.
- Snapping to 90 degrees: pure square/player agency.

## Stage Structure

Replace the single default level with a gauntlet sequence.

```ts
export interface GauntletConfig {
  stages: StageConfig[];
  globalDifficulty: DifficultyCurve;
  checkpointPolicy: "none" | "stage" | "boss" | "assist";
}

export interface StageConfig {
  id: string;
  title: string;
  theme: StageTheme;
  layout: ArenaLayout;
  traversalIntro?: TraversalTrialConfig;
  waves: EncounterWaveV2[];
  midBoss: BossConfig;
  postBossWaveMutator: WaveMutatorConfig;
  completionTrial?: TraversalTrialConfig;
  dialogueScript: DialogueScript;
  visualRules: StageVisualRules;
}
```

Wave rule:

- Each stage has 6-10 combat waves.
- Mid-boss appears after half the waves are cleared.
- After boss appears, minion spawns adapt to boss footprint and attack lanes.
- Boss persists until defeated, but minions continue spawning in controlled budgets.
- Defeating the boss does not immediately end the stage unless the stage script says so. Some stages should make the player survive a final revenge wave.

Spawn budget formula:

```ts
const baseBudget = stage.difficulty.minionBudget;
const bossPresencePenalty = boss.active ? Math.ceil(boss.visualMass * 1.4) : 0;
const arenaWidthModifier = layout.tags.includes("narrow") ? -1 : 0;
const currentBudget = clamp(baseBudget - bossPresencePenalty + arenaWidthModifier, 1, stage.difficulty.maxBudget);
```

Threat budget formula:

```ts
interface SpawnCandidate {
  type: MinionTypeV2;
  threat: number;       // 1 tiny nuisance, 5 elite killer
  footprint: number;    // approximate occupied route pressure
}

const maxThreat = boss.active ? stage.maxThreatWithBoss : stage.maxThreatBeforeBoss;
const canSpawn = activeThreat + candidate.threat <= maxThreat
  && activeFootprint + candidate.footprint <= layout.maxEnemyFootprint;
```

Safe anchor formula:

```ts
function anchorSafety(anchor, player, boss, layout) {
  const dp = distance(anchor, player.position);
  const db = boss ? distance(anchor, boss.position) : 9999;
  const lanePenalty = isInActiveBossLane(anchor, boss) ? 300 : 0;
  const exitPenalty = blocksRequiredTraversal(anchor, layout) ? 250 : 0;
  return dp * 1.0 + db * 0.45 - lanePenalty - exitPenalty;
}
// Choose the highest safety anchor among weighted candidates, not the first valid one.
```

## Proposed Gauntlet

### Stage 1: The Old Pit

Purpose: preserve and elevate the current layout. This is the familiar arena the player already knows.

Layout:

- Keep current split floor, center spike pit, center bridge, left/right catwalks.
- Redraw platforms as desaturated organic/stone masses with subtle contamination.
- Keep at least one battle sequence using this layout exactly enough to feel recognizable.

Bespoke minion: Pit Lancer.

- Shape: long kite/needle body, not a box.
- Behavior: patrols the low platforms and tries to shove the player into the center spike pit.
- Special: when near pit edge, it pauses 0.2s then thrusts with extra knockback.

Mid-boss: Prime Wound.

- Silhouette: corrupted square boss, closest to current boss but with one diagonal internal cut.
- Math signature: basic radial symmetry.
- Attacks: current volley, omni burst, gap ring.
- Dialogue: arrogant tutorial tyrant; establishes that the arena is judging shape purity.

Post-boss spawn mutation:

- Avoid center bridge spawns if boss occupies center.
- Favor high perch turrets while boss controls ground.
- Pit Lancers spawn only from pit-warning anchors when boss is away from pit.

### Stage 2: The Narrow Redoubt

Purpose: fulfill the request for narrow stage designs and teach vertical compression.

Layout:

- Width about 440-560 world units inside a full 1000 canvas.
- Tall shaft with alternating one-way ledges and wall cling sections.
- Bottom hazard strip, side squeeze hazards that periodically protrude.

Bespoke minion: Clampjaw.

- Shape: heavy rounded rectangle with concave biting mouth cut from one side.
- Behavior: slow wall-to-wall sweeps that force jumps.
- Danger: not very sharp, but high weight and contact damage.

Mid-boss: Scarlet Lock.

- Silhouette: red block with prison-bar inner cuts.
- Math signature: modular vertical gates.
- Attacks:
  - Gate Drop: red vertical bars fall in columns.
  - Lockstep Volley: projectiles fire in repeating modulo lanes.
  - Compression March: boss walks slowly while arena side hazards pulse.

Implementation math:

```ts
const laneCount = 5;
const safeLane = (beatIndex * 2 + stageSeed) % laneCount;
for (let lane = 0; lane < laneCount; lane++) {
  if (lane === safeLane) continue;
  spawnGateHazard(laneX(lane), telegraphTime);
}
```

Post-boss spawn mutation:

- Use fewer minions because the arena is narrow.
- Spawn above or below the boss, never directly beside it unless the spawn is a slow heavy.

### Stage 3: The Orbital Gallows

Purpose: teach projectile reading, arcs, and rotating hazards.

Layout:

- Open center with three small orbiting platforms.
- Rotating red saw points on predictable circular paths.
- Safe floor appears only in short segments.

Bespoke minion: Compass Wasp.

- Shape: small sharp diamond with four unequal points.
- Behavior: orbits a platform, then dives along tangent line.
- Danger: low health, high speed, high lethality if ignored.

Mid-boss: Carminal Orbit.

- Silhouette: magenta-red corrupted circle-in-square portrait, in world a diamond/square hybrid with orbiting shard satellites.
- Math signature: polar coordinates.
- Attacks:
  - Aphelion Ring: slow bullets expand from boss, leaving one angular gap.
  - Perihelion Dive: boss accelerates inward toward player after circling.
  - Satellite Tax: orbiting shards become temporary minions.

Ring gap formula:

```ts
const count = 24;
const targetAngle = atan2(player.y - boss.y, player.x - boss.x);
const gapWidth = 0.34; // radians
for (let i = 0; i < count; i++) {
  const a = i * TAU / count + phaseOffset;
  if (angularDistance(a, targetAngle) < gapWidth) continue;
  spawnProjectile(a);
}
```

Post-boss spawn mutation:

- Compass Wasps should prefer outer anchors when boss is central.
- Turrets are banned; too much projectile overlap.

### Stage 4: The Dissolving Choir

Purpose: Path of Pain combat hybrid.

Layout:

- Dissolving platforms, pogo posts, spike corridors, short combat pockets.
- Player must use downward strikes to reset dash/jump while minions interfere.

Bespoke minion: Hymn Nail.

- Shape: vertical needle with two small crossbar fins.
- Behavior: hovers as a pogo target, then turns hostile if overused.
- Counterplay: can be bounced on safely during blue/cyan state; becomes red-rimmed before attacking.

Mid-boss: Vermilion Needle.

- Silhouette: tiny sharp boss with high speed, many red inward teeth in portrait.
- Math signature: splines and acceleration curves.
- Attacks:
  - Needle Rain: narrow spikes descend along sine-offset columns.
  - Dash Thread: boss draws a red line telegraph, then travels it.
  - Pogo Tax: boss targets recently used pogo platforms.

Dissolving platform formula:

```ts
interface DissolvePlatform {
  rect: Rectangle;
  stableTime: number;     // e.g. 0.45s after player contact
  dissolveTime: number;   // e.g. 0.35s fade/shrink
  respawnTime: number;    // e.g. 1.6s
  state: "idle" | "cracking" | "gone" | "respawning";
}

const alpha = state === "cracking" ? 1 - crackTimer / dissolveTime : 1;
const inset = (1 - alpha) * Math.min(rect.width, rect.height) * 0.35;
```

Pogo post rule:

- Shape: cyan/violet diamond post with red core only when unsafe.
- On downward slash contact, publish `PLAYER_POGOED`.
- Damage player if touched from side or if unsafe state is active.

### Stage 5: The Marrow Rot

Purpose: organic stage and heavy enemy variety.

Layout:

- Round organic platforms, pulsing background growth, moving soft-looking but dangerous masses.
- Uses contamination/illness/possession through geometric drift.

Bespoke minion: Blister Ox.

- Shape: large round lumpy blob; high weight, low danger axis, still dangerous by mass.
- Behavior: slow jumps that deform platforms and create shockwaves.
- Counterplay: predictable, must route around weight.

Mid-boss: Marrow King.

- Silhouette: large rounded red mass with blisters, not sharp but oppressive.
- Math signature: low-frequency waves and mass displacement.
- Attacks:
  - Belly Tide: expanding ground shockwave.
  - Blister Spawn: creates organic minions from wall growths.
  - Sickness Lean: arena tilts/morphs slightly, changing platform routes.

Organic drift formula:

```ts
const drift = contamination * Math.sin(time * 1.2 + platform.seed) * 6;
const radiusScale = 1 + contamination * 0.04 * Math.sin(time * 2.1 + platform.seed);
```

### Stage 6: The Rust Cathedral

Purpose: heavy boss and platform crush patterns.

Layout:

- Broad arena with massive moving slabs, crush lanes, and high perches.
- Platform surfaces are thick, rounded, desaturated, with rust-red infection seams.

Bespoke minion: Bell Hammer.

- Shape: large hex/hammer silhouette.
- Behavior: jumps to marked tile, slams, creates local shockwave.

Mid-boss: Rust Cathedral.

- Silhouette: heavy orange-red block with thick internal rectangles.
- Math signature: weight, delay, and compression.
- Attacks:
  - Cathedral Toll: huge slow shockwaves at beat intervals.
  - Falling Nave: ceiling blocks descend after yellow outline.
  - Weight Transfer: boss landing temporarily disables one-way platforms.

Beat formula:

```ts
const beat = Math.floor(stageTime / beatInterval);
const anticipation = stageTime % beatInterval;
if (anticipation > beatInterval - telegraphWindow) telegraphNextLane(beat);
if (anticipation < dt) commitLane(beat);
```

### Stage 7: The Pantheon Box

Purpose: final synthesis.

Layout:

- Starts as the old pit, then morphs through narrow, orbital, dissolving, organic, and cathedral motifs.
- Each defeated boss leaves a red mathematical scar in the arena.

Boss: The False Square.

- Silhouette: tries to imitate the player's perfect square but cannot hold it.
- Color: unstable red shifting through all boss reds.
- Story: the corruption wants the player's purity.
- Mechanics: borrows one signature attack from each previous boss.
- Rule: whenever it becomes too square, it must glitch/deform visibly; the player remains the only stable square.

Final phase:

- Boss portrait becomes a full red square that fractures into all previous boss patterns.
- Arena reduces to greyscale except green player and red danger.
- Determination swirls become the only violet accent, orbiting the player when healing charges are full.

## Minion Roster

Minions should be dangerous enough that one ignored enemy can ruin a run.

```ts
export interface MinionArchetypeV2 {
  type: string;
  silhouette: ShapeFamily;
  size: { w: number; h: number };
  hp: number;
  threat: number;
  preferredLayouts: string[];
  movement: MovementSpec;
  attacks: AttackSpec[];
  counters: string[];
  visualProfile: VisualProfile;
}
```

Recommended roster:

1. Turret Seed: migrated turret. Hex or squat prism. Fires line-of-sight bursts. Low movement, medium threat.
2. Pit Lancer: kite/needle. Pushes horizontally. Strong near hazards.
3. Compass Wasp: small asymmetric diamond. Orbits then tangent-dives. Fast lethal threat.
4. Clampjaw: rounded heavy with concave mouth. Slow corridor sweeper.
5. Hymn Nail: pogo target/temporary enemy. Enables traversal but punishes greed.
6. Blister Ox: big organic blob. Slow high-mass jumps and shockwaves.
7. Bell Hammer: heavy hex/hammer. Marks slam lane, then drops.
8. Shard Choir: group of tiny triangular shards. Individually weak, dangerous as a pattern.
9. Mirror Shielder: migrated shielder. Shield face is a thick chamfered plate; vulnerable from rear or charged shot.
10. Needle Scribe: small stationary hazard writer. Draws temporary red line segments in the arena.

Movement formulas:

Pursuit with anticipation:

```ts
const lead = clamp(distanceToPlayer / projectileSpeed, 0.12, 0.55);
const target = {
  x: player.position.x + player.velocity.x * lead,
  y: player.position.y + player.velocity.y * lead * 0.55
};
```

Orbit then dive:

```ts
angle += orbitDir * orbitSpeed * dt;
position.x = anchor.x + Math.cos(angle) * radius;
position.y = anchor.y + Math.sin(angle) * radius * yScale;
if (shouldDive) {
  const tangent = angle + orbitDir * Math.PI / 2;
  velocity.x = Math.cos(tangent) * diveSpeed;
  velocity.y = Math.sin(tangent) * diveSpeed;
}
```

Heavy jump:

```ts
const flightTime = clamp(distance / 360, 0.55, 1.05);
velocity.x = dx / flightTime;
velocity.y = (dy - 0.5 * gravity * flightTime * flightTime) / flightTime;
```

## Boss Architecture

Current `Boss` should become either:

1. A base class plus specific boss subclasses, or
2. A single `Boss` driven by `BossConfig` and `BossBehaviorModule`.

Prefer option 2 for speed and data-driven staging.

```ts
export interface BossConfig {
  id: BossId;
  displayName: string;
  maxHp: number;
  size: { width: number; height: number };
  visualProfile: VisualProfile;
  identity: BossIdentity;
  phases: BossPhaseConfig[];
  attacks: BossAttackPatternV2[];
  contactDamage: number;
  mass: number;
}

export interface BossPhaseConfig {
  hpPct: number;
  speedMultiplier: number;
  attackCooldown: [number, number];
  enabledAttackIds: string[];
  dialogueEvent?: string;
}
```

Extend scoring:

```ts
score =
  basePriority
  + distanceBonus
  + airborneBonus
  + arenaLaneBonus
  + minionSynergyBonus
  - recentRepeatPenalty
  - unfairOverlapPenalty;
```

Unfair overlap penalty:

```ts
if (activeRedHazardCoverageNearPlayer > 0.42) score -= 999;
if (playerHasNoExitRouteFor(0.7)) score -= 999;
```

The game can be brutal, but it should not be illegible.

## Projectiles And Trails

All projectiles/weapons should be points, spikes, shards, saw petals, or needles. Remove circular boss bullets except for non-damaging telegraphs.

Projectile visual data:

```ts
export interface ProjectileVisualSpec {
  shape: "needle" | "shard" | "saw" | "thorn" | "comet" | "ring-gap";
  points: number;
  length: number;
  width: number;
  spinRate: number;
  trail: TrailSpec;
  colorRole: ColorRole;
}

export interface TrailSpec {
  type: "ribbon" | "afterimage-points" | "segmented-spine" | "swirl" | "smoke";
  length: number;
  widthStart: number;
  widthEnd: number;
  alphaStart: number;
  turbulence: number;
}
```

Segmented spine trail formula:

```ts
for (let i = 0; i < trailCount; i++) {
  const p = i / (trailCount - 1);
  const idx = (trailHead - 1 - i + ringSize) % ringSize;
  const width = lerp(widthStart, widthEnd, p);
  const alpha = alphaStart * Math.pow(1 - p, 1.7);
  drawDiamondAt(trail[idx], width, alpha);
}
```

Swirl trail formula:

```ts
const normal = { x: -dir.y, y: dir.x };
const swirl = Math.sin(p * Math.PI * 4 + time * 12 + projectile.seed) * turbulence * (1 - p);
trailPoint.x += normal.x * swirl;
trailPoint.y += normal.y * swirl;
```

Player basic projectile can stay green, but make it a compact square-shard to echo the player. Charged player projectile can be a green/yellow square comet: square core, four pointed energy corners.

Boss projectiles:

- Bolt: red needle, no spin, fast.
- Fan shard: red triangular shard, slight spin.
- Ring thorn: red saw petal, radial orientation.
- Homing: cyan logic core with red rim once armed.
- Shockwave: red ground-hugging serrated line.

## Spawn Cages

Spawn cages should preview the incoming silhouette and faction.

Current cage is a rotating cylindrical ring. Replace with shape-specific cages:

- Turret Seed: hexagonal wireframe unfolding.
- Pit Lancer: long triangular clamp that opens horizontally.
- Compass Wasp: four-point compass cage spinning once, then snapping open.
- Clampjaw: rounded bracket cage compressing from sides.
- Hymn Nail: vertical tuning fork cage.
- Blister Ox: organic membrane bubble that ruptures.
- Bosses: red square seal with unique portrait pattern, then world silhouette emerges.

Spawn timing:

```txt
0.00-0.25s: cage appears, non-collidable silhouette ghost visible.
0.25-0.85s: cage animates according to shape family.
0.85-1.05s: yellow danger flicker if hostile on spawn.
1.05-1.20s: cage breaks, enemy becomes active.
```

Never spawn an active damaging entity without at least 0.85s of readable warning.

## Stage Morphs Without GSAP/Anime

Do this natively. No external animation dependency is needed.

Represent all stage geometry as morphable shapes, not only rectangles:

```ts
export interface MorphPlatform {
  id: string;
  from: PlatformShape;
  to: PlatformShape;
  duration: number;
  easing: EasingId;
  t: number;
  collisionMode: "snap-at-end" | "interpolate-aabb" | "sampled-polygon";
}

export interface PlatformShape {
  kind: "rect" | "organic" | "polygon";
  rect?: Rectangle;
  points?: Array<{ x: number; y: number }>;
  radius?: number;
  seed?: number;
}
```

Easing functions:

```ts
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
```

Rect interpolation:

```ts
function lerpRect(a: Rectangle, b: Rectangle, t: number): Rectangle {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    width: lerp(a.width, b.width, t),
    height: lerp(a.height, b.height, t)
  };
}
```

Collision recommendation:

- For combat arena morphs, telegraph for 0.8s, then snap collision at the moment the new geometry locks in. Visuals can interpolate before collision changes.
- For traversal morph platforms, use `interpolate-aabb` only when movement is slow and predictable.
- Avoid polygon collision in the first pass unless absolutely necessary. Draw organic shapes visually over AABB platforms.

Implementation note:

- `StaticMapRenderer.buildStaticCache` currently caches once. Add a `levelVersion` or `stageVisualVersion`.
- Call `staticMap.resetCache()` when layouts change.
- Dynamic platforms should render separately from the static cache.

## Path Of Pain Mechanics

Add these traversal surface types:

```ts
export type SurfaceType =
  | "solid"
  | "oneway"
  | "hazard"
  | "dissolve"
  | "pogo-post"
  | "dash-reset"
  | "spring"
  | "crumble"
  | "moving"
  | "phase";
```

Dissolve platforms:

- Trigger on player landing.
- Crack visually in yellow-white hairlines.
- Collapse quickly.
- Respawn with desaturated outline before becoming solid.

Pogo posts:

- Safe only from downward melee.
- On successful downward hit, publish `PLAYER_POGOED`, reset dash/double jump, spawn violet/green swirl.
- From side/top contact, damage unless in safe cyan state.

Dash reset gates:

- Small green square outline, because they restore player agency.
- Must never be red or yellow.

Spike corridors:

- Red, sharp, stable.
- Do not overdecorate spikes; their silhouette must remain clean.

## Determination Swirls

The existing healing/charge swirl language is strong. Expand it into a named system: Resolve Geometry.

Use violet for determination, green for player agency, white for completion.

Swirl formula:

```ts
function resolveSpiralPoint(i: number, count: number, time: number, radius: number, phase: number) {
  const p = i / count;
  const theta = p * Math.PI * 2 + time * 4.0 + phase;
  const r = radius * (0.35 + 0.65 * p);
  return {
    x: Math.cos(theta) * r,
    y: Math.sin(theta) * r * 0.72
  };
}
```

Uses:

- Healing: violet spiral rising around player.
- Full healing charges: three tiny violet square sparks orbit the player at low opacity.
- Perfect pogo chain: brief green/violet helix at contact point.
- Boss stagger: red shape briefly unwinds into violet if player earns a recovery window.
- Stage completion: arena infection lines retract into violet then fade.

## Dialogue Rewrite And Timing

The dialogue needs to be event-scripted, not hardcoded only by boss HP.

```ts
export interface DialogueLine {
  id: string;
  speaker: "player" | BossId | "system";
  text: string;
  trigger: DialogueTrigger;
  delay?: number;
  hold?: number;
  typingMsPerChar?: number;
  portraitOverride?: BossId;
  priority: number;
  interrupt?: boolean;
}

export type DialogueTrigger =
  | { type: "stage-start" }
  | { type: "wave-cleared"; waveIndex: number }
  | { type: "boss-enter" }
  | { type: "boss-phase"; phase: number }
  | { type: "player-low-hp" }
  | { type: "player-perfect-chain"; count: number }
  | { type: "boss-defeated" }
  | { type: "trial-start" }
  | { type: "trial-failed" }
  | { type: "gauntlet-complete" };
```

Dialogue console requirements:

- Support more than one boss identity.
- Boss speaker label should use boss display name, not generic `BOSS`.
- Portrait should draw from `BossIdentity`.
- Important lines can interrupt barks; low-priority barks should queue or be dropped.
- During intense combat, keep lines short: 28-52 characters.
- During stage transitions, allow longer lines.

Typing timing:

```ts
const baseMs = speaker === "player" ? 38 : 48;
const punctuationPause = char === "." || char === "!" || char === "?" ? 180 : char === "," ? 90 : 0;
const bossModifier = bossIdentity ? bossIdentity.dialogueTempo : 1;
nextDelay = baseMs * bossModifier + punctuationPause;
```

Sample staged dialogue:

Stage 1 start:

- Player: "Same pit. Different smell."
- Prime Wound: "A square returns to be measured."

First pit knockback:

- Prime Wound: "Edges teach faster than mercy."

Boss enter:

- Prime Wound: "Hold your shape, little proof."

Phase 2:

- Prime Wound: "Good. Now the pit gets a vote."

Boss defeated:

- Prime Wound: "No. You were meant to bend."
- Player: "I did. I came back square."

Narrow Redoubt:

- Scarlet Lock: "Every exit is a rule."
- Player: "Then I only need one exception."

Dissolving Choir:

- Vermilion Needle: "Jump. Cut. Beg the floor to remember you."
- Player: "I remember enough."

Final boss:

- False Square: "I can be you."
- Player: "No. You can only copy the outline."

## UI And HUD

Boss HP needs multiple identities:

- Current top boss bar becomes active boss bar.
- During stages with mid-boss plus waves, show small red boss sigil near bar.
- Minion threat budget does not need to be visible.
- Determination/healing UI should use violet/green square motifs.

Dialogue portrait:

- Left player portrait: exact green filled square, with tiny white center point when typing.
- Right boss portrait: generated red square identity pattern.
- Multiple bosses in Pantheon finale: portrait can fracture into segments, but still one square frame.

## Audio Notes

Current procedural audio is a strength. Tie new shape grammar to sound:

- Perfect square/player: clean square-ish synth, short stable pitch.
- Boss red: detuned saw/triangle, low growl.
- Needle threats: high narrow clicks with fast attack.
- Heavy round threats: low thuds, longer decay.
- Dissolving platforms: brittle noise burst followed by filtered drop.
- Spawn cages: pitch sequence based on shape sides. Hex cage uses 6 ticks, diamond uses 4, saw uses rapid uneven ticks.

Formula:

```ts
const sideCountPitch = baseFreq * Math.pow(2, sideCount / 24);
const dangerFilterQ = lerp(0.8, 8.0, danger);
const massDecay = lerp(0.08, 0.55, weight);
```

## Implementation Plan

### Phase 1: Foundations

1. Add `src/core/design/ColorRoles.ts`.
2. Add `src/core/visuals/ShapeRenderer.ts`.
3. Add `VisualProfile` to `BaseEntity`, `BaseMinion`, `Boss`, and `Projectile`.
4. Refactor player size to `40x40` and adjust player visuals so the player is the only perfect square.
5. Replace hardcoded minion/boss colors with color roles.
6. Expand dialogue state to include `speakerId`, `speakerLabel`, and portrait identity.

### Phase 2: Data-Driven Stages

1. Replace `defaultLevelConfig` singleton usage in `EncounterDirector` with active `StageConfig`.
2. Add `GauntletDirector` above `EncounterDirector` or evolve `EncounterDirector` into it.
3. Add stage progression, wave cleared tracking, mid-boss spawn point, post-boss mutators.
4. Add `levelVersion` to renderer cache invalidation.
5. Implement stage start/end transitions.

### Phase 3: New Visual Grammar

1. Rebuild boss portraits.
2. Rebuild spawn cages.
3. Rebuild projectile bodies and trails.
4. Add organic platform rendering over AABB collision.
5. Add greyscale thumbnail dev helper if time allows.

### Phase 4: Combat Roster

1. Migrate current Turret, Lancer, Flyer, Shielder into V2 visual profiles.
2. Add Pit Lancer, Clampjaw, Compass Wasp, Hymn Nail.
3. Add Blister Ox and Bell Hammer.
4. Add threat budget spawning.
5. Add stage-specific spawn safety scoring.

### Phase 5: Bosses

1. Convert `Boss` to accept `BossConfig`.
2. Implement Prime Wound from current boss behavior.
3. Implement Scarlet Lock and Vermilion Needle next because they force narrow/traversal mechanics.
4. Implement Carminal Orbit, Marrow King, Rust Cathedral.
5. Implement False Square finale.

### Phase 6: Path Of Pain

1. Add `DissolvePlatform`.
2. Add `PogoPost`.
3. Add dash reset gates.
4. Add traversal trial configs between combat stages.
5. Add failure/retry policy.

## Balancing Targets

Player:

- Keep player max HP initially unchanged.
- Keep healing charges at 3.
- Full gauntlet should be hard but learnable.

Enemy health:

```txt
Tiny minion: 1-2 HP
Fast lethal minion: 2-3 HP
Standard minion: 4-6 HP
Heavy minion: 8-12 HP
Mid boss: 60-100 HP depending stage length
Final boss: 140-180 HP with phase checkpoints only if assist mode exists
```

Damage:

```txt
Most minion contact: 1
Telegraphed elite hit: 2
Boss contact: 1
Boss committed attack: 2
Hazards/spikes: 1 plus reset/knockback, not instant death unless special trial mode
```

Spawn pressure:

```txt
Before boss: 2-5 active minions depending stage.
After boss: 1-3 active minions, but higher synergy.
Narrow arenas: never more than 2 active minions with boss.
Open arenas: can allow 4 if most are tiny/low threat.
```

## Readability QA Checklist

Every new entity must pass:

- Can I identify it at 48x48 greyscale?
- Does its color role match its gameplay role?
- Does yellow appear only before commitment?
- Does red mean damage or lethal pressure?
- Is the player still the only perfect square at rest?
- Is there at least 0.35s of reaction time for fast attacks, or is the attack pre-positioned as a route puzzle?
- Can the player route out of overlapping boss/minion hazards?
- Does the stage still read with saturation removed?
- Does the boss portrait remain distinct as a filled square?
- Does the spawn cage preview the enemy's silhouette?

## Implementation Warnings

- Do not make the game visually richer by adding saturation everywhere. The whole system depends on restraint.
- Do not make platforms fully organic in collision on the first pass. Draw organic, collide simple.
- Do not let minion complexity become random behavior. Every enemy needs one clear read, one clear sin, and one clear punishment.
- Do not reuse violet for arbitrary enemies; it will weaken determination/healing.
- Do not use perfect square silhouettes for bosses or minions, even if they are called boxes. Corrupt them.
- Do not make the final boss a stable square. It can imitate the player only as a lie that visibly fails.
- Do not stack red projectiles, red hazards, red boss body, and red background at equal saturation. Use quantity hierarchy.

## Minimum Vertical Slice Of The Overhaul

If time is limited, implement this first:

1. Player becomes perfect green square.
2. Current arena becomes Stage 1: The Old Pit.
3. Current boss becomes Prime Wound with unique portrait and rewritten dialogue.
4. Add Pit Lancer bespoke minion.
5. Add threat budget and post-boss spawn mutation.
6. Rework projectile trails into shard/needle language.
7. Rework spawn cages to preview silhouette.
8. Add one short Path of Pain interlude with dissolving platforms and pogo posts.

That slice proves the new grammar without requiring the entire Pantheon.
