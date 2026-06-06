import { Rectangle } from "@/core/Interfaces";

export type MinionType = "TURRET" | "LANCER" | "FLYER" | "SHIELDER";

export interface SpawnerConfig {
  type: MinionType;
  x: number;
  y: number;
}

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
  spawners: SpawnerConfig[];
  spawnAnchors: SpawnAnchor[];
  encounterWaves: EncounterWave[];
  playerStart: { x: number; y: number };
  bossStart: { x: number; y: number };
}

export const defaultLevelConfig: LevelConfig = {
  solids: [
    { x: 0, y: 1150, width: 400, height: 100 },
    { x: 850, y: 1150, width: 400, height: 100 },
    { x: 400, y: 1200, width: 450, height: 50 },
    { x: 0, y: 0, width: 1250, height: 50 },
    { x: 0, y: 0, width: 50, height: 1250 },
    { x: 1200, y: 0, width: 50, height: 1250 },
    { x: 425, y: 800, width: 400, height: 40 },
  ],
  onewayPlatforms: [
    { x: 50, y: 550, width: 300, height: 20 },
    { x: 900, y: 550, width: 300, height: 20 },
  ],
  hazards: [{ x: 400, y: 1150, width: 450, height: 100 }],
  spawners: [],
  spawnAnchors: [
    { id: "left-catwalk", x: 175, y: 490, tags: ["high", "left", "perch"] },
    { id: "right-catwalk", x: 1075, y: 490, tags: ["high", "right", "perch"] },
    { id: "center-bridge", x: 625, y: 740, tags: ["mid", "center", "ground"] },
    { id: "left-ground", x: 230, y: 1090, tags: ["low", "left", "ground"] },
    { id: "right-ground", x: 1020, y: 1090, tags: ["low", "right", "ground"] },
    { id: "upper-air-left", x: 360, y: 380, tags: ["air", "left", "ambush"] },
    { id: "upper-air-right", x: 890, y: 380, tags: ["air", "right", "ambush"] },
    { id: "center-air", x: 625, y: 330, tags: ["air", "center", "elite"] },
    { id: "pit-warning-left", x: 430, y: 1080, tags: ["low", "hazard-edge"] },
    { id: "pit-warning-right", x: 820, y: 1080, tags: ["low", "hazard-edge"] }
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
  playerStart: { x: 150, y: 1000 },
  bossStart: { x: 1050, y: 1000 },
};

export class LevelLoader {
  public static parse(jsonString: string): LevelConfig {
    try {
      const parsed = JSON.parse(jsonString);
      if (
        parsed &&
        Array.isArray(parsed.solids) &&
        Array.isArray(parsed.onewayPlatforms) &&
        Array.isArray(parsed.hazards) &&
        parsed.playerStart &&
        parsed.bossStart
      ) {
        return parsed as LevelConfig;
      }
    } catch (e) {
      console.error("Failed to parse dynamic LevelConfig:", e);
    }
    return defaultLevelConfig;
  }

  public static stringify(config: LevelConfig): string {
    return JSON.stringify(config, null, 2);
  }
}
