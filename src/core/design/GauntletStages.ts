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
    subtitle: "STAGE 1 - TRADITIONAL COMBAT",
    midBossId: "prime-wound",
    midBossDisplayName: "PRIME WOUND",
    midBossMaxHp: 38,
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
        maxActiveMinions: 2,
        entries: [
          { type: "TURRET", anchorIds: ["left-catwalk", "right-catwalk"], weight: 70 },
          { type: "LANCER", anchorIds: ["center-bridge"], weight: 30 }
        ]
      },
      {
        id: "s1-w2",
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
        id: "s1-w3",
        phase: 3,
        cooldownRange: [4, 7],
        maxActiveMinions: 4,
        entries: [
          { type: "FLYER", anchorTags: ["air"], weight: 30 },
          { type: "LANCER", anchorTags: ["ground"], weight: 30 },
          { type: "TURRET", anchorTags: ["perch"], weight: 20 },
          { type: "SHIELDER", anchorTags: ["ground"], weight: 20 }
        ]
      }
    ],
    playerStart: { x: 120, y: 800 },
    bossStart: { x: 840, y: 800 },
  },
  {
    id: "stage-2",
    title: "THE NARROW REDOUBT",
    subtitle: "STAGE 2 - VERTICAL COMPRESSION",
    midBossId: "scarlet-lock",
    midBossDisplayName: "SCARLET LOCK",
    midBossMaxHp: 70,
    solids: [
      { x: 0, y: 0, width: 280, height: 1000 },
      { x: 720, y: 0, width: 280, height: 1000 },
      { x: 280, y: 920, width: 440, height: 80 },
      { x: 280, y: 0, width: 440, height: 280 },
      { x: 400, y: 820, width: 200, height: 32 },
      { x: 280, y: 600, width: 140, height: 32 },
      { x: 580, y: 440, width: 140, height: 32 },
    ],
    onewayPlatforms: [
      { x: 420, y: 720, width: 160, height: 16 },
      { x: 420, y: 520, width: 160, height: 16 },
      { x: 420, y: 320, width: 160, height: 16 },
    ],
    hazards: [
      { x: 280, y: 880, width: 120, height: 40 },
      { x: 600, y: 880, width: 120, height: 40 },
    ],
    spawners: [],
    spawnAnchors: [
      { id: "redoubt-floor", x: 500, y: 740, tags: ["low", "ground"] },
      { id: "redoubt-mid-left", x: 340, y: 550, tags: ["mid", "left", "perch"] },
      { id: "redoubt-mid-right", x: 660, y: 390, tags: ["mid", "right", "perch"] },
      { id: "redoubt-air-center", x: 500, y: 300, tags: ["air", "center"] },
    ],
    encounterWaves: [
      {
        id: "s2-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 2,
        entries: [
          { type: "CLAMPJAW", anchorIds: ["redoubt-floor"], weight: 70 },
          { type: "TURRET", anchorIds: ["redoubt-mid-left"], weight: 30 }
        ]
      },
      {
        id: "s2-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 2,
        entries: [
          { type: "FLYER", anchorTags: ["air"], weight: 50 },
          { type: "CLAMPJAW", anchorTags: ["ground"], weight: 50 }
        ]
      },
      {
        id: "s2-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 3,
        entries: [
          { type: "FLYER", anchorTags: ["air"], weight: 40 },
          { type: "CLAMPJAW", anchorTags: ["ground"], weight: 30 },
          { type: "TURRET", anchorTags: ["perch"], weight: 30 }
        ]
      }
    ],
    playerStart: { x: 360, y: 740 },
    visualShapes: [
      { type: "polygon", points: [{x:280,y:200},{x:320,y:240},{x:290,y:300},{x:280,y:280}], colorRole: "arena-infection", infectionSeams: true },
      { type: "polygon", points: [{x:720,y:600},{x:680,y:640},{x:710,y:700},{x:720,y:680}], colorRole: "arena-infection", infectionSeams: true }
    ],
    bossStart: { x: 640, y: 740 },
  },
  {
    id: "stage-3",
    title: "THE ORBITAL GALLOWS",
    subtitle: "STAGE 3 - FLOORLESS HAZARDS",
    midBossId: "carminal-orbit",
    midBossDisplayName: "CARMINAL ORBIT",
    midBossMaxHp: 85,
    solids: [
      { x: 0, y: 920, width: 40, height: 80 },
      { x: 960, y: 920, width: 40, height: 80 },
      { x: 0, y: 0, width: 1000, height: 40 },
      { x: 0, y: 0, width: 40, height: 1000 },
      { x: 960, y: 0, width: 40, height: 1000 },
      { x: 400, y: 500, width: 200, height: 32 },
    ],
    onewayPlatforms: [
      { x: 160, y: 640, width: 140, height: 16 },
      { x: 700, y: 640, width: 140, height: 16 },
      { x: 160, y: 340, width: 140, height: 16 },
      { x: 700, y: 340, width: 140, height: 16 },
    ],
    hazards: [
      { x: 40, y: 920, width: 920, height: 80 },
    ],
    spawners: [],
    spawnAnchors: [
      { id: "orbit-center-block", x: 500, y: 440, tags: ["mid", "center", "ground"] },
      { id: "orbit-left-cat", x: 230, y: 580, tags: ["mid", "left", "perch"] },
      { id: "orbit-right-cat", x: 770, y: 580, tags: ["mid", "right", "perch"] },
      { id: "orbit-air-high", x: 500, y: 220, tags: ["air", "center"] },
    ],
    encounterWaves: [
      {
        id: "s3-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 2,
        entries: [
          { type: "COMPASS_WASP", anchorTags: ["air"], weight: 75 },
          { type: "TURRET", anchorIds: ["orbit-left-cat"], weight: 25 }
        ]
      },
      {
        id: "s3-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 3,
        entries: [
          { type: "COMPASS_WASP", anchorTags: ["air"], weight: 45 },
          { type: "TURRET", anchorTags: ["perch"], weight: 35 },
          { type: "FLYER", anchorTags: ["air"], weight: 20 }
        ]
      },
      {
        id: "s3-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 4,
        entries: [
          { type: "COMPASS_WASP", anchorTags: ["air"], weight: 50 },
          { type: "FLYER", anchorTags: ["air"], weight: 30 },
          { type: "TURRET", anchorTags: ["perch"], weight: 20 }
        ]
      }
    ],
    playerStart: { x: 500, y: 400 },
    bossStart: { x: 500, y: 260 },
  },
  {
    id: "stage-4",
    title: "THE DISSOLVING CHOIR",
    subtitle: "STAGE 4 - PATH OF PAIN MATRIX",
    midBossId: "vermilion-needle",
    midBossDisplayName: "VERMILION NEEDLE",
    midBossMaxHp: 90,
    solids: [
      { x: 0, y: 920, width: 220, height: 80 },
      { x: 780, y: 920, width: 220, height: 80 },
      { x: 220, y: 960, width: 560, height: 40 },
      { x: 0, y: 0, width: 1000, height: 40 },
      { x: 0, y: 0, width: 40, height: 1000 },
      { x: 960, y: 0, width: 40, height: 1000 },
      { x: 40, y: 360, width: 160, height: 32 },
      { x: 800, y: 360, width: 160, height: 32 },
    ],
    onewayPlatforms: [],
    hazards: [{ x: 220, y: 920, width: 560, height: 80 }],
    spawners: [],
    spawnAnchors: [
      { id: "choir-left-solid", x: 120, y: 300, tags: ["high", "left", "perch"] },
      { id: "choir-right-solid", x: 880, y: 300, tags: ["high", "right", "perch"] },
      { id: "choir-mid-ledge-l", x: 340, y: 580, tags: ["mid", "left"] },
      { id: "choir-mid-ledge-r", x: 660, y: 580, tags: ["mid", "right"] },
      { id: "choir-air-mid", x: 500, y: 280, tags: ["air", "center"] },
    ],
    encounterWaves: [
      {
        id: "s4-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 2,
        entries: [
          { type: "HYMN_NAIL", anchorIds: ["choir-mid-ledge-l"], weight: 70 },
          { type: "FLYER", anchorTags: ["air"], weight: 30 }
        ]
      },
      {
        id: "s4-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 3,
        entries: [
          { type: "HYMN_NAIL", anchorIds: ["choir-mid-ledge-l", "choir-mid-ledge-r"], weight: 50 },
          { type: "TURRET", anchorTags: ["high"], weight: 50 }
        ]
      },
      {
        id: "s4-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 4,
        entries: [
          { type: "HYMN_NAIL", anchorTags: ["mid"], weight: 45 },
          { type: "FLYER", anchorTags: ["air"], weight: 35 },
          { type: "TURRET", anchorTags: ["high"], weight: 20 }
        ]
      }
    ],
    playerStart: { x: 100, y: 800 },
    bossStart: { x: 900, y: 800 },
    dissolvePlatforms: [
      { x: 280, y: 640, width: 120, height: 16 },
      { x: 600, y: 640, width: 120, height: 16 },
    ],
    pogoPosts: [
      { x: 470, y: 720, width: 60, height: 32 },
    ],
    dashResetGates: [
      { x: 480, y: 440, width: 40, height: 40 },
    ]
  },
  {
    id: "stage-5",
    title: "THE MARROW ROT",
    subtitle: "STAGE 5 - ORGANIC CYSTS",
    midBossId: "marrow-king",
    midBossDisplayName: "MARROW KING",
    midBossMaxHp: 95,
    solids: [
      { x: 0, y: 920, width: 260, height: 80 },
      { x: 740, y: 920, width: 260, height: 80 },
      { x: 260, y: 960, width: 480, height: 40 },
      { x: 0, y: 0, width: 1000, height: 40 },
      { x: 0, y: 0, width: 40, height: 1000 },
      { x: 960, y: 0, width: 40, height: 1000 },
      { x: 280, y: 560, width: 440, height: 32 },
    ],
    onewayPlatforms: [
      { x: 40, y: 360, width: 220, height: 16 },
      { x: 740, y: 360, width: 220, height: 16 },
    ],
    hazards: [{ x: 260, y: 920, width: 480, height: 80 }],
    spawners: [],
    spawnAnchors: [
      { id: "marrow-high-left", x: 150, y: 300, tags: ["high", "left", "perch"] },
      { id: "marrow-high-right", x: 850, y: 300, tags: ["high", "right", "perch"] },
      { id: "marrow-center-growth", x: 500, y: 500, tags: ["mid", "center", "ground"] },
      { id: "marrow-low-l", x: 150, y: 860, tags: ["low", "left", "ground"] },
      { id: "marrow-low-r", x: 850, y: 860, tags: ["low", "right", "ground"] },
      { id: "marrow-air", x: 500, y: 220, tags: ["air", "center"] },
    ],
    encounterWaves: [
      {
        id: "s5-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 2,
        entries: [
          { type: "BLISTER_OX", anchorIds: ["marrow-center-growth"], weight: 65 },
          { type: "FLYER", anchorTags: ["air"], weight: 35 }
        ]
      },
      {
        id: "s5-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 3,
        entries: [
          { type: "BLISTER_OX", anchorTags: ["ground"], weight: 45 },
          { type: "TURRET", anchorTags: ["high"], weight: 35 },
          { type: "FLYER", anchorTags: ["air"], weight: 20 }
        ]
      },
      {
        id: "s5-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 4,
        entries: [
          { type: "BLISTER_OX", anchorTags: ["ground"], weight: 40 },
          { type: "FLYER", anchorTags: ["air"], weight: 30 },
          { type: "TURRET", anchorTags: ["high"], weight: 30 }
        ]
      }
    ],
    playerStart: { x: 120, y: 800 },
    visualShapes: [
      { type: "circle", center: {x: 150, y: 460}, radius: 100, colorRole: "arena-infection", infectionSeams: true },
      { type: "circle", center: {x: 850, y: 460}, radius: 100, colorRole: "arena-infection", infectionSeams: true },
      { type: "circle", center: {x: 500, y: 800}, radius: 120, colorRole: "arena-stone", infectionSeams: false }
    ],
    bossStart: { x: 850, y: 800 },
  },
  {
    id: "stage-6",
    title: "THE RUST CATHEDRAL",
    subtitle: "STAGE 6 - SLAB COMPRESSORS",
    midBossId: "rust-cathedral",
    midBossDisplayName: "RUST CATHEDRAL",
    midBossMaxHp: 100,
    solids: [
      { x: 40, y: 900, width: 920, height: 100 },
      { x: 0, y: 0, width: 1000, height: 40 },
      { x: 0, y: 0, width: 40, height: 1000 },
      { x: 960, y: 0, width: 40, height: 1000 },
      { x: 100, y: 400, width: 180, height: 200 },
      { x: 720, y: 400, width: 180, height: 200 },
      { x: 380, y: 540, width: 240, height: 40 },
    ],
    onewayPlatforms: [
      { x: 280, y: 380, width: 120, height: 16 },
      { x: 600, y: 380, width: 120, height: 16 },
    ],
    hazards: [],
    spawners: [],
    spawnAnchors: [
      { id: "cath-high-left", x: 190, y: 340, tags: ["high", "left", "perch"] },
      { id: "cath-high-right", x: 810, y: 340, tags: ["high", "right", "perch"] },
      { id: "cath-center-slab", x: 500, y: 480, tags: ["mid", "center", "ground"] },
      { id: "cath-low-l", x: 330, y: 840, tags: ["low", "left", "ground"] },
      { id: "cath-low-r", x: 670, y: 840, tags: ["low", "right", "ground"] },
    ],
    encounterWaves: [
      {
        id: "s6-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 2,
        entries: [
          { type: "BELL_HAMMER", anchorIds: ["cath-center-slab"], weight: 65 },
          { type: "TURRET", anchorTags: ["high"], weight: 35 }
        ]
      },
      {
        id: "s6-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 3,
        entries: [
          { type: "BELL_HAMMER", anchorTags: ["low"], weight: 50 },
          { type: "FLYER", anchorIds: ["cath-high-left", "cath-high-right"], weight: 30 },
          { type: "TURRET", anchorTags: ["high"], weight: 20 }
        ]
      },
      {
        id: "s6-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 4,
        entries: [
          { type: "BELL_HAMMER", anchorTags: ["ground"], weight: 45 },
          { type: "TURRET", anchorTags: ["high"], weight: 35 },
          { type: "FLYER", anchorTags: ["high"], weight: 20 }
        ]
      }
    ],
    playerStart: { x: 300, y: 800 },
    bossStart: { x: 700, y: 800 },
  },
  {
    id: "stage-7",
    title: "THE PANTHEON BOX",
    subtitle: "STAGE 7 - THE FINAL CRUCIBLE",
    midBossId: "false-square",
    midBossDisplayName: "THE FALSE SQUARE",
    midBossMaxHp: 120,
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
      { id: "pantheon-cat-l", x: 140, y: 390, tags: ["high", "left", "perch"] },
      { id: "pantheon-cat-r", x: 860, y: 390, tags: ["high", "right", "perch"] },
      { id: "pantheon-center-bridge", x: 500, y: 590, tags: ["mid", "center", "ground"] },
      { id: "pantheon-low-l", x: 180, y: 860, tags: ["low", "left", "ground"] },
      { id: "pantheon-low-r", x: 820, y: 860, tags: ["low", "right", "ground"] },
    ],
    encounterWaves: [
      {
        id: "s7-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 3,
        entries: [
          { type: "COMPASS_WASP", anchorTags: ["high"], weight: 40 },
          { type: "CLAMPJAW", anchorTags: ["ground"], weight: 40 },
          { type: "FLYER", anchorIds: ["pantheon-center-bridge"], weight: 20 }
        ]
      },
      {
        id: "s7-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 4,
        entries: [
          { type: "HYMN_NAIL", anchorTags: ["high"], weight: 35 },
          { type: "BLISTER_OX", anchorTags: ["ground"], weight: 35 },
          { type: "BELL_HAMMER", anchorTags: ["ground"], weight: 30 }
        ]
      },
      {
        id: "s7-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 5,
        entries: [
          { type: "COMPASS_WASP", anchorTags: ["high"], weight: 30 },
          { type: "CLAMPJAW", anchorTags: ["ground"], weight: 30 },
          { type: "BLISTER_OX", anchorTags: ["ground"], weight: 20 },
          { type: "BELL_HAMMER", anchorTags: ["perch"], weight: 20 }
        ]
      }
    ],
    playerStart: { x: 120, y: 800 },
    bossStart: { x: 840, y: 800 },
  }
];
