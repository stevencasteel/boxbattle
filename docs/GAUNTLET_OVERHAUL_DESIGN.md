# Box Battle Gauntlet Overhaul Design

This document details the complete technical design for transforming Box Battle into a precision combat gauntlet inspired by classic colosseum wave survival and precision traversal trials, set entirely within a single, morphing arena.

---

## North Star

Box Battle is a precision combat gauntlet where the player is tested against escalating geometric threats inside a singular crucible.

Rather than transitioning between different levels, the entire game takes place within **Stage 1: The Old Pit (The Unified Crucible)**. To keep the gameplay dynamic, the arena’s platforms, hazard zones, and boundaries **morph natively** between waves. These physical transitions utilize zero-dependency interpolations, changing the routing of the battleground from wide split-floors to vertical redoubts, orbital platforms, and organic pockets.

The player is the **only perfect square** in this world. Every other entity expresses danger, weight, or mechanical tracking through alternative geometric shapes. The game reads instantly in motion: green means player agency, red means lethal boss pressure, yellow means imminent telegraphing, violet means resolve and healing, and blue/cyan represents mechanical minion tracking logic.

---

## Core Design Laws

### 1. Silhouette First
Every gameplay entity must be instantly identifiable in a 48x48 greyscale thumbnail. The visual separation between entities is calculated programmatically through edge density, area, convexity, and aspect ratios.

