import { LevelConfig } from "../levelData";
import { Rectangle } from "../Interfaces";

export interface VisualShape {
    type: "organic" | "polygon" | "circle";
    points?: {x: number, y: number}[];
    center?: {x: number, y: number};
    radius?: number;
    colorRole: "arena-stone" | "arena-infection";
    infectionSeams?: boolean;
}

export interface StageConfig extends LevelConfig {
  visualShapes?: VisualShape[];
  id: string;
  title: string;
  subtitle: string;
  midBossId: string;
  midBossDisplayName: string;
  midBossMaxHp: number;
  dissolvePlatforms?: Rectangle[];
  pogoPosts?: Rectangle[];
  dashResetGates?: Rectangle[];
}

export const GAUNTLET_STAGES: StageConfig[] = [
  {
    id: "stage-1",
    title: "THE OLD PIT",
    subtitle: "THE UNIFIED CRUCIBLE",
    midBossId: "prime-wound",
    midBossDisplayName: "PRIME WOUND",
    midBossMaxHp: 80,
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
    spawners: [],
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
        id: "s1-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [6, 9],
        maxActiveMinions: 3,
        entries: [
          { type: "TURRET", anchorIds: ["left-catwalk", "right-catwalk"], weight: 40 },
          { type: "LANCER", anchorIds: ["center-bridge"], weight: 30 },
          { type: "FLYER", anchorTags: ["air"], weight: 30 }
        ]
      },
      {
        id: "s1-w2",
        phase: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 4,
        entries: [
          { type: "SHIELDER", anchorTags: ["ground"], weight: 25 },
          { type: "PIT_LANCER", anchorTags: ["ground"], weight: 25 },
          { type: "COMPASS_WASP", anchorTags: ["air"], weight: 25 },
          { type: "CLAMPJAW", anchorTags: ["ground"], weight: 25 }
        ]
      },
      {
        id: "s1-w3",
        phase: 3,
        cooldownRange: [4, 7],
        maxActiveMinions: 5,
        entries: [
          { type: "HYMN_NAIL", anchorTags: ["perch"], weight: 30 },
          { type: "BLISTER_OX", anchorTags: ["ground"], weight: 30 },
          { type: "BELL_HAMMER", anchorTags: ["ground"], weight: 40 }
        ]
      }
    ],
    playerStart: { x: 120, y: 800 },
    bossStart: { x: 840, y: 800 },
    dissolvePlatforms: [
      { x: 380, y: 440, width: 240, height: 16 }
    ],
    pogoPosts: [
      { x: 470, y: 720, width: 60, height: 32 }
    ],
    dashResetGates: [
      { x: 480, y: 280, width: 40, height: 40 }
    ]
  }
];
