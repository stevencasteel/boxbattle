import { Rectangle } from "@/core/Interfaces";

export type MinionType =
  | "TURRET"
  | "LANCER"
  | "FLYER"
  | "SHIELDER"
  | "PIT_LANCER"
  | "COMPASS_WASP"
  | "CLAMPJAW"
  | "HYMN_NAIL"
  | "BLISTER_OX"
  | "BELL_HAMMER"
  | "SHARD_CHOIR";

export interface SpawnAnchor {
  id: string;
  x: number;
  y: number;
  tags: string[];
}

export interface EncounterWave {
  id: string;
  phase: 1 | 2 | 3;
  earliestTime?: number;
  cooldownRange: [number, number];
  maxActiveMinions: number;
  entries: EncounterSpawnEntry[];
}

export interface EncounterSpawnEntry {
  type: MinionType;
  anchorTags?: string[];
  anchorIds?: string[];
  weight: number;
  maxAliveOfType?: number;
}

export interface LevelConfig {
  solids: Rectangle[];
  onewayPlatforms: Rectangle[];
  hazards: Rectangle[];
  spawnAnchors: SpawnAnchor[];
  encounterWaves: EncounterWave[];
  playerStart: { x: number; y: number };
  bossStart: { x: number; y: number };
}

export const defaultLevelConfig: LevelConfig = {
  solids: [
    { x: 0, y: 920, width: 320, height: 80 },
    { x: 680, y: 920, width: 320, height: 80 },
    { x: 320, y: 960, width: 360, height: 40 },
    { x: 0, y: 0, width: 1000, height: 40 },
    { x: 0, y: 0, width: 40, height: 1000 },
    { x: 960, y: 0, width: 40, height: 1000 },
    { x: 340, y: 640, width: 320, height: 32 },
  ],
  onewayPlatforms: [
    { x: 40, y: 440, width: 240, height: 16 },
    { x: 720, y: 440, width: 240, height: 16 },
  ],
  hazards: [{ x: 320, y: 920, width: 360, height: 80 }],
  spawnAnchors: [
    { id: "left-catwalk", x: 140, y: 392, tags: ["high", "left", "perch"] },
    { id: "right-catwalk", x: 860, y: 392, tags: ["high", "right", "perch"] },
    { id: "center-bridge", x: 500, y: 592, tags: ["mid", "center", "ground"] },
    { id: "left-ground", x: 184, y: 872, tags: ["low", "left", "ground"] },
    { id: "right-ground", x: 816, y: 872, tags: ["low", "right", "ground"] },
    { id: "upper-air-left", x: 288, y: 304, tags: ["air", "left", "ambush"] },
    { id: "upper-air-right", x: 712, y: 304, tags: ["air", "right", "ambush"] },
    { id: "center-air", x: 500, y: 264, tags: ["air", "center", "elite"] },
    { id: "pit-warning-left", x: 344, y: 864, tags: ["low", "hazard-edge"] },
    { id: "pit-warning-right", x: 656, y: 864, tags: ["low", "hazard-edge"] }
  ],
  encounterWaves: [
    {
      id: "p1-first-perch",
      phase: 1,
      earliestTime: 3,
      cooldownRange: [7, 10],
      maxActiveMinions: 2,
      entries: [
        { type: "TURRET", anchorIds: ["left-catwalk", "right-catwalk"], weight: 70 },
        { type: "LANCER", anchorIds: ["center-bridge"], weight: 30 }
      ]
    },
    {
      id: "p1-air-intro",
      phase: 1,
      earliestTime: 14,
      cooldownRange: [8, 12],
      maxActiveMinions: 2,
      entries: [
        { type: "FLYER", anchorTags: ["air"], weight: 60 },
        { type: "TURRET", anchorTags: ["perch"], weight: 40 }
      ]
    },
    {
      id: "p2-crossfire",
      phase: 2,
      cooldownRange: [5, 8],
      maxActiveMinions: 3,
      entries: [
        { type: "TURRET", anchorTags: ["perch"], weight: 40 },
        { type: "LANCER", anchorTags: ["ground"], weight: 40 },
        { type: "SHIELDER", anchorIds: ["center-bridge"], weight: 20 }
      ]
    },
    {
      id: "p2-air-skirmish",
      phase: 2,
      cooldownRange: [6, 9],
      maxActiveMinions: 3,
      entries: [
        { type: "FLYER", anchorTags: ["air"], weight: 50 },
        { type: "LANCER", anchorIds: ["center-bridge"], weight: 30 },
        { type: "SHIELDER", anchorTags: ["ground"], weight: 20 }
      ]
    },
    {
      id: "p3-surge",
      phase: 3,
      cooldownRange: [4, 7],
      maxActiveMinions: 5,
      entries: [
        { type: "FLYER", anchorTags: ["air"], weight: 30 },
        { type: "LANCER", anchorTags: ["ground"], weight: 30 },
        { type: "TURRET", anchorTags: ["perch"], weight: 20 },
        { type: "SHIELDER", anchorTags: ["ground", "center"], weight: 20 }
      ]
    }
  ],
  playerStart: { x: 120, y: 800 },
  bossStart: { x: 840, y: 800 },
};