```ts
// Silhouette validation structure for entity profiles
interface SilhouetteFingerprint {
  areaRatio: number;        // filled pixels / 2304
  perimeterRatio: number;   // edge pixels / 2304
  convexity: number;        // filled area / convex hull area
  aspect: number;           // bounds width / bounds height
  cornerEnergy: number;     // high curvature count / perimeter
  radialVariance: number;   // variance of outline radius from center
}

The minimum silhouette separation between any two active entities must satisfy:
\Delta = |areaRatio_A - areaRatio_B| + 0.45 \cdot |aspect_A - aspect_B| + 0.75 \cdot |cornerEnergy_A - cornerEnergy_B| \ge 0.18

2. Shape Contrast Carries Narrative

Danger and weight are mapped along clear geometric axes. Sharp, spiked, or
sheared forms indicate hostile or lethal objects, while rounded and heavy blocks
convey momentum and route obstruction:

round/soft -> chamfered -> square -> sheared -> cut/concave -> pointed/spiked
(safe)        (neutral)    (pure)    (unstable) (hostile)      (lethal)

3. The Player Is The Only Perfect Square

The player's body is maintained as a stable 40 \times 40 square in both
collision and rendering. During squashes, stretches, or dashes, the deformation
reads as energy acting on purity rather than a permanent change in silhouette.

// src/entities/Player.ts
this.size = { width: 40, height: 40 };
this.squashPivot = "center";

Wall slide forgiveness is extended using lateral probes rather than inflating
the collision bounding box:

const wallProbeHeight = player.size.height + 18;
const wallProbeWidth = player.size.width + 4;

Chromatic Grammar & budgets

Quantity Budget (Itten's Contrast of Quantity)

To keep the screen clean and legible during high-speed dashes, saturated colors
are heavily budgeted:

  - 60-70%: Desaturated arena stone and background mass.
  - 18-25%: Structural outlines, platform rims, and inactive preview cages.
  - 6-10%: Active combat entities.
  - 2-4%: Telegraph warnings, critical hazards, and healing/determination
    spirals.
  - <1%: Pure white impact cores.

Color Roles & Palettes

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
    core: "hsl(142, 72%, 56%)", // Pure green: reserved ONLY for player agency
    light: "hsl(142, 100%, 78%)",
    dark: "hsl(148, 65%, 24%)"
  },
  bossLethal: {
    core: "hsl(350, 82%, 58%)", // Deep red: reserved ONLY for Prime Wound and lethal boss threats
    light: "hsl(0, 100%, 72%)",
    dark: "hsl(348, 70%, 28%)"
  },
  hazard: {
    core: "hsl(358, 92%, 52%)", // Sharp spikes and saw blades
    light: "hsl(12, 100%, 66%)"
  },
  telegraph: {
    core: "hsl(45, 100%, 60%)"  // Yellow: warning states only; disappears on attack commitment
  },
  determination: {
    core: "hsl(286, 85%, 62%)" // Violet: healing, resolve, and pogo spirals
  }
} as const;

Visual Styling Constraints

  - Green is never used for decorative arena rims or hazard highlights.
  - Red always means damage or lethal pressure.
  - No Rune Sigils: The boss HP panel is kept minimalist and clean, containing
    only the health bar. The boss's mathematical identity is expressed strictly
    through its world-space geometry and the left-aligned dialogue portrait.
  - No Boss Distortion: Prime Wound is rendered with stable, solid 3D
    square-derivative geometry. It rotates and leans dynamically based on
    velocity, but does not undergo wild warping or stretching distortions.

Procedural Shape Construction

All non-square silhouettes are constructed procedurally using normalized local
points drawn through the 3D Software Renderer. This prevents bespoke canvas
drawing commands from cluttering entity files.

Spiky Radius (Needles, Saw Blades, and Thorns)

\gamma(\theta) = R_{base} \cdot \left(1 + A \cdot |\cos(\frac{\theta \cdot P}{2})|^S\right)

function spikyRadius(theta: number, base: number, points: number, amp: number, sharpness = 3): number {
  const wave = Math.pow(Math.abs(Math.cos(theta * points * 0.5)), sharpness);
  return base * (1 + amp * wave);
}

Organic Radius (Contaminated Platform Seams and Blisters)

\gamma(\theta) = R_{base} \cdot \left(1 + 0.06\sin(2\theta + \phi) + 0.04\sin(3.7\theta + 1.9\phi) + C \cdot 0.10\sin(7\theta + 0.6\phi)\right)

function organicRadius(theta: number, base: number, seed: number, contamination: number): number {
  return base * (
    1
    + 0.06 * Math.sin(theta * 2 + seed)
    + 0.04 * Math.sin(theta * 3.7 + seed * 1.9)
    + contamination * 0.10 * Math.sin(theta * 7 + seed * 0.6)
  );
}

Corrupted Box Points (Boss and Elite Minion Base Geometry)

function corruptedBoxPoint(x: number, y: number, corruption: number, time: number, seed: number) {
  const shear = corruption * 0.16 * Math.sin(seed);
  const wobbleX = corruption * 3.0 * Math.sin(time * 4 + y * 0.08 + seed);
  const wobbleY = corruption * 2.0 * Math.cos(time * 3 + x * 0.07 + seed);
  return { x: x + y * shear + wobbleX, y: y + wobbleY };
}

Single-Stage Morphing Architecture

Instead of loading separate scene routes, The Old Pit morphs its layout
on-the-fly. Transitions occur between waves, providing a dynamic battleground
that alters routing and platform heights.

export interface MorphPlatform {
  id: string;
  from: Rectangle;
  to: Rectangle;
  duration: number;
  easing: (t: number) => number;
  t: number;
}

Morph Easing & Platform Interpolation

Physical layout shifts utilize clean, zero-dependency mathematical
interpolation:

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function lerpRect(a: Rectangle, b: Rectangle, t: number): Rectangle {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    width: a.width + (b.width - a.width) * t,
    height: a.height + (b.height - a.height) * t
  };
}

At the moment the platform movement locks in, the physics world clears its
spatial hashing grid buckets, indexes the new AABB shapes, and calls
staticMap.resetCache() to redraw the neon borders.

Spawn Budgets & Tactical Placement

Threat-Based Spawning

To prevent visual clutter, spawning is governed by a strict tactical budget.
Minions carry specific threat values:

  - Turret Seed / Flyer / Hymn Nail: 2 Threat
  - Pit Lancer / Shielder: 3 Threat
  - Clampjaw / Bell Hammer: 4 Threat
  - Blister Ox: 5 Threat

Active threat on-screen is capped based on the boss's presence:

  - Boss Inactive: Max 8 Threat (or 4 on narrow morph layouts)
  - Boss Active: Max 4 Threat (or 2 on narrow morph layouts)

Safe Anchor Scoring

Instead of selecting the first available spawn anchor, the director evaluates
safety scores:
Score(A) = D_{player} \cdot 1.0 + D_{boss} \cdot 0.45 - Penalties(A)

function anchorSafety(anchor: SpawnAnchor, player: Player, boss: Boss | null): number {
  const dp = Math.sqrt(Math.pow(player.position.x - anchor.x, 2) + Math.pow(player.position.y - anchor.y, 2));
  const db = boss ? Math.sqrt(Math.pow(boss.position.x - anchor.x, 2) + Math.pow(boss.position.y - anchor.y, 2)) : 500;
  
  let safetyScore = dp * 1.0 + db * 0.45;
  
  if (dp < 160) safetyScore -= 300; // Penalize closeness to player
  if (db < 80) safetyScore -= 150;  // Penalize closeness to boss
  
  return safetyScore;
}

Unified Minion Combat Roster V2

The roster consists of 10 highly distinct geometric archetypes, each with unique
attack vectors, tracking mathematics, and movement profiles.

export interface MinionArchetypeV2 {
  type: string;
  silhouette: ShapeFamily;
  size: { w: number; h: number };
  hp: number;
  threat: number;
  visualProfile: VisualProfile;
}

1. Turret Seed (Hexagonal Prism)

  - Behavior: Anchors to catwalks or walls. Fires predictive cyan tracking
    rounds in bursts.
  - Visuals: Hexagonal silhouette rotating at a stable 0.2 rad/sec.

2. Pit Lancer (Spiked Kite)

  - Behavior: Patrols solid platforms and attempts to push the player into
    hazard spikes using horizontal thrusts.
  - Visuals: Bright red trim indicating high contact danger.

3. Compass Wasp (Asymmetric Diamond)

  - Behavior: Orbits a specific point before diving along tangent lines toward
    the player.
  - Formula:
    \text{position} = \text{anchor} + \begin{pmatrix} R \cdot \cos(\theta) \\ 0.6 \cdot R \cdot \sin(\theta) \end{pmatrix}
  - Visuals: Rapid, agitated spin (3.5 rad/sec) indicating high momentum.

4. Clampjaw (Concave Corrupted Box)

  - Behavior: Slow, heavy block sweeping across the floor with a massive contact
    footprint.
  - Visuals: A high-weight organic look with a chunk sheared out of its biting
    face.

5. Hymn Nail (Vertical Needle)

  - Behavior: Hovers as a stable, violet-rimmed pogo target. If bounced on more
    than three times, it turns red-rimmed and aggressively pursues the player.
  - Visuals: Needle silhouette that snaps to 90 degrees when resting.

6. Blister Ox (Rounded Lumpy Blob)

  - Behavior: Executes heavy parabolic jumps that deform under momentum. On
    landing, it triggers ground-hugging shockwaves.
  - Formula:
    v_x = \frac{dx}{T_{flight}}, \quad v_y = \frac{dy - 0.5 \cdot g \cdot T_{flight}^2}{T_{flight}}
  - Visuals: Organic lumpy lurching mass.

7. Bell Hammer (Heavy Hexagon)

  - Behavior: Marks a target tile with a vertical yellow telegraph column, then
    leaps and slams down, creating local shrapnel.
  - Visuals: Heavy hexagonal silhouette with an offset rotation.

8. Shielder (Chamfered Hex)

  - Behavior: Walks slowly towards the player. Completely blocks standard
    projectile and melee attacks from the front; must be bypassed or hit with a
    charged shot.
  - Visuals: Thick front-facing defensive plate.

9. Flyer (Double Needle)

  - Behavior: Hovers and glides vertically, launching 3-shot bursts, or
    executing descending dives.
  - Visuals: Lightweight dual-needle form.

10. Shard Choir (Triangular Shards)

  - Behavior: Weak on their own, but spawn in groups of three to block escape
    routes.
  - Visuals: Sharp triangular shards moving in unison.

Prime Wound Unified Attack Pool

Prime Wound is the sole master of the crucible. It incorporates all special
moves originally distributed across other stage bosses, shifting attack
selection based on health phases.

export interface BossAttackContext {
  phase: number;
  distanceToPlayer: number;
  playerIsAirborne: boolean;
  playerHP: number;
  activeMinionsCount: number;
  recentAttackIds: string[];
}

1. Aphelion Ring (Concentric Orbital Shards)

  - Description: Launches a circle of 20 needles that expand outward, leaving
    exactly one angular gap centered on the player's anticipated position.
  - Formula: \text{gapAngle} = \text{atan2}(P_y - B_y, P_x - B_x)
    \text{Skip if } |\theta - \text{gapAngle}| < 0.45\text{ rad}

2. Lockstep Volley (Modulo Lanes)

  - Description: Drops descending red bars in repeating column lanes, forcing
    the player to dash laterally.
  - Formula:
    \text{targetX} = X_{origin} + \left((\text{volleyIndex} + \text{phase}) \bmod \text{laneCount}\right) \cdot \text{laneWidth}

3. Belly Tide (Expanding Shockwave)

  - Description: Slams the ground, releasing twin serrated, ground-hugging
    shockwave projectiles that travel outward.
  - Visuals: Red ground-hugging waves paired with camera tremors.

4. Gate Drop (Columnar Bars)

  - Description: Spawns yellow telegraph lines on random columns before dropping
    heavy vertical bars from the ceiling.
  - Visuals: Deep red vertical prison bars.

5. Weight Transfer (Platform Collapser)

  - Description: Executes a high vertical leap and slams down. The kinetic
    impact temporarily disables player oneway platform collisions for 1.5
    seconds.
  - Sound: Heavy low-frequency thud with a long decay.

Projectiles & Segmented Trails

To maintain high visual performance and clarity, projectile movement is drawn
using procedurally constructed paths and advanced trail rendering.

1. Segmented Spine Trail (Modulo Lanes)

Draws a decay path of diamond-shaped segments along the projectile’s history
ring:

for (let i = 0; i < trailCount; i++) {
  const p = i / (trailCount - 1);
  const idx = (trailHead - 1 - i + ringSize) % ringSize;
  const width = projWidth * (1.15 - p * 0.85);
  const alpha = 0.82 * Math.pow(1 - p, 1.7);
  
  ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  drawDiamond(ctx, trail[idx], width);
}

2. Swirl Trail (Sinuous Shockwaves)

Applies a lateral sine-wave offset perpendicular to the projectile's movement
vector:
\text{offset} = \sin(p \cdot 4\pi + t \cdot 12 + \phi) \cdot 16.0 \cdot (1 - p)

const speed = Math.sqrt(vx * vx + vy * vy) || 1;
const normal = { x: -vy / speed, y: vx / speed };
const swirl = Math.sin(p * Math.PI * 4 + time * 12 + seed) * 16.0 * (1 - p);

trailPoint.x += normal.x * swirl;
trailPoint.y += normal.y * swirl;

3. Shape-Specific Spawn Cages

Entities reveal their faction and silhouette before they become active,
providing the player with 1.20\text{ seconds} of reading time:

  - Turret Seed: Hexagonal wireframe unfolding.
  - Pit Lancer / Wasp: Four-point diamond cage spinning, then snapping open.
  - Clampjaw: Rounded bracket cage compressing from the sides.
  - Hymn Nail: Vertical tuning fork wireframe.
  - Blister Ox: Organic membrane bubble that ruptures.
  - Prime Wound: Red square seal with its signature diagonal crack pattern,
    which dissolves as the boss emerges.

Path Of Pain Traversal Mechanics

The unified crucible integrates three specialized precision platforming elements
directly into its layout:

  [Dash Reset Gate]       (Green Outline: Restores double-jump and dash)
         ◇
   |  [Pogo Post]  |      (Violet Core: Safe only from downward slashes)
         ◆
   [Dissolve Platform]    (Stone Gray: Cracks in yellow on contact, collapses, respawns)
   ┌───────────────┐

1. Dissolve Platform

  - Contact: Triggers a 0.45\text{s} warning state where the platform cracks
    visually in yellow.
  - Collapse: The platform vanishes for 1.6\text{s}, clearing its solid
    collision box.
  - Respawn: Fades in as a desaturated dashed outline for 0.5\text{s} before
    solidifying.

2. Pogo Post

  - Interaction: Safe only from downward melee attacks. Landing a downward hit
    publishes PLAYER_POGOED, refreshes player double-jump and dash charges, and
    triggers a vertical rebound.
  - Danger: Side or standard landing contact damages and knocks the player back.

3. Dash Reset Gate

  - Interaction: A green diamond wireframe that instantly replenishes player
    dash and double-jump charges upon overlap, entering a 2.0\text{s} cooldown.

Resolve Geometry (Determination)

Healing and resolve are conveyed through Resolve Geometry, drawn with vibrant
violet and green spirals:

\text{SpiralPoint}(i) = \begin{pmatrix} \cos(\theta) \cdot R \cdot (0.35 + 0.65 \cdot p) \\ \sin(\theta) \cdot R \cdot (0.35 + 0.65 \cdot p) \cdot 0.72 \end{pmatrix}

  - Healing Charge: When the player holds Down + Jump with an active charge, a
    violet spiral rises around the player's body.
  - Full Charge Indicator: Three tiny, low-opacity violet square sparks orbit
    the player at all times when healing charges are full.
  - Perfect Pogo: Bouncing on a hazard or pogo post spawns a brief green/violet
    helix at the contact point.

Readability QA Checklist

Every gameplay layout and asset adjustment must pass the following checks:

  - Can I identify every active entity in 48 \times 48 greyscale?
  - Does yellow appear only during warning states, and disappear once the attack
    commits?
  - Is the player the only perfect square at rest in the simulation world?
  - Are all fast projectiles pre-positioned or telegraphed for at least
    0.35\text{s}?
  - Does the arena background remain desaturated so green, red, and yellow
    signals stay distinct?