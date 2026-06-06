# Box Battle Gauntlet Overhaul Implementation Plan

This implementation plan describes the technical steps to transform the current Box Battle vertical slice into a data-driven combat gauntlet based on the specifications in `GAUNTLET_OVERHAUL_DESIGN.md`.

## User Review Required

We are changing core gameplay rules and visuals. Below are the key design points and potential impacts for user review:

> [!IMPORTANT]
> **Core Gameplay and Physics Scaling Changes:**
> - **Player Dimensions:** The player hitbox shrinks from `32x64` to a perfect `40x40` square. To preserve the physics feel and jump capabilities, wall-sliding and double-jumping contact probes will be dynamically adjusted.
> - **Continuous Run / 7-Stage Gauntlet:** The single-level structure is replaced by a linear sequence of 7 stages, interspersed with traversal trials ("Path of Pain" interludes). Checkpointing will save progress between stages, but dying in a traversal section or during a wave will restart that stage.

> [!WARNING]
> **Complete visual overhaul of shape and color grammar:**
> - Saturated color tones will be strictly reserved for semantic roles: Green for player agency, Red/Bruised Red/Orange-Red for Bosses/Hazards, Yellow for warnings/telegraphs, Violet for determination/healing, and Blue/Cyan for minion logic.
> - Background and static map structures will be rendered in desaturated, cool greys/blues to keep gameplay signals clean and legible.

## Open Questions

1. **Checkpointing Policy:** Should we default to "stage" checkpointing (saving slot progress when a stage/trial is cleared, reloading the player at full HP at the start of that stage), or do you want to test the full "hardcore" Pantheon experience (no checkpoints, restart from Stage 1)? We propose **Stage Checkpointing** as default, with an optional "Steel Soul" config.
2. **Procedural Audio Synthesis:** Do you want the Web Audio API synthesizer (`SoundSynth.ts`) to be fully expanded to pitch ticks matching shape sides (e.g. 6-ticks for hexagons), or is it okay to start with a simplified tonal distinction (high/sharp saw/triangle waves for needle/flying threats, low growls/decay for heavy organic/bosses)?

---

## Proposed Changes

We will group the changes into incremental phases.

### Phase 1: Core Design System & Color/Shape Renderers

We will define the new chromatic rules and procedural rendering system.

#### [NEW] [ColorRoles.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/design/ColorRoles.ts)
- Define standard HSL values for color roles: `player-agency`, `boss-lethal`, `telegraph`, `determination`, `minion-logic`, `minion-organic`, `hazard`, `arena-stone`, `arena-infection`.
- Export a helper to convert a role name to an HSL string or return variants (light/dark/opacity).

#### [NEW] [ShapeRenderer.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/visuals/ShapeRenderer.ts)
- Implement procedural path formulas:
  - `spikyRadius(theta, base, points, amp, sharpness)`
  - `organicRadius(theta, base, seed, contamination)`
  - `corruptedBoxPoint(x, y, corruption, time, seed)`
- Provide a drawing router `drawVisualProfile(ctx, x, y, width, height, profile, time)` that draws outline and fill based on the `VisualProfile` (hex, corrupted-box, perfect-square, needle, saw, orb, etc.).

#### [MODIFY] [Player.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/entities/Player.ts)
- Change player size in constructor to `{ width: 40, height: 40 }`.
- Set `squashPivot = "center"`.
- Retune jump force or wall probes if needed for the square shape.

#### [MODIFY] [PlayerVisuals.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/entities/handlers/PlayerVisuals.ts)
- Replace `Software3DRenderer.drawGeometry` call with a flat 2D perfect square drawing using the green HSL role. Add squash/stretch deformation based on velocity.

---

### Phase 2: Data-Driven Gauntlet & Stage Morphing

We will transition the codebase from running a single level configuration to a 7-stage gauntlet controller.

#### [NEW] [GauntletDirector.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/GauntletDirector.ts)
- Track current stage index, trial status, cleared waves count, and active stage configurations.
- Transition from Stage 1 through Stage 7.
- Handle checkpoint save/load interfaces.
- **Stage-Select Debug Warps:** Register global keyboard listener for digit keys '1' through '9'. Pressing any of these keys at any time (including from the Title screen) will instantly invoke `GauntletDirector.loadStage(index)`, reset all active gameplay loops, transition the screen state to `PLAYING`, and spawn the player at the start of that respective stage or trial.

#### [NEW] [GauntletStages.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/design/GauntletStages.ts)
- Define all 7 `StageConfig` structures detailing:
  - solids, hazards, and oneway platforms.
  - waves, spawn anchors, mid-boss config, and visual themes.
  - event dialogues.
  - Traversal trials (Path of Pain layouts) between stages.

