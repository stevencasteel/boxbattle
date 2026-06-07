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
    midBossMaxHp: 48,
    solids: [
      { x: 0, y: 0, width: 220, height: 1000 },
      { x: 780, y: 0, width: 220, height: 1000 },
      { x: 220, y: 920, width: 560, height: 80 },
      { x: 220, y: 0, width: 560, height: 40 },
      { x: 220, y: 680, width: 140, height: 32 },
      { x: 640, y: 440, width: 140, height: 32 },
      { x: 220, y: 220, width: 140, height: 32 },
    ],
    onewayPlatforms: [
      { x: 360, y: 560, width: 280, height: 16 },
      { x: 360, y: 320, width: 280, height: 16 },
    ],
    hazards: [
      { x: 220, y: 880, width: 100, height: 40 },
      { x: 680, y: 880, width: 100, height: 40 },
    ],
    spawners: [],
    spawnAnchors: [
      { id: "redoubt-floor", x: 500, y: 840, tags: ["low", "ground"] },
      { id: "redoubt-mid-left", x: 280, y: 600, tags: ["mid", "left", "perch"] },
      { id: "redoubt-mid-right", x: 720, y: 360, tags: ["mid", "right", "perch"] },
      { id: "redoubt-air-center", x: 500, y: 400, tags: ["air", "center"] },
    ],
    encounterWaves: [
      {
        id: "s2-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 2,
        entries: [
          { type: "TURRET", anchorIds: ["redoubt-mid-left", "redoubt-mid-right"], weight: 60 },
          { type: "LANCER", anchorIds: ["redoubt-floor"], weight: 40 }
        ]
      },
      {
        id: "s2-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 2,
        entries: [
          { type: "FLYER", anchorTags: ["air"], weight: 50 },
          { type: "SHIELDER", anchorTags: ["ground"], weight: 50 }
        ]
      },
      {
        id: "s2-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 3,
        entries: [
          { type: "FLYER", anchorTags: ["air"], weight: 40 },
          { type: "LANCER", anchorTags: ["ground"], weight: 30 },
          { type: "TURRET", anchorTags: ["perch"], weight: 30 }
        ]
      }
    ],
    playerStart: { x: 300, y: 800 },
    visualShapes: [
        { type: "polygon", points: [{x:220,y:200},{x:260,y:240},{x:230,y:300},{x:220,y:280}], colorRole: "arena-infection", infectionSeams: true },
        { type: "polygon", points: [{x:780,y:600},{x:740,y:640},{x:770,y:700},{x:780,y:680}], colorRole: "arena-infection", infectionSeams: true }
    ],

    bossStart: { x: 700, y: 800 },
  },
  {
    id: "stage-3",
    title: "THE ORBITAL GALLOWS",
    subtitle: "STAGE 3 - ARC READING",
    midBossId: "carminal-orbit",
    midBossDisplayName: "CARMINAL ORBIT",
    midBossMaxHp: 58,
    solids: [
      { x: 0, y: 920, width: 1000, height: 80 },
      { x: 0, y: 0, width: 1000, height: 40 },
      { x: 0, y: 0, width: 40, height: 1000 },
      { x: 960, y: 0, width: 40, height: 1000 },
      { x: 380, y: 480, width: 240, height: 32 },
    ],
    onewayPlatforms: [
      { x: 140, y: 640, width: 180, height: 16 },
      { x: 680, y: 640, width: 180, height: 16 },
      { x: 140, y: 320, width: 180, height: 16 },
      { x: 680, y: 320, width: 180, height: 16 },
    ],
    hazards: [
      { x: 40, y: 880, width: 200, height: 40 },
      { x: 760, y: 880, width: 200, height: 40 },
    ],
    spawners: [],
    spawnAnchors: [
      { id: "orbit-center-block", x: 500, y: 420, tags: ["mid", "center", "ground"] },
      { id: "orbit-low-mid", x: 500, y: 840, tags: ["low", "center"] },
      { id: "orbit-left-cat", x: 230, y: 580, tags: ["mid", "left", "perch"] },
      { id: "orbit-right-cat", x: 770, y: 580, tags: ["mid", "right", "perch"] },
      { id: "orbit-air-high", x: 500, y: 200, tags: ["air", "center"] },
    ],
    encounterWaves: [
      {
        id: "s3-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 2,
        entries: [
          { type: "FLYER", anchorTags: ["air"], weight: 70 },
          { type: "LANCER", anchorIds: ["orbit-center-block"], weight: 30 }
        ]
      },
      {
        id: "s3-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 3,
        entries: [
          { type: "TURRET", anchorTags: ["perch"], weight: 40 },
          { type: "SHIELDER", anchorIds: ["orbit-low-mid"], weight: 40 },
          { type: "FLYER", anchorTags: ["air"], weight: 20 }
        ]
      },
      {
        id: "s3-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 4,
        entries: [
          { type: "FLYER", anchorTags: ["air"], weight: 45 },
          { type: "LANCER", anchorTags: ["ground"], weight: 30 },
          { type: "SHIELDER", anchorTags: ["ground"], weight: 25 }
        ]
      }
    ],
    playerStart: { x: 500, y: 800 },
    bossStart: { x: 500, y: 400 },
  },
  {
    id: "stage-4",
    title: "THE DISSOLVING CHOIR",
    subtitle: "STAGE 4 - PLATFORM DECAY",
    midBossId: "vermilion-needle",
    midBossDisplayName: "VERMILION NEEDLE",
    midBossMaxHp: 64,
    solids: [
      { x: 0, y: 920, width: 260, height: 80 },
      { x: 740, y: 920, width: 260, height: 80 },
      { x: 260, y: 960, width: 480, height: 40 },
      { x: 0, y: 0, width: 1000, height: 40 },
      { x: 0, y: 0, width: 40, height: 1000 },
      { x: 960, y: 0, width: 40, height: 1000 },
      { x: 40, y: 400, width: 160, height: 32 },
      { x: 800, y: 400, width: 160, height: 32 },
    ],
    onewayPlatforms: [],
    hazards: [{ x: 260, y: 920, width: 480, height: 80 }],
    spawners: [],
    spawnAnchors: [
      { id: "choir-left-solid", x: 130, y: 340, tags: ["high", "left", "perch"] },
      { id: "choir-right-solid", x: 870, y: 340, tags: ["high", "right", "perch"] },
      { id: "choir-mid-ledge-l", x: 350, y: 590, tags: ["mid", "left"] },
      { id: "choir-mid-ledge-r", x: 650, y: 590, tags: ["mid", "right"] },
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
          { type: "TURRET", anchorIds: ["choir-left-solid", "choir-right-solid"], weight: 70 },
          { type: "FLYER", anchorTags: ["air"], weight: 30 }
        ]
      },
      {
        id: "s4-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 3,
        entries: [
          { type: "LANCER", anchorIds: ["choir-mid-ledge-l", "choir-mid-ledge-r"], weight: 50 },
          { type: "SHIELDER", anchorTags: ["high"], weight: 50 }
        ]
      },
      {
        id: "s4-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 4,
        entries: [
          { type: "FLYER", anchorTags: ["air"], weight: 40 },
          { type: "TURRET", anchorTags: ["high"], weight: 30 },
          { type: "LANCER", anchorTags: ["mid"], weight: 30 }
        ]
      }
    ],
    playerStart: { x: 120, y: 800 },
    bossStart: { x: 880, y: 800 },
    dissolvePlatforms: [
      { x: 260, y: 640, width: 140, height: 16 },
      { x: 600, y: 640, width: 140, height: 16 },
    ],
    pogoPosts: [
      { x: 470, y: 720, width: 60, height: 32 },
    ],
    dashResetGates: [
      { x: 480, y: 460, width: 40, height: 40 },
    ]
  },
  {
    id: "stage-5",
    title: "THE MARROW ROT",
    subtitle: "STAGE 5 - GEOMETRIC CONTAMINATION",
    midBossId: "marrow-king",
    midBossDisplayName: "MARROW KING",
    midBossMaxHp: 74,
    solids: [
      { x: 0, y: 920, width: 340, height: 80 },
      { x: 660, y: 920, width: 340, height: 80 },
      { x: 340, y: 960, width: 320, height: 40 },
      { x: 0, y: 0, width: 1000, height: 40 },
      { x: 0, y: 0, width: 40, height: 1000 },
      { x: 960, y: 0, width: 40, height: 1000 },
      { x: 260, y: 580, width: 480, height: 32 },
    ],
    onewayPlatforms: [
      { x: 40, y: 380, width: 220, height: 16 },
      { x: 740, y: 380, width: 220, height: 16 },
    ],
    hazards: [{ x: 340, y: 920, width: 320, height: 80 }],
    spawners: [],
    spawnAnchors: [
      { id: "marrow-high-left", x: 150, y: 320, tags: ["high", "left", "perch"] },
      { id: "marrow-high-right", x: 850, y: 320, tags: ["high", "right", "perch"] },
      { id: "marrow-center-growth", x: 500, y: 520, tags: ["mid", "center", "ground"] },
      { id: "marrow-low-l", x: 180, y: 860, tags: ["low", "left", "ground"] },
      { id: "marrow-low-r", x: 820, y: 860, tags: ["low", "right", "ground"] },
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
          { type: "LANCER", anchorIds: ["marrow-center-growth"], weight: 60 },
          { type: "FLYER", anchorTags: ["air"], weight: 40 }
        ]
      },
      {
        id: "s5-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 3,
        entries: [
          { type: "SHIELDER", anchorTags: ["low"], weight: 40 },
          { type: "TURRET", anchorTags: ["high"], weight: 40 },
          { type: "FLYER", anchorTags: ["air"], weight: 20 }
        ]
      },
      {
        id: "s5-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 4,
        entries: [
          { type: "FLYER", anchorTags: ["air"], weight: 30 },
          { type: "LANCER", anchorTags: ["ground"], weight: 30 },
          { type: "SHIELDER", anchorTags: ["ground"], weight: 20 },
          { type: "TURRET", anchorTags: ["high"], weight: 20 }
        ]
      }
    ],
    playerStart: { x: 120, y: 800 },
    visualShapes: [
        { type: "circle", center: {x: 150, y: 500}, radius: 80, colorRole: "arena-infection", infectionSeams: true },
        { type: "circle", center: {x: 850, y: 500}, radius: 80, colorRole: "arena-infection", infectionSeams: true },
        { type: "circle", center: {x: 500, y: 800}, radius: 120, colorRole: "arena-stone", infectionSeams: false }
    ],

    bossStart: { x: 880, y: 800 },
  },
  {
    id: "stage-6",
    title: "THE RUST CATHEDRAL",
    subtitle: "STAGE 6 - SLAB COMPRESSION",
    midBossId: "rust-cathedral",
    midBossDisplayName: "RUST CATHEDRAL",
    midBossMaxHp: 88,
    solids: [
      { x: 0, y: 900, width: 1000, height: 100 },
      { x: 0, y: 0, width: 1000, height: 40 },
      { x: 0, y: 0, width: 40, height: 1000 },
      { x: 960, y: 0, width: 40, height: 1000 },
      { x: 120, y: 440, width: 180, height: 120 },
      { x: 700, y: 440, width: 180, height: 120 },
      { x: 400, y: 550, width: 200, height: 40 },
    ],
    onewayPlatforms: [
      { x: 300, y: 400, width: 100, height: 16 },
      { x: 600, y: 400, width: 100, height: 16 },
    ],
    hazards: [],
    spawners: [],
    spawnAnchors: [
      { id: "cath-high-left", x: 210, y: 380, tags: ["high", "left", "perch"] },
      { id: "cath-high-right", x: 790, y: 380, tags: ["high", "right", "perch"] },
      { id: "cath-center-slab", x: 500, y: 490, tags: ["mid", "center", "ground"] },
      { id: "cath-low-l", x: 350, y: 840, tags: ["low", "left", "ground"] },
      { id: "cath-low-r", x: 650, y: 840, tags: ["low", "right", "ground"] },
    ],
    encounterWaves: [
      {
        id: "s6-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 2,
        entries: [
          { type: "SHIELDER", anchorIds: ["cath-center-slab"], weight: 60 },
          { type: "TURRET", anchorTags: ["high"], weight: 40 }
        ]
      },
      {
        id: "s6-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 3,
        entries: [
          { type: "LANCER", anchorTags: ["low"], weight: 45 },
          { type: "FLYER", anchorIds: ["cath-high-left", "cath-high-right"], weight: 40 },
          { type: "SHIELDER", anchorTags: ["ground"], weight: 15 }
        ]
      },
      {
        id: "s6-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 4,
        entries: [
          { type: "LANCER", anchorTags: ["ground"], weight: 35 },
          { type: "SHIELDER", anchorTags: ["ground"], weight: 30 },
          { type: "TURRET", anchorTags: ["high"], weight: 20 },
          { type: "FLYER", anchorTags: ["high"], weight: 15 }
        ]
      }
    ],
    playerStart: { x: 300, y: 800 },
    bossStart: { x: 700, y: 800 },
  },
  {
    id: "stage-7",
    title: "THE PANTHEON BOX",
    subtitle: "STAGE 7 - FINAL SYNTHESIS",
    midBossId: "false-square",
    midBossDisplayName: "THE FALSE SQUARE",
    midBossMaxHp: 110,
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
      { id: "pantheon-cat-l", x: 140, y: 392, tags: ["high", "left", "perch"] },
      { id: "pantheon-cat-r", x: 860, y: 392, tags: ["high", "right", "perch"] },
      { id: "pantheon-center-bridge", x: 500, y: 592, tags: ["mid", "center", "ground"] },
      { id: "pantheon-low-l", x: 184, y: 872, tags: ["low", "left", "ground"] },
      { id: "pantheon-low-r", x: 816, y: 872, tags: ["low", "right", "ground"] },
    ],
    encounterWaves: [
      {
        id: "s7-w1",
        phase: 1,
        earliestTime: 2,
        cooldownRange: [5, 8],
        maxActiveMinions: 3,
        entries: [
          { type: "TURRET", anchorTags: ["perch"], weight: 40 },
          { type: "LANCER", anchorTags: ["ground"], weight: 40 },
          { type: "FLYER", anchorIds: ["pantheon-center-bridge"], weight: 20 }
        ]
      },
      {
        id: "s7-w2",
        phase: 2,
        cooldownRange: [4, 7],
        maxActiveMinions: 4,
        entries: [
          { type: "FLYER", anchorTags: ["high"], weight: 35 },
          { type: "SHIELDER", anchorTags: ["ground"], weight: 35 },
          { type: "LANCER", anchorTags: ["ground"], weight: 30 }
        ]
      },
      {
        id: "s7-w3",
        phase: 3,
        cooldownRange: [3, 6],
        maxActiveMinions: 5,
        entries: [
          { type: "FLYER", anchorTags: ["high"], weight: 30 },
          { type: "LANCER", anchorTags: ["ground"], weight: 30 },
          { type: "SHIELDER", anchorTags: ["ground"], weight: 20 },
          { type: "TURRET", anchorTags: ["perch"], weight: 20 }
        ]
      }
    ],
    playerStart: { x: 120, y: 800 },
    bossStart: { x: 840, y: 800 },
  }
];
