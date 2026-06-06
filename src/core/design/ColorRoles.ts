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
  "player-agency": {
    core: "hsl(142, 72%, 56%)",
    light: "hsl(142, 100%, 78%)",
    dark: "hsl(148, 65%, 24%)",
  },
  "boss-lethal": {
    core: "hsl(350, 82%, 58%)",
    light: "hsl(0, 100%, 72%)",
    dark: "hsl(348, 70%, 28%)",
  },
  "hazard": {
    core: "hsl(358, 92%, 52%)",
    light: "hsl(12, 100%, 66%)",
    dark: "hsl(350, 80%, 22%)",
  },
  "telegraph": {
    core: "hsl(45, 100%, 60%)",
    light: "hsl(52, 100%, 78%)",
    dark: "hsl(34, 90%, 36%)",
  },
  "determination": {
    core: "hsl(286, 85%, 62%)",
    light: "hsl(292, 100%, 80%)",
    dark: "hsl(276, 75%, 26%)",
  },
  "minion-logic": {
    core: "hsl(194, 62%, 52%)",
    light: "hsl(188, 85%, 70%)",
    dark: "hsl(204, 45%, 24%)",
  },
  "minion-organic": {
    core: "hsl(82, 38%, 44%)",
    light: "hsl(90, 50%, 62%)",
    dark: "hsl(76, 34%, 22%)",
  },
  "arena-stone": {
    core: "hsl(220, 10%, 12%)",
    light: "hsl(215, 12%, 22%)",
    dark: "hsl(230, 12%, 5%)",
  },
  "arena-infection": {
    core: "hsl(330, 28%, 25%)",
    light: "hsl(336, 42%, 38%)",
    dark: "hsl(322, 30%, 12%)",
  },
  "neutral-ui": {
    core: "hsl(215, 15%, 75%)",
    light: "hsl(215, 20%, 90%)",
    dark: "hsl(215, 12%, 35%)",
  },
  "impact-white": {
    core: "hsl(0, 0%, 100%)",
    light: "hsl(0, 0%, 100%)",
    dark: "hsl(0, 0%, 90%)",
  }
} as const;

export function getColorHSL(role: ColorRole, variant: "core" | "light" | "dark" = "core", opacity?: number): string {
  const colors = COLOR_ROLES[role];
  if (!colors) return "hsl(0, 0%, 100%)";
  const base = colors[variant];
  if (opacity !== undefined) {
    return base.replace("hsl", "hsla").replace(")", `, ${opacity})`);
  }
  return base;
}