#### [MODIFY] [EncounterDirector.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/EncounterDirector.ts)
- Evolve this class to read wave metadata from the active stage config.
- Implement threat and footprint budget checks:
  - `currentBudget = clamp(baseBudget - bossPresencePenalty, 1, stage.maxBudget)`
- Implement safety anchor scoring:
  - `anchorSafety(anchor, player, boss)` chooses the highest safety anchor among options instead of picking at random.

#### [MODIFY] [StaticMapRenderer.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/StaticMapRenderer.ts)
- Invalidate cache when stage morphs lock in, calling `resetCache()`.
- Add generic rendering for solids (with rounded corners) and spike count calculations based on dynamic bounds instead of hardcoded default map coordinates.

---

### Phase 3: Dialogue Event Scripting

We will implement an event-driven scripting system for dialogues.

#### [NEW] [DialogueScript.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/DialogueScript.ts)
- Define dialogue configuration structures.
- Map dialogue triggers: `stage-start`, `wave-cleared`, `boss-enter`, `boss-phase`, `player-low-hp`, `boss-defeated`, `gauntlet-complete`.

#### [MODIFY] [BattleDirector.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/BattleDirector.ts)
- Subscribe to game loop lifecycle events to trigger lines from the dialogue script.
- Support boss specific labels and portrait identifiers in trigger payloads.

#### [MODIFY] [DialogueConsole.tsx](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/components/DialogueConsole.tsx)
- Pull custom speaker names and portrait identities.
- Draw generated portrait canvas patterns for bosses (Prime Wound diagonal fault, Scarlet Lock vertical bars, etc.).

---

### Phase 4: Combat Roster & Projectile Overhaul

We will implement new shapes for projectiles and customize minion spawning.

#### [MODIFY] [Projectile.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/entities/Projectile.ts) & [ProjectileStrategy.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/entities/ProjectileStrategy.ts)
- Define new shapes: `needle`, `shard`, `saw`, `thorn`, `ring-gap`, `comet`.
- Support segmented spine and swirl trails using mathematical interpolations.
- Remove standard circle bodies for boss/enemy projectiles and replace them with points/spikes.

#### [NEW] Custom Minions
- **Pit Lancer:** patrols platforms, strong knockback thrusts when near pits.
- **Compass Wasp:** orbits point, then dives along tangent lines.
- **Clampjaw:** heavy, slow rectangle that sweeps wall-to-wall.
- **Hymn Nail:** hovers as pogo platform, becomes hostile if overused.
- **Blister Ox:** heavy blob, jumps and triggers shockwaves on impact.
- **Bell Hammer:** slams at marked tiles.
- **Shard Choir:** clusters of small triangular projectiles.
- **Mirror Shielder:** chamfered shield plate, vulnerable from rear.

#### [MODIFY] [MinionVisuals.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/visuals/MinionVisuals.ts)
- Draw procedurally structured spawn cages (e.g. tuning forks for Hymn Nail, unfolding hexagons for Turret Seed, membrane bubble for Blister Ox) instead of generic cylindrical wireframes.

---

### Phase 5: Config-Driven Bosses & False Square Finale

#### [MODIFY] [Boss.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/entities/Boss.ts)
- Drive boss behaviors through `BossConfig` configurations (maxHp, size, phases, attack list, portrait pattern).
- Implement boss-specific mechanics (Scarlet Lock gate drops, Carminal Orbit perihelion dives, Rust Cathedral Nave drops, False Square glitching).

---

### Phase 6: Path of Pain Traversal Mechanics

#### [NEW] [TraversalHazards.ts](file:///Users/stevencasteel/Desktop/BOX%20BATTLE/src/core/systems/TraversalHazards.ts)
- Implement `DissolvePlatform` (cracks, collapses, respawns after delay).
- Implement `PogoPost` (bouncing resets jump/dash, contact from sides damages player).
- Implement `DashResetGate` (green diamond outlines that replenish dash).

---

## Verification Plan

### Automated Tests
- Build verification: Run `npm run build` or `tsc --noEmit` to ensure type checks pass.
- Run dev mode: Propose running `npm run dev` to playtest the vertical slice locally.

### Manual Verification
1. **Visual Reading Test:** Verify desaturated background vs. highlighted entity colors. Confirm boss portraits draw custom math signatures.
2. **Silhouette Identification:** Check spawn cages to ensure their shapes match the incoming minion silhouette (hex, triangle, etc.).
3. **Traversal Mechanics:** Test pogo hits on PogoPosts and check if dash/double-jump charges are successfully restored. Verify dissolve platform timing (0.45s stable, 0.35s collapse, 1.6s respawn).
4. **Dialogue Scripting:** Verify dialogues trigger correctly on wave completions, phase shifts, and defeats.
5. **Stage Select Debug keys:** Press keys '1' through '7' on the Title screen, settings menus, and mid-game. Verify that the simulation immediately restarts at the beginning of the selected stage.
