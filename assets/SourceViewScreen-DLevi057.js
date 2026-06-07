import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,r as n,t as r}from"./vendor-highlighter-42TrrCe7.js";import{C as i,E as a,L as o,S as s,b as c,w as l}from"./vendor-react-BnGnL2XQ.js";import{i as u}from"./vendor-motion-B8aDJsV-.js";import{a as d,i as f,n as p,r as m,t as h}from"./index-BRDWc3_c.js";var g=e(n(),1),_={"index.html":`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>BOX BATTLE</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"><\/script>
  </body>
</html>
`,"package.json":`{
  "name": "box-battle",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "predev": "node scripts/generate_manifest.js && node scripts/create_source_context.js",
    "dev": "vite",
    "prebuild": "node scripts/generate_manifest.js && node scripts/create_source_context.js",
    "build": "eslint . && tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "format": "prettier --write \\"src/**/*.{ts,tsx,css}\\" \\"*.{js,ts,html,json,md}\\""
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.0",
    "canvas-confetti": "^1.9.4",
    "framer-motion": "^12.39.0",
    "lucide-react": "^1.16.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-syntax-highlighter": "^15.6.1",
    "tailwindcss": "^4.3.0",
    "tone": "^15.1.22",
    "zustand": "^5.0.13"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^24.12.4",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@types/react-syntax-highlighter": "^15.5.13",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "prettier": "^3.2.5",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12"
  }
}
`,"tsconfig.json":`{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }]
}
`,"tsconfig.app.json":`{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "noUncheckedSideEffectImports": false,

    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
`,"tsconfig.node.json":`{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
`,"vite.config.ts":`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 6502,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react/")) {
              return "vendor-react";
            }
            if (id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("zustand")) {
              return "vendor-zustand";
            }
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            if (id.includes("tone")) {
              return "vendor-tone";
            }
            if (id.includes("react-syntax-highlighter") || id.includes("prismjs")) {
              return "vendor-highlighter";
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});
`,"eslint.config.js":`import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": "off",
    },
  },
]);
`,"README.md":"# BOX BATTLE\n\nMega Man / Hollow Knight precision traversal gauntlet prototype.\n\nPorted over from a Gemini 2.5 Pro in Godot to React + TypeScript + Vite + Zustand using Gemini 3.5 Flash\n\nPlay the game here:\n👉 **[GitHub.io](https://stevencasteel.github.io/boxbattle/)**\n👉 **[Itch.io](https://stevencasteel.itch.io/boxbattle)**\n\n---\n\n## Player Controls\n\n- **Move Left / Right**: `Left Arrow` / `Right Arrow` or `A` / `D`\n- **Look / Move Up**: `Up Arrow` or `W`\n- **Crouch / Move Down**: `Down Arrow` or `S`\n- **Jump**: `X` or `.` (Period) or `Space`\n- **Melee Attack**: `C` or `,` (Comma)\n- **Dash**: `Z` or `/` (Slash)\n- **Determination Heal**: Hold `Move Down` + Press `Jump` (Requires 1 active Heal Charge)\n\n_Key bindings are fully customizable inside the Options menu._\n\n---\n\n## Technical Architecture\n\n- **Presentation & UI**: React 19, TypeScript 6, Vite 8, Zustand 5\n- **Physics Simulation**: Custom 60Hz Semi-Implicit Euler accumulator loop with swept collision checks and corner-nudging\n- **Sound Design**: Pure procedural waveform synthesis utilizing native Web Audio API oscillators, filters, and envelope gains (zero external binary audio assets)\n","src/App.css":`.cabinet-outer {
  position: relative;
  width: 740px;
  height: 862px;
  border-radius: 20px;
  background: #0f1218;
  padding: 16px 16px 6px 16px;
  box-shadow:
    -8px -8px 24px rgba(255, 255, 255, 0.02),
    8px 8px 36px rgba(0, 0, 0, 0.95),
    inset 0 0 30px rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.01);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
}

.cabinet-outer.cabinet-mobile {
  width: 740px !important;
  height: 862px !important;
  border-radius: 20px !important;
  box-shadow:
    -8px -8px 24px rgba(255, 255, 255, 0.02),
    8px 8px 36px rgba(0, 0, 0, 0.95),
    inset 0 0 30px rgba(0, 0, 0, 0.9) !important;
  border: 1px solid rgba(255, 255, 255, 0.01) !important;
  padding: 16px 16px 6px 16px !important;
}

.cabinet-wide-source {
  width: 1100px !important;
  height: 800px !important;
  border-radius: 20px !important;
  padding: 24px !important;
}

.cabinet-wide-source .cabinet-status-panel,
.cabinet-wide-source .dialogue-console {
  display: none !important;
}

.cabinet-wide-source .game-viewport-container {
  aspect-ratio: auto !important;
  flex-grow: 1 !important;
  flex-shrink: 1 !important;
  height: 100% !important;
}

.screen-inner {
  width: 100%;
  height: 100%;
  background: var(--void-bg);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.crt-scanlines {
  position: relative;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.crt-scanlines::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%);
  z-index: 99;
  background-size: 100% 4px;
  pointer-events: none;
}

.crt-flicker {
  animation: crt-flicker-animation 0.15s infinite alternate;
}

@keyframes crt-flicker-animation {
  0% {
    opacity: 0.985;
  }
  100% {
    opacity: 1;
  }
}

.vignette-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, transparent 65%, rgba(239, 68, 68, 0.28) 100%);
  pointer-events: none;
  z-index: 80;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.vignette-pulse {
  opacity: 1;
  animation: vignette-heartbeat 1.2s infinite alternate;
}

@keyframes vignette-heartbeat {
  0% {
    opacity: 0.15;
  }
  100% {
    opacity: 0.55;
  }
}

.filter-chromatic {
  filter: url(#chromatic-aberration);
}

.shockwave-blast {
  position: absolute;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.3),
    0 0 40px rgba(255, 255, 255, 0.15);
  pointer-events: none;
  z-index: 90;
  transform: translate(-50%, -50%);
  animation: blast-wave-expand 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
}

@keyframes blast-wave-expand {
  0% {
    width: 0px;
    height: 0px;
    opacity: 1;
    filter: blur(1px);
  }
  50% {
    filter: blur(6px);
  }
  100% {
    width: 1200px;
    height: 1200px;
    opacity: 0;
    filter: blur(12px);
  }
}

.title-banner {
  padding-top: 14px;
  margin-top: 0;
  text-align: center;
}

.title-banner h2 {
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #fff;
}

.title-banner p {
  font-size: 10px;
  color: var(--signal-green);
  margin: 6px 0 0;
  letter-spacing: 0.35em;
  font-weight: bold;
  text-shadow: 0 0 8px var(--signal-green-glow);
  animation: crt-pulse 2s infinite alternate;
}

@keyframes crt-pulse {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

.game-viewport-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  overflow: hidden;
  background: var(--void-bg);
  position: relative;
  contain: layout style paint;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  min-height: 0;
  align-self: center;
}

.game-viewport-container.viewport-mobile {
  flex-grow: 1;
  width: 100%;
  height: 0px;
  aspect-ratio: auto;
}

.game-viewport-container.viewport-mobile.viewport-playing {
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 1/1;
  max-height: none;
  height: auto;
}

.touch-overlay-panel {
  display: flex;
  width: 100%;
  gap: 8px;
  background: #0c0e12;
  box-sizing: border-box;
  flex-grow: 1;
  height: 0px;
  padding-top: 6px;
}

.touch-joystick-side {
  flex: 1.3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  height: 100%;
}

.touch-vertical-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
}

.touch-action-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
}

.touch-action-row {
  display: flex;
  gap: 6px;
  flex: 1.2;
}

.touch-label-inner {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.neo-btn.touch-action-btn {
  user-select: none;
  touch-action: none;
  padding: 0;
  border-radius: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  min-height: 44px;
}

@keyframes hud-cabinet-shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(0px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(2px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(2px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

.hud-shaking {
  animation: hud-cabinet-shake 0.18s ease-in-out;
}

@keyframes led-scale-pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.85);
    filter: brightness(1.6);
  }
  100% {
    transform: scale(1);
  }
}

.led-pop {
  animation: led-scale-pop 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes active-led-glow {
  0% {
    opacity: 0.85;
  }
  100% {
    opacity: 1;
    filter: brightness(1.35) drop-shadow(0 0 5px rgba(234, 179, 8, 0.85));
  }
}

.led-yellow {
  animation: active-led-glow 0.8s infinite alternate ease-in-out;
}

@keyframes led-shake-sympathy {
  0% {
    transform: translate(1px, 0px) rotate(0deg);
  }
  25% {
    transform: translate(-1px, 1px) rotate(-1deg);
  }
  50% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  75% {
    transform: translate(-1px, -1px) rotate(-1deg);
  }
  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
}

.led-shaking {
  animation: led-shake-sympathy 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes led-shake-die-decay {
  0% {
    transform: translate(2px, 2px) scale(1.3) rotate(5deg);
    filter: brightness(1.9) saturate(2);
    background: #ef4444;
  }
  20% {
    transform: translate(-3px, -2px) scale(1.1) rotate(-8deg);
    background: #ef4444;
  }
  40% {
    transform: translate(-2px, 2px) scale(1) rotate(8deg);
  }
  60% {
    transform: translate(3px, -2px) scale(0.9) rotate(-4deg);
  }
  80% {
    transform: translate(-2px, -2px) scale(0.8) rotate(4deg);
  }
  100% {
    transform: translate(0px, 0px) scale(1) rotate(0deg);
  }
}

.led-shaking-die {
  animation: led-shake-die-decay 0.45s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes crt-shutoff {
  0% {
    transform: scaleY(1) scaleX(1);
    filter: brightness(1.5) contrast(1.2) saturate(1);
  }
  40% {
    transform: scaleY(0.01) scaleX(1.1);
    filter: brightness(4.0) contrast(1.5) saturate(0);
    background: #ffffff;
  }
  75% {
    transform: scaleY(0.01) scaleX(0.01);
    filter: brightness(10.0);
    background: #ffffff;
  }
  100% {
    transform: scale(0);
    opacity: 0;
    background: #ffffff;
  }
}

@keyframes crt-power-on {
  0% {
    transform: scaleY(0.01) scaleX(0);
    filter: brightness(4.0);
    opacity: 1;
  }
  40% {
    transform: scaleY(0.01) scaleX(1);
    filter: brightness(2.0);
    opacity: 1;
  }
  100% {
    transform: scaleY(1) scaleX(1);
    filter: brightness(1);
    opacity: 1;
  }
}

.crt-transition-active {
  animation: crt-shutoff 0.45s cubic-bezier(0.25, 1, 0.3, 1) forwards !important;
}

.crt-power-on-active {
  animation: crt-power-on 0.4s cubic-bezier(0.25, 1, 0.3, 1) forwards !important;
}

.gameover-overlay::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.42) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.12), rgba(0, 255, 0, 0.04), rgba(0, 0, 255, 0.12));
  z-index: 1;
  background-size: 100% 4px, 6px 100%;
  pointer-events: none;
}

.gameover-box {
  position: relative;
  z-index: 2;
}

@keyframes victory-bounce-glow {
  0% {
    transform: scale(0.3) translateY(40px);
    filter: brightness(3) drop-shadow(0 0 20px var(--signal-green-glow));
    opacity: 0;
  }
  70% {
    transform: scale(1.1) translateY(-10px);
    filter: brightness(1.5) drop-shadow(0 0 15px var(--signal-green));
    opacity: 0.9;
  }
  100% {
    transform: scale(1) translateY(0);
    filter: brightness(1) drop-shadow(0 0 10px var(--signal-green-glow));
    opacity: 1;
  }
}

.victory-icon-anim {
  animation: victory-bounce-glow 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, victory-float-glow 2s infinite ease-in-out 0.8s;
}

@keyframes defeat-shake-glow {
  0% {
    transform: scale(0.3) rotate(-15deg);
    filter: brightness(3) drop-shadow(0 0 20px var(--signal-red-glow));
    opacity: 0;
  }
  50% {
    transform: scale(1.05) rotate(8deg);
    filter: brightness(1.8) drop-shadow(0 0 12px var(--signal-red));
    opacity: 0.8;
  }
  75% {
    transform: scale(0.95) rotate(-4deg);
  }
  100% {
    transform: scale(1) rotate(0);
    filter: brightness(1) drop-shadow(0 0 10px var(--signal-red-glow));
    opacity: 1;
  }
}

.defeat-icon-anim {
  animation: defeat-shake-glow 0.8s cubic-bezier(0.25, 0.8, 0.25, 1.1) forwards, defeat-shiver-glow 0.22s infinite linear 0.8s;
}

@keyframes text-chromatic-flicker-green {
  0%, 100% { text-shadow: 0 0 15px var(--signal-green-glow), -2px 0 #00ff00, 2px 0 #0000ff; }
  50% { text-shadow: 0 0 8px rgba(34, 197, 94, 0.2), -1px 0 #00ff00, 1px 0 #0000ff; filter: brightness(0.9); }
  92% { text-shadow: 0 0 25px var(--signal-green), -3px 0 #00ff00, 3px 0 #0000ff; filter: brightness(1.2); }
}

.victory-title-anim {
  animation: text-chromatic-flicker-green 3s infinite ease-in-out;
}

@keyframes text-chromatic-flicker-red {
  0%, 100% { text-shadow: 0 0 15px var(--signal-red-glow), -2px 0 #ff0000, 2px 0 #0000ff; }
  45% { text-shadow: 0 0 6px rgba(239, 68, 68, 0.25), -1px 0 #ff0000, 1px 0 #0000ff; filter: brightness(0.85); }
  85% { text-shadow: 0 0 22px var(--signal-red), -4px 0 #ff0000, 3px 0 #0000ff; filter: brightness(1.3); }
}

.defeat-title-anim {
  animation: text-chromatic-flicker-red 2.5s infinite ease-in-out;
}

@keyframes terminal-wipe {
  0% {
    max-height: 0px;
    opacity: 0;
    border-color: rgba(255, 255, 255, 0.01);
  }
  100% {
    max-height: 200px;
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.08);
  }
}

.stat-card-anim {
  overflow: hidden;
  animation: terminal-wipe 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes spring-up {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.button-reveal-anim {
  animation: spring-up 0.5s cubic-bezier(0.25, 0.8, 0.25, 1.15) forwards;
}

@keyframes victory-float-glow {
  0% {
    transform: translateY(0) scale(1);
    filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.4));
  }
  50% {
    transform: translateY(-6px) scale(1.05);
    filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.85));
  }
  100% {
    transform: translateY(0) scale(1);
    filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.4));
  }
}

@keyframes defeat-shiver-glow {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.4));
  }
  20% {
    transform: translate(-1.5px, 1px) rotate(-1.5deg);
  }
  40% {
    transform: translate(1.5px, -1px) rotate(2deg);
    filter: drop-shadow(0 0 16px rgba(239, 68, 68, 0.85));
  }
  60% {
    transform: translate(-1.5px, -1px) rotate(-1.5deg);
  }
  80% {
    transform: translate(1.5px, 1.5px) rotate(1deg);
  }
}
`,"src/App.tsx":`import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Action } from "@/core/InputProvider";
import { soundSynth } from "@/core/SoundSynth";
import { useSaveSlots } from "@/hooks/useSaveSlots";
import { useAudioSettings } from "@/hooks/useAudioSettings";
import { useBootSequence, BootStage } from "@/hooks/useBootSequence";
import { useGameplayStore, useSessionStore, SCREEN_DEPTHS } from "@/store/useGameStore";
import { useGameDialogue } from "@/hooks/useGameDialogue";
import { useMenuKeyboardNavigation } from "@/hooks/useMenuKeyboardNavigation";

import { TitleScreen } from "@/components/menus/TitleScreen";
import { SaveSelectScreen } from "@/components/menus/SaveSelectScreen";
import { SettingsScreen } from "@/components/menus/SettingsScreen";
import { AudioScreen } from "@/components/menus/AudioScreen";
import { ControlsScreen } from "@/components/menus/ControlsScreen";
import { CreditsScreen } from "@/components/menus/CreditsScreen";
const SourceViewScreen = lazy(() =>
  import("@/components/menus/SourceViewScreen").then((m) => ({ default: m.SourceViewScreen }))
);
import { GameArena } from "@/components/GameArena";
import { HudPanel } from "@/components/HudPanel";
import { DialogueConsole } from "@/components/DialogueConsole";
import { TouchOverlay } from "@/components/TouchOverlay";
import { ChromaticAberrationFilter } from "@/components/ChromaticAberrationFilter";
import { Cursor } from "@/components/cursor/Cursor";
import { useMusicLifecycle } from "@/hooks/useMusicLifecycle";
import { useFirstGesture } from "@/hooks/useFirstGesture";
import { useEngineSubscriptions } from "@/hooks/useEngineSubscriptions";
import { useRebindCapture } from "@/hooks/useRebindCapture";

import "./App.css";
import "./styles/neumorphism.css";
import "./components/GameArena.css";

export default function App() {
  const bootStage = useBootSequence();
  const viewportRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const isSource = useSessionStore.getState().currentScreen === "SOURCE_VIEW";
      const cabinetWidth = isSource ? 1100 : 740;
      const cabinetHeight = isSource ? 800 : 862;
      const padding = 32; // Total padding around the cabinet
      
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - padding;
      
      const scaleX = availableWidth / cabinetWidth;
      const scaleY = availableHeight / cabinetHeight;
      
      const newScale = Math.min(scaleX, scaleY);
      setScale(Math.max(0.1, newScale));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const unsub = useSessionStore.subscribe(() => {
      handleResize();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsub();
    };
  }, []);


  const currentScreen = useSessionStore((state) => state.currentScreen);
  const gameResult = useSessionStore((state) => state.gameResult);
  const transitionActive = useSessionStore((state) => state.transitionActive);
  const menuIndex = useSessionStore((state) => state.menuIndex);
  const retryCount = useSessionStore((state) => state.retryCount);

  const navTo = useSessionStore((state) => state.navTo);
  const setMenuIndex = useSessionStore((state) => state.setMenuIndex);
  const resetGameSession = useGameplayStore((state) => state.resetGameSession);

  const {
    slots,
    copySourceIndex,
    isCopyMode,
    isEraseMode,
    reloadSaveSlots,
    handleSlotAction,
    toggleCopyMode,
    toggleEraseMode,
    resetActions,
  } = useSaveSlots();

  const { audio, handleVolumeChange, resetSettings } = useAudioSettings();
  const { playerDialogue, bossDialogue, triggerDialogue, resetDialogues } = useGameDialogue();

  const [rebindTarget, setRebindTarget] = useState<{ action: Action; index: number } | null>(null);

  const [isTouchDevice] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(pointer: coarse)").matches;
    }
    return false;
  });

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "boxbattle-pause") {
        soundSynth.suspendContext();
        if (useSessionStore.getState().currentScreen === "PLAYING") {
          const pauseEvent = new KeyboardEvent("keydown", { code: "KeyP" });
          window.dispatchEvent(pauseEvent);
        }
      } else if (e.data && e.data.type === "boxbattle-resume") {
        soundSynth.resumeContext(true);
      }
    };

    const handleBlur = () => {
      soundSynth.suspendContext();
      if (useSessionStore.getState().currentScreen === "PLAYING") {
        const pauseEvent = new KeyboardEvent("keydown", { code: "KeyP" });
        window.dispatchEvent(pauseEvent);
      }
    };

    const handleFocus = () => {
      if (useSessionStore.getState().currentScreen === "PLAYING") {
        soundSynth.resumeContext(true);
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const isFullHeightScreen = currentScreen === "SOURCE_VIEW";
  const isPlayingScreen = currentScreen === "PLAYING";

  useMusicLifecycle(isPlayingScreen);
  useFirstGesture(reloadSaveSlots);
  useEngineSubscriptions(triggerDialogue, resetDialogues);
  useRebindCapture(rebindTarget, setRebindTarget, reloadSaveSlots);

  const playHoverTick = () => {
    soundSynth.playSelectTick();
  };

  const menuCtxRef = useRef({
    navTo, setMenuIndex, reloadSaveSlots, resetGameSession,
    handleSlotAction, toggleCopyMode, toggleEraseMode, resetActions,
    audio, handleVolumeChange, resetSettings,
  });

  useEffect(() => {
    menuCtxRef.current = {
      navTo, setMenuIndex, reloadSaveSlots, resetGameSession,
      handleSlotAction, toggleCopyMode, toggleEraseMode, resetActions,
      audio, handleVolumeChange, resetSettings,
    };
  });

  const prevScreenRef = useRef(currentScreen);
  useEffect(() => {
    const prev = prevScreenRef.current;
    if (prev !== currentScreen) {
      if (soundSynth.initialized) {
        const currentDepth = SCREEN_DEPTHS[prev] ?? 0;
        const targetDepth = SCREEN_DEPTHS[currentScreen] ?? 0;
        if (targetDepth < currentDepth) {
          soundSynth.playMenuBack();
        } else {
          soundSynth.playMenuConfirm();
        }
      }
      prevScreenRef.current = currentScreen;
    }
  }, [currentScreen]);

  useEffect(() => {
    if (!isPlayingScreen) {
      resetDialogues();
    }
  }, [isPlayingScreen, resetDialogues]);

  useMenuKeyboardNavigation(menuCtxRef, setRebindTarget, currentScreen, gameResult, rebindTarget);

  if (bootStage === BootStage.NONE) {
    return (
      <div className="app-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", overflow: "hidden", background: "#050505" }}>
        <div style={{ transform: \`scale(\${scale})\`, transformOrigin: "center center", width: "740px", height: "862px", display: "flex", flexDirection: "column", flexShrink: 0, flexGrow: 0 }}>
          <div className="cabinet-outer" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <span style={{ color: "#718096", fontSize: "11px", letterSpacing: "0.2em" }}>BOOTING SYSTEM...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", overflow: "hidden", background: "#050505" }}>
      <div
        style={{
          transform: \`scale(\${scale})\`,
          transformOrigin: "center center",
          width: isFullHeightScreen ? "1100px" : "740px",
          height: isFullHeightScreen ? "800px" : "862px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          flexGrow: 0,
          transition: "transform 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
        }}
      >
        <div
          className={\`cabinet-outer \${isFullHeightScreen ? "cabinet-wide-source" : ""} \${isTouchDevice ? "cabinet-mobile" : ""}\`}
          style={{ width: "100%", height: "100%" }}
        >
        {!isFullHeightScreen && (
          <HudPanel
            key={\`\${currentScreen}-\${retryCount}\`}
            isTouchDevice={isTouchDevice}
            isPlayingScreen={isPlayingScreen}
          />
        )}

        <div
          className={\`game-viewport-container \${isPlayingScreen ? "viewport-playing" : "viewport-menu"} \${transitionActive === "SHUTDOWN" ? "crt-transition-active" : ""} \${transitionActive === "POWER_ON" ? "crt-power-on-active" : ""} \${isTouchDevice ? "viewport-mobile" : ""}\`}
          ref={viewportRef}
        >
          <div style={{ position: "relative", flexGrow: 1, display: "flex", minHeight: 0 }}>
            <GameArena playHoverTick={playHoverTick} />

            {!isPlayingScreen && (
              <div className="screen-inner" style={{ position: "absolute", inset: 0, zIndex: 10 }}>
                {currentScreen === "TITLE" && (
                  <TitleScreen
                    menuIndex={menuIndex}
                    onPlay={() => {
                      reloadSaveSlots();
                      navTo("SAVE_SELECT");
                    }}
                    onSettings={() => {
                      navTo("OPTIONS");
                    }}
                    onCredits={() => {
                      navTo("CREDITS");
                    }}
                    onSource={() => {
                      navTo("SOURCE_VIEW");
                    }}
                    playHoverTick={playHoverTick}
                    setMenuIndex={setMenuIndex}
                  />
                )}

                {currentScreen === "SAVE_SELECT" && (
                  <SaveSelectScreen
                    slots={slots}
                    menuIndex={menuIndex}
                    isCopyMode={isCopyMode}
                    copySourceIndex={copySourceIndex}
                    isEraseMode={isEraseMode}
                    handleSlotSelect={(idx) => handleSlotAction(idx, () => navTo("PLAYING"))}
                    toggleCopyMode={toggleCopyMode}
                    toggleEraseMode={toggleEraseMode}
                    onBack={() => {
                      resetActions();
                      navTo("TITLE");
                    }}
                    playHoverTick={playHoverTick}
                    setMenuIndex={setMenuIndex}
                  />
                )}

                {currentScreen === "OPTIONS" && (
                  <SettingsScreen
                    menuIndex={menuIndex}
                    onAudio={() => {
                      navTo("SOUND");
                    }}
                    onControls={() => {
                      navTo("CONTROLS");
                    }}
                    onBack={() => {
                      navTo("TITLE");
                      setMenuIndex(1);
                    }}
                    playHoverTick={playHoverTick}
                    setMenuIndex={setMenuIndex}
                  />
                )}

                {currentScreen === "SOUND" && (
                  <AudioScreen
                    audio={audio}
                    menuIndex={menuIndex}
                    handleVolumeChange={handleVolumeChange}
                    resetSettings={resetSettings}
                    onBack={() => {
                      navTo("OPTIONS");
                    }}
                    playHoverTick={playHoverTick}
                    setMenuIndex={setMenuIndex}
                  />
                )}

                {currentScreen === "CONTROLS" && (
                  <ControlsScreen
                    menuIndex={menuIndex}
                    rebindTarget={rebindTarget}
                    onBack={() => {
                      navTo("OPTIONS");
                      setMenuIndex(1);
                    }}
                    playHoverTick={playHoverTick}
                    setMenuIndex={setMenuIndex}
                    setRebindTarget={setRebindTarget}
                    reloadSaveSlots={reloadSaveSlots}
                  />
                )}

                {currentScreen === "CREDITS" && (
                  <CreditsScreen
                    onBack={() => {
                      navTo("TITLE");
                      setMenuIndex(2);
                    }}
                  />
                )}

                {currentScreen === "SOURCE_VIEW" && (
                  <Suspense
                    fallback={
                      <div
                        className="flex-col-center h-full w-full"
                        style={{ gap: "12px", background: "var(--void-bg)", justifyContent: "center" }}
                      >
                        <div
                          className="led-dot led-green"
                          style={{ width: "16px", height: "16px", animation: "crt-pulse 1s infinite alternate" }}
                        />
                        <span
                          style={{
                            color: "#718096",
                            fontSize: "11px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                          }}
                        >
                          COMPILING SOURCE ARCHIVE...
                        </span>
                      </div>
                    }
                  >
                    <SourceViewScreen
                      onBack={() => {
                        navTo("TITLE");
                        setMenuIndex(3);
                      }}
                    />
                  </Suspense>
                )}
              </div>
            )}
          </div>
        </div>

        {!isFullHeightScreen && (
          <DialogueConsole playerDialogue={playerDialogue} bossDialogue={bossDialogue} isTouchDevice={isTouchDevice} />
        )}

        {isPlayingScreen && isTouchDevice && <TouchOverlay />}
      </div>
      </div>

      <ChromaticAberrationFilter />
      <Cursor />
    </div>
  );
}
`,"src/components/ChromaticAberrationFilter.tsx":`export function ChromaticAberrationFilter() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
      <defs>
        <filter id="chromatic-aberration">
          <feOffset dx="6" dy="0" in="SourceGraphic" result="red" />
          <feOffset dx="-6" dy="0" in="SourceGraphic" result="blue" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" in="red" result="red-only" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            in="SourceGraphic"
            result="green-only"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            in="blue"
            result="blue-only"
          />
          <feBlend mode="screen" in="red-only" in2="green-only" result="rg" />
          <feBlend mode="screen" in="rg" in2="blue-only" />
        </filter>
      </defs>
    </svg>
  );
}
`,"src/components/DialogueConsole.tsx":`import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DialogueState } from "@/hooks/useGameDialogue";

interface DialogueConsoleProps { playerDialogue: DialogueState; bossDialogue: DialogueState; isTouchDevice: boolean; }

function PortraitCanvas({ speaker, typing }: { speaker: "player" | "boss"; typing: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext("2d"); if (!ctx) return;
        let frameId: number;
        const render = () => {
            const w = canvas.width, h = canvas.height, t = performance.now() / 1000;
            ctx.clearRect(0, 0, w, h);
            if (speaker === "player") {
                ctx.fillStyle = "hsl(142, 72%, 56%)"; ctx.fillRect(0, 0, w, h);
                if (typing) { ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(w / 2, h / 2, 4 + Math.sin(t * 12) * 2, 0, Math.PI * 2); ctx.fill(); }
            } else {
                const baseColor = "hsl(350, 82%, 58%)";
                ctx.fillStyle = baseColor;
                ctx.fillRect(0, 0, w, h);
            }
            frameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(frameId);
    }, [speaker, typing]);
    return <canvas ref={canvasRef} width={48} height={48} style={{ width: "100%", height: "100%", display: "block", borderRadius: "5px" }} />;
}

export function DialogueConsole({ playerDialogue, bossDialogue, isTouchDevice }: DialogueConsoleProps) {
    const mobileClass = isTouchDevice ? "is-mobile" : "";
    const leftState = playerDialogue.active ? "active" : bossDialogue.active ? "inactive" : "idle";
    const rightState = bossDialogue.active ? "active" : playerDialogue.active ? "inactive" : "idle";
    const bossName = "PRIME APHELION";

    const getVariants = (speaker: "player" | "boss") => ({
        active: { scale: 1.02, opacity: 1, borderColor: speaker === "player" ? "rgba(34, 197, 94, 0.45)" : "rgba(239, 68, 68, 0.45)", boxShadow: speaker === "player" ? "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 16px rgba(34, 197, 94, 0.15)" : "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 16px rgba(239, 68, 68, 0.15)" },
        inactive: { scale: 0.96, opacity: 0.15, borderColor: "rgba(0, 0, 0, 0.3)", boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9)" },
        idle: { scale: 0.98, opacity: 0.35, borderColor: "rgba(0, 0, 0, 0.3)", boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, 0.01), inset 3px 3px 10px rgba(0, 0, 0, 0.9)" }
    });

    return (
        <div className={\`dialogue-console \${mobileClass}\`}>
            <motion.div animate={leftState} variants={getVariants("player")} transition={{ type: "spring", stiffness: 220, damping: 25 }} className={\`dialogue-box-left neo-pressed \${mobileClass}\`}>
                <div className={\`portrait-square led-green \${playerDialogue.isTyping ? "portrait-rumble" : ""} \${mobileClass}\`} style={{ overflow: "hidden", display: "flex", padding: 0 }}>
                    <PortraitCanvas speaker="player" typing={playerDialogue.isTyping} />
                </div>
                <div className="dialogue-text-container">
                    <div className={\`dialogue-speaker-label \${mobileClass}\`}>PLAYER</div>
                    <div className={\`dialogue-body-text \${mobileClass}\`}>{playerDialogue.active ? playerDialogue.displayed : "[ NO SIGNAL ]"}</div>
                </div>
            </motion.div>
            <motion.div animate={rightState} variants={getVariants("boss")} transition={{ type: "spring", stiffness: 220, damping: 25 }} className={\`dialogue-box-right neo-pressed \${mobileClass}\`}>
                <div className="dialogue-text-container" style={{ textAlign: "right" }}>
                    <div className={\`dialogue-speaker-label \${mobileClass}\`} style={{ color: "var(--signal-red)" }}>{bossName}</div>
                    <div className={\`dialogue-body-text \${mobileClass}\`}>{bossDialogue.active ? bossDialogue.displayed : "[ NO SIGNAL ]"}</div>
                </div>
                <div className={\`portrait-square led-red \${bossDialogue.isTyping ? "portrait-rumble" : ""} \${mobileClass}\`} style={{ overflow: "hidden", display: "flex", padding: 0 }}>
                    <PortraitCanvas speaker="boss" typing={bossDialogue.isTyping} />
                </div>
            </motion.div>
        </div>
    );
}
`,"src/components/GameArena.css":`.cabinet-status-panel {
  width: 100%;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 12px;
  margin-bottom: 6px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.hud-panel-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hud-panel-title {
  font-size: 11px;
  font-weight: bold;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.hud-panel-title-red {
  color: var(--signal-red);
}

.game-viewport-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  overflow: hidden;
  background: var(--void-bg);
  position: relative;
  contain: layout style paint;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  min-height: 0;
  align-self: center;
}

.dialogue-console {
  width: 100%;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  display: flex;
  gap: 12px;
  margin-top: 6px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.dialogue-console.is-mobile {
  height: 60px !important;
  margin-top: 6px !important;
  gap: 12px !important;
  padding: 0 !important;
  flex-shrink: 0 !important;
}

.dialogue-box-left,
.dialogue-box-right {
  flex: 1;
  border-radius: 12px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  overflow: hidden;
  transition:
    opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1),
    border-color 0.4s cubic-bezier(0.25, 1, 0.5, 1),
    box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  transform: scale(0.97);
}

.dialogue-box-left.is-mobile,
.dialogue-box-right.is-mobile {
  padding: 8px 12px !important;
  gap: 10px !important;
  border-radius: 12px !important;
  height: 100% !important;
}

.dialogue-active-green {
  opacity: 1;
  border-color: rgba(34, 197, 94, 0.25);
  box-shadow:
    var(--shadow-inset-light),
    var(--shadow-inset-dark),
    0 0 12px rgba(34, 197, 94, 0.08);
  transform: scale(1);
}

.dialogue-active-red {
  opacity: 1;
  border-color: rgba(239, 68, 68, 0.25);
  box-shadow:
    var(--shadow-inset-light),
    var(--shadow-inset-dark),
    0 0 12px rgba(239, 68, 68, 0.08);
  transform: scale(1);
}

.dialogue-inactive {
  opacity: 0.12;
  transform: scale(0.97);
}

.portrait-square {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  max-width: 48px;
  max-height: 48px;
  border-radius: 6px;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.4);
}

.portrait-square.is-mobile {
  width: 48px !important;
  height: 48px !important;
}

.dialogue-text-container {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex-grow: 1;
  overflow: hidden;
}

.dialogue-speaker-label {
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.15em;
  color: var(--signal-green);
}

.dialogue-speaker-label.is-mobile {
  font-size: 10px !important;
}

.dialogue-body-text {
  font-size: 12px;
  line-height: 1.35;
  color: #eaeaea;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow: hidden;
}

.dialogue-body-text.is-mobile {
  font-size: 12px !important;
  line-height: 1.35 !important;
}

.portrait-rumble {
  animation: rumble-anim 0.08s infinite alternate;
}

@keyframes rumble-anim {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  20% { transform: translate(-1px, -1px) rotate(-1deg); }
  40% { transform: translate(-1px, 1px) rotate(1deg); }
  60% { transform: translate(1px, -1px) rotate(0deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  100% { transform: translate(1px, 1px) rotate(-1deg); }
}

.keycap-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0f1218;
  color: #718096;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    -1px -1px 3px rgba(255, 255, 255, 0.01),
    2px 2px 5px rgba(0, 0, 0, 0.8),
    inset 1px 1px 0px rgba(255, 255, 255, 0.03);
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.05em;
  transition: all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
  min-width: 20px;
  text-align: center;
  user-select: none;
}

.keycap-used {
  border-color: var(--signal-green);
  color: #ffffff;
  background: #0c0e12;
  box-shadow: 
    0 0 10px rgba(34, 197, 94, 0.25),
    inset 0 0 4px rgba(34, 197, 94, 0.15),
    2px 2px 6px rgba(0, 0, 0, 0.9);
  text-shadow: 0 0 6px var(--signal-green-glow);
}

@keyframes purple-pulse {
  0% {
    box-shadow: inset 3px 3px 10px rgba(0, 0, 0, 0.9);
    border-color: rgba(168, 85, 247, 0.2);
  }
  100% {
    box-shadow: 0 0 10px rgba(168, 85, 247, 0.6), inset 3px 3px 10px rgba(0, 0, 0, 0.9);
    border-color: rgba(168, 85, 247, 0.85);
  }
}

.det-pulse-highlight {
  animation: purple-pulse 1.4s infinite alternate ease-in-out !important;
}
`,"src/components/GameArena.tsx":`import confetti from "canvas-confetti";
import "./GameArena.css";
import { useEffect, useRef, useState } from "react";
import { Engine } from "@/core/Engine";
import { World } from "@/core/World";
import { WorldRenderer } from "@/core/WorldRenderer";
import { defaultLevelConfig } from "@/core/levelData";
import { inputProvider } from "@/core/InputProvider";
import { useSessionStore, useGameplayStore } from "@/store/useGameStore";
import { eventBroker } from "@/core/eventBroker";
import { soundSynth } from "@/core/SoundSynth";
import { saveManager } from "@/core/SaveManager";
import { settingsManager } from "@/core/SettingsManager";
import { Trophy, Skull, RotateCcw, Home, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GameArenaProps {
  triggerDialogue?: (speaker: "player" | "boss", text: string) => void;
  playHoverTick: () => void;
}

export function GameArena({ playHoverTick }: GameArenaProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);

  const [stagger, setStagger] = useState(0);
  const [displayWins, setDisplayWins] = useState(0);
  const [displayLosses, setDisplayLosses] = useState(0);

  const currentScreen = useSessionStore((state) => state.currentScreen);
  const gameResult = useSessionStore((state) => state.gameResult);
  const menuIndex = useSessionStore((state) => state.menuIndex);
  const navTo = useSessionStore((state) => state.navTo);
  const setMenuIndex = useSessionStore((state) => state.setMenuIndex);
  const retryCount = useSessionStore((state) => state.retryCount);
  const resetGameSession = useGameplayStore((state) => state.resetGameSession);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not construct 2D context.");

    const world = new World(defaultLevelConfig.solids, defaultLevelConfig.hazards, defaultLevelConfig.onewayPlatforms, eventBroker, soundSynth, inputProvider);
    const renderer = new WorldRenderer(ctx);
    const engine = new Engine(world, renderer);
    engineRef.current = engine;
    inputProvider.setKeyMap(settingsManager.getKeyMap());
    engine.start();

    useSessionStore.getState().setGameResult("PLAYING");

    const vignette = canvas.parentElement?.querySelector(".vignette-overlay") as HTMLDivElement | null;

    const updateVignette = (hp: number) => {
      const isGameOver = useSessionStore.getState().gameResult !== "PLAYING";
      if (vignette) {
        if (hp === 1 && !isGameOver) {
          vignette.classList.add("vignette-pulse");
        } else {
          vignette.classList.remove("vignette-pulse");
        }
      }
    };

    const unsubHurt = eventBroker.subscribe("PLAYER_HURT", ({ currentHealth }) => {
      updateVignette(currentHealth);
    });
    const unsubHealed = eventBroker.subscribe("PLAYER_HEALED", ({ currentHealth }) => {
      updateVignette(currentHealth);
    });

    const unsubSession = useSessionStore.subscribe((state) => {
      if (state.gameResult !== "PLAYING") {
        updateVignette(0);
      } else {
        updateVignette(useGameplayStore.getState().playerHP);
      }
    });

    const initialHP = useGameplayStore.getState().playerHP;
    updateVignette(initialHP);

    const unsubStateProjected = eventBroker.subscribe("STATE_PROJECTED", (payload) => {
      const store = useGameplayStore.getState();
      store.setPlayerHP(payload.playerHP);
      store.setBossHP(payload.bossHP);
      store.setHealingCharges(payload.healingCharges);
      store.setDetermination(payload.determination);
    });

    const unsubGameOver = eventBroker.subscribe("GAME_OVER", () => {
      useSessionStore.getState().setGameResult("GAMEOVER");
    });

    const unsubVictory = eventBroker.subscribe("VICTORY", () => {
      useSessionStore.getState().setGameResult("VICTORY");
    });

    const unsubRecordLoss = eventBroker.subscribe("RECORD_LOSS", () => {
      saveManager.recordLoss();
    });

    const unsubRecordWin = eventBroker.subscribe("RECORD_WIN", () => {
      saveManager.recordWin();
    });

    const unsubSessionReset = eventBroker.subscribe("SESSION_RESET", () => {
      useSessionStore.getState().setGameResult("PLAYING");
    });

    return () => {
      unsubHurt();
      unsubHealed();
      unsubSession();
      unsubStateProjected();
      unsubGameOver();
      unsubVictory();
      unsubRecordLoss();
      unsubRecordWin();
      unsubSessionReset();
      engine.cleanup();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const unsub = useSessionStore.subscribe((state) => {
      if (!engineRef.current) return;
      const isPlaying = state.currentScreen === "PLAYING";
      engineRef.current.isPaused = !isPlaying;
      inputProvider.setActive(isPlaying);
    });

    const isPlaying = useSessionStore.getState().currentScreen === "PLAYING";
    engine.isPaused = !isPlaying;
    inputProvider.setActive(isPlaying);

    return () => unsub();
  }, []);

  const tickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (gameResult === "PLAYING") {
      queueMicrotask(() => {
        setStagger(0);
        setDisplayWins(0);
        setDisplayLosses(0);
      });
      return;
    }

    const t1 = setTimeout(() => {
      setStagger(1);
      soundSynth.playMenuConfirm();
    }, 200);

    const t2 = setTimeout(() => {
      setStagger(2);
      eventBroker.publish("CAMERA_SHAKE", { amplitude: 10, duration: 0.2 });
      if (gameResult === "VICTORY") {
        soundSynth.playHealComplete();
        if (soundSynth.playCrowdVictory) {
          soundSynth.playCrowdVictory();
        }
      } else {
        soundSynth.playHealCancel();
        if (soundSynth.playCrowdDefeat) {
          soundSynth.playCrowdDefeat();
        }
      }
    }, 750);

    const t3 = setTimeout(() => {
      setStagger(3);

      const startTickTimeout = setTimeout(() => {
        const slotIdx = saveManager.getCurrentSlotIndex();
        const slot = slotIdx !== -1 ? saveManager.getSlot(slotIdx) : null;
        const targetWins = slot ? slot.wins : 0;
        const targetLosses = slot ? slot.losses : 0;

        let currentW = 0;
        let currentL = 0;

        const getDelay = (current: number, target: number) => {
          if (target <= 1) return 180;
          const progress = current / target;
          const minDelay = 25;
          const maxDelay = 260;
          return minDelay + (maxDelay - minDelay) * Math.pow(progress, 2);
        };

        const tickWins = () => {
          if (currentW < targetWins) {
            const delay = getDelay(currentW, targetWins);
            currentW++;
            setDisplayWins(currentW);
            soundSynth.playSelectTick();
            tickTimeoutRef.current = setTimeout(tickWins, delay);
          } else {
            tickTimeoutRef.current = setTimeout(tickLosses, 150);
          }
        };

        const tickLosses = () => {
          if (currentL < targetLosses) {
            const delay = getDelay(currentL, targetLosses);
            currentL++;
            setDisplayLosses(currentL);
            soundSynth.playSelectTick();
            tickTimeoutRef.current = setTimeout(tickLosses, delay);
          } else {
            setStagger(4);
            soundSynth.playDashRecharge();
          }
        };

        if (targetWins > 0) {
          tickWins();
        } else {
          tickLosses();
        }
      }, 900);

      tickTimeoutRef.current = startTickTimeout;
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (tickTimeoutRef.current) {
        clearTimeout(tickTimeoutRef.current);
      }
    };
  }, [gameResult]);

  useEffect(() => {
    if (gameResult === "PLAYING") return;

    let cleanupFn: (() => void) | undefined = undefined;

    const delayTimeout = setTimeout(() => {
      const confettiCanvas = document.getElementById("confetti-canvas") as HTMLCanvasElement | null;
      if (confettiCanvas) {
        const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });

        if (gameResult === "VICTORY") {
          const fireConfetti = () => {
            myConfetti({
              particleCount: 360,
              spread: 80,
              origin: { y: 0.55, x: 0.5 },
              colors: ["#22c55e", "#4ade80", "#86efac", "#ffffff"]
            });
            myConfetti({
              particleCount: 200,
              spread: 45,
              angle: 135,
              origin: { y: 0.55, x: 0.5 },
              colors: ["#22c55e", "#4ade80", "#86efac", "#ffffff"]
            });
            myConfetti({
              particleCount: 200,
              spread: 45,
              angle: 45,
              origin: { y: 0.55, x: 0.5 },
              colors: ["#22c55e", "#4ade80", "#86efac", "#ffffff"]
            });
          };

          fireConfetti();
          const intervalId = setInterval(fireConfetti, 3000);

          let rainIndex = 0;
          const victoryColors = ["#22c55e", "#4ade80", "#86efac", "#ffffff"];
          const rainIntervalId = setInterval(() => {
            for (let k = 0; k < 24; k++) {
              const xCoord = 0.32 + ((rainIndex + k) % 8) * 0.05 + (Math.random() - 0.5) * 0.03;
              const randomColor = victoryColors[Math.floor(Math.random() * victoryColors.length)];
              myConfetti({
                particleCount: 1,
                angle: 270 + (Math.random() - 0.5) * 10,
                spread: 15,
                startVelocity: 14 + Math.random() * 8,
                decay: 0.95,
                gravity: 0.85,
                origin: {
                  y: 0.55,
                  x: Math.max(0.01, Math.min(0.99, xCoord))
                },
                colors: [randomColor]
              });
            }
            rainIndex = (rainIndex + 1) % 8;
          }, 120);

          cleanupFn = () => {
            clearInterval(intervalId);
            clearInterval(rainIntervalId);
            myConfetti.reset();
          };
        } else if (gameResult === "GAMEOVER") {
          let laneIndex = 0;
          const NUM_LANES = 8;
          const defeatColors = ["#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"];
          
          const intervalId = setInterval(() => {
            for (let k = 0; k < 30; k++) {
              const currentLane = (laneIndex + k) % NUM_LANES;
              const xCoord = (currentLane / (NUM_LANES - 1)) * 0.9 + 0.05 + (Math.random() - 0.5) * 0.05;
              const randomColor = defeatColors[Math.floor(Math.random() * defeatColors.length)];
              
              myConfetti({
                particleCount: 1,
                angle: 270 + (Math.random() - 0.5) * 10,
                spread: 15,
                startVelocity: 14 + Math.random() * 8,
                decay: 0.95,
                gravity: 0.85,
                scalar: 0.65 + Math.random() * 0.3,
                origin: { 
                  y: -0.15,
                  x: Math.max(0.01, Math.min(0.99, xCoord)) 
                },
                colors: [randomColor]
              });
            }
            laneIndex = (laneIndex + 3) % NUM_LANES;
          }, 120);

          cleanupFn = () => {
            clearInterval(intervalId);
            myConfetti.reset();
          };
        }
      }
    }, 750);

    return () => {
      clearTimeout(delayTimeout);
      if (cleanupFn) cleanupFn();
    };
  }, [gameResult]);

  const initialRetryCountRef = useRef(retryCount);

  useEffect(() => {
    if (currentScreen === "PLAYING" && retryCount > initialRetryCountRef.current) {
      engineRef.current?.reset();
    }
  }, [retryCount, currentScreen]);

  return (
    <div className="w-full" style={{ display: "flex", flexDirection: "column", flexGrow: 1, minHeight: 0 }}>
      <div
        style={{ flexGrow: 1, position: "relative", display: "flex", width: "100%", overflow: "hidden", minHeight: 0 }}
      >
        <div
          style={{
            position: "relative",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            maxHeight: "100%",
            aspectRatio: "1/1",
            width: "100%",
            height: "100%",
          }}
        >
          <canvas
            ref={canvasRef}
            width={1000}
            height={1000}
            className="crt-scanlines crt-flicker"
            style={{
              background: "#07080b",
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "16px",
              overflow: "hidden"
            }}
          />

          <div className="vignette-overlay" style={{ borderRadius: "16px" }} />

          {gameResult !== "PLAYING" && stagger >= 1 && (
            <div 
              className="absolute inset-0 bg-black/94 backdrop-blur-md flex flex-col items-center justify-center z-[99] p-3 sm:p-6 animate-overlay-fade-in opacity-0 will-change-opacity"
              style={{ borderRadius: "16px", overflow: "hidden" }}
            >
              <canvas id="confetti-canvas" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />
              <AnimatePresence>
                <motion.div
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={\`flex flex-col items-center justify-center p-4 max-w-[440px] w-[90%] text-center neo-elevated border-2 transition-all duration-300 rounded-[20px] bg-[#0c0e12]/96 max-h-[750px]:p-6 max-h-[560px]:p-3 max-[768px]:p-6 max-[380px]:p-3 \${gameResult === "GAMEOVER" ? "border-red-500/35 shadow-[0_0_30px_rgba(239,68,68,0.15),_inset_0_0_20px_rgba(239,68,68,0.1)]" : "border-green-500/35 shadow-[0_0_30px_rgba(34,197,94,0.15),_inset_0_0_20px_rgba(34,197,94,0.1)]"}\`}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  style={{ position: "relative", zIndex: 2 }}
                >
                  <AnimatePresence mode="wait">
                    {stagger >= 2 && (
                      <motion.div
                        key="title-section"
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="flex flex-col items-center justify-center"
                      >
                        {gameResult === "GAMEOVER" ? (
                          <div className="flex flex-col items-center justify-center">
                            <Skull
                              size={64}
                              className="defeat-icon-anim w-16 h-16 mb-4 max-h-[750px]:w-11 max-h-[750px]:h-11 max-h-[750px]:mb-2 max-h-[560px]:w-8 max-h-[560px]:h-8 max-h-[560px]:mb-1 max-[768px]:w-11 max-[768px]:h-11 max-[768px]:mb-2 max-[380px]:w-8 max-[380px]:h-8 max-[380px]:mb-1"
                              style={{ color: "var(--signal-red)" }}
                            />
                            <h1 className="defeat-title-anim text-3xl font-bold leading-none max-[768px]:text-2xl max-h-[750px]:text-2xl max-[380px]:text-lg max-h-[560px]:text-lg" style={{ color: "var(--signal-red)" }}>
                              DEFEATED
                            </h1>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <Trophy
                              size={64}
                              className="victory-icon-anim w-16 h-16 mb-4 max-h-[750px]:w-11 max-h-[750px]:h-11 max-h-[750px]:mb-2 max-h-[560px]:w-8 max-h-[560px]:h-8 max-h-[560px]:mb-1 max-[768px]:w-11 max-[768px]:h-11 max-[768px]:mb-2 max-[380px]:w-8 max-[380px]:h-8 max-[380px]:mb-1"
                              style={{ color: "var(--signal-green)" }}
                            />
                            <h1 className="victory-title-anim text-3xl font-bold leading-none max-[768px]:text-2xl max-h-[750px]:text-2xl max-[380px]:text-lg max-h-[560px]:text-lg" style={{ color: "var(--signal-green)" }}>
                              VICTORY
                            </h1>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {stagger >= 3 && (
                      <motion.div
                        key="stats-section"
                        initial={{ opacity: 0, height: 0, y: 15 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 24 }}
                        className="w-full mt-6 p-4 max-h-[750px]:mt-3 max-h-[750px]:p-2 max-h-[750px]:gap-1 max-h-[560px]:mt-2 max-h-[560px]:p-1 bg-[#07080b]/60 border border-white/3 rounded-lg flex flex-col gap-2.5 max-[768px]:mt-3 max-[768px]:p-2 max-[768px]:gap-1.5 max-[380px]:mt-2 max-[380px]:p-1.5 max-[380px]:gap-1 overflow-hidden"
                      >
                        <div className="flex items-center gap-2 justify-center text-slate-400">
                          <BarChart2 size={14} />
                          <span className="text-[11px] font-bold tracking-widest uppercase">
                            SAVE SLOT PERFORMANCE
                          </span>
                        </div>
                        <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", width: "100%" }} />
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-600 font-bold tracking-wider max-[768px]:text-[11px] max-h-[750px]:text-[11px] max-[380px]:text-[10px] max-h-[560px]:text-[10px]">TOTAL WINS</span>
                          <span className="text-lg font-bold font-mono max-[768px]:text-sm max-h-[750px]:text-sm max-[380px]:text-xs max-h-[560px]:text-xs text-green-500">{displayWins}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-600 font-bold tracking-wider max-[768px]:text-[11px] max-h-[750px]:text-[11px] max-[380px]:text-[10px] max-h-[560px]:text-[10px]">TOTAL LOSSES</span>
                          <span className="text-lg font-bold font-mono max-[768px]:text-sm max-h-[750px]:text-sm max-[380px]:text-xs max-h-[560px]:text-xs text-red-500">{displayLosses}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {stagger >= 3 && (
                      <motion.div
                        key="buttons-section"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.3 }}
                        style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
                      >
                        <div className="h-px w-[60px] bg-white/8 my-6 max-h-[750px]:my-3 max-h-[560px]:my-2 max-[768px]:my-3 max-[380px]:my-2" />

                        <div className="flex flex-row gap-4 w-full justify-center max-[768px]:gap-2.5 max-h-[750px]:gap-2.5 max-[380px]:gap-2 max-h-[560px]:gap-2">
                          <button
                            onClick={() => {
                              resetGameSession();
                              navTo("PLAYING");
                            }}
                            onMouseEnter={() => {
                              playHoverTick();
                              setMenuIndex(0);
                            }}
                            className={\`neo-btn flex-1 !p-2 sm:!p-3 md:!p-4 !text-[11px] sm:!text-xs md:!text-sm !rounded-md md:!rounded-lg flex items-center justify-center !gap-1.5 sm:!gap-2 !tracking-wider !h-auto !min-h-0 \${menuIndex === 0 ? "neo-btn-focused" : ""}\`}
                            style={
                              gameResult === "GAMEOVER" && menuIndex === 0
                                ? {
                                    color: "var(--signal-red)",
                                    borderColor: "rgba(239, 68, 68, 0.25)",
                                    textShadow: "0 0 8px var(--signal-red-glow)",
                                  }
                                : {}
                            }
                          >
                            <span
                              className="inline-block font-mono font-bold animate-pulse text-sm max-[768px]:text-xs max-h-[750px]:text-xs max-[380px]:text-[11px] max-h-[560px]:text-[11px]"
                              style={{
                                marginRight: "6px",
                                visibility: menuIndex === 0 ? "visible" : "hidden",
                                color: gameResult === "GAMEOVER" ? "var(--signal-red)" : undefined,
                              }}
                            >
                              ▶
                            </span>
                            <RotateCcw size={16} style={{ flexShrink: 0 }} />
                            RETRY
                            <span
                              className="inline-block font-mono font-bold animate-pulse text-sm max-[768px]:text-xs max-h-[750px]:text-xs max-[380px]:text-[11px] max-h-[560px]:text-[11px]"
                              style={{
                                marginLeft: "6px",
                                visibility: menuIndex === 0 ? "visible" : "hidden",
                                color: gameResult === "GAMEOVER" ? "var(--signal-red)" : undefined,
                              }}
                            >
                              ◀
                            </span>
                          </button>
                          <button
                            onClick={() => navTo("TITLE")}
                            onMouseEnter={() => {
                              playHoverTick();
                              setMenuIndex(1);
                            }}
                            className={\`neo-btn flex-1 !p-2 sm:!p-3 md:!p-4 !text-[11px] sm:!text-xs md:!text-sm !rounded-md md:!rounded-lg flex items-center justify-center !gap-1.5 sm:!gap-2 !tracking-wider !h-auto !min-h-0 \${menuIndex === 1 ? "neo-btn-focused" : ""}\`}
                            style={
                              gameResult === "GAMEOVER" && menuIndex === 1
                                ? {
                                    color: "var(--signal-red)",
                                    borderColor: "rgba(239, 68, 68, 0.25)",
                                    textShadow: "0 0 8px var(--signal-red-glow)",
                                  }
                                : {}
                            }
                          >
                            <span
                              className="inline-block font-mono font-bold animate-pulse text-sm max-[768px]:text-xs max-h-[750px]:text-xs max-[380px]:text-[11px] max-h-[560px]:text-[11px]"
                              style={{
                                marginRight: "6px",
                                visibility: menuIndex === 1 ? "visible" : "hidden",
                                color: gameResult === "GAMEOVER" ? "var(--signal-red)" : undefined,
                              }}
                            >
                              ▶
                            </span>
                            <Home size={16} style={{ flexShrink: 0 }} />
                            MENU
                            <span
                              className="inline-block font-mono font-bold animate-pulse text-sm max-[768px]:text-xs max-h-[750px]:text-xs max-[380px]:text-[11px] max-h-[560px]:text-[11px]"
                              style={{
                                marginLeft: "6px",
                                visibility: menuIndex === 1 ? "visible" : "hidden",
                                color: gameResult === "GAMEOVER" ? "var(--signal-red)" : undefined,
                              }}
                            >
                              ◀
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`,"src/components/HudPanel.tsx":`import { useEffect, useRef, useState } from "react";
import { eventBroker } from "@/core/eventBroker";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Skull, AlertTriangle } from "lucide-react";
import { useTutorialStore } from "@/store/useTutorialStore";
import { settingsManager } from "@/core/SettingsManager";
import { useGameplayStore, useSessionStore } from "@/store/useGameStore";
import { Action } from "@/core/InputProvider";
import { soundSynth } from "@/core/SoundSynth";
import { inputProvider } from "@/core/InputProvider";
import { UNITS } from "@/core/Units";

interface HudPanelProps {
  isTouchDevice: boolean;
  isPlayingScreen: boolean;
}

// Subcomponent: Player HP Display (LED Dots)
function PlayerHpDisplay({ isTouchDevice }: { isTouchDevice: boolean }) {
  const playerHP = useGameplayStore((state) => state.playerHP);
  const gameResult = useSessionStore((state) => state.gameResult);
  const isGameOver = gameResult !== "PLAYING";
  const activeHP = isGameOver ? 0 : playerHP;

  const prevHpRef = useRef(activeHP);
  const [animationClasses, setAnimationClasses] = useState<string[]>(Array(UNITS.PLAYER_MAX_HP).fill(""));

  useEffect(() => {
    const prevHP = prevHpRef.current;
    if (activeHP !== prevHP) {
      const tookDamage = activeHP < prevHP && prevHP !== -1 && !isGameOver;
      const healed = activeHP > prevHP && prevHP !== -1 && !isGameOver;

      if (soundSynth.initialized) {
        soundSynth.setLowHPStatus(activeHP === 1 && !isGameOver);
      }

      const nextCls = Array<string>(UNITS.PLAYER_MAX_HP).fill("");
      for (let i = 0; i < UNITS.PLAYER_MAX_HP; i++) {
        if (tookDamage && i === activeHP) {
          nextCls[i] = "led-shaking-die";
        } else if (healed && i === activeHP - 1) {
          nextCls[i] = "led-elastic-spring";
        } else if (tookDamage && i < activeHP) {
          nextCls[i] = "led-spring-impact";
        }
      }
      setAnimationClasses(nextCls);
      prevHpRef.current = activeHP;

      const timer = setTimeout(() => {
        setAnimationClasses(Array(UNITS.PLAYER_MAX_HP).fill(""));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeHP, isGameOver]);

  const lowHpStress = activeHP === 1 && !isGameOver;

  if (isTouchDevice) {
    return (
      <div id="hud-m-hp-group" className={lowHpStress ? "hud-stress-shiver" : ""} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={{ fontSize: "10px", color: "var(--signal-green)", fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px" }}>
          <Heart size={10} fill="var(--signal-green)" style={{ flexShrink: 0 }} /> HP
        </span>
        <div className="flex-row" style={{ gap: "3px" }}>
          {[...Array(UNITS.PLAYER_MAX_HP)].map((_, i) => {
            const isLit = i < activeHP;
            return (
              <div
                key={i}
                id={\`hud-m-php-\${i}\`}
                className={\`led-dot \${isLit ? "led-green" : ""} \${animationClasses[i]}\`}
                style={{
                  width: "8px",
                  height: "8px",
                  border: "1px solid rgba(0,0,0,0.5)",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div id="hud-d-hp-group" className={\`hud-panel-block \${lowHpStress ? "hud-stress-shiver" : ""}\`} style={{ gap: "4px", position: "relative" }}>
      <span className="hud-panel-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Heart size={14} fill="var(--signal-green)" style={{ color: "var(--signal-green)", flexShrink: 0 }} />
        PLAYER HP
      </span>
      <div style={{ display: "grid", gridTemplateColumns: \`repeat(\${UNITS.PLAYER_MAX_HP}, 10px)\`, gap: "6px", alignItems: "center" }}>
        {[...Array(UNITS.PLAYER_MAX_HP)].map((_, i) => {
          const isLit = i < activeHP;
          return (
            <div
              key={i}
              id={\`hud-d-php-\${i}\`}
              className={\`led-dot \${isLit ? "led-green" : ""} \${animationClasses[i]}\`}
              style={{
                border: "1px solid rgba(0,0,0,0.5)",
                width: "100%",
                height: "10px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Subcomponent: Healing charges & Determination bar
interface HealingAndDeterminationProps {
  isTouchDevice: boolean;
  isPlayingScreen: boolean;
  tutorialStep: number;
}

function HealingAndDetermination({
  isTouchDevice,
  isPlayingScreen,
  tutorialStep,
}: HealingAndDeterminationProps) {
  const healingCharges = useGameplayStore((state) => state.healingCharges);
  const determination = useGameplayStore((state) => state.determination);
  const gameResult = useSessionStore((state) => state.gameResult);
  const isGameOver = gameResult !== "PLAYING";

  const activeHealCharges = isGameOver ? 0 : healingCharges;
  const activeDet = isGameOver ? 0 : determination;

  const prevChargesRef = useRef(activeHealCharges);
  const [chargeAnims, setChargeAnims] = useState<string[]>(Array(3).fill(""));

  useEffect(() => {
    const prev = prevChargesRef.current;
    if (activeHealCharges !== prev) {
      const gained = activeHealCharges > prev && prev !== -1;
      const nextCls = Array<string>(3).fill("");
      for (let i = 0; i < 3; i++) {
        if (gained && i === activeHealCharges - 1) {
          nextCls[i] = "led-elastic-spring";
        }
      }
      setChargeAnims(nextCls);
      prevChargesRef.current = activeHealCharges;
      const timer = setTimeout(() => {
        setChargeAnims(Array(3).fill(""));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeHealCharges]);

  const isOverflow = activeHealCharges === 3;
  const detWidth = (activeDet / 5) * 100 + "%";

  if (isTouchDevice) {
    return (
      <>
        <div style={{ display: "flex", gap: "2px", marginLeft: "2px" }}>
          {[...Array(3)].map((_, i) => {
            const isLit = i < activeHealCharges;
            return (
              <div
                key={i}
                id={\`hud-m-heal-\${i}\`}
                className={\`led-dot \${isLit ? "led-yellow" : ""} \${isOverflow ? "led-overflow-wobble" : ""} \${chargeAnims[i]}\`}
                style={{
                  width: "4px",
                  height: "4px",
                  background: isLit ? undefined : "#07080b",
                }}
              />
            );
          })}
        </div>
        <div
          id="hud-m-det-container"
          className="neo-pressed"
          style={{
            width: "36px",
            height: "6px",
            borderRadius: "3px",
            padding: "1px",
            boxSizing: "border-box",
            overflow: "hidden",
            background: "#07080b",
            marginLeft: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            id="hud-m-det-bar"
            style={{
              height: "100%",
              borderRadius: "1.5px",
              width: detWidth,
              transition: "width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2)",
              background: "hsl(280, 80%, 65%)",
              boxShadow: "0 0 4px rgba(168, 85, 24, 0.8)",
            }}
          />
        </div>
      </>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 10px)", gap: "6px", alignItems: "center", marginTop: "1px", position: "relative" }}>
      <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        {[...Array(3)].map((_, i) => {
          const isLit = i < activeHealCharges;
          return (
            <div
              key={i}
              id={\`hud-d-heal-\${i}\`}
              className={\`led-dot \${isLit ? "led-yellow" : ""} \${isOverflow ? "led-overflow-wobble" : ""} \${chargeAnims[i]}\`}
              style={{
                border: "1px solid rgba(0,0,0,0.5)",
                width: "10px",
                height: "10px",
                borderRadius: "25%",
              }}
            />
          );
        })}
      </div>
      <div
        id="hud-d-det-container"
        className={\`neo-pressed \${isPlayingScreen && tutorialStep === 4 ? "det-pulse-highlight" : ""}\`}
        style={{
          gridColumn: "span 3",
          width: "100%",
          height: "10px",
          borderRadius: "2.5px",
          padding: "1px",
          boxSizing: "border-box",
          overflow: "hidden",
          background: "#07080b",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease"
        }}
      >
        <div
          id="hud-d-det-bar"
          style={{
            height: "100%",
            borderRadius: "1.5px",
            width: detWidth,
            transition: "width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2)",
            background: "hsl(280, 80%, 65%)",
            boxShadow: "0 0 4px rgba(168, 85, 247, 0.8)",
          }}
        />
      </div>
      {isPlayingScreen && tutorialStep === 4 && (
        <div
          style={{
            position: "absolute",
            left: "calc(50px + 36px)",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            animation: "crt-pulse 1.2s infinite alternate",
            whiteSpace: "nowrap"
          }}
        >
          <span
            style={{
              fontSize: "8px",
              color: "hsl(280, 100%, 75%)",
              fontWeight: "bold",
              letterSpacing: "0.05em"
            }}
          >
            ◄ STRIKE ENEMIES TO CHARGE
          </span>
        </div>
      )}
    </div>
  );
}

// Subcomponent: Boss HP Bar
function BossHpBar({ isTouchDevice }: { isTouchDevice: boolean }) {
  const bossHP = useGameplayStore((state) => state.bossHP);
  const gameResult = useSessionStore((state) => state.gameResult);
  const isGameOver = gameResult !== "PLAYING";
  const activeBHP = isGameOver ? 0 : bossHP;

  const bossWidth = Math.max(0, Math.min(100, (activeBHP / UNITS.BOSS_MAX_HP) * 100)) + "%";

  if (isTouchDevice) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "10px", color: "var(--signal-red)", fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px" }}>
          BOSS
        </span>
        <div
          id="hud-m-boss-container"
          className="neo-pressed"
          style={{
            width: "80px",
            height: "8px",
            borderRadius: "3px",
            padding: "1px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            id="hud-m-boss-bar"
            className={activeBHP > 0 ? "led-red" : ""}
            style={{
              height: "100%",
              borderRadius: "1.5px",
              width: bossWidth,
              transition: "width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2)",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="hud-panel-block" style={{ alignItems: "flex-end" }}>
      <span className="hud-panel-title hud-panel-title-red" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Skull size={14} style={{ color: "var(--signal-red)", flexShrink: 0 }} />
        
        BOSS HP
      </span>
      <div
        id="hud-d-boss-container"
        className="neo-pressed"
        style={{
          width: "160px",
          height: "10px",
          borderRadius: "4px",
          padding: "1px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          id="hud-d-boss-bar"
          className={activeBHP > 0 ? "led-red" : ""}
          style={{
            height: "100%",
            borderRadius: "2px",
            width: bossWidth,
            transition: "width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2)",
          }}
        />
      </div>
    </div>
  );
}

export function HudPanel({ isTouchDevice, isPlayingScreen }: HudPanelProps) {
  const [bannerText, setBannerText] = useState<string | null>(null);
  const phaseRef = useRef(1);
  const [isHurtShaking, setIsHurtShaking] = useState(false);

  const { tutorialStep, calibratedKeys, setTutorialStep, calibrateKey, resetTutorial } = useTutorialStore();

  const retryCount = useSessionStore((state) => state.retryCount);
  const currentScreen = useSessionStore((state) => state.currentScreen);

  useEffect(() => {
    const unsubPhase = eventBroker.subscribe("BOSS_PHASE_SHIFT", () => {
      phaseRef.current += 1;
      setBannerText(\`PHASE \${phaseRef.current}\`);
      setTimeout(() => {
        setBannerText(null);
      }, 2800);
    });

    const unsubHurt = eventBroker.subscribe("PLAYER_HURT", () => {
      setIsHurtShaking(true);
      setTimeout(() => setIsHurtShaking(false), 180);
    });

    return () => {
      unsubPhase();
      unsubHurt();
    };
  }, []);

  useEffect(() => {
    if (currentScreen === "PLAYING" && !isTouchDevice) {
      resetTutorial();
    }
  }, [currentScreen, retryCount, isTouchDevice, resetTutorial]);

  useEffect(() => {
    if (isTouchDevice && tutorialStep < 5) {
      setTutorialStep(5);
    }
  }, [isTouchDevice, tutorialStep, setTutorialStep]);

  useEffect(() => {
    if (!isPlayingScreen || isTouchDevice || tutorialStep !== 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap = settingsManager.getKeyMap();
      for (const act of Object.keys(keyMap) as Action[]) {
        if (keyMap[act]?.includes(e.code) || keyMap[act]?.includes(e.key)) {
          if (!calibratedKeys[act]) {
            calibrateKey(act);
            soundSynth.playSelectTick();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlayingScreen, isTouchDevice, tutorialStep, calibratedKeys, calibrateKey]);

  useEffect(() => {
    if (!isPlayingScreen || isTouchDevice || tutorialStep !== 0) return;

    const allCalibrated = Object.values(calibratedKeys).every((v) => v);
    if (allCalibrated) {
      soundSynth.playHealComplete();
      setTutorialStep(1);
    }
  }, [isPlayingScreen, isTouchDevice, tutorialStep, calibratedKeys, setTutorialStep]);

  useEffect(() => {
    if (!isPlayingScreen || isTouchDevice) return;

    const unsubs: (() => void)[] = [];

    unsubs.push(
      eventBroker.subscribe("PLAYER_DASHED", () => {
        if (tutorialStep === 1 && inputProvider.isPressed("MOVE_UP")) {
          soundSynth.playHealComplete();
          setTutorialStep(2);
        }
      })
    );

    unsubs.push(
      eventBroker.subscribe("PLAYER_PROJECTILE_FIRED", ({ level }) => {
        if (tutorialStep === 2 && level === 2) {
          soundSynth.playHealComplete();
          setTutorialStep(3);
        }
      })
    );

    unsubs.push(
      eventBroker.subscribe("PLAYER_DROPPED", () => {
        if (tutorialStep === 3) {
          soundSynth.playHealComplete();
          setTutorialStep(4);
        }
      })
    );

    unsubs.push(
      eventBroker.subscribe("PLAYER_HEALED", () => {
        if (tutorialStep === 4) {
          soundSynth.playHealComplete();
          setTutorialStep(5);
        }
      })
    );

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [isPlayingScreen, isTouchDevice, tutorialStep, setTutorialStep]);

  useEffect(() => {
    if (isPlayingScreen && !isTouchDevice && tutorialStep === 4) {
      const state = useGameplayStore.getState();
      if (state.healingCharges === 0) {
        state.setHealingCharges(3);
      }
    }
  }, [isPlayingScreen, isTouchDevice, tutorialStep]);

  const getActionKeyDisplay = (action: Action): string => {
    const keys = settingsManager.getKeyMap()[action] || [];
    const rawKey = keys[0] || "";
    
    if (rawKey === "Space") return "X";
    if (rawKey === "ArrowLeft") return "◄";
    if (rawKey === "ArrowRight") return "►";
    if (rawKey === "ArrowUp") return "▲";
    if (rawKey === "ArrowDown") return "▼";
    if (rawKey === "Period") return ".";
    if (rawKey === "Comma") return ",";
    if (rawKey === "Slash") return "/";
    if (rawKey === "KeyA") return "A";
    if (rawKey === "KeyW") return "W";
    if (rawKey === "KeyS") return "S";
    if (rawKey === "KeyD") return "D";
    if (rawKey === "KeyZ") return "Z";
    if (rawKey === "KeyX") return "X";
    if (rawKey === "KeyC") return "C";
    
    return rawKey.replace(/^Key/, "").toUpperCase();
  };

  if (isTouchDevice) {
    return (
      <div
        className={\`cabinet-status-panel neo-pressed \${isHurtShaking ? "hud-shaking" : ""}\`}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 12px",
          height: "36px",
          marginBottom: "4px",
          boxSizing: "border-box",
          flexShrink: 0,
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <PlayerHpDisplay isTouchDevice={isTouchDevice} />
          <HealingAndDetermination
            isTouchDevice={isTouchDevice}
            isPlayingScreen={isPlayingScreen}
            tutorialStep={tutorialStep}
          />
        </div>

        <AnimatePresence mode="wait">
          {bannerText ? (
            <motion.span
              key="phase-warning-touch"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              style={{
                fontSize: "11px",
                color: "var(--signal-yellow)",
                fontWeight: "bold",
                letterSpacing: "0.12em",
                textShadow: "0 0 6px var(--signal-yellow-glow)",
                textTransform: "uppercase",
                background: "rgba(234, 179, 8, 0.15)",
                border: "1px solid rgba(234, 179, 8, 0.3)",
                padding: "4px 10px",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              <AlertTriangle size={11} style={{ marginRight: "4px", flexShrink: 0 }} /> {bannerText}
            </motion.span>
          ) : (
            <motion.span
              key="box-battle-touch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: "9px", color: "#718096", fontWeight: "bold", letterSpacing: "0.1em" }}
            >
              BOX BATTLE
            </motion.span>
          )}
        </AnimatePresence>

        <BossHpBar isTouchDevice={isTouchDevice} />
      </div>
    );
  }

  return (
    <div className={\`cabinet-status-panel neo-pressed \${isHurtShaking ? "hud-shaking" : ""}\`}>
      <div className="hud-panel-block" style={{ gap: "4px" }}>
        <PlayerHpDisplay isTouchDevice={isTouchDevice} />
        <HealingAndDetermination
          isTouchDevice={isTouchDevice}
          isPlayingScreen={isPlayingScreen}
          tutorialStep={tutorialStep}
        />
      </div>

      <div className="hud-panel-block" style={{ alignItems: "center", justifyContent: "center", minWidth: "350px", position: "relative" }}>
        <AnimatePresence mode="wait">
          {isPlayingScreen && bannerText ? (
            <motion.div
              key="phase-warning"
              initial={{ scale: 0.8, opacity: 0, y: -5 }}
              animate={{ scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 15 } }}
              exit={{ scale: 1.15, opacity: 0, transition: { duration: 0.15 } }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: "2px solid var(--signal-yellow)",
                background: "rgba(12, 13, 17, 0.98)",
                padding: "10px 28px",
                borderRadius: "10px",
                boxShadow: "0 0 20px rgba(234, 179, 8, 0.35), inset 0 0 10px rgba(234, 179, 8, 0.2)",
                color: "var(--signal-yellow)",
                fontWeight: "bold",
                textShadow: "0 0 8px var(--signal-yellow-glow)",
                letterSpacing: "0.15em",
                fontSize: "clamp(13px, 1.8vmin, 18px)",
                textTransform: "uppercase"
              }}
            >
              <AlertTriangle size={18} style={{ color: "var(--signal-yellow)", flexShrink: 0, animation: "crt-pulse 1s infinite alternate" }} />
              <span>WARNING: {bannerText}</span>
            </motion.div>
          ) : isPlayingScreen && tutorialStep < 5 ? (
            <motion.div
              key={\`tutorial-step-\${tutorialStep}\`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                border: "1px solid rgba(255, 255, 255, 0.03)",
                background: "rgba(7, 8, 11, 0.85)",
                padding: "8px 22px",
                borderRadius: "8px",
                boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.01), 0 4px 12px rgba(0, 0, 0, 0.75)",
                minWidth: "320px",
                justifyContent: "center"
              }}
            >
              {tutorialStep === 0 && (
                <>
                  <span style={{ fontSize: "10px", color: "var(--signal-yellow)", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    CALIBRATE CABINET MATRIX
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {(["DASH", "JUMP", "ATTACK"] as Action[]).map((act) => (
                        <div key={act} className={\`keycap-box \${calibratedKeys[act] ? "keycap-used" : ""}\`}>
                          {getActionKeyDisplay(act)}
                        </div>
                      ))}
                    </div>
                    <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ display: "flex", gap: "4px" }}>
                      {(["MOVE_LEFT", "MOVE_UP", "MOVE_DOWN", "MOVE_RIGHT"] as Action[]).map((act) => (
                        <div key={act} className={\`keycap-box \${calibratedKeys[act] ? "keycap-used" : ""}\`}>
                          {getActionKeyDisplay(act)}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {tutorialStep === 1 && (
                <>
                  <span style={{ fontSize: "10px", color: "var(--signal-green)", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    COMBO 1/4: UP DASH
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#e2e8f0" }}>
                    <span>HOLD</span>
                    <div className="keycap-box keycap-used">{getActionKeyDisplay("MOVE_UP")}</div>
                    <span>+ PRESS</span>
                    <div className="keycap-box keycap-used">{getActionKeyDisplay("DASH")}</div>
                  </div>
                </>
              )}

              {tutorialStep === 2 && (
                <>
                  <span style={{ fontSize: "10px", color: "var(--signal-green)", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    COMBO 2/4: CHARGE SHOT
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#e2e8f0" }}>
                    <span>HOLD</span>
                    <div className="keycap-box keycap-used">{getActionKeyDisplay("ATTACK")}</div>
                    <span>TO CHARGE, THEN RELEASE</span>
                  </div>
                </>
              )}

              {tutorialStep === 3 && (
                <>
                  <span style={{ fontSize: "10px", color: "var(--signal-green)", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    COMBO 3/4: ONE-WAY PLATFORM DROP
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#e2e8f0" }}>
                    <span>ON ONE-WAY PLATFORM, HOLD</span>
                    <div className="keycap-box keycap-used">{getActionKeyDisplay("MOVE_DOWN")}</div>
                    <span>+ PRESS</span>
                    <div className="keycap-box keycap-used">{getActionKeyDisplay("JUMP")}</div>
                  </div>
                </>
              )}

              {tutorialStep === 4 && (
                <>
                  <span style={{ fontSize: "10px", color: "var(--signal-green)", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    COMBO 4/4: DETERMINATION HEAL
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#e2e8f0" }}>
                    <span>ON SOLID PLATFORM, HOLD</span>
                    <div className="keycap-box keycap-used">{getActionKeyDisplay("MOVE_DOWN")}</div>
                    <span>+ PRESS</span>
                    <div className="keycap-box keycap-used">{getActionKeyDisplay("JUMP")}</div>
                  </div>
                </>
              )}
            </motion.div>
          ) : isPlayingScreen ? (
            <motion.div
              key="box-battle-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                border: "1px solid rgba(255, 255, 255, 0.03)",
                background: "rgba(7, 8, 11, 0.85)",
                padding: "8px 22px",
                borderRadius: "8px",
                boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.01), 0 4px 12px rgba(0, 0, 0, 0.75)",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: "rgba(34, 197, 94, 0.45)",
                  boxShadow: "0 0 6px rgba(34, 197, 94, 0.35)",
                }}
              />
              <span
                style={{
                  fontSize: "16px",
                  color: "rgba(34, 197, 94, 0.8)",
                  fontWeight: 900,
                  letterSpacing: "0.3em",
                  textShadow: "0 0 8px rgba(34, 197, 94, 0.35)",
                  textTransform: "uppercase",
                  lineHeight: "1",
                }}
              >
                BOX BATTLE
              </span>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: "rgba(34, 197, 94, 0.45)",
                  boxShadow: "0 0 6px rgba(34, 197, 94, 0.35)",
                }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <BossHpBar isTouchDevice={isTouchDevice} />
    </div>
  );
}
`,"src/components/TouchButton.tsx":`import { ReactNode, PointerEvent } from "react";
import { inputProvider, Action } from "@/core/InputProvider";

interface TouchButtonProps {
  action: Action;
  label: ReactNode;
  style?: React.CSSProperties;
}

export function TouchButton({ action, label, style }: TouchButtonProps) {
  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.pointerType === "touch") {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    inputProvider.triggerTouchStart(action);
  };

  const handlePointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputProvider.triggerTouchEnd(action);
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="neo-btn touch-action-btn"
      style={style}
    >
      {label}
    </button>
  );
}
`,"src/components/TouchOverlay.tsx":`import { TouchButton } from "./TouchButton";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ArrowUpToLine, Swords, Zap } from "lucide-react";

export function TouchOverlay() {
  return (
    <div className="touch-overlay-panel">
      <div className="touch-joystick-side">
        <TouchButton action="MOVE_LEFT" label={<ArrowLeft size={24} />} style={{ height: "100%" }} />
        <div className="touch-vertical-group">
          <TouchButton action="MOVE_UP" label={<ArrowUp size={20} />} style={{ flex: 1 }} />
          <TouchButton action="MOVE_DOWN" label={<ArrowDown size={20} />} style={{ flex: 1 }} />
        </div>
        <TouchButton action="MOVE_RIGHT" label={<ArrowRight size={24} />} style={{ height: "100%" }} />
      </div>

      <div className="touch-action-side">
        <TouchButton
          action="DASH"
          label={
            <div className="touch-label-inner">
              <Zap size={14} />
              <span>DASH</span>
            </div>
          }
          style={{
            flex: 1,
            borderColor: "var(--signal-yellow)",
            color: "var(--signal-yellow)",
          }}
        />
        <div className="touch-action-row">
          <TouchButton
            action="ATTACK"
            label={
              <div className="touch-label-inner">
                <Swords size={14} />
                <span>ATK/CHG</span>
              </div>
            }
            style={{ flex: 1, borderColor: "var(--signal-red)", color: "var(--signal-red)" }}
          />
          <TouchButton
            action="JUMP"
            label={
              <div className="touch-label-inner">
                <ArrowUpToLine size={14} />
                <span>JMP</span>
              </div>
            }
            style={{
              flex: 1,
              borderColor: "var(--signal-green)",
              color: "var(--signal-green)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
`,"src/components/cursor/Cursor.tsx":`import { useEffect, useState } from "react";
import { useMotionValue, motion } from "framer-motion";
import { useCursorStore } from "@/store/useCursorStore";
import { CURSOR_VARIANTS } from "./CursorVariants";
import { CursorLayer } from "./CursorLayer";

export function Cursor() {
  const cursorType = useCursorStore((state) => state.cursorType);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isSafari] = useState(() => {
    if (typeof window === "undefined") return false;
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("safari") && !ua.includes("chrome") && !ua.includes("android");
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handlePointerEnter = () => setIsVisible(true);
    const handlePointerLeave = () => setIsVisible(false);

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerenter", handlePointerEnter);
    document.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerenter", handlePointerEnter);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [mouseX, mouseY, isVisible]);

  const variant = CURSOR_VARIANTS[cursorType];

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
        width: 80,
        height: 80,
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: isSafari ? "normal" : variant.blendMode,
      }}
      className="[@media(pointer:coarse)]:hidden"
      animate={{
        opacity: isVisible && cursorType !== "hidden" ? 1 : 0,
      }}
      transition={{ duration: 0.25 }}
    >
      <CursorLayer cursorType={cursorType} isPressed={isPressed} />
    </motion.div>
  );
}
`,"src/components/cursor/CursorLayer.tsx":`import { motion, AnimatePresence } from "framer-motion";
import { CURSOR_VARIANTS } from "./CursorVariants";
import { CursorType } from "@/store/useCursorStore";
import { Eye, Play } from "lucide-react";

interface CursorLayerProps {
  cursorType: CursorType;
  isPressed: boolean;
}

export function CursorLayer({ cursorType, isPressed }: CursorLayerProps) {
  const variant = CURSOR_VARIANTS[cursorType];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0) 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
        animate={{
          width: (variant.bubbleSize > 0 && cursorType !== "text") ? variant.bubbleSize + 24 : 0,
          height: (variant.bubbleSize > 0 && cursorType !== "text") ? variant.bubbleSize + 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
      />

      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          borderRadius: "50%",
          backgroundColor: variant.bubbleBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 2,
        }}
        animate={{
          width: variant.bubbleSize,
          height: variant.bubbleSize,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
      >
        <AnimatePresence mode="wait">
          {cursorType === "view" && (
            <motion.div
              key="view-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Eye size={32} color={variant.color} />
            </motion.div>
          )}
          {cursorType === "view-small" && (
            <motion.div
              key="view-small-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Eye size={20} color={variant.color} />
            </motion.div>
          )}
          {cursorType === "play" && (
            <motion.div
              key="play-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Play size={32} fill={variant.color} color={variant.color} />
            </motion.div>
          )}
          {cursorType === "text" && (
            <motion.div
              key="text-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg width="26" height="26" viewBox="0 0 83 83" style={{ display: "block" }}>
                <path
                  fill="none"
                  stroke={variant.color}
                  strokeLinecap="round"
                  strokeWidth="4"
                  d="M43 71h11M43 12h11M25.5 71h11m-11-59h11m3.5 5v50"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {variant.isBase && (
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            x: -5.5,
            y: -3.2,
            zIndex: 3,
            pointerEvents: "none",
            transformOrigin: "5.5px 3.2px",
          }}
          animate={{
            scale: isPressed ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <svg width="24" height="24" viewBox="0 0 100 100" style={{ display: "block" }}>
            <path
              d="M22.917,13.375l51.333,51.333l-19.03,-3.781l14.863,23.031l-8.833,8.834l-14.863,-23.032l-4.387,27.198l-19.083,-83.583Z"
              fill={variant.color}
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
`,"src/components/cursor/CursorVariants.ts":`import { CursorType } from "@/store/useCursorStore";

export interface CursorVariantConfig {
  blendMode: "normal" | "difference" | "exclusion";
  color: string;
  isBase: boolean;
  bubbleSize: number;
  bubbleBg: string;
}

export const CURSOR_VARIANTS: Record<CursorType, CursorVariantConfig> = {
  default: {
    blendMode: "normal",
    color: "var(--signal-green)",
    isBase: true,
    bubbleSize: 0,
    bubbleBg: "transparent",
  },
  button: {
    blendMode: "normal",
    color: "var(--signal-green)",
    isBase: true,
    bubbleSize: 0,
    bubbleBg: "transparent",
  },
  view: {
    blendMode: "difference",
    color: "var(--signal-green)",
    isBase: false,
    bubbleSize: 80,
    bubbleBg: "#ffffff",
  },
  "view-small": {
    blendMode: "difference",
    color: "var(--signal-green)",
    isBase: false,
    bubbleSize: 48,
    bubbleBg: "#ffffff",
  },
  play: {
    blendMode: "exclusion",
    color: "var(--signal-green)",
    isBase: false,
    bubbleSize: 80,
    bubbleBg: "#ffffff",
  },
  video: {
    blendMode: "exclusion",
    color: "var(--signal-green)",
    isBase: false,
    bubbleSize: 80,
    bubbleBg: "#ffffff",
  },
  text: {
    blendMode: "normal",
    color: "hsl(142, 71%, 58%)",
    isBase: false,
    bubbleSize: 64,
    bubbleBg: "transparent",
  },
  grab: {
    blendMode: "normal",
    color: "var(--signal-green)",
    isBase: false,
    bubbleSize: 0,
    bubbleBg: "transparent",
  },
  hidden: {
    blendMode: "normal",
    color: "transparent",
    isBase: false,
    bubbleSize: 0,
    bubbleBg: "transparent",
  },
};
`,"src/components/menus/AudioScreen.css":`.mixer-board {
  width: 100%;
  max-width: 450px;
  padding: 24px;
  border-radius: 20px;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
}

.mixer-strip {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.mixer-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.12em;
  color: #718096;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}
`,"src/components/menus/AudioScreen.tsx":`import "./AudioScreen.css";
import { AudioSettings } from "@/core/SettingsManager";
import { Volume2, VolumeX, Music, Zap, RotateCcw } from "lucide-react";
import { MenuContainer, MenuHeader, MenuButton, MenuBackButton } from "./MenuPrimitives";

interface AudioScreenProps {
  audio: AudioSettings;
  menuIndex: number;
  handleVolumeChange: (field: keyof AudioSettings, value: number | boolean) => void;
  resetSettings: () => void;
  onBack: () => void;
  playHoverTick: () => void;
  setMenuIndex: (index: number) => void;
}

export function AudioScreen({
  audio,
  menuIndex,
  handleVolumeChange,
  resetSettings,
  onBack,
  playHoverTick,
  setMenuIndex,
}: AudioScreenProps) {
  return (
    <MenuContainer>
      <MenuHeader title="SOUND SETTINGS" subtitle="Adjust game sounds and music volume" />

      <div className="mixer-board neo-pressed">
        <div className="mixer-strip">
          <div className="mixer-header" style={{ color: menuIndex === 0 ? "#22c55e" : "#718096", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {audio.masterMuted ? (
                <VolumeX size={14} style={{ flexShrink: 0 }} />
              ) : (
                <Volume2 size={14} style={{ flexShrink: 0 }} />
              )}
              MAIN VOLUME
            </span>
            <span style={{ color: audio.masterMuted ? "#ef4444" : menuIndex === 0 ? "#22c55e" : "#4ade80", minWidth: "4.5rem", textAlign: "right", display: "inline-block", flexShrink: 0 }}>
              {audio.masterMuted ? "MUTED" : \`\${Math.round(audio.masterVolume * 100)}%\`}
            </span>
          </div>
          <div className="slider-row">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audio.masterVolume}
              onChange={(e) => handleVolumeChange("masterVolume", parseFloat(e.target.value))}
              disabled={audio.masterMuted}
              className="custom-range-slider"
              style={{
                filter: menuIndex === 0 ? "drop-shadow(0 0 2px rgba(34,197,94,0.4))" : "",
                background: \`linear-gradient(to right, var(--signal-green) 0%, var(--signal-green) \${audio.masterVolume * 100}%, var(--surface-bg) \${audio.masterVolume * 100}%, var(--surface-bg) 100%)\`,
              }}
            />
          </div>
        </div>

        <div className="mixer-strip">
          <div className="mixer-header" style={{ color: menuIndex === 1 ? "#22c55e" : "#718096", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Zap size={14} style={{ flexShrink: 0 }} />
              SOUND EFFECTS
            </span>
            <span style={{ color: audio.sfxMuted ? "#ef4444" : menuIndex === 1 ? "#22c55e" : "#4ade80", minWidth: "4.5rem", textAlign: "right", display: "inline-block", flexShrink: 0 }}>
              {audio.sfxMuted ? "MUTED" : \`\${Math.round(audio.sfxVolume * 100)}%\`}
            </span>
          </div>
          <div className="slider-row">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audio.sfxVolume}
              onChange={(e) => handleVolumeChange("sfxVolume", parseFloat(e.target.value))}
              disabled={audio.sfxMuted}
              className="custom-range-slider"
              style={{
                filter: menuIndex === 1 ? "drop-shadow(0 0 2px rgba(34,197,94,0.4))" : "",
                background: \`linear-gradient(to right, var(--signal-green) 0%, var(--signal-green) \${audio.sfxVolume * 100}%, var(--surface-bg) \${audio.sfxVolume * 100}%, var(--surface-bg) 100%)\`,
              }}
            />
          </div>
        </div>

        <div className="mixer-strip">
          <div className="mixer-header" style={{ color: menuIndex === 2 ? "#22c55e" : "#718096", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Music size={14} style={{ flexShrink: 0 }} />
              MUSIC
            </span>
            <span style={{ color: audio.musicMuted ? "#ef4444" : menuIndex === 2 ? "#22c55e" : "#4ade80", minWidth: "4.5rem", textAlign: "right", display: "inline-block", flexShrink: 0 }}>
              {audio.musicMuted ? "MUTED" : \`\${Math.round(audio.musicVolume * 100)}%\`}
            </span>
          </div>
          <div className="slider-row">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audio.musicVolume}
              onChange={(e) => handleVolumeChange("musicVolume", parseFloat(e.target.value))}
              disabled={audio.musicMuted}
              className="custom-range-slider"
              style={{
                filter: menuIndex === 2 ? "drop-shadow(0 0 2px rgba(34,197,94,0.4))" : "",
                background: \`linear-gradient(to right, var(--signal-green) 0%, var(--signal-green) \${audio.musicVolume * 100}%, var(--surface-bg) \${audio.musicVolume * 100}%, var(--surface-bg) 100%)\`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex-col" style={{ gap: "1.2vmin", width: "100%", maxWidth: "58vmin", marginTop: "1.5vmin" }}>
        <MenuButton
          variant="large"
          isFocused={menuIndex === 3}
          onFocused={() => setMenuIndex(3)}
          playHoverTick={playHoverTick}
          onClick={resetSettings}
          leftIcon={<RotateCcw size={14} style={{ flexShrink: 0 }} />}
          mainLabel="RESET ALL TO 100%"
        />

        <MenuBackButton
          isFocused={menuIndex === 4}
          onFocused={() => setMenuIndex(4)}
          playHoverTick={playHoverTick}
          onBack={onBack}
        />
      </div>
    </MenuContainer>
  );
}
`,"src/components/menus/ControlsScreen.css":`.binding-board {
  width: 100%;
  max-width: 600px;
  padding: 10px 14px;
  border-radius: 14px;
  margin: auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 16px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 44vh;
}

.binding-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  padding: 4px 2px;
  box-sizing: border-box;
  gap: 8px;
}

.binding-action-label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: bold;
  color: #718096;
  white-space: nowrap;
}

.binding-btn {
  width: 150px;
  max-width: 160px;
  height: 38px;
  padding: 0 4px !important;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 10px;
  border-radius: 6px;
  box-sizing: border-box;
}

.controls-notice {
  padding: 8px 16px;
  border-radius: 8px;
  background: rgba(168, 85, 247, 0.08);
  border: 1px solid rgba(168, 85, 247, 0.25);
  color: hsl(280, 80%, 75%);
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0 0 6px rgba(168, 85, 247, 0.35);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  white-space: nowrap;
}
`,"src/components/menus/ControlsScreen.tsx":`import "./ControlsScreen.css";
import { useState } from "react";
import { Action } from "@/core/InputProvider";
import { settingsManager } from "@/core/SettingsManager";
import { soundSynth } from "@/core/SoundSynth";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpCircle,
  Swords,
  Zap,
  Cpu,
  Keyboard,
  Sliders
} from "lucide-react";
import { MenuContainer, MenuHeader, MenuButton, MenuBackButton } from "./MenuPrimitives";

interface ControlsScreenProps {
  menuIndex: number;
  rebindTarget: { action: Action; index: number } | null;
  onBack: () => void;
  playHoverTick: () => void;
  setMenuIndex: (index: number) => void;
  setRebindTarget: (target: { action: Action; index: number } | null) => void;
  reloadSaveSlots: () => void;
}

function formatKeyDisplayName(code: string): string {
  if (!code) return "[ EMPTY ]";

  const upper = code.trim();
  if (upper === "Space") return "SPACE";
  if (upper === "ArrowLeft") return "LEFT";
  if (upper === "ArrowRight") return "RIGHT";
  if (upper === "ArrowUp") return "UP";
  if (upper === "ArrowDown") return "DOWN";
  if (upper === "Period") return ".";
  if (upper === "Comma") return ",";
  if (upper === "Slash") return "/";
  if (upper === "Backspace") return "BACKSPACE";
  if (upper === "Escape") return "ESC";

  return upper.replace(/^Key/, "");
}

function getActionIcon(action: Action) {
  switch (action) {
    case "MOVE_LEFT":
      return <ArrowLeft size={14} style={{ flexShrink: 0 }} />;
    case "MOVE_RIGHT":
      return <ArrowRight size={14} style={{ flexShrink: 0 }} />;
    case "MOVE_UP":
      return <ArrowUp size={14} style={{ flexShrink: 0 }} />;
    case "MOVE_DOWN":
      return <ArrowDown size={14} style={{ flexShrink: 0 }} />;
    case "JUMP":
      return <ArrowUpCircle size={14} style={{ flexShrink: 0 }} />;
    case "ATTACK":
      return <Swords size={14} style={{ flexShrink: 0 }} />;
    case "DASH":
      return <Zap size={14} style={{ flexShrink: 0 }} />;
    default:
      return null;
  }
}

export function ControlsScreen({
  menuIndex,
  rebindTarget,
  onBack,
  playHoverTick,
  setMenuIndex,
  setRebindTarget,
  reloadSaveSlots,
}: ControlsScreenProps) {
  const [isTouchDevice] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(pointer: coarse)").matches;
    }
    return false;
  });

  const handleRebindTrigger = (action: Action) => {
    if (isTouchDevice) {
      soundSynth.playErrorTick();
      return;
    }
    soundSynth.playHitConfirm();
    setRebindTarget({ action, index: 0 });
  };

  const backBtnIndex = isTouchDevice ? 0 : 10;

  return (
    <MenuContainer style={{ padding: "20px 0" }}>
      <MenuHeader title="CONTROLS" subtitle={isTouchDevice ? "Calibration Matrix" : "Change keyboard buttons"} />

      {isTouchDevice ? (
        <div
          className="mixer-board neo-pressed"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "32px",
            textAlign: "center",
            margin: "auto 0",
            width: "100%",
            maxWidth: "540px",
            borderColor: "rgba(234, 179, 8, 0.15)",
            boxSizing: "border-box",
          }}
        >
          <div className="led-dot led-yellow" style={{ width: "16px", height: "16px", marginBottom: "8px" }} />
          <span
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              color: "var(--signal-yellow)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            [ TOUCH INTERFACE CALIBRATION ]
          </span>
          <h3
            style={{
              fontSize: "16px",
              color: "#ffffff",
              margin: 0,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Bespoke Custom Touch Controls Coming Soon
          </h3>
          <p
            style={{
              fontSize: "11px",
              color: "#718096",
              lineHeight: "1.6",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              maxWidth: "380px",
              margin: 0,
            }}
          >
            Virtual joystick remapping, physical boundary calibration, and responsive gesture-mapping menus are
            currently under engineering.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-row" style={{ gap: "16px", width: "100%", maxWidth: "80vmin", marginTop: "auto", marginBottom: "auto" }}>
            <MenuButton
              variant="led"
              isFocused={menuIndex === 0}
              onFocused={() => setMenuIndex(0)}
              playHoverTick={playHoverTick}
              onClick={() => {
                settingsManager.setPreset("DEFAULT_1");
                soundSynth.playHitConfirm();
                reloadSaveSlots();
              }}
              leftIcon={<Keyboard size={16} style={{ flexShrink: 0 }} />}
              mainLabel="PRESET 1"
              showArrow={false}
              style={{
                flex: 1,
                height: "54px",
                padding: "0 16px",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor:
                  menuIndex === 0
                    ? "#22c55e"
                    : settingsManager.getCurrentPreset() === "DEFAULT_1"
                      ? "rgba(34, 197, 94, 0.4)"
                      : "",
                color:
                  menuIndex === 0 ? "#22c55e" : settingsManager.getCurrentPreset() === "DEFAULT_1" ? "#22c55e" : "",
              }}
            />

            <MenuButton
              variant="led"
              isFocused={menuIndex === 1}
              onFocused={() => setMenuIndex(1)}
              playHoverTick={playHoverTick}
              onClick={() => {
                settingsManager.setPreset("DEFAULT_2");
                soundSynth.playHitConfirm();
                reloadSaveSlots();
              }}
              leftIcon={<Cpu size={16} style={{ flexShrink: 0 }} />}
              mainLabel="PRESET 2"
              showArrow={false}
              style={{
                flex: 1,
                height: "54px",
                padding: "0 16px",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor:
                  menuIndex === 1
                    ? "#22c55e"
                    : settingsManager.getCurrentPreset() === "DEFAULT_2"
                      ? "rgba(34, 197, 94, 0.4)"
                      : "",
                color:
                  menuIndex === 1 ? "#22c55e" : settingsManager.getCurrentPreset() === "DEFAULT_2" ? "#22c55e" : "",
              }}
            />

            <MenuButton
              variant="led"
              isFocused={menuIndex === 2}
              onFocused={() => setMenuIndex(2)}
              playHoverTick={playHoverTick}
              onClick={() => {
                settingsManager.setPreset("CUSTOM");
                soundSynth.playHitConfirm();
                reloadSaveSlots();
              }}
              leftIcon={<Sliders size={16} style={{ flexShrink: 0 }} />}
              mainLabel="CUSTOM"
              showArrow={false}
              style={{
                flex: 1,
                height: "54px",
                padding: "0 16px",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor:
                  menuIndex === 2
                    ? "#22c55e"
                    : settingsManager.getCurrentPreset() === "CUSTOM"
                      ? "rgba(34, 197, 94, 0.4)"
                      : "",
                color: menuIndex === 2 ? "#22c55e" : settingsManager.getCurrentPreset() === "CUSTOM" ? "#22c55e" : "",
              }}
            />
          </div>

          <div className="binding-board neo-pressed">
            {(Object.keys(settingsManager.getKeyMap()) as Action[]).map((action, idx) => {
              const keys = settingsManager.getKeyMap()[action] || [];
              const rowMenuIndex = idx + 3;
              const isFocusedRow = menuIndex === rowMenuIndex;
              return (
                <div key={action} className="binding-row" style={{ padding: "8px 4px" }}>
                  <span
                    className="binding-action-label"
                    style={{
                      color: isFocusedRow ? "#22c55e" : "",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <span
                      style={{ color: "var(--signal-green)", marginRight: "8px", visibility: isFocusedRow ? "visible" : "hidden" }}
                    >
                      ▶
                    </span>
                    {getActionIcon(action)}
                    {action.replace("_", " ")}
                  </span>
                  <div className="flex-row" style={{ gap: "8px" }}>
                    <button
                      onClick={() => handleRebindTrigger(action)}
                      className={\`binding-btn neo-btn \${isFocusedRow ? "neo-btn-focused" : ""}\`}
                      style={{
                        borderColor: rebindTarget?.action === action && rebindTarget?.index === 0 ? "#eab308" : "",
                        color: rebindTarget?.action === action && rebindTarget?.index === 0 ? "#eab308" : "",
                      }}
                    >
                      {rebindTarget?.action === action && rebindTarget?.index === 0
                        ? "PRESS ANY KEY..."
                        : formatKeyDisplayName(keys[0])}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="controls-notice" style={{ marginTop: "auto", marginBottom: "auto" }}>
            Determination Heal: Hold [Move Down] + Press [Jump] (Requires 1 Heal Charge)
          </div>
        </>
      )}

      <MenuBackButton
        isFocused={menuIndex === backBtnIndex}
        onFocused={() => setMenuIndex(backBtnIndex)}
        playHoverTick={playHoverTick}
        onBack={onBack}
        style={{ maxWidth: "80vmin", width: "100%" }}
      />
    </MenuContainer>
  );
}
`,"src/components/menus/CreditsScreen.css":`.credits-block {
  max-width: 480px;
  padding: 24px;
  width: 100%;
  border-radius: 16px;
  margin: auto 0;
  box-sizing: border-box;
}

.credits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}

.credits-item {
  background: var(--surface-bg);
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 10px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: var(--shadow-inset-light), var(--shadow-inset-dark);
}

.credits-tech-title {
  font-size: 11px;
  font-weight: bold;
  color: var(--signal-green);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-shadow: 0 0 6px var(--signal-green-glow);
}

.credits-tech-desc {
  font-size: 10px;
  color: #a0aec0;
  line-height: 1.45;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
`,"src/components/menus/CreditsScreen.tsx":`import "./CreditsScreen.css";
import { Layout, Activity, Waves, Database } from "lucide-react";
import { MenuContainer, MenuHeader, MenuBackButton } from "./MenuPrimitives";

interface CreditsScreenProps {
  onBack: () => void;
}

export function CreditsScreen({ onBack }: CreditsScreenProps) {
  return (
    <MenuContainer style={{ padding: "20px 0" }}>
      <MenuHeader title="SYSTEM CREDITS" subtitle="Engine Architecture & Technologies" />

      <div
        className="credits-block neo-pressed flex-col"
        style={{
          width: "100%",
          maxWidth: "68vmin",
          padding: "3.2vmin",
          borderRadius: "2vmin",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
            paddingBottom: "1.2vmin",
            marginBottom: "1.2vmin",
          }}
        >
          <p
            style={{
              fontSize: "1.6vmin",
              fontWeight: "bold",
              color: "#22c55e",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              margin: 0,
              textShadow: "0 0 8px rgba(34, 197, 94, 0.45)",
            }}
          >
            Built by Steven Casteel
          </p>
          <p
            style={{
              fontSize: "1.2vmin",
              color: "#4a5568",
              margin: "0.6vmin 0 0",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: "bold",
              textShadow: "0 0 6px rgba(74, 222, 128, 0.2)",
            }}
          >
            AI Co-Pilots: Gemini 2.5 Pro, Gemini 3.5 Flash
          </p>
          <a
            href="https://www.stevencasteel.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontSize: "1.1vmin",
              color: "#4a5568",
              margin: "0.6vmin 0 0",
              letterSpacing: "0.15em",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--signal-green)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
          >
            WWW.STEVENCASTEEL.COM
          </a>
        </div>

        <div className="credits-grid">
          <div className="credits-item">
            <span className="credits-tech-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Layout size={14} style={{ flexShrink: 0 }} />
              PRESENTATION LAYOUT
            </span>
            <span className="credits-tech-desc">
              React 19, TypeScript 6.0, and Vite 8.0 bundle chunk splitting for low loading latencies.
            </span>
          </div>

          <div className="credits-item">
            <span className="credits-tech-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Activity size={14} style={{ flexShrink: 0 }} />
              PHYSICS ENGINE
            </span>
            <span className="credits-tech-desc">
              Custom 60Hz Semi-Implicit Euler accumulator loops, dynamic circular sweep checks, and ceiling corner
              nudging.
            </span>
          </div>

          <div className="credits-item">
            <span className="credits-tech-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Waves size={14} style={{ flexShrink: 0 }} />
              AUDIO SYNTHESIS
            </span>
            <span className="credits-tech-desc">
              Dynamic procedural sound wave generation using native Web Audio API oscillators, gain, and muffle lowpass
              filters.
            </span>
          </div>

          <div className="credits-item">
            <span className="credits-tech-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Database size={14} style={{ flexShrink: 0 }} />
              DATA MANAGEMENT
            </span>
            <span className="credits-tech-desc">
              Zustand 5.0 reactive state managers and persistent browser registers secured with schema input checkers.
            </span>
          </div>
        </div>
      </div>

      <MenuBackButton
        isFocused={true}
        onBack={onBack}
      />
    </MenuContainer>
  );
}
`,"src/components/menus/MenuPrimitives.tsx":`import React from "react";
import { soundSynth } from "@/core/SoundSynth";
import { useCursorStore } from "@/store/useCursorStore";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface MenuContainerProps {
  children: React.ReactNode;
  className?: string;
  hasGridOverlay?: boolean;
  style?: React.CSSProperties;
}

export function MenuContainer({ children, className = "", hasGridOverlay = false, style }: MenuContainerProps) {
  return (
    <div className={\`title-screen-container \${className}\`} style={style}>
      {hasGridOverlay && <div className="title-grid-overlay" />}
      {children}
    </div>
  );
}

interface MenuHeaderProps {
  title: string;
  subtitle: string;
}

export function MenuHeader({ title, subtitle }: MenuHeaderProps) {
  return (
    <div className="title-screen-header">
      <div className="title-banner-overhauled">
        <h1 style={{ textTransform: "uppercase" }}>{title}</h1>
        <div className="title-subtitle-container">
          <span className="subtitle-line"></span>
          <p className="subtitle-text">{subtitle}</p>
          <span className="subtitle-line"></span>
        </div>
      </div>
    </div>
  );
}

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFocused: boolean;
  onFocused?: () => void;
  playHoverTick?: () => void;
  variant?: "large" | "led";
  indicatorColor?: "green" | "yellow" | "red";
  mainLabel: React.ReactNode;
  subLabel?: string;
  leftIcon?: React.ReactNode;
  showArrow?: boolean;
}

export function MenuButton({
  isFocused,
  onFocused,
  playHoverTick,
  variant = "large",
  indicatorColor = "green",
  mainLabel,
  subLabel,
  leftIcon,
  showArrow = true,
  className = "",
  onMouseEnter,
  ...props
}: MenuButtonProps) {

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    useCursorStore.getState().setCursorType("button");
    if (playHoverTick) {
      playHoverTick();
    } else {
      soundSynth.playSelectTick();
    }
    if (onFocused) {
      onFocused();
    }
    if (onMouseEnter) {
      onMouseEnter(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    useCursorStore.getState().setCursorType("default");
    if (props.onMouseLeave) {
      props.onMouseLeave(e);
    }
  };

  const indicatorClass = isFocused ? \`led-\${indicatorColor}\` : "";

  if (variant === "large") {
    return (
      <motion.button
        className={\`neo-btn-large \${isFocused ? "neo-btn-large-focused" : ""} \${className}\`}
        {...(props as Record<string, unknown>)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.025, x: 4 }}
        whileTap={{ scale: 0.97 }}
        animate={isFocused ? { scale: 1.025, x: 4 } : { scale: 1.0, x: 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 14 }}
      >
        <div className="btn-indicator-light"  />
        <div className="btn-label-group">
          <span className="btn-main-label" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {leftIcon}
            {mainLabel}
          </span>
          {subLabel && <span className="btn-sub-label">{subLabel}</span>}
        </div>
        {isFocused && showArrow && (
          <span className="cursor-arrow-large">
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", fill: "currentColor", display: "block" }}>
              <polygon points="20,15 80,50 20,85" />
            </svg>
          </span>
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      className={\`neo-btn-led \${isFocused ? "neo-btn-led-focused" : ""} \${className}\`}
      {...(props as Record<string, unknown>)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, x: 2 }}
      whileTap={{ scale: 0.98 }}
      animate={isFocused ? { scale: 1.02, x: 2 } : { scale: 1.0, x: 0 }}
      transition={{ type: "spring", stiffness: 450, damping: 14 }}
    >
      <div className={\`btn-indicator-light \${indicatorClass}\`} style={isFocused ? undefined : { background: "#1e2430" }} />
      {leftIcon}
      <span>{mainLabel}</span>
      {isFocused && showArrow && (
          <span className="cursor-arrow">
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", fill: "currentColor", display: "block" }}>
              <polygon points="20,15 80,50 20,85" />
            </svg>
          </span>
        )}
    </motion.button>
  );
}

interface MenuBackButtonProps extends Omit<MenuButtonProps, "mainLabel"> {
  onBack: () => void;
  label?: string;
}

export function MenuBackButton({
  onBack,
  label = "Back",
  isFocused,
  onFocused,
  playHoverTick,
  style,
  variant = "large",
  ...props
}: MenuBackButtonProps) {
  const defaultStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "58vmin",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "12px",
    zIndex: 2,
    ...style
  };

  return (
    <MenuButton
      variant={variant}
      isFocused={isFocused}
      onFocused={onFocused}
      playHoverTick={playHoverTick}
      onClick={onBack}
      leftIcon={<ArrowLeft size={16} strokeWidth={2.5} style={{ flexShrink: 0 }} />}
      mainLabel={label}
      style={defaultStyle}
      {...props}
    />
  );
}
`,"src/components/menus/SaveSelectScreen.css":`.slot-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 480px;
  margin: auto 0;
}

.slot-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  border: 1px solid transparent;
}

.slot-card:active {
  transform: scale(0.98);
}

.slot-card-empty {
  background: var(--surface-bg);
  box-shadow: var(--shadow-inset-light), var(--shadow-inset-dark);
  border-color: rgba(0, 0, 0, 0.3);
  color: #4a5568;
}

.slot-card-loaded {
  background: var(--surface-elevated);
  box-shadow: var(--shadow-light), var(--shadow-dark);
  border-color: rgba(255, 255, 255, 0.02);
  color: #ffffff;
}

.slot-card-focused {
  background: var(--surface-bg);
  box-shadow: var(--shadow-inset-light), var(--shadow-inset-dark);
  color: var(--signal-green);
  border-color: rgba(34, 197, 94, 0.25);
  text-shadow: 0 0 8px var(--signal-green-glow);
}
`,"src/components/menus/SaveSelectScreen.tsx":`import "./SaveSelectScreen.css";
import { SaveSlotData } from "@/core/SaveManager";
import { Save, FolderPlus, Copy, Trash2 } from "lucide-react";
import { MenuContainer, MenuHeader, MenuButton, MenuBackButton } from "./MenuPrimitives";
import { motion } from "framer-motion";

interface SaveSelectScreenProps {
  slots: SaveSlotData[];
  menuIndex: number;
  isCopyMode: boolean;
  copySourceIndex: number;
  isEraseMode: boolean;
  handleSlotSelect: (index: number) => void;
  toggleCopyMode: () => void;
  toggleEraseMode: () => void;
  onBack: () => void;
  playHoverTick: () => void;
  setMenuIndex: (index: number) => void;
}

export function SaveSelectScreen({
  slots,
  menuIndex,
  isCopyMode,
  copySourceIndex,
  isEraseMode,
  handleSlotSelect,
  toggleCopyMode,
  toggleEraseMode,
  onBack,
  playHoverTick,
  setMenuIndex,
}: SaveSelectScreenProps) {
  const selectHeaderTitle = isCopyMode
    ? copySourceIndex === -1
      ? "COPY A SLAVE SLOT"
      : "CHOOSE WHERE TO COPY"
    : isEraseMode
      ? "DELETE A SAVE SLOT"
      : "CHOOSE A SAVE SLOT";

  return (
    <MenuContainer>
      <MenuHeader title={selectHeaderTitle} subtitle="Select a slot to load your game" />

      <div className="slot-list">
        {slots.map((slot, i) => (
          <motion.button
            key={i}
            onClick={() => handleSlotSelect(i)}
            onMouseEnter={() => {
              playHoverTick();
              setMenuIndex(i);
            }}
            whileTap={{ scale: 0.985 }}
            animate={
              copySourceIndex === i 
                ? { scale: [1, 1.015, 1], borderColor: ["rgba(234, 179, 8, 0.15)", "rgba(234, 179, 8, 0.85)", "rgba(234, 179, 8, 0.15)"] } 
                : isEraseMode && !slot.empty 
                  ? { scale: [1, 1.015, 1], borderColor: ["rgba(239, 68, 68, 0.15)", "rgba(239, 68, 68, 0.85)", "rgba(239, 68, 68, 0.15)"] }
                  : {}
            }
            transition={
              (copySourceIndex === i || (isEraseMode && !slot.empty))
                ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                : { type: "spring", stiffness: 450, damping: 14 }
            }
            className={\`slot-card \${menuIndex === i ? "slot-card-focused" : slot.empty ? "slot-card-empty" : "slot-card-loaded"}\`}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div className="flex-row" style={{ alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  visibility: menuIndex === i ? "visible" : "hidden",
                  width: "16px",
                  display: "inline-block",
                  textAlign: "center",
                  color: "var(--signal-green)"
                }}
              >
                ▶
              </span>
              <div className="flex-row" style={{ alignItems: "center", gap: "8px" }}>
                <div className="flex-col" style={{ textAlign: "left" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {slot.empty ? (
                      <FolderPlus size={18} style={{ color: "#4a5568", flexShrink: 0 }} />
                    ) : (
                      <Save size={18} style={{ color: "var(--signal-green)", flexShrink: 0 }} />
                    )}
                    Slot {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      color: menuIndex === i ? "#22c55e" : "#a0aec0",
                      marginTop: "6px",
                    }}
                  >
                    {slot.empty ? "NO SAVE DATA" : \`WINS: \${slot.wins} / LOSSES: \${slot.losses}\`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-row" style={{ alignItems: "center", gap: "12px" }}>
              <div
                className={\`led-dot \${
                  slot.empty ? (i === copySourceIndex ? "led-yellow" : "") : isEraseMode ? "led-red" : "led-green"
                }\`}
                style={{ background: slot.empty && i !== copySourceIndex ? "#07080b" : "" }}
              />
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#718096" }}>
                {slot.empty ? "EMPTY" : "SAVED GAME"}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <div
        className="flex-col"
        style={{ gap: "16px", width: "100%", maxWidth: "64vmin", marginTop: "16px", paddingBottom: "10px" }}
      >
        <div className="flex-row" style={{ gap: "16px", justifyContent: "center", width: "100%" }}>
          <MenuButton
            variant="led"
            isFocused={menuIndex === 3}
            onFocused={() => setMenuIndex(3)}
            playHoverTick={playHoverTick}
            onClick={toggleCopyMode}
            leftIcon={<Copy size={16} style={{ flexShrink: 0 }} />}
            mainLabel="COPY SLOT"
            className={isCopyMode ? "neo-btn-led-active" : ""}
            indicatorColor={isCopyMode ? "yellow" : "green"}
            style={{ flex: 1, padding: "18px", whiteSpace: "nowrap" }}
          />

          <MenuButton
            variant="led"
            isFocused={menuIndex === 4}
            onFocused={() => setMenuIndex(4)}
            playHoverTick={playHoverTick}
            onClick={toggleEraseMode}
            leftIcon={<Trash2 size={16} style={{ flexShrink: 0 }} />}
            mainLabel="DELETE SLOT"
            className={isEraseMode ? "neo-btn-led-active" : ""}
            indicatorColor={isEraseMode ? "yellow" : "green"}
            style={{ flex: 1, padding: "18px", whiteSpace: "nowrap" }}
          />
        </div>

        <MenuBackButton
          isFocused={menuIndex === 5}
          onFocused={() => setMenuIndex(5)}
          playHoverTick={playHoverTick}
          onBack={onBack}
          style={{ padding: "18px", maxWidth: "100%", width: "100%" }}
        />
      </div>
    </MenuContainer>
  );
}`,"src/components/menus/SettingsScreen.tsx":`import { Volume2, Keyboard } from "lucide-react";
import { MenuContainer, MenuHeader, MenuButton, MenuBackButton } from "./MenuPrimitives";

interface SettingsScreenProps {
  menuIndex: number;
  onAudio: () => void;
  onControls: () => void;
  onBack: () => void;
  playHoverTick: () => void;
  setMenuIndex: (index: number) => void;
}

export function SettingsScreen({
  menuIndex,
  onAudio,
  onControls,
  onBack,
  playHoverTick,
  setMenuIndex,
}: SettingsScreenProps) {
  return (
    <MenuContainer>
      <MenuHeader title="SETTINGS" subtitle="Configure sound decibels and keyboard matrices" />

      <div className="btn-container-overhauled" style={{ zIndex: 2 }}>
        <MenuButton
          isFocused={menuIndex === 0}
          onFocused={() => setMenuIndex(0)}
          playHoverTick={playHoverTick}
          onClick={onAudio}
          leftIcon={<Volume2 size={18} strokeWidth={2} style={{ flexShrink: 0 }} />}
          mainLabel="SOUND SETTINGS"
          subLabel="ADJUST GAME SOUNDS AND MUSIC VOLUME"
        />

        <MenuButton
          isFocused={menuIndex === 1}
          onFocused={() => setMenuIndex(1)}
          playHoverTick={playHoverTick}
          onClick={onControls}
          leftIcon={<Keyboard size={18} strokeWidth={2} style={{ flexShrink: 0 }} />}
          mainLabel="KEYBOARD CONTROLS"
          subLabel="CALIBRATE INPUTS AND REMAP KEYS"
        />
      </div>

      <MenuBackButton
        isFocused={menuIndex === 2}
        onFocused={() => setMenuIndex(2)}
        playHoverTick={playHoverTick}
        onBack={onBack}
      />
    </MenuContainer>
  );
}
`,"src/components/menus/SourceViewFooter.tsx":`import { soundSynth } from "@/core/SoundSynth";
import { Download, ArrowLeft } from "lucide-react";
import { MenuButton } from "./MenuPrimitives";

interface SourceViewFooterProps {
  onBack: () => void;
  isMobile: boolean;
  activeIndex: number;
  visibleNodesLength: number;
  setActiveIndex: (idx: number) => void;
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function SourceViewFooter({
  onBack,
  isMobile,
  activeIndex,
  visibleNodesLength,
  setActiveIndex,
}: SourceViewFooterProps) {
  const handleDownload = () => {
    soundSynth.playHitConfirm();
    const link = document.createElement("a");
    link.href = "./boxbattle_source_code.txt";
    link.download = "boxbattle_source_code.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isMobile) {
    return (
      <div
        className="source-view-footer"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          width: "100%",
          boxSizing: "border-box",
          marginTop: "12px",
          flexShrink: 0,
        }}
      >
        <div style={{ flex: 1, display: "flex" }}>
          <button
            onClick={() => window.open("https://github.com/stevencasteel/BOX-BATTLE", "_blank")}
            className="neo-btn"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <GithubIcon />
          </button>
        </div>

        <div style={{ flex: 1, display: "flex" }}>
          <button
            onClick={handleDownload}
            className="neo-btn"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "12px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Download size={18} strokeWidth={2.5} style={{ flexShrink: 0 }} />
          </button>
        </div>

        <div style={{ flex: 1, display: "flex" }}>
          <button
            onClick={onBack}
            className="neo-btn"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "12px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={18} strokeWidth={2.5} style={{ flexShrink: 0 }} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="source-view-footer"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        width: "100%",
        height: "8.5vmin",
        boxSizing: "border-box",
        marginTop: "12px",
        flexShrink: 0,
      }}
    >
      <MenuButton
        isFocused={activeIndex === visibleNodesLength}
        onFocused={() => setActiveIndex(visibleNodesLength)}
        onClick={() => window.open("https://github.com/stevencasteel/BOX-BATTLE", "_blank")}
        leftIcon={<GithubIcon />}
        mainLabel="GITHUB"
        subLabel="OPEN SOURCE"
        showArrow={false}
        style={{ flex: 1, height: "100%", boxSizing: "border-box" }}
      />

      <MenuButton
        isFocused={activeIndex === visibleNodesLength + 1}
        onFocused={() => setActiveIndex(visibleNodesLength + 1)}
        onClick={handleDownload}
        leftIcon={<Download size={18} strokeWidth={2.5} style={{ flexShrink: 0 }} />}
        mainLabel="DOWNLOAD .TXT"
        subLabel="SINGLE FILE FOR LLM CHAT"
        showArrow={false}
        style={{ flex: 1, height: "100%", boxSizing: "border-box" }}
      />

      <MenuButton
        isFocused={activeIndex === visibleNodesLength + 2}
        onFocused={() => setActiveIndex(visibleNodesLength + 2)}
        onClick={onBack}
        leftIcon={<ArrowLeft size={18} strokeWidth={2.5} style={{ flexShrink: 0 }} />}
        mainLabel="BACK"
        showArrow={false}
        style={{ flex: 1, height: "100%", boxSizing: "border-box" }}
      />
    </div>
  );
}
`,"src/components/menus/SourceViewScreen.css":`.source-view-workspace {
  display: flex;
  gap: 16px;
  flex-grow: 1;
  height: 0;
  min-height: 0;
  width: 100%;
  box-sizing: border-box;
  margin: 6px 0;
}

.directory-tree-pane {
  width: 24%;
  overflow-y: auto;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-sizing: border-box;
}

.code-viewer-pane {
  width: 76%;
  overflow-y: auto;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  background: #1d1f21;
}

.source-view-footer {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  box-sizing: border-box;
}

@media (max-width: 800px) {
  .source-view-workspace {
    flex-direction: column;
    gap: 12px;
    margin: 10px 0;
  }
  .directory-tree-pane {
    width: 100% !important;
    height: 100% !important;
    padding: 8px;
  }
  .code-viewer-pane {
    width: 100% !important;
    height: 100% !important;
    padding: 10px;
  }
  .source-view-footer {
    flex-direction: column;
    gap: 10px;
    margin-top: 4px;
  }
  .source-view-footer > button,
  .source-view-footer > a {
    width: 100% !important;
    max-width: none !important;
    padding: 14px 24px;
    font-size: 13px;
    justify-content: center;
  }
}
`,"src/components/menus/SourceViewScreen.tsx":`import "./SourceViewScreen.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { soundSynth } from "@/core/SoundSynth";
import { sourceCodeManifest } from "@/core/sourceCodeManifest";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSourceViewKeyboard } from "@/hooks/useSourceViewKeyboard";
import { useCursorStore } from "@/store/useCursorStore";
import { SourceViewFooter } from "./SourceViewFooter";
import { Folder, FolderOpen, FileCode, FileText } from "lucide-react";

interface SourceViewScreenProps {
  onBack: () => void;
}

export interface FileNode {
  name: string;
  path: string;
  isDir: boolean;
  children: FileNode[];
  depth: number;
}

function buildTree(paths: string[]): FileNode {
  const root: FileNode = { name: "root", path: "", isDir: true, children: [], depth: -1 };

  paths.forEach((p) => {
    const parts = p.split("/");
    let current = root;

    parts.forEach((part, i) => {
      const isDir = i < parts.length - 1;
      const currentPath = parts.slice(0, i + 1).join("/");

      let child = current.children.find((c) => c.name === part);
      if (!child) {
        child = {
          name: part,
          path: isDir ? currentPath : p,
          isDir,
          children: [],
          depth: i,
        };
        current.children.push(child);
      }
      current = child;
    });
  });

  const sortNodes = (node: FileNode) => {
    node.children.sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name);
    });
    node.children.forEach(sortNodes);
  };
  sortNodes(root);

  return root;
}

function flattenVisible(node: FileNode, expanded: Record<string, boolean>, list: FileNode[] = []): FileNode[] {
  if (node.depth === -1) {
    node.children.forEach((child) => flattenVisible(child, expanded, list));
    return list;
  }

  list.push(node);

  if (node.isDir && expanded[node.path]) {
    node.children.forEach((child) => flattenVisible(child, expanded, list));
  }

  return list;
}

function getLanguageFromPath(filePath: string): string {
  const ext = filePath.split(".").pop() || "";
  if (ext === "tsx") return "tsx";
  if (ext === "ts") return "typescript";
  if (ext === "js" || ext === "jsx") return "javascript";
  if (ext === "css") return "css";
  if (ext === "json") return "json";
  if (ext === "md") return "markdown";
  return "text";
}

export function SourceViewScreen({ onBack }: SourceViewScreenProps) {
  const [manifest] = useState<Record<string, string>>(sourceCodeManifest);
  const [expandedDirs, setExpandedDirs] = useState<Record<string, boolean>>({
    src: true,
    "src/components": true,
    "src/core": true,
  });

  const sortedPaths = useMemo(() => Object.keys(sourceCodeManifest).sort(), []);
  const [selectedFile, setSelectedFile] = useState<string>(sortedPaths[0] || "");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<"TOC" | "CODE">("TOC");

  const listRef = useRef<HTMLDivElement>(null);

  const treeRoot = useMemo(() => {
    const paths = Object.keys(sourceCodeManifest);
    return buildTree(paths);
  }, []);

  const visibleNodes = useMemo(() => {
    if (!treeRoot) return [];
    return flattenVisible(treeRoot, expandedDirs);
  }, [treeRoot, expandedDirs]);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleDownload = () => {
    soundSynth.playHitConfirm();
    const link = document.createElement("a");
    link.href = "./boxbattle_source_code.txt";
    link.download = "boxbattle_source_code.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useSourceViewKeyboard({
    visibleNodes,
    activeIndex,
    setActiveIndex,
    expandedDirs,
    setExpandedDirs,
    setSelectedFile,
    onBack,
    isMobile,
    mobileView,
    setMobileView,
    handleDownload,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkRes = () => {
        setIsMobile(window.innerWidth <= 800);
      };
      checkRes();
      window.addEventListener("resize", checkRes);
      return () => window.removeEventListener("resize", checkRes);
    }
  }, []);

  useEffect(() => {
    if (activeIndex < visibleNodes.length) {
      const activeEl = listRef.current?.querySelector(".file-item-active");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [activeIndex, visibleNodes.length]);

  return (
    <div
      className="flex-col h-full w-full"
      style={{ justifyContent: "space-between", boxSizing: "border-box", padding: "16px 12px" }}
    >
      <div className="title-banner" style={{ marginTop: "0", paddingTop: "0" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            margin: 0,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#fff",
          }}
        >
          SOURCE BROWSER
        </h2>
        <p style={{ color: "#718096", margin: "4px 0 0", fontSize: "11px", letterSpacing: "0.15em" }}>
          {isMobile
            ? mobileView === "TOC"
              ? "TAP FILE TO VIEW  •  DRAG TO SCROLL"
              : "SWIPE TO SCROLL  •  TAP BUTTON TO EXIT CODE"
            : "UP/DOWN/LEFT/RIGHT: NAVIGATE  •  JUMP: ENTER/OPEN  •  ATTACK/DASH: EXIT"}
        </p>
      </div>

      <div className="source-view-workspace">
        {(!isMobile || mobileView === "TOC") && (
          <div
            ref={listRef}
            className="directory-tree-pane neo-pressed"
            style={{
              WebkitOverflowScrolling: "touch",
              width: isMobile ? "100%" : "24%",
              height: isMobile ? "100%" : "",
            }}
          >
            {visibleNodes.map((node, idx) => {
              const isActive = idx === activeIndex;
              const isExpanded = node.isDir && !!expandedDirs[node.path];
              const isCurrentlySelected = !node.isDir && node.path === selectedFile;

              return (
                <div
                  key={node.path + "-" + idx}
                  className={isActive ? "file-item-active" : ""}
                  onClick={() => {
                    soundSynth.playSelectTick();
                    setActiveIndex(idx);
                    if (node.isDir) {
                      setExpandedDirs((prev) => ({ ...prev, [node.path]: !prev[node.path] }));
                    } else {
                      setSelectedFile(node.path);
                      if (isMobile) {
                        setMobileView("CODE");
                      }
                    }
                  }}
                  style={{
                    paddingTop: isMobile ? "14px" : "6px",
                    paddingBottom: isMobile ? "14px" : "6px",
                    paddingRight: isMobile ? "16px" : "10px",
                    paddingLeft: \`\${node.depth * (isMobile ? 22 : 16) + (isMobile ? 16 : 10)}px\`,
                    borderRadius: "6px",
                    fontSize: isMobile ? "13px" : "11px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: isActive
                      ? "var(--signal-green)"
                      : isCurrentlySelected
                        ? "#ffffff"
                        : node.isDir
                          ? "#718096"
                          : "#4a5568",
                    background: isActive
                      ? "rgba(34, 197, 94, 0.08)"
                      : isCurrentlySelected
                        ? "rgba(255, 255, 255, 0.03)"
                        : "transparent",
                    border: isActive ? "1px solid rgba(34, 197, 94, 0.25)" : "1px solid transparent",
                    textShadow: isActive ? "0 0 6px var(--signal-green-glow)" : "none",
                    wordBreak: "break-all",
                    transition: "all 0.12s ease",
                    textAlign: "left",
                  }}
                >
                  <span style={{ minWidth: "12px", fontSize: "10px" }}>
                    {node.isDir ? (isExpanded ? "▼" : "▶") : " "}
                  </span>
                  {node.isDir ? (
                    isExpanded ? <FolderOpen size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} /> : <Folder size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  ) : (
                    node.name.endsWith(".ts") || node.name.endsWith(".tsx") || node.name.endsWith(".js") ? (
                      <FileCode size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                    ) : (
                      <FileText size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                    )
                  )}
                  <span style={{ fontWeight: node.isDir ? "bold" : "normal" }}>{node.name}</span>
                </div>
              );
            })}
          </div>
        )}

        {(!isMobile || mobileView === "CODE") && (
          <div
            onMouseOver={() => useCursorStore.getState().setCursorType("text")}
            onMouseLeave={() => useCursorStore.getState().setCursorType("default")}
            className="code-viewer-pane neo-pressed"
            style={{
              WebkitOverflowScrolling: "touch",
              width: isMobile ? "100%" : "76%",
              height: isMobile ? "100%" : "",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isMobile && (
              <button
                onClick={() => {
                  soundSynth.playSelectTick();
                  setMobileView("TOC");
                }}
                className="neo-btn"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "12px",
                  marginBottom: "12px",
                  borderColor: "var(--signal-green)",
                  color: "var(--signal-green)",
                  flexShrink: 0,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                📁 BACK TO DIRECTORY
              </button>
            )}

            {selectedFile ? (
              <div
                style={{
                  textAlign: "left",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    color: "hsl(142, 70%, 75%)",
                    marginBottom: "14px",
                    fontFamily: "monospace",
                    flexShrink: 0,
                    fontSize: isMobile ? "10px" : "11px",
                    wordBreak: "break-all",
                  }}
                >
                  // FILE: {selectedFile}
                </div>
                <div style={{ flexGrow: 1, overflow: "auto" }}>
                  <SyntaxHighlighter
                    language={getLanguageFromPath(selectedFile)}
                    style={atomDark}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      fontSize: isMobile ? "10px" : "11px",
                      lineHeight: "1.5",
                    }}
                  >
                    {manifest[selectedFile] || ""}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <span style={{ color: "#4a5568", fontSize: "11px" }}>
                Select a file in the directory tree to view content.
              </span>
            )}
          </div>
        )}
      </div>

      <SourceViewFooter
        onBack={onBack}
        isMobile={isMobile}
        activeIndex={activeIndex}
        visibleNodesLength={visibleNodes.length}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
}`,"src/components/menus/TitleScreen.css":`.title-screen-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 4px 18px;
  position: relative;
}

.title-grid-overlay {
  position: absolute;
  inset: 0;
  background-size: 24px 24px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  pointer-events: none;
  z-index: 1;
}

.title-screen-header {
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2px;
}

.system-tag {
  font-size: 10px;
  color: #4a5568;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 4px 10px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.2);
}

.title-banner-overhauled {
  text-align: center;
  margin-top: 2px;
  width: 100%;
}

.title-banner-overhauled h1 {
  font-size: 26px;
  margin: 0;
  letter-spacing: 0.22em;
  font-weight: 900;
  color: #ffffff;
  text-shadow:
    0 4px 20px rgba(0, 0, 0, 0.95),
    0 0 10px rgba(255, 255, 255, 0.05);
  text-transform: uppercase;
}

.title-subtitle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-top: 2px;
}

.subtitle-line {
  height: 1px;
  flex-grow: 1;
  max-width: 60px;
  background: linear-gradient(to right, transparent, var(--signal-green), transparent);
}

.subtitle-text {
  font-size: 10px;
  color: var(--signal-green);
  margin: 0;
  letter-spacing: 0.35em;
  font-weight: bold;
  text-shadow: 0 0 8px var(--signal-green-glow);
}

.title-screen-center {
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.btn-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.btn-container-overhauled {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.neo-btn-large {
  display: flex;
  align-items: center;
  position: relative;
  background: #0f1218;
  box-shadow:
    -4px -4px 10px rgba(255, 255, 255, 0.015),
    6px 6px 15px rgba(0, 0, 0, 0.8),
    inset 1px 1px 0px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 16px 24px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
  outline: none;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
}

.neo-btn-large:hover {
  background: #141922;
  border-color: rgba(255, 255, 255, 0.08);
}

.neo-btn-large:active {
  transform: scale(0.98);
}

.neo-btn-large-focused {
  background: #0c0e12;
  border-color: var(--signal-green);
  box-shadow:
    0 0 15px rgba(34, 197, 94, 0.15),
    inset 0 0 8px rgba(34, 197, 94, 0.1),
    6px 6px 18px rgba(0, 0, 0, 0.95);
}

.neo-btn-large .btn-indicator-light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1e2430;
  margin-right: 18px;
  transition: background 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.neo-btn-large-focused .btn-indicator-light {
  background: var(--signal-green);
  box-shadow:
    0 0 10px var(--signal-green),
    0 0 20px var(--signal-green-glow);
}

.btn-label-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;
}

.btn-main-label {
  font-size: 13px;
  font-weight: 800;
  color: #a0aec0;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: color 0.15s ease;
  white-space: nowrap;
}

.neo-btn-large-focused .btn-main-label {
  color: #ffffff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

.btn-sub-label {
  font-size: 9px;
  font-weight: 500;
  color: #4a5568;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.15s ease;
  white-space: pre-line;
  line-height: 1.4;
}

.neo-btn-large-focused .btn-sub-label {
  color: var(--signal-green);
  opacity: 0.85;
}

.cursor-arrow-large {
  position: absolute !important;
  right: 24px !important;
  width: 14px !important;
  height: 14px !important;
  color: var(--signal-green) !important;
  animation: arrow-blink 0.4s infinite alternate !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-left: 0 !important;
  margin-top: 0 !important;
}

.cursor-arrow {
  position: absolute !important;
  right: 24px !important;
  width: 10px !important;
  height: 10px !important;
  color: var(--signal-green) !important;
  animation: arrow-blink 0.4s infinite alternate !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-left: 0 !important;
  margin-top: 0 !important;
}

.title-screen-footer {
  z-index: 2;
  width: 100%;
  margin-top: 8px;
}

.footer-deco-line {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.05) 80%,
    transparent
  );
  width: 100%;
  margin-bottom: 6px;
}

.footer-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 8px;
  color: #4a5568;
  letter-spacing: 0.15em;
  padding: 0 12px;
  text-transform: uppercase;
}

.footer-center-prompt {
  color: #718096;
  font-weight: bold;
}

.title-screen-container .neo-btn-large {
  padding: 16px 24px;
  border-radius: 10px;
}

.title-screen-container .neo-btn-large-focused {
  background: #0c0e12;
  border-color: var(--signal-green);
  box-shadow:
    0 0 15px rgba(34, 197, 94, 0.15),
    inset 0 0 8px rgba(34, 197, 94, 0.1),
    6px 6px 18px rgba(0, 0, 0, 0.95);
}

.title-screen-container .neo-btn-large .btn-indicator-light {
  width: 8px;
  height: 8px;
  margin-right: 18px;
}

.title-screen-container .btn-main-label {
  font-size: 13px;
}

.title-screen-container .btn-sub-label {
  font-size: 9px;
}

.title-screen-container .cursor-arrow-large {
  font-size: 14px;
  margin-left: 8px;
}
`,"src/components/menus/TitleScreen.tsx":`import { Gamepad2, Sliders, Award, Code2 } from "lucide-react";
import { MenuContainer, MenuHeader, MenuButton } from "./MenuPrimitives";

interface TitleScreenProps {
  menuIndex: number;
  onPlay: () => void;
  onSettings: () => void;
  onCredits: () => void;
  onSource: () => void;
  playHoverTick: () => void;
  setMenuIndex: (index: number) => void;
}

export function TitleScreen({
  menuIndex,
  onPlay,
  onSettings,
  onCredits,
  onSource,
  playHoverTick,
  setMenuIndex,
}: TitleScreenProps) {
  return (
    <MenuContainer hasGridOverlay>
      <div className="title-screen-header">
        <div className="system-tag">WELCOME TO THE GAUNTLET</div>
        <MenuHeader title="BOX BATTLE" subtitle="RETRO ACTION GAME" />
      </div>

      <div className="title-screen-center">
        <div className="btn-container-overhauled">
          <MenuButton
            isFocused={menuIndex === 0}
            onFocused={() => setMenuIndex(0)}
            playHoverTick={playHoverTick}
            onClick={onPlay}
            leftIcon={<Gamepad2 size={18} strokeWidth={2} />}
            mainLabel="PLAY GAME"
            subLabel="CHOOSE A SAVE SLOT TO BEGIN"
          />

          <MenuButton
            isFocused={menuIndex === 1}
            onFocused={() => setMenuIndex(1)}
            playHoverTick={playHoverTick}
            onClick={onSettings}
            leftIcon={<Sliders size={18} strokeWidth={2} />}
            mainLabel="OPTIONS"
            subLabel="ADJUST SOUNDS AND CONTROLS"
          />

          <MenuButton
            isFocused={menuIndex === 2}
            onFocused={() => setMenuIndex(2)}
            playHoverTick={playHoverTick}
            onClick={onCredits}
            leftIcon={<Award size={18} strokeWidth={2} />}
            mainLabel="CREDITS"
            subLabel="GAME CREATOR AND DETAILS"
          />

          <MenuButton
            isFocused={menuIndex === 3}
            onFocused={() => setMenuIndex(3)}
            playHoverTick={playHoverTick}
            onClick={onSource}
            leftIcon={<Code2 size={18} strokeWidth={2} />}
            mainLabel="SOURCE CODE"
            subLabel="BROWSE CABINET ENGINE FILE TREE"
          />
        </div>
      </div>

      <div className="title-screen-footer">
        <div className="footer-deco-line" />
        <div className="footer-status-bar">
          <span>CONTROL METHOD: KEYBOARD</span>
          <span className="footer-center-prompt">NAVIGATE: ARROWS / WASD • SELECT: ENTER / SPACE</span>
          <span>SAVES: 3 AVAILABLE</span>
        </div>
      </div>
    </MenuContainer>
  );
}
`,"src/core/BattleDirector.ts":`import { Player } from "@/entities/Player";
import { Boss } from "@/entities/Boss";
import type { IEventBus, IAudioManager } from "@/core/Interfaces";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { UNITS } from "@/core/Units";
import { CinematicSystem } from "@/core/CinematicSystem";

interface DialogueLine {
    speaker: "player" | "boss";
    text: string;
}

export class BattleDirector {
    private events: IEventBus;
    private audio: IAudioManager;
    private hasTriggeredFirstHit = false;
    private hasTriggeredPhase2 = false;
    private hasTriggeredPhase3 = false;
    private cinematic: CinematicSystem;
    private onBattleEnd: () => void;

    private dialogueQueue: DialogueLine[] = [];
    private dialogueTimer = 0;

    constructor(events: IEventBus, audio: IAudioManager, onBattleEnd: () => void) {
        this.events = events; this.audio = audio; this.onBattleEnd = onBattleEnd;
        this.cinematic = new CinematicSystem(events, audio);
    }
    public isCinematicActive(): boolean { return this.cinematic.isActive(); }
    public getDeathVisuals() { return { timer: this.cinematic.getDeathTimer(), pos: this.cinematic.getDeathPos() }; }

    private queueDialogues(lines: DialogueLine[]) {
        this.dialogueQueue.push(...lines);
        if (this.dialogueTimer <= 0) {
            this.triggerNextDialogue();
        }
    }

    private triggerNextDialogue() {
        if (this.dialogueQueue.length === 0) return;
        const line = this.dialogueQueue.shift()!;
        this.events.publish("DIALOGUE_TRIGGERED", { speaker: line.speaker, text: line.text });
        this.dialogueTimer = 5.5;
    }

    public update(dt: number, player: Player, boss: Boss) {
        this.cinematic.update(dt);
        if (this.dialogueTimer > 0) {
            this.dialogueTimer -= dt;
            if (this.dialogueTimer <= 0) {
                this.triggerNextDialogue();
            }
        }

        if (this.cinematic.isActive()) return;
        const bHealth = boss.getComponent(HealthComponent);
        if (bHealth) {
            const maxHp = bHealth.maxHealth;
            const phase2Threshold = Math.floor(maxHp * UNITS.BOSS_PHASE_2_HP_PCT);
            const phase3Threshold = Math.floor(maxHp * UNITS.BOSS_PHASE_3_HP_PCT);

            if (bHealth.currentHealth < maxHp && !this.hasTriggeredFirstHit) {
                this.hasTriggeredFirstHit = true;
                this.queueDialogues([
                    { speaker: "boss", text: "A perfect square returns to the Sovereign Crucible. Let us see if your edges still hold." },
                    { speaker: "player", text: "They're sharp enough to slice right through your equations." }
                ]);
            }
            if (bHealth.currentHealth <= phase2Threshold && !this.hasTriggeredPhase2) {
                this.hasTriggeredPhase2 = true;
                this.queueDialogues([
                    { speaker: "boss", text: "You cling to your rigid symmetry, but the Aphelion demands fluidity! Bend or break!" },
                    { speaker: "player", text: "Fluidity is just another word for lacking a foundation." }
                ]);
                this.events.publish("BOSS_PHASE_SHIFT", undefined);
            }
            if (bHealth.currentHealth <= phase3Threshold && !this.hasTriggeredPhase3) {
                this.hasTriggeredPhase3 = true;
                this.queueDialogues([
                    { speaker: "boss", text: "My geometry... fractures! The purity of the constant... burns!" },
                    { speaker: "player", text: "Your variables are collapsing. I am the absolute value." }
                ]);
                this.events.publish("BOSS_PHASE_SHIFT", undefined);
            }
        }

        if (player.isDead && !this.cinematic.isActive()) {
            this.dialogueQueue = [];
            this.dialogueTimer = 0;
            this.cinematic.startSequence(player.position, () => { this.audio.playPlayerExplosion(); }, [
                { triggerTime: 2.0, action: () => { this.events.publish("RECORD_LOSS", undefined); } },
                { triggerTime: 2.5, action: () => { this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: "My shape... is breaking..." }); } },
                { triggerTime: 3.8, action: () => { this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Purity is a myth. The Crucible remains sovereign." }); } },
                { triggerTime: 7.2, action: () => { this.events.publish("CLEAR_DIALOGUES", undefined); this.events.publish("GAME_OVER", undefined); this.onBattleEnd(); } },
            ]);
        } else if (boss.isDead && !this.cinematic.isActive()) {
            this.dialogueQueue = [];
            this.dialogueTimer = 0;
            this.cinematic.startSequence(boss.position, () => { this.audio.playBossExplosion(); }, [
                { triggerTime: 2.0, action: () => { this.events.publish("RECORD_WIN", undefined); } },
                { triggerTime: 2.5, action: () => { 
                    this.events.publish("DIALOGUE_TRIGGERED", { speaker: "boss", text: "Impossible... my chancel architecture..." }); 
                } },
                { triggerTime: 4.8, action: () => { 
                    this.events.publish("DIALOGUE_TRIGGERED", { speaker: "player", text: "Your corruption is just a flawed equation. I am the constant." }); 
                } },
                { triggerTime: 7.2, action: () => { 
                    this.events.publish("CLEAR_DIALOGUES", undefined);
                    this.events.publish("VICTORY", undefined);
                    this.onBattleEnd();
                } },
            ]);
        }
    }
    public cleanup() { 
        this.cinematic.cleanup(); 
        this.dialogueQueue = [];
        this.dialogueTimer = 0;
    }
}
`,"src/core/Camera.ts":`export class Camera {
  public static offsetX = 0;
  public static offsetY = 0;
  public static hitStopTimer = 0;

  private static shakeTimer = 0;
  private static shakeDuration = 0;
  private static shakeAmplitude = 0;
  private static noiseTime = 0;

  private static shakeDirX = 0;
  private static shakeDirY = 0;
  private static isDirectional = false;

  public static shake(amplitude: number, duration: number, dirX?: number, dirY?: number) {
    Camera.shakeAmplitude = amplitude;
    Camera.shakeDuration = duration;
    Camera.shakeTimer = duration;

    if (dirX !== undefined && dirY !== undefined) {
      const len = Math.sqrt(dirX * dirX + dirY * dirY);
      if (len > 0) {
        Camera.shakeDirX = dirX / len;
        Camera.shakeDirY = dirY / len;
        Camera.isDirectional = true;
      } else {
        Camera.isDirectional = false;
      }
    } else {
      Camera.isDirectional = false;
    }
  }

  public static triggerHitStop(duration: number) {
    Camera.hitStopTimer = duration;
  }

  // Fractional sine noise lookup to replace jerky Math.random() with coherent camera tremors
  private static noise(t: number): number {
    return Math.sin(t * 17.1) * 0.43 + Math.sin(t * 31.7) * 0.27 + Math.sin(t * 7.3) * 0.3;
  }

  public static update(dt: number) {
    // 1. Tick Hit Stop
    if (Camera.hitStopTimer > 0) {
      Camera.hitStopTimer -= dt;
    }

    this.noiseTime += dt * 45; // Coherent noise update speed

    // 2. Tick Screen Shake
    let shakeX = 0;
    let shakeY = 0;

    if (Camera.shakeTimer > 0) {
      Camera.shakeTimer -= dt;

      if (Camera.shakeTimer > 0) {
        const decay = Camera.shakeTimer / Camera.shakeDuration;
        const currentAmp = Camera.shakeAmplitude * decay;
        const rawX = this.noise(this.noiseTime) * currentAmp;
        const rawY = this.noise(this.noiseTime + 100) * currentAmp;

        if (Camera.isDirectional) {
          const parallel = (rawX * Camera.shakeDirX + rawY * Camera.shakeDirY) * 0.8;
          const perpendicular = (-rawX * Camera.shakeDirY + rawY * Camera.shakeDirX) * 0.2;
          shakeX = parallel * Camera.shakeDirX - perpendicular * Camera.shakeDirY;
          shakeY = parallel * Camera.shakeDirY + perpendicular * Camera.shakeDirX;
        } else {
          shakeX = rawX;
          shakeY = rawY;
        }
      }
    }

    // Centered camera offset only driven by screen shake
    Camera.offsetX = shakeX;
    Camera.offsetY = shakeY;
  }

  public static reset() {
    Camera.offsetX = 0;
    Camera.offsetY = 0;
    Camera.shakeTimer = 0;
    Camera.hitStopTimer = 0;
    Camera.noiseTime = 0;
    Camera.shakeDirX = 0;
    Camera.shakeDirY = 0;
    Camera.isDirectional = false;
  }
}
`,"src/core/CinematicSystem.ts":`import type { IEventBus, IAudioManager } from "@/core/Interfaces";

interface CinematicEvent {
  triggerTime: number;
  fired: boolean;
  action: () => void;
}

export class CinematicSystem {
  private events: IEventBus;
  private audio: IAudioManager;
  private cinematicActive = false;
  private bossDeathTimer = -1;
  private bossDeathPos: { x: number; y: number } | null = null;
  private cinematicTimeline = 0;
  private cinematicQueue: CinematicEvent[] = [];

  constructor(events: IEventBus, audio: IAudioManager) {
    this.events = events;
    this.audio = audio;
  }

  public isActive(): boolean {
    return this.cinematicActive;
  }

  public getDeathTimer(): number {
    return this.bossDeathTimer;
  }

  public getDeathPos(): { x: number; y: number } | null {
    return this.bossDeathPos;
  }

  public update(dt: number): void {
    if (this.bossDeathTimer >= 0) {
      this.bossDeathTimer += dt;
    }
    if (this.cinematicActive) {
      this.cinematicTimeline += dt;
      for (const evt of this.cinematicQueue) {
        if (!evt.fired && this.cinematicTimeline >= evt.triggerTime) {
          evt.action();
          evt.fired = true;
        }
      }
    }
  }

  public startSequence(pos: { x: number; y: number }, initialExplosion: () => void, events: { triggerTime: number; action: () => void }[]): void {
    this.cinematicActive = true;
    this.events.publish("CLEAR_DIALOGUES", undefined);
    this.audio.stopChargeDrone();
    this.audio.stopHealDrone();
    initialExplosion();

    this.bossDeathTimer = 0;
    this.bossDeathPos = { x: pos.x, y: pos.y };

    this.events.publish("CAMERA_SHAKE", { amplitude: 30, duration: 1.8 });

    this.cinematicTimeline = 0;
    this.cinematicQueue = events.map((e) => ({ ...e, fired: false }));
  }

  public cleanup(): void {
    this.cinematicQueue = [];
    this.cinematicTimeline = 0;
    this.bossDeathTimer = -1;
    this.bossDeathPos = null;
    this.cinematicActive = false;
  }
}
`,"src/core/EncounterDirector.ts":`import { IWorld } from "./Interfaces";
import { SpawnAnchor, MinionType } from "./levelData";
import { BaseMinion } from "@/entities/BaseMinion";
import { MinionFactory } from "@/entities/MinionFactory";
import { TrigLUT } from "./TrigLUT";
import { GAUNTLET_STAGES, StageConfig } from "./design/GauntletStages";

export class EncounterDirector {
  private world: IWorld;
  private currentPhase = 1;
  private currentWaveIndex = 0;
  private waveClearTimer = 1.2;
  private isBetweenWaves = true;
  private activeStageConfig: StageConfig = GAUNTLET_STAGES[0];

  private unsubs: (() => void)[] = [];

  constructor(world: IWorld) {
    this.world = world;
    this.setupSubscriptions();
    this.reset();
  }

  private setupSubscriptions() {
    this.unsubs.push(
      this.world.events.subscribe("BOSS_PHASE_SHIFT", () => {
        this.currentPhase = Math.min(3, this.currentPhase + 1);
      })
    );

    this.unsubs.push(
      this.world.events.subscribe("MINION_DESPAWN_ALL", () => {
        this.despawnAllMinions();
      })
    );
  }

  public loadStage(stage: StageConfig) {
    this.activeStageConfig = stage;
    this.reset();
  }

  public update(dt: number) {
    if (this.world.boss && this.world.boss.isDead) {
      return;
    }

    // Clean up dead minions
    for (let i = this.world.minions.length - 1; i >= 0; i--) {
      const m = this.world.minions[i];
      if (m.isDead) {
        m.teardown();
        this.world.minions.splice(i, 1);
      }
    }

    const activeCount = this.world.minions.length;

    if (activeCount === 0 && !this.isBetweenWaves) {
      this.isBetweenWaves = true;
      this.waveClearTimer = 1.5; // colosseum-style buffer between waves
    }

    if (this.isBetweenWaves) {
      this.waveClearTimer -= dt;
      if (this.waveClearTimer <= 0) {
        this.isBetweenWaves = false;
        this.triggerNextWave();
      }
    }
  }

  private getMinionThreatValue(type: MinionType): number {
    switch (type) {
      case "TURRET": return 2;
      case "LANCER": return 2;
      case "PIT_LANCER": return 3;
      case "FLYER": return 2;
      case "COMPASS_WASP": return 3;
      case "CLAMPJAW": return 4;
      case "SHIELDER": return 3;
      case "HYMN_NAIL": return 2;
      case "BLISTER_OX": return 5;
      case "BELL_HAMMER": return 4;
      case "SHARD_CHOIR": return 1;
      default: return 2;
    }
  }

  private triggerNextWave() {
    const waves = this.activeStageConfig.encounterWaves;
    if (waves.length === 0) return;

    // Cycle through waves sequentially
    const wave = waves[this.currentWaveIndex % waves.length];
    this.currentWaveIndex++;

    // Calculate maximum threat based on active boss footprint and narrow map constraints
    const bossActive = this.world.boss && !this.world.boss.isDead;
    const isNarrowMap = false; // Narrow Redoubt

    let maxThreatBudget = bossActive ? 4 : 8;
    if (isNarrowMap) {
      maxThreatBudget = bossActive ? 2 : 4;
    }

    let activeThreat = 0;
    for (const m of this.world.minions) {
      activeThreat += this.getMinionThreatValue((m as BaseMinion).minionType);
    }

    const maxCandidates = Math.min(wave.maxActiveMinions, isNarrowMap ? 2 : 4);

    for (let i = 0; i < maxCandidates; i++) {
      let totalWeight = 0;
      for (const entry of wave.entries) totalWeight += entry.weight;
      const entryRand = TrigLUT.randomGameplay() * totalWeight;
      let accumulatedWeight = 0;
      let selectedEntry = wave.entries[0];

      for (const entry of wave.entries) {
        accumulatedWeight += entry.weight;
        if (entryRand <= accumulatedWeight) {
          selectedEntry = entry;
          break;
        }
      }

      const candidateThreat = this.getMinionThreatValue(selectedEntry.type);
      if (activeThreat + candidateThreat > maxThreatBudget) {
        continue; // Exceeds tactical screen footprint and threat budget bounds
      }

      const anchor = this.findSafeAnchor(selectedEntry.anchorIds, selectedEntry.anchorTags);
      if (anchor) {
        this.spawnMinion(selectedEntry.type, anchor);
        activeThreat += candidateThreat;
      }
    }

    // Play colosseum rattle/confirm feedback
    this.world.audio.playDashRecharge();
  }

  private findSafeAnchor(ids?: string[], tags?: string[]): SpawnAnchor | null {
    let candidates = this.activeStageConfig.spawnAnchors;

    if (ids && ids.length > 0) {
      candidates = candidates.filter((a) => ids.includes(a.id));
    } else if (tags && tags.length > 0) {
      candidates = candidates.filter((a) => a.tags.some((t) => tags.includes(t)));
    }

    if (candidates.length === 0) {
      return null;
    }

    const player = this.world.player;
    const boss = this.world.boss;

    let bestAnchor: SpawnAnchor | null = null;
    let highestSafetyScore = -Infinity;

    for (const anchor of candidates) {
      const dp = player ? Math.sqrt(Math.pow(player.position.x - anchor.x, 2) + Math.pow(player.position.y - anchor.y, 2)) : 500;
      const db = boss ? Math.sqrt(Math.pow(boss.position.x - anchor.x, 2) + Math.pow(boss.position.y - anchor.y, 2)) : 500;

      // Safe Spawn Anchor scoring formula to calculate tactical placement
      let safetyScore = dp * 1.0 + db * 0.45;

      // Penalize anchors that spawn directly on top of active hazards or exit lanes
      if (dp < 160) safetyScore -= 300;
      if (db < 80) safetyScore -= 150;

      if (safetyScore > highestSafetyScore) {
        highestSafetyScore = safetyScore;
        bestAnchor = anchor;
      }
    }

    return bestAnchor || candidates[0] || null;
  }

  private spawnMinion(type: MinionType, anchor: SpawnAnchor) {
    if (type === "SHARD_CHOIR") {
      const offsets = [
        { dx: 0, dy: -30 },
        { dx: -35, dy: 15 },
        { dx: 35, dy: 15 }
      ];
      offsets.forEach((offset, idx) => {
        const minionId = \`minion-SHARD_CHOIR-\${Date.now()}-\${idx}-\${Math.floor(TrigLUT.randomGameplay() * 1000000)}\`;
        const minion = MinionFactory.createMinion("SHARD_CHOIR", minionId, { x: anchor.x + offset.dx, y: anchor.y + offset.dy }, this.world);
        this.world.minions.push(minion);
      });
    } else {
      const minionId = \`minion-\${type}-\${Date.now()}-\${Math.floor(TrigLUT.randomGameplay() * 1000000)}\`;
      const minion = MinionFactory.createMinion(type, minionId, { x: anchor.x, y: anchor.y }, this.world);
      this.world.minions.push(minion);
    }
  }

  private despawnAllMinions() {
    for (const m of this.world.minions) {
      m.teardown();
    }
    this.world.minions = [];
  }

  public reset() {
    this.despawnAllMinions();
    this.currentPhase = 1;
    this.currentWaveIndex = 0;
    this.waveClearTimer = 1.2;
    this.isBetweenWaves = true;
  }

  public teardown() {
    this.unsubs.forEach((unsub) => unsub());
    this.unsubs = [];
    this.despawnAllMinions();
  }
}
`,"src/core/Engine.ts":`import GameLoop from "@/core/GameLoop";
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

  // Morph and transition states
  private sourceSolids: Rectangle[] = [];
  private targetSolids: Rectangle[] = [];
  private sourceOneways: Rectangle[] = [];
  private targetOneways: Rectangle[] = [];
  private sourceHazards: Rectangle[] = [];
  private targetHazards: Rectangle[] = [];
  private morphTimer: number = 0;
  private morphDuration: number = 0;

  constructor(world: World, renderer: WorldRenderer) {
    this.world = world;
    this.renderer = renderer;
    this.stateProjection = new StateProjectionSystem(this.world.events);
    this.minionCollisionSystem = new MinionCollisionSystem();
    this.entityResetService = new EntityResetService();

    const activeStageIdx = useSessionStore.getState().currentStageIndex;
    this.levelConfig = GAUNTLET_STAGES[activeStageIdx] || GAUNTLET_STAGES[0];

    // Create deep copies to avoid reference mutations
    this.solids = this.levelConfig.solids.map(r => ({ ...r }));
    this.onewayPlatforms = this.levelConfig.onewayPlatforms.map(r => ({ ...r }));
    this.hazards = this.levelConfig.hazards.map(r => ({ ...r }));

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

  private interpolateRects(src: Rectangle[], dest: Rectangle[], output: Rectangle[], t: number) {
    const maxLen = Math.max(src.length, dest.length);
    output.length = maxLen;
    for (let i = 0; i < maxLen; i++) {
      const s = src[i] || { x: dest[i]?.x ?? 0, y: dest[i]?.y ?? 0, width: 0, height: 0 };
      const d = dest[i] || { x: src[i]?.x ?? 0, y: src[i]?.y ?? 0, width: 0, height: 0 };

      if (!output[i]) {
        output[i] = { x: 0, y: 0, width: 0, height: 0 };
      }
      output[i].x = s.x + (d.x - s.x) * t;
      output[i].y = s.y + (d.y - s.y) * t;
      output[i].width = s.width + (d.width - s.width) * t;
      output[i].height = s.height + (d.height - s.height) * t;
    }
  }

  public loadStage(stageIndex: number, forceInstant = false) {
    const stage = GAUNTLET_STAGES[stageIndex];
    if (!stage) return;

    // Differentiate retries (same stage) from screen transitions/progressions
    const isProgression = !forceInstant && this.levelConfig && this.levelConfig.id !== stage.id;

    if (isProgression) {
      // Begin physical morph sequence
      this.sourceSolids = this.solids.map(r => ({ ...r }));
      this.targetSolids = stage.solids.map(r => ({ ...r }));
      this.sourceOneways = this.onewayPlatforms.map(r => ({ ...r }));
      this.targetOneways = stage.onewayPlatforms.map(r => ({ ...r }));
      this.sourceHazards = this.hazards.map(r => ({ ...r }));
      this.targetHazards = stage.hazards.map(r => ({ ...r }));

      this.morphTimer = 1.8;
      this.morphDuration = 1.8;
      this.levelConfig = stage;

      // Spawn progression particles
      setTimeout(() => {
        this.world.events.publishSpark(stage.playerStart.x, stage.playerStart.y, 0, "hsl(142, 71%, 58%)", true, 35);
        this.world.events.publishBlast(stage.playerStart.x, stage.playerStart.y, "hsl(142, 100%, 80%)");
        this.world.events.publishSpark(stage.bossStart.x, stage.bossStart.y, 0, "hsl(350, 82%, 58%)", true, 35);
        this.world.events.publishBlast(stage.bossStart.x, stage.bossStart.y, "hsl(350, 100%, 80%)");
        this.world.events.publish("CAMERA_SHAKE", { amplitude: 15, duration: 0.8 });
        this.world.audio.playDashRecharge();
      }, 50);
    } else {
      // Instant reload layout
      this.levelConfig = stage;
      this.solids = stage.solids.map(r => ({ ...r }));
      this.onewayPlatforms = stage.onewayPlatforms.map(r => ({ ...r }));
      this.hazards = stage.hazards.map(r => ({ ...r }));
      this.morphTimer = 0;
    }

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

    // Apply morph interpolation during transitions
    if (this.morphTimer > 0) {
      this.morphTimer -= dt;
      const progress = 1.0 - Math.max(0, this.morphTimer / this.morphDuration);

      this.interpolateRects(this.sourceSolids, this.targetSolids, this.solids, progress);
      this.interpolateRects(this.sourceOneways, this.targetOneways, this.onewayPlatforms, progress);
      this.interpolateRects(this.sourceHazards, this.targetHazards, this.hazards, progress);

      this.rebuildPhysics();
      this.renderer.resetCache();
    }

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
`,"src/core/EntityRenderer.ts":`import { Player } from "@/entities/Player";
import { Projectile } from "@/entities/Projectile";
import { Boss } from "@/entities/Boss";
import { BaseEntity } from "@/entities/BaseEntity";
import { ObjectPool } from "./ObjectPool";
import { UNITS } from "@/core/Units";
import { World } from "./World";
import { MinionVisuals } from "./visuals/MinionVisuals";
import { BossVisuals } from "./visuals/BossVisuals";
import { BaseMinion } from "@/entities/BaseMinion";

export class EntityRenderer {
  private ctx: CanvasRenderingContext2D;
  private meleeSideCanvas: HTMLCanvasElement;
  private attackGradCanvas: HTMLCanvasElement;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    const meleeReach = UNITS.MELEE_MAX_REACH;
    const meleeInner = UNITS.MELEE_SWEEP_INNER_RADIUS;
    const meleeCanvasSize = meleeReach * 2 + 20;
    this.meleeSideCanvas = document.createElement("canvas");
    this.meleeSideCanvas.width = meleeCanvasSize;
    this.meleeSideCanvas.height = meleeCanvasSize;
    const meleeCtx = this.meleeSideCanvas.getContext("2d")!;
    const centerM = meleeCanvasSize / 2;
    const sideGrad = meleeCtx.createRadialGradient(centerM, centerM, meleeInner, centerM, centerM, meleeReach);
    sideGrad.addColorStop(0.0, "rgba(255, 255, 255, 0)");
    sideGrad.addColorStop(0.2, "rgba(255, 255, 255, 1.0)");
    sideGrad.addColorStop(0.5, "rgba(132, 239, 158, 0.95)");
    sideGrad.addColorStop(0.85, "rgba(34, 197, 94, 0.85)");
    sideGrad.addColorStop(1.0, "rgba(34, 197, 94, 0)");
    meleeCtx.fillStyle = sideGrad;
    meleeCtx.fillRect(0, 0, meleeCanvasSize, meleeCanvasSize);

    this.attackGradCanvas = document.createElement("canvas");
    this.attackGradCanvas.width = 128;
    this.attackGradCanvas.height = 128;
    const attackCtx = this.attackGradCanvas.getContext("2d")!;
    const attackGrad = attackCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    attackGrad.addColorStop(0.0, "rgba(255, 255, 255, 0)");
    attackGrad.addColorStop(0.2, "rgba(255, 255, 255, 1.0)");
    attackGrad.addColorStop(0.5, "rgba(132, 239, 158, 0.95)");
    attackGrad.addColorStop(0.85, "rgba(34, 197, 94, 0.85)");
    attackGrad.addColorStop(1.0, "rgba(34, 197, 94, 0)");
    attackCtx.fillStyle = attackGrad;
    attackCtx.fillRect(0, 0, 128, 128);
  }

  public renderEntities(world: World, projectilePool: ObjectPool<Projectile>, alpha: number): void {
    if (world.boss) {
      BossVisuals.draw(this.ctx, world.boss as Boss, alpha);
    }

    if (world.player) {
      (world.player as BaseEntity).draw(this.ctx, alpha);
      const player = world.player as Player;
      if (player.attackActive) {
        this.drawPlayerAttackVisual(player, alpha);
      }
    }

    for (const minion of world.minions) {
      MinionVisuals.draw(this.ctx, minion as BaseMinion, alpha);
    }

    const activeProjectiles = projectilePool.getActive();
    for (const proj of activeProjectiles) {
      proj.draw(this.ctx, alpha);
    }
  }

  private drawPlayerAttackVisual(player: Player, alpha: number): void {
    const facing = player.facingDirection;
    this.ctx.lineCap = "round";

    const progress = 1.0 - player.meleeComponent.attackActiveTimer / 0.09;
    const opacity = Math.max(0, player.meleeComponent.attackActiveTimer / 0.09);

    if (opacity <= 0.01) return;

    const drawX = player.previousPosition.x + (player.position.x - player.previousPosition.x) * alpha;
    const drawY = player.previousPosition.y + (player.position.y - player.previousPosition.y) * alpha;

    if (player.attackDirection === "side") {
      const offset = facing * UNITS.MELEE_SIDE_OFFSET;
      const baseStart = -Math.PI / 2;
      const angleLength = Math.PI;
      const currentSweepAngle = angleLength * progress;

      const cx = drawX + offset;
      const cy = drawY;

      this.ctx.save();
      this.ctx.translate(cx, cy);
      this.ctx.globalAlpha = opacity;

      const startA = facing > 0 ? baseStart : Math.PI - baseStart;
      const endA = facing > 0 ? baseStart + currentSweepAngle : Math.PI - (baseStart + currentSweepAngle);
      this.ctx.beginPath();
      this.ctx.arc(0, 0, UNITS.MELEE_MAX_REACH, startA, endA, facing < 0);
      this.ctx.arc(0, 0, UNITS.MELEE_SWEEP_INNER_RADIUS, endA, startA, facing > 0);
      this.ctx.closePath();
      this.ctx.clip();

      const cs = this.meleeSideCanvas.width;
      this.ctx.drawImage(this.meleeSideCanvas, -cs / 2, -cs / 2, cs, cs);
      this.ctx.restore();
    } else if (player.attackDirection === "up") {
      const cx = drawX;
      const cy = drawY - UNITS.MELEE_VERTICAL_OFFSET;

      const currentRadius = 30 + progress * 65;
      const currentInnerRadius = 15 + progress * 15;

      this.ctx.save();
      this.ctx.globalAlpha = opacity;
      this.ctx.translate(cx, cy);
      const gradScale = currentRadius / 64;
      this.ctx.scale(gradScale, gradScale);
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 64, -Math.PI, 0);
      this.ctx.arc(0, 0, currentInnerRadius / gradScale, 0, -Math.PI, true);
      this.ctx.closePath();
      this.ctx.clip();
      this.ctx.drawImage(this.attackGradCanvas, -64, -64, 128, 128);
      this.ctx.restore();
    } else if (player.attackDirection === "down") {
      const cx = drawX;
      const cy = drawY + UNITS.MELEE_VERTICAL_OFFSET;

      const currentRadius = 30 + progress * 65;
      const currentInnerRadius = 15 + progress * 15;

      this.ctx.save();
      this.ctx.globalAlpha = opacity;
      this.ctx.translate(cx, cy);
      const gradScale2 = currentRadius / 64;
      this.ctx.scale(gradScale2, gradScale2);
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 64, 0, Math.PI);
      this.ctx.arc(0, 0, currentInnerRadius / gradScale2, Math.PI, 0, true);
      this.ctx.closePath();
      this.ctx.clip();
      this.ctx.drawImage(this.attackGradCanvas, -64, -64, 128, 128);
      this.ctx.restore();
    }
  }
}
`,"src/core/GameLoop.ts":`class GameLoop {
  private lastTime: number = 0;
  private rafId: number | null = null;
  private isRunning: boolean = false;

  private onUpdate: (dt: number) => void;
  private onRender: () => void;

  constructor(onUpdate: (dt: number) => void, onRender: () => void) {
    this.onUpdate = onUpdate;
    this.onRender = onRender;

    if (typeof window !== "undefined") {
      document.addEventListener("visibilitychange", this.handleVisibilityChange);
    }
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  public stop() {
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private loop = (currentTime: number) => {
    if (!this.isRunning) return;

    let dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    if (dt > 0.1) {
      dt = 0.1;
    }

    this.onUpdate(dt);
    this.onRender();

    this.rafId = requestAnimationFrame(this.loop);
  };

  private handleVisibilityChange = () => {
    if (document.hidden) {
      this.stop();
    } else {
      this.start();
    }
  };

  public cleanup() {
    this.stop();
    if (typeof window !== "undefined") {
      document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    }
  }
}

export default GameLoop;
`,"src/core/GauntletDirector.ts":`import { eventBroker } from "./eventBroker";
import { useSessionStore, useGameplayStore } from "@/store/useGameStore";
import { GAUNTLET_STAGES } from "./design/GauntletStages";

export class GauntletDirector {
  private static initialized = false;

  public static init() {
    if (GauntletDirector.initialized) return;
    GauntletDirector.initialized = true;

    if (typeof window !== "undefined") {
      // Removed stage warping hotkeys for streamlined production single-stage chancel
    }
  }

  public static warpToStage(stageIndex: number) {
    const stage = GAUNTLET_STAGES[stageIndex];
    if (!stage) return;

    useGameplayStore.getState().resetGameSession();
    useSessionStore.getState().setCurrentStageIndex(stageIndex);
    useSessionStore.getState().navTo("PLAYING");

    setTimeout(() => {
      eventBroker.publish("LOAD_STAGE", { stageIndex });
    }, 100);
  }
}
`,"src/core/GreedyMerger.ts":`import { Rectangle } from "./Interfaces";

export class GreedyMerger {
  public static merge(rects: Rectangle[]): Rectangle[] {
    if (rects.length <= 1) return [...rects];

    const list = rects.map((r) => ({ ...r, merged: false }));
    let changed = true;

    while (changed) {
      changed = false;

      for (let i = 0; i < list.length; i++) {
        if (list[i].merged) continue;
        const r1 = list[i];

        for (let j = 0; j < list.length; j++) {
          if (i === j || list[j].merged) continue;
          const r2 = list[j];

          const touchH = (r1.x + r1.width === r2.x) || (r2.x + r2.width === r1.x);
          const identicalY = (r1.y === r2.y) && (r1.height === r2.height);

          if (touchH && identicalY) {
            const minX = Math.min(r1.x, r2.x);
            const maxX = Math.max(r1.x + r1.width, r2.x + r2.width);
            r1.x = minX;
            r1.width = maxX - minX;
            r2.merged = true;
            changed = true;
          }
        }
      }

      for (let i = 0; i < list.length; i++) {
        if (list[i].merged) continue;
        const r1 = list[i];

        for (let j = 0; j < list.length; j++) {
          if (i === j || list[j].merged) continue;
          const r2 = list[j];

          const touchV = (r1.y + r1.height === r2.y) || (r2.y + r2.height === r1.y);
          const identicalX = (r1.x === r2.x) && (r1.width === r2.width);

          if (touchV && identicalX) {
            const minY = Math.min(r1.y, r2.y);
            const maxY = Math.max(r1.y + r1.height, r2.y + r2.height);
            r1.y = minY;
            r1.height = maxY - minY;
            r2.merged = true;
            changed = true;
          }
        }
      }
    }

    return list
      .filter((r) => !r.merged)
      .map((r) => ({
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
      }));
  }
}
`,"src/core/InputProvider.ts":`export type Action = "MOVE_LEFT" | "MOVE_RIGHT" | "MOVE_UP" | "MOVE_DOWN" | "JUMP" | "ATTACK" | "DASH";
export type KeyMap = Record<Action, string[]>;

export interface IInputDevice {
  update(): Record<Action, boolean>;
  isPauseJustPressed?(): boolean;
  cleanup?(): void;
}

export class KeyboardInputDevice implements IInputDevice {
  private pressed: Record<Action, boolean> = {
    MOVE_LEFT: false,
    MOVE_RIGHT: false,
    MOVE_UP: false,
    MOVE_DOWN: false,
    JUMP: false,
    ATTACK: false,
    DASH: false,
  };
  private pauseJustPressed = false;
  private keyMap: KeyMap;

  constructor(keyMap?: KeyMap) {
    this.keyMap = keyMap ?? {
      MOVE_LEFT: ["ArrowLeft", "KeyA"],
      MOVE_RIGHT: ["ArrowRight", "KeyD"],
      MOVE_UP: ["ArrowUp", "KeyW"],
      MOVE_DOWN: ["ArrowDown", "KeyS"],
      JUMP: ["Space", "KeyX"],
      ATTACK: ["KeyC"],
      DASH: ["KeyZ"],
    };
  }

  public setKeyMap(keyMap: KeyMap) {
    this.keyMap = keyMap;
  }

  public activate() {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", this.handleKeyDown);
      window.addEventListener("keyup", this.handleKeyUp);
    }
  }

  public deactivate() {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.handleKeyDown);
      window.removeEventListener("keyup", this.handleKeyUp);
    }
  }



  private getActionFromCode(code: string): Action | null {
    for (const action in this.keyMap) {
      if (this.keyMap[action as Action]?.includes(code)) {
        return action as Action;
      }
    }
    return null;
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "KeyP") {
      e.preventDefault();
      this.pauseJustPressed = true;
      return;
    }
    const action = this.getActionFromCode(e.code);
    if (action) {
      e.preventDefault();
      this.pressed[action] = true;
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    const action = this.getActionFromCode(e.code);
    if (action) {
      e.preventDefault();
      this.pressed[action] = false;
    }
  };

  public update(): Record<Action, boolean> {
    return { ...this.pressed };
  }

  public triggerTouchStart(action: Action) {
    this.pressed[action] = true;
  }

  public triggerTouchEnd(action: Action) {
    this.pressed[action] = false;
  }

  public isPauseJustPressed(): boolean {
    const val = this.pauseJustPressed;
    this.pauseJustPressed = false;
    return val;
  }

  public cleanup() {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.handleKeyDown);
      window.removeEventListener("keyup", this.handleKeyUp);
    }
  }
}

export class GamepadInputDevice implements IInputDevice {
  public update(): Record<Action, boolean> {
    const pressed: Record<Action, boolean> = {
      MOVE_LEFT: false,
      MOVE_RIGHT: false,
      MOVE_UP: false,
      MOVE_DOWN: false,
      JUMP: false,
      ATTACK: false,
      DASH: false,
    };

    if (typeof navigator === "undefined" || !navigator.getGamepads) return pressed;

    const gamepads = navigator.getGamepads();
    for (let i = 0; i < gamepads.length; i++) {
      const gp = gamepads[i];
      if (!gp) continue;

      if (gp.buttons[0]?.pressed) pressed["JUMP"] = true;
      if (gp.buttons[2]?.pressed || gp.buttons[3]?.pressed) pressed["ATTACK"] = true;
      if (gp.buttons[1]?.pressed || gp.buttons[5]?.pressed || gp.buttons[7]?.pressed)
        pressed["DASH"] = true;

      const axisThreshold = 0.35;
      if (gp.axes[0] < -axisThreshold || gp.buttons[14]?.pressed) pressed["MOVE_LEFT"] = true;
      if (gp.axes[0] > axisThreshold || gp.buttons[15]?.pressed) pressed["MOVE_RIGHT"] = true;
      if (gp.axes[1] < -axisThreshold || gp.buttons[12]?.pressed) pressed["MOVE_UP"] = true;
      if (gp.axes[1] > axisThreshold || gp.buttons[13]?.pressed) pressed["MOVE_DOWN"] = true;
    }

    return pressed;
  }
}

class InputProvider {
  private devices: IInputDevice[] = [];
  private keyboardDevice!: KeyboardInputDevice;
  private pauseJustPressed = false;
  private pressTimestamps: Record<Action, number> = {
    MOVE_LEFT: 0,
    MOVE_RIGHT: 0,
    MOVE_UP: 0,
    MOVE_DOWN: 0,
    JUMP: 0,
    ATTACK: 0,
    DASH: 0,
  };

  private pressed: Record<Action, boolean> = {
    MOVE_LEFT: false,
    MOVE_RIGHT: false,
    MOVE_UP: false,
    MOVE_DOWN: false,
    JUMP: false,
    ATTACK: false,
    DASH: false,
  };

  private justPressed: Record<Action, boolean> = {
    MOVE_LEFT: false,
    MOVE_RIGHT: false,
    MOVE_UP: false,
    MOVE_DOWN: false,
    JUMP: false,
    ATTACK: false,
    DASH: false,
  };

  private justReleased: Record<Action, boolean> = {
    MOVE_LEFT: false,
    MOVE_RIGHT: false,
    MOVE_UP: false,
    MOVE_DOWN: false,
    JUMP: false,
    ATTACK: false,
    DASH: false,
  };

  private hasVibrationSupport = typeof navigator !== "undefined" && !!navigator.vibrate;
  private active = true;

  constructor(keyMap?: KeyMap) {
    this.keyboardDevice = new KeyboardInputDevice(keyMap);
    this.devices.push(this.keyboardDevice);
    this.devices.push(new GamepadInputDevice());
    this.keyboardDevice.activate();

    if (typeof window !== "undefined") {
      window.addEventListener("blur", this.handleBlur);
    }
  }

  public setActive(v: boolean) {
    this.active = v;
    if (v) {
      this.keyboardDevice.activate();
    } else {
      this.keyboardDevice.deactivate();
    }
  }

  public isActive(): boolean {
    return this.active;
  }

  public setKeyMap(keyMap: KeyMap) {
    this.keyboardDevice.setKeyMap(keyMap);
  }

  private handleBlur = () => {
    this.pauseJustPressed = false;
    for (const key in this.pressed) {
      const action = key as Action;
      this.pressed[action] = false;
      this.justPressed[action] = false;
      this.justReleased[action] = false;
      this.pressTimestamps[action] = 0;
    }
  };

  public triggerTouchStart(action: Action) {
    this.keyboardDevice.triggerTouchStart(action);
  }

  public triggerTouchEnd(action: Action) {
    this.keyboardDevice.triggerTouchEnd(action);
  }

  public consumeBufferedAction(action: Action, windowMs = 100): boolean {
    const elapsed = performance.now() - this.pressTimestamps[action];
    if (elapsed <= windowMs) {
      this.pressTimestamps[action] = 0;
      return true;
    }
    return false;
  }

  public isPressed(action: Action): boolean {
    return this.pressed[action];
  }

  public isJustPressed(action: Action): boolean {
    return this.justPressed[action];
  }

  public isJustReleased(action: Action): boolean {
    return this.justReleased[action];
  }

  public getAxis(negative: Action, positive: Action): number {
    let axis = 0;
    if (this.pressed[negative]) axis -= 1;
    if (this.pressed[positive]) axis += 1;
    return axis;
  }

  public triggerHapticFeedback(strength: "light" | "medium" | "heavy") {
    if (this.hasVibrationSupport) {
      if (strength === "light") {
        navigator.vibrate(30);
      } else if (strength === "medium") {
        navigator.vibrate(80);
      } else if (strength === "heavy") {
        navigator.vibrate([150, 50, 150]);
      }
    }

    if (typeof navigator === "undefined" || !navigator.getGamepads) return;
    const gamepads = navigator.getGamepads();
    for (const gp of gamepads) {
      if (gp && gp.vibrationActuator && gp.vibrationActuator.playEffect) {
        let weak = 0.2;
        let strong = 0.0;
        let duration = 100;

        if (strength === "medium") {
          weak = 0.5;
          strong = 0.3;
          duration = 200;
        } else if (strength === "heavy") {
          weak = 0.9;
          strong = 0.9;
          duration = 400;
        }

        gp.vibrationActuator
          .playEffect("dual-rumble", {
            startDelay: 0,
            duration: duration,
            weakMagnitude: weak,
            strongMagnitude: strong,
          })
          .catch(() => {});
      }
    }
  }

  public update() {
    const combinedPressed: Record<Action, boolean> = {
      MOVE_LEFT: false,
      MOVE_RIGHT: false,
      MOVE_UP: false,
      MOVE_DOWN: false,
      JUMP: false,
      ATTACK: false,
      DASH: false,
    };

    for (const device of this.devices) {
      const devicePressed = device.update();
      for (const key in combinedPressed) {
        const action = key as Action;
        if (devicePressed[action]) {
          combinedPressed[action] = true;
        }
      }
      if (device.isPauseJustPressed && device.isPauseJustPressed()) {
        this.pauseJustPressed = true;
      }
    }

    const actions: Action[] = ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_UP", "MOVE_DOWN", "JUMP", "ATTACK", "DASH"];
    for (const action of actions) {
      const isNowPressed = combinedPressed[action];
      const wasPressed = this.pressed[action];

      this.pressed[action] = isNowPressed;

      if (isNowPressed && !wasPressed) {
        this.justPressed[action] = true;
        this.pressTimestamps[action] = performance.now();
      } else if (!isNowPressed && wasPressed) {
        this.justReleased[action] = true;
      }
    }
  }

  public postUpdate() {
    this.pauseJustPressed = false;
    for (const key in this.justPressed) {
      const action = key as Action;
      this.justPressed[action] = false;
      this.justReleased[action] = false;
    }
  }

  public isPauseJustPressed(): boolean {
    return this.pauseJustPressed;
  }

  public cleanup() {
    for (const device of this.devices) {
      if (device.cleanup) {
        device.cleanup();
      }
    }
    if (typeof window !== "undefined") {
      window.removeEventListener("blur", this.handleBlur);
    }
  }
}

export const inputProvider = new InputProvider();
`,"src/core/Interfaces.ts":`import { IEntityComponent } from "@/entities/EntityComponent";

export type GameEventMap = {
  LOAD_STAGE: { stageIndex: number };
  PLAYER_HURT: { amount: number; currentHealth: number; maxHealth: number };
  BOSS_HURT: { amount: number; currentHealth: number; maxHealth: number; sourceX: number; sourceY: number; intensity: number };
  MINION_HURT: { id: string; amount: number; currentHealth: number; maxHealth: number; sourceX: number; sourceY: number; intensity: number };
  PLAYER_HEALED: { amount: number; currentHealth: number; maxHealth: number };
  PLAYER_JUMPED: void;
  PLAYER_DASHED: { direction: number };
  PLAYER_POGOED: void;
  PLAYER_ATTACKED: { direction: "side" | "up" | "down" };
  PLAYER_PROJECTILE_FIRED: { level: 1 | 2; dirX: number; dirY: number };
  HEALING_CHARGES_CHANGED: { charges: number };
  DETERMINATION_CHANGED: { determination: number };
  DIALOGUE_TRIGGERED: { speaker: "player" | "boss"; text: string };
  CAMERA_SHAKE: { amplitude: number; duration: number };
  HIT_STOP: { duration: number };
  BOSS_DEFEATED: { x: number; y: number };
  GAME_OVER: void;
  VICTORY: void;
  CLEAR_DIALOGUES: void;
  SPAWN_SPARKS: { x: number; y: number; angle: number; color?: string; radial?: boolean; count?: number; turbulence?: number; shape?: "spark" | "line" };
  SPAWN_DUST: { x: number; y: number; direction?: "horizontal" | "vertical" };
  SPAWN_BLAST: { x: number; y: number; color: string };
  PLAYER_DROPPED: void;
  PLAYER_LANDED: void;
  HEAL_START: void;
  HEAL_CANCEL: void;
  HEAL_UPDATE: { timer: number };
  HEAL_COMPLETE: void;
  PLAYER_SPIKED: { x: number };
  BOSS_PHASE_SHIFT: void;
  MINION_SPAWNING: void;
  MINION_DISSOLVING: void;
  PLAYER_DASH_RECHARGED: void;
  BOSS_SWIPED: void;
  BOSS_TELEGRAPH: void;
  BOSS_LUNGED: void;
  CHARGE_START: void;
  CHARGE_UPDATE: { timer: number };
  CHARGE_STOP: void;
  CHARGE_MAXED: void;
  CHARGE_CANCEL: void;
  REQUEST_RETRY: void;
  REQUEST_MENU: void;
  PLATFORM_IMPACT: { platform: Rectangle; velocityY: number; massMultiplier: number };
  STATE_PROJECTED: { playerHP: number; bossHP: number; healingCharges: number; determination: number };
  RECORD_LOSS: void;
  RECORD_WIN: void;
  SESSION_RESET: void;
};

export type EventCallback<T> = (payload: T) => void;

export enum EntityStatus {
  SPAWNING = "SPAWNING",
  ACTIVE = "ACTIVE",
  DYING = "DYING",
  DEAD = "DEAD",
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  shape: "spark" | "dust" | "ring" | "line";
  drag?: number;
  startColor?: string;
  endColor?: string;
}

export interface ITransform {
  position: Vector2D;
  previousPosition: Vector2D;
  velocity: Vector2D;
  size: { width: number; height: number };
}

export interface ISpringVisuals {
  visualScale: Vector2D;
  targetVisualScale: Vector2D;
  scaleVelocity: Vector2D;
  rotation: number;
  targetRotation: number;
  rotationVelocity: number;
  squashPivot: "center" | "feet";
}

export interface IRenderable {
  draw(ctx: CanvasRenderingContext2D, alpha?: number): void;
}

export interface IEntity extends ITransform {
  id: string;
  isDead: boolean;
  status: EntityStatus;
  world: IWorld;
  update(dt: number): void;
  teardown(): void;
  addComponent<T extends IEntityComponent>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentClass: new (...args: any[]) => T,
    component: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencies?: Record<string, any>
  ): T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getComponent<T extends IEntityComponent>(componentClass: new (...args: any[]) => T): T | null;
  startDeathSequence?(): void;
  registerDamageDealt?(): void;
}

export interface IProjectile extends IEntity {
  isActive: boolean;
  ownerId: "player" | "boss";
  damage: number;
}

export interface IDamageable {
  takeDamage(amount: number): boolean;
  isInvincible(): boolean;
  isFlashing(): boolean;
  currentHealth: number;
  maxHealth: number;
}

export interface IPhysicsBody {
  isGrounded: boolean;
  isOnWallLeft: boolean;
  isOnWallRight: boolean;
  gravity: number;
}

export interface IPhysicsWorld {
  solids: Rectangle[];
  hazards: Rectangle[];
  onewayPlatforms: Rectangle[];
  isOverlapping(x: number, y: number, width: number, height: number, rects: Rectangle[]): boolean;
  getOverlapCandidates(
    x: number,
    y: number,
    width: number,
    height: number,
    type: "solid" | "platform" | "hazard",
    outResult?: Rectangle[]
  ): Rectangle[];
  rebuild(solids: Rectangle[], hazards: Rectangle[], onewayPlatforms: Rectangle[]): void;
}

export interface IEventPublisher {
  publish(event: string, payload: unknown): void;
  publishSpark(
    x: number,
    y: number,
    angle: number,
    color?: string,
    radial?: boolean,
    count?: number,
    shape?: "spark" | "line",
    turbulence?: number
  ): void;
  publishDust(x: number, y: number, direction?: "horizontal" | "vertical"): void;
  publishBlast(x: number, y: number, color: string): void;
}

export interface IEntityFactory {
  getProjectiles(): readonly IProjectile[];
  releaseProjectile(proj: IProjectile): void;
  spawnProjectile(
    x: number,
    y: number,
    dirX: number,
    dirY: number,
    ownerId: "player" | "boss",
    damage: number,
    speed: number,
    lifespan: number,
    customColor?: string,
    kind?: string
  ): IProjectile;
}

export interface IWorld extends IEntityFactory {
  player: IEntity | null;
  boss: IEntity | null;
  minions: IEntity[];
  physicsWorld: IPhysicsWorld;
  events: IEventBus;
  audio: IAudioManager;
  input: IInputProvider;
}

export interface IEventBus {
  subscribe<K extends string>(event: K, callback: (payload: K extends keyof GameEventMap ? GameEventMap[K] : unknown) => void): () => void;
  publish<K extends string>(event: K, payload: K extends keyof GameEventMap ? GameEventMap[K] : unknown): void;
  publishSpark(x: number, y: number, angle: number, color?: string, radial?: boolean, count?: number, shape?: "spark" | "line", turbulence?: number): void;
  publishDust(x: number, y: number, direction?: "horizontal" | "vertical"): void;
  publishBlast(x: number, y: number, color: string): void;
}

export interface IAudioManager {
  registerCoordinateProviders(getPlayerX: () => number, getBossX: () => number, getMinionX: (id: string) => number): void;
  stopHealDrone(): void;
  stopChargeDrone(): void;
  playHitConfirm(): void;
  playErrorTick(): void;
  playPlayerExplosion(): void;
  playBossExplosion(): void;
  playDashRecharge(): void;
  playBossTelegraph(): void;
  playBossLunge(): void;
  playBossSwipe(): void;
  playBossPhaseShift(x?: number): void;
  playMenuConfirm(): void;
  playMenuBack(): void;
  playSelectTick(): void;
  stopCrowdSounds?(): void;
  playCrowdVictory?(): void;
  playCrowdDefeat?(): void;
}

export type Action = "MOVE_LEFT" | "MOVE_RIGHT" | "MOVE_UP" | "MOVE_DOWN" | "JUMP" | "ATTACK" | "DASH";

export interface IInputProvider {
  update(): void;
  postUpdate(): void;
  isPauseJustPressed(): boolean;
  triggerHapticFeedback(strength: "light" | "medium" | "heavy"): void;
  isPressed(action: Action): boolean;
  isJustPressed(action: Action): boolean;
  cleanup(): void;
}
`,"src/core/ObjectPool.ts":`export interface IPoolable {
  isActive: boolean;
  activate(...args: unknown[]): void;
  deactivate(): void;
}

export class ObjectPool<T extends IPoolable> {
  private inactivePool: T[] = [];
  private activePool: T[] = [];
  private factory: () => T;

  constructor(factory: () => T, initialSize: number = 20) {
    this.factory = factory;

    // Pre-populate pool
    for (let i = 0; i < initialSize; i++) {
      const instance = this.factory();
      instance.deactivate();
      this.inactivePool.push(instance);
    }
  }

  /**
   * Retrieves an inactive instance from the pool, activates it,
   * and tracks it in the active list.
   */
  public get(...args: unknown[]): T {
    let instance: T;

    if (this.inactivePool.length > 0) {
      instance = this.inactivePool.pop()!;
    } else {
      // Fallback: scale pool size dynamically if we run out under heavy load
      instance = this.factory();
    }

    instance.activate(...args);
    this.activePool.push(instance);
    return instance;
  }

  /**
   * Deactivates an active instance and returns it to the inactive pool.
   */
  public release(instance: T) {
    const index = this.activePool.indexOf(instance);
    if (index !== -1) {
      this.releaseAt(index);
    }
  }

  /**
   * Fast release using swap-and-pop when index is already known.
   * Avoids O(N) indexOf searches and array shifts.
   */
  public releaseAt(index: number) {
    if (index >= 0 && index < this.activePool.length) {
      const instance = this.activePool[index];
      instance.deactivate();
      this.inactivePool.push(instance);

      const last = this.activePool[this.activePool.length - 1];
      this.activePool[index] = last;
      this.activePool.pop();
    }
  }

  public getActive(): readonly T[] {
    return this.activePool;
  }

  public clear() {
    this.inactivePool = [];
    this.activePool = [];
  }
}
`,"src/core/ParticleRenderer.ts":`import { Particle } from "./Interfaces";
import { TrigLUT } from "./TrigLUT";

const colorCache = new Map<string, { h: number; s: number; l: number } | null>();
const lerpCache = new Map<string, string>();

function parseHsl(str: string): { h: number; s: number; l: number } | null {
  if (colorCache.has(str)) {
    return colorCache.get(str)!;
  }
  const regex = /hsl\\(\\s*([\\d.]+)\\s*,\\s*([\\d.]+)%\\s*,\\s*([\\d.]+)%\\s*\\)/;
  const match = str.match(regex);
  if (!match) {
    colorCache.set(str, null);
    return null;
  }
  const result = {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
  colorCache.set(str, result);
  return result;
}

function lerpHsl(startStr: string, endStr: string, pct: number): string {
  if (!startStr || !endStr) return startStr;

  const step = Math.round(pct * 20);
  const cacheKey = \`\${startStr}_\${endStr}_\${step}\`;

  const cached = lerpCache.get(cacheKey);
  if (cached) return cached;

  const c1 = parseHsl(startStr);
  const c2 = parseHsl(endStr);
  if (!c1 || !c2) return startStr;

  const factor = 1 - step / 20;
  const h = c1.h + (c2.h - c1.h) * factor;
  const s = c1.s + (c2.s - c1.s) * factor;
  const l = c1.l + (c2.l - c1.l) * factor;

  const result = \`hsl(\${h}, \${s}%, \${l}%)\`;
  lerpCache.set(cacheKey, result);
  colorCache.set(result, { h, s, l });
  return result;
}

function getHslaColor(colorStr: string, alpha: number): string {
  const parsed = parseHsl(colorStr);
  if (parsed) {
    return \`hsla(\${parsed.h}, \${parsed.s}%, \${parsed.l}%, \${alpha})\`;
  }
  return colorStr;
}

export class ParticleRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public renderParticles(particles: readonly Particle[]): void {
    const ctx = this.ctx;
    const len = particles.length;
    if (len === 0) return;

    ctx.save();

    const sparkBuckets = new Map<string, Particle[]>();
    const dustBuckets = new Map<string, Particle[]>();
    const lines: Particle[] = [];
    const rings: Particle[] = [];

    for (let i = 0; i < len; i++) {
      const p = particles[i];
      const pct = p.life / p.maxLife;

      if (p.shape === "spark") {
        const sparkColor = p.startColor && p.endColor ? lerpHsl(p.startColor, p.endColor, pct) : p.color;
        const colorKey = p.startColor && p.endColor ? sparkColor : \`\${p.color}_\${Math.round(pct * 20)}\`;
        let bucket = sparkBuckets.get(colorKey);
        if (!bucket) {
          bucket = [];
          sparkBuckets.set(colorKey, bucket);
        }
        bucket.push(p);
      } else if (p.shape === "dust") {
        let bucket = dustBuckets.get(p.color);
        if (!bucket) {
          bucket = [];
          dustBuckets.set(p.color, bucket);
        }
        bucket.push(p);
      } else if (p.shape === "line") {
        lines.push(p);
      } else if (p.shape === "ring") {
        rings.push(p);
      }
    }

    for (const [, bucket] of sparkBuckets) {
      const p = bucket[0];
      const pct = p.life / p.maxLife;
      const sparkColor = p.startColor && p.endColor ? lerpHsl(p.startColor, p.endColor, pct) : p.color;
      ctx.fillStyle = getHslaColor(sparkColor, pct);
      ctx.globalAlpha = 1.0;
      for (let j = 0; j < bucket.length; j++) {
        const sp = bucket[j];
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (const [color, bucket] of dustBuckets) {
      ctx.fillStyle = color;
      for (let j = 0; j < bucket.length; j++) {
        const dp = bucket[j];
        const pct = dp.life / dp.maxLife;
        ctx.globalAlpha = pct;
        ctx.fillRect(dp.x - dp.size / 2, dp.y - dp.size / 2, dp.size, dp.size * 0.7);
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const p = lines[i];
      const pct = p.life / p.maxLife;
      const speed = TrigLUT.fastSqrt(p.vx * p.vx + p.vy * p.vy);
      let ux = 1;
      let uy = 0;
      if (speed > 0) {
        ux = p.vx / speed;
        uy = p.vy / speed;
      }
      const x1 = p.x - ux * p.size * 8;
      const y1 = p.y - uy * p.size * 8;
      const x2 = p.x + ux * p.size * 6;
      const y2 = p.y + uy * p.size * 6;

      const lineGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      lineGrad.addColorStop(0.0, getHslaColor(p.color, 0));
      lineGrad.addColorStop(0.2, getHslaColor(p.color, pct * 0.15));
      lineGrad.addColorStop(0.85, getHslaColor(p.color, pct * 0.95));
      lineGrad.addColorStop(1.0, getHslaColor(p.color, pct * 0.3));

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = p.size;
      ctx.lineCap = "round";
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    for (let i = 0; i < rings.length; i++) {
      const p = rings[i];
      const pct = p.life / p.maxLife;
      const radius = p.size + (1.0 - pct) * 44;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = pct;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    ctx.restore();
  }
}
`,"src/core/ParticleSystem.ts":`import { Particle, IEventBus } from "./Interfaces";
import { ObjectPool, IPoolable } from "./ObjectPool";
import { TrigLUT } from "./TrigLUT";

export class PoolableParticle implements Particle, IPoolable {
  public x = 0;
  public y = 0;
  public vx = 0;
  public vy = 0;
  public color = "";
  public size = 0;
  public life = 0;
  public maxLife = 0;
  public shape: "spark" | "dust" | "ring" | "line" = "spark";
  public drag = 1.0;
  public startColor = "";
  public endColor = "";
  public isActive = false;
  public turbulence = 0;

  public activate(
    x: number,
    y: number,
    vx: number,
    vy: number,
    color: string,
    size: number,
    life: number,
    shape: "spark" | "dust" | "ring" | "line",
    drag: number = 1.0,
    startColor: string = "",
    endColor: string = "",
    turbulence: number = 0
  ) {
    this.turbulence = turbulence;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.life = life;
    this.maxLife = life;
    this.shape = shape;
    this.drag = drag;
    this.startColor = startColor || color;
    this.endColor = endColor || color;
    this.isActive = true;
  }

  public deactivate() {
    this.isActive = false;
    this.drag = 1.0;
    this.startColor = "";
    this.endColor = "";
    this.turbulence = 0;
  }
}

export class ParticleSystem {
  private pool: ObjectPool<PoolableParticle>;
  private unsubs: (() => void)[] = [];
  private events: IEventBus;

  constructor(events: IEventBus) {
    this.events = events;
    this.pool = new ObjectPool(() => new PoolableParticle(), 200);
    this.setupListeners();
  }

  private setupListeners() {
    this.unsubs.push(
      this.events.subscribe("SPAWN_SPARKS", ({ x, y, angle, color, radial, count, turbulence, shape }) => {
        const sparkCount = count || 12;
        for (let i = 0; i < sparkCount; i++) {
          const pAngle = radial
            ? (i / sparkCount) * Math.PI * 2 + (TrigLUT.random() * 0.4 - 0.2)
            : angle + (TrigLUT.random() * 0.9 - 0.45);
          const pSpeed = radial ? 100 + TrigLUT.random() * 300 : 160 + TrigLUT.random() * 280;

          const vx = TrigLUT.cos(pAngle) * pSpeed;
          const vy = TrigLUT.sin(pAngle) * pSpeed;
          const pColor = color || "hsl(142, 71%, 58%)";
          const size = 2.5 + TrigLUT.random() * 3.5;
          const life = 0.22;

          const drag = 0.94;
          let sCol = pColor;
          let eCol = pColor;
          if (pColor.includes("350") || pColor.includes("red") || pColor.includes("280")) {
            sCol = "hsl(45, 100%, 75%)";
            eCol = "hsl(350, 80%, 40%)";
          } else if (pColor.includes("142") || pColor.includes("green")) {
            sCol = "hsl(120, 100%, 80%)";
            eCol = "hsl(142, 100%, 30%)";
          }

          this.pool.get(x, y, vx, vy, pColor, size, life, shape || "spark", drag, sCol, eCol, turbulence || 0);
        }
      })
    );

    this.unsubs.push(
      this.events.subscribe("SPAWN_DUST", ({ x, y, direction }) => {
        const count = 14;
        const isVertical = direction === "vertical";
        for (let i = 0; i < count; i++) {
          const dir = i % 2 === 0 ? 1 : -1;
          
          const pSpeedX = isVertical
            ? -dir * (4 + TrigLUT.random() * 10)
            : dir * (125 + TrigLUT.random() * 160);

          const pSpeedY = isVertical
            ? dir * (125 + TrigLUT.random() * 160)
            : -4 - TrigLUT.random() * 10;

          const size = 3.5 + TrigLUT.random() * 3.5;
          const life = 0.35;
          const drag = 0.88;

          this.pool.get(x, y, pSpeedX, pSpeedY, "rgba(255, 255, 255, 0.35)", size, life, "dust", drag);
        }
      })
    );

    this.unsubs.push(
      this.events.subscribe("SPAWN_BLAST", ({ x, y, color }) => {
        this.pool.get(x, y, 0, 0, color, 8, 0.16, "ring");
      })
    );
  }

  public update(dt: number) {
    const active = this.pool.getActive();
    for (let i = active.length - 1; i >= 0; i--) {
      const p = active[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.pool.releaseAt(i);
        continue;
      }
      if (p.drag !== 1.0) {
        p.vx *= p.drag;
        p.vy *= p.drag;
      }
      if (p.turbulence > 0) {
        const wave = TrigLUT.sin(p.life * 22 + p.x * 0.02) * p.turbulence;
        p.x += wave * dt;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }

  public getParticles(): readonly Particle[] {
    return this.pool.getActive();
  }

  public cleanup() {
    this.unsubs.forEach((unsub) => unsub());
    this.unsubs = [];
    this.pool.clear();
  }
}
`,"src/core/PhysicsWorld.ts":`import { Rectangle, IPhysicsWorld } from "./Interfaces";
import { UNITS } from "@/core/Units";
import { GreedyMerger } from "./GreedyMerger";

export class PhysicsWorld implements IPhysicsWorld {
  public solids: Rectangle[] = [];
  public hazards: Rectangle[] = [];
  public onewayPlatforms: Rectangle[] = [];

  private static readonly CELL_SIZE = UNITS.SPATIAL_GRID_CELL_SIZE;
  private solidGrid: Map<number, Rectangle[]> = new Map();
  private platformGrid: Map<number, Rectangle[]> = new Map();
  private hazardGrid: Map<number, Rectangle[]> = new Map();

  constructor(solids: Rectangle[], hazards: Rectangle[], onewayPlatforms: Rectangle[]) {
    this.solids = GreedyMerger.merge(solids);
    this.hazards = GreedyMerger.merge(hazards);
    this.onewayPlatforms = onewayPlatforms;

    this.indexGeometry(this.solids, this.solidGrid);
    this.indexGeometry(this.onewayPlatforms, this.platformGrid);
    this.indexGeometry(this.hazards, this.hazardGrid);
  }

  public rebuild(solids: Rectangle[], hazards: Rectangle[], onewayPlatforms: Rectangle[]) {
    this.solids = GreedyMerger.merge(solids);
    this.hazards = GreedyMerger.merge(hazards);
    this.onewayPlatforms = onewayPlatforms;

    this.solidGrid.clear();
    this.platformGrid.clear();
    this.hazardGrid.clear();

    this.indexGeometry(this.solids, this.solidGrid);
    this.indexGeometry(this.onewayPlatforms, this.platformGrid);
    this.indexGeometry(this.hazards, this.hazardGrid);
  }

  private indexGeometry(rects: Rectangle[], grid: Map<number, Rectangle[]>) {
    for (const rect of rects) {
      const startX = Math.floor(rect.x / PhysicsWorld.CELL_SIZE);
      const endX = Math.floor((rect.x + rect.width) / PhysicsWorld.CELL_SIZE);
      const startY = Math.floor(rect.y / PhysicsWorld.CELL_SIZE);
      const endY = Math.floor((rect.y + rect.height) / PhysicsWorld.CELL_SIZE);

      for (let cx = startX; cx <= endX; cx++) {
        for (let cy = startY; cy <= endY; cy++) {
          const key = (cy << 16) | cx;
          if (!grid.has(key)) {
            grid.set(key, []);
          }
          grid.get(key)!.push(rect);
        }
      }
    }
  }

  public getOverlapCandidates(
    x: number,
    y: number,
    width: number,
    height: number,
    type: "solid" | "platform" | "hazard",
    outResult?: Rectangle[]
  ): Rectangle[] {
    const grid = type === "solid" ? this.solidGrid : type === "platform" ? this.platformGrid : this.hazardGrid;
    const fallback = type === "solid" ? this.solids : type === "platform" ? this.onewayPlatforms : this.hazards;

    const halfW = width / 2;
    const halfH = height / 2;
    const left = x - halfW;
    const right = x + halfW;
    const top = y - halfH;
    const bottom = y + halfH;

    const startX = Math.floor(left / PhysicsWorld.CELL_SIZE);
    const endX = Math.floor(right / PhysicsWorld.CELL_SIZE);
    const startY = Math.floor(top / PhysicsWorld.CELL_SIZE);
    const endY = Math.floor(bottom / PhysicsWorld.CELL_SIZE);

    const result = outResult !== undefined ? outResult : [];
    result.length = 0;

    if (startX === endX && startY === endY) {
      const key = (startY << 16) | startX;
      const cellCandidates = grid.get(key);
      if (cellCandidates) {
        for (let i = 0; i < cellCandidates.length; i++) {
          result.push(cellCandidates[i]);
        }
      }
    } else {
      const seen = new Set<Rectangle>();
      for (let cx = startX; cx <= endX; cx++) {
        for (let cy = startY; cy <= endY; cy++) {
          const key = (cy << 16) | cx;
          const cellCandidates = grid.get(key);
          if (cellCandidates) {
            for (let i = 0; i < cellCandidates.length; i++) {
              const candidate = cellCandidates[i];
              if (!seen.has(candidate)) {
                seen.add(candidate);
                result.push(candidate);
              }
            }
          }
        }
      }
    }

    if (result.length === 0) {
      return fallback;
    }

    return result;
  }

  public isOverlapping(x: number, y: number, width: number, height: number, rects: Rectangle[]): boolean {
    const halfW = width / 2;
    const halfH = height / 2;

    const left = x - halfW;
    const right = x + halfW;
    const top = y - halfH;
    const bottom = y + halfH;

    for (const rect of rects) {
      if (right > rect.x && left < rect.x + rect.width && bottom > rect.y && top < rect.y + rect.height) {
        return true;
      }
    }
    return false;
  }
}
`,"src/core/SaveManager.ts":`import { ConfigurationValidator } from "./schemas";

export interface SaveSlotData {
  wins: number;
  losses: number;
  empty: boolean;
}

class SaveManager {
  private readonly storageKey = "box_battle_save_slots";
  private currentSlotIndex: number = -1;

  constructor() {
    this.initializeDefaultStorage();
  }

  private initializeDefaultStorage() {
    try {
      if (!localStorage.getItem(this.storageKey)) {
        const defaultSlots: SaveSlotData[] = Array.from({ length: 3 }, () => ({
          wins: 0,
          losses: 0,
          empty: true,
        }));
        localStorage.setItem(this.storageKey, JSON.stringify(defaultSlots));
      }
    } catch (e) {
      console.warn("localStorage is blocked or unavailable:", e);
    }
  }

  public getSlots(): SaveSlotData[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.map((slot) => ConfigurationValidator.validateSaveSlot(slot));
      }
    } catch {
      // Intentionally fall back below if JSON error occurs
    }
    return Array.from({ length: 3 }, () => ({ wins: 0, losses: 0, empty: true }));
  }

  public getSlot(index: number): SaveSlotData | null {
    const slots = this.getSlots();
    if (index >= 0 && index < slots.length) {
      return slots[index];
    }
    return null;
  }

  public selectSlot(index: number) {
    this.currentSlotIndex = index;
    const slot = this.getSlot(index);
    if (slot && slot.empty) {
      this.writeSlot(index, { wins: 0, losses: 0, empty: false });
    }
  }

  public getCurrentSlotIndex(): number {
    return this.currentSlotIndex;
  }

  public writeSlot(index: number, data: SaveSlotData) {
    const slots = this.getSlots();
    if (index >= 0 && index < slots.length) {
      slots[index] = ConfigurationValidator.validateSaveSlot(data);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(slots));
      } catch (e) {
        console.warn("Could not save to localStorage:", e);
      }
    }
  }

  public eraseSlot(index: number) {
    this.writeSlot(index, { wins: 0, losses: 0, empty: true });
    if (this.currentSlotIndex === index) {
      this.currentSlotIndex = -1;
    }
  }

  public copySlot(fromIndex: number, toIndex: number): boolean {
    const source = this.getSlot(fromIndex);
    if (!source || source.empty) return false;

    this.writeSlot(toIndex, {
      wins: source.wins,
      losses: source.losses,
      empty: false,
    });
    return true;
  }

  public recordWin() {
    if (this.currentSlotIndex === -1) return;
    const slot = this.getSlot(this.currentSlotIndex);
    if (slot) {
      this.writeSlot(this.currentSlotIndex, {
        ...slot,
        wins: slot.wins + 1,
      });
    }
  }

  public recordLoss() {
    if (this.currentSlotIndex === -1) return;
    const slot = this.getSlot(this.currentSlotIndex);
    if (slot) {
      this.writeSlot(this.currentSlotIndex, {
        ...slot,
        losses: slot.losses + 1,
      });
    }
  }
}

export const saveManager = new SaveManager();
`,"src/core/SettingsManager.ts":`import type { Action } from "@/core/InputProvider";
import { ConfigurationValidator } from "./schemas";

export interface AudioSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  masterMuted: boolean;
  sfxMuted: boolean;
  musicMuted: boolean;
}

export type KeyMap = Record<Action, string[]>;

export type InputPreset = "DEFAULT_1" | "DEFAULT_2" | "CUSTOM";

class SettingsManager {
  private readonly configKey = "box_battle_config";

  private audioSettings: AudioSettings = {
    masterVolume: 0.8,
    sfxVolume: 0.8,
    musicVolume: 0.5,
    masterMuted: false,
    sfxMuted: false,
    musicMuted: false,
  };

  private currentPreset: InputPreset = "DEFAULT_1";

  private customKeyMap: KeyMap = {
    MOVE_LEFT: ["ArrowLeft", "KeyA"],
    MOVE_RIGHT: ["ArrowRight", "KeyD"],
    MOVE_UP: ["ArrowUp", "KeyW"],
    MOVE_DOWN: ["ArrowDown", "KeyS"],
    JUMP: ["Space", "KeyX"],
    ATTACK: ["KeyC"],
    DASH: ["KeyZ"],
  };

  private presetDefault1: KeyMap = {
    MOVE_LEFT: ["ArrowLeft", "KeyA"],
    MOVE_RIGHT: ["ArrowRight", "KeyD"],
    MOVE_UP: ["ArrowUp", "KeyW"],
    MOVE_DOWN: ["ArrowDown", "KeyS"],
    JUMP: ["Space", "KeyX"],
    ATTACK: ["KeyC"],
    DASH: ["KeyZ"],
  };

  private presetDefault2: KeyMap = {
    MOVE_LEFT: ["KeyA"],
    MOVE_RIGHT: ["KeyD"],
    MOVE_UP: ["KeyW"],
    MOVE_DOWN: ["KeyS"],
    JUMP: ["Period"],
    ATTACK: ["Comma"],
    DASH: ["Slash"],
  };

  constructor() {
    this.loadSettings();
  }

  private loadSettings() {
    const saved = localStorage.getItem(this.configKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.audio) {
          this.audioSettings = ConfigurationValidator.validateAudioSettings(parsed.audio, this.audioSettings);
        }
        if (parsed.preset === "DEFAULT_1" || parsed.preset === "DEFAULT_2" || parsed.preset === "CUSTOM") {
          this.currentPreset = parsed.preset;
        }
        if (parsed.customKeyMap) {
          this.customKeyMap = ConfigurationValidator.validateKeyMap(parsed.customKeyMap, this.customKeyMap);
        }
      } catch (e) {
        console.warn("Could not read settings from disk. Restoring defaults.", e);
      }
    }
  }

  public saveSettings() {
    const config = {
      audio: this.audioSettings,
      preset: this.currentPreset,
      customKeyMap: this.customKeyMap,
    };
    localStorage.setItem(this.configKey, JSON.stringify(config));
  }

  public getAudio(): AudioSettings {
    return this.audioSettings;
  }

  public setAudio(audio: Partial<AudioSettings>) {
    this.audioSettings = { ...this.audioSettings, ...audio };
    this.saveSettings();
  }

  public getCurrentPreset(): InputPreset {
    return this.currentPreset;
  }

  public setPreset(preset: InputPreset) {
    this.currentPreset = preset;
    this.saveSettings();
  }

  public getKeyMap(): KeyMap {
    const lead = this.currentPreset === "DEFAULT_2" ? this.presetDefault2 : this.presetDefault1;
    const follow = this.currentPreset === "DEFAULT_2" ? this.presetDefault1 : this.presetDefault2;

    const merged: KeyMap = {
      MOVE_LEFT: [...new Set([...lead.MOVE_LEFT, ...follow.MOVE_LEFT])],
      MOVE_RIGHT: [...new Set([...lead.MOVE_RIGHT, ...follow.MOVE_RIGHT])],
      MOVE_UP: [...new Set([...lead.MOVE_UP, ...follow.MOVE_UP])],
      MOVE_DOWN: [...new Set([...lead.MOVE_DOWN, ...follow.MOVE_DOWN])],
      JUMP: [...new Set([...lead.JUMP, ...follow.JUMP])],
      ATTACK: [...new Set([...lead.ATTACK, ...follow.ATTACK])],
      DASH: [...new Set([...lead.DASH, ...follow.DASH])],
    };

    if (this.currentPreset === "CUSTOM") {
      for (const action of Object.keys(merged) as Action[]) {
        merged[action] = [...new Set([...(this.customKeyMap[action] || []), ...merged[action]])];
      }
    }

    return merged;
  }

  public remapKey(action: Action, index: number, newCode: string) {
    this.currentPreset = "CUSTOM";
    if (!this.customKeyMap[action]) {
      this.customKeyMap[action] = [];
    }
    this.customKeyMap[action][index] = newCode;
    this.saveSettings();
  }
}

export const settingsManager = new SettingsManager();
`,"src/core/SimulationSystems.ts":`import { UNITS } from "@/core/Units";
import { Camera } from "@/core/Camera";
import { TrigLUT } from "@/core/TrigLUT";
import type { IEventBus, IAudioManager, IInputProvider } from "@/core/Interfaces";

export class SimulationSystems {
  private events: IEventBus;
  private audio: IAudioManager;
  private input: IInputProvider;
  private unsubscribes: (() => void)[] = [];

  constructor(events: IEventBus, audio: IAudioManager, input: IInputProvider) {
    this.events = events;
    this.audio = audio;
    this.input = input;
  }

  public setup(getPlayerX: () => number, getBossX: () => number, getMinionX: (id: string) => number): void {
    this.audio.registerCoordinateProviders(getPlayerX, getBossX, getMinionX);

    this.unsubscribes.push(
      this.events.subscribe("PLAYER_HURT", () => {
        const px = getPlayerX();
        const bx = getBossX();
        const dx = px - bx;
        const len = Math.abs(dx);
        const dirX = len > 0 ? dx / len : 1;
        Camera.shake(15, 0.3, dirX, 0);
        Camera.triggerHitStop(0.08);
        this.input.triggerHapticFeedback("medium");
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("BOSS_HURT", ({ currentHealth, sourceX, sourceY }) => {
        const bossX = getBossX();
        const dx = bossX - sourceX;
        const dy = 1000 - sourceY;
        const len = TrigLUT.fastSqrt(dx * dx + dy * dy);
        const dirX = len > 0 ? dx / len : -1;
        const dirY = len > 0 ? dy / len : 0;

        if (currentHealth <= 0) {
          Camera.shake(25, 0.6, dirX, dirY);
          Camera.triggerHitStop(0.15);
          this.input.triggerHapticFeedback("heavy");
        } else {
          Camera.shake(8, 0.15, dirX, dirY);
          Camera.triggerHitStop(0.04);
          this.input.triggerHapticFeedback("light");
        }
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("MINION_HURT", ({ id, currentHealth, sourceX }) => {
        const minionX = getMinionX(id);
        const dx = minionX - sourceX;
        const dirX = dx > 0 ? 1 : dx < 0 ? -1 : 1;

        if (currentHealth <= 0) {
          Camera.shake(4, 0.15, dirX, 0);
          Camera.triggerHitStop(0.03);
          this.input.triggerHapticFeedback("medium");
        } else {
          Camera.shake(2, 0.15, dirX, 0);
          Camera.triggerHitStop(0.01);
          this.input.triggerHapticFeedback("light");
        }
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("PLAYER_POGOED", () => {
        Camera.shake(4, 0.08, 0, 1);
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("PLAYER_DASHED", () => {
        Camera.triggerHitStop(0.035);
        this.input.triggerHapticFeedback("light");
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("CAMERA_SHAKE", ({ amplitude, duration }) => {
        Camera.shake(amplitude, duration);
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("HIT_STOP", ({ duration }) => {
        Camera.triggerHitStop(duration);
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("CHARGE_UPDATE", ({ timer }) => {
        if (timer >= UNITS.CHARGE_LVL2_TIME) {
          if (TrigLUT.random() < 0.16) {
            this.input.triggerHapticFeedback("light");
          }
        } else if (timer >= UNITS.CHARGE_LVL1_TIME) {
          if (TrigLUT.random() < 0.08) {
            this.input.triggerHapticFeedback("light");
          }
        }
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("CHARGE_MAXED", () => {
        this.input.triggerHapticFeedback("medium");
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("PLAYER_SPIKED", () => {
        this.input.triggerHapticFeedback("heavy");
      })
    );

    this.unsubscribes.push(
      this.events.subscribe("BOSS_PHASE_SHIFT", () => {
        Camera.shake(18, 0.45);
        Camera.triggerHitStop(0.12);
        const bossX = getBossX();
        this.events.publishSpark(bossX, 1000, 0, "hsl(45, 100%, 65%)", true, 25);
      })
    );
  }

  public teardown(): void {
    this.unsubscribes.forEach((unsub) => unsub());
    this.unsubscribes = [];
    this.audio.stopHealDrone();
    this.audio.stopChargeDrone();
  }
}
`,"src/core/SoundSynth.ts":`import { AudioContextManager } from "./audio/AudioContextManager";
import { SFXManager } from "./audio/SFXManager";
import { MusicSequencer } from "./audio/MusicSequencer";
import { DroneManager } from "./audio/DroneManager";
import { eventBroker } from "@/core/eventBroker";
import { useGameplayStore } from "@/store/useGameStore";

class SoundSynth {
  private ctxManager: AudioContextManager;
  private sfx: SFXManager;
  private music: MusicSequencer;
  private drones: DroneManager;

  private getPlayerXFn?: () => number;
  private getBossXFn?: () => number;
  private getMinionXFn?: (id: string) => number;

  constructor() {
    this.ctxManager = new AudioContextManager();
    this.sfx = new SFXManager(
      this.ctxManager,
      eventBroker,
      () => useGameplayStore.getState().comboCounter,
      () => this.getPlayerXFn?.(),
      () => this.getBossXFn?.(),
      (id) => this.getMinionXFn?.(id)
    );
    this.music = new MusicSequencer(this.ctxManager);
    this.drones = new DroneManager(this.ctxManager, this.music);

    this.setupDroneEventSubscriptions();
  }

  private setupDroneEventSubscriptions() {
    eventBroker.subscribe("HEAL_UPDATE", ({ timer }: { timer: number }) => {
      this.drones.updateHealTimer(timer);
    });

    eventBroker.subscribe("HEAL_START", () => {
      this.drones.playHealStart(this.getPlayerX());
    });

    eventBroker.subscribe("HEAL_CANCEL", () => {
      this.drones.stopHealDrone();
    });

    eventBroker.subscribe("HEAL_COMPLETE", () => {
      this.drones.playHealComplete();
    });

    eventBroker.subscribe("CHARGE_START", () => {
      this.drones.playChargeStart(this.getPlayerX());
    });

    eventBroker.subscribe("CHARGE_UPDATE", ({ timer }: { timer: number }) => {
      this.drones.updateChargeTimer(timer);
    });

    eventBroker.subscribe("CHARGE_STOP", () => {
      this.drones.stopChargeDrone();
    });
  }

  public registerCoordinateProviders(
    playerX: () => number,
    bossX: () => number,
    minionX: (id: string) => number
  ) {
    this.getPlayerXFn = playerX;
    this.getBossXFn = bossX;
    this.getMinionXFn = minionX;
  }

  public getPlayerX(): number | undefined {
    return this.getPlayerXFn?.();
  }

  public getBossX(): number | undefined {
    return this.getBossXFn?.();
  }

  public getMinionX(id: string): number | undefined {
    return this.getMinionXFn?.(id);
  }

  public get hasUserGestured(): boolean {
    return this.ctxManager.hasUserGestured;
  }

  public get initialized(): boolean {
    return this.ctxManager.initialized;
  }

  public resumeContext(force = false): void {
    this.ctxManager.resumeContext(force);
  }

  public suspendContext(): void {
    this.ctxManager.suspendContext();
  }

  public updateVolumes(): void {
    this.ctxManager.updateVolumes();
  }

  public setCabinetMuffle(active: boolean): void {
    this.ctxManager.setCabinetMuffle(active);
  }

  public playBossTelegraph(x?: number): void {
    this.sfx.playBossTelegraph(x);
  }

  public playBossLunge(x?: number): void {
    this.sfx.playBossLunge(x);
  }

  public playDashRecharge(x?: number): void {
    this.sfx.playDashRecharge(x);
  }

  public playBossSwipe(x?: number): void {
    this.sfx.playBossSwipe(x);
  }

  public playMinionSpawning(x?: number): void {
    this.sfx.playMinionSpawning(x);
  }

  public playMinionDeconstruct(x?: number): void {
    this.sfx.playMinionDeconstruct(x);
  }

  public playBossPhaseShift(x?: number): void {
    this.sfx.playBossPhaseShift(x);
  }

  public playBossExplosion(x?: number): void {
    this.sfx.playBossExplosion(x);
  }

  public playPlayerExplosion(x?: number): void {
    this.sfx.playPlayerExplosion(x);
  }

  public playHealCancel(x?: number): void {
    this.sfx.playHealCancel(x);
  }

  public playSpikeStrike(x?: number): void {
    this.sfx.playSpikeStrike(x);
  }

  public playLanding(x?: number): void {
    this.sfx.playLanding(x);
  }

  public playFireballLvl1(x?: number): void {
    this.sfx.playFireballLvl1(x);
  }

  public playFireballLvl2(x?: number): void {
    this.sfx.playFireballLvl2(x);
  }

  public playMenuConfirm(): void {
    this.sfx.playMenuConfirm();
  }

  public playMenuBack(): void {
    this.sfx.playMenuBack();
  }

  public playJump(x?: number): void {
    this.sfx.playJump(x);
  }

  public playDash(x?: number): void {
    this.sfx.playDash(x);
  }

  public playSlash(direction?: "side" | "up" | "down", x?: number): void {
    this.sfx.playSlash(direction, x);
  }

  public playHitConfirm(x?: number, entityId?: string): void {
    this.sfx.playHitConfirm(x, entityId);
  }

  public playPogo(x?: number): void {
    this.sfx.playPogo(x);
  }

  public playHurt(x?: number): void {
    this.sfx.playHurt(x);
  }

  public playSelectTick(): void {
    this.sfx.playSelectTick();
  }

  public playErrorTick(): void {
    this.sfx.playErrorTick();
  }

  public playDialogueTick(speaker: "player" | "boss", char: string): void {
    this.sfx.playDialogueTick(speaker, char);
  }
  public playCrowdVictory(): void {
    this.sfx.playCrowdVictory();
  }
  public playCrowdDefeat(): void {
    this.sfx.playCrowdDefeat();
  }
  public stopCrowdSounds(): void {
    this.sfx.stopCrowdSounds();
  }

  public fadeOutMusic(duration?: number): void {
    this.music.fadeOutMusic(duration);
  }

  public fadeInMusic(duration?: number): void {
    this.music.fadeInMusic(duration);
  }

  public startMusic(): void {
    this.music.startMusic();
  }

  public stopMusic(): void {
    this.music.stopMusic();
  }

  public playHealStart(x?: number): void {
    this.drones.playHealStart(x);
  }

  public updateHealTimer(timer: number): void {
    this.drones.updateHealTimer(timer);
  }

  public stopHealDrone(): void {
    this.drones.stopHealDrone();
  }

  public playChargeStart(x?: number): void {
    this.drones.playChargeStart(x);
  }

  public updateChargeTimer(timer: number): void {
    this.drones.updateChargeTimer(timer);
  }

  public stopChargeDrone(): void {
    this.drones.stopChargeDrone();
  }

  public playHealComplete(): void {
    this.drones.playHealComplete();
  }

  public setLowHPStatus(active: boolean): void {
    if (!this.initialized) return;
    this.ctxManager.setLowHPStatus(active);
    this.drones.setHeartbeat(active);
  }
}

export const soundSynth = new SoundSynth();
`,"src/core/StateMachine.ts":`export interface IState {
  enter(): void;
  update(dt: number): void;
  exit(): void;
}

export class StateMachine {
  private currentState: IState | null = null;

  public changeState(newState: IState): void {
    if (this.currentState) {
      this.currentState.exit();
    }
    this.currentState = newState;
    this.currentState.enter();
  }

  public update(dt: number): void {
    if (this.currentState) {
      this.currentState.update(dt);
    }
  }

  public getCurrentState(): IState | null {
    return this.currentState;
  }
}
`,"src/core/StateProjectionSystem.ts":`import { HealthComponent } from "@/entities/components/HealthComponent";
import { Player } from "@/entities/Player";
import { Boss } from "@/entities/Boss";
import { UNITS } from "@/core/Units";
import type { IEventBus } from "@/core/Interfaces";

export class StateProjectionSystem {
  private cachedPlayerHP: number = -1;
  private cachedBossHP: number = -1;
  private cachedHealingCharges: number = -1;
  private cachedDetermination: number = -1;
  private crisisTimer: number = 0;
  private events: IEventBus;

  constructor(events: IEventBus) {
    this.events = events;
  }

  public getCrisisTimer(): number {
    return this.crisisTimer;
  }

  public resetCrisisTimer(): void {
    this.crisisTimer = 0;
  }

  public tickCrisisTimer(dt: number): void {
    if (this.crisisTimer > 0) {
      this.crisisTimer -= dt;
    }
  }

  public setCrisisTimer(value: number): void {
    this.crisisTimer = value;
  }

  public project(player: Player, boss: Boss): void {
    const pHealth = player.getComponent(HealthComponent);
    const bHealth = boss.getComponent(HealthComponent);

    const nextPlayerHP = pHealth ? pHealth.currentHealth : UNITS.PLAYER_MAX_HP;
    const nextBossHP = bHealth ? bHealth.currentHealth : UNITS.BOSS_MAX_HP;
    const nextHealingCharges = player.healingCharges;
    const nextDetermination = player.determinationCounter;

    if (
      nextPlayerHP !== this.cachedPlayerHP ||
      nextBossHP !== this.cachedBossHP ||
      nextHealingCharges !== this.cachedHealingCharges ||
      nextDetermination !== this.cachedDetermination
    ) {
      if (nextPlayerHP === 1 && this.cachedPlayerHP > 1) {
        this.crisisTimer = 0.45;
      }

      this.cachedPlayerHP = nextPlayerHP;
      this.cachedBossHP = nextBossHP;
      this.cachedHealingCharges = nextHealingCharges;
      this.cachedDetermination = nextDetermination;

      this.events.publish("STATE_PROJECTED", {
        playerHP: nextPlayerHP,
        bossHP: nextBossHP,
        healingCharges: nextHealingCharges,
        determination: nextDetermination,
      });
    }
  }

  public reset(): void {
    this.cachedPlayerHP = -1;
    this.cachedBossHP = -1;
    this.cachedHealingCharges = -1;
    this.cachedDetermination = -1;
    this.crisisTimer = 0;
  }
}
`,"src/core/StaticMapRenderer.ts":`import { Rectangle } from "./Interfaces";
import { UNITS } from "@/core/Units";
import { GAUNTLET_STAGES } from "./design/GauntletStages";

export class StaticMapRenderer {
    private ctx: CanvasRenderingContext2D;
    private staticCanvas: HTMLCanvasElement;
    private staticCtx: CanvasRenderingContext2D;
    private staticCacheBuilt = false;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.staticCanvas = document.createElement("canvas");
        this.staticCanvas.width = UNITS.WORLD_SIZE;
        this.staticCanvas.height = UNITS.WORLD_SIZE;
        this.staticCtx = this.staticCanvas.getContext("2d")!;
    }

    public buildStaticCache(solids: Rectangle[], hazards: Rectangle[]): void {
        if (this.staticCacheBuilt) return;
        const sctx = this.staticCtx;
        const stageIdx = 0;
        const stageConfig = GAUNTLET_STAGES[stageIdx];
        const bg = sctx.createLinearGradient(0, 0, UNITS.WORLD_SIZE, UNITS.WORLD_SIZE);
        bg.addColorStop(0, "hsl(230, 12%, 5%)");
        bg.addColorStop(0.45, "hsl(220, 10%, 8%)");
        bg.addColorStop(1, "hsl(322, 30%, 9%)");
        sctx.fillStyle = bg;
        sctx.fillRect(0, 0, UNITS.WORLD_SIZE, UNITS.WORLD_SIZE);

        this.drawBackgroundArchitecture(sctx, stageIdx);

        // Draw Organic Visual Shapes (Infection / Stone)
        if (stageConfig && stageConfig.visualShapes) {
            for (const shape of stageConfig.visualShapes) {
                sctx.fillStyle = shape.colorRole === "arena-infection" ? "hsla(330, 28%, 25%, 0.78)" : "hsl(220, 10%, 12%)";
                sctx.strokeStyle = "hsla(336, 42%, 38%, 0.62)";
                sctx.lineWidth = 2;
                sctx.beginPath();
                if (shape.type === "circle" && shape.center && shape.radius) {
                    sctx.arc(shape.center.x, shape.center.y, shape.radius, 0, Math.PI * 2);
                } else if (shape.points && shape.points.length > 0) {
                    sctx.moveTo(shape.points[0].x, shape.points[0].y);
                    for (let i = 1; i < shape.points.length; i++) sctx.lineTo(shape.points[i].x, shape.points[i].y);
                    sctx.closePath();
                }
                sctx.fill();
                if (shape.infectionSeams) sctx.stroke();
            }
        }

        if (hazards.length > 0) {
            sctx.fillStyle = "hsl(358, 92%, 52%)";
            sctx.shadowColor = "hsla(358, 92%, 52%, 0.48)";
            sctx.shadowBlur = 12;
            sctx.beginPath();
            for (const hazard of hazards) {
                const spikeWidth = 18;
                const spikeCount = Math.floor(hazard.width / spikeWidth);
                const startY = (hazard.y === 920 && hazard.height === 80) ? 960 : hazard.y + hazard.height;
                for (let i = 0; i < spikeCount; i++) {
                    sctx.moveTo(hazard.x + i * spikeWidth, startY);
                    sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth / 2, hazard.y);
                    sctx.lineTo(hazard.x + i * spikeWidth + spikeWidth, startY);
                }
            }
            sctx.fill();
            sctx.shadowBlur = 0;
            sctx.strokeStyle = "hsla(12, 100%, 66%, 0.62)";
            sctx.lineWidth = 1.5;
            sctx.stroke();
        }

        sctx.fillStyle = "hsl(220, 10%, 12%)";
        sctx.beginPath();
        for (const solid of solids) {
            this.drawRoundedRectPath(sctx, solid.x, solid.y, solid.width, solid.height, 8);
        }
        sctx.fill();

        sctx.save();
        sctx.clip();
        sctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
        sctx.lineWidth = 1;
        for (let x = -1000; x < 1600; x += 42) {
            sctx.beginPath();
            sctx.moveTo(x, 0);
            sctx.lineTo(x + 1000, 1000);
            sctx.stroke();
        }
        sctx.restore();

        // GRAMMAR FIX: Inset line is now Arena Infection (Magenta/Red), NOT Green (Player Agency)
        sctx.strokeStyle = "hsl(336, 42%, 38%)"; 
        sctx.lineWidth = 3.2;
        sctx.lineJoin = "round";
        sctx.shadowColor = "hsl(330, 28%, 25%)";
        sctx.shadowBlur = 6.4;
        sctx.beginPath();
        this.drawInnerPerimeterPath(sctx, 1.6, stageIdx);
        for (const solid of solids) {
            const isBoundary = solid.x <= 40 || solid.x + solid.width >= 960 || solid.y <= 40 || solid.y + solid.height >= 920;
            if (!isBoundary) {
                this.drawRoundedRectPath(sctx, solid.x + 1.6, solid.y + 1.6, solid.width - 3.2, solid.height - 3.2, 6.4);
            }
        }
        sctx.stroke();
        sctx.shadowBlur = 0;

        this.staticCacheBuilt = true;
    }

    private drawBackgroundArchitecture(ctx: CanvasRenderingContext2D, _stageIdx: number) {
        ctx.save();
        ctx.globalAlpha = 0.45;
        ctx.strokeStyle = "hsla(215, 12%, 22%, 0.55)";
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const x = 80 + i * 130 - 73;
            ctx.beginPath();
            ctx.moveTo(x, 80);
            ctx.lineTo(x + 70, 220);
            ctx.lineTo(x + 20, 360);
            ctx.lineTo(x + 110, 520);
            ctx.lineTo(x + 40, 760);
            ctx.stroke();
        }

        ctx.globalAlpha = 0.36;
        ctx.fillStyle = "hsla(330, 28%, 25%, 0.22)";
        for (let i = 0; i < 5; i++) {
            const cx = 160 + ((i * 221 + 89) % 720);
            const cy = 150 + ((i * 157 + 51) % 650);
            ctx.beginPath();
            ctx.ellipse(cx, cy, 46 + i * 9, 18 + (i % 3) * 10, i * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    private drawRoundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
        const rad = Math.min(r, w / 2, h / 2);
        ctx.moveTo(x + rad, y); ctx.lineTo(x + w - rad, y); ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
        ctx.lineTo(x + w, y + h - rad); ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
        ctx.lineTo(x + rad, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
        ctx.lineTo(x, y + rad); ctx.quadraticCurveTo(x, y, x + rad, y);
    }

    private drawInnerPerimeterPath(ctx: CanvasRenderingContext2D, inset: number, _stageIdx: number) {
        ctx.moveTo(40 - inset, 40 - inset); 
        ctx.lineTo(960 + inset, 40 - inset);
        ctx.lineTo(960 + inset, 920 + inset);
        ctx.lineTo(680 + inset, 920 + inset);
        ctx.lineTo(680 + inset, 960 + inset);
        ctx.lineTo(320 - inset, 960 + inset);
        ctx.lineTo(320 - inset, 920 + inset);
        ctx.lineTo(40 - inset, 920 + inset);
        ctx.closePath();
    }

    public renderBackground(): void { this.ctx.drawImage(this.staticCanvas, 0, 0); }
    public renderOnewayPlatforms(onewayPlatforms: Rectangle[], springPlatforms: { rect: Rectangle; offsetY: number }[]): void {
        for (const platform of onewayPlatforms) {
            const sp = springPlatforms.find((s) => s.rect === platform);
            const offsetY = sp ? sp.offsetY : 0;
            this.ctx.save(); this.ctx.translate(0, offsetY);
            const grad = this.ctx.createLinearGradient(platform.x, platform.y, platform.x, platform.y + platform.height);
            grad.addColorStop(0, "hsl(215, 16%, 24%)");
            grad.addColorStop(1, "hsl(220, 10%, 10%)");
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            this.ctx.strokeStyle = "hsla(194, 62%, 52%, 0.35)";
            this.ctx.lineWidth = 1.8;
            this.ctx.beginPath();
            this.ctx.moveTo(platform.x + 5, platform.y + 2);
            this.ctx.lineTo(platform.x + platform.width - 5, platform.y + 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }
    public resetCache(): void { this.staticCacheBuilt = false; }
}
`,"src/core/TrigLUT.ts":`export class TrigLUT {
  private static readonly TABLE_SIZE = 2048;
  private static readonly INV_TABLE_SIZE = TrigLUT.TABLE_SIZE / (Math.PI * 2);
  private static readonly sinTable: Float64Array = new Float64Array(TrigLUT.TABLE_SIZE);
  private static readonly cosTable: Float64Array = new Float64Array(TrigLUT.TABLE_SIZE);

  public static readonly ATAN_TABLE_SIZE = 1024;
  private static readonly atanTable: Float64Array = new Float64Array(TrigLUT.ATAN_TABLE_SIZE);


  static {
    for (let i = 0; i < TrigLUT.TABLE_SIZE; i++) {
      const angle = (i / TrigLUT.TABLE_SIZE) * Math.PI * 2;
      TrigLUT.sinTable[i] = Math.sin(angle);
      TrigLUT.cosTable[i] = Math.cos(angle);
    }

    for (let i = 0; i < TrigLUT.ATAN_TABLE_SIZE; i++) {
      const t = i / TrigLUT.ATAN_TABLE_SIZE;
      TrigLUT.atanTable[i] = Math.atan(t);
    }
  }

  public static sin(radians: number): number {
    const idx = Math.round(radians * TrigLUT.INV_TABLE_SIZE) & (TrigLUT.TABLE_SIZE - 1);
    return TrigLUT.sinTable[idx];
  }

  public static cos(radians: number): number {
    const idx = Math.round(radians * TrigLUT.INV_TABLE_SIZE) & (TrigLUT.TABLE_SIZE - 1);
    return TrigLUT.cosTable[idx];
  }

  public static atan2(y: number, x: number): number {
    if (x === 0 && y === 0) return 0;
    const absY = Math.abs(y);
    const absX = Math.abs(x);
    const t = absY / (absX + absY);
    const idx = Math.round(t * TrigLUT.ATAN_TABLE_SIZE) & (TrigLUT.ATAN_TABLE_SIZE - 1);
    const angle = TrigLUT.atanTable[idx];
    if (x >= 0) {
      return y >= 0 ? angle : -angle;
    } else {
      return y >= 0 ? Math.PI - angle : angle - Math.PI;
    }
  }



  private static gpPrngState: number = Date.now();
  private static visPrngState: number = Date.now() + 1;

  public static seedRandom(seed: number): void {
    TrigLUT.gpPrngState = seed | 0;
    TrigLUT.visPrngState = (seed + 1) | 0;
  }

  public static random(): number {
    return TrigLUT.randomVisual();
  }

  public static randomGameplay(): number {
    let t = (TrigLUT.gpPrngState += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  public static randomVisual(): number {
    let t = (TrigLUT.visPrngState += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  public static randomRange(min: number, max: number): number {
    return min + TrigLUT.randomVisual() * (max - min);
  }

  public static randomRangeGameplay(min: number, max: number): number {
    return min + TrigLUT.randomGameplay() * (max - min);
  }

  public static fastSqrt(n: number): number {
    if (n <= 0) return 0;
    let x = n;
    let y = 1;
    const e = 0.001;
    while (x - y > e) {
      x = (x + y) / 2;
      y = n / x;
    }
    return x;
  }
}
`,"src/core/Units.ts":`export const UNITS = {
  // Core Gameplay Balancing Parameters
  PLAYER_MAX_HP: 5,
  BOSS_MAX_HP: 80,
  BOSS_PHASE_2_HP_PCT: 0.70,
  BOSS_PHASE_3_HP_PCT: 0.40,

  // Player Kinematics
  PLAYER_MOVE_SPEED: 360,
  PLAYER_JUMP_FORCE: 544,
  PLAYER_WALL_SLIDE_SPEED: 96,
  PLAYER_DASH_SPEED: 1120,
  PLAYER_ACCEL: 12.0,
  PLAYER_DECEL: 16.0,

  // Boss Kinematics
  BOSS_PATROL_SPEED_BASE: 160,
  BOSS_LUNGE_SPEED_BASE: 960,
  BOSS_ACCEL: 6.0,
  BOSS_DECEL: 8.0,

  // Minion Kinematics
  MINION_ACCEL: 5.0,
  MINION_DECEL: 7.0,

  // Combat Damage
  PLAYER_MELEE_DAMAGE_BASE: 1,
  PLAYER_MELEE_DAMAGE_CLOSE: 5,
  PLAYER_FIREBALL_DAMAGE_LVL1: 1,
  PLAYER_FIREBALL_DAMAGE_LVL2: 3,
  HAZARD_SPIKE_DAMAGE: 1,
  ENEMY_CONTACT_DAMAGE: 1,
  BOSS_LUNGE_DAMAGE: 2,

  // Skill Cooldowns & Timings
  DASH_DURATION: 0.15,
  DASH_COOLDOWN: 0.50,
  HEAL_DURATION: 2.0,
  CHARGE_LVL1_TIME: 0.35,
  CHARGE_LVL2_TIME: 1.12,

  // World space coordinates (1 World Unit = 1 Pixel)
  WORLD_SIZE: 1000,
  WORLD_HALF_SIZE: 500,

  // Audio spatialization parameters
  AUDIO_MAX_PAN_SCALE: 0.45,

  // Spatial hashing configuration
  SPATIAL_GRID_CELL_SIZE: 200,

  // Physics sub-stepping and tolerances
  CCD_STEP_LIMIT_DEFAULT: 6,
  CCD_STEP_LIMIT_PROJECTILE: 5,
  GROUND_DETECTION_OFFSET: 1,
  CORNER_NUDGE_MAX_OVERLAP: 6,
  BROAD_PHASE_PADDING_STANDARD: 12,
  BROAD_PHASE_PADDING_LARGE: 24,

  // Canonical timing values (Seconds)
  ENGINE_TICK_RATE_HZ: 60,
  CANONICAL_DELTA_TIME: 1 / 60,

  // Combat range bounds
  MELEE_MAX_REACH: 76,
  MELEE_CLOSE_RANGE_THRESHOLD: 60,
  MELEE_SIDE_OFFSET: 28,
  MELEE_VERTICAL_OFFSET: 28,
  MELEE_SWEEP_INNER_RADIUS: 20,

  // Player wall jump horizontal impulse
  PLAYER_WALL_JUMP_X_VELOCITY: 1320,

  // Boss wall collision rebound velocity
  BOSS_WALL_REBOUND_VELOCITY: 280,

  // Downward attack (pogo) hitbox dimensions
  POGO_HITBOX_WIDTH: 72,
  POGO_HITBOX_HEIGHT: 35.6,
  POGO_HITBOX_Y_OFFSET: 32,
  POGO_HITBOX_X_OFFSET: -36,
} as const;
`,"src/core/VecUtils.ts":`import { Vector2D } from "./Interfaces";

export function setVec(v: Vector2D, x: number, y: number): Vector2D {
  v.x = x;
  v.y = y;
  return v;
}

export function copyVec(dest: Vector2D, src: Vector2D): Vector2D {
  dest.x = src.x;
  dest.y = src.y;
  return dest;
}

export function zeroVec(v: Vector2D): Vector2D {
  v.x = 0;
  v.y = 0;
  return v;
}

`,"src/core/World.ts":`import { IWorld, IEntity, IPhysicsWorld, IProjectile, Rectangle, IEventBus, IAudioManager, IInputProvider } from "./Interfaces";
import { PhysicsWorld } from "./PhysicsWorld";
import { ObjectPool } from "./ObjectPool";
import { Projectile } from "@/entities/Projectile";

export class World implements IWorld {
  public player: IEntity | null = null;
  public boss: IEntity | null = null;
  public minions: IEntity[] = [];
  public physicsWorld: IPhysicsWorld;
  public projectilePool: ObjectPool<Projectile> | null = null;
  public events: IEventBus;
  public audio: IAudioManager;
  public input: IInputProvider;

  constructor(solids: Rectangle[], hazards: Rectangle[], onewayPlatforms: Rectangle[], events: IEventBus, audio: IAudioManager, input: IInputProvider) {
    this.physicsWorld = new PhysicsWorld(solids, hazards, onewayPlatforms);
    this.events = events;
    this.audio = audio;
    this.input = input;
  }

  public getProjectiles(): readonly IProjectile[] {
    if (!this.projectilePool) return [];
    return this.projectilePool.getActive();
  }

  public releaseProjectile(proj: IProjectile): void {
    if (this.projectilePool) {
      this.projectilePool.release(proj as Projectile);
    }
  }

  public spawnProjectile(
    x: number,
    y: number,
    dirX: number,
    dirY: number,
    ownerId: "player" | "boss",
    damage: number,
    speed: number,
    lifespan: number,
    customColor?: string,
    kind?: string
  ): IProjectile {
    if (!this.projectilePool) {
      throw new Error("Projectile pool not initialized on World.");
    }
    return this.projectilePool.get(
      x,
      y,
      dirX,
      dirY,
      ownerId,
      damage,
      speed,
      lifespan,
      this,
      customColor,
      kind
    );
  }
}
`,"src/core/WorldRenderer.ts":`import { CinematicDeathRenderer } from "@/core/effects/CinematicDeathRenderer";
import { Camera } from "./Camera";
import { World } from "./World";
import { Rectangle, Particle } from "./Interfaces";
import { Projectile } from "@/entities/Projectile";
import { ObjectPool } from "./ObjectPool";
import { UNITS } from "@/core/Units";
import { StaticMapRenderer } from "@/core/StaticMapRenderer";
import { EntityRenderer } from "@/core/EntityRenderer";
import { ParticleRenderer } from "@/core/ParticleRenderer";
import { DissolvePlatform, PogoPost, DashResetGate } from "./systems/TraversalHazards";
import { useGameplayStore } from "@/store/useGameStore";

export class WorldRenderer {
  private ctx: CanvasRenderingContext2D;
  private staticMap: StaticMapRenderer;
  private entityRenderer: EntityRenderer;
  private particleRenderer: ParticleRenderer;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.staticMap = new StaticMapRenderer(ctx);
    this.entityRenderer = new EntityRenderer(ctx);
    this.particleRenderer = new ParticleRenderer(ctx);
  }

  public getCanvas(): HTMLCanvasElement {
    return this.ctx.canvas;
  }

  public resetCache(): void {
    this.staticMap.resetCache();
  }

  public render(
    world: World,
    particles: readonly Particle[],
    solids: Rectangle[],
    onewayPlatforms: Rectangle[],
    hazards: Rectangle[],
    projectilePool: ObjectPool<Projectile>,
    isPaused: boolean,
    bossDeathTimer: number,
    bossDeathPos: { x: number; y: number } | null,
    springPlatforms: { rect: Rectangle; offsetY: number }[],
    alpha: number,
    dissolvePlatforms?: DissolvePlatform[],
    pogoPosts?: PogoPost[],
    dashResetGates?: DashResetGate[]
  ) {
    this.staticMap.buildStaticCache(solids, hazards);

    const nowTime = performance.now();

    this.ctx.save();
    this.ctx.translate(Camera.offsetX, Camera.offsetY);

    this.staticMap.renderBackground();
    this.staticMap.renderOnewayPlatforms(onewayPlatforms, springPlatforms);

    if (dissolvePlatforms) {
      for (const dp of dissolvePlatforms) {
        if (dp.state === "gone") continue;
        this.ctx.save();
        if (dp.state === "idle") {
          this.ctx.fillStyle = "hsl(215, 10%, 12%)";
          
          // Pulsing green boundary to convey stability [4]
          const glow = Math.sin(nowTime * 0.008) * 3 + 6;
          this.ctx.shadowColor = "rgba(34, 197, 94, 0.45)";
          this.ctx.shadowBlur = glow;
          this.ctx.strokeStyle = "rgba(34, 197, 94, 0.65)";
          
          this.ctx.lineWidth = 2.0;
          this.ctx.fillRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);
          this.ctx.strokeRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);
        } else if (dp.state === "cracking") {
          this.ctx.fillStyle = "hsl(215, 10%, 8%)";
          this.ctx.fillRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);
          
          // Highly active warning pulse [4]
          const warpGlow = 10 + Math.sin(nowTime * 0.025) * 4;
          this.ctx.shadowColor = "hsl(45, 100%, 60%)";
          this.ctx.shadowBlur = warpGlow;
          this.ctx.strokeStyle = "hsl(45, 100%, 60%)";
          
          this.ctx.lineWidth = 2.5;
          this.ctx.strokeRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);

          this.ctx.beginPath();
          this.ctx.moveTo(dp.rect.x + 10, dp.rect.y);
          this.ctx.lineTo(dp.rect.x + dp.rect.width / 3, dp.rect.y + dp.rect.height);
          this.ctx.moveTo(dp.rect.x + dp.rect.width - 20, dp.rect.y);
          this.ctx.lineTo(dp.rect.x + dp.rect.width / 2, dp.rect.y + dp.rect.height / 2);
          this.ctx.stroke();
        } else if (dp.state === "respawning") {
          this.ctx.strokeStyle = "rgba(34, 197, 94, 0.45)";
          this.ctx.lineWidth = 1.5;
          this.ctx.setLineDash([4, 4]);
          this.ctx.strokeRect(dp.rect.x, dp.rect.y, dp.rect.width, dp.rect.height);
        }
        this.ctx.restore();
      }
    }

    if (pogoPosts) {
      for (const post of pogoPosts) {
        this.ctx.save();
        const cx = post.rect.x + post.rect.width / 2;
        const cy = post.rect.y + post.rect.height / 2;
        const w = post.rect.width;
        const h = post.rect.height;

        this.ctx.translate(cx, cy);
        this.ctx.rotate(nowTime * 0.001);
        
        // Active pulsing violet-neon shadow [4]
        const postGlow = 8 + Math.sin(nowTime * 0.012) * 4;
        this.ctx.shadowColor = "hsl(286, 85%, 62%)";
        this.ctx.shadowBlur = postGlow;

        this.ctx.fillStyle = "hsl(286, 85%, 62%)";
        this.ctx.strokeStyle = "hsl(194, 62%, 52%)";
        this.ctx.lineWidth = 2.0;

        this.ctx.beginPath();
        this.ctx.moveTo(0, -h / 2);
        this.ctx.lineTo(w / 2, 0);
        this.ctx.lineTo(0, h / 2);
        this.ctx.lineTo(-w / 2, 0);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.fillStyle = "hsl(350, 82%, 58%)";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 6, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
      }
    }

    if (dashResetGates) {
      for (const gate of dashResetGates) {
        this.ctx.save();
        const cx = gate.rect.x + gate.rect.width / 2;
        const cy = gate.rect.y + gate.rect.height / 2;
        const w = gate.rect.width;
        const h = gate.rect.height;

        this.ctx.translate(cx, cy);
        this.ctx.rotate(-nowTime * 0.002);

        if (gate.active) {
          // Vibrant pulsing glow to indicate double jump and dash reset charges [4]
          const gateGlow = 10 + Math.sin(nowTime * 0.018) * 5;
          this.ctx.strokeStyle = "hsl(142, 72%, 56%)";
          this.ctx.lineWidth = 2.5;
          this.ctx.shadowColor = "rgba(34, 197, 94, 0.65)";
          this.ctx.shadowBlur = gateGlow;
        } else {
          this.ctx.strokeStyle = "rgba(113, 128, 150, 0.4)";
          this.ctx.lineWidth = 1.5;
          this.ctx.shadowBlur = 0;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(0, -h / 2);
        this.ctx.lineTo(w / 2, 0);
        this.ctx.lineTo(0, h / 2);
        this.ctx.lineTo(-w / 2, 0);
        this.ctx.closePath();
        this.ctx.stroke();

        if (gate.active) {
          this.ctx.fillStyle = "#ffffff";
          this.ctx.fillRect(-3, -3, 6, 6);

          // 3 tiny rotating green resolve sparks orbiting active gates [4]
          const orbitTime = nowTime * 0.0035;
          this.ctx.shadowBlur = 0; // disable heavy blur for tiny orbiting elements
          this.ctx.fillStyle = "hsl(142, 100%, 80%)";
          for (let i = 0; i < 3; i++) {
            const angle = orbitTime + (i * Math.PI * 2) / 3;
            const rx = Math.cos(angle) * (w / 2 + 5);
            const ry = Math.sin(angle) * (h / 2 + 5);
            this.ctx.fillRect(rx - 1.5, ry - 1.5, 3, 3);
          }
        }
        this.ctx.restore();
      }
    }

    // Render dynamic entities and particles with a procedural zero-latency chromatic ghosting offset when glitching
    const isGlitching = useGameplayStore.getState().isGlitching;
    if (isGlitching) {
      // Left offset ghost
      this.ctx.save();
      this.ctx.globalAlpha = 0.35;
      this.ctx.translate(-6, 0);
      this.entityRenderer.renderEntities(world, projectilePool, alpha);
      this.particleRenderer.renderParticles(particles);
      this.ctx.restore();

      // Right offset ghost
      this.ctx.save();
      this.ctx.globalAlpha = 0.35;
      this.ctx.translate(6, 0);
      this.entityRenderer.renderEntities(world, projectilePool, alpha);
      this.particleRenderer.renderParticles(particles);
      this.ctx.restore();
    }

    // Main sharp foreground layer rendered normally (zero-latency)
    this.entityRenderer.renderEntities(world, projectilePool, alpha);
    this.particleRenderer.renderParticles(particles);

    if (bossDeathTimer >= 0 && bossDeathPos) {
      CinematicDeathRenderer.render(this.ctx, world, bossDeathTimer, bossDeathPos);
    }

    if (isPaused) {
      this.ctx.fillStyle = "rgba(12, 13, 17, 0.65)";
      this.ctx.fillRect(0, 0, UNITS.WORLD_SIZE, UNITS.WORLD_SIZE);

      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "bold 44px monospace";
      this.ctx.textAlign = "center";
      this.ctx.fillText("SIMULATION PAUSED", UNITS.WORLD_HALF_SIZE, 600);

      this.ctx.font = "bold 18px monospace";
      this.ctx.fillStyle = "var(--signal-green)";
      this.ctx.fillText("PRESS 'P' TO RESUME RUNTIME STEPPERS", UNITS.WORLD_HALF_SIZE, 650);
    }

    this.ctx.restore();
  }
}
`,"src/core/audio/AudioContextManager.ts":`import * as Tone from "tone";
import { settingsManager } from "@/core/SettingsManager";
import { UNITS } from "@/core/Units";

export class AudioContextManager {
  public hasUserGestured: boolean = false;
  public initialized: boolean = false;

  public masterVolume!: Tone.Volume;
  public sfxGain!: Tone.Volume;
  public musicGain!: Tone.Volume;
  public cabinetFilter!: Tone.Filter;
  public limiter!: Tone.Limiter;

  private onInitCallbacks: (() => void)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      const resumeOnGesture = () => {
        this.hasUserGestured = true;
        this.resumeContext();

        window.removeEventListener("click", resumeOnGesture);
        window.removeEventListener("keydown", resumeOnGesture);
        window.removeEventListener("touchend", resumeOnGesture);
        window.removeEventListener("mousedown", resumeOnGesture);
      };
      window.addEventListener("click", resumeOnGesture);
      window.addEventListener("keydown", resumeOnGesture);
      window.addEventListener("touchend", resumeOnGesture);
      window.addEventListener("mousedown", resumeOnGesture);
    }
  }

  public registerOnInit(callback: () => void) {
    if (this.initialized) {
      callback();
    } else {
      this.onInitCallbacks.push(callback);
    }
  }

  public resumeContext(force = false) {
    if (force) {
      this.hasUserGestured = true;
    }
    if (this.hasUserGestured) {
      Tone.start();
      this.init();
      if (Tone.getContext().state === "suspended") {
        Tone.getContext().resume();
      }
    }
  }

  public suspendContext() {
    if (this.initialized && Tone.getContext().state === "running") {
      (Tone.getContext().rawContext as AudioContext).suspend();
    }
  }

  public getPanFromX(x: number): number {
    const clampedX = Math.max(0, Math.min(UNITS.WORLD_SIZE, x));
    const rawPan = clampedX / UNITS.WORLD_HALF_SIZE - 1.0;
    const scaledPan = rawPan * UNITS.AUDIO_MAX_PAN_SCALE;
    return Math.max(-UNITS.AUDIO_MAX_PAN_SCALE, Math.min(UNITS.AUDIO_MAX_PAN_SCALE, scaledPan));
  }

  private init() {
    if (this.initialized) return;
    if (!this.hasUserGestured) return;

    this.initialized = true;

    const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    Tone.getContext().lookAhead = isMobile ? 0.15 : 0.05;

    this.masterVolume = new Tone.Volume(-120).toDestination();
    this.limiter = new Tone.Limiter(-12);

    this.cabinetFilter = new Tone.Filter({
      frequency: 20000,
      type: "lowpass",
      Q: 1.0,
    });

    this.sfxGain = new Tone.Volume(-120);
    this.musicGain = new Tone.Volume(-120);

    this.sfxGain.chain(this.cabinetFilter, this.limiter, this.masterVolume);
    this.musicGain.chain(this.cabinetFilter, this.limiter, this.masterVolume);

    this.updateVolumes();

    for (const cb of this.onInitCallbacks) {
      cb();
    }
    this.onInitCallbacks = [];
  }

  public updateVolumes() {
    if (!this.initialized) return;

    const config = settingsManager.getAudio();

    const masterDb = config.masterVolume <= 0 ? -120 : Tone.gainToDb(config.masterVolume * 0.35);
    const sfxDb = config.sfxVolume <= 0 ? -120 : Tone.gainToDb(config.sfxVolume * 0.85);
    const musicDb = config.musicVolume <= 0 ? -120 : Tone.gainToDb(config.musicVolume * 0.3);

    this.masterVolume.mute = config.masterMuted || config.masterVolume <= 0;
    this.sfxGain.mute = config.sfxMuted || config.sfxVolume <= 0;
    this.musicGain.mute = config.musicMuted || config.musicVolume <= 0;

    this.masterVolume.volume.setTargetAtTime(masterDb, Tone.now(), 0.05);
    this.sfxGain.volume.setTargetAtTime(sfxDb, Tone.now(), 0.05);
    this.musicGain.volume.setTargetAtTime(musicDb, Tone.now(), 0.05);
  }

  private isLowHP: boolean = false;
  private isCabinetMuffled: boolean = false;

  public setCabinetMuffle(active: boolean) {
    this.isCabinetMuffled = active;
    this.resolveCabinetFilter();
  }

  public setLowHPStatus(active: boolean) {
    this.isLowHP = active;
    this.resolveCabinetFilter();
  }

  private resolveCabinetFilter() {
    if (!this.initialized || !this.cabinetFilter) return;
    
    let targetFreq = 20000;
    if (this.isCabinetMuffled) {
      targetFreq = 600;
    } else if (this.isLowHP) {
      targetFreq = 1800;
    }
    
    this.cabinetFilter.frequency.rampTo(targetFreq, 0.4);
  }
}
`,"src/core/audio/DroneManager.ts":`import * as Tone from "tone";
import { AudioContextManager } from "./AudioContextManager";
import { MusicSequencer } from "./MusicSequencer";

export class DroneManager {
  private ctxManager: AudioContextManager;
  private musicSeq: MusicSequencer;
  private panner!: Tone.Panner;

  private healOsc!: Tone.Oscillator;
  private healOscSub!: Tone.Oscillator;
  private healFilter!: Tone.Filter;
  private healLfo!: Tone.LFO;
  private healGain!: Tone.Gain;
  private isHealDroneRunning: boolean = false;

  private chargeOsc!: Tone.Oscillator;
  private chargeFilter!: Tone.Filter;
  private chargeLfo!: Tone.LFO;
  private chargeGain!: Tone.Gain;
  private isChargeDroneRunning: boolean = false;
  private chargeRatchetThreshold: number = 0;

  private healRatchetThreshold: number = 0;
  private ratchetSynth!: Tone.PolySynth;

  private heartbeatSynth!: Tone.MembraneSynth;
  private heartbeatLoop!: Tone.Loop;
  private isHeartbeatRunning: boolean = false;
  private lastHealProgress: number = -1;
  private lastChargeProgress: number = -1;
  private healImpactSynth!: Tone.MembraneSynth;

  constructor(ctxManager: AudioContextManager, musicSeq: MusicSequencer) {
    this.ctxManager = ctxManager;
    this.musicSeq = musicSeq;
    this.ctxManager.registerOnInit(() => this.init());
  }

  private init() {
    this.panner = new Tone.Panner(0).connect(this.ctxManager.sfxGain);

    this.healOsc = new Tone.Oscillator({ type: "sawtooth", frequency: 110 }).start();
    this.healOscSub = new Tone.Oscillator({ type: "triangle", frequency: 55 }).start();
    this.healFilter = new Tone.Filter({ frequency: 220, type: "bandpass", Q: 7.0 });
    this.healLfo = new Tone.LFO({ frequency: 12.0, min: -150, max: 150 }).start();
    this.healGain = new Tone.Gain(0);

    this.healLfo.connect(this.healFilter.frequency);
    this.healOsc.connect(this.healFilter);
    this.healOscSub.connect(this.healFilter);
    this.healFilter.connect(this.healGain);
    this.healGain.connect(this.panner);

    this.chargeOsc = new Tone.Oscillator({ type: "sawtooth", frequency: 220 }).start();
    this.chargeFilter = new Tone.Filter({ frequency: 450, type: "lowpass", Q: 4.0 });
    this.chargeLfo = new Tone.LFO({ frequency: 5.5, min: -360, max: 360, type: "sine" }).start();
    this.chargeGain = new Tone.Gain(0);

    this.chargeLfo.connect(this.chargeFilter.frequency);
    this.chargeOsc.connect(this.chargeFilter);
    this.chargeFilter.connect(this.chargeGain);
    this.chargeGain.connect(this.panner);

    this.ratchetSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.001, decay: 0.012, sustain: 0, release: 0.012 },
      volume: -6
    }).connect(this.panner);

    this.heartbeatSynth = new Tone.MembraneSynth({
      envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.15 },
      oscillator: { type: "sine" }
    }).connect(this.ctxManager.sfxGain);

    this.heartbeatLoop = new Tone.Loop((time) => {
      this.heartbeatSynth.triggerAttackRelease("A0", "8n", time);
      this.heartbeatSynth.triggerAttackRelease("G0", "8n", time + 0.18);
    }, "1.1s");

    this.healImpactSynth = new Tone.MembraneSynth({
      envelope: { attack: 0.001, decay: 0.8, sustain: 0, release: 0.4 },
      oscillator: { type: "sawtooth" }
    }).connect(this.ctxManager.sfxGain);
  }

  public playHealStart(x?: number) {
    if (!this.ctxManager.initialized) return;
    this.stopHealDrone();

    if (x !== undefined && this.panner) {
      this.panner.pan.setValueAtTime(this.ctxManager.getPanFromX(x), Tone.now());
    }

    const now = Tone.now();
    this.healRatchetThreshold = 0;
    this.lastHealProgress = 0;
    this.healOsc.frequency.setValueAtTime(110, now);
    this.healOscSub.frequency.setValueAtTime(55, now);
    this.healFilter.frequency.setValueAtTime(220, now);
    this.healLfo.frequency.setValueAtTime(12.0, now);
    this.healLfo.amplitude.setValueAtTime(150 / 350, now);
    this.healGain.gain.rampTo(0.35, 0.1);

    this.isHealDroneRunning = true;
  }

  public updateHealTimer(timer: number) {
    if (!this.ctxManager.initialized || !this.isHealDroneRunning) return;
    const now = Tone.now();

    const elapsed = 2.0 - timer;
    if (elapsed > this.healRatchetThreshold) {
      const progressVal = Math.max(0, Math.min(1.0, elapsed / 2.0));
      const pitch = 220 + progressVal * 380;
      this.ratchetSynth.triggerAttackRelease(pitch, "32n", now);

      const interval = 0.18 - progressVal * 0.145;
      this.healRatchetThreshold = elapsed + interval;
    }
    
    const progress = Math.max(0, Math.min(1.0, (2.0 - timer) / 2.0));
    if (Math.abs(progress - this.lastHealProgress) < 0.04) {
      return;
    }
    this.lastHealProgress = progress;

    const baseFreq = 110 + progress * 220;
    const subFreq = 55 + progress * 55;
    const filterFreq = 220 + Math.pow(progress, 1.5) * 1400;
    const lfoFreq = 12.0 + progress * 16.0;
    
    const lfoAmp = Math.max(0, Math.min(1.0, 0.42 + progress * 0.45));

    this.healOsc.frequency.setTargetAtTime(baseFreq, now, 0.05);
    this.healOscSub.frequency.setTargetAtTime(subFreq, now, 0.05);
    this.healFilter.frequency.setTargetAtTime(filterFreq, now, 0.05);
    this.healLfo.frequency.setTargetAtTime(lfoFreq, now, 0.05);
    this.healLfo.amplitude.setTargetAtTime(lfoAmp, now, 0.05);
    
    const gainVal = Math.max(0, Math.min(1.0, 0.35 + progress * 0.25));
    this.healGain.gain.setTargetAtTime(gainVal, now, 0.05);
  }

  public stopHealDrone() {
    if (!this.ctxManager.initialized || !this.isHealDroneRunning) return;
    const now = Tone.now();
    this.healGain.gain.cancelScheduledValues(now);
    this.healGain.gain.setValueAtTime(this.healGain.gain.value, now);
    this.healGain.gain.rampTo(0, 0.12);
    this.isHealDroneRunning = false;
    this.lastHealProgress = -1;

    // Fast mechanical zip-back / unwind ratchet sound on release
    for (let i = 0; i < 8; i++) {
      const delay = i * 0.022;
      const pitch = 550 - i * 60; // Descending mechanical ratchet clicks
      this.ratchetSynth.triggerAttackRelease(pitch, "32n", now + delay);
    }
  }

  private lastHealImpactTime: number = 0;

  public playHealComplete() {
    this.stopHealDrone();
    if (!this.ctxManager.initialized) return;

    const now = Tone.now();
    const impactTime = Math.max(now, this.lastHealImpactTime + 0.001);
    this.lastHealImpactTime = impactTime;

    const chimeNotes = ["C5", "Eb5", "G5", "C6", "Eb6"];
    chimeNotes.forEach((note, idx) => {
      this.musicSeq.musicArpSynth.triggerAttackRelease(note, "2n", now + idx * 0.03);
    });

    this.healImpactSynth.triggerAttackRelease("C1", "2n", impactTime);
  }

  public playChargeStart(x?: number) {
    if (!this.ctxManager.initialized) return;
    this.stopChargeDrone();

    if (x !== undefined && this.panner) {
      this.panner.pan.setValueAtTime(this.ctxManager.getPanFromX(x), Tone.now());
    }

    const now = Tone.now();
    this.chargeRatchetThreshold = 0;
    this.lastChargeProgress = 0;

    this.chargeOsc.frequency.setValueAtTime(220, now);
    this.chargeFilter.frequency.setValueAtTime(450, now);
    this.chargeLfo.frequency.setValueAtTime(5.5, now);
    this.chargeLfo.amplitude.setValueAtTime(110 / 360, now);
    this.chargeGain.gain.setValueAtTime(0.18, now);

    this.isChargeDroneRunning = true;
  }

  public updateChargeTimer(timer: number) {
    if (!this.ctxManager.initialized || !this.isChargeDroneRunning) return;
    const now = Tone.now();

    if (timer > this.chargeRatchetThreshold) {
      const progressVal = Math.max(0, Math.min(1.0, timer / 1.12));
      const pitch = 380 + progressVal * 520;
      this.ratchetSynth.triggerAttackRelease(pitch, "32n", now);

      const interval = 0.14 - progressVal * 0.105;
      this.chargeRatchetThreshold = timer + interval;
    }

    const progress = Math.max(0, Math.min(1.0, timer / 1.12));
    if (Math.abs(progress - this.lastChargeProgress) < 0.04) {
      return;
    }
    this.lastChargeProgress = progress;

    const baseFreq = 220 + progress * 440;
    const filterFreq = 450 + progress * 1200;
    const lfoFreq = 5.5 + progress * 16.0;
    
    const lfoAmp = Math.max(0, Math.min(1.0, 0.3 + progress * 0.7));

    this.chargeOsc.frequency.setTargetAtTime(baseFreq, now, 0.05);
    this.chargeFilter.frequency.setTargetAtTime(filterFreq, now, 0.05);
    this.chargeLfo.frequency.setTargetAtTime(lfoFreq, now, 0.05);
    this.chargeLfo.amplitude.setTargetAtTime(lfoAmp, now, 0.05);
    
    const gainVal = Math.max(0, Math.min(1.0, 0.18 + progress * 0.32));
    this.chargeGain.gain.setTargetAtTime(gainVal, now, 0.05);
  }

  public stopChargeDrone() {
    if (!this.ctxManager.initialized || !this.isChargeDroneRunning) return;
    this.chargeGain.gain.rampTo(0, 0.08);
    this.isChargeDroneRunning = false;
    this.lastChargeProgress = -1;
    
    // Fast mechanical zip-back / unwind ratchet sound on release
    const now = Tone.now();
    for (let i = 0; i < 6; i++) {
      const delay = i * 0.02;
      const pitch = 850 - i * 110; // Descending zip clicks
      this.ratchetSynth.triggerAttackRelease(pitch, "32n", now + delay);
    }
  }

  public setHeartbeat(active: boolean) {
    if (!this.ctxManager.initialized || !this.heartbeatLoop) return;
    if (active === this.isHeartbeatRunning) return;
    this.isHeartbeatRunning = active;
    if (active) {
      this.heartbeatLoop.start(0);
    } else {
      this.heartbeatLoop.stop();
    }
  }
}
`,"src/core/audio/MusicSequencer.ts":`import * as Tone from "tone";
import { AudioContextManager } from "./AudioContextManager";
import { settingsManager } from "@/core/SettingsManager";

export class MusicSequencer {
  private ctxManager: AudioContextManager;

  private musicBassSynth!: Tone.MonoSynth;
  public musicArpSynth!: Tone.PolySynth;
  private bassSeq!: Tone.Sequence<string>;
  private arpSeq!: Tone.Sequence<string>;

  public isMusicPlaying: boolean = false;

  constructor(ctxManager: AudioContextManager) {
    this.ctxManager = ctxManager;
    this.ctxManager.registerOnInit(() => this.init());
  }

  private init() {
    const musicGain = this.ctxManager.musicGain;

    this.musicBassSynth = new Tone.MonoSynth({
      oscillator: { type: "sawtooth" },
      filter: { type: "lowpass", frequency: 350, Q: 1.0 },
      envelope: { attack: 0.02, decay: 0.12, sustain: 0.4, release: 0.15 },
      filterEnvelope: { attack: 0.02, decay: 0.15, sustain: 0.3, release: 0.15, baseFrequency: 350, octaves: 1.5 },
    }).connect(musicGain);

    this.musicArpSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.05, decay: 0.2, sustain: 0.1, release: 0.25 },
    }).connect(musicGain);

    const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (!isMobile) {
      const delay = new Tone.FeedbackDelay("8n.", 0.35).connect(musicGain);
      this.musicArpSynth.connect(delay);
    }

    this.setupMusicSequences();

    if (this.isMusicPlaying) {
      this.bassSeq.start(0);
      this.arpSeq.start(0);
      Tone.getTransport().start();
      this.fadeInMusic(0.4);
    }
  }

  private setupMusicSequences() {
    const bassNotes = ["C2", "C2", "D#2", "D#2", "F2", "F2", "A#1", "A#1"];
    this.bassSeq = new Tone.Sequence<string>(
      (time, note) => {
        this.musicBassSynth.triggerAttackRelease(note, "8n", time);
      },
      bassNotes,
      "4n"
    );

    const arpProgression = ["C4", "C4", "G3", "G3", "F3", "F3", "G#3", "A#3"];
    this.arpSeq = new Tone.Sequence<string>(
      (time, baseNote) => {
        const chord =
          baseNote === "G3" || baseNote === "A#3"
            ? [baseNote, Tone.Frequency(baseNote).transpose(4).toNote(), Tone.Frequency(baseNote).transpose(7).toNote()]
            : [
                baseNote,
                Tone.Frequency(baseNote).transpose(3).toNote(),
                Tone.Frequency(baseNote).transpose(7).toNote(),
              ];

        chord.forEach((note, index) => {
          this.musicArpSynth.triggerAttackRelease(note, "8n", time + index * 0.05);
        });
      },
      arpProgression,
      "2n"
    );

    Tone.getTransport().bpm.value = 135;
  }

  public startMusic() {
    this.ctxManager.resumeContext(true);
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    if (this.ctxManager.initialized) {
      this.bassSeq.start(0);
      this.arpSeq.start(0);
      Tone.getTransport().start();
      this.fadeInMusic(0.4);
    }
  }

  public stopMusic() {
    if (this.ctxManager.initialized) {
      this.bassSeq.stop();
      this.arpSeq.stop();
      Tone.getTransport().stop();
    }
    this.isMusicPlaying = false;
  }

  public fadeOutMusic(duration: number = 1.5) {
    if (!this.ctxManager.initialized || !this.isMusicPlaying) return;
    this.ctxManager.musicGain.volume.rampTo(-120, duration);
    setTimeout(
      () => {
        this.stopMusic();
        this.ctxManager.updateVolumes();
      },
      duration * 1000 + 100
    );
  }

  public fadeInMusic(duration: number = 0.4) {
    if (!this.ctxManager.initialized || !this.isMusicPlaying) return;
    const config = settingsManager.getAudio();
    const targetDb = config.musicVolume <= 0 ? -120 : Tone.gainToDb(config.musicVolume * 0.3);

    this.ctxManager.musicGain.volume.setValueAtTime(-120, Tone.now());
    this.ctxManager.musicGain.volume.rampTo(targetDb, duration);
  }
}
`,"src/core/audio/SFXManager.ts":`import { AudioContextManager } from "./AudioContextManager";
import { SFXHelper } from "./sfx/SFXHelper";
import { PlayerSFX } from "./sfx/PlayerSFX";
import { BossSFX } from "./sfx/BossSFX";
import { InterfaceSFX } from "./sfx/InterfaceSFX";
import { IEventBus } from "@/core/Interfaces";

export class SFXManager {
  private helper: SFXHelper;
  private playerSFX: PlayerSFX;
  private bossSFX: BossSFX;
  private interfaceSFX: InterfaceSFX;

  constructor(ctxManager: AudioContextManager, eventBus: IEventBus, getComboCounter: () => number, getPlayerX: () => number | undefined, getBossX: () => number | undefined, getMinionX: (id: string) => number | undefined) {
    this.helper = new SFXHelper(ctxManager);
    this.playerSFX = new PlayerSFX(ctxManager, this.helper, eventBus, getComboCounter, getPlayerX);
    this.bossSFX = new BossSFX(ctxManager, this.helper, eventBus, getComboCounter, getBossX, getMinionX);
    this.interfaceSFX = new InterfaceSFX(ctxManager, this.helper);
  }

  public playBossTelegraph(x?: number) {
    this.bossSFX.playBossTelegraph(x);
  }
  public playBossLunge(x?: number) {
    this.bossSFX.playBossLunge(x);
  }
  public playDashRecharge(x?: number) {
    this.playerSFX.playDashRecharge(x);
  }
  public playBossSwipe(x?: number) {
    this.bossSFX.playBossSwipe(x);
  }
  public playMinionSpawning(x?: number) {
    this.bossSFX.playMinionSpawning(x);
  }
  public playMinionDeconstruct(x?: number) {
    this.bossSFX.playMinionDeconstruct(x);
  }
  public playBossPhaseShift(x?: number) {
    this.bossSFX.playBossPhaseShift(x);
  }
  public playBossExplosion(x?: number) {
    this.bossSFX.playBossExplosion(x);
  }
  public playPlayerExplosion(x?: number) {
    this.playerSFX.playPlayerExplosion(x);
  }
  public playHealCancel(x?: number) {
    this.playerSFX.playHealCancel(x);
  }
  public playSpikeStrike(x?: number) {
    this.bossSFX.playSpikeStrike(x);
  }
  public playLanding(x?: number) {
    this.playerSFX.playLanding(x);
  }
  public playFireballLvl1(x?: number) {
    this.playerSFX.playFireballLvl1(x);
  }
  public playFireballLvl2(x?: number) {
    this.playerSFX.playFireballLvl2(x);
  }
  public playMenuConfirm() {
    this.interfaceSFX.playMenuConfirm();
  }
  public playMenuBack() {
    this.interfaceSFX.playMenuBack();
  }
  public playJump(x?: number) {
    this.playerSFX.playJump(x);
  }
  public playDash(x?: number) {
    this.playerSFX.playDash(x);
  }
  public playSlash(direction?: "side" | "up" | "down", x?: number) {
    this.playerSFX.playSlash(direction, x);
  }
  public playHitConfirm(x?: number, entityId?: string) {
    this.bossSFX.playHitConfirm(x, entityId);
  }
  public playPogo(x?: number) {
    this.playerSFX.playPogo(x);
  }
  public playHurt(x?: number) {
    this.playerSFX.playHurt(x);
  }
  public playSelectTick() {
    this.interfaceSFX.playSelectTick();
  }
  public playErrorTick() {
    this.interfaceSFX.playErrorTick();
  }
  public playDialogueTick(speaker: "player" | "boss", char: string) {
    this.interfaceSFX.playDialogueTick(speaker, char);
  }
  public playCrowdVictory() {
    this.interfaceSFX.playCrowdVictory();
  }
  public playCrowdDefeat() {
    this.interfaceSFX.playCrowdDefeat();
  }
  public stopCrowdSounds() {
    this.interfaceSFX.stopCrowdSounds();
  }
}
`,"src/core/audio/sfx/BossSFX.ts":`import * as Tone from "tone";
import { AudioContextManager } from "../AudioContextManager";
import { SFXHelper } from "./SFXHelper";
import { SFX_PRESETS } from "../sfxPresetData";
import { SynthFactory } from "./SynthFactory";
import { IEventBus } from "@/core/Interfaces";

const DORIAN_RATIOS = [1.0000, 1.1225, 1.1892, 1.3348, 1.4983, 1.6818, 1.7818, 2.0000, 2.2449, 2.3784, 2.6697, 2.9966];

export class BossSFX {
  private helper: SFXHelper;
  private eventBus: IEventBus;
  private getComboCounter: () => number;
  private getBossX: () => number | undefined;
  private getMinionX: (id: string) => number | undefined;
  private bossPanner!: Tone.Panner;
  private impactPanner!: Tone.Panner;
  private hurtPanner!: Tone.Panner;

  private jumpSynth!: Tone.Synth;
  private hurtSynth!: Tone.Synth;
  private hitSynth!: Tone.MetalSynth;
  private spikeSynth!: Tone.Synth;
  private teleportSynth!: Tone.Synth;
  private dialogueSynthPlayer!: Tone.Synth;

  private entityComboMap = new Map<string, { lastHitTime: number; hitSequenceCount: number }>();

  private lastSpikeTime = 0;
  private spikeSequenceCount = 0;

  constructor(ctxManager: AudioContextManager, helper: SFXHelper, eventBus: IEventBus, getComboCounter: () => number, getBossX: () => number | undefined, getMinionX: (id: string) => number | undefined) {
    this.helper = helper;
    this.eventBus = eventBus;
    this.getComboCounter = getComboCounter;
    this.getBossX = getBossX;
    this.getMinionX = getMinionX;
    ctxManager.registerOnInit(() => {
      this.init(ctxManager);
      this.setupSubscriptions();
    });
  }

  private init(ctxManager: AudioContextManager) {
    const sfxGain = ctxManager.sfxGain;

    this.bossPanner = new Tone.Panner(0).connect(sfxGain);
    this.impactPanner = new Tone.Panner(0).connect(sfxGain);
    this.hurtPanner = new Tone.Panner(0).connect(sfxGain);

    const presets = SFX_PRESETS.boss;

    this.jumpSynth = SynthFactory.createPannedSynth(presets.telegraph.oscillatorType, presets.telegraph.decay, this.bossPanner, -5, 0.015);
    this.hurtSynth = SynthFactory.createPannedSynth(presets.lunge.oscillatorType, presets.lunge.decay, this.hurtPanner, -5, 0.015);

    this.hitSynth = new Tone.MetalSynth({
      envelope: { attack: 0.001, decay: 0.08, release: 0.08 },
      harmonicity: 5.1,
      resonance: 4000,
      volume: -7
    }).connect(this.impactPanner);
    this.hitSynth.frequency.value = 440;

    this.spikeSynth = SynthFactory.createPannedSynth(presets.spike_strike.oscillatorType, presets.spike_strike.decay, this.impactPanner);
    this.teleportSynth = SynthFactory.createPannedSynth(presets.minion_spawn.oscillatorType, presets.minion_spawn.decay, this.bossPanner, -5, 0.02);
    this.dialogueSynthPlayer = SynthFactory.createPannedSynth("sine", 0.05, this.impactPanner, -6);
  }

  private setupSubscriptions() {
    this.eventBus.subscribe("BOSS_HURT", ({ currentHealth }) => {
      this.playHitConfirm(this.getBossX(), "boss-01");
      if (currentHealth <= 0) {
        this.playBossExplosion(this.getBossX());
      }
    });

    this.eventBus.subscribe("MINION_HURT", ({ id, currentHealth }) => {
      const mX = this.getMinionX(id);
      this.playHitConfirm(mX, id);
      if (currentHealth <= 0) {
        this.playMinionDeconstruct(mX);
      }
    });

    this.eventBus.subscribe("PLAYER_SPIKED", ({ x }) => {
      this.playSpikeStrike(x);
    });

    this.eventBus.subscribe("BOSS_PHASE_SHIFT", () => {
      this.playBossPhaseShift(this.getBossX());
    });

    this.eventBus.subscribe("MINION_SPAWNING", () => {
      this.playMinionSpawning();
    });

    this.eventBus.subscribe("MINION_DISSOLVING", () => {
      this.playMinionDeconstruct();
    });

    this.eventBus.subscribe("BOSS_SWIPED", () => {
      this.playBossSwipe(this.getBossX());
    });

    this.eventBus.subscribe("BOSS_TELEGRAPH", () => {
      this.playBossTelegraph(this.getBossX());
    });

    this.eventBus.subscribe("BOSS_LUNGED", () => {
      this.playBossLunge(this.getBossX());
    });
  }

  public playBossTelegraph(x?: number) {
    const preset = SFX_PRESETS.boss.telegraph;
    this.helper.execute("boss_telegraph", 150, x, this.bossPanner, (now) => {
      this.jumpSynth.triggerAttackRelease(preset.frequency, "8n", now);
      this.jumpSynth.frequency.rampTo(preset.targetFrequency, preset.rampDuration, now);
    });
  }

  public playBossLunge(x?: number) {
    const preset = SFX_PRESETS.boss.lunge;
    this.helper.execute("boss_lunge", 200, x, this.bossPanner, (now) => {
      this.hurtSynth.triggerAttackRelease(preset.frequency, "2n", now);
      this.hurtSynth.frequency.rampTo(preset.targetFrequency, preset.rampDuration, now);
    });
  }

  public playBossSwipe(x?: number) {
    const preset = SFX_PRESETS.boss.swipe;
    this.helper.execute("boss_swipe", 150, x, this.bossPanner, (now) => {
      this.hurtSynth.triggerAttackRelease(preset.frequency, "8n", now);
      this.hurtSynth.frequency.rampTo(preset.targetFrequency, preset.rampDuration, now);
    });
  }

  public playMinionSpawning(x?: number) {
    const preset = SFX_PRESETS.boss.minion_spawn;
    this.helper.execute("minion_spawn", 1000, x, this.bossPanner, (now) => {
      this.teleportSynth.triggerAttackRelease(preset.frequency, "4n", now);
      this.teleportSynth.frequency.rampTo(preset.targetFrequency, preset.rampDuration, now);
    });
  }

  public playMinionDeconstruct(x?: number) {
    const preset = SFX_PRESETS.boss.minion_deconstruct;
    this.helper.execute("minion_deconstruct", 100, x, this.bossPanner, (now) => {
      this.hurtSynth.triggerAttackRelease(preset.frequency, "4n", now);
      this.hurtSynth.frequency.rampTo(preset.targetFrequency, preset.rampDuration, now);
    });
  }

  public playBossPhaseShift(x?: number) {
    const preset = SFX_PRESETS.boss.phase_shift;
    this.helper.execute("boss_phase_shift", 0, x, this.bossPanner, (now) => {
      this.hurtSynth.triggerAttackRelease(preset.frequency, "2n", now);
      this.hurtSynth.frequency.rampTo(preset.targetFrequency, preset.rampDuration, now);
    });
  }

  public playBossExplosion(x?: number) {
    this.helper.execute("boss_explosion", 0, x, this.bossPanner, (now) => {
      for (let i = 0; i < 3; i++) {
        const delay = i * 0.25;
        this.hurtSynth.triggerAttackRelease(140 - i * 20, "4n", now + delay);
        this.hurtSynth.frequency.rampTo(40, 0.35, now + delay);
      }
    });
  }

  public playSpikeStrike(x?: number) {
    this.helper.execute("spike_strike", 80, x, this.impactPanner, (now) => {
      const nowPerformance = performance.now();
      if (nowPerformance - this.lastSpikeTime < 2500) {
        this.spikeSequenceCount = this.spikeSequenceCount + 1;
      } else {
        this.spikeSequenceCount = 0;
      }
      this.lastSpikeTime = nowPerformance;

      const scaleIndex = this.spikeSequenceCount % DORIAN_RATIOS.length;
      const octaveMultiplier = Math.pow(2, Math.floor(this.spikeSequenceCount / DORIAN_RATIOS.length));
      const ratio = DORIAN_RATIOS[scaleIndex] * octaveMultiplier;

      const preset = SFX_PRESETS.boss.spike_strike;
      const adjustedFreq = preset.frequency * ratio;
      const adjustedTargetFreq = (preset.targetFrequency || 700) * ratio;

      this.spikeSynth.triggerAttackRelease(adjustedFreq, "16n", now);
      this.spikeSynth.frequency.rampTo(adjustedTargetFreq, preset.rampDuration, now);
    });
  }

  public playHitConfirm(x?: number, entityId?: string) {
    const nowPerformance = performance.now();
    const targetId = entityId || "unknown";

    let combo = this.entityComboMap.get(targetId);
    if (!combo) {
      combo = { lastHitTime: 0, hitSequenceCount: 0 };
    }

    if (nowPerformance - combo.lastHitTime < 1500) {
      combo.hitSequenceCount = combo.hitSequenceCount + 1;
    } else {
      combo.hitSequenceCount = 0;
    }
    combo.lastHitTime = nowPerformance;
    this.entityComboMap.set(targetId, combo);

    const preset = SFX_PRESETS.boss.hit_confirm;
    const comboCounter = this.getComboCounter();
    const scaleIndex = comboCounter % DORIAN_RATIOS.length;
    const octaveMultiplier = Math.pow(2, Math.floor(comboCounter / DORIAN_RATIOS.length));
    const ratio = DORIAN_RATIOS[scaleIndex] * octaveMultiplier;
    
    const baseFreq = 523.25;
    const pitchAdjustedFreq = baseFreq * ratio;

    this.helper.execute("hit_confirm", 40, x, this.impactPanner, (now) => {
      this.hitSynth.triggerAttackRelease(preset.metalNote, "16n", now);
      this.dialogueSynthPlayer.triggerAttackRelease(pitchAdjustedFreq, "16n", now + preset.synthDelay);
    });
  }
}
`,"src/core/audio/sfx/InterfaceSFX.ts":`import * as Tone from "tone";
import { AudioContextManager } from "../AudioContextManager";
import { SFXHelper } from "./SFXHelper";
import { SFX_PRESETS } from "../sfxPresetData";
import { SynthFactory } from "./SynthFactory";

export class InterfaceSFX {
  private helper: SFXHelper;
  private playerDialoguePanner!: Tone.Panner;
  private bossDialoguePanner!: Tone.Panner;

  private dialogueSynthPlayer!: Tone.PolySynth;
  private dialogueSynthBoss!: Tone.PolySynth;
  private menuSynth!: Tone.Synth;
  private crowdVictoryPlayer?: Tone.Player;
  private crowdDefeatPlayer?: Tone.Player;

  constructor(ctxManager: AudioContextManager, helper: SFXHelper) {
    this.helper = helper;
    ctxManager.registerOnInit(() => this.init(ctxManager));
  }

  private init(ctxManager: AudioContextManager) {
    const sfxGain = ctxManager.sfxGain;

    this.playerDialoguePanner = new Tone.Panner(-0.35).connect(sfxGain);
    this.bossDialoguePanner = new Tone.Panner(0.35).connect(sfxGain);

    this.dialogueSynthPlayer = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.012, decay: 0.04, sustain: 0, release: 0.04 },
      volume: -6
    }).connect(this.playerDialoguePanner);

    this.dialogueSynthBoss = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.015, decay: 0.06, sustain: 0, release: 0.06 },
      volume: -7
    }).connect(this.bossDialoguePanner);

    this.menuSynth = SynthFactory.createPannedSynth("sine", 0.12, this.playerDialoguePanner, -6, 0.015);

    this.dialogueSynthPlayer.maxPolyphony = 16;
    this.dialogueSynthBoss.maxPolyphony = 16;

    this.crowdVictoryPlayer = new Tone.Player({
      url: "./sfx/crowd_victory.mp3",
      autostart: false,
      loop: false
    }).connect(sfxGain);

    this.crowdDefeatPlayer = new Tone.Player({
      url: "./sfx/crowd_defeat.mp3",
      autostart: false,
      loop: false
    }).connect(sfxGain);
  }

  public playSelectTick() {
    const preset = SFX_PRESETS.interface.select_tick;
    this.helper.execute("select_tick", 30, undefined, undefined, (now) => {
      this.dialogueSynthPlayer.triggerAttackRelease(preset.note1, "32n", now);
      this.dialogueSynthPlayer.triggerAttackRelease(preset.note2, "32n", now + preset.delay);
    });
  }

  public playErrorTick() {
    const preset = SFX_PRESETS.interface.error_tick;
    this.helper.execute("error_tick", 30, undefined, undefined, (now) => {
      this.dialogueSynthBoss.triggerAttackRelease(preset.note1, "16n", now);
      this.dialogueSynthBoss.triggerAttackRelease(preset.note2, "16n", now + preset.delay);
    });
  }

  public playMenuConfirm() {
    const preset = SFX_PRESETS.interface.menu_confirm;
    this.helper.execute("menu_confirm", 80, undefined, undefined, (now) => {
      this.menuSynth.triggerAttackRelease(preset.startFreq, "16n", now);
      this.menuSynth.frequency.setValueAtTime(preset.startFreq, now);
      this.menuSynth.frequency.rampTo(preset.targetFreq, preset.duration, now);
    });
  }

  public playMenuBack() {
    const preset = SFX_PRESETS.interface.menu_back;
    this.helper.execute("menu_back", 80, undefined, undefined, (now) => {
      this.menuSynth.triggerAttackRelease(preset.startFreq, "16n", now);
      this.menuSynth.frequency.setValueAtTime(preset.startFreq, now);
      this.menuSynth.frequency.rampTo(preset.targetFreq, preset.duration, now);
    });
  }

  public playDialogueTick(speaker: "player" | "boss", char: string) {
    if (!char) return;
    this.helper.execute("dialogue_tick", 35, undefined, undefined, (now) => {
      if (speaker === "player") {
        const freq = 240 + (char.charCodeAt(0) % 6) * 35;
        this.dialogueSynthPlayer.triggerAttackRelease(freq, "32n", now);
      } else {
        const freq = 70 + (char.charCodeAt(0) % 5) * 12;
        this.dialogueSynthBoss.triggerAttackRelease(freq, "24n", now);
      }
    });
  }

  public playCrowdVictory() {
    if (this.crowdVictoryPlayer && this.crowdVictoryPlayer.loaded) {
      try {
        this.crowdVictoryPlayer.start();
      } catch (err) {
        console.warn("Crowd victory playback error:", err);
      }
    }
  }

  public playCrowdDefeat() {
    if (this.crowdDefeatPlayer && this.crowdDefeatPlayer.loaded) {
      try {
        this.crowdDefeatPlayer.start();
      } catch (err) {
        console.warn("Crowd defeat playback error:", err);
      }
    }
  }

  public stopCrowdSounds() {
    if (this.crowdVictoryPlayer && this.crowdVictoryPlayer.state === "started") {
      try {
        this.crowdVictoryPlayer.stop();
      } catch (err) {
        void err;
      }
    }
    if (this.crowdDefeatPlayer && this.crowdDefeatPlayer.state === "started") {
      try {
        this.crowdDefeatPlayer.stop();
      } catch (err) {
        void err;
      }
    }
  }
}
`,"src/core/audio/sfx/PlayerSFX.ts":`import * as Tone from "tone";
import { AudioContextManager } from "../AudioContextManager";
import { SFXHelper } from "./SFXHelper";
import { SFX_PRESETS } from "../sfxPresetData";
import { SynthFactory } from "./SynthFactory";
import { IEventBus } from "@/core/Interfaces";

const DORIAN_RATIOS = [1.0000, 1.1225, 1.1892, 1.3348, 1.4983, 1.6818, 1.7818, 2.0000, 2.2449, 2.3784, 2.6697, 2.9966];

export class PlayerSFX {
  private helper: SFXHelper;
  private eventBus: IEventBus;
  private getComboCounter: () => number;
  private getPlayerX: () => number | undefined;
  private playerPanner!: Tone.Panner;
  private hurtPanner!: Tone.Panner;

  private jumpSynth!: Tone.Synth;
  private slashSynth!: Tone.Synth;
  private pogoSynth!: Tone.Synth;
  private dashNoise!: Tone.Noise;
  private dashFilter!: Tone.Filter;
  private dashEnv!: Tone.AmplitudeEnvelope;
  private hurtSynth!: Tone.Synth;

  private landingNoise!: Tone.Noise;
  private landingFilter!: Tone.Filter;
  private landingEnv!: Tone.AmplitudeEnvelope;

  private slashNoiseSide!: Tone.Noise;
  private slashFilterSide!: Tone.Filter;
  private slashFilter2Side!: Tone.Filter;
  private slashEnvSide!: Tone.AmplitudeEnvelope;

  private slashNoisePuff!: Tone.Noise;
  private slashFilterPuff!: Tone.Filter;
  private slashEnvPuff!: Tone.AmplitudeEnvelope;

  constructor(ctxManager: AudioContextManager, helper: SFXHelper, eventBus: IEventBus, getComboCounter: () => number, getPlayerX: () => number | undefined) {
    this.helper = helper;
    this.eventBus = eventBus;
    this.getComboCounter = getComboCounter;
    this.getPlayerX = getPlayerX;
    ctxManager.registerOnInit(() => {
      this.init(ctxManager);
      this.setupSubscriptions();
    });
  }

  private init(ctxManager: AudioContextManager) {
    const sfxGain = ctxManager.sfxGain;

    this.playerPanner = new Tone.Panner(0).connect(sfxGain);
    this.hurtPanner = new Tone.Panner(0).connect(sfxGain);

    const presets = SFX_PRESETS.player;

    this.jumpSynth = SynthFactory.createPannedSynth(presets.jump.oscillatorType, presets.jump.decay, this.playerPanner);
    this.slashSynth = SynthFactory.createPannedSynth(presets.fireball_lvl1.oscillatorType, presets.fireball_lvl1.decay, this.playerPanner);
    this.pogoSynth = SynthFactory.createPannedSynth(presets.pogo.oscillatorType, presets.pogo.decay, this.playerPanner);

    this.dashNoise = new Tone.Noise({ type: "white", volume: -7 });
    this.dashFilter = new Tone.Filter({ frequency: presets.dash.noiseFreq, type: "bandpass", Q: presets.dash.noiseQ });
    this.dashEnv = new Tone.AmplitudeEnvelope({
      attack: 0.01,
      decay: presets.dash.noiseDecay,
      sustain: 0,
      release: presets.dash.noiseDecay,
    });
    this.dashNoise.chain(this.dashFilter, this.dashEnv, this.playerPanner);
    this.dashNoise.start();

    this.hurtSynth = SynthFactory.createPannedSynth(presets.hurt.oscillatorType, presets.hurt.decay, this.hurtPanner);

    this.landingNoise = new Tone.Noise({ type: "white", volume: -7 });
    this.landingFilter = new Tone.Filter({
      frequency: presets.landing.noiseFreq,
      type: "bandpass",
      Q: presets.landing.noiseQ,
    });
    this.landingEnv = new Tone.AmplitudeEnvelope({
      attack: 0.01,
      decay: presets.landing.noiseDecay,
      sustain: 0,
      release: presets.landing.noiseDecay,
    });
    this.landingNoise.chain(this.landingFilter, this.landingEnv, this.playerPanner);
    this.landingNoise.start();

    this.slashNoiseSide = new Tone.Noise({ type: "white", volume: -7 });
    this.slashFilterSide = new Tone.Filter({ frequency: presets.slash_side.noiseFreq, type: "highpass" });
    this.slashFilter2Side = new Tone.Filter({ frequency: 1600, type: "bandpass", Q: 1.0 });
    this.slashEnvSide = new Tone.AmplitudeEnvelope({
      attack: 0.005,
      decay: presets.slash_side.noiseDecay,
      sustain: 0,
      release: presets.slash_side.noiseDecay,
    });
    this.slashNoiseSide.chain(this.slashFilterSide, this.slashFilter2Side, this.slashEnvSide, this.playerPanner);
    this.slashNoiseSide.start();

    this.slashNoisePuff = new Tone.Noise({ type: "pink", volume: -7 });
    this.slashFilterPuff = new Tone.Filter({
      frequency: presets.slash_puff.noiseFreq,
      type: "bandpass",
      Q: presets.slash_puff.noiseQ,
    });
    this.slashEnvPuff = new Tone.AmplitudeEnvelope({
      attack: 0.01,
      decay: presets.slash_puff.noiseDecay,
      sustain: 0,
      release: presets.slash_puff.noiseDecay,
    });
    this.slashNoisePuff.chain(this.slashFilterPuff, this.slashEnvPuff, this.playerPanner);
    this.slashNoisePuff.start();
  }

  private setupSubscriptions() {
    this.eventBus.subscribe("PLAYER_HURT", () => {
      this.playHurt(this.getPlayerX());
    });

    this.eventBus.subscribe("PLAYER_JUMPED", () => {
      this.playJump(this.getPlayerX());
    });

    this.eventBus.subscribe("PLAYER_DASHED", () => {
      this.playDash(this.getPlayerX());
    });

    this.eventBus.subscribe("PLAYER_POGOED", () => {
      this.playPogo(this.getPlayerX());
    });

    this.eventBus.subscribe("PLAYER_ATTACKED", ({ direction }) => {
      this.playSlash(direction, this.getPlayerX());
    });

    this.eventBus.subscribe("PLAYER_PROJECTILE_FIRED", ({ level }) => {
      if (level === 2) {
        this.playFireballLvl2(this.getPlayerX());
      } else {
        this.playFireballLvl1(this.getPlayerX());
      }
    });

    this.eventBus.subscribe("PLAYER_LANDED", () => {
      this.playLanding(this.getPlayerX());
    });

    this.eventBus.subscribe("HEAL_CANCEL", () => {
      this.playHealCancel(this.getPlayerX());
    });

    this.eventBus.subscribe("PLAYER_DASH_RECHARGED", () => {
      this.playDashRecharge(this.getPlayerX());
    });
  }

  public playDashRecharge(x?: number) {
    const preset = SFX_PRESETS.player.dash_recharge;
    this.helper.execute("dash_recharge", 150, x, this.playerPanner, (now) => {
      this.jumpSynth.triggerAttackRelease(preset.lowNote, "16n", now);
      this.jumpSynth.triggerAttackRelease(preset.highNote, "16n", now + 0.04);
    });
  }

  public playHealCancel(x?: number) {
    const preset = SFX_PRESETS.player.heal_cancel;
    this.helper.execute("heal_cancel", 0, x, this.playerPanner, (now) => {
      this.hurtSynth.triggerAttackRelease(preset.frequency, "8n", now);
    });
  }

  public playPlayerExplosion(x?: number) {
    this.helper.execute("player_explosion", 0, x, this.playerPanner, (now) => {
      for (let i = 0; i < 3; i++) {
        const delay = i * 0.25;
        this.hurtSynth.triggerAttackRelease(180 - i * 30, "4n", now + delay);
        this.hurtSynth.frequency.rampTo(40, 0.35, now + delay);
      }
    });
  }

  public playLanding(x?: number) {
    const preset = SFX_PRESETS.player.landing;
    this.helper.execute("landing", 100, x, this.playerPanner, (now) => {
      this.pogoSynth.triggerAttackRelease(preset.synthFreq, "8n", now);
      this.pogoSynth.frequency.rampTo(preset.synthTargetFreq, preset.synthDuration, now);
      this.landingEnv.triggerAttackRelease(preset.noiseDecay, now);
    });
  }

  public playFireballLvl1(x?: number) {
    const preset = SFX_PRESETS.player.fireball_lvl1;
    const comboCounter = this.getComboCounter();
    const scaleIndex = comboCounter % DORIAN_RATIOS.length;
    const octaveMultiplier = Math.pow(2, Math.floor(comboCounter / DORIAN_RATIOS.length));
    const ratio = DORIAN_RATIOS[scaleIndex] * octaveMultiplier;

    this.helper.execute("fireball_lvl1", 0, x, this.playerPanner, (now) => {
      const baseFreq = preset.frequency * ratio;
      const targetFreq = preset.targetFrequency * ratio;
      this.slashSynth.triggerAttackRelease(baseFreq, "8n", now);
      this.slashSynth.frequency.rampTo(targetFreq, preset.rampDuration, now);
    });
  }

  public playFireballLvl2(x?: number) {
    const preset = SFX_PRESETS.player.fireball_lvl2;
    this.helper.execute("fireball_lvl2", 0, x, this.playerPanner, (now) => {
      this.hurtSynth.triggerAttackRelease(preset.frequency, "4n", now);
      this.hurtSynth.frequency.rampTo(preset.targetFrequency, preset.rampDuration, now);
    });
  }

  public playJump(x?: number) {
    const preset = SFX_PRESETS.player.jump;
    this.helper.execute("jump", 100, x, this.playerPanner, (now) => {
      this.jumpSynth.triggerAttackRelease(preset.frequency, "8n", now);
      this.jumpSynth.frequency.rampTo(preset.targetFrequency, preset.rampDuration, now);
    });
  }

  public playDash(x?: number) {
    const preset = SFX_PRESETS.player.dash;
    this.helper.execute("dash", 100, x, this.playerPanner, (now) => {
      this.dashEnv.triggerAttackRelease(preset.noiseDecay, now);
      this.dashFilter.frequency.setValueAtTime(preset.noiseFreq, now);
      this.dashFilter.frequency.rampTo(preset.noiseTargetFreq, preset.noiseDuration, now);
    });
  }

  public playSlash(direction: "side" | "up" | "down" = "side", x?: number) {
    if (direction === "side") {
      const preset = SFX_PRESETS.player.slash_side;
      this.helper.execute("slash_side", 80, x, this.playerPanner, (now) => {
        this.slashFilterSide.frequency.rampTo(preset.noiseTargetFreq, preset.noiseDuration, now);
        this.slashEnvSide.triggerAttackRelease(preset.noiseDecay, now);
      });
    } else {
      const preset = SFX_PRESETS.player.slash_puff;
      this.helper.execute("slash_puff", 100, x, this.playerPanner, (now) => {
        this.pogoSynth.triggerAttackRelease(preset.synthFreq, "8n", now);
        this.pogoSynth.frequency.rampTo(preset.synthTargetFreq, preset.synthDuration, now);
        this.slashEnvPuff.triggerAttackRelease(preset.noiseDecay, now);
      });
    }
  }

  public playPogo(x?: number) {
    const preset = SFX_PRESETS.player.pogo;
    const comboCounter = this.getComboCounter();
    const scaleIndex = comboCounter % DORIAN_RATIOS.length;
    const octaveMultiplier = Math.pow(2, Math.floor(comboCounter / DORIAN_RATIOS.length));
    const ratio = DORIAN_RATIOS[scaleIndex] * octaveMultiplier;

    this.helper.execute("pogo", 80, x, this.playerPanner, (now) => {
      const baseFreq = preset.frequency * ratio;
      const targetFreq = preset.targetFrequency * ratio;
      this.pogoSynth.triggerAttackRelease(baseFreq, "16n", now);
      this.pogoSynth.frequency.rampTo(targetFreq, preset.rampDuration, now);
    });
  }

  public playHurt(x?: number) {
    const preset = SFX_PRESETS.player.hurt;
    this.helper.execute("hurt", 120, x, this.hurtPanner, (now) => {
      this.hurtSynth.triggerAttackRelease(preset.frequency, "8n", now);
      this.hurtSynth.frequency.rampTo(preset.targetFrequency, preset.rampDuration, now);
    });
  }
}
`,"src/core/audio/sfx/SFXHelper.ts":`import * as Tone from "tone";
import { AudioContextManager } from "../AudioContextManager";

export class SFXHelper {
  private lastTriggerTimes: Record<string, number> = {};

  constructor(private ctxManager: AudioContextManager) {}

  public execute(
    key: string,
    throttleMs: number,
    x: number | undefined,
    panner: Tone.Panner | undefined,
    callback: (now: number) => void
  ): void {
    try {
      if (!this.ctxManager.initialized) return;
      if (!this.checkThrottle(key, throttleMs)) return;

      const now = Tone.now();
      if (x !== undefined && panner) {
        panner.pan.setValueAtTime(this.ctxManager.getPanFromX(x), now);
      }

      callback(now);
    } catch {
      // Safe global exception boundary
    }
  }

  private checkThrottle(key: string, limitMs: number): boolean {
    const now = Tone.now() * 1000;
    const last = this.lastTriggerTimes[key] || 0;
    if (now - last < limitMs) {
      return false;
    }
    this.lastTriggerTimes[key] = now;
    return true;
  }
}
`,"src/core/audio/sfx/SynthFactory.ts":`import * as Tone from "tone";

export class SynthFactory {
  public static createSynth(oscillatorType: string, decay: number, volume: number = -5, attack: number = 0.012): Tone.Synth {
    return new Tone.Synth({
      oscillator: { type: oscillatorType } as unknown as Tone.SynthOptions["oscillator"],
      envelope: { attack, decay, sustain: 0, release: decay },
      volume,
    });
  }

  public static createPannedSynth(
    oscillatorType: string,
    decay: number,
    panner: Tone.Panner,
    volume: number = -5,
    attack: number = 0.012
  ): Tone.Synth {
    return SynthFactory.createSynth(oscillatorType, decay, volume, attack).connect(panner);
  }
}
`,"src/core/audio/sfxPresetData.ts":`export type BasicOscillatorType = "sine" | "sawtooth" | "triangle" | "square";

export interface SFXPreset {
  frequency: number;
  targetFrequency?: number;
  rampDuration?: number;
  decay: number;
  sustain?: number;
  release?: number;
  oscillatorType: BasicOscillatorType;
  filterType?: "lowpass" | "highpass" | "bandpass";
  filterFrequency?: number;
  filterTargetFrequency?: number;
  filterQ?: number;
  noiseType?: "white" | "pink" | "brown";
}

export const SFX_PRESETS = {
  player: {
    jump: {
      frequency: 240,
      targetFrequency: 580,
      rampDuration: 0.12,
      decay: 0.12,
      oscillatorType: "sine" as BasicOscillatorType,
    },
    dash_recharge: {
      lowNote: "A5",
      highNote: "E6",
      decay: 0.06,
    },
    heal_cancel: {
      frequency: 180,
      decay: 0.12,
      oscillatorType: "sawtooth" as BasicOscillatorType,
    },
    pogo: {
      frequency: 320,
      targetFrequency: 140,
      rampDuration: 0.09,
      decay: 0.1,
      oscillatorType: "sine" as BasicOscillatorType,
    },
    hurt: {
      frequency: 180,
      targetFrequency: 45,
      rampDuration: 0.16,
      decay: 0.16,
      oscillatorType: "sawtooth" as BasicOscillatorType,
    },
    fireball_lvl1: {
      frequency: 440,
      targetFrequency: 160,
      rampDuration: 0.15,
      decay: 0.12,
      oscillatorType: "triangle" as BasicOscillatorType,
    },
    fireball_lvl2: {
      frequency: 220,
      targetFrequency: 80,
      rampDuration: 0.25,
      decay: 0.25,
      oscillatorType: "sawtooth" as BasicOscillatorType,
    },
    landing: {
      synthFreq: 160,
      synthTargetFreq: 65,
      synthDuration: 0.11,
      noiseFreq: 1100,
      noiseDecay: 0.08,
      noiseQ: 2.0,
    },
    dash: {
      noiseFreq: 1400,
      noiseTargetFreq: 500,
      noiseDuration: 0.18,
      noiseDecay: 0.18,
      noiseQ: 2.5,
    },
    slash_side: {
      noiseFreq: 2200,
      noiseTargetFreq: 1000,
      noiseDuration: 0.14,
      noiseDecay: 0.15,
    },
    slash_puff: {
      synthFreq: 220,
      synthTargetFreq: 90,
      synthDuration: 0.15,
      noiseFreq: 650,
      noiseDecay: 0.18,
      noiseQ: 1.2,
    },
  },
  boss: {
    telegraph: {
      frequency: 320,
      targetFrequency: 680,
      rampDuration: 0.35,
      decay: 0.12,
      oscillatorType: "sine" as BasicOscillatorType,
    },
    lunge: {
      frequency: 120,
      targetFrequency: 40,
      rampDuration: 0.45,
      decay: 0.5,
      oscillatorType: "sawtooth" as BasicOscillatorType,
    },
    swipe: {
      frequency: 180,
      targetFrequency: 50,
      rampDuration: 0.22,
      decay: 0.16,
      oscillatorType: "sawtooth" as BasicOscillatorType,
    },
    minion_spawn: {
      frequency: 180,
      targetFrequency: 720,
      rampDuration: 0.3,
      decay: 0.3,
      oscillatorType: "triangle" as BasicOscillatorType,
    },
    minion_deconstruct: {
      frequency: 280,
      targetFrequency: 60,
      rampDuration: 0.28,
      decay: 0.28,
      oscillatorType: "sawtooth" as BasicOscillatorType,
    },
    phase_shift: {
      frequency: 80,
      targetFrequency: 320,
      rampDuration: 0.8,
      decay: 0.8,
      oscillatorType: "sawtooth" as BasicOscillatorType,
    },
    spike_strike: {
      frequency: 1400,
      targetFrequency: 700,
      rampDuration: 0.12,
      decay: 0.12,
      oscillatorType: "square" as BasicOscillatorType,
    },
    hit_confirm: {
      metalNote: "C6",
      synthFreq: 880,
      synthDelay: 0.04,
    },
  },
  interface: {
    select_tick: {
      note1: 880,
      note2: 1250,
      delay: 0.025,
    },
    error_tick: {
      note1: 260,
      note2: 160,
      delay: 0.05,
    },
    menu_confirm: {
      startFreq: 440,
      targetFreq: 880,
      duration: 0.12,
    },
    menu_back: {
      startFreq: 587,
      targetFreq: 293,
      duration: 0.12,
    },
  },
};
`,"src/core/design/ColorRoles.ts":`export type ColorRole =
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
    return base.replace("hsl", "hsla").replace(")", \`, \${opacity})\`);
  }
  return base;
}
`,"src/core/design/GauntletStages.ts":`import { LevelConfig } from "../levelData";
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
    title: "THE SOVEREIGN CRUCIBLE",
    subtitle: "THE APHELION CHANCEL",
    midBossId: "prime-aphelion",
    midBossDisplayName: "PRIME APHELION",
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
        earliestTime: 1,
        cooldownRange: [3, 5],
        maxActiveMinions: 4,
        entries: [
          { type: "TURRET", anchorIds: ["left-catwalk", "right-catwalk"], weight: 20 },
          { type: "LANCER", anchorIds: ["center-bridge"], weight: 20 },
          { type: "FLYER", anchorTags: ["air"], weight: 20 },
          { type: "COMPASS_WASP", anchorTags: ["air"], weight: 40 }
        ]
      },
      {
        id: "s1-w2",
        phase: 2,
        cooldownRange: [3, 5],
        maxActiveMinions: 6,
        entries: [
          { type: "SHIELDER", anchorTags: ["ground"], weight: 20 },
          { type: "PIT_LANCER", anchorTags: ["ground"], weight: 20 },
          { type: "CLAMPJAW", anchorTags: ["ground"], weight: 20 },
          { type: "SHARD_CHOIR", anchorTags: ["air", "perch"], weight: 40 }
        ]
      },
      {
        id: "s1-w3",
        phase: 3,
        cooldownRange: [2, 4],
        maxActiveMinions: 8,
        entries: [
          { type: "HYMN_NAIL", anchorTags: ["perch"], weight: 25 },
          { type: "BLISTER_OX", anchorTags: ["ground"], weight: 25 },
          { type: "BELL_HAMMER", anchorTags: ["ground"], weight: 25 },
          { type: "SHARD_CHOIR", anchorTags: ["air"], weight: 25 }
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
    ],
    visualShapes: [
      {
        type: "organic",
        colorRole: "arena-infection",
        infectionSeams: true,
        points: [
          { x: 340, y: 640 },
          { x: 660, y: 640 },
          { x: 660, y: 672 },
          { x: 340, y: 672 }
        ]
      }
    ]
  }
];
`,"src/core/effects/CinematicDeathRenderer.ts":`import { Software3DRenderer } from "../visuals/Software3DRenderer";
import { UNITS } from "@/core/Units";
import { World } from "@/core/World";
import { TrigLUT } from "@/core/TrigLUT";

const PSEUDO_RANDOM_LUT = Array.from({ length: 128 }, () => TrigLUT.random() * 4 - 2);

export class CinematicDeathRenderer {
  public static render(
    ctx: CanvasRenderingContext2D,
    world: World,
    bossDeathTimer: number,
    bossDeathPos: { x: number; y: number }
  ): void {
    const t = bossDeathTimer;
    const px = bossDeathPos.x;
    const py = bossDeathPos.y;

    const isPlayer = !!(world.player && world.player.isDead);
    const primaryColor = isPlayer ? "hsl(142, 71%, 58%)" : "hsl(350, 80%, 60%)";
    const secondaryColor = isPlayer ? "hsl(280, 80%, 65%)" : "hsl(45, 100%, 65%)";

    ctx.save();

    if (t < 1.0) {
      const progress = t;

      const gridCols = 8;
      const gridRows = 8;
      const baseWidth = 60;
      const baseHeight = 60;

      ctx.globalCompositeOperation = "lighter";

      for (let row = 0; row < gridRows; row++) {
        const cascadeDir = isPlayer ? -1 : 1;
        const birthDelay = isPlayer ? (7 - row) * 0.04 : row * 0.04;
        const activeProgress = Math.max(0, progress - birthDelay) / (1.0 - birthDelay);

        if (activeProgress > 0 && activeProgress < 1.0) {
          const opacity = 1.0 - activeProgress;
          const size = (baseWidth / gridCols) * (1.0 - activeProgress * 0.4);

          const lutIdx = (row * 7) % PSEUDO_RANDOM_LUT.length;
          const offsetVal = PSEUDO_RANDOM_LUT[lutIdx];

          const startX = px - baseWidth / 2 + (row % 2 === 0 ? 0.3 : -0.3) * offsetVal + (row + 0.5) * (baseWidth / gridCols);
          const startY = py - baseHeight / 2 + (row + 0.5) * (baseHeight / gridRows);

          const angle = TrigLUT.atan2(row - (gridRows - 1) / 2, (row % gridCols) - (gridCols - 1) / 2) + (row % 2 === 0 ? 0.2 : -0.2);
          const thrust = activeProgress * 64;
          const gravityOffset = cascadeDir * activeProgress * activeProgress * 112;

          const curX = startX + TrigLUT.cos(angle) * thrust + (TrigLUT.sin(progress * 15 + row) * 4 * (1.0 - activeProgress));
          const curY = startY + TrigLUT.sin(angle) * thrust + gravityOffset;

          ctx.fillStyle = (row + (row % gridCols)) % 2 === 0 ? primaryColor : secondaryColor;
          ctx.globalAlpha = opacity;

          const fYaw = progress * 6 + row;
        const fPitch = progress * 4 - row;
        const fRoll = progress * 5 + row * 2;
        const fColor = (row + (row % gridCols)) % 2 === 0 ? primaryColor : secondaryColor;
        Software3DRenderer.drawGeometry(
          ctx,
          Software3DRenderer.BOX_GEOMETRY,
          curX,
          curY,
          size,
          size,
          1.0,
          1.0,
          fYaw,
          fPitch,
          fRoll,
          fColor,
          opacity
        );
        }
      }

      if (progress >= 0.7) {
        const pinchProgress = (progress - 0.7) / 0.3;
        const flareAlpha = Math.sin(pinchProgress * Math.PI);

        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = flareAlpha;

        const hLength = Math.max(4, 176 * (1.0 - pinchProgress * pinchProgress * pinchProgress));
        const hHeight = Math.max(1, 6.4 * (1.0 - pinchProgress));
        ctx.fillRect(px - hLength / 2, py - hHeight / 2, hLength, hHeight);

        const vHeight = Math.max(4, 176 * (1.0 - pinchProgress * pinchProgress * pinchProgress));
        const vWidth = Math.max(1, 6.4 * (1.0 - pinchProgress));
        ctx.fillRect(px - vWidth / 2, py - vHeight / 2, vWidth, vHeight);

        ctx.beginPath();
        ctx.arc(px, py, Math.max(2, 9.6 * (1.0 - pinchProgress)), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const flashT = t - 1.0;
    if (flashT >= 0 && flashT < 0.25) {
      const flashOpacity = Math.max(0, 0.85 * (1 - flashT / 0.25));
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = flashOpacity;
      ctx.fillRect(0, 0, UNITS.WORLD_SIZE, UNITS.WORLD_SIZE);
    }

    const explodeT = t - 1.0;

    if (explodeT >= 0 && explodeT < 1.2) {
      const explodeProgress = explodeT / 1.2;
      const opacity = Math.max(0, 1.0 - explodeProgress);

      ctx.globalCompositeOperation = "lighter";

      const rayCount = 14;
      const maxRayLength = 384;
      
      ctx.fillStyle = isPlayer ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)";
      ctx.globalAlpha = opacity * 0.35;

      ctx.beginPath();
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + explodeT * 0.4;
        const currentLength = maxRayLength * TrigLUT.sin(explodeProgress * Math.PI * 0.5);
        const rayWidth = 14.4 * TrigLUT.sin(explodeProgress * Math.PI) * (0.8 + 0.4 * (i % 2));

        const p1_angle = angle - (rayWidth / currentLength);
        const p2_angle = angle + (rayWidth / currentLength);

        const x1 = px + TrigLUT.cos(p1_angle) * currentLength;
        const y1 = py + TrigLUT.sin(p1_angle) * currentLength;
        const x2 = px + TrigLUT.cos(p2_angle) * currentLength;
        const y2 = py + TrigLUT.sin(p2_angle) * currentLength;

        ctx.moveTo(px, py);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
      }
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = opacity * 0.75;
      ctx.beginPath();
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + explodeT * 0.4;
        const currentLength = maxRayLength * TrigLUT.sin(explodeProgress * Math.PI * 0.5);
        ctx.moveTo(px, py);
        ctx.lineTo(px + TrigLUT.cos(angle) * currentLength * 0.8, py + TrigLUT.sin(angle) * currentLength * 0.8);
        ctx.lineTo(px + TrigLUT.cos(angle + 0.01) * currentLength * 0.8, py + TrigLUT.sin(angle + 0.01) * currentLength * 0.8);
        ctx.closePath();
      }
      ctx.fill();

      const ringCount = 3;
      const ringSpeed = 656;
      
      for (let i = 0; i < ringCount; i++) {
        const delay = i * 0.12;
        const ringTime = explodeT - delay;

        if (ringTime > 0 && ringTime < 1.0) {
          const radius = ringTime * ringSpeed;
          const ringOpacity = Math.max(0, 1 - ringTime / 1.0);

          ctx.beginPath();
          ctx.arc(px - 3, py, radius, 0, Math.PI * 2);
          ctx.strokeStyle = isPlayer ? "rgb(168, 85, 247)" : "rgb(239, 68, 68)";
          ctx.lineWidth = Math.max(1, 8 * (1 - ringTime / 1.0));
          ctx.globalAlpha = ringOpacity * 0.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(px + 3, py, radius, 0, Math.PI * 2);
          ctx.strokeStyle = isPlayer ? "rgb(34, 197, 94)" : "rgb(234, 179, 8)";
          ctx.lineWidth = Math.max(1, 4.8 * (1 - ringTime / 1.0));
          ctx.globalAlpha = ringOpacity * 0.7;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = Math.max(1, 2.4 * (1 - ringTime / 1.0));
          ctx.globalAlpha = ringOpacity * 0.95;
          ctx.stroke();
        }
      }

      const particleCount = 28;
      const particleSpeed = 496;
      const particleLife = 1.0;
      
      if (explodeT < particleLife) {
        const partOpacity = Math.max(0, 1 - explodeT / particleLife);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = partOpacity * 0.8;

        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + (i % 2 === 0 ? explodeT * 0.8 : -explodeT * 0.8);
          const distance = explodeT * particleSpeed * (0.6 + (0.4 * (i % 3)) / 3);
          const x = px + TrigLUT.cos(angle) * distance;
          const y = py + TrigLUT.sin(angle) * distance;
          ctx.fillRect(x - 4, y - 4, 8, 8);
        }

        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = partOpacity;
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + (i % 2 === 0 ? explodeT * 0.8 : -explodeT * 0.8);
          const distance = explodeT * particleSpeed * (0.6 + (0.4 * (i % 3)) / 3);
          const x = px + TrigLUT.cos(angle) * distance;
          const y = py + TrigLUT.sin(angle) * distance;
          ctx.fillRect(x - 1.6, y - 1.6, 3.2, 3.2);
        }
      }
    }

    ctx.restore();
  }
}
`,"src/core/effects/PlayerFxRenderer.ts":`import { UNITS } from "@/core/Units";
import { TrigLUT } from "@/core/TrigLUT";

interface SegmentBuffer {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  alpha: number;
}

interface ChargeSegmentBuffer {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
}

const MAX_SEGMENTS = 256;

const healBackBuffer: SegmentBuffer[] = Array.from({ length: MAX_SEGMENTS }, () => ({ x1: 0, y1: 0, x2: 0, y2: 0, alpha: 0 }));
const healFrontBuffer: SegmentBuffer[] = Array.from({ length: MAX_SEGMENTS }, () => ({ x1: 0, y1: 0, x2: 0, y2: 0, alpha: 0 }));

const chargeBackBuffer: ChargeSegmentBuffer[] = Array.from({ length: MAX_SEGMENTS }, () => ({ x1: 0, y1: 0, x2: 0, y2: 0, color: "", width: 0 }));
const chargeFrontBuffer: ChargeSegmentBuffer[] = Array.from({ length: MAX_SEGMENTS }, () => ({ x1: 0, y1: 0, x2: 0, y2: 0, color: "", width: 0 }));

const ORBITS = [
  { psi: 0.1, phi: 0.38, speed: 0.005 },
  { psi: Math.PI / 4, phi: 0.52, speed: -0.004 },
  { psi: -Math.PI / 4, phi: 0.52, speed: 0.003 }
];

const ACTIVE_RINGS_LVL2 = [
  { orbitIndex: 0, color: "rgba(234, 179, 8, 0.85)" },
  { orbitIndex: 1, color: "rgba(134, 212, 51, 0.85)" },
  { orbitIndex: 2, color: "rgba(34, 197, 94, 0.95)" }
];

const ACTIVE_RINGS_LVL1 = [
  { orbitIndex: 0, color: "rgba(234, 179, 8, 0.65)" },
  { orbitIndex: 2, color: "rgba(34, 197, 94, 0.75)" }
];

export class PlayerFxRenderer {
  public static prepareHealSegments(
    nowTime: number,
    progress: number,
    outCounts: { back: number; front: number }
  ): void {
    const segmentsCount = 120;
    const loops = 4.0;
    const maxAngle = loops * Math.PI * 2;
    const rotationOffset = nowTime * 0.008;
    const coilHeight = progress * 67.2;

    let backIdx = 0;
    let frontIdx = 0;

    for (let i = 0; i < segmentsCount; i++) {
      const t1 = i / segmentsCount;
      const t2 = (i + 1) / segmentsCount;

      const angle1 = t1 * maxAngle + rotationOffset;
      const angle2 = t2 * maxAngle + rotationOffset;

      const r1 = (33.6 * (1 - t1 * 0.3)) + TrigLUT.sin(nowTime * 0.03 + t1 * 8) * 2;
      const r2 = (33.6 * (1 - t2 * 0.3)) + TrigLUT.sin(nowTime * 0.03 + t2 * 8) * 2;

      const x1 = r1 * TrigLUT.cos(angle1);
      const y1 = -t1 * coilHeight + r1 * TrigLUT.sin(angle1) * 0.28;

      const x2 = r2 * TrigLUT.cos(angle2);
      const y2 = -t2 * coilHeight + r2 * TrigLUT.sin(angle2) * 0.28;

      const midAngle = (angle1 + angle2) / 2;
      const isBehind = TrigLUT.sin(midAngle) < 0;

      const segmentAlpha = (1.0 - t1 * 0.25) * progress;

      if (isBehind) {
        if (backIdx < MAX_SEGMENTS) {
          const seg = healBackBuffer[backIdx];
          seg.x1 = x1;
          seg.y1 = y1;
          seg.x2 = x2;
          seg.y2 = y2;
          seg.alpha = segmentAlpha;
          backIdx++;
        }
      } else {
        if (frontIdx < MAX_SEGMENTS) {
          const seg = healFrontBuffer[frontIdx];
          seg.x1 = x1;
          seg.y1 = y1;
          seg.x2 = x2;
          seg.y2 = y2;
          seg.alpha = segmentAlpha;
          frontIdx++;
        }
      }
    }

    outCounts.back = backIdx;
    outCounts.front = frontIdx;
  }

  public static renderHealBuffer(ctx: CanvasRenderingContext2D, isBehind: boolean, count: number, progress: number): void {
    if (count === 0) return;
    const buffer = isBehind ? healBackBuffer : healFrontBuffer;
    const coilHeight = progress * 67.2;

    ctx.save();
    
    // Zero-alloc vertical linear gradient representation of coil depth
    const grad = ctx.createLinearGradient(0, 0, 0, -coilHeight);
    grad.addColorStop(0, \`hsla(280, 100%, 75%, \${progress})\`);
    grad.addColorStop(1, \`hsla(280, 100%, 75%, \${progress * 0.75})\`);
    
    // Apply additive composite glow safely
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = grad;
    ctx.lineCap = "round";

    // Draw wider outer core glow
    ctx.beginPath();
    for (let s = 0; s < count; s++) {
      const seg = buffer[s];
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
    }
    ctx.lineWidth = 4.5;
    ctx.stroke();

    // Draw inner core path
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    ctx.restore();
  }

  public static prepareChargeSegments(
    nowTime: number,
    chargeTimer: number,
    playerHeight: number,
    outCounts: { back: number; front: number }
  ): void {
    const chargeProgress = Math.max(0, Math.min(1.0, chargeTimer / UNITS.CHARGE_LVL2_TIME));
    const isLvl2 = chargeTimer >= UNITS.CHARGE_LVL2_TIME;

    const baseRadius = (playerHeight * 0.35) + chargeProgress * 10;
    const localCenterX = 0;
    const localCenterY = -playerHeight / 2;

    const activeRings = isLvl2 ? ACTIVE_RINGS_LVL2 : ACTIVE_RINGS_LVL1;

    let backIdx = 0;
    let frontIdx = 0;

    for (let s = 0; s < activeRings.length; s++) {
      const ringConfig = activeRings[s];
      const orbit = ORBITS[ringConfig.orbitIndex];
      const segments = 32;
      const step = (Math.PI * 2) / segments;
      const rotationSpeed = orbit.speed * nowTime;
      const ringColor = ringConfig.color;

      const lineWidth = isLvl2 ? (s === 2 ? 2.5 : 1.5) : 1.2;

      for (let i = 0; i < segments; i++) {
        const theta1 = i * step + rotationSpeed;
        const theta2 = (i + 1) * step + rotationSpeed;

        const noise1 = TrigLUT.sin(theta1 * 5 + nowTime * 0.04) * 3 * chargeProgress;
        const noise2 = TrigLUT.sin(theta2 * 5 + nowTime * 0.04) * 3 * chargeProgress;

        const r1 = baseRadius + noise1 + s * 9.6 * chargeProgress;
        const r2 = baseRadius + noise2 + s * 9.6 * chargeProgress;

        const x0_1 = r1 * TrigLUT.cos(theta1);
        const y0_1 = r1 * TrigLUT.sin(theta1);
        
        const x1_1 = x0_1 * TrigLUT.cos(orbit.psi);
        const y1_1 = y0_1;
        const z1_1 = -x0_1 * TrigLUT.sin(orbit.psi);

        const x2_1 = x1_1;
        const y2_1 = y1_1 * TrigLUT.cos(orbit.phi) - z1_1 * TrigLUT.sin(orbit.phi);
        const z2_1 = y1_1 * TrigLUT.sin(orbit.phi) + z1_1 * TrigLUT.cos(orbit.phi);

        const x0_2 = r2 * TrigLUT.cos(theta2);
        const y0_2 = r2 * TrigLUT.sin(theta2);

        const x1_2 = x0_2 * TrigLUT.cos(orbit.psi);
        const y1_2 = y0_2;
        const z1_2 = -x0_2 * TrigLUT.sin(orbit.psi);

        const x2_2 = x1_2;
        const y2_2 = y1_2 * TrigLUT.cos(orbit.phi) - z1_2 * TrigLUT.sin(orbit.phi);
        const z2_2 = y1_2 * TrigLUT.sin(orbit.phi) + z1_2 * TrigLUT.cos(orbit.phi);

        const p1_x = localCenterX + x2_1;
        const p1_y = localCenterY + y2_1;
        const p1_z = z2_1;

        const p2_x = localCenterX + x2_2;
        const p2_y = localCenterY + y2_2;
        const p2_z = z2_2;

        const midZ = (p1_z + p2_z) / 2;

        if (midZ < 0) {
          if (backIdx < MAX_SEGMENTS) {
            const seg = chargeBackBuffer[backIdx];
            seg.x1 = p1_x;
            seg.y1 = p1_y;
            seg.x2 = p2_x;
            seg.y2 = p2_y;
            seg.color = ringColor;
            seg.width = lineWidth;
            backIdx++;
          }
        } else {
          if (frontIdx < MAX_SEGMENTS) {
            const seg = chargeFrontBuffer[frontIdx];
            seg.x1 = p1_x;
            seg.y1 = p1_y;
            seg.x2 = p2_x;
            seg.y2 = p2_y;
            seg.color = ringColor;
            seg.width = lineWidth;
            frontIdx++;
          }
        }
      }
    }

    outCounts.back = backIdx;
    outCounts.front = frontIdx;
  }

  public static renderChargeBuffer(ctx: CanvasRenderingContext2D, isBehind: boolean, count: number): void {
    if (count === 0) return;
    const buffer = isBehind ? chargeBackBuffer : chargeFrontBuffer;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    let currentStyle = "";
    let currentWidth = 1.0;

    ctx.beginPath();
    for (let s = 0; s < count; s++) {
      const seg = buffer[s];
      if (seg.color !== currentStyle || seg.width !== currentWidth) {
        if (s > 0) {
          ctx.stroke();
        }
        currentStyle = seg.color;
        currentWidth = seg.width;
        ctx.strokeStyle = currentStyle;
        ctx.lineWidth = currentWidth;
        ctx.beginPath();
      }
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
    }
    ctx.stroke();
    ctx.restore();
  }
}
`,"src/core/eventBroker.ts":`import { IEventBus, GameEventMap } from "./Interfaces";

class EventBroker implements IEventBus {
  private listeners: Record<string, Set<(payload: unknown) => void>> = {};

  private static sparkPayload: {
    x: number; y: number; angle: number; color?: string; radial?: boolean; count?: number; turbulence?: number; shape?: "spark" | "line";
  } = { x: 0, y: 0, angle: 0 };

  private static dustPayload: { x: number; y: number; direction?: "horizontal" | "vertical" } = { x: 0, y: 0 };

  private static blastPayload: { x: number; y: number; color: string } = { x: 0, y: 0, color: "" };

  public subscribe<K extends string>(event: K, callback: (payload: K extends keyof GameEventMap ? GameEventMap[K] : unknown) => void): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }
    this.listeners[event]!.add(callback as (payload: unknown) => void);
    return () => {
      this.listeners[event]?.delete(callback as (payload: unknown) => void);
    };
  }

  public publish<K extends string>(event: K, payload: K extends keyof GameEventMap ? GameEventMap[K] : unknown): void {
    const set = this.listeners[event];
    if (set) {
      set.forEach((cb) => cb(payload));
    }
  }

  public publishSpark(x: number, y: number, angle: number, color?: string, radial?: boolean, count?: number, shape?: "spark" | "line", turbulence?: number): void {
    const p = EventBroker.sparkPayload;
    p.x = x;
    p.y = y;
    p.angle = angle;
    p.color = color;
    p.radial = radial;
    p.count = count;
    p.shape = shape;
    p.turbulence = turbulence;
    this.publish("SPAWN_SPARKS", p as GameEventMap["SPAWN_SPARKS"]);
  }

  public publishDust(x: number, y: number, direction?: "horizontal" | "vertical"): void {
    const p = EventBroker.dustPayload;
    p.x = x;
    p.y = y;
    p.direction = direction;
    this.publish("SPAWN_DUST", p as GameEventMap["SPAWN_DUST"]);
  }

  public publishBlast(x: number, y: number, color: string): void {
    const p = EventBroker.blastPayload;
    p.x = x;
    p.y = y;
    p.color = color;
    this.publish("SPAWN_BLAST", p as GameEventMap["SPAWN_BLAST"]);
  }

  public clear(): void {
    this.listeners = {};
  }
}

export const eventBroker = new EventBroker();
`,"src/core/levelData.ts":`import { Rectangle } from "@/core/Interfaces";

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
`,"src/core/menuNavigation.ts":`import { settingsManager } from "./SettingsManager";

export function getKeyMap() {
  return settingsManager.getKeyMap();
}

export function isConfirmKey(e: KeyboardEvent): boolean {
  const jumpKeys = getKeyMap()["JUMP"] || [];
  return (
    e.key === "Enter" || e.key === " " || e.code === "Space" || jumpKeys.includes(e.code) || jumpKeys.includes(e.key)
  );
}

export function isBackKey(e: KeyboardEvent): boolean {
  const attackKeys = getKeyMap()["ATTACK"] || [];
  const dashKeys = getKeyMap()["DASH"] || [];
  return (
    e.key === "Escape" ||
    e.key === "Backspace" ||
    attackKeys.includes(e.code) ||
    attackKeys.includes(e.key) ||
    dashKeys.includes(e.code) ||
    dashKeys.includes(e.key)
  );
}
`,"src/core/schemas.ts":`import { Action } from "@/core/InputProvider";

export interface ValidatedSaveSlot {
  wins: number;
  losses: number;
  empty: boolean;
}

export interface ValidatedAudioSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  masterMuted: boolean;
  sfxMuted: boolean;
  musicMuted: boolean;
}

export interface ValidatedKeyMap {
  MOVE_LEFT: string[];
  MOVE_RIGHT: string[];
  MOVE_UP: string[];
  MOVE_DOWN: string[];
  JUMP: string[];
  ATTACK: string[];
  DASH: string[];
}

export class ConfigurationValidator {
  private static readonly REQUIRED_ACTIONS: Action[] = [
    "MOVE_LEFT",
    "MOVE_RIGHT",
    "MOVE_UP",
    "MOVE_DOWN",
    "JUMP",
    "ATTACK",
    "DASH",
  ];

  public static validateSaveSlot(data: unknown): ValidatedSaveSlot {
    if (!data || typeof data !== "object") {
      return { wins: 0, losses: 0, empty: true };
    }

    const obj = data as Record<string, unknown>;

    return {
      wins: typeof obj.wins === "number" && obj.wins >= 0 ? obj.wins : 0,
      losses: typeof obj.losses === "number" && obj.losses >= 0 ? obj.losses : 0,
      empty: typeof obj.empty === "boolean" ? obj.empty : true,
    };
  }

  public static validateAudioSettings(data: unknown, fallback: ValidatedAudioSettings): ValidatedAudioSettings {
    if (!data || typeof data !== "object") {
      return fallback;
    }

    const obj = data as Record<string, unknown>;

    const checkVolume = (val: unknown, def: number) => {
      return typeof val === "number" && val >= 0 && val <= 1 ? val : def;
    };

    const checkMute = (val: unknown, def: boolean) => {
      return typeof val === "boolean" ? val : def;
    };

    return {
      masterVolume: checkVolume(obj.masterVolume, fallback.masterVolume),
      sfxVolume: checkVolume(obj.sfxVolume, fallback.sfxVolume),
      musicVolume: checkVolume(obj.musicVolume, fallback.musicVolume),
      masterMuted: checkMute(obj.masterMuted, fallback.masterMuted),
      sfxMuted: checkMute(obj.sfxMuted, fallback.sfxMuted),
      musicMuted: checkMute(obj.musicMuted, fallback.musicMuted),
    };
  }

  public static validateKeyMap(data: unknown, fallback: ValidatedKeyMap): ValidatedKeyMap {
    if (!data || typeof data !== "object") {
      return fallback;
    }

    const obj = data as Record<string, unknown>;
    const validatedMap = {} as ValidatedKeyMap;

    for (const action of this.REQUIRED_ACTIONS) {
      const keys = obj[action];
      if (Array.isArray(keys) && keys.length > 0 && keys.every((k) => typeof k === "string")) {
        validatedMap[action] = [...keys] as string[];
      } else {
        validatedMap[action] = [...fallback[action]];
      }
    }

    return validatedMap;
  }
}
`,"src/core/screenRoutes.ts":`import { ScreenState } from "@/store/useGameStore";
import { Action } from "@/core/InputProvider";
import { soundSynth } from "@/core/SoundSynth";
import { settingsManager, AudioSettings } from "@/core/SettingsManager";

export interface MenuContext {
  navTo: (screen: ScreenState) => void;
  menuIndex: number;
  setMenuIndex: (index: number) => void;
  reloadSaveSlots: () => void;
  resetGameSession: () => void;
  handleSlotAction: (index: number, onPlay: () => void) => void;
  toggleCopyMode: () => void;
  toggleEraseMode: () => void;
  resetActions: () => void;
  audio: AudioSettings;
  handleVolumeChange: (field: keyof AudioSettings, value: number | boolean) => void;
  resetSettings?: () => void;
  setRebindTarget: (target: { action: Action; index: number } | null) => void;
  gameResult: string;
}

export interface ScreenConfig {
  getMaxIndex(context: MenuContext): number;
  onSelect(context: MenuContext): void;
  onBack?(context: MenuContext): void;
  onHorizontal?(direction: number, context: MenuContext): void;
}

export const screenConfigs: Record<string, ScreenConfig> = {
  TITLE: {
    getMaxIndex: () => 3,
    onSelect: ({ menuIndex, navTo, reloadSaveSlots }) => {
      if (menuIndex === 0) {
        reloadSaveSlots();
        navTo("SAVE_SELECT");
      } else if (menuIndex === 1) {
        navTo("OPTIONS");
      } else if (menuIndex === 2) {
        navTo("CREDITS");
      } else if (menuIndex === 3) {
        navTo("SOURCE_VIEW");
      }
    },
  },
  PLAYING: {
    getMaxIndex: ({ gameResult }) => (gameResult !== "PLAYING" ? 1 : 0),
    onSelect: ({ menuIndex, gameResult, resetGameSession, navTo }) => {
      if (gameResult !== "PLAYING") {
        if (menuIndex === 0) {
          resetGameSession();
          navTo("PLAYING");
        } else {
          navTo("TITLE");
        }
      }
    },
  },
  SAVE_SELECT: {
    getMaxIndex: () => 5,
    onSelect: ({
      menuIndex,
      handleSlotAction,
      navTo,
      resetGameSession,
      toggleCopyMode,
      toggleEraseMode,
      resetActions,
    }) => {
      if (menuIndex >= 0 && menuIndex <= 2) {
        handleSlotAction(menuIndex, () => {
          resetGameSession();
          navTo("PLAYING");
        });
      } else if (menuIndex === 3) {
        toggleCopyMode();
      } else if (menuIndex === 4) {
        toggleEraseMode();
      } else if (menuIndex === 5) {
        resetActions();
        navTo("TITLE");
      }
    },
    onBack: ({ resetActions, navTo }) => {
      resetActions();
      navTo("TITLE");
    },
  },
  OPTIONS: {
    getMaxIndex: () => 2,
    onSelect: ({ menuIndex, navTo, setMenuIndex }) => {
      if (menuIndex === 0) {
        navTo("SOUND");
      } else if (menuIndex === 1) {
        navTo("CONTROLS");
      } else if (menuIndex === 2) {
        navTo("TITLE");
        setMenuIndex(1);
      }
    },
    onBack: ({ resetActions, navTo }) => {
      resetActions();
      navTo("TITLE");
    },
  },
  SOUND: {
    getMaxIndex: () => 4,
    onSelect: ({ menuIndex, navTo, resetSettings }) => {
      if (menuIndex === 3) {
        resetSettings?.();
      } else if (menuIndex === 4) {
        navTo("OPTIONS");
      }
    },
    onHorizontal: (direction, { menuIndex, audio, handleVolumeChange }) => {
      const delta = direction * 0.05;
      if (menuIndex === 0 && !audio.masterMuted) {
        handleVolumeChange("masterVolume", Math.max(0, Math.min(1, audio.masterVolume + delta)));
        soundSynth.playSelectTick();
      } else if (menuIndex === 1 && !audio.sfxMuted) {
        handleVolumeChange("sfxVolume", Math.max(0, Math.min(1, audio.sfxVolume + delta)));
        soundSynth.playSelectTick();
      } else if (menuIndex === 2 && !audio.musicMuted) {
        handleVolumeChange("musicVolume", Math.max(0, Math.min(1, audio.musicVolume + delta)));
        soundSynth.playSelectTick();
      }
    },
    onBack: ({ navTo }) => {
      navTo("OPTIONS");
    },
  },
  CONTROLS: {
    getMaxIndex: () => {
      const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
      return isTouch ? 0 : 10;
    },
    onSelect: ({ menuIndex, navTo, setMenuIndex, setRebindTarget, reloadSaveSlots }) => {
      const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
      if (isTouch) {
        navTo("OPTIONS");
        setMenuIndex(1);
        return;
      }
      if (menuIndex === 0) {
        settingsManager.setPreset("DEFAULT_1");
        soundSynth.playHitConfirm();
        reloadSaveSlots();
      } else if (menuIndex === 1) {
        settingsManager.setPreset("DEFAULT_2");
        soundSynth.playHitConfirm();
        reloadSaveSlots();
      } else if (menuIndex === 2) {
        settingsManager.setPreset("CUSTOM");
        soundSynth.playHitConfirm();
        reloadSaveSlots();
      } else if (menuIndex === 10) {
        navTo("OPTIONS");
        setMenuIndex(1);
      } else {
        const actionIndex = menuIndex - 3;
        const action = (Object.keys(settingsManager.getKeyMap()) as Action[])[actionIndex];
        soundSynth.playHitConfirm();
        setRebindTarget({ action, index: 0 });
      }
    },
    onBack: ({ navTo }) => {
      navTo("OPTIONS");
    },
  },
  CREDITS: {
    getMaxIndex: () => 0,
    onSelect: ({ navTo }) => {
      navTo("TITLE");
    },
    onBack: ({ navTo }) => {
      navTo("TITLE");
    },
  },
};
`,"src/core/systems/EntityResetService.ts":`import { Player } from "@/entities/Player";
import { Boss } from "@/entities/Boss";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { setVec, zeroVec } from "@/core/VecUtils";

type Vector2 = { x: number; y: number };

export class EntityResetService {
  public resetPlayer(player: Player, startPos: Vector2, facing: number): void {
    player.isDead = false;
    setVec(player.position, startPos.x, startPos.y);
    setVec(player.previousPosition, startPos.x, startPos.y);
    zeroVec(player.velocity);
    player.facingDirection = facing;

    player.hasDoubleJump = true;
    player.determinationCounter = 0;
    player.healingCharges = 0;
    player.hurtTimer = 0;
    player.recoilTimer = 0;
    player.visualScale = { x: 1, y: 1 };

    player.dashComponent.isDashing = false;
    player.dashComponent.dashTimer = 0;
    player.dashComponent.dashCooldown = 0;
    player.dashComponent.canDash = true;
    player.dashComponent.ghosts = [];

    player.meleeComponent.attackCooldownTimer = 0;
    player.meleeComponent.attackActiveTimer = 0;
    player.meleeComponent.attackActive = false;
    player.meleeComponent.attackDirection = null;
    player.meleeComponent.hasHitEnemyThisSwing = false;

    player.fireballComponent.isCharging = false;
    player.fireballComponent.chargeTimer = 0;

    player.healComponent.isHealing = false;
    player.healComponent.healTimer = 0;

    const health = player.getComponent(HealthComponent);
    if (health) health.reset();
  }

  public resetBoss(boss: Boss, startPos: Vector2, facing: number): void {
    boss.isDead = false;
    setVec(boss.position, startPos.x, startPos.y);
    setVec(boss.previousPosition, startPos.x, startPos.y);
    zeroVec(boss.velocity);
    boss.facingDirection = facing;

    const health = boss.getComponent(HealthComponent);
    if (health) health.reset();
  }
}
`,"src/core/systems/HazardSystem.ts":`import { BaseEntity } from "@/entities/BaseEntity";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { IPhysicsWorld } from "@/core/Interfaces";
import { UNITS } from "@/core/Units";
import { setVec } from "@/core/VecUtils";

export class HazardSystem {
  public static checkContact(entity: BaseEntity, physicsWorld: IPhysicsWorld, damage: number = UNITS.HAZARD_SPIKE_DAMAGE): boolean {
    const health = entity.getComponent(HealthComponent);
    if (!health || health.isInvincible() || entity.isDead) return false;

    const halfW = entity.size.width / 2;
    const halfH = entity.size.height / 2;

    for (const hazard of physicsWorld.hazards) {
      const isHit =
        entity.position.x + halfW > hazard.x &&
        entity.position.x - halfW < hazard.x + hazard.width &&
        entity.position.y + halfH > hazard.y &&
        entity.position.y - halfH < hazard.y + hazard.height;

      if (isHit && entity.velocity.y >= 0) {
        entity.world.events.publish("PLAYER_SPIKED", { x: entity.position.x });
        const damaged = health.takeDamage(damage);
        if (damaged && !entity.isDead) {
          entity.velocity.y = -550;
          setVec(entity.visualScale, 0.5, 1.5);
          setVec(entity.scaleVelocity, 10.0, -15.0);
        }
        return true;
      }
    }

    return false;
  }
}
`,"src/core/systems/MinionCollisionSystem.ts":`import { Player } from "@/entities/Player";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { EntityStatus, IWorld } from "@/core/Interfaces";
import { BaseMinion } from "@/entities/BaseMinion";

export class MinionCollisionSystem {
  public update(minions: IWorld["minions"], player: Player, dt: number): void {
    for (let i = minions.length - 1; i >= 0; i--) {
      const minion = minions[i];
      minion.update(dt);

      if (player.isDead || minion.status !== EntityStatus.ACTIVE) continue;

      let isColliding = false;
      let applyLanceKnockback = false;

      const extBox = (minion as BaseMinion).getExtendedHitbox ? (minion as BaseMinion).getExtendedHitbox!() : null;

      if (extBox) {
        const pW = player.size.width / 2;
        const pH = player.size.height / 2;

        const isLanceColliding =
          player.position.x + pW > extBox.x - extBox.width / 2 &&
          player.position.x - pW < extBox.x + extBox.width / 2 &&
          player.position.y + pH > extBox.y - extBox.height / 2 &&
          player.position.y - pH < extBox.y + extBox.height / 2;

        if (isLanceColliding) {
          isColliding = true;
          applyLanceKnockback = true;
        }
      }

      if (!isColliding) {
        const pW = player.size.width / 2;
        const pH = player.size.height / 2;
        const mW = minion.size.width / 2;
        const mH = minion.size.height / 2;

        isColliding =
          player.position.x + pW > minion.position.x - mW &&
          player.position.x - pW < minion.position.x + mW &&
          player.position.y + pH > minion.position.y - mH &&
          player.position.y - pH < minion.position.y + mH;
      }

      if (isColliding) {
        const playerHealth = player.getComponent(HealthComponent);
        if (playerHealth) {
          const damaged = playerHealth.takeDamage(1);
          if (damaged) {
            if (applyLanceKnockback && minion instanceof BaseMinion) {
              const knockbackDir = minion.facingDirection !== 0 ? minion.facingDirection : 1;
              player.velocity.x = knockbackDir * 650;
              player.velocity.y = -350;
            } else {
              const knockbackDir = Math.sign(player.position.x - minion.position.x);
              player.velocity.x = (knockbackDir !== 0 ? knockbackDir : 1) * 450;
              player.velocity.y = -350;
            }
          }
        }
      }
    }
  }
}
`,"src/core/systems/TraversalHazards.ts":`import { Rectangle } from "../Interfaces";
import { Player } from "@/entities/Player";
import { HealthComponent } from "@/entities/components/HealthComponent";

export class DissolvePlatform {
  public rect: Rectangle;
  public state: "idle" | "cracking" | "gone" | "respawning" = "idle";
  public timer: number = 0;

  constructor(rect: Rectangle) {
    this.rect = { ...rect };
  }

  public update(dt: number, player: Player): void {
    const halfW = player.size.width / 2;
    const halfH = player.size.height / 2;
    const feetY = player.position.y + halfH;

    const playerOnTop =
      player.position.x + halfW > this.rect.x &&
      player.position.x - halfW < this.rect.x + this.rect.width &&
      Math.abs(feetY - this.rect.y) <= 6 &&
      player.velocity.y >= 0;

    if (this.state === "idle") {
      if (playerOnTop) {
        this.state = "cracking";
        this.timer = 0.45;
        player.world.events.publish("CAMERA_SHAKE", { amplitude: 3, duration: 0.15 });
      }
    } else if (this.state === "cracking") {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.state = "gone";
        this.timer = 1.6;
        player.world.events.publish("CAMERA_SHAKE", { amplitude: 8, duration: 0.25 });
        player.world.events.publishSpark(
          this.rect.x + this.rect.width / 2,
          this.rect.y,
          -Math.PI / 2,
          "hsl(45, 100%, 60%)",
          true,
          12,
          "line"
        );
        player.world.audio.playErrorTick();
      }
    } else if (this.state === "gone") {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.state = "respawning";
        this.timer = 0.5;
      }
    } else if (this.state === "respawning") {
      this.timer -= dt;
      if (this.timer <= 0) {
        const pW = player.size.width / 2;
        const pH = player.size.height / 2;
        const isOverlapping =
          player.position.x + pW > this.rect.x &&
          player.position.x - pW < this.rect.x + this.rect.width &&
          player.position.y + pH > this.rect.y &&
          player.position.y - pH < this.rect.y + this.rect.height;

        if (isOverlapping) {
          this.timer = 0.05; // Delay solidification until player clears the area
        } else {
          this.state = "idle";
        }
      }
    }
  }
}

export class PogoPost {
  public rect: Rectangle;

  constructor(rect: Rectangle) {
    this.rect = { ...rect };
  }

  public update(_dt: number, player: Player): void {
    const pW = player.size.width / 2;
    const pH = player.size.height / 2;

    const isOverlapping =
      player.position.x + pW > this.rect.x &&
      player.position.x - pW < this.rect.x + this.rect.width &&
      player.position.y + pH > this.rect.y &&
      player.position.y - pH < this.rect.y + this.rect.height;

    if (isOverlapping) {
      const isPogoActive = player.meleeComponent.attackActive && player.meleeComponent.attackDirection === "down";
      if (isPogoActive && player.velocity.y >= 0) {
        player.velocity.y = -450;
        player.position.y -= 4;
        player.meleeComponent.hasHitEnemyThisSwing = true;
        player.hasDoubleJump = true;
        player.dashComponent.resetDashCharge();
        player.world.events.publish("PLAYER_POGOED", undefined);
        player.world.events.publishSpark(
          this.rect.x + this.rect.width / 2,
          this.rect.y,
          -Math.PI / 2,
          "hsl(280, 100%, 75%)",
          true,
          12
        );
      } else {
        const health = player.getComponent(HealthComponent);
        if (health && !health.isInvincible()) {
          const damaged = health.takeDamage(1, this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
          if (damaged) {
            const dir = Math.sign(player.position.x - (this.rect.x + this.rect.width / 2)) || 1;
            player.velocity.x = dir * 450;
            player.velocity.y = -350;
          }
        }
      }
    }
  }
}

export class DashResetGate {
  public rect: Rectangle;
  public active: boolean = true;
  public cooldownTimer: number = 0;

  constructor(rect: Rectangle) {
    this.rect = { ...rect };
  }

  public update(dt: number, player: Player): void {
    if (this.cooldownTimer > 0) {
      this.cooldownTimer -= dt;
      if (this.cooldownTimer <= 0) {
        this.active = true;
      }
    }

    if (!this.active) return;

    const pW = player.size.width / 2;
    const pH = player.size.height / 2;

    const isOverlapping =
      player.position.x + pW > this.rect.x &&
      player.position.x - pW < this.rect.x + this.rect.width &&
      player.position.y + pH > this.rect.y &&
      player.position.y - pH < this.rect.y + this.rect.height;

    if (isOverlapping && this.active) {
      this.active = false;
      this.cooldownTimer = 2.0;

      player.dashComponent.resetDashCharge();
      player.hasDoubleJump = true;

      player.world.events.publishSpark(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height / 2,
        0,
        "hsl(142, 72%, 56%)",
        true,
        16,
        "line"
      );
      player.world.events.publishBlast(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height / 2,
        "hsl(142, 100%, 80%)"
      );
      player.world.audio.playDashRecharge();
    }
  }
}
`,"src/core/visuals/BossVisuals.ts":`import { Boss } from "@/entities/Boss";
import { Software3DRenderer } from "./Software3DRenderer";

export class BossVisuals {
  static draw(ctx: CanvasRenderingContext2D, boss: Boss, alpha: number): void {
    if (boss.isDead) return;

    const alphaVal = alpha !== undefined ? alpha : 1.0;
    const drawX = boss.previousPosition.x + (boss.position.x - boss.previousPosition.x) * alphaVal;
    const drawY = boss.previousPosition.y + (boss.position.y - boss.previousPosition.y) * alphaVal;

    const activeState = boss.activeStateName;

    ctx.save();

    let baseColor = "hsl(350, 82%, 58%)";
    if (boss.health.isFlashing()) {
      baseColor = "hsl(0, 0%, 100%)";
    } else if (activeState === "TELEGRAPH") {
      baseColor = "hsl(45, 100%, 60%)";
    }

    const feetY = drawY + boss.size.height / 2;

    ctx.translate(drawX, feetY);
    ctx.rotate(boss.rotation);

    const nowTime = performance.now();
    const time = nowTime / 1000;

    const geometry = Software3DRenderer.getTransformedBossGeometry(boss.currentPhase, time);

    const yaw = 0.15 * boss.facingDirection + (boss.velocity.x / boss.lungeSpeed) * 0.45;
    const pitch = 0.08 + (boss.velocity.y / 1200) * 0.25;

    Software3DRenderer.drawGeometry(
      ctx,
      geometry,
      0,
      0,
      boss.size.width,
      boss.size.height,
      boss.visualScale.x,
      boss.visualScale.y,
      yaw,
      pitch,
      0,
      baseColor,
      1.0,
      "feet",
      0
    );

    ctx.save();
    const localY = -boss.size.height / 2;
    ctx.globalAlpha = boss.health.isFlashing() ? 0.25 : 0.9;
    ctx.fillStyle = "rgba(4, 5, 8, 0.82)";
    ctx.fillRect(boss.facingDirection * 7 - 3, localY - 7, 6, 5);
    ctx.fillRect(-boss.facingDirection * 8 - 2, localY - 5, 4, 4);
    ctx.restore();

    ctx.restore();
  }
}
`,"src/core/visuals/MinionVisuals.ts":`import { Software3DRenderer } from "./Software3DRenderer";
import { TrigLUT } from "@/core/TrigLUT";
import { BaseMinion } from "@/entities/BaseMinion";
import { Boss } from "@/entities/Boss";
import { ShapeFamily } from "./ShapeRenderer";

interface CageSegment { x1: number; y1: number; x2: number; y2: number; color: string; width: number; }
const backCageScratch: CageSegment[] = [];
const frontCageScratch: CageSegment[] = [];

const getShapePoints = (family: ShapeFamily): {x: number, y: number}[] => {
    switch(family) {
        case "triangle": return [{x: 0, y: -0.58}, {x: 0.5, y: 0.28}, {x: -0.5, y: 0.28}];
        case "diamond": return [{x:0,y:-0.5},{x:0.5,y:0},{x:0,y:0.5},{x:-0.5,y:0}];
        case "kite": return [{x:0,y:-0.5},{x:0.4,y:-0.1},{x:0,y:0.5},{x:-0.4,y:-0.1}];
        case "needle": return [{x:0,y:-0.5},{x:0.15,y:0},{x:0,y:0.5},{x:-0.15,y:0}];
        case "hex": return Array.from({length: 6}, (_, i) => ({ x: Math.cos(i * Math.PI / 3) * 0.5, y: Math.sin(i * Math.PI / 3) * 0.5 }));
        case "saw": return Array.from({length: 16}, (_, i) => {
            const r = i % 2 === 0 ? 0.52 : 0.33;
            return { x: Math.cos(i * Math.PI / 8) * r, y: Math.sin(i * Math.PI / 8) * r };
        });
        case "orb":
        case "blister": return Array.from({length: 10}, (_, i) => {
            const wobble = family === "blister" ? 1 + Math.sin(i * 2.1) * 0.09 : 1;
            return { x: Math.cos(i * Math.PI / 5) * 0.45 * wobble, y: Math.sin(i * Math.PI / 5) * 0.45 * wobble };
        });
        default: return [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5}]; // corrupted-box fallback
    }
};

const drawRoleGlyph = (ctx: CanvasRenderingContext2D, family: ShapeFamily, facing: number, localY: number, width: number, height: number) => {
    ctx.save();
    ctx.fillStyle = "rgba(3, 5, 8, 0.78)";
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 1;
    if (family === "needle" || family === "kite") {
        ctx.beginPath();
        ctx.moveTo(facing * 3, localY - height * 0.28);
        ctx.lineTo(facing * 10, localY);
        ctx.lineTo(facing * 3, localY + height * 0.28);
        ctx.stroke();
    } else if (family === "diamond" || family === "hex") {
        ctx.fillRect(facing * 6 - 2, localY - 8, 4, 4);
        ctx.fillRect(-facing * 4 - 1.5, localY + 4, 3, 3);
    } else if (family === "blister" || family === "corrupted-box") {
        ctx.beginPath();
        ctx.arc(-width * 0.15, localY - 4, 4, 0, Math.PI * 2);
        ctx.arc(width * 0.18, localY + 5, 5, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillRect(facing * 6.4 - 1.6, localY - 9.6, 4.8, 3.2);
    }
    ctx.restore();
};

export class MinionVisuals {
    static draw(ctx: CanvasRenderingContext2D, minion: BaseMinion, alpha: number): void {
        if (minion.isDead) return;
        const alphaVal = alpha !== undefined ? alpha : 1.0;
        const drawX = minion.previousPosition.x + (minion.position.x - minion.previousPosition.x) * alphaVal;
        const drawY = minion.previousPosition.y + (minion.position.y - minion.previousPosition.y) * alphaVal;
        const nowTime = performance.now();
        
        backCageScratch.length = 0;
        frontCageScratch.length = 0;
        const totalSpawnTime = 1.2;
        const elapsedTime = totalSpawnTime - minion.spawnTimer;
        const spawnPct = Math.max(0, Math.min(1.0, elapsedTime / totalSpawnTime));

        ctx.save();
        if (minion.isSpawning) {
            const profile = minion.getVisualProfile();
            const points = getShapePoints(profile.shapeFamily);
            const sides = points.length;
            const H = minion.size.height;
            const W = minion.size.width;
            const R = W * 0.72;
            const rotation = nowTime * 0.005;
            const hBottom = (H / 2) - (H / 2) * (1.0 - spawnPct);
            const hTop = (H / 2) + (H / 2) * (1.0 - spawnPct);
            const ringHeights = [hBottom, (hBottom + hTop) / 2, hTop];
            
            const boss = minion.world.boss;
            const phase = boss ? (boss as Boss).currentPhase || 1 : 1;
            let mColor = \`hsla(194, 62%, 52%, \${0.85})\`;
            if (phase === 2) mColor = \`hsla(45, 100%, 60%, \${0.85})\`;
            else if (phase === 3) mColor = \`hsla(350, 82%, 58%, \${0.85})\`;

            for (let rIdx = 0; rIdx < ringHeights.length; rIdx++) {
                const hHeight = ringHeights[rIdx];
                const dir = rIdx % 2 === 0 ? 1 : -1;
                const ringRotation = rotation * dir;
                for (let i = 0; i < sides; i++) {
                    const p1 = points[i];
                    const p2 = points[(i + 1) % sides];
                    const x1 = p1.x * R * 2; const y1 = -hHeight + p1.y * R * 0.5;
                    const x2 = p2.x * R * 2; const y2 = -hHeight + p2.y * R * 0.5;
                    const thetaMid = ((i + 0.5) * Math.PI * 2) / sides + ringRotation;
                    const isBehind = TrigLUT.sin(thetaMid) < 0;
                    const segment = { x1, y1, x2, y2, color: mColor, width: 1.5 };
                    if (isBehind) backCageScratch.push(segment); else frontCageScratch.push(segment);
                }
            }
        }

        const feetY = drawY + minion.size.height / 2;
        ctx.translate(drawX, feetY);
        ctx.rotate(minion.rotation);

        if (minion.isSpawning) {
            ctx.save();
            ctx.shadowBlur = 10; ctx.lineCap = "round";
            for (const seg of backCageScratch) { ctx.strokeStyle = seg.color; ctx.lineWidth = seg.width; ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke(); }
            ctx.restore();
        }

        ctx.save();
        if (minion.isSpawning) {
            ctx.globalAlpha = spawnPct;
        } else if (minion.isDying) {
            const pct = minion.dissolveTimer / 0.5;
            ctx.globalAlpha = pct;
            ctx.translate(0, -minion.size.height / 2);
            ctx.scale(pct, pct);
            ctx.translate(0, minion.size.height / 2);
        }

        const profile = minion.getVisualProfile();
        const points = getShapePoints(profile.shapeFamily);
        const geom = profile.shapeFamily === "corrupted-box"
            ? Software3DRenderer.getCorruptedBoxGeometry(minion.id, profile.corruption, profile.phaseOffset + minion.size.width, profile.danger > 0.5 ? 1 : 0)
            : profile.shapeFamily === "saw"
              ? Software3DRenderer.getRadialGeometry(minion.id + "-saw", profile.spikeCount || 8, 0.62, profile.phaseOffset, 0.44)
              : Software3DRenderer.getPrismGeometry(minion.id + "-geom-" + profile.shapeFamily, points, 0.4 + profile.weight * 0.28);
        
        const yaw = 0.15 * minion.facingDirection + (minion.velocity.x / 450) * 0.35;
        const pitch = 0.08 + (minion.velocity.y / 1000) * 0.22;
        const pivotY = minion.squashPivot === "feet" ? "feet" : "center";
        const posY = pivotY === "feet" ? 0 : -minion.size.height / 2;
        const localY = minion.squashPivot === "feet" ? -minion.size.height / 2 : 0;

        let baseColor = minion.minionColor;
        if (minion.health.isFlashing()) baseColor = "hsl(0, 0%, 100%)";
        else if (minion.attackState === "TELEGRAPH") baseColor = "hsl(45, 100%, 50%)";

        const roll = profile.spinRate !== 0 ? nowTime * 0.001 * profile.spinRate : 0;
        Software3DRenderer.drawGeometry(ctx, geom, 0, posY, minion.size.width, minion.size.height, minion.visualScale.x, minion.visualScale.y, yaw, pitch, roll, baseColor, 1.0, pivotY);

        drawRoleGlyph(ctx, profile.shapeFamily, minion.facingDirection, localY, minion.size.width, minion.size.height);
        ctx.restore();

        if (minion.isSpawning) {
            ctx.save();
            ctx.shadowBlur = 10; ctx.lineCap = "round";
            for (const seg of frontCageScratch) { ctx.strokeStyle = seg.color; ctx.lineWidth = seg.width; ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke(); }
            ctx.restore();
        }
        ctx.restore();
    }
}
`,"src/core/visuals/ShapeRenderer.ts":`import { getColorHSL, ColorRole } from "../design/ColorRoles";

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
  | "organic-platform"
  | "triangle";

export interface VisualProfile {
  shapeFamily: ShapeFamily;
  danger: number;          // 0 round/safe, 1 spiked/lethal
  weight: number;          // 0 light, 1 massive
  corruption: number;      // 0 clean, 1 heavily deformed
  hueRole: ColorRole;
  patternId?: string;
  strokePx: number;
  spinRate: number;        // radians/sec
  wobbleAmp: number;       // pixels or normalized path deformation
  cornerRadius: number;    // 0 for perfect, larger for round
  spikeCount?: number;
  phaseOffset: number;
}

export function spikyRadius(theta: number, base: number, points: number, amp: number, sharpness = 3): number {
  const wave = Math.pow(Math.abs(Math.cos(theta * points * 0.5)), sharpness);
  return base * (1 + amp * wave);
}

export function organicRadius(theta: number, base: number, seed: number, contamination: number): number {
  return base * (
    1
    + 0.06 * Math.sin(theta * 2 + seed)
    + 0.04 * Math.sin(theta * 3.7 + seed * 1.9)
    + contamination * 0.10 * Math.sin(theta * 7 + seed * 0.6)
  );
}

export function corruptedBoxPoint(x: number, y: number, corruption: number, time: number, seed: number) {
  const shear = corruption * 0.16 * Math.sin(seed);
  const wobbleX = corruption * 3.0 * Math.sin(time * 4 + y * 0.08 + seed);
  const wobbleY = corruption * 2.0 * Math.cos(time * 3 + x * 0.07 + seed);
  return { x: x + y * shear + wobbleX, y: y + wobbleY };
}

export function drawVisualProfile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  profile: VisualProfile,
  time: number
) {
  ctx.save();
  ctx.translate(x, y);

  const angle = profile.phaseOffset + time * profile.spinRate;
  ctx.rotate(angle);

  const coreColor = getColorHSL(profile.hueRole, "core");
  const lightColor = getColorHSL(profile.hueRole, "light");
  ctx.fillStyle = coreColor;
  ctx.strokeStyle = lightColor;
  ctx.lineWidth = profile.strokePx;

  const halfW = width / 2;
  const halfH = height / 2;

  switch (profile.shapeFamily) {
    case "perfect-square": {
      ctx.beginPath();
      if (profile.cornerRadius > 0) {
        const r = Math.min(profile.cornerRadius, halfW, halfH);
        ctx.roundRect(-halfW, -halfH, width, height, r);
      } else {
        ctx.rect(-halfW, -halfH, width, height);
      }
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "corrupted-box": {
      ctx.beginPath();
      const segments = 10;
      const seed = profile.phaseOffset;
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const px = -halfW + width * t;
        const py = -halfH;
        points.push(corruptedBoxPoint(px, py, profile.corruption, time, seed));
      }
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const px = halfW;
        const py = -halfH + height * t;
        points.push(corruptedBoxPoint(px, py, profile.corruption, time, seed + 1));
      }
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const px = halfW - width * t;
        const py = halfH;
        points.push(corruptedBoxPoint(px, py, profile.corruption, time, seed + 2));
      }
      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        const px = -halfW;
        const py = halfH - height * t;
        points.push(corruptedBoxPoint(px, py, profile.corruption, time, seed + 3));
      }

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "hex": {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const theta = (i * Math.PI) / 3;
        const px = halfW * Math.cos(theta);
        const py = halfH * Math.sin(theta);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "diamond": {
      ctx.beginPath();
      ctx.moveTo(0, -halfH);
      ctx.lineTo(halfW, 0);
      ctx.lineTo(0, halfH);
      ctx.lineTo(-halfW, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "kite": {
      ctx.beginPath();
      ctx.moveTo(0, -halfH);
      ctx.lineTo(halfW, -halfH * 0.2);
      ctx.lineTo(0, halfH);
      ctx.lineTo(-halfW, -halfH * 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "needle": {
      ctx.beginPath();
      ctx.moveTo(0, -halfH);
      ctx.lineTo(halfW * 0.15, 0);
      ctx.lineTo(0, halfH);
      ctx.lineTo(-halfW * 0.15, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "saw": {
      ctx.beginPath();
      const spikes = profile.spikeCount || 8;
      const baseRadius = Math.min(halfW, halfH);
      const steps = 60;
      for (let i = 0; i < steps; i++) {
        const theta = (i * Math.PI * 2) / steps;
        const r = spikyRadius(theta, baseRadius, spikes, profile.wobbleAmp || 0.35, 3);
        const px = r * Math.cos(theta);
        const py = r * Math.sin(theta);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "orb": {
      ctx.beginPath();
      const radius = Math.min(halfW, halfH);
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "blister": {
      ctx.beginPath();
      const baseRadius = Math.min(halfW, halfH);
      const steps = 40;
      const seed = profile.phaseOffset;
      for (let i = 0; i < steps; i++) {
        const theta = (i * Math.PI * 2) / steps;
        const r = organicRadius(theta, baseRadius, seed + time * 2, profile.corruption || 0.5);
        const px = r * Math.cos(theta);
        const py = r * Math.sin(theta);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "cage": {
      ctx.beginPath();
      ctx.moveTo(-halfW, -halfH + 8);
      ctx.lineTo(-halfW, -halfH);
      ctx.lineTo(-halfW + 8, -halfH);

      ctx.moveTo(halfW - 8, -halfH);
      ctx.lineTo(halfW, -halfH);
      ctx.lineTo(halfW, -halfH + 8);

      ctx.moveTo(halfW, halfH - 8);
      ctx.lineTo(halfW, halfH);
      ctx.lineTo(halfW - 8, halfH);

      ctx.moveTo(-halfW + 8, halfH);
      ctx.lineTo(-halfW, halfH);
      ctx.lineTo(-halfW, halfH - 8);
      ctx.stroke();
      break;
    }

    case "organic-platform": {
      ctx.beginPath();
      const baseRadius = Math.min(halfW, halfH);
      const steps = 30;
      for (let i = 0; i < steps; i++) {
        const theta = (i * Math.PI * 2) / steps;
        const r = organicRadius(theta, baseRadius, profile.phaseOffset, profile.corruption || 0.4);
        const px = r * Math.cos(theta);
        const py = r * Math.sin(theta);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }

    case "triangle": {
      ctx.beginPath();
      ctx.moveTo(0, -halfH * 1.16);
      ctx.lineTo(halfW, halfH * 0.56);
      ctx.lineTo(-halfW, halfH * 0.56);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }
  }

  ctx.restore();
}
`,"src/core/visuals/Software3DRenderer.ts":`import { TrigLUT } from "../TrigLUT";

export interface Vector3D { x: number; y: number; z: number; }
export interface Face { indices: number[]; color: string; baseNormal: Vector3D; }
export interface Geometry { vertices: Vector3D[]; faces: Face[]; }

export class Software3DRenderer {
    private static readonly LIGHT_DIR = { x: 0.577, y: -0.577, z: 0.577 };
    private static geometryCache = new Map<string, Geometry>();

    public static readonly BOX_GEOMETRY: Geometry = {
        vertices: [
            { x: -0.5, y: -0.5, z: -0.5 }, { x: 0.5, y: -0.5, z: -0.5 },
            { x: 0.5, y: 0.5, z: -0.5 }, { x: -0.5, y: 0.5, z: -0.5 },
            { x: -0.5, y: -0.5, z: 0.5 }, { x: 0.5, y: -0.5, z: 0.5 },
            { x: 0.5, y: 0.5, z: 0.5 }, { x: -0.5, y: 0.5, z: 0.5 },
        ],
        faces: [
            { indices: [0, 1, 2, 3], color: "FRONT", baseNormal: { x: 0, y: 0, z: -1 } },
            { indices: [1, 5, 6, 2], color: "RIGHT", baseNormal: { x: 1, y: 0, z: 0 } },
            { indices: [5, 4, 7, 6], color: "BACK", baseNormal: { x: 0, y: 0, z: 1 } },
            { indices: [4, 0, 3, 7], color: "LEFT", baseNormal: { x: -1, y: 0, z: 0 } },
            { indices: [4, 5, 1, 0], color: "TOP", baseNormal: { x: 0, y: -1, z: 0 } },
            { indices: [3, 2, 6, 7], color: "BOTTOM", baseNormal: { x: 0, y: 1, z: 0 } },
        ]
    };

    public static getPrismGeometry(id: string, points: {x: number, y: number}[], depth: number): Geometry {
        if (this.geometryCache.has(id)) return this.geometryCache.get(id)!;
        const vertices: Vector3D[] = [];
        const faces: Face[] = [];
        const halfDepth = depth / 2;
        const n = points.length;

        points.forEach(p => vertices.push({ x: p.x, y: p.y, z: -halfDepth }));
        points.forEach(p => vertices.push({ x: p.x, y: p.y, z: halfDepth }));
        
        const frontIndices = Array.from({length: n}, (_, i) => i);
        const backIndices = Array.from({length: n}, (_, i) => i + n);
        
        faces.push({ indices: frontIndices, color: "FRONT", baseNormal: { x: 0, y: 0, z: -1 } });
        faces.push({ indices: [...backIndices].reverse(), color: "BACK", baseNormal: { x: 0, y: 0, z: 1 } });
        
        for (let i = 0; i < n; i++) {
            const next = (i + 1) % n;
            const dx = points[next].x - points[i].x;
            const dy = points[next].y - points[i].y;
            const angle = Math.atan2(dy, dx) + Math.PI / 2;
            faces.push({
                indices: [i, next, next + n, i + n],
                color: "SIDE",
                baseNormal: { x: Math.cos(angle), y: Math.sin(angle), z: 0 }
            });
        }
        const geom = { vertices, faces };
        this.geometryCache.set(id, geom);
        return geom;
    }

    public static getCorruptedBoxGeometry(id: string, corruption: number, seed: number, teeth = 0): Geometry {
        const cacheId = \`corrupt-box:\${id}:\${corruption.toFixed(2)}:\${seed.toFixed(2)}:\${teeth}\`;
        if (this.geometryCache.has(cacheId)) return this.geometryCache.get(cacheId)!;

        const points: {x: number, y: number}[] = [];
        const perSide = 4;
        const pushPoint = (x: number, y: number, idx: number) => {
            const wobbleX = Math.sin(seed + idx * 1.71) * 0.055 * corruption;
            const wobbleY = Math.cos(seed * 1.3 + idx * 1.17) * 0.055 * corruption;
            points.push({ x: x + wobbleX + y * 0.08 * corruption, y: y + wobbleY });
        };

        let idx = 0;
        for (let i = 0; i <= perSide; i++) pushPoint(-0.5 + i / perSide, -0.5, idx++);
        for (let i = 1; i <= perSide; i++) {
            const y = -0.5 + i / perSide;
            pushPoint(0.5 + (teeth > 0 && i % 2 === 1 ? 0.10 * corruption : 0), y, idx++);
        }
        for (let i = 1; i <= perSide; i++) pushPoint(0.5 - i / perSide, 0.5, idx++);
        for (let i = 1; i < perSide; i++) {
            const y = 0.5 - i / perSide;
            pushPoint(-0.5 - (teeth > 1 && i % 2 === 1 ? 0.08 * corruption : 0), y, idx++);
        }

        const geom = this.getPrismGeometry(cacheId, points, 0.55 + corruption * 0.22);
        this.geometryCache.set(cacheId, geom);
        return geom;
    }

    public static getRadialGeometry(id: string, sides: number, innerRatio: number, phase = 0, depth = 0.5): Geometry {
        const cacheId = \`radial:\${id}:\${sides}:\${innerRatio}:\${phase}:\${depth}\`;
        if (this.geometryCache.has(cacheId)) return this.geometryCache.get(cacheId)!;
        const points = Array.from({ length: sides * 2 }, (_, i) => {
            const r = i % 2 === 0 ? 0.5 : 0.5 * innerRatio;
            const theta = phase + (i * Math.PI) / sides;
            return { x: Math.cos(theta) * r, y: Math.sin(theta) * r };
        });
        const geom = this.getPrismGeometry(cacheId, points, depth);
        this.geometryCache.set(cacheId, geom);
        return geom;
    }

    public static getTransformedBossGeometry(_phase: number, _time: number): Geometry {
        const baseBox = [
            { x: -0.5, y: -0.5, z: -0.5 }, { x: 0.5, y: -0.5, z: -0.5 },
            { x: 0.5, y: 0.5, z: -0.5 }, { x: -0.5, y: 0.5, z: -0.5 },
            { x: -0.5, y: -0.5, z: 0.5 }, { x: 0.5, y: -0.5, z: 0.5 },
            { x: 0.5, y: 0.5, z: 0.5 }, { x: -0.5, y: 0.5, z: 0.5 },
        ];

        const vertices = baseBox.map((v) => ({ x: v.x, y: v.y, z: v.z * 0.9 }));

        return {
            vertices,
            faces: Software3DRenderer.BOX_GEOMETRY.faces
        };
    }

    public static drawGeometry(
        ctx: CanvasRenderingContext2D, geometry: Geometry, posX: number, posY: number,
        sizeW: number, sizeH: number, scaleX: number, scaleY: number,
        yaw: number, pitch: number, roll: number, baseHslColor: string,
        alpha: number = 1.0, pivotY: "center" | "feet" = "center",
        _bossStageIdx: number = -1
    ) {
        const projected: { x: number; y: number; z: number }[] = [];
        const hslMatch = baseHslColor.match(/hsl\\(\\s*([\\d.]+)\\s*,\\s*([\\d.]+)%\\s*,\\s*([\\d.]+)%\\s*\\)/);
        const h = hslMatch ? parseFloat(hslMatch[1]) : 142;
        const s = hslMatch ? parseFloat(hslMatch[2]) : 71;
        const l = hslMatch ? parseFloat(hslMatch[3]) : 58;
        
        const cosY = TrigLUT.cos(yaw), sinY = TrigLUT.sin(yaw);
        const cosP = TrigLUT.cos(pitch), sinP = TrigLUT.sin(pitch);
        const cosR = TrigLUT.cos(roll), sinR = TrigLUT.sin(roll);

        for (let i = 0; i < geometry.vertices.length; i++) {
            const v = geometry.vertices[i];
            const lx = v.x * sizeW * scaleX;
            const ly = pivotY === "feet" ? (v.y - 0.5) * sizeH * scaleY : v.y * sizeH * scaleY;
            const lz = v.z * ((sizeW + sizeH) / 2);
            
            const x1 = lx * cosY + lz * sinY;
            const y1 = ly;
            const z1 = -lx * sinY + lz * cosY;
            
            const x2 = x1;
            const y2 = y1 * cosP - z1 * sinP;
            const z2 = y1 * sinP + z1 * cosP;
            
            const x3 = x2 * cosR - y2 * sinR;
            const y3 = x2 * sinR + y2 * cosR;
            
            projected.push({ x: posX + x3, y: posY + y3, z: z2 });
        }

        const facesWithDepth = geometry.faces.map((face) => {
            let sumZ = 0;
            for (const idx of face.indices) sumZ += projected[idx].z;
            const avgZ = sumZ / face.indices.length;
            const n = face.baseNormal;
            
            const nx1 = n.x * cosY + n.z * sinY;
            const ny1 = n.y;
            const nz1 = -n.x * sinY + n.z * cosY;
            const nx2 = nx1;
            const ny2 = ny1 * cosP - nz1 * sinP;
            const nz2 = ny1 * sinP + nz1 * cosP;
            const nx3 = nx2 * cosR - ny2 * sinR;
            const ny3 = nx2 * sinR + ny2 * cosR;
            
            const dot = nx3 * this.LIGHT_DIR.x + ny3 * this.LIGHT_DIR.y + nz2 * this.LIGHT_DIR.z;
            const shadeFactor = 0.85 + dot * 0.3;
            return { face, avgZ, shadeFactor, nz3: nz2 };
        });

        facesWithDepth.sort((a, b) => b.avgZ - a.avgZ);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.lineJoin = "round";

        for (const item of facesWithDepth) {
            const face = item.face;
            const shadedLightness = Math.max(10, Math.min(100, l * item.shadeFactor));
            ctx.fillStyle = \`hsl(\${h}, \${s}%, \${shadedLightness}%)\`;
            const rimGlow = Math.pow(1.0 - Math.abs(item.nz3), 4.0);
            ctx.lineWidth = 1.5 + rimGlow * 1.8;
            ctx.strokeStyle = \`hsla(\${h}, \${s}%, \${Math.min(100, shadedLightness + rimGlow * 20)}%, \${0.35 + rimGlow * 0.35})\`;
            
            ctx.beginPath();
            const firstIdx = face.indices[0];
            ctx.moveTo(projected[firstIdx].x, projected[firstIdx].y);
            for (let i = 1; i < face.indices.length; i++) {
                const idx = face.indices[i];
                ctx.lineTo(projected[idx].x, projected[idx].y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            
        }
        ctx.restore();
    }
}
`,"src/entities/BaseEntity.ts":`import { IEntityComponent } from "./EntityComponent";
import { IEntity, IWorld, Vector2D, EntityStatus, ISpringVisuals } from "@/core/Interfaces";

export class BaseEntity implements IEntity, ISpringVisuals {
  public position: Vector2D = { x: 0, y: 0 };
  public previousPosition: Vector2D = { x: 0, y: 0 };
  public velocity: Vector2D = { x: 0, y: 0 };
  public size = { width: 50, height: 50 };
  public id: string;
  public isDead: boolean = false;
  public world: IWorld;

  public facingDirection: number = 1;

  public visualScale = { x: 1, y: 1 };
  public targetVisualScale = { x: 1, y: 1 };
  public squashPivot: "center" | "feet" = "center";

  public scaleVelocity = { x: 0, y: 0 };
  public springStiffness = 180;
  public springDamping = 12;

  public rotation = 0;
  public rotationVelocity = 0;
  public targetRotation = 0;
  public springStiffnessRot = 240;
  public springDampingRot = 16;

  public startDeathSequence?(): void;
  public registerDamageDealt?(): void;
  public recoilTimer?: number;
  public physics?: { isGrounded: boolean; gravity?: number };

  private components = new Map<string, IEntityComponent>();

  constructor(id: string, world: IWorld) {
    this.id = id;
    this.world = world;
  }

  public get status(): EntityStatus {
    return this.isDead ? EntityStatus.DEAD : EntityStatus.ACTIVE;
  }

  public addComponent<T extends IEntityComponent>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentClass: new (...args: any[]) => T,
    component: T,
    dependencies?: Record<string, unknown>
  ): T {
    component.setup(this, dependencies);
    const key = (componentClass as unknown as { componentId?: string }).componentId || componentClass.name;
    this.components.set(key, component);
    return component;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getComponent<T extends IEntityComponent>(componentClass: new (...args: any[]) => T): T | null {
    const key = (componentClass as unknown as { componentId?: string }).componentId || componentClass.name;
    const component = this.components.get(key);
    return (component as T) || null;
  }

    public applyKineticImpulse(vx: number, vy: number) {
    this.velocity.x += vx;
    this.velocity.y += vy;
  }

  public applyScaleImpulse(sx: number, sy: number) {
    this.scaleVelocity.x += sx;
    this.scaleVelocity.y += sy;
  }

  public applyAngularImpulse(rv: number) {
    this.rotationVelocity += rv;
  }

  public update(dt: number) {
    if (this.isDead) return;

    const dispX = this.visualScale.x - this.targetVisualScale.x;
    const dispY = this.visualScale.y - this.targetVisualScale.y;

    const forceX = -this.springStiffness * dispX - this.springDamping * this.scaleVelocity.x;
    const forceY = -this.springStiffness * dispY - this.springDamping * this.scaleVelocity.y;

    this.scaleVelocity.x += forceX * dt;
    this.scaleVelocity.y += forceY * dt;

    this.visualScale.x += this.scaleVelocity.x * dt;
    this.visualScale.y += this.scaleVelocity.y * dt;

    this.visualScale.x = Math.max(0.1, this.visualScale.x);
    this.visualScale.y = Math.max(0.1, this.visualScale.y);

    const dispRot = this.rotation - this.targetRotation;
    const forceRot = -this.springStiffnessRot * dispRot - this.springDampingRot * this.rotationVelocity;

    this.rotationVelocity += forceRot * dt;
    this.rotation += this.rotationVelocity * dt;

    for (const component of this.components.values()) {
      if (component.update) {
        component.update(dt);
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D, alpha?: number) {
    if (this.isDead) return;

    const alphaVal = alpha !== undefined ? alpha : 1.0;
    const drawX = this.previousPosition.x + (this.position.x - this.previousPosition.x) * alphaVal;
    const drawY = this.previousPosition.y + (this.position.y - this.previousPosition.y) * alphaVal;

    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";

    const vWidth = this.size.width * this.visualScale.x;
    const vHeight = this.size.height * this.visualScale.y;

    if (this.squashPivot === "feet") {
      const feetY = drawY + this.size.height / 2;
      ctx.translate(drawX, feetY);
      ctx.rotate(this.rotation);
      ctx.fillRect(-vWidth / 2, -vHeight, vWidth, vHeight);
    } else {
      ctx.translate(drawX, drawY);
      ctx.rotate(this.rotation);
      ctx.fillRect(-vWidth / 2, -vHeight / 2, vWidth, vHeight);
    }
    ctx.restore();
  }

  public teardown() {
    for (const component of this.components.values()) {
      if (component.teardown) {
        component.teardown();
      }
    }
    this.components.clear();
  }
}
`,"src/entities/BaseMinion.ts":`import { BaseEntity } from "./BaseEntity";
import { PhysicsComponent } from "@/entities/components/PhysicsComponent";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { IWorld, EntityStatus } from "@/core/Interfaces";
import { StateMachine } from "@/core/StateMachine";
import { IState } from "@/core/StateMachine";
import { HazardSystem } from "@/core/systems/HazardSystem";
import { setVec, zeroVec } from "@/core/VecUtils";
import { TrigLUT } from "@/core/TrigLUT";
import { VisualProfile } from "@/core/visuals/ShapeRenderer";

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

export abstract class BaseMinion extends BaseEntity {
  private unsubHurt!: () => void;
  public get minionType(): MinionType { return this.id.split("-")[1] as MinionType; }
  public getExtendedHitbox?(): {x: number, y: number, width: number, height: number} | null;

  public get status(): EntityStatus {
    if (this.isDead) return EntityStatus.DEAD;
    if (this.isDying) return EntityStatus.DYING;
    if (this.isSpawning) return EntityStatus.SPAWNING;
    return EntityStatus.ACTIVE;
  }

  public health!: HealthComponent;
  declare public physics: PhysicsComponent;
  public stateMachine: StateMachine;

  public patrolSpeed: number = 100;
  public stateTimer: number = 0;
  public recoilTimer: number = 0;

  public pointA: { x: number; y: number } = { x: 0, y: 0 };
  public pointB: { x: number; y: number } = { x: 0, y: 0 };
  public flyerTarget: "A" | "B" = "B";

  public shootTimer: number = 0;
  public attackState: "PATROL" | "TELEGRAPH" | "ATTACK" | "COOLDOWN" = "PATROL";
  public volleyCount: number = 0;
  public volleyTimer: number = 0;

  public isSpawning: boolean = true;
  public spawnTimer: number = 1.2;
  public isDying: boolean = false;
  public dissolveTimer: number = 0.5;
  protected exhaustTimer: number = 0;

  protected bodyColorValue: string = "#718096";
  protected cageColorValue: string = "hsla(142,80%,65%,";
  protected dissolveColorValue: string = "hsl(215,20%,65%)";
  protected canFallIntoHazards: boolean = true;

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, world);
    this.position = { ...startPos };
    this.previousPosition = { ...startPos };

    setVec(this.visualScale, 0.1, 0.1);
    setVec(this.targetVisualScale, 1.0, 1.0);
    setVec(this.scaleVelocity, 15.0, 15.0);

    this.physics = this.addComponent(PhysicsComponent, new PhysicsComponent());
    this.stateMachine = new StateMachine();

    this.world.events.publish("MINION_SPAWNING", undefined);

    this.unsubHurt = this.world.events.subscribe("MINION_HURT", ({ id, sourceX, sourceY, intensity }) => {
      if (id === this.id) {
        this.handleHurtReaction(sourceX, sourceY, intensity);
      }
    });
  }

  protected initState(state: IState) {
    this.stateMachine.changeState(state);
  }

  public abstract get minionColor(): string;
  public abstract getVisualProfile(): VisualProfile;

  public startDeathSequence() {
    this.world.events.publish("MINION_DISSOLVING", undefined);
    this.isDying = true;
    this.dissolveTimer = 0.5;
    zeroVec(this.velocity);

    this.world.events.publishSpark(this.position.x, this.position.y, 0, this.dissolveColorValue, true, 24);
    this.world.events.publishBlast(this.position.x, this.position.y, this.dissolveColorValue);
  }

  public update(dt: number) {
    if (this.isDead) return;

    if (this.isSpawning) {
      this.spawnTimer -= dt;
      zeroVec(this.velocity);

      if (TrigLUT.random() < 0.5) {
        const angle = TrigLUT.random() * Math.PI * 2;
        const dist = 40 + TrigLUT.random() * 30;
        this.world.events.publishSpark(
          this.position.x + TrigLUT.cos(angle) * dist,
          this.position.y + TrigLUT.sin(angle) * dist,
          angle + Math.PI,
          this.dissolveColorValue
        );
      }

      if (this.spawnTimer <= 0) {
        this.isSpawning = false;
      }
      super.update(dt);
      return;
    }

    if (this.isDying) {
      this.dissolveTimer -= dt;
      zeroVec(this.velocity);

      if (TrigLUT.random() < 0.6) {
        this.world.events.publishSpark(
          this.position.x + (TrigLUT.random() * this.size.width - this.size.width / 2),
          this.position.y + (TrigLUT.random() * this.size.height - this.size.height / 2),
          -Math.PI / 2 + (TrigLUT.random() * 0.4 - 0.2),
          this.dissolveColorValue
        );
      }

      if (this.dissolveTimer <= 0) {
        this.isDead = true;
      }
      super.update(dt);
      return;
    }

    this.stateTimer -= dt;
    this.shootTimer -= dt;

    if (this.recoilTimer > 0) {
      this.recoilTimer -= dt;
      const friction = 2.5;
      this.velocity.x += (0 - this.velocity.x) * friction * dt;
    } else {
      this.stateMachine.update(dt);
    }

    if (this.attackState === "TELEGRAPH" && !this.isDying) {
      this.targetRotation = 0;
      this.rotation = TrigLUT.sin(performance.now() * 0.055) * 0.25;
      this.rotationVelocity = 0;
    } else {
      this.updateNonTelegraphRotation();
    }

    this.exhaustTimer -= dt;
    if (this.exhaustTimer <= 0) {
      this.updateExhaust();
    }

    this.checkHazardContact();

    super.update(dt);
  }

  protected updateNonTelegraphRotation(): void {
    this.targetRotation = Math.sign(this.velocity.x) * 0.12;
    if (this.attackState === "PATROL" && !this.isDying && !this.isSpawning) {
      this.targetRotation += TrigLUT.sin(performance.now() * 0.008 + this.position.x) * 0.04;
    }
  }

  protected abstract updateExhaust(): void;

  protected emitExhaustSpark(angle: number, color: string, count: number = 1) {
    this.exhaustTimer = 0.08;
    this.world.events.publishSpark(
      this.position.x,
      this.position.y + this.size.height / 2,
      angle,
      color,
      false,
      count
    );
  }

  public fireSingleShotAtPlayer(player: { position: { x: number; y: number } }) {
    const dx = player.position.x - this.position.x;
    const dy = player.position.y - this.position.y;
    const mag = TrigLUT.fastSqrt(dx * dx + dy * dy);
    if (mag === 0) return;

    const dirX = dx / mag;
    const dirY = dy / mag;

    this.world.spawnProjectile(
      this.position.x + dirX * 30,
      this.position.y + dirY * 30,
      dirX,
      dirY,
      "boss",
      1,
      400,
      5.0,
      this.minionColor
    );
  }

  private checkHazardContact() {
    if (this.health.isInvincible() || this.isDead || this.isSpawning || this.isDying) return;

    const hit = HazardSystem.checkContact(this, this.world.physicsWorld);
    if (hit && !this.isDead) {
      if (this.canFallIntoHazards && !this.isDying) {
        this.physics.isGrounded = false;
      }
    }
  }

  public handleHurtReaction(sourceX: number, sourceY: number, intensity: number) {
    if (this.isDead || this.isDying || this.isSpawning) return;

    const dx = this.position.x - sourceX;
    const dy = this.position.y - sourceY;
    const dist = TrigLUT.fastSqrt(dx * dx + dy * dy);
    const dirX = dx !== 0 ? dx / dist : -this.facingDirection;

    this.velocity.x = dirX * 320 * intensity;
    this.velocity.y = Math.min(this.velocity.y, -340 * intensity);
    this.physics.isGrounded = false;

    setVec(this.visualScale, 1.0 - 0.2 * intensity, 1.0 + 0.4 * intensity);
    setVec(this.scaleVelocity, 10.0 * intensity, -20.0 * intensity);

    const rotImpulse = -Math.sign(dirX) * 18.0 * intensity;
    this.applyAngularImpulse(rotImpulse);

    this.recoilTimer = 0.35 * intensity;
  }

  public teardown() {
    if (this.unsubHurt) {
      this.unsubHurt();
    }
    super.teardown();
  }
}
`,"src/entities/Boss.ts":`import { BaseEntity } from "./BaseEntity";
import { PhysicsComponent } from "@/entities/components/PhysicsComponent";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { IWorld } from "@/core/Interfaces";
import { StateMachine } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { setVec, zeroVec } from "@/core/VecUtils";
import { GAUNTLET_STAGES } from "@/core/design/GauntletStages";
import { useSessionStore } from "@/store/useGameStore";
import { HazardSystem } from "@/core/systems/HazardSystem";
import {
  BossCooldownState,
  BossPatrolState,
  BossMeleeState,
  BossAttackState,
  BossTelegraphState,
  BossLungeState,
  BossDeadState,
} from "./BossStates";

export class Boss extends BaseEntity {
  private unsubHurt!: () => void;
  public health!: HealthComponent;
  declare public physics: PhysicsComponent;
  public stateMachine: StateMachine;
  public cooldownState!: BossCooldownState;
  public patrolState!: BossPatrolState;
  public meleeState!: BossMeleeState;
  public attackState!: BossAttackState;
  public telegraphState!: BossTelegraphState;
  public lungeState!: BossLungeState;
  public deadState!: BossDeadState;

  public patrolSpeed: number = UNITS.BOSS_PATROL_SPEED_BASE;
  public lungeSpeed: number = UNITS.BOSS_LUNGE_SPEED_BASE;

  public facingDirection: number = -1;
  public currentPhase: number = 1;

  public recentAttackIds: string[] = [];
  constructor(id: string, world: IWorld) {
    super(id, world);
    this.size = { width: 48, height: 48 };
    this.squashPivot = "feet";

    zeroVec(this.position);
    zeroVec(this.previousPosition);

    const stageIdx = useSessionStore.getState().currentStageIndex;
    const stage = GAUNTLET_STAGES[stageIdx] || GAUNTLET_STAGES[0];
    const maxHp = stage.midBossMaxHp;

    this.physics = this.addComponent(PhysicsComponent, new PhysicsComponent());
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: maxHp,
      invincibilityDuration: 0.25,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("BOSS_HURT", { amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });

    this.cooldownState = new BossCooldownState(this);
    this.patrolState = new BossPatrolState(this);
    this.meleeState = new BossMeleeState(this);
    this.attackState = new BossAttackState(this);
    this.telegraphState = new BossTelegraphState(this);
    this.lungeState = new BossLungeState(this);
    this.deadState = new BossDeadState(this);

    this.stateMachine = new StateMachine();
    this.stateMachine.changeState(this.cooldownState);

    this.unsubHurt = this.world.events.subscribe("BOSS_HURT", ({ sourceX, sourceY, intensity }) => {
      this.handleHurtReaction(sourceX, sourceY, intensity);
    });
  }

  public update(dt: number) {
    if (this.isDead) {
      if (!(this.stateMachine.getCurrentState() instanceof BossDeadState)) {
        this.stateMachine.changeState(this.deadState);
      }
      super.update(dt);
      return;
    }

    this.evaluatePhaseShifts();
    this.trackPlayer();

    if (this.physics.isGrounded) {
      this.targetRotation = Math.sign(this.velocity.x) * 0.1;
    } else {
      this.targetRotation = Math.sign(this.velocity.x) * Math.min(0.08, (Math.abs(this.velocity.x) / 1000) * 0.08);
    }

    this.stateMachine.update(dt);

    this.checkPlayerContact();
    this.checkHazardContact();

    super.update(dt);
  }

  public get activeStateName(): string {
    const active = this.stateMachine.getCurrentState();
    if (!active) return "UNKNOWN";
    return active.constructor.name.replace("Boss", "").replace("State", "").toUpperCase();
  }

  public fireSingleShotAtPlayer() {
    const player = this.world.player;
    if (!player || player.isDead) return;

    const dx = player.position.x - this.position.x;
    const dy = player.position.y - this.position.y;
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag === 0) return;

    const dirX = dx / mag;
    const dirY = dy / mag;

    this.world.spawnProjectile(
      this.position.x + dirX * 40,
      this.position.y + dirY * 40,
      dirX,
      dirY,
      "boss",
      1,
      250,
      10.0
    );
  }

  private evaluatePhaseShifts() {
    const hpRatio = this.health.currentHealth / this.health.maxHealth;

    if (hpRatio <= UNITS.BOSS_PHASE_3_HP_PCT && this.currentPhase < 3) {
      this.currentPhase = 3;
      this.patrolSpeed = UNITS.BOSS_PATROL_SPEED_BASE * 1.75;
      this.lungeSpeed = UNITS.BOSS_LUNGE_SPEED_BASE * 1.15;
    } else if (hpRatio <= UNITS.BOSS_PHASE_2_HP_PCT && this.currentPhase < 2) {
      this.currentPhase = 2;
      this.patrolSpeed = UNITS.BOSS_PATROL_SPEED_BASE * 1.3;
    }
  }

  private trackPlayer() {
    const player = this.world.player;
    const activeState = this.activeStateName;
    if (player && activeState !== "LUNGE") {
      const dirToPlayer = Math.sign(player.position.x - this.position.x);
      if (dirToPlayer !== 0) {
        this.facingDirection = dirToPlayer;
      }
    }
  }

  private checkPlayerContact() {
    const player = this.world.player;
    const activeState = this.activeStateName;
    if (!player || player.isDead) return;

    const playerHalfW = player.size.width / 2;
    const playerHalfH = player.size.height / 2;
    const bossHalfW = this.size.width / 2;
    const bossHalfH = this.size.height / 2;

    const isColliding =
      this.position.x + bossHalfW > player.position.x - playerHalfW &&
      this.position.x - bossHalfW < player.position.x + playerHalfW &&
      this.position.y + bossHalfH > player.position.y - playerHalfH &&
      this.position.y - bossHalfH < player.position.y + playerHalfH;

    if (isColliding) {
      const playerHealth = player.getComponent(HealthComponent);
      if (playerHealth) {
        const damageAmount = activeState === "LUNGE" || activeState === "MELEE" ? UNITS.BOSS_LUNGE_DAMAGE : UNITS.ENEMY_CONTACT_DAMAGE;
        const damaged = playerHealth.takeDamage(damageAmount);

        if (damaged) {
          const knockbackDir = Math.sign(player.position.x - this.position.x);
          player.velocity.x = (knockbackDir !== 0 ? knockbackDir : 1) * 500;
          player.velocity.y = -400;
        }
      }
    }
  }

  private checkHazardContact() {
    if (this.health.isInvincible() || this.isDead) return;

    const hit = HazardSystem.checkContact(this, this.world.physicsWorld);
    if (hit && !this.isDead) {
      this.physics.isGrounded = false;
    }
  }

  public handleHurtReaction(sourceX: number, sourceY: number, intensity: number) {
    if (this.isDead) return;

    const dx = this.position.x - sourceX;
    const dy = this.position.y - sourceY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const dirX = dx !== 0 ? dx / dist : -this.facingDirection;

    this.velocity.x = dirX * 240 * intensity;
    this.velocity.y = Math.min(this.velocity.y, -280 * intensity);
    this.physics.isGrounded = false;

    setVec(this.visualScale, 1.0 - 0.15 * intensity, 1.0 + 0.3 * intensity);
    setVec(this.scaleVelocity, 8.0 * intensity, -16.0 * intensity);

    const rotImpulse = -Math.sign(dirX) * 12.0 * intensity;
    this.applyAngularImpulse(rotImpulse);
  }

  public teardown() {
    if (this.unsubHurt) {
      this.unsubHurt();
    }
    super.teardown();
  }
}
`,"src/entities/BossAttackPatterns.ts":`import { Boss } from "./Boss";

export type AttackTag = "projectile-heavy" | "melee" | "arena-denial" | "reposition";

export interface BossAttackContext {
  phase: number;
  distanceToPlayer: number;
  playerIsAirborne: boolean;
  playerHP: number;
  activeMinionsCount: number;
  recentAttackIds: string[];
  }

export interface IBossAttackState {
  volleyCount: number;
  volleyTimer: number;
  durationTimer: number;
  getBoss(): Boss;
}

export interface AttackPattern {
  id: string;
  tags: AttackTag[];
  minPhase: 1 | 2 | 3;
  basePriority: number;
  score(ctx: BossAttackContext): number;
  configure(state: IBossAttackState): void;
}

// Stage 1 (Prime Wound) patterns
export class OmniBurstPattern implements AttackPattern {
  public id = "OMNI_BURST";
  public tags: AttackTag[] = ["projectile-heavy", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 40;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    let s = this.basePriority;
    if (ctx.distanceToPlayer < 250) s += 30;
    if (ctx.phase === 3) s += 15;
    return s;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.8;
  }
}

export class VolleyPattern implements AttackPattern {
  public id = "VOLLEY";
  public tags: AttackTag[] = ["projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 45;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    let s = this.basePriority;
    if (ctx.distanceToPlayer > 300) s += 25;
    if (ctx.phase === 1) s -= 10;
    return s;
  }

  public configure(state: IBossAttackState): void {
    const phase = state.getBoss().currentPhase;
    state.volleyCount = phase === 1 ? 3 : phase === 2 ? 6 : 10;
    state.volleyTimer = 0;
    state.durationTimer = phase === 1 ? 0.8 : phase === 2 ? 1.2 : 1.6;
  }
}

// Stage 2 (Scarlet Lock) patterns
export class GateDropPattern implements AttackPattern {
  public id = "GATE_DROP";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.phase * 10);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 3;
    state.volleyTimer = 0;
    state.durationTimer = 1.5;
  }
}

export class LockstepVolleyPattern implements AttackPattern {
  public id = "LOCKSTEP_VOLLEY";
  public tags: AttackTag[] = ["projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 40;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.distanceToPlayer > 200 ? 15 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 4;
    state.volleyTimer = 0;
    state.durationTimer = 1.4;
  }
}

// Stage 3 (Carminal Orbit) patterns
export class AphelionRingPattern implements AttackPattern {
  public id = "APHELION_RING";
  public tags: AttackTag[] = ["projectile-heavy", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 55;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.2;
  }
}

export class PerihelionDivePattern implements AttackPattern {
  public id = "PERIHELION_DIVE";
  public tags: AttackTag[] = ["melee", "reposition"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 60;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.playerIsAirborne ? 20 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

// Stage 4 (Vermilion Needle) patterns
export class NeedleRainPattern implements AttackPattern {
  public id = "NEEDLE_RAIN";
  public tags: AttackTag[] = ["projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 5;
    state.volleyTimer = 0;
    state.durationTimer = 1.5;
  }
}

export class DashThreadPattern implements AttackPattern {
  public id = "DASH_THREAD";
  public tags: AttackTag[] = ["melee", "reposition"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 55;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.9;
  }
}

// Stage 5 (Marrow King) patterns
export class BellyTidePattern implements AttackPattern {
  public id = "BELLY_TIDE";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (!ctx.playerIsAirborne ? 20 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class BlisterSpawnPattern implements AttackPattern {
  public id = "BLISTER_SPAWN";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 45;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.activeMinionsCount < 2 ? 25 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.6;
  }
}

// Stage 6 (Rust Cathedral) patterns
export class CathedralTollPattern implements AttackPattern {
  public id = "CATHEDRAL_TOLL";
  public tags: AttackTag[] = ["arena-denial", "projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 60;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.5;
  }
}

export class FallingNavePattern implements AttackPattern {
  public id = "FALLING_NAVE";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority + (ctx.distanceToPlayer < 200 ? 15 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 4;
    state.volleyTimer = 0;
    state.durationTimer = 1.8;
  }
}

// Base helper patterns
export class FanBurstPattern implements AttackPattern {
  public id = "FAN_BURST";
  public tags: AttackTag[] = ["projectile-heavy", "reposition"];
  public minPhase: 1 | 2 | 3 = 2;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    if (ctx.phase < this.minPhase) return 0;
    let s = this.basePriority;
    if (ctx.playerIsAirborne) s += 35;
    return s;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.7;
  }
}

export class PredictiveShotPattern implements AttackPattern {
  public id = "PREDICTIVE_SHOT";
  public tags: AttackTag[] = ["projectile-heavy"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 30;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    let s = this.basePriority;
    if (ctx.distanceToPlayer > 200) s += 20;
    return s;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 0.6;
  }
}

export class GapRingPattern implements AttackPattern {
  public id = "GAP_RING";
  public tags: AttackTag[] = ["projectile-heavy", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 3;
  public basePriority = 70;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    if (ctx.phase < this.minPhase) return 0;
    return this.basePriority + (ctx.playerHP <= 2 ? 20 : 0);
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class CompressionMarchPattern implements AttackPattern {
  public id = "COMPRESSION_MARCH";
  public tags: AttackTag[] = ["arena-denial", "reposition"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.2;
  }
}

export class SatelliteTaxPattern implements AttackPattern {
  public id = "SATELLITE_TAX";
  public tags: AttackTag[] = ["projectile-heavy", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 55;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class PogoTaxPattern implements AttackPattern {
  public id = "POGO_TAX";
  public tags: AttackTag[] = ["arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 55;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class SicknessLeanPattern implements AttackPattern {
  public id = "SICKNESS_LEAN";
  public tags: AttackTag[] = ["arena-denial", "reposition"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 50;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.0;
  }
}

export class WeightTransferPattern implements AttackPattern {
  public id = "WEIGHT_TRANSFER";
  public tags: AttackTag[] = ["melee", "arena-denial"];
  public minPhase: 1 | 2 | 3 = 1;
  public basePriority = 60;

  public score(ctx: BossAttackContext): number {
    if (ctx.recentAttackIds.includes(this.id)) return 0;
    return this.basePriority;
  }

  public configure(state: IBossAttackState): void {
    state.volleyCount = 0;
    state.volleyTimer = 0;
    state.durationTimer = 1.5;
  }
}

export const ALL_PATTERNS: AttackPattern[] = [
  new CompressionMarchPattern(),
  new SatelliteTaxPattern(),
  new PogoTaxPattern(),
  new SicknessLeanPattern(),
  new WeightTransferPattern(),

  new OmniBurstPattern(),
  new VolleyPattern(),
  new GateDropPattern(),
  new LockstepVolleyPattern(),
  new AphelionRingPattern(),
  new PerihelionDivePattern(),
  new NeedleRainPattern(),
  new DashThreadPattern(),
  new BellyTidePattern(),
  new BlisterSpawnPattern(),
  new CathedralTollPattern(),
  new FallingNavePattern(),
  new FanBurstPattern(),
  new PredictiveShotPattern(),
  new GapRingPattern()
];

export function selectBestAttack(ctx: BossAttackContext): AttackPattern {
  // Allow our unified single boss to access all attack patterns
  const candidates = ALL_PATTERNS;

  let bestPattern = candidates[0] || ALL_PATTERNS[0];
  let highestScore = -1;

  for (const p of candidates) {
    const score = p.score(ctx);
    if (score > highestScore) {
      highestScore = score;
      bestPattern = p;
    }
  }

  return bestPattern;
}
`,"src/entities/BossStates.ts":`import { TrigLUT } from "@/core/TrigLUT";
import { IState } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { Boss } from "./Boss";
import { Player } from "./Player";
import { PhysicsComponent } from "@/entities/components/PhysicsComponent";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { setVec } from "@/core/VecUtils";
import { selectBestAttack, BossAttackContext, IBossAttackState } from "./BossAttackPatterns";
import { useSessionStore, useGameplayStore } from "@/store/useGameStore";
import { GAUNTLET_STAGES } from "@/core/design/GauntletStages";
import { MinionFactory } from "./MinionFactory";

export abstract class BossState implements IState {
  protected owner: Boss;

  constructor(owner: Boss) {
    this.owner = owner;
  }

  public abstract enter(): void;
  public abstract update(dt: number): void;
  public abstract exit(): void;
}

export class BossCooldownState extends BossState {
  private duration: number = 2.0;
  private overrideDuration: number = -1;

  constructor(owner: Boss) {
    super(owner);
  }

  public setDuration(customDuration: number) {
    this.overrideDuration = customDuration;
  }

  public enter(): void {
    this.owner.velocity.x = 0;
    if (this.overrideDuration > 0) {
      this.duration = this.overrideDuration;
      this.overrideDuration = -1;
    } else {
      this.duration = this.owner.currentPhase === 3 ? 1.0 : 1.8;
    }
    setVec(this.owner.targetVisualScale, 1.0, 1.0);
  }

  public update(dt: number): void {
    this.duration -= dt;
    this.owner.velocity.x += (0 - this.owner.velocity.x) * UNITS.BOSS_DECEL * dt;
    if (this.duration <= 0) {
      this.owner.stateMachine.changeState(this.owner.patrolState);
    }
  }

  public exit(): void {}
}

export class BossPatrolState extends BossState {
  private duration: number = 2.0;

  public enter(): void {
    setVec(this.owner.targetVisualScale, 1.0, 1.0);
    this.duration = this.owner.currentPhase === 3 ? 0.8 : 1.8;
  }

  public update(dt: number): void {
    this.duration -= dt;
    const physics = this.owner.getComponent(PhysicsComponent);

    const targetSpeed = this.owner.facingDirection * this.owner.patrolSpeed;
    this.owner.velocity.x += (targetSpeed - this.owner.velocity.x) * UNITS.BOSS_ACCEL * dt;

    if (physics) {
      if (physics.isOnWallLeft) {
        this.owner.facingDirection = 1;
      } else if (physics.isOnWallRight) {
        this.owner.facingDirection = -1;
      }
    }

    const player = this.owner.world.player;
    if (player && !player.isDead) {
      const distance = Math.abs(player.position.x - this.owner.position.x);
      const distanceY = Math.abs(player.position.y - this.owner.position.y);
      if (distance < 130 && distanceY < 60) {
        this.owner.stateMachine.changeState(this.owner.telegraphState);
        return;
      }
    }

    if (this.duration <= 0) {
      this.owner.stateMachine.changeState(this.owner.attackState);
    }
  }

  public exit(): void {
    this.owner.velocity.x = 0;
  }
}

export class BossMeleeState extends BossState {
  private duration: number = 0.5;

  public enter(): void {
    this.owner.velocity.x = 0;
    this.duration = 0.5;
    this.owner.world.events.publish("BOSS_SWIPED", undefined);
  }

  public update(dt: number): void {
    this.duration -= dt;
    if (this.duration <= 0) {
      this.owner.cooldownState.setDuration(1.0);
      this.owner.stateMachine.changeState(this.owner.cooldownState);
    }
  }

  public exit(): void {}
}

export class BossAttackState extends BossState implements IBossAttackState {
  public attackType: string = "SINGLE_SHOT";
  public durationTimer: number = 0;
  public volleyCount: number = 0;
  public volleyTimer: number = 0;

  constructor(owner: Boss) {
    super(owner);
  }

  public getBoss(): Boss {
    return this.owner;
  }

  public enter(): void {
    this.owner.velocity.x = 0;
    const player = this.owner.world.player as Player;
    if (!player || player.isDead) {
      this.owner.stateMachine.changeState(this.owner.cooldownState);
      return;
    }

    const playerHealth = player.getComponent(HealthComponent);
    const playerHp = playerHealth ? playerHealth.currentHealth : 5;

    const ctx: BossAttackContext = {
      phase: this.owner.currentPhase,
      distanceToPlayer: Math.abs(player.position.x - this.owner.position.x),
      playerIsAirborne: !player.physics.isGrounded,
      playerHP: playerHp,
      activeMinionsCount: this.owner.world.minions.length,
      recentAttackIds: [...this.owner.recentAttackIds],
      };

    const pattern = selectBestAttack(ctx);

    this.owner.recentAttackIds.push(pattern.id);
    if (this.owner.recentAttackIds.length > 3) {
      this.owner.recentAttackIds.shift();
    }

    this.attackType = pattern.id;
    pattern.configure(this);

    this.executeImmediateFire();
  }

  private executeImmediateFire() {
    switch (this.attackType) {
      case "OMNI_BURST":
        this.fireOmniBurst();
        break;
      case "FAN_BURST":
        this.fireFanBurst();
        break;
      case "PREDICTIVE_SHOT":
        this.firePredictiveShot();
        break;
      case "GAP_RING":
        this.fireGapRing();
        break;
      case "APHELION_RING":
        this.fireAphelionRing();
        break;
      case "PERIHELION_DIVE":
        this.firePerihelionDive();
        break;
      case "DASH_THREAD":
        this.fireDashThread();
        break;
      case "BELLY_TIDE":
        this.fireBellyTide();
        break;
      case "BLISTER_SPAWN":
        this.fireBlisterSpawn();
        break;
      case "CATHEDRAL_TOLL":
        this.fireCathedralToll();
        break;
      case "COMPRESSION_MARCH":
        this.fireCompressionMarch();
        break;
      case "SATELLITE_TAX":
        this.fireSatelliteTax();
        break;
      case "POGO_TAX":
        this.firePogoTax();
        break;
      case "SICKNESS_LEAN":
        this.fireSicknessLean();
        break;
      case "WEIGHT_TRANSFER":
        this.fireWeightTransfer();
        break;
    }
  }

  public update(dt: number): void {
    this.durationTimer -= dt;

    const player = this.owner.world.player;
    if (!player || player.isDead) return;

    if (this.volleyCount > 0) {
      this.volleyTimer -= dt;
      if (this.volleyTimer <= 0) {
        this.executeVolleyStep();
        this.volleyCount--;
        this.volleyTimer = this.getVolleyInterval();
      }
    }

    if (this.durationTimer <= 0) {
      let cooldown = 1.0;
      if (this.attackType === "VOLLEY" || this.attackType === "LOCKSTEP_VOLLEY") cooldown = 1.6;
      else if (["OMNI_BURST", "APHELION_RING", "GAP_RING", "CATHEDRAL_TOLL"].includes(this.attackType)) cooldown = 2.2;

      this.owner.cooldownState.setDuration(cooldown);
      this.owner.stateMachine.changeState(this.owner.cooldownState);
    }
  }

  private getVolleyInterval(): number {
    const phase = this.owner.currentPhase;
    switch (this.attackType) {
      case "VOLLEY":
        return phase === 3 ? 0.08 : 0.12;
      case "LOCKSTEP_VOLLEY":
        return 0.25;
      case "GATE_DROP":
        return 0.3;
      case "NEEDLE_RAIN":
        return 0.14;
      case "FALLING_NAVE":
        return 0.35;
      default:
        return 0.15;
    }
  }

  private executeVolleyStep() {
    const player = this.owner.world.player;
    if (!player || player.isDead) return;

    const phase = this.owner.currentPhase;

    if (this.attackType === "VOLLEY") {
      this.owner.fireSingleShotAtPlayer();
    } else if (this.attackType === "LOCKSTEP_VOLLEY") {
      // Fire modulo repeating lane projectiles with segmented-spine trails
      const laneCount = 5;
      const stepWidth = 140;
      const originX = 220;
      const activeLane = (this.volleyCount + phase) % laneCount;
      const targetX = originX + activeLane * stepWidth;

      this.owner.world.spawnProjectile(
        targetX,
        80,
        0,
        1,
        "boss",
        1,
        420,
        3.0,
        "hsl(4, 88%, 54%)",
        "segmented-spine"
      );
      this.owner.world.audio.playSelectTick();
    } else if (this.attackType === "GATE_DROP") {
      // Gate Drop warning line spawning red vertical bars
      const targetX = player.position.x + (TrigLUT.randomGameplay() * 120 - 60);
      this.owner.world.events.publishSpark(targetX, 80, Math.PI/2, "hsl(4, 100%, 72%)", false, 8, "line");

      // Spawn column of hazard-like needles
      for (let yOffset = 80; yOffset < 900; yOffset += 96) {
        this.owner.world.spawnProjectile(
          targetX,
          yOffset,
          0,
          1,
          "boss",
          1,
          500,
          2.0,
          "hsl(4, 88%, 54%)",
          "needle"
        );
      }
      this.owner.world.audio.playErrorTick();
    } else if (this.attackType === "NEEDLE_RAIN") {
      // Fast, narrow descending needles
      const offset = (this.volleyCount * 140) % 600;
      const targetX = 200 + offset;
      this.owner.world.spawnProjectile(
        targetX,
        80,
        0,
        1,
        "boss",
        1,
        640,
        2.5,
        "hsl(356, 94%, 62%)",
        "needle"
      );
    } else if (this.attackType === "FALLING_NAVE") {
      // Heavy blocks descending from the ceiling
      const targetX = player.position.x;
      this.owner.world.events.publishSpark(targetX, 40, Math.PI/2, "hsl(45, 100%, 60%)", true, 16);
      
      const proj = this.owner.world.spawnProjectile(
        targetX,
        40,
        0,
        1,
        "boss",
        2,
        350,
        3.0,
        "hsl(15, 82%, 48%)",
        "heavy-block"
      );
      proj.size = { width: 44, height: 44 };
    }
  }

  private fireOmniBurst() {
    const phase = this.owner.currentPhase;
    const projectileCount = phase === 1 ? 12 : phase === 2 ? 18 : 24;
    const angleStep = (Math.PI * 2) / projectileCount;
    const stageIdx = useSessionStore.getState().currentStageIndex;

    for (let i = 0; i < projectileCount; i++) {
      const angle = i * angleStep;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);
      const color = stageIdx === 4 ? "hsl(82, 38%, 44%)" : undefined;

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        280,
        4.0,
        color,
        "needle"
      );
    }
  }

  private fireFanBurst() {
    const player = this.owner.world.player;
    if (!player) return;

    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const centerAngle = TrigLUT.atan2(dy, dx);

    const phase = this.owner.currentPhase;
    const count = phase === 2 ? 7 : 12;
    const totalSpread = (phase === 2 ? 55 : 80) * (Math.PI / 180);
    const startAngle = centerAngle - totalSpread / 2;
    const step = totalSpread / (count - 1);
    const stageIdx = useSessionStore.getState().currentStageIndex;

    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * step;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);
      const color = stageIdx === 2 ? "hsl(338, 76%, 55%)" : undefined;

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        300,
        5.0,
        color,
        "needle"
      );
    }
  }

  private firePredictiveShot() {
    const player = this.owner.world.player;
    if (!player) return;

    const leadTime = 0.35;
    const predX = player.position.x + player.velocity.x * leadTime;
    const predY = player.position.y + player.velocity.y * leadTime;

    const dx = predX - this.owner.position.x;
    const dy = predY - this.owner.position.y;
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag === 0) return;

    const dirX = dx / mag;
    const dirY = dy / mag;
    const stageIdx = useSessionStore.getState().currentStageIndex;
    const color = stageIdx === 3 ? "hsl(356, 94%, 62%)" : undefined;

    const proj = this.owner.world.spawnProjectile(
      this.owner.position.x + dirX * 45,
      this.owner.position.y + dirY * 45,
      dirX,
      dirY,
      "boss",
      2,
      450,
      6.0,
      color,
      "needle"
    );
    proj.size = { width: 17.6, height: 17.6 };
  }

  private fireGapRing() {
    const player = this.owner.world.player;
    if (!player) return;

    const leadTime = 0.3;
    const predX = player.position.x + player.velocity.x * leadTime;
    const predY = player.position.y + player.velocity.y * leadTime;

    const dx = predX - this.owner.position.x;
    const dy = predY - this.owner.position.y;
    const targetAngle = TrigLUT.atan2(dy, dx);

    const projCount = 18;
    const angleStep = (Math.PI * 2) / projCount;

    for (let i = 0; i < projCount; i++) {
      const angle = i * angleStep;
      let diff = Math.abs(angle - targetAngle) % (Math.PI * 2);
      if (diff > Math.PI) diff = Math.PI * 2 - diff;

      if (diff < 0.22) {
        continue;
      }

      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        280,
        4.0,
        undefined,
        "needle"
      );
    }
  }

  private fireAphelionRing() {
    const player = this.owner.world.player;
    if (!player) return;

    // Expanding ring leaving precisely one angular gap centered roughly on the player
    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const targetAngle = TrigLUT.atan2(dy, dx);

    const projCount = 20;
    const angleStep = (Math.PI * 2) / projCount;
    const gapWidth = 0.45;

    for (let i = 0; i < projCount; i++) {
      const angle = i * angleStep;
      let diff = Math.abs(angle - targetAngle) % (Math.PI * 2);
      if (diff > Math.PI) diff = Math.PI * 2 - diff;

      if (diff < gapWidth) continue;

      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);

      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 40,
        this.owner.position.y + dirY * 40,
        dirX,
        dirY,
        "boss",
        1,
        220,
        5.0,
        "hsl(338, 76%, 55%)",
        "needle"
      );
    }
    this.owner.world.audio.playBossTelegraph();
  }

  private firePerihelionDive() {
    const player = this.owner.world.player;
    if (!player) return;

    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      this.owner.velocity.x = (dx / dist) * this.owner.lungeSpeed * 0.95;
      this.owner.velocity.y = (dy / dist) * this.owner.lungeSpeed * 0.5;
      this.owner.physics.isGrounded = false;
      this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 10, duration: 0.2 });
    }
  }

  private fireDashThread() {
    const player = this.owner.world.player;
    if (!player) return;

    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      const dirX = dx / dist;
      const dirY = dy / dist;

      this.owner.world.events.publishSpark(
        this.owner.position.x,
        this.owner.position.y,
        TrigLUT.atan2(dirY, dirX),
        "hsl(356, 94%, 62%)",
        false,
        20,
        "line"
      );

      this.owner.velocity.x = dirX * this.owner.lungeSpeed * 1.1;
      this.owner.velocity.y = dirY * this.owner.lungeSpeed * 0.45;
      this.owner.physics.isGrounded = false;
    }
  }

  private fireBellyTide() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 12, duration: 0.3 });
    this.owner.applyScaleImpulse(-0.3, 0.3);

    this.owner.world.spawnProjectile(
      this.owner.position.x - 40,
      this.owner.position.y + 12,
      -1,
      0,
      "boss",
      1,
      300,
      3.0,
      "hsl(82, 38%, 44%)",
      "swirl"
    );

    this.owner.world.spawnProjectile(
      this.owner.position.x + 40,
      this.owner.position.y + 12,
      1,
      0,
      "boss",
      1,
      300,
      3.0,
      "hsl(82, 38%, 44%)",
      "swirl"
    );
    this.owner.world.audio.playBossSwipe();
  }

  private fireBlisterSpawn() {
    const player = this.owner.world.player;
    if (!player) return;

    const spawnX = this.owner.position.x + (player.position.x > this.owner.position.x ? -120 : 120);
    const mId = \`cyst-spawn-\${Date.now()}\`;
    
    const type = TrigLUT.randomGameplay() < 0.5 ? "CLAMPJAW" : "PIT_LANCER";
    const cyst = MinionFactory.createMinion(type, mId, { x: spawnX, y: this.owner.position.y }, this.owner.world);
    this.owner.world.minions.push(cyst);
    
    this.owner.world.events.publishBlast(spawnX, this.owner.position.y, "hsl(82, 38%, 44%)");
  }

  private fireCompressionMarch() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 6, duration: 0.3 });
    this.owner.velocity.x = this.owner.facingDirection * 150;
    for (let y = 300; y <= 800; y += 150) {
      this.owner.world.spawnProjectile(
        40, y, 1, 0, "boss", 1, 350, 2.5, "hsl(4, 88%, 54%)", "needle"
      );
      this.owner.world.spawnProjectile(
        960, y, -1, 0, "boss", 1, 350, 2.5, "hsl(4, 88%, 54%)", "needle"
      );
    }
    this.owner.world.audio.playBossSwipe();
  }

  private fireSatelliteTax() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 4, duration: 0.2 });
    const projectileCount = 6;
    const angleStep = (Math.PI * 2) / projectileCount;
    for (let i = 0; i < projectileCount; i++) {
      const angle = i * angleStep;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);
      this.owner.world.spawnProjectile(
        this.owner.position.x + dirX * 50,
        this.owner.position.y + dirY * 50,
        dirX,
        dirY,
        "boss",
        1,
        320,
        4.0,
        "hsl(338, 76%, 55%)",
        "homing"
      );
    }
    this.owner.world.audio.playBossTelegraph();
  }

  private firePogoTax() {
    const stage = GAUNTLET_STAGES[3];
    const pogoX = stage.pogoPosts && stage.pogoPosts[0] ? stage.pogoPosts[0].x + stage.pogoPosts[0].width / 2 : 500;
    this.owner.world.events.publishSpark(pogoX, 80, Math.PI / 2, "hsl(356, 94%, 62%)", true, 12);
    for (let i = -2; i <= 2; i++) {
      this.owner.world.spawnProjectile(
        pogoX + i * 30,
        80,
        0,
        1,
        "boss",
        1,
        600,
        2.5,
        "hsl(356, 94%, 62%)",
        "needle"
      );
    }
    this.owner.world.audio.playErrorTick();
  }

  private fireSicknessLean() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 10, duration: 0.45 });
    this.owner.world.events.publish("STATE_PROJECTED", {
      playerHP: useGameplayStore.getState().playerHP,
      bossHP: this.owner.health.currentHealth,
      healingCharges: this.owner.world.player ? (this.owner.world.player as Player).healingCharges : 0,
      determination: this.owner.world.player ? (this.owner.world.player as Player).determinationCounter : 0
    });
    useGameplayStore.getState().triggerGlitch(250);
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count;
      const dirX = TrigLUT.cos(angle);
      const dirY = TrigLUT.sin(angle);
      this.owner.world.spawnProjectile(
        this.owner.position.x,
        this.owner.position.y,
        dirX,
        dirY,
        "boss",
        1,
        260,
        3.0,
        "hsl(82, 38%, 44%)",
        "swirl"
      );
    }
    this.owner.world.audio.playBossPhaseShift();
  }

  private fireWeightTransfer() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 12, duration: 0.4 });
    this.owner.velocity.y = -650;
    this.owner.physics.isGrounded = false;
    
    setTimeout(() => {
      if (this.owner && !this.owner.isDead) {
        this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 20, duration: 0.4 });
        this.owner.world.events.publishSpark(this.owner.position.x, 900, 0, "hsl(15, 82%, 48%)", true, 20, "line");
        this.owner.world.events.publishBlast(this.owner.position.x, 900, "hsl(15, 82%, 48%)");
        
        if (this.owner.world.player) {
          const playerPhys = this.owner.world.player.getComponent(PhysicsComponent);
          if (playerPhys) {
            playerPhys.disablePlatformCollisionTimer = 1.5;
          }
        }
      }
    }, 600);
    this.owner.world.audio.playBossSwipe();
  }

  private fireCathedralToll() {
    this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 15, duration: 0.4 });
    const rings = 2;
    for (let i = 0; i < rings; i++) {
      const delay = i * 0.25;
      setTimeout(() => {
        if (this.owner && !this.owner.isDead) {
          this.owner.world.events.publishBlast(this.owner.position.x, this.owner.position.y, "hsl(15, 82%, 48%)");
          this.owner.fireSingleShotAtPlayer();
        }
      }, delay * 1000);
    }
  }

  public exit(): void {}
}

export class BossTelegraphState extends BossState {
  private duration: number = 0.8;

  public enter(): void {
    this.owner.velocity.x = 0;
    this.duration = this.owner.currentPhase === 3 ? 0.3 : 0.55;
    setVec(this.owner.visualScale, 1.25, 0.75);
    setVec(this.owner.targetVisualScale, 1.15, 0.85);
    this.owner.world.events.publish("BOSS_TELEGRAPH", undefined);
  }

  public update(dt: number): void {
    this.duration -= dt;
    if (this.duration <= 0) {
      this.owner.stateMachine.changeState(this.owner.lungeState);
    }
  }

  public exit(): void {
    const player = this.owner.world.player;
    if (player) {
      const dir = Math.sign(player.position.x - this.owner.position.x);
      this.owner.facingDirection = dir !== 0 ? dir : this.owner.facingDirection;
    }
  }
}

export class BossLungeState extends BossState {
  private duration: number = 0.5;

  public enter(): void {
    this.duration = 0.5;
    setVec(this.owner.visualScale, 1.35, 0.65);
    setVec(this.owner.targetVisualScale, 1.2, 0.8);
    this.owner.world.events.publish("BOSS_LUNGED", undefined);
  }

  public update(dt: number): void {
    this.duration -= dt;
    const targetSpeed = this.owner.facingDirection * this.owner.lungeSpeed;
    this.owner.velocity.x += (targetSpeed - this.owner.velocity.x) * UNITS.BOSS_ACCEL * dt;

    const physics = this.owner.getComponent(PhysicsComponent);
    const hitWall = physics ? physics.isOnWallLeft || physics.isOnWallRight : false;

    if (this.duration <= 0 || hitWall) {
      this.owner.stateMachine.changeState(this.owner.cooldownState);
    }
  }

  public exit(): void {
    const physics = this.owner.getComponent(PhysicsComponent);
    const hitWall = physics ? physics.isOnWallLeft || physics.isOnWallRight : false;

    if (hitWall && physics) {
      this.owner.velocity.x = -this.owner.facingDirection * UNITS.BOSS_WALL_REBOUND_VELOCITY;
      setVec(this.owner.visualScale, 0.7, 1.3);
      setVec(this.owner.targetVisualScale, 1.0, 1.0);
      this.owner.rotationVelocity = -this.owner.facingDirection * 28;

      const impactSide = physics.isOnWallLeft ? -1 : 1;
      const wallX = this.owner.position.x + impactSide * (this.owner.size.width / 2);
      this.owner.world.events.publishSpark(wallX, this.owner.position.y, impactSide > 0 ? Math.PI : 0, "hsl(350, 80%, 60%)", true, 15);
      this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 16, duration: 0.3 });
    } else {
      this.owner.velocity.x = 0;
      setVec(this.owner.visualScale, 0.8, 1.2);
      setVec(this.owner.targetVisualScale, 1.0, 1.0);
      this.owner.rotationVelocity = -this.owner.facingDirection * 15;
    }
  }
}

export class BossDeadState extends BossState {
  public enter(): void {
    this.owner.velocity.x = 0;
    this.owner.velocity.y = 0;
  }

  public update(_dt: number): void {}
  public exit(): void {}
}
`,"src/entities/EntityComponent.ts":`import { BaseEntity } from "./BaseEntity";

export interface IEntityComponent {
  setup(owner: BaseEntity, dependencies?: Record<string, unknown>): void;
  update?(dt: number): void;
  teardown?(): void;
}
`,"src/entities/FlyerMinion.ts":`import { BaseMinion } from "./BaseMinion";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { IWorld } from "@/core/Interfaces";
import { FlyerPatrolState } from "./MinionStates";
import { setVec } from "@/core/VecUtils";
import { VisualProfile } from "@/core/visuals/ShapeRenderer";

export class FlyerMinion extends BaseMinion {
  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 28.8, height: 28.8 };
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 3,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.physics.gravity = 0;

    this.pointA = { ...startPos };
    setVec(this.pointB, startPos.x, startPos.y - 180);
    this.squashPivot = "center";
    this.bodyColorValue = "hsl(200, 70%, 55%)";
    this.cageColorValue = "hsla(200,85%,65%,";
    this.dissolveColorValue = "hsl(200,80%,65%)";
    this.initState(new FlyerPatrolState(this));
  }

  get minionColor(): string {
    return "hsl(200, 70%, 55%)";
  }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "needle",
      danger: 0.3,
      weight: 0.1,
      corruption: 0.3,
      hueRole: "minion-logic",
      strokePx: 1.5,
      spinRate: 1.2,
      wobbleAmp: 0.2,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  protected updateExhaust(): void {
    const isTelegraph = this.attackState === "TELEGRAPH";
    this.exhaustTimer = isTelegraph ? 0.04 : 0.08;
    const sparkColor = isTelegraph ? "hsl(45, 100%, 60%)" : "hsl(200, 80%, 65%)";
    this.world.events.publishSpark(
      this.position.x,
      this.position.y + this.size.height / 2,
      Math.PI / 2,
      sparkColor,
      false,
      isTelegraph ? 6 : 2
    );
  }
}
`,"src/entities/LancerMinion.ts":`import { BaseMinion } from "./BaseMinion";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { IWorld } from "@/core/Interfaces";
import { LancerPatrolState } from "./MinionStates";
import { TrigLUT } from "@/core/TrigLUT";
import { VisualProfile } from "@/core/visuals/ShapeRenderer";

export class LancerMinion extends BaseMinion {
  public lanceExtended = false;

  public getExtendedHitbox() {
    if (!this.lanceExtended) return null;
    return {
      x: this.position.x + this.facingDirection * 44,
      y: this.position.y - 9.6,
      width: 72,
      height: 14.4
    };
  }

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 32, height: 40 };
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 6,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "feet";
    this.bodyColorValue = "hsl(280, 60%, 55%)";
    this.cageColorValue = "hsla(280,85%,65%,";
    this.dissolveColorValue = "hsl(280,70%,65%)";
    this.initState(new LancerPatrolState(this));
  }

  get minionColor(): string {
    return "hsl(280, 60%, 55%)";
  }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "kite",
      danger: 0.5,
      weight: 0.4,
      corruption: 0.2,
      hueRole: "determination",
      strokePx: 2,
      spinRate: 0,
      wobbleAmp: 0,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  protected updateNonTelegraphRotation(): void {
    if (this.attackState === "ATTACK") {
      this.targetRotation = this.facingDirection * 0.21;
      return;
    }
    super.updateNonTelegraphRotation();
  }

  protected updateExhaust(): void {
    if (Math.abs(this.velocity.x) > 0 && this.physics.isGrounded) {
      const isTelegraph = this.attackState === "TELEGRAPH";
      this.exhaustTimer = isTelegraph ? 0.05 : 0.15;
      const scrapeColor = isTelegraph ? "hsl(45, 100%, 60%)" : "rgba(255, 255, 255, 0.4)";
      this.world.events.publishSpark(
        this.position.x - this.facingDirection * (this.size.width / 2),
        this.position.y + this.size.height / 2,
        TrigLUT.atan2(0.5, -this.facingDirection) + (TrigLUT.random() * 0.3 - 0.15),
        scrapeColor,
        false,
        isTelegraph ? 3 : 1
      );
    }
  }
}
`,"src/entities/MinionFactory.ts":`import { BaseMinion, MinionType } from "./BaseMinion";
import { TurretMinion } from "./TurretMinion";
import { LancerMinion } from "./LancerMinion";
import { FlyerMinion } from "./FlyerMinion";
import { ShielderMinion } from "./ShielderMinion";
import { IWorld } from "@/core/Interfaces";
import {
  PitLancerMinion,
  CompassWaspMinion,
  ClampjawMinion,
  HymnNailMinion,
  BlisterOxMinion,
  BellHammerMinion,
  ShardChoirMinion
} from "./NewGauntletMinions";

export class MinionFactory {
  public static createMinion(type: MinionType, id: string, position: { x: number; y: number }, world: IWorld): BaseMinion {
    switch (type) {
      case "TURRET":
        return new TurretMinion(id, position, world);
      case "LANCER":
        return new LancerMinion(id, position, world);
      case "FLYER":
        return new FlyerMinion(id, position, world);
      case "SHIELDER":
        return new ShielderMinion(id, position, world);
      case "PIT_LANCER":
        return new PitLancerMinion(id, position, world);
      case "COMPASS_WASP":
        return new CompassWaspMinion(id, position, world);
      case "CLAMPJAW":
        return new ClampjawMinion(id, position, world);
      case "HYMN_NAIL":
        return new HymnNailMinion(id, position, world);
      case "BLISTER_OX":
        return new BlisterOxMinion(id, position, world);
      case "BELL_HAMMER":
        return new BellHammerMinion(id, position, world);
      case "SHARD_CHOIR":
        return new ShardChoirMinion(id, position, world);
      default:
        throw new Error(\`Unknown minion type: \${type}\`);
    }
  }
}
`,"src/entities/MinionStates.ts":`import { IState } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { BaseMinion } from "./BaseMinion";
import { LancerMinion } from "./LancerMinion";
import { setVec, zeroVec } from "@/core/VecUtils";
import { TrigLUT } from "@/core/TrigLUT";

export abstract class MinionState implements IState {
  protected owner: BaseMinion;

  constructor(owner: BaseMinion) {
    this.owner = owner;
  }

  public abstract enter(): void;
  public abstract update(dt: number): void;
  public abstract exit(): void;
}

export class TurretPatrolState extends MinionState {
  public enter(): void {
    this.owner.attackState = "PATROL";
    zeroVec(this.owner.velocity);
  }

  public update(_dt: number): void {
    zeroVec(this.owner.velocity);
    const player = this.owner.world.player;
    if (!player || player.isDead) return;

    const dx = player.position.x - this.owner.position.x;
    const dy = player.position.y - this.owner.position.y;
    const distSq = dx * dx + dy * dy;

    if (distSq > 14400 && distSq < 176400 && this.owner.shootTimer <= 0) {
      if (this.hasLineOfSight(player.position)) {
        this.owner.stateMachine.changeState(new TurretTelegraphState(this.owner));
      }
    }
  }

  private hasLineOfSight(playerPos: { x: number; y: number }): boolean {
    const steps = 6;
    const startX = this.owner.position.x;
    const startY = this.owner.position.y - 12;
    const dx = playerPos.x - startX;
    const dy = playerPos.y - startY;

    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const checkX = startX + dx * t;
      const checkY = startY + dy * t;

      const solidCandidates = this.owner.world.physicsWorld.getOverlapCandidates(
        checkX, checkY, 8, 8, "solid"
      );

      for (const solid of solidCandidates) {
        if (
          checkX > solid.x && checkX < solid.x + solid.width &&
          checkY > solid.y && checkY < solid.y + solid.height
        ) {
          return false;
        }
      }
    }
    return true;
  }

  public exit(): void {}
}

export class TurretTelegraphState extends MinionState {
  public enter(): void {
    this.owner.attackState = "TELEGRAPH";
    this.owner.stateTimer = 0.5;
    zeroVec(this.owner.velocity);
  }

  public update(_dt: number): void {
    zeroVec(this.owner.velocity);
    if (this.owner.stateTimer <= 0) {
      const rand = TrigLUT.randomGameplay();
      
      if (rand < 0.6) {
        this.owner.stateMachine.changeState(new TurretBurstState(this.owner));
      } else {
        const player = this.owner.world.player;
        if (player && !player.isDead) {
          this.owner.fireSingleShotAtPlayer(player);
        }
        this.owner.shootTimer = 2.5;
        this.owner.stateMachine.changeState(new TurretPatrolState(this.owner));
      }
    }
  }

  public exit(): void {}
}

export class TurretBurstState extends MinionState {
  private shotsFired = 0;
  private burstTimer = 0;

  public enter(): void {
    this.owner.attackState = "ATTACK";
    this.shotsFired = 0;
    this.burstTimer = 0;
  }

  public update(dt: number): void {
    zeroVec(this.owner.velocity);
    this.burstTimer -= dt;

    if (this.burstTimer <= 0 && this.shotsFired < 4) {
      const player = this.owner.world.player;
      if (player && !player.isDead) {
        const dx = player.position.x - this.owner.position.x;
        const dy = player.position.y - this.owner.position.y;
        const mag = Math.sqrt(dx * dx + dy * dy);

        if (mag > 0) {
          const dirX = dx / mag;
          const dirY = dy / mag;

          const proj = this.owner.world.spawnProjectile(
            this.owner.position.x + dirX * 30,
            this.owner.position.y - 12 + dirY * 30,
            dirX,
            dirY,
            "boss",
            1,
            240,
            3.5,
            "hsl(180, 100%, 65%)",
            "homing"
          );

          proj.size = { width: 12.8, height: 12.8 };
        }
      }

      this.owner.world.audio.playSelectTick();

      this.shotsFired++;
      this.burstTimer = 0.14;
    }

    if (this.shotsFired >= 4) {
      this.owner.shootTimer = 3.0;
      this.owner.stateMachine.changeState(new TurretPatrolState(this.owner));
    }
  }

  public exit(): void {}
}

export class LancerPatrolState extends MinionState {
  public enter(): void {
    this.owner.attackState = "PATROL";
    setVec(this.owner.targetVisualScale, 1.0, 1.0);
  }

  public update(_dt: number): void {
    minionPatrolMovement(this.owner, _dt);

    const player = this.owner.world.player;
    if (player && !player.isDead) {
      const distY = Math.abs(player.position.y - this.owner.position.y);
      const distX = player.position.x - this.owner.position.x;

      if (distY < 40 && Math.abs(distX) < 160 && Math.sign(distX) === this.owner.facingDirection) {
        this.owner.stateMachine.changeState(new LancerTelegraphState(this.owner));
      }
    }
  }

  public exit(): void {}
}

export class LancerTelegraphState extends MinionState {
  public enter(): void {
    this.owner.attackState = "TELEGRAPH";
    this.owner.stateTimer = 0.4;
    this.owner.velocity.x = 0;
    setVec(this.owner.visualScale, 1.18, 0.82);
    setVec(this.owner.targetVisualScale, 1.1, 0.9);
  }

  public update(_dt: number): void {
    this.owner.velocity.x = 0;
    if (this.owner.stateTimer <= 0) {
      this.owner.stateMachine.changeState(new LancerAttackState(this.owner));
    }
  }

  public exit(): void {}
}

export class LancerAttackState extends MinionState {
  public enter(): void {
    this.owner.attackState = "ATTACK";
    this.owner.stateTimer = 0.25;
    this.owner.velocity.x = this.owner.facingDirection * 450;
    setVec(this.owner.visualScale, 1.26, 0.74);
    setVec(this.owner.targetVisualScale, 1.15, 0.85);
  }

  public update(_dt: number): void {
    this.owner.velocity.x = this.owner.facingDirection * 450;
    const physics = this.owner.physics;
    const hitWall = physics ? physics.isOnWallLeft || physics.isOnWallRight : false;

    const elapsed = 0.25 - this.owner.stateTimer;
    if (this.owner instanceof LancerMinion) {
      this.owner.lanceExtended = elapsed >= 0.05 && elapsed <= 0.22;
    }

    if (this.owner.stateTimer <= 0 || hitWall) {
      this.owner.stateMachine.changeState(new LancerCooldownState(this.owner));
    }
  }

  public exit(): void {
    if (this.owner instanceof LancerMinion) {
      this.owner.lanceExtended = false;
    }
  }
}

export class LancerCooldownState extends MinionState {
  public enter(): void {
    this.owner.attackState = "COOLDOWN";
    this.owner.stateTimer = 1.0;
    this.owner.velocity.x = 0;
    setVec(this.owner.visualScale, 0.85, 1.15);
    setVec(this.owner.targetVisualScale, 1.0, 1.0);
  }

  public update(_dt: number): void {
    this.owner.velocity.x = 0;
    if (this.owner.stateTimer <= 0) {
      this.owner.stateMachine.changeState(new LancerPatrolState(this.owner));
    }
  }

  public exit(): void {}
}

function minionPatrolMovement(minion: BaseMinion, dt: number) {
  const targetSpeed = minion.facingDirection * minion.patrolSpeed;
  const rate = targetSpeed !== 0 ? UNITS.MINION_ACCEL : UNITS.MINION_DECEL;
  minion.velocity.x += (targetSpeed - minion.velocity.x) * rate * dt;
  const physics = minion.physics;
  if (physics) {
    if (physics.isOnWallLeft) minion.facingDirection = 1;
    else if (physics.isOnWallRight) minion.facingDirection = -1;
  }

  if (physics && physics.isGrounded) {
    const checkDist = 20;
    const forwardX = minion.position.x + minion.facingDirection * checkDist;
    const belowY = minion.position.y + minion.size.height / 2 + 10;
    
    const solids = minion.world.physicsWorld.getOverlapCandidates(forwardX, belowY, 8, 8, "solid");
    const platforms = minion.world.physicsWorld.getOverlapCandidates(forwardX, belowY, 8, 8, "platform");

    let hasGroundAhead = false;
    for (const solid of solids) {
      if (forwardX > solid.x && forwardX < solid.x + solid.width && belowY > solid.y && belowY < solid.y + solid.height) {
        hasGroundAhead = true;
        break;
      }
    }
    if (!hasGroundAhead) {
      for (const plat of platforms) {
        if (forwardX > plat.x && forwardX < plat.x + plat.width && belowY > plat.y && belowY < plat.y + plat.height) {
          hasGroundAhead = true;
          break;
        }
      }
    }

    if (!hasGroundAhead) {
      minion.facingDirection *= -1;
      minion.velocity.x = 0;
    }
  }
}

export class FlyerPatrolState extends MinionState {
  public enter(): void {
    this.owner.attackState = "PATROL";
  }

  public update(_dt: number): void {
    const targetPos = this.owner.flyerTarget === "A" ? this.owner.pointA : this.owner.pointB;
    const dx = targetPos.x - this.owner.position.x;
    const dy = targetPos.y - this.owner.position.y;
    const distSq = dx * dx + dy * dy;

    if (distSq < 25) {
      this.owner.flyerTarget = this.owner.flyerTarget === "A" ? "B" : "A";
    } else {
      const dist = Math.sqrt(distSq);
      const targetVelX = (dx / dist) * this.owner.patrolSpeed;
      const targetVelY = (dy / dist) * this.owner.patrolSpeed;
      this.owner.velocity.x += (targetVelX - this.owner.velocity.x) * UNITS.MINION_ACCEL * _dt;
      this.owner.velocity.y += (targetVelY - this.owner.velocity.y) * UNITS.MINION_ACCEL * _dt;
    }

    const player = this.owner.world.player;
    if (player && !player.isDead) {
      const dxP = player.position.x - this.owner.position.x;
      const dyP = player.position.y - this.owner.position.y;
      const playerDistSq = dxP * dxP + dyP * dyP;

      if (playerDistSq < 62500 && this.owner.shootTimer <= -3.0) {
        this.owner.stateMachine.changeState(new FlyerDiveState(this.owner));
        return;
      }

      if (playerDistSq < 230400 && this.owner.shootTimer <= 0 && this.owner.volleyCount === 0) {
        this.owner.stateMachine.changeState(new FlyerTelegraphState(this.owner));
      }
    }
  }

  public exit(): void {}
}

export class FlyerTelegraphState extends MinionState {
  public enter(): void {
    this.owner.attackState = "TELEGRAPH";
    this.owner.stateTimer = 0.5;
    zeroVec(this.owner.velocity);
  }

  public update(_dt: number): void {
    zeroVec(this.owner.velocity);
    if (this.owner.stateTimer <= 0) {
      this.owner.stateMachine.changeState(new FlyerAttackState(this.owner));
    }
  }

  public exit(): void {}
}

export class FlyerAttackState extends MinionState {
  public enter(): void {
    this.owner.attackState = "ATTACK";
    this.owner.volleyCount = 5;
    this.owner.volleyTimer = 0;
    this.owner.shootTimer = 3.5;
  }

  public update(dt: number): void {
    this.owner.velocity = { x: this.owner.velocity.x * 0.9, y: this.owner.velocity.y * 0.9 };
    const player = this.owner.world.player;

    if (this.owner.volleyCount > 0) {
      this.owner.volleyTimer -= dt;
      if (this.owner.volleyTimer <= 0 && player && !player.isDead) {
        this.owner.fireSingleShotAtPlayer(player);
        this.owner.volleyCount--;
        this.owner.volleyTimer = 0.16;
      }
    }

    if (this.owner.volleyCount === 0) {
      this.owner.stateMachine.changeState(new FlyerPatrolState(this.owner));
    }
  }

  public exit(): void {}
}

export class FlyerDiveState extends MinionState {
  private diveTimer = 0;
  private stage: "DIVE" | "PAUSE" | "RECOVER" = "DIVE";

  public enter(): void {
    this.owner.attackState = "ATTACK";
    this.stage = "DIVE";
    this.diveTimer = 0.8;
    setVec(this.owner.visualScale, 0.85, 1.15);

    const player = this.owner.world.player;
    if (player) {
      const dx = player.position.x - this.owner.position.x;
      const dy = player.position.y - this.owner.position.y;
      const mag = Math.sqrt(dx * dx + dy * dy);
      if (mag > 0) {
        this.owner.velocity.x = (dx / mag) * 650;
        this.owner.velocity.y = (dy / mag) * 650;
      }
    }
  }

  public update(dt: number): void {
    if (this.stage === "DIVE") {
      this.diveTimer -= dt;
      const hitObstacle = this.owner.physics.isGrounded;

      if (this.diveTimer <= 0 || hitObstacle) {
        this.stage = "PAUSE";
        this.diveTimer = 0.5;
        zeroVec(this.owner.velocity);
        setVec(this.owner.visualScale, 1.25, 0.75);
        this.owner.world.events.publishSpark(this.owner.position.x, this.owner.position.y + 12, 0, "hsl(200, 80%, 65%)", true, 10);
      }
    } else if (this.stage === "PAUSE") {
      this.diveTimer -= dt;
      zeroVec(this.owner.velocity);
      if (this.diveTimer <= 0) {
        this.stage = "RECOVER";
        this.diveTimer = 1.0;
        setVec(this.owner.targetVisualScale, 1.0, 1.0);
      }
    } else if (this.stage === "RECOVER") {
      this.diveTimer -= dt;
      const startPos = this.owner.pointA;
      const dx = startPos.x - this.owner.position.x;
      const dy = startPos.y - this.owner.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        this.owner.velocity.x = (dx / dist) * 180;
        this.owner.velocity.y = (dy / dist) * 180;
      }

      if (this.diveTimer <= 0 || dist <= 15) {
        this.owner.shootTimer = 3.5;
        this.owner.stateMachine.changeState(new FlyerPatrolState(this.owner));
      }
    }
  }

  public exit(): void {}
}
`,"src/entities/NewGauntletMinions.ts":`import { BaseMinion } from "./BaseMinion";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { IWorld } from "@/core/Interfaces";
import { IState } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { TrigLUT } from "@/core/TrigLUT";
import { VisualProfile } from "@/core/visuals/ShapeRenderer";
import { zeroVec } from "@/core/VecUtils";
import { Player } from "@/entities/Player";

export class SimplePatrolState implements IState {
  private owner: BaseMinion;
  constructor(owner: BaseMinion) { this.owner = owner; }
  public enter(): void { this.owner.attackState = "PATROL"; }
  public update(dt: number): void {
    const targetSpeed = this.owner.facingDirection * this.owner.patrolSpeed;
    this.owner.velocity.x += (targetSpeed - this.owner.velocity.x) * UNITS.MINION_ACCEL * dt;

    const physics = this.owner.physics;
    if (physics) {
      if (physics.isOnWallLeft) this.owner.facingDirection = 1;
      else if (physics.isOnWallRight) this.owner.facingDirection = -1;
    }

    if (physics && physics.isGrounded) {
      const checkDist = 20;
      const forwardX = this.owner.position.x + this.owner.facingDirection * checkDist;
      const belowY = this.owner.position.y + this.owner.size.height / 2 + 10;
      
      const solids = this.owner.world.physicsWorld.getOverlapCandidates(forwardX, belowY, 8, 8, "solid");
      const platforms = this.owner.world.physicsWorld.getOverlapCandidates(forwardX, belowY, 8, 8, "platform");

      let hasGroundAhead = false;
      for (const solid of solids) {
        if (forwardX > solid.x && forwardX < solid.x + solid.width && belowY > solid.y && belowY < solid.y + solid.height) {
          hasGroundAhead = true;
          break;
        }
      }
      if (!hasGroundAhead) {
        for (const plat of platforms) {
          if (forwardX > plat.x && forwardX < plat.x + plat.width && belowY > plat.y && belowY < plat.y + plat.height) {
            hasGroundAhead = true;
            break;
          }
        }
      }

      if (!hasGroundAhead) {
        this.owner.facingDirection *= -1;
        this.owner.velocity.x = 0;
      }
    }
  }
  public exit(): void {}
}

export class PitLancerMinion extends BaseMinion {
  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 32, height: 42 };
    this.patrolSpeed = 120;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 6,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "feet";
    this.bodyColorValue = "hsl(350, 82%, 58%)";
    this.dissolveColorValue = "hsl(350, 80%, 40%)";
    this.initState(new SimplePatrolState(this));
  }

  get minionColor(): string { return "hsl(350, 82%, 58%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "kite",
      danger: 0.8,
      weight: 0.5,
      corruption: 0.3,
      hueRole: "boss-lethal",
      strokePx: 2.5,
      spinRate: 0,
      wobbleAmp: 0,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  protected updateExhaust(): void {
    if (Math.abs(this.velocity.x) > 0 && this.physics.isGrounded) {
      this.exhaustTimer = 0.12;
      this.world.events.publishSpark(
        this.position.x - this.facingDirection * (this.size.width / 2),
        this.position.y + this.size.height / 2,
        TrigLUT.atan2(0.5, -this.facingDirection) + (TrigLUT.random() * 0.3 - 0.15),
        "rgba(255, 255, 255, 0.25)",
        false,
        1
      );
    }
  }
}

export class CompassWaspMinion extends BaseMinion {
  private angle = 0;
  private orbitRadius = 110;
  private diveTimer = 0;
  private state: "orbit" | "diving" = "orbit";

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 24, height: 24 };
    this.physics.gravity = 0;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 3,
      invincibilityDuration: 0.12,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "center";
    this.bodyColorValue = "hsl(45, 100%, 60%)";
    this.dissolveColorValue = "hsl(45, 100%, 40%)";
    this.angle = TrigLUT.random() * Math.PI * 2;
  }

  get minionColor(): string { return "hsl(45, 100%, 60%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "diamond",
      danger: 0.9,
      weight: 0.1,
      corruption: 0.2,
      hueRole: "telegraph",
      strokePx: 2,
      spinRate: 3.5,
      wobbleAmp: 0.3,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    if (this.state === "orbit") {
      this.angle += 1.8 * dt;
      const targetX = this.pointA.x + Math.cos(this.angle) * this.orbitRadius;
      const targetY = this.pointA.y + Math.sin(this.angle) * this.orbitRadius * 0.6;
      this.velocity.x = (targetX - this.position.x) * 4.0;
      this.velocity.y = (targetY - this.position.y) * 4.0;

      const player = this.world.player;
      if (player && !player.isDead) {
        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 260) {
          this.state = "diving";
          this.diveTimer = 1.5;
          this.velocity.x = (dx / dist) * 580;
          this.velocity.y = (dy / dist) * 580;
          this.world.events.publish("CAMERA_SHAKE", { amplitude: 3, duration: 0.12 });
        }
      }
    } else {
      this.diveTimer -= dt;
      const physics = this.physics;
      const hitWall = physics ? physics.isOnWallLeft || physics.isOnWallRight || physics.isGrounded : false;
      
      if (this.diveTimer <= 0 || hitWall) {
        this.state = "orbit";
        this.pointA = { x: this.position.x, y: this.position.y };
        zeroVec(this.velocity);
      }
    }

    super.update(dt);

    this.position.x = Math.max(40 + this.size.width/2, Math.min(UNITS.WORLD_SIZE - 40 - this.size.width/2, this.position.x));
    this.position.y = Math.max(40 + this.size.height/2, Math.min(UNITS.WORLD_SIZE - 80 - this.size.height/2, this.position.y));
  }

  protected updateExhaust(): void {
    this.exhaustTimer = 0.06;
    this.world.events.publishSpark(
      this.position.x,
      this.position.y,
      Math.PI,
      "hsl(45, 100%, 60%)",
      false,
      1
    );
  }
}

export class ClampjawMinion extends BaseMinion {
  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 44, height: 35 };
    this.patrolSpeed = 70;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 10,
      invincibilityDuration: 0.2,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "feet";
    this.bodyColorValue = "hsl(82, 38%, 44%)";
    this.dissolveColorValue = "hsl(82, 30%, 30%)";
    this.initState(new SimplePatrolState(this));
  }

  get minionColor(): string { return "hsl(82, 38%, 44%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "corrupted-box",
      danger: 0.3,
      weight: 0.9,
      corruption: 0.4,
      hueRole: "minion-organic",
      strokePx: 3,
      spinRate: 0,
      wobbleAmp: 0.15,
      cornerRadius: 3,
      phaseOffset: 0
    };
  }

  protected updateExhaust(): void {
    if (Math.abs(this.velocity.x) > 0 && this.physics.isGrounded) {
      this.exhaustTimer = 0.18;
      this.world.events.publishSpark(
        this.position.x - this.facingDirection * (this.size.width / 2),
        this.position.y + this.size.height / 2,
        Math.PI,
        "rgba(255, 255, 255, 0.15)",
        false,
        1
      );
    }
  }
}

export class HymnNailMinion extends BaseMinion {
  private pogoCount = 0;

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 30, height: 60 };
    this.physics.gravity = 0;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 4,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "center";
    this.bodyColorValue = "hsl(286, 85%, 62%)";
    this.dissolveColorValue = "hsl(286, 80%, 40%)";
  }

  get minionColor(): string { return "hsl(286, 85%, 62%)"; }

  public getVisualProfile(): VisualProfile {
    const isEnraged = this.pogoCount >= 3;
    return {
      shapeFamily: "needle",
      danger: isEnraged ? 0.9 : 0.1,
      weight: 0.3,
      corruption: isEnraged ? 0.6 : 0.1,
      hueRole: isEnraged ? "boss-lethal" : "determination",
      strokePx: 2,
      spinRate: isEnraged ? 2.5 : 0.1,
      wobbleAmp: isEnraged ? 0.4 : 0,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    const player = this.world.player;
    if (player && !player.isDead) {
      const isRebounding = player.velocity.y < 0 && (player as Player).meleeComponent.hasHitEnemyThisSwing;
      if (isRebounding && Math.abs(player.position.x - this.position.x) < 40 && player.position.y < this.position.y) {
        this.pogoCount++;
        if (this.pogoCount >= 3) {
          this.world.events.publish("CAMERA_SHAKE", { amplitude: 6, duration: 0.2 });
          this.world.events.publishSpark(this.position.x, this.position.y, 0, "hsl(350, 82%, 58%)", true, 8);
        }
      }
    }

    if (this.pogoCount >= 3) {
      if (player && !player.isDead) {
        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          this.velocity.x = (dx / dist) * 180;
          this.velocity.y = (dy / dist) * 180;
        }
      }
    }

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;

    super.update(dt);
  }

  protected updateExhaust(): void {
    this.exhaustTimer = 0.1;
    this.world.events.publishSpark(
      this.position.x,
      this.position.y,
      Math.PI / 2,
      "hsl(286, 85%, 62%)",
      false,
      1
    );
  }
}

export class BlisterOxMinion extends BaseMinion {
  private jumpCooldown = 2.0;

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 56, height: 48 };
    this.patrolSpeed = 40;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 12,
      invincibilityDuration: 0.2,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "feet";
    this.bodyColorValue = "hsl(82, 38%, 44%)";
    this.dissolveColorValue = "hsl(82, 30%, 30%)";
  }

  get minionColor(): string { return "hsl(82, 38%, 44%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "blister",
      danger: 0.1,
      weight: 1.0,
      corruption: 0.5,
      hueRole: "minion-organic",
      strokePx: 3.5,
      spinRate: 0.05,
      wobbleAmp: 0.25,
      cornerRadius: 8,
      phaseOffset: 0
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    this.jumpCooldown -= dt;

    if (this.physics.isGrounded) {
      const speed = this.facingDirection * this.patrolSpeed;
      this.velocity.x += (speed - this.velocity.x) * 3.0 * dt;

      if (this.jumpCooldown <= 0) {
        this.jumpCooldown = 2.5 + TrigLUT.random() * 1.5;
        this.velocity.y = -480;
        this.velocity.x = this.facingDirection * 150;
        this.physics.isGrounded = false;
        this.applyScaleImpulse(0.3, -0.3);
      }
    }

    const wasAirborne = !this.physics.isGrounded;
    super.update(dt);

    if (wasAirborne && this.physics.isGrounded) {
      this.world.events.publish("CAMERA_SHAKE", { amplitude: 6, duration: 0.2 });
      this.applyScaleImpulse(-0.4, 0.4);

      this.world.spawnProjectile(
        this.position.x - 20,
        this.position.y + 12,
        -1,
        0,
        "boss",
        1,
        250,
        1.5,
        this.minionColor
      );
      this.world.spawnProjectile(
        this.position.x + 20,
        this.position.y + 12,
        1,
        0,
        "boss",
        1,
        250,
        1.5,
        this.minionColor
      );
    }
  }

  protected updateExhaust(): void {
    if (!this.physics.isGrounded) {
      this.exhaustTimer = 0.08;
      this.world.events.publishSpark(
        this.position.x,
        this.position.y + 12,
        Math.PI / 2,
        "rgba(255,255,255,0.25)",
        false,
        2
      );
    }
  }
}

export class BellHammerMinion extends BaseMinion {
  private slamTimer = 1.5;

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 44, height: 44 };
    this.patrolSpeed = 60;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 8,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "feet";
    this.bodyColorValue = "hsl(358, 92%, 52%)";
    this.dissolveColorValue = "hsl(358, 80%, 30%)";
  }

  get minionColor(): string { return "hsl(358, 92%, 52%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "hex",
      danger: 0.8,
      weight: 0.9,
      corruption: 0.3,
      hueRole: "hazard",
      strokePx: 3,
      spinRate: 0.5,
      wobbleAmp: 0.1,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    this.slamTimer -= dt;

    if (this.physics.isGrounded) {
      const speed = this.facingDirection * this.patrolSpeed;
      this.velocity.x += (speed - this.velocity.x) * 4.0 * dt;

      if (this.slamTimer <= 0) {
        this.slamTimer = 2.0;
        this.velocity.y = -550;
        this.velocity.x = this.facingDirection * 180;
        this.physics.isGrounded = false;
        this.applyScaleImpulse(0.2, -0.2);
      }
    }

    const wasAirborne = !this.physics.isGrounded;
    super.update(dt);

    if (wasAirborne && this.physics.isGrounded) {
      this.world.events.publish("CAMERA_SHAKE", { amplitude: 8, duration: 0.25 });
      this.applyScaleImpulse(-0.5, 0.5);

      this.world.events.publishSpark(
        this.position.x,
        this.position.y + 12,
        0,
        "hsl(358, 92%, 52%)",
        true,
        18,
        "line"
      );
    }
  }

  protected updateExhaust(): void {
    if (!this.physics.isGrounded) {
      this.exhaustTimer = 0.08;
      this.world.events.publishSpark(
        this.position.x,
        this.position.y + 12,
        Math.PI / 2,
        "hsl(358, 92%, 52%)",
        false,
        2
      );
    }
  }
}


export class ShardChoirMinion extends BaseMinion {
  private hoverTimer = 0;

  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 22, height: 22 };
    this.physics.gravity = 0;
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 2,
      invincibilityDuration: 0.1,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.squashPivot = "center";
    this.bodyColorValue = "hsl(194, 62%, 52%)";
    this.dissolveColorValue = "hsl(194, 70%, 40%)";
    this.hoverTimer = TrigLUT.random() * Math.PI * 2;
  }

  get minionColor(): string { return "hsl(194, 62%, 52%)"; }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "triangle",
      danger: 0.7,
      weight: 0.2,
      corruption: 0.1,
      hueRole: "minion-logic",
      strokePx: 2,
      spinRate: 1.8,
      wobbleAmp: 0.2,
      cornerRadius: 0,
      phaseOffset: this.hoverTimer
    };
  }

  public update(dt: number) {
    if (this.isSpawning || this.isDying || this.isDead) {
      super.update(dt);
      return;
    }

    this.hoverTimer += dt * 3.5;
    
    const player = this.world.player;
    if (player && !player.isDead) {
      const dx = player.position.x - this.position.x;
      const dy = player.position.y - this.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 0) {
        const driftSpeed = 90;
        const targetVelX = (dx / dist) * driftSpeed;
        const targetVelY = (dy / dist) * driftSpeed + Math.sin(this.hoverTimer) * 35;
        this.velocity.x += (targetVelX - this.velocity.x) * 3.0 * dt;
        this.velocity.y += (targetVelY - this.velocity.y) * 3.0 * dt;
      }
    }

    super.update(dt);
    
    this.position.x = Math.max(40 + this.size.width/2, Math.min(UNITS.WORLD_SIZE - 40 - this.size.width/2, this.position.x));
    this.position.y = Math.max(40 + this.size.height/2, Math.min(UNITS.WORLD_SIZE - 80 - this.size.height/2, this.position.y));
  }

  protected updateExhaust(): void {
    this.exhaustTimer = 0.14;
    this.world.events.publishSpark(
      this.position.x,
      this.position.y,
      Math.PI / 2,
      "hsl(194, 62%, 52%)",
      false,
      1
    );
  }
}
`,"src/entities/Player.ts":`import { BaseEntity } from "./BaseEntity";
import { PhysicsComponent } from "@/entities/components/PhysicsComponent";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { InputReceiverComponent } from "@/entities/components/InputReceiverComponent";
import { DashComponent } from "@/entities/components/DashComponent";
import { MeleeComponent } from "@/entities/components/MeleeComponent";
import { FireballComponent } from "@/entities/components/FireballComponent";
import { HealComponent } from "@/entities/components/HealComponent";
import { IWorld } from "@/core/Interfaces";
import { UNITS } from "@/core/Units";
import { setVec, zeroVec } from "@/core/VecUtils";
import { TrigLUT } from "@/core/TrigLUT";
import { PlayerInputHandler } from "@/entities/handlers/PlayerInputHandler";
import { PlayerCombatHandler } from "@/entities/handlers/PlayerCombatHandler";
import { PlayerVisuals } from "@/entities/handlers/PlayerVisuals";

export class Player extends BaseEntity {
  public health!: HealthComponent;
  declare public physics: PhysicsComponent;
  public inputReceiver!: InputReceiverComponent;
  public dashComponent!: DashComponent;
  public meleeComponent!: MeleeComponent;
  public fireballComponent!: FireballComponent;
  public healComponent!: HealComponent;

  public readonly moveSpeed: number = UNITS.PLAYER_MOVE_SPEED;
  public readonly jumpForce: number = UNITS.PLAYER_JUMP_FORCE;
  public readonly wallSlideSpeed: number = UNITS.PLAYER_WALL_SLIDE_SPEED;

  public coyoteTimer: number = 0;
  public jumpBufferTimer: number = 0;
  public hasDoubleJump: boolean = true;

  public wallCoyoteTimer: number = 0;
  public lastWallNormal: number = 0;
  public airtimeDuration: number = 0;

  public determinationCounter: number = 0;
  public healingCharges: number = 0;
  public readonly maxHealingCharges: number = 3;

  public hurtTimer: number = 0;
  public recoilTimer: number = 0;
  public maxFallSpeed: number = 0;
  public wasOnWall: boolean = false;

  public doubleJumpDiskTimer: number = 0;
  public doubleJumpDiskPos: { x: number; y: number } = { x: 0, y: 0 };

  public inputHandler: PlayerInputHandler;
  public combatHandler: PlayerCombatHandler;
  public visuals: PlayerVisuals;

  private unsubHurt!: () => void;
  private unsubChargeMaxed!: () => void;
  private unsubPogo!: () => void;
  private unsubHealComplete!: () => void;
  private unsubHealCancel!: () => void;
  private unsubChargeCancel!: () => void;
  private unsubDamageDealt!: () => void;
  private unsubProjectileFired!: () => void;

  constructor(id: string, world: IWorld) {
    super(id, world);
    this.size = { width: 40, height: 40 };
    this.squashPivot = "center";

    zeroVec(this.position);
    zeroVec(this.previousPosition);

    this.physics = this.addComponent(PhysicsComponent, new PhysicsComponent());
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: UNITS.PLAYER_MAX_HP,
      invincibilityDuration: 1.5,
      onDamaged: ({ amount, currentHealth, maxHealth }: DamagePayload) => {
        this.world.events.publish("PLAYER_HURT", { amount, currentHealth, maxHealth });
      },
    });

    this.inputReceiver = this.addComponent(InputReceiverComponent, new InputReceiverComponent());
    this.dashComponent = this.addComponent(DashComponent, new DashComponent());
    this.meleeComponent = this.addComponent(MeleeComponent, new MeleeComponent());
    this.fireballComponent = this.addComponent(FireballComponent, new FireballComponent());
    this.healComponent = this.addComponent(HealComponent, new HealComponent());

    this.inputHandler = new PlayerInputHandler(this);
    this.combatHandler = new PlayerCombatHandler(this);
    this.visuals = new PlayerVisuals(this);

    this.setupSubscribers();
  }

  public get isDashing(): boolean {
    return this.dashComponent.isDashing;
  }
  public get canDash(): boolean {
    return this.dashComponent.canDash;
  }
  public get isHealing(): boolean {
    return this.healComponent.isHealing;
  }
  public get isCharging(): boolean {
    return this.fireballComponent.isCharging;
  }
  public get chargeTimer(): number {
    return this.fireballComponent.chargeTimer;
  }
  public get attackActive(): boolean {
    return this.meleeComponent.attackActive;
  }
  public get attackDirection(): "side" | "up" | "down" | null {
    return this.meleeComponent.attackDirection;
  }

  private setupSubscribers() {
    this.unsubHurt = this.world.events.subscribe("PLAYER_HURT", () => {
      this.hurtTimer = 0.15;
      if (this.healComponent.isHealing) {
        this.healComponent.cancelHealing();
      }
      if (this.fireballComponent.isCharging) {
        this.fireballComponent.cancelCharging();
      }
    });

    this.unsubPogo = this.world.events.subscribe("PLAYER_POGOED", () => {
      this.hasDoubleJump = true;
      this.dashComponent.resetDashCharge();
    });

    this.unsubHealCancel = this.world.events.subscribe("HEAL_CANCEL", () => {
      this.world.events.publishSpark(this.position.x, this.position.y, 0, "hsl(280, 80%, 65%)", true, 18);
      this.world.events.publish("CAMERA_SHAKE", { amplitude: 4, duration: 0.15 });
    });

    this.unsubChargeCancel = this.world.events.subscribe("CHARGE_CANCEL", () => {
      this.world.events.publishSpark(this.position.x, this.position.y - 12, 0, "hsl(142, 71%, 58%)", true, 14);
      this.world.events.publish("CAMERA_SHAKE", { amplitude: 2, duration: 0.1 });
    });

    this.unsubHealComplete = this.world.events.subscribe("HEAL_COMPLETE", () => {
      this.healingCharges = Math.max(0, this.healingCharges - 1);
      this.world.events.publish("HEALING_CHARGES_CHANGED", { charges: this.healingCharges });

      const health = this.getComponent(HealthComponent);
      if (health) {
        health.currentHealth = Math.min(health.maxHealth, health.currentHealth + 1);
        this.world.events.publish("PLAYER_HEALED", {
          amount: 1,
          currentHealth: health.currentHealth,
          maxHealth: health.maxHealth,
        });
      }

      this.world.events.publishBlast(this.position.x, this.position.y, "hsl(280, 100%, 75%)");

      this.world.events.publishBlast(this.position.x, this.position.y, "hsl(142, 71%, 58%)");

      this.world.events.publishSpark(this.position.x, this.position.y, 0, "hsl(285, 100%, 80%)", true, 32, "line", 30);

      this.world.events.publishSpark(this.position.x, this.position.y, 0, "hsl(142, 100%, 80%)", true, 20, "spark");

      setVec(this.visualScale, 0.90, 1.10);
      setVec(this.scaleVelocity, 6.0, -12.0);
      this.world.events.publish("CAMERA_SHAKE", { amplitude: 10, duration: 0.35 });
    });

    this.unsubChargeMaxed = this.world.events.subscribe("CHARGE_MAXED", () => {
      setVec(this.visualScale, 1.10, 0.90);
      setVec(this.scaleVelocity, -10.0, 10.0);
      this.world.events.publish("CAMERA_SHAKE", { amplitude: 4, duration: 0.12 });
    });

    this.unsubDamageDealt = this.world.events.subscribe("DETERMINATION_CHANGED", () => {
      if (this.healingCharges >= this.maxHealingCharges) return;

      this.determinationCounter++;
      if (this.determinationCounter >= 5) {
        this.determinationCounter = 0;
        this.healingCharges = Math.min(this.maxHealingCharges, this.healingCharges + 1);
        this.world.events.publish("HEALING_CHARGES_CHANGED", { charges: this.healingCharges });
      }
    });

    this.unsubProjectileFired = this.world.events.subscribe("PLAYER_PROJECTILE_FIRED", ({ level, dirX, dirY }) => {
      const isLvl2 = level === 2;
      const recoilForce = isLvl2 ? 320 : 130;
      const baseLift = isLvl2 ? 150 : 70;
      const tiltForce = isLvl2 ? 14.0 : 6.0;

      this.physics.isGrounded = false;
      this.recoilTimer = isLvl2 ? 0.35 : 0.22;

      this.velocity.x -= dirX * recoilForce;
      this.velocity.y -= (baseLift + dirY * recoilForce);

      this.applyAngularImpulse(-dirX * tiltForce);

      const sqX = isLvl2 ? 0.90 : 0.96;
      const sqY = isLvl2 ? 1.10 : 1.04;
      setVec(this.visualScale, sqX, sqY);
      setVec(this.scaleVelocity, (isLvl2 ? 16 : 8), (isLvl2 ? -16 : -8));

      const muzzleX = this.position.x + dirX * 30;
      const muzzleY = this.position.y + dirY * 30;

      this.world.events.publishBlast(muzzleX, muzzleY, isLvl2 ? "hsl(45, 100%, 65%)" : "hsl(142, 71%, 58%)");

      this.world.events.publishSpark(muzzleX, muzzleY, TrigLUT.atan2(dirY, dirX), isLvl2 ? "hsl(45, 100%, 65%)" : "hsl(142, 71%, 58%)", false, isLvl2 ? 16 : 8, "line");
    });
  }

  public update(dt: number) {
    if (this.isDead) {
      super.update(dt);
      return;
    }

    const moveAxis = this.inputReceiver.getAxis("MOVE_LEFT", "MOVE_RIGHT");
    const currentOnWall = this.physics.isOnWallLeft || this.physics.isOnWallRight;
    const isPressedAgainstWall = currentOnWall && moveAxis !== 0 && Math.sign(moveAxis) === -this.lastWallNormal;
    const isSliding =
      !this.physics.isGrounded && this.velocity.y > 0 && this.wallCoyoteTimer > 0 && isPressedAgainstWall;

    this.inputHandler.updateWallVisuals(isPressedAgainstWall, isSliding);
    this.inputHandler.updateAirTime(dt);
    this.combatHandler.updateGravity(isSliding);
    this.combatHandler.handleHurtTimer(dt);

    if (this.recoilTimer > 0) {
      this.recoilTimer -= dt;
    }

    if (this.doubleJumpDiskTimer > 0) {
      this.doubleJumpDiskTimer -= dt;
    }

    if (!this.isCharging) {
      this.visuals.updateRotation();
    }

    if (this.hurtTimer > 0) {
      super.update(dt);
      return;
    }

    super.update(dt);

    this.inputHandler.handleWallCling(currentOnWall);
    this.wasOnWall = currentOnWall;

    if (this.healComponent.isHealing) {
      if (!this.inputReceiver.isPressed("MOVE_DOWN") || !this.inputReceiver.isPressed("JUMP")) {
        this.healComponent.cancelHealing();
      }
      return;
    }

    if (this.dashComponent.isDashing) {
      return;
    }

    this.inputHandler.updateCoyoteAndWallTimers(dt);
    this.inputHandler.updateMovement(moveAxis, dt);
    this.inputHandler.handleDash();

    if (this.dashComponent.isDashing) {
      super.update(dt);
      return;
    }

    this.inputHandler.handleJump(dt);
    this.inputHandler.handleJumpRelease();
    this.combatHandler.handleAttack();
    this.combatHandler.checkHazardContact();
  }

  public draw(ctx: CanvasRenderingContext2D, alpha?: number) {
    this.visuals.draw(ctx, alpha);
  }

  public teardown() {
    this.unsubHurt();
    this.unsubPogo();
    this.unsubHealComplete();
    this.unsubHealCancel();
    this.unsubChargeMaxed();
    this.unsubChargeCancel();
    this.unsubDamageDealt();
    if (this.unsubProjectileFired) {
      this.unsubProjectileFired();
    }
    super.teardown();
  }
}
`,"src/entities/Projectile.ts":`import { BaseEntity } from "./BaseEntity";
import { IPoolable } from "@/core/ObjectPool";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { IWorld, Rectangle } from "@/core/Interfaces";
import { UNITS } from "@/core/Units";
import { TrigLUT } from "@/core/TrigLUT";
import { setVec, zeroVec } from "@/core/VecUtils";
import {
  IProjectileStrategy,
  playerProjectileStrategy,
  bossProjectileStrategy,
} from "./ProjectileStrategy";

const TRAIL_RING_SIZE = 16;

export class Projectile extends BaseEntity implements IPoolable {
  public isActive = false;
  public ownerId: "player" | "boss" = "player";
  public damage = 1;
  public customColor: string | null = null;
  public pierce = 0;
  public kind = "default";
  
  private strategy!: IProjectileStrategy;
  private lifespan = 0;

  private trailRing: { x: number; y: number }[] = [];
  private trailHead = 0;
  private trailCount = 0;

  private overlapScratch: Rectangle[] = [];
  private hitTargetIds = new Set<string>();

  constructor() {
    super("projectile", null as unknown as IWorld);
    this.size = { width: 11.2, height: 11.2 };
    this.trailRing = Array.from({ length: TRAIL_RING_SIZE }, () => ({ x: 0, y: 0 }));
  }

  public activate(
    x: number,
    y: number,
    dirX: number,
    dirY: number,
    ownerId: "player" | "boss",
    damage: number,
    speed: number,
    lifespan: number,
    world: IWorld,
    customColor?: string,
    kind?: string
  ) {
    setVec(this.position, x, y);
    setVec(this.previousPosition, x, y);
    setVec(this.velocity, dirX * speed, dirY * speed);

    this.ownerId = ownerId;
    this.damage = damage;
    this.lifespan = lifespan;
    this.world = world;
    this.customColor = customColor || null;
    this.pierce = ownerId === "player" && damage >= 3 ? 1 : 0;
    this.kind = kind || "default";

    this.strategy = ownerId === "player" ? playerProjectileStrategy : bossProjectileStrategy;

    this.isActive = true;
    this.isDead = false;
    this.trailHead = 0;
    this.trailCount = 0;
    this.hitTargetIds.clear();
  }

  public deactivate() {
    this.isActive = false;
    this.isDead = true;
    zeroVec(this.velocity);
    this.trailCount = 0;
    this.hitTargetIds.clear();
  }

  public update(dt: number): boolean {
    if (!this.isActive) return false;

    this.lifespan -= dt;
    if (this.lifespan <= 0) {
      this.releaseEffects();
      this.isActive = false;
      this.isDead = true;
      return true;
    }

    if (this.kind === "homing" && this.world.player && !this.world.player.isDead) {
      const player = this.world.player;
      const dx = player.position.x - this.position.x;
      const dy = player.position.y - this.position.y;
      const dist = TrigLUT.fastSqrt(dx * dx + dy * dy);

      if (dist > 0) {
        const speed = TrigLUT.fastSqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        const desiredVx = (dx / dist) * speed;
        const desiredVy = (dy / dist) * speed;

        const steerStrength = 3.2 * dt;
        this.velocity.x += (desiredVx - this.velocity.x) * steerStrength;
        this.velocity.y += (desiredVy - this.velocity.y) * steerStrength;

        const newSpeed = TrigLUT.fastSqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (newSpeed > 0) {
          this.velocity.x = (this.velocity.x / newSpeed) * speed;
          this.velocity.y = (this.velocity.y / newSpeed) * speed;
        }
      }
    }

    this.trailRing[this.trailHead].x = this.position.x;
    this.trailRing[this.trailHead].y = this.position.y;
    this.trailHead = (this.trailHead + 1) % TRAIL_RING_SIZE;
    const maxTrailLen = this.damage >= 3 ? 8 : 4;
    if (this.trailCount < TRAIL_RING_SIZE) this.trailCount++;
    if (this.trailCount > maxTrailLen) this.trailCount = maxTrailLen;

    this.strategy.updateSparks(this.world.events, this.position.x, this.position.y, this.velocity.x, this.velocity.y, this.damage);

    const dx = this.velocity.x * dt;
    const dy = this.velocity.y * dt;
    const maxStepSize = UNITS.CCD_STEP_LIMIT_PROJECTILE;
    const steps = Math.max(1, Math.ceil(TrigLUT.fastSqrt(dx * dx + dy * dy) / maxStepSize));
    const substepX = dx / steps;
    const substepY = dy / steps;

    for (let i = 0; i < steps; i++) {
      this.position.x += substepX;
      this.position.y += substepY;

      if (this.checkSolidCollisions() || this.checkOnewayCollisions()) {
        this.releaseEffects();
        this.isActive = false;
        this.isDead = true;
        return true;
      }

      if (this.checkProjectileClashes()) {
        this.releaseEffects();
        this.isActive = false;
        this.isDead = true;
        return true;
      }

      if (this.checkEntityCollisions()) {
        return true;
      }
    }

    return false;
  }

  private checkSolidCollisions(): boolean {
    const halfW = this.size.width / 2;
    const halfH = this.size.height / 2;
    const physicsWorld = this.world.physicsWorld;

    const solidCandidates = physicsWorld.getOverlapCandidates(
      this.position.x,
      this.position.y,
      this.size.width + UNITS.BROAD_PHASE_PADDING_STANDARD,
      this.size.height + UNITS.BROAD_PHASE_PADDING_STANDARD,
      "solid",
      this.overlapScratch
    );

    for (const solid of solidCandidates) {
      const isHit =
        this.position.x + halfW > solid.x &&
        this.position.x - halfW < solid.x + solid.width &&
        this.position.y + halfH > solid.y &&
        this.position.y - halfH < solid.y + solid.height;

      if (isHit) {
        return true;
      }
    }
    return false;
  }

  private checkOnewayCollisions(): boolean {
    if (this.velocity.y < 0) return false;

    const halfW = this.size.width / 2;
    const halfH = this.size.height / 2;
    const prevY = this.position.y - this.velocity.y * UNITS.CANONICAL_DELTA_TIME;
    const physicsWorld = this.world.physicsWorld;

    const platformCandidates = physicsWorld.getOverlapCandidates(
      this.position.x,
      this.position.y,
      this.size.width + UNITS.BROAD_PHASE_PADDING_STANDARD,
      this.size.height + UNITS.BROAD_PHASE_PADDING_STANDARD,
      "platform",
      this.overlapScratch
    );

    for (const platform of platformCandidates) {
      const isHit =
        this.position.x + halfW > platform.x &&
        this.position.x - halfW < platform.x + platform.width &&
        this.position.y + halfH > platform.y &&
        this.position.y - halfH < platform.y + platform.height;

      if (isHit) {
        if (prevY + halfH - 4 <= platform.y) {
          return true;
        }
      }
    }
    return false;
  }

  private checkProjectileClashes(): boolean {
    if (!this.strategy.shouldCheckClashes()) return false;

    const pW = this.size.width / 2;
    const pH = this.size.height / 2;

    const activeProjectiles = this.world.getProjectiles();
    for (let i = activeProjectiles.length - 1; i >= 0; i--) {
      const other = activeProjectiles[i];
      if (other && other.isActive && other.ownerId === "boss") {
        const oW = other.size.width / 2;
        const oH = other.size.height / 2;

        const isColliding =
          this.position.x + pW > other.position.x - oW &&
          this.position.x - pW < other.position.x + oW &&
          this.position.y + pH > other.position.y - oH &&
          this.position.y - pH < other.position.y + oH;

        if (isColliding) {
          const incomingDamage = other.damage || 1;
          (other as Projectile).deactivate();
          this.damage -= incomingDamage;
          if (this.damage <= 0) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private checkEntityCollisions(): boolean {
    const targets = this.strategy.getTargets(this.world);

    const pW = this.size.width / 2;
    const pH = this.size.height / 2;

    for (const target of targets) {
      if (this.hitTargetIds.has(target.id)) continue;

      const tW = target.size.width / 2;
      const tH = target.size.height / 2;

      const isColliding =
        this.position.x + pW > target.position.x - tW &&
        this.position.x - pW < target.position.x + tW &&
        this.position.y + pH > target.position.y - tH &&
        this.position.y - pH < target.position.y + tH;

      if (isColliding) {
        const targetHealth = target.getComponent(HealthComponent);
        if (targetHealth) {
          const projIntensity = this.strategy.getProjIntensity(this.damage);
          targetHealth.takeDamage(this.damage, this.position.x, this.position.y, projIntensity);
          this.hitTargetIds.add(target.id);

          if (this.pierce > 0) {
            this.pierce--;
            this.damage = Math.max(1, this.damage - 1);
            this.world.events.publishSpark(this.position.x, this.position.y, 0, "hsl(45, 100%, 65%)", true, 8);
          } else {
            this.releaseEffects();
            this.isActive = false;
            this.isDead = true;
            return true;
          }
        }
      }
    }
    return false;
  }

  private releaseEffects() {
    const blastColor = this.strategy.getBlastColor(this.damage, this.customColor);
    const angle = TrigLUT.atan2(this.velocity.y, this.velocity.x) + Math.PI;

    this.world.events.publishBlast(this.position.x, this.position.y, blastColor);

    const sparkCount = this.strategy.getSparkCount(this.damage);
    const turbulence = this.strategy.getSparkTurbulence(this.damage);
    this.world.events.publishSpark(this.position.x, this.position.y, angle, blastColor, false, sparkCount, "line", turbulence);
  }

  public draw(ctx: CanvasRenderingContext2D, alpha?: number) {
    if (!this.isActive) return;

    const alphaVal = alpha !== undefined ? alpha : 1.0;
    const drawX = this.previousPosition.x + (this.position.x - this.previousPosition.x) * alphaVal;
    const drawY = this.previousPosition.y + (this.position.y - this.previousPosition.y) * alphaVal;

    if (this.trailCount > 1) {
      ctx.save();
      const oldestIdx = this.trailCount < TRAIL_RING_SIZE ? 0 : this.trailHead;
      const oldest = this.trailRing[oldestIdx];

      this.strategy.drawTrail(ctx, {
        drawX,
        drawY,
        oldestX: oldest.x,
        oldestY: oldest.y,
        trail: this.trailRing,
        trailHead: this.trailHead,
        trailCount: this.trailCount,
        trailRingSize: TRAIL_RING_SIZE,
        damage: this.damage,
        customColor: this.customColor,
        projWidth: this.size.width,
        kind: this.kind,
        velX: this.velocity.x,
        velY: this.velocity.y,
      });

      ctx.restore();
    }

    const speed = TrigLUT.fastSqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    const angle = TrigLUT.atan2(this.velocity.y, this.velocity.x);

    const maxStretchSpeed = 1000;
    const stretchFactor = Math.min(1.5, 1.0 + (speed / maxStretchSpeed) * 0.5);
    const squashFactor = 1 / stretchFactor;

    ctx.save();
    ctx.translate(drawX, drawY);
    ctx.rotate(angle);
    ctx.scale(stretchFactor, squashFactor);

    this.strategy.drawBody(ctx, {
      width: this.size.width,
      height: this.size.height,
      damage: this.damage,
      customColor: this.customColor,
      kind: this.kind,
      velX: this.velocity.x,
      velY: this.velocity.y,
    });

    ctx.restore();
  }
}
`,"src/entities/ProjectileStrategy.ts":`import { IWorld, IEntity, IEventPublisher, EntityStatus } from "@/core/Interfaces";
import { TrigLUT } from "@/core/TrigLUT";
import { Software3DRenderer } from "@/core/visuals/Software3DRenderer";

export interface TrailDrawData {
    drawX: number; drawY: number; oldestX: number; oldestY: number;
    trail: {x: number, y: number}[]; trailHead: number; trailCount: number; trailRingSize: number;
    damage: number; customColor: string | null; projWidth: number; kind?: string;
    velX?: number; velY?: number;
}

export interface BodyDrawData {
    width: number; height: number; damage: number; customColor: string | null; kind?: string;
    velX: number; velY: number;
}

export interface IProjectileStrategy {
    updateSparks(world: IEventPublisher, posX: number, posY: number, velX: number, velY: number, damage: number): void;
    shouldCheckClashes(): boolean;
    getTargets(world: IWorld): IEntity[];
    getProjIntensity(damage: number): number;
    getBlastColor(damage: number, customColor: string | null): string;
    getSparkCount(damage: number): number;
    getSparkTurbulence(damage: number): number;
    drawTrail(ctx: CanvasRenderingContext2D, data: TrailDrawData): void;
    drawBody(ctx: CanvasRenderingContext2D, data: BodyDrawData): void;
}

function drawTrailPath(ctx: CanvasRenderingContext2D, startX: number, startY: number, trail: {x: number, y: number}[], trailHead: number, trailCount: number, trailRingSize: number) {
    ctx.beginPath(); ctx.moveTo(startX, startY);
    for (let j = 0; j < trailCount; j++) {
        const idx = (trailHead - 1 - j + trailRingSize) % trailRingSize;
        ctx.lineTo(trail[idx].x, trail[idx].y);
    }
    ctx.stroke();
}

export class PlayerProjectileStrategy implements IProjectileStrategy {
    updateSparks(world: IEventPublisher, posX: number, posY: number, velX: number, velY: number, damage: number): void {
        const isLvl2 = damage >= 3;
        if (TrigLUT.random() < (isLvl2 ? 0.35 : 0.08)) {
            const angle = TrigLUT.atan2(velY, velX) + Math.PI + (TrigLUT.random() * 0.4 - 0.2);
            world.publishSpark(posX, posY, angle, isLvl2 ? "hsl(45, 100%, 65%)" : "hsl(142, 71%, 58%)", false, 1, "line");
        }
    }
    shouldCheckClashes(): boolean { return true; }
    getTargets(world: IWorld): IEntity[] {
        const targets: IEntity[] = [];
        if (world.boss && !world.boss.isDead) targets.push(world.boss);
        for (const minion of world.minions) if (minion && minion.status === EntityStatus.ACTIVE) targets.push(minion);
        return targets;
    }
    getProjIntensity(damage: number): number { return damage >= 3 ? 1.6 : 0.6; }
    getBlastColor(damage: number, _customColor: string | null): string { return damage >= 3 ? "hsl(45, 100%, 65%)" : "hsl(142, 71%, 58%)"; }
    getSparkCount(damage: number): number { return damage >= 3 ? 18 : 4; }
    getSparkTurbulence(damage: number): number { return damage >= 3 ? 20 : 5; }
    
    drawTrail(ctx: CanvasRenderingContext2D, data: TrailDrawData): void {
        const isLvl2 = data.damage >= 3;
        ctx.save(); ctx.lineCap = "round"; ctx.lineJoin = "round";
        const mainColor = isLvl2 ? "rgba(234, 179, 8, " : "rgba(34, 197, 94, ";
        const outerGrad = ctx.createLinearGradient(data.drawX, data.drawY, data.oldestX, data.oldestY);
        outerGrad.addColorStop(0.0, mainColor + "0.45)"); outerGrad.addColorStop(1.0, mainColor + "0.0)");
        ctx.strokeStyle = outerGrad; ctx.lineWidth = data.projWidth * 1.5;
        ctx.shadowColor = isLvl2 ? "rgba(234, 179, 8, 0.6)" : "rgba(34, 197, 94, 0.6)"; ctx.shadowBlur = 12;
        drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);
        ctx.restore();
    }

    drawBody(ctx: CanvasRenderingContext2D, data: BodyDrawData): void {
        const isLvl2 = data.damage >= 3;
        const angle = TrigLUT.atan2(data.velY, data.velX);
        ctx.save();
        
        if (isLvl2) {
            const geom = Software3DRenderer.getPrismGeometry("proj-diamond", [{x:0,y:-0.5},{x:0.3,y:0},{x:0,y:0.5},{x:-0.3,y:0}], 0.8);
            Software3DRenderer.drawGeometry(ctx, geom, 0, 0, data.width * 1.5, data.height * 1.5, 1, 1, 0, 0, angle + Math.PI/2, "hsl(45, 100%, 60%)", 1.0, "center");
        } else {
            Software3DRenderer.drawGeometry(ctx, Software3DRenderer.BOX_GEOMETRY, 0, 0, data.width, data.height, 1, 1, 0, 0, angle + Math.PI/4, "hsl(142, 72%, 56%)", 1.0, "center");
        }
        ctx.restore();
    }
}

export class BossProjectileStrategy implements IProjectileStrategy {
    updateSparks(): void {}
    shouldCheckClashes(): boolean { return false; }
    getTargets(world: IWorld): IEntity[] { return world.player && !world.player.isDead ? [world.player] : []; }
    getProjIntensity(): number { return 1.0; }
    getBlastColor(_damage: number, customColor: string | null): string { return customColor || "hsl(350, 80%, 60%)"; }
    getSparkCount(): number { return 8; }
    getSparkTurbulence(): number { return 5; }
    
    drawTrail(ctx: CanvasRenderingContext2D, data: TrailDrawData): void {
        const trailColor = data.customColor || "hsl(350, 80%, 60%)";
        
        // Homing Cyan Core & Red Rim Trail implementation [4]
        if (data.kind === "homing") {
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            
            // Pulse outer red rim
            ctx.strokeStyle = "rgba(239, 68, 68, 0.42)";
            ctx.lineWidth = data.projWidth * 2.2;
            drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);
            
            // Render inner cyan laser-like core
            ctx.strokeStyle = "rgba(34, 197, 255, 0.85)";
            ctx.lineWidth = data.projWidth * 0.8;
            drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);
            
            ctx.restore();
            return;
        }

        // Segmented Spine Trail implementation [4]
        if (data.kind === "segmented-spine") {
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            for (let i = 0; i < data.trailCount; i++) {
                const p = i / (data.trailCount - 1 || 1);
                const idx = (data.trailHead - 1 - i + data.trailRingSize) % data.trailRingSize;
                const pt = data.trail[idx];
                const width = data.projWidth * (1.15 - p * 0.85);
                const alpha = 0.82 * Math.pow(1 - p, 1.7);
                
                ctx.fillStyle = trailColor.replace("hsl", "hsla").replace(")", \`, \${alpha})\`);
                
                // Render diamond segments decaying along the path
                ctx.beginPath();
                ctx.moveTo(pt.x, pt.y - width);
                ctx.lineTo(pt.x + width, pt.y);
                ctx.lineTo(pt.x, pt.y + width);
                ctx.lineTo(pt.x - width, pt.y);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
            return;
        }

        // Swirl Trail implementation [4]
        if (data.kind === "swirl" && data.velX !== undefined && data.velY !== undefined) {
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.beginPath();
            ctx.moveTo(data.drawX, data.drawY);

            const speed = Math.sqrt(data.velX * data.velX + data.velY * data.velY) || 1;
            const dir = { x: data.velX / speed, y: data.velY / speed };
            const normal = { x: -dir.y, y: dir.x };
            const time = performance.now() / 1000;

            for (let i = 0; i < data.trailCount; i++) {
                const p = i / (data.trailCount - 1 || 1);
                const idx = (data.trailHead - 1 - i + data.trailRingSize) % data.trailRingSize;
                const pt = { ...data.trail[idx] };
                
                // Sinusoidal wave offset perpendicular to motion [4]
                const swirl = Math.sin(p * Math.PI * 4 + time * 12 + idx * 0.5) * 16.0 * (1 - p);
                pt.x += normal.x * swirl;
                pt.y += normal.y * swirl;
                ctx.lineTo(pt.x, pt.y);
            }

            const alphaColor = trailColor.replace("hsl", "hsla").replace(")", ", 0.65)");
            ctx.strokeStyle = alphaColor;
            ctx.lineWidth = data.projWidth * 1.6;
            ctx.stroke();
            ctx.restore();
            return;
        }

        // Fallback linear gradient trail
        const alphaColor0 = trailColor.startsWith("hsl") ? trailColor.replace("hsl", "hsla").replace(")", ", 0.45)") : "rgba(239, 68, 68, 0.45)";
        const alphaColor1 = trailColor.startsWith("hsl") ? trailColor.replace("hsl", "hsla").replace(")", ", 0.0)") : "rgba(239, 68, 68, 0.0)";
        const grad = ctx.createLinearGradient(data.drawX, data.drawY, data.oldestX, data.oldestY);
        grad.addColorStop(0.0, alphaColor0); grad.addColorStop(1.0, alphaColor1);
        ctx.strokeStyle = grad; ctx.lineWidth = data.projWidth; ctx.lineCap = "round"; ctx.shadowBlur = 12;
        ctx.shadowColor = alphaColor0;
        drawTrailPath(ctx, data.drawX, data.drawY, data.trail, data.trailHead, data.trailCount, data.trailRingSize);
    }

    drawBody(ctx: CanvasRenderingContext2D, data: BodyDrawData): void {
        const angle = TrigLUT.atan2(data.velY, data.velX);
        const trailColor = data.customColor || "hsl(350, 82%, 58%)";

        // Cyan logic core & pulsing red rim implementation [4]
        if (data.kind === "homing") {
            const pulse = 1.0 + 0.12 * Math.sin(performance.now() * 0.015);
            const size = data.width * 2 * pulse;
            
            // Pulsing outer red rim
            const geomOuter = Software3DRenderer.getRadialGeometry("proj-homing-saw-outer", 6, 0.62, 0, 0.55);
            Software3DRenderer.drawGeometry(ctx, geomOuter, 0, 0, size, size, 1, 1, 0, 0, performance.now() * 0.006, trailColor, 1.0, "center");
            
            // Pulsing inner cyan logic core
            const geomInner = Software3DRenderer.getRadialGeometry("proj-homing-saw-inner", 6, 0.35, 0, 0.35);
            Software3DRenderer.drawGeometry(ctx, geomInner, 0, 0, size * 0.58, size * 0.58, 1, 1, 0, 0, performance.now() * -0.008, "hsl(194, 100%, 65%)", 1.0, "center");
            return;
        }

        const geom = data.kind === "heavy-block"
            ? Software3DRenderer.BOX_GEOMETRY
            : data.kind === "needle"
              ? Software3DRenderer.getPrismGeometry("proj-needle-sharp", [{x:0,y:-0.58},{x:0.18,y:0},{x:0,y:0.58},{x:-0.18,y:0}], 0.7)
              : data.damage >= 2
                ? Software3DRenderer.getPrismGeometry("proj-heavy-needle", [{x:0,y:-0.58},{x:0.34,y:0},{x:0,y:0.58},{x:-0.34,y:0}], 0.7)
                : Software3DRenderer.getPrismGeometry("proj-needle", [{x:0,y:-0.5},{x:0.2,y:0},{x:0,y:0.5},{x:-0.2,y:0}], 0.6);
        
        ctx.save();
        const spin = data.kind === "heavy-block" ? performance.now() * 0.003 : angle + Math.PI / 2;
        Software3DRenderer.drawGeometry(ctx, geom, 0, 0, data.width * 2, data.height * 2, 1, 1, 0, 0, spin, trailColor, 1.0, "center");
        ctx.restore();
    }
}

export const playerProjectileStrategy = new PlayerProjectileStrategy();
export const bossProjectileStrategy = new BossProjectileStrategy();
`,"src/entities/ShielderMinion.ts":`import { BaseMinion } from "./BaseMinion";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { IWorld } from "@/core/Interfaces";
import { IState } from "@/core/StateMachine";
import { UNITS } from "@/core/Units";
import { TrigLUT } from "@/core/TrigLUT";
import { VisualProfile } from "@/core/visuals/ShapeRenderer";

export class ShielderPatrolState implements IState {
  private owner: ShielderMinion;

  constructor(owner: ShielderMinion) {
    this.owner = owner;
  }

  public enter(): void {
    this.owner.attackState = "PATROL";
  }

  public update(dt: number): void {
    const targetSpeed = this.owner.facingDirection * this.owner.patrolSpeed;
    this.owner.velocity.x += (targetSpeed - this.owner.velocity.x) * UNITS.MINION_ACCEL * dt;

    const physics = this.owner.physics;
    if (physics) {
      if (physics.isOnWallLeft) {
        this.owner.facingDirection = 1;
      } else if (physics.isOnWallRight) {
        this.owner.facingDirection = -1;
      }
    }

    const player = this.owner.world.player;
    if (player && !player.isDead) {
      const distX = Math.abs(player.position.x - this.owner.position.x);
      if (distX < 350) {
        this.owner.facingDirection = Math.sign(player.position.x - this.owner.position.x) || 1;
      }
    }
  }

  public exit(): void {}
}

export class ShielderMinion extends BaseMinion {
  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 35.2, height: 40 };
    this.patrolSpeed = 80;

    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 5,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });

    this.bodyColorValue = "hsl(180, 50%, 45%)";
    this.cageColorValue = "hsla(180,85%,65%,";
    this.dissolveColorValue = "hsl(180,70%,45%)";

    this.health.onBeforeDamage = (amount: number, sourceX: number): boolean => {
      if (this.isSpawning || this.isDying || this.isDead) {
        return false;
      }

      if (amount < 3) {
        const isAttackedFromFront =
          (this.facingDirection > 0 && sourceX > this.position.x) ||
          (this.facingDirection < 0 && sourceX < this.position.x);

        if (isAttackedFromFront) {
          this.world.events.publishSpark(
            this.position.x + this.facingDirection * 18,
            this.position.y,
            this.facingDirection > 0 ? 0 : Math.PI,
            "hsl(45, 100%, 65%)",
            true,
            12
          );
          this.world.audio.playErrorTick();
          
          this.applyScaleImpulse(-0.15, 0.3);
          return false;
        }
      }

      return true;
    };

    this.initState(new ShielderPatrolState(this));
  }

  get minionColor(): string {
    return "hsl(180, 50%, 45%)";
  }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "hex",
      danger: 0.1,
      weight: 0.8,
      corruption: 0.2,
      hueRole: "minion-logic",
      strokePx: 2.5,
      spinRate: 0,
      wobbleAmp: 0,
      cornerRadius: 4,
      phaseOffset: 0
    };
  }

  protected updateExhaust(): void {
    if (Math.abs(this.velocity.x) > 0 && this.physics.isGrounded) {
      this.exhaustTimer = 0.15;
      this.world.events.publishSpark(
        this.position.x - this.facingDirection * (this.size.width / 2),
        this.position.y + this.size.height / 2,
        TrigLUT.atan2(0.5, -this.facingDirection) + (TrigLUT.random() * 0.3 - 0.15),
        "rgba(255, 255, 255, 0.25)",
        false,
        1
      );
    }
  }
}
`,"src/entities/TurretMinion.ts":`import { BaseMinion } from "./BaseMinion";
import { HealthComponent, DamagePayload } from "@/entities/components/HealthComponent";
import { IWorld } from "@/core/Interfaces";
import { TurretPatrolState } from "./MinionStates";
import { TrigLUT } from "@/core/TrigLUT";
import { VisualProfile } from "@/core/visuals/ShapeRenderer";

export class TurretMinion extends BaseMinion {
  constructor(id: string, startPos: { x: number; y: number }, world: IWorld) {
    super(id, startPos, world);
    this.size = { width: 35.2, height: 35.2 };
    this.health = this.addComponent(HealthComponent, new HealthComponent(), {
      maxHealth: 5,
      invincibilityDuration: 0.15,
      onDamaged: ({ amount, currentHealth, maxHealth, sourceX, sourceY, intensity }: DamagePayload) => {
        this.world.events.publish("MINION_HURT", { id: this.id, amount, currentHealth, maxHealth, sourceX, sourceY, intensity });
      },
    });
    this.physics.gravity = 0;
    this.squashPivot = "feet";
    this.canFallIntoHazards = false;
    this.bodyColorValue = "#718096";
    this.cageColorValue = "hsla(142,80%,65%,";
    this.dissolveColorValue = "hsl(215,20%,65%)";
    this.initState(new TurretPatrolState(this));
  }

  get minionColor(): string {
    return "hsl(215, 20%, 65%)";
  }

  public getVisualProfile(): VisualProfile {
    return {
      shapeFamily: "hex",
      danger: 0.2,
      weight: 0.4,
      corruption: 0.1,
      hueRole: "minion-logic",
      strokePx: 2,
      spinRate: 0.2,
      wobbleAmp: 0,
      cornerRadius: 0,
      phaseOffset: 0
    };
  }

  protected updateExhaust(): void {
    if (this.attackState === "TELEGRAPH") {
      this.exhaustTimer = 0.06;
      this.world.events.publishSpark(
        this.position.x + (TrigLUT.random() * 16 - 8),
        this.position.y - this.size.height / 2,
        -Math.PI / 2 + (TrigLUT.random() * 0.2 - 0.1),
        "hsl(0, 100%, 65%)",
        false,
        2
      );
    }
  }
}
`,"src/entities/components/DashComponent.ts":`import { IEntityComponent } from "@/entities/EntityComponent";
import { BaseEntity } from "@/entities/BaseEntity";
import { TrigLUT } from "@/core/TrigLUT";
import { UNITS } from "@/core/Units";

export interface GhostFrame {
  x: number;
  y: number;
  opacity: number;
}

export class DashComponent implements IEntityComponent {
  public owner!: BaseEntity;

  public isDashing: boolean = false;
  public dashTimer: number = 0;
  public dashCooldown: number = 0;
  public canDash: boolean = true;
  public dashDirectionX: number = 1;
  public dashDirectionY: number = 0;
  public ghosts: GhostFrame[] = [];
  public ghostSpawnTimer: number = 0;

  private readonly dashSpeed: number = UNITS.PLAYER_DASH_SPEED;

  public setup(owner: BaseEntity): void {
    this.owner = owner;
  }

  public update(dt: number): void {
    if (this.dashCooldown > 0) {
      this.dashCooldown -= dt;
    }

    for (let i = this.ghosts.length - 1; i >= 0; i--) {
      const g = this.ghosts[i];
      g.opacity -= dt * 5.0;
      if (g.opacity <= 0) {
        const last = this.ghosts[this.ghosts.length - 1];
        this.ghosts[i] = last;
        this.ghosts.pop();
      }
    }

    if (this.isDashing) {
      this.dashTimer -= dt;
      this.owner.velocity.x = this.dashDirectionX * this.dashSpeed;
      this.owner.velocity.y = this.dashDirectionY * this.dashSpeed;

      this.ghostSpawnTimer -= dt;
      if (this.ghostSpawnTimer <= 0) {
        this.ghosts.push({
          x: this.owner.position.x,
          y: this.owner.position.y,
          opacity: 0.6,
        });
        this.ghostSpawnTimer = 0.025;

        this.owner.world.events.publishSpark(
          this.owner.position.x - this.dashDirectionX * (this.owner.size.width / 2),
          this.owner.position.y - this.dashDirectionY * (this.owner.size.height / 2),
          TrigLUT.atan2(this.dashDirectionY, this.dashDirectionX) + Math.PI + (TrigLUT.random() * 0.4 - 0.2),
          "rgba(255, 255, 255, 0.22)",
          false,
          2
        );
      }

      if (this.dashTimer <= 0) {
        this.isDashing = false;
        if (this.dashDirectionX !== 0) {
          this.owner.velocity.x = this.dashDirectionX * this.dashSpeed * 0.65;
          if (this.owner.recoilTimer !== undefined) {
            this.owner.recoilTimer = 0.18;
          }
        }
        if (this.dashDirectionY !== 0) {
          this.owner.velocity.y = this.dashDirectionY * this.dashSpeed * 0.40;
        }
      }
    }
  }

  public triggerDash(directionX: number, directionY: number): void {
    this.isDashing = true;
    this.dashTimer = UNITS.DASH_DURATION;
    this.dashCooldown = UNITS.DASH_COOLDOWN;
    this.canDash = false;
    this.dashDirectionX = directionX;
    this.dashDirectionY = directionY;
    this.ghostSpawnTimer = 0;
    this.owner.world.events.publish("PLAYER_DASHED", { direction: directionX });
  }

  public resetDashCharge(): void {
    if (!this.canDash) {
      this.canDash = true;
      this.owner.world.events.publish("PLAYER_DASH_RECHARGED", undefined);
    }
  }
}
`,"src/entities/components/FireballComponent.ts":`import { IEntityComponent } from "@/entities/EntityComponent";
import { BaseEntity } from "@/entities/BaseEntity";
import { TrigLUT } from "@/core/TrigLUT";
import { UNITS } from "@/core/Units";

const chargeUpdatePayload = { timer: 0 };

export class FireballComponent implements IEntityComponent {
  public owner!: BaseEntity;

  public isCharging: boolean = false;
  private hasPoppedLvl2: boolean = false;
  private hasPublishedChargeStart: boolean = false;
  public chargeTimer: number = 0;

  public setup(owner: BaseEntity): void {
    this.owner = owner;
  }

  public update(dt: number): void {
    if (this.isCharging) {
      this.chargeTimer += dt;

      if (this.chargeTimer >= 0.12 && !this.hasPublishedChargeStart) {
        this.hasPublishedChargeStart = true;
        this.owner.world.events.publish("CHARGE_START", undefined);
      }

      if (this.hasPublishedChargeStart) {
        chargeUpdatePayload.timer = this.chargeTimer;
        this.owner.world.events.publish("CHARGE_UPDATE", chargeUpdatePayload);
      }

      if (this.chargeTimer >= UNITS.CHARGE_LVL2_TIME && !this.hasPoppedLvl2) {
        this.hasPoppedLvl2 = true;
        this.owner.world.events.publish("CHARGE_MAXED", undefined);
      }

      const progress = Math.max(0, Math.min(1.0, this.chargeTimer / UNITS.CHARGE_LVL2_TIME));
      const isLvl2 = this.chargeTimer >= UNITS.CHARGE_LVL2_TIME;
      const nowTime = performance.now();

      const pulse = TrigLUT.sin(nowTime * 0.045) * 0.03 * progress;
      const shiverX = (TrigLUT.random() * 0.012 - 0.006) * progress;
      const shiverY = (TrigLUT.random() * 0.012 - 0.006) * progress;

      this.owner.targetVisualScale.x = 1.0 - pulse + shiverX;
      this.owner.targetVisualScale.y = 1.0 + pulse + shiverY;
      this.owner.rotation = TrigLUT.sin(nowTime * 0.09) * 0.02 * progress;

      if (TrigLUT.random() < 0.3 + progress * 0.5) {
        const angle = TrigLUT.random() * Math.PI * 2;
        const radius = 80 - progress * 50;
        const startX = this.owner.position.x + TrigLUT.cos(angle) * radius;
        const startY = this.owner.position.y - 12 + TrigLUT.sin(angle) * radius;

        const targetX = this.owner.position.x;
        const targetY = this.owner.position.y - 12;
        const vx = (targetX - startX) * 3.5;
        const vy = (targetY - startY) * 3.5;

        this.owner.world.events.publishSpark(startX, startY, TrigLUT.atan2(vy, vx), isLvl2 ? "hsl(45, 100%, 65%)" : "hsl(142, 71%, 58%)", false, 1, "line", 20);
      }

      if (isLvl2 && TrigLUT.random() < 0.12) {
        const angle = TrigLUT.random() * Math.PI * 2;
        const radius = 60;
        const startX = this.owner.position.x + TrigLUT.cos(angle) * radius;
        const startY = this.owner.position.y - 12 + TrigLUT.sin(angle) * radius;

        this.owner.world.events.publishSpark(startX, startY, angle + Math.PI, "hsl(190, 100%, 85%)", false, 3, "line", 45);
        this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 2.5, duration: 0.08 });
      }
    }
  }

  public startCharging(): void {
    this.isCharging = true;
    this.chargeTimer = 0;
    this.hasPoppedLvl2 = false;
    this.hasPublishedChargeStart = false;
  }

  public cancelCharging(): void {
    if (this.isCharging) {
      this.isCharging = false;
      this.chargeTimer = 0;
      this.hasPoppedLvl2 = false;
      if (this.hasPublishedChargeStart) {
        this.owner.world.events.publish("CHARGE_STOP", undefined);
        this.owner.world.events.publish("CHARGE_CANCEL", undefined);
      }
      this.hasPublishedChargeStart = false;
    }
  }

  public releaseCharge(dirX: number, dirY: number, facingDirection: number): void {
    if (!this.isCharging) return;
    this.isCharging = false;
    this.hasPoppedLvl2 = false;

    if (this.hasPublishedChargeStart) {
      this.owner.world.events.publish("CHARGE_STOP", undefined);
    }
    this.hasPublishedChargeStart = false;

    if (this.chargeTimer >= UNITS.CHARGE_LVL1_TIME) {
      this.fire(dirX, dirY, facingDirection);
    } else {
      if (this.chargeTimer >= 0.12) {
        this.owner.world.events.publish("CHARGE_CANCEL", undefined);
      }
    }
  }

  private fire(dirX: number, dirY: number, facingDirection: number): void {
    let finalDirX = dirX;
    const finalDirY = dirY;

    if (finalDirX === 0 && finalDirY === 0) {
      finalDirX = facingDirection;
    }

    const mag = TrigLUT.fastSqrt(finalDirX * finalDirX + finalDirY * finalDirY);
    const normalizedDir = { x: finalDirX / mag, y: finalDirY / mag };

    const isLvl2 = this.chargeTimer >= UNITS.CHARGE_LVL2_TIME;
    const damage = isLvl2 ? UNITS.PLAYER_FIREBALL_DAMAGE_LVL2 : UNITS.PLAYER_FIREBALL_DAMAGE_LVL1;
    const speed = isLvl2 ? 900 : 800;
    const lifespan = isLvl2 ? 3.0 : 2.0;

    const spawnX = this.owner.position.x + normalizedDir.x * 30;
    const spawnY = this.owner.position.y + normalizedDir.y * 30;

    this.owner.world.events.publish("PLAYER_PROJECTILE_FIRED", { level: isLvl2 ? 2 : 1, dirX: normalizedDir.x, dirY: normalizedDir.y });

    const proj = this.owner.world.spawnProjectile(
      spawnX,
      spawnY,
      normalizedDir.x,
      normalizedDir.y,
      "player",
      damage,
      speed,
      lifespan
    );

    if (isLvl2) {
      proj.size = { width: 38.4, height: 38.4 };
    } else {
      proj.size = { width: 17.6, height: 17.6 };
    }
  }
}
`,"src/entities/components/HealComponent.ts":`import { IEntityComponent } from "@/entities/EntityComponent";
import { BaseEntity } from "@/entities/BaseEntity";
import { TrigLUT } from "@/core/TrigLUT";
import { UNITS } from "@/core/Units";

const healUpdatePayload = { timer: 0 };

export class HealComponent implements IEntityComponent {
  public owner!: BaseEntity;

  public isHealing: boolean = false;
  public healTimer: number = 0;

  private readonly healDuration: number = UNITS.HEAL_DURATION;

  public setup(owner: BaseEntity): void {
    this.owner = owner;
  }

  public update(dt: number): void {
    if (this.isHealing) {
      this.owner.velocity.x = 0;
      this.healTimer -= dt;
      healUpdatePayload.timer = this.healTimer;
      this.owner.world.events.publish("HEAL_UPDATE", healUpdatePayload);

      const progress = Math.max(0, Math.min(1.0, (this.healDuration - this.healTimer) / this.healDuration));
      const nowTime = performance.now();

      this.owner.visualScale.x = 1.0 + TrigLUT.sin(nowTime * 0.045) * 0.015 * progress;
      this.owner.visualScale.y = 1.0 - TrigLUT.sin(nowTime * 0.045) * 0.015 * progress;

      if (TrigLUT.random() < 0.2 + progress * 0.4) {
        this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 0.5 + progress * 3.5, duration: 0.05 });
      }

      if (TrigLUT.random() < 0.3 + progress * 0.4) {
        const spawnX = this.owner.position.x + (TrigLUT.random() * 32 - 16);
        const spawnY = this.owner.position.y + this.owner.size.height / 2;
        this.owner.world.events.publishSpark(spawnX, spawnY, -Math.PI / 2 + (TrigLUT.random() * 0.15 - 0.075), "hsl(280, 85%, 65%)", false, 1, "line");
      }

      const sparkChance = 0.35 + progress * 0.65;
      if (TrigLUT.random() < sparkChance) {
        const spawnX = this.owner.position.x + (TrigLUT.random() * 44 - 22);
        const spawnY = this.owner.position.y + this.owner.size.height / 2 - (TrigLUT.random() * this.owner.size.height);
        const angle = -Math.PI / 2 + (TrigLUT.random() * 0.3 - 0.15);

        const sparkColor = progress >= 0.85 ? "hsl(295, 100%, 80%)" : "hsl(280, 85%, 65%)";
        const sparkCount = TrigLUT.random() < 0.2 ? 2 : 1;
        const sparkShape = TrigLUT.random() < 0.35 ? "line" as const : "spark" as const;
        this.owner.world.events.publishSpark(spawnX, spawnY, angle, sparkColor, false, sparkCount, sparkShape, 15 + progress * 40);
      }

      if (TrigLUT.random() < 0.25 + progress * 0.45) {
        const angle = TrigLUT.random() * Math.PI * 2;
        const radius = 90 - progress * 55;
        const startX = this.owner.position.x + TrigLUT.cos(angle) * radius;
        const startY = this.owner.position.y - 10 + TrigLUT.sin(angle) * radius;

        const targetX = this.owner.position.x;
        const targetY = this.owner.position.y - 10;
        const vx = (targetX - startX) * 4.0;
        const vy = (targetY - startY) * 4.0;

        this.owner.world.events.publishSpark(startX, startY, TrigLUT.atan2(vy, vx), "hsl(280, 100%, 75%)", false, 1, "line", 20);
      }

      if (TrigLUT.random() < 0.08 + progress * 0.15) {
        this.owner.world.events.publishDust(this.owner.position.x, this.owner.position.y + this.owner.size.height / 2, "horizontal");
      }

      if (this.healTimer <= 0) {
        this.completeHealing();
      }
    }
  }

  public startHealing(): void {
    this.isHealing = true;
    this.healTimer = this.healDuration;
    this.owner.world.events.publish("HEAL_START", undefined);
  }

  public cancelHealing(): void {
    if (this.isHealing) {
      this.isHealing = false;
      this.owner.world.events.publish("HEAL_CANCEL", undefined);
    }
  }

  private completeHealing(): void {
    this.isHealing = false;
    this.owner.world.events.publish("HEAL_COMPLETE", undefined);
  }
}
`,"src/entities/components/HealthComponent.ts":`import { IEntityComponent } from "@/entities/EntityComponent";
import { BaseEntity } from "@/entities/BaseEntity";
import { EntityStatus } from "@/core/Interfaces";

export type DamagePayload = {
  amount: number;
  currentHealth: number;
  maxHealth: number;
  sourceX: number;
  sourceY: number;
  intensity: number;
};

const scratchPayload: DamagePayload = {
  amount: 0, currentHealth: 0, maxHealth: 0,
  sourceX: 0, sourceY: 0, intensity: 0,
};

export interface HealthComponentOptions {
  maxHealth?: number;
  invincibilityDuration?: number;
  onDamaged?: (payload: DamagePayload) => void;
}

export class HealthComponent implements IEntityComponent {
  public owner!: BaseEntity;
  public maxHealth: number = 5;
  public currentHealth: number = 5;

  public invincibilityDuration: number = 0.15;
  private invincibilityTimer: number = 0;

  public hitFlashTimer: number = 0;
  public hitFlashDuration: number = 0.12;

  public onBeforeDamage?: (amount: number, sourceX: number, sourceY: number, intensity: number) => boolean;

  private onDamaged: ((payload: DamagePayload) => void) | null = null;

  public setup(owner: BaseEntity, dependencies?: HealthComponentOptions): void {
    this.owner = owner;
    if (dependencies) {
      if (dependencies.maxHealth !== undefined) {
        this.maxHealth = dependencies.maxHealth;
        this.currentHealth = dependencies.maxHealth;
      }
      if (dependencies.invincibilityDuration !== undefined) {
        this.invincibilityDuration = dependencies.invincibilityDuration;
      }
      if (dependencies.onDamaged !== undefined) {
        this.onDamaged = dependencies.onDamaged;
      }
    }
  }

  public update(dt: number): void {
    if (this.invincibilityTimer > 0) this.invincibilityTimer -= dt;
    if (this.hitFlashTimer > 0) this.hitFlashTimer -= dt;
  }

  public reset(): void {
    this.currentHealth = this.maxHealth;
    this.invincibilityTimer = 0;
    this.hitFlashTimer = 0;
  }

  public takeDamage(amount: number, sourceX: number = 0, sourceY: number = 0, intensity: number = 1): boolean {
    const isDying = this.owner.status === EntityStatus.DYING;
    const isSpawning = this.owner.status === EntityStatus.SPAWNING;
    if (this.onBeforeDamage && !this.onBeforeDamage(amount, sourceX, sourceY, intensity)) {
      return false;
    }
    if (this.invincibilityTimer > 0 || this.owner.isDead || isDying || isSpawning) {
      return false;
    }

    this.currentHealth = Math.max(0, this.currentHealth - amount);
    this.invincibilityTimer = this.invincibilityDuration;
    this.hitFlashTimer = this.hitFlashDuration;

    if (this.onDamaged) {
      scratchPayload.amount = amount;
      scratchPayload.currentHealth = this.currentHealth;
      scratchPayload.maxHealth = this.maxHealth;
      scratchPayload.sourceX = sourceX;
      scratchPayload.sourceY = sourceY;
      scratchPayload.intensity = intensity;
      this.onDamaged(scratchPayload);
    }

    if (this.currentHealth <= 0) {
      if (this.owner.startDeathSequence) {
        this.owner.startDeathSequence();
      } else {
        this.owner.isDead = true;
      }
    }

    return true;
  }

  public isInvincible(): boolean {
    return this.invincibilityTimer > 0;
  }

  public isFlashing(): boolean {
    return this.hitFlashTimer > 0;
  }
}
`,"src/entities/components/InputReceiverComponent.ts":`import { IEntityComponent } from "@/entities/EntityComponent";
import { BaseEntity } from "@/entities/BaseEntity";
import { inputProvider, Action } from "@/core/InputProvider";

export class InputReceiverComponent implements IEntityComponent {
  public owner!: BaseEntity;

  public setup(owner: BaseEntity): void {
    this.owner = owner;
  }

  public isPressed(action: Action): boolean {
    return inputProvider.isPressed(action);
  }

  public isJustPressed(action: Action): boolean {
    return inputProvider.isJustPressed(action);
  }

  public isJustReleased(action: Action): boolean {
    return inputProvider.isJustReleased(action);
  }

  public consumeBufferedAction(action: Action, windowMs: number = 100): boolean {
    return inputProvider.consumeBufferedAction(action, windowMs);
  }

  public getAxis(negative: Action, positive: Action): number {
    return inputProvider.getAxis(negative, positive);
  }
}
`,"src/entities/components/MeleeComponent.ts":`import { IEntityComponent } from "@/entities/EntityComponent";
import { BaseEntity } from "@/entities/BaseEntity";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { EntityStatus } from "@/core/Interfaces";
import { UNITS } from "@/core/Units";

export class MeleeComponent implements IEntityComponent {
  public owner!: BaseEntity;

  public attackCooldownTimer: number = 0;
  private targetsScratchpad: BaseEntity[] = [];
  public attackActiveTimer: number = 0;
  public attackActive: boolean = false;
  public attackDirection: "side" | "up" | "down" | null = null;
  public hasHitEnemyThisSwing: boolean = false;

  private readonly pogoForce: number = 450;
  private readonly meleeRangeLimit: number = UNITS.MELEE_MAX_REACH;
  private readonly closeRangeThreshold: number = UNITS.MELEE_CLOSE_RANGE_THRESHOLD;
  private readonly sideReachOffset: number = UNITS.MELEE_SIDE_OFFSET;
  private readonly verticalReachOffset: number = UNITS.MELEE_VERTICAL_OFFSET;

  public setup(owner: BaseEntity): void {
    this.owner = owner;
  }

  public update(dt: number): void {
    this.decayAttackTimers(dt);

    if (this.attackActive && !this.hasHitEnemyThisSwing) {
      if (this.attackDirection === "down") {
        this.checkPogoAttack();
      } else {
        this.checkMeleeAttackContact();
      }
    }
  }

  private decayAttackTimers(dt: number): void {
    if (this.attackCooldownTimer > 0) this.attackCooldownTimer -= dt;
    if (this.attackActiveTimer > 0) this.attackActiveTimer -= dt;

    if (this.attackActive && this.attackActiveTimer <= 0) {
      this.attackActive = false;
      this.attackDirection = null;
    }
  }

  public triggerAttack(direction: "side" | "up" | "down"): void {
    this.attackActive = true;
    this.attackActiveTimer = 0.09;
    this.attackCooldownTimer = 0.15;
    this.hasHitEnemyThisSwing = false;
    this.attackDirection = direction;

    const entity = this.owner;
    if (entity.visualScale && entity.scaleVelocity) {
      if (direction === "side") {
        entity.visualScale.y = 0.94;
        entity.visualScale.x = 1.06;
        entity.scaleVelocity.x = this.owner.facingDirection * 4;
        entity.scaleVelocity.y = 1.5;
      } else if (direction === "up") {
        entity.visualScale.y = 1.08;
        entity.visualScale.x = 0.92;
        entity.scaleVelocity.y = -5;
        entity.scaleVelocity.x = 1.5;
      } else if (direction === "down") {
        entity.visualScale.y = 1.08;
        entity.visualScale.x = 0.92;
        entity.scaleVelocity.y = 5;
        entity.scaleVelocity.x = 1.5;
      }
    }

    this.owner.world.events.publish("PLAYER_ATTACKED", { direction });
  }

  private checkMeleeAttackContact(): void {
    this.swipeEnemies();
    this.swipeIncomingProjectiles();
  }

  private swipeEnemies(): void {
    const targets = this.gatherAwaitingTargets();
    const facing = this.owner.facingDirection;

    for (const target of targets) {
      let isWithinSwingArc = false;
      let distanceToTarget = 0;

      if (this.attackDirection === "side") {
        const centerReachX = this.owner.position.x + facing * this.sideReachOffset;
        const centerReachY = this.owner.position.y;

        distanceToTarget = this.calculateDistSq(target.position.x, target.position.y, centerReachX, centerReachY);

        const reachLimit = this.meleeRangeLimit + target.size.width / 2;
        const withinReach = distanceToTarget <= reachLimit * reachLimit;
        const withinDirection =
          (facing > 0 && target.position.x >= centerReachX - 25) ||
          (facing < 0 && target.position.x <= centerReachX + 25);

        if (withinReach && withinDirection) {
          isWithinSwingArc = true;
        }
      } else if (this.attackDirection === "up") {
        const centerReachX = this.owner.position.x;
        const centerReachY = this.owner.position.y - this.verticalReachOffset;

        distanceToTarget = this.calculateDistSq(target.position.x, target.position.y, centerReachX, centerReachY);

        const reachVertLimit = this.meleeRangeLimit + target.size.height / 2;
        const withinReach = distanceToTarget <= reachVertLimit * reachVertLimit;
        const withinDirection = target.position.y <= centerReachY + 25;

        if (withinReach && withinDirection) {
          isWithinSwingArc = true;
        }
      }

      if (isWithinSwingArc) {
        const health = target.getComponent(HealthComponent);
        if (health) {
          const isCloseRange = distanceToTarget <= this.closeRangeThreshold * this.closeRangeThreshold;
          const damageAmount = isCloseRange ? UNITS.PLAYER_MELEE_DAMAGE_CLOSE : UNITS.PLAYER_MELEE_DAMAGE_BASE;

          const registeredDamage = health.takeDamage(
            damageAmount,
            this.owner.position.x,
            this.owner.position.y
          );
          if (registeredDamage) {
            this.hasHitEnemyThisSwing = true;
            this.owner.world.events.publish("DETERMINATION_CHANGED", { determination: 1 }); // Trigger determination increment

            // Apply blade resistance pushback recoil to the player
            const recoilForce = isCloseRange ? 200 : 90;
            this.owner.velocity.x = -facing * recoilForce;
            if (this.owner.getComponent(HealthComponent)?.owner.world.physicsWorld) {
              const isGrounded = this.owner.velocity.y === 0 || this.owner.physics?.isGrounded;
              if (!isGrounded) {
                this.owner.velocity.y = Math.min(this.owner.velocity.y, -120);
              }
            }
            if (this.owner.recoilTimer !== undefined) {
              this.owner.recoilTimer = 0.15;
            }

            if (isCloseRange) {
              this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 8, duration: 0.15 });
            }
            this.owner.world.events.publishSpark(target.position.x, target.position.y, facing > 0 ? 0 : Math.PI, "hsl(142, 71%, 58%)");
          }
        }
      }
    }
  }

  private swipeIncomingProjectiles(): void {
    const facing = this.owner.facingDirection;
    const activeProjectiles = this.owner.world.getProjectiles();

    for (let i = activeProjectiles.length - 1; i >= 0; i--) {
      const proj = activeProjectiles[i];
      if (proj.isActive && proj.ownerId === "boss") {
        let isDeflected = false;

        if (this.attackDirection === "side") {
          const centerReachX = this.owner.position.x + facing * this.sideReachOffset;
          const centerReachY = this.owner.position.y;
          const distSq = this.calculateDistSq(proj.position.x, proj.position.y, centerReachX, centerReachY);

          const projReachLimit = this.meleeRangeLimit + proj.size.width / 2;
          const withinReach = distSq <= projReachLimit * projReachLimit;
          const withinDirection =
            (facing > 0 && proj.position.x >= centerReachX - 25) ||
            (facing < 0 && proj.position.x <= centerReachX + 25);

          if (withinReach && withinDirection) {
            isDeflected = true;
          }
        } else if (this.attackDirection === "up") {
          const centerReachX = this.owner.position.x;
          const centerReachY = this.owner.position.y - this.verticalReachOffset;
          const distSqUp = this.calculateDistSq(proj.position.x, proj.position.y, centerReachX, centerReachY);

          const projReachLimitUp = this.meleeRangeLimit + proj.size.height / 2;
          const withinReach = distSqUp <= projReachLimitUp * projReachLimitUp;
          const withinDirection = proj.position.y <= centerReachY + 25;

          if (withinReach && withinDirection) {
            isDeflected = true;
          }
        }

        if (isDeflected) {
          this.owner.world.releaseProjectile(proj);
          this.hasHitEnemyThisSwing = true;
          this.owner.world.events.publish("DETERMINATION_CHANGED", { determination: 1 });
          this.owner.world.events.publish("CAMERA_SHAKE", { amplitude: 3, duration: 0.1 });
        }
      }
    }
  }

  private checkPogoAttack(): void {
    const pogoHitbox = {
      x: this.owner.position.x + UNITS.POGO_HITBOX_X_OFFSET,
      y: this.owner.position.y + UNITS.POGO_HITBOX_Y_OFFSET,
      width: UNITS.POGO_HITBOX_WIDTH,
      height: UNITS.POGO_HITBOX_HEIGHT,
    };

    if (this.pogoEnemies(pogoHitbox)) return;
    if (this.pogoIncomingProjectiles(pogoHitbox)) return;
    this.pogoEnvironmentSurfaces(pogoHitbox);
  }

  private pogoEnemies(pogoBox: { x: number; y: number; width: number; height: number }): boolean {
    const targets = this.gatherAwaitingTargets();

    for (const target of targets) {
      const halfW = target.size.width / 2;
      const halfH = target.size.height / 2;

      const isColliding =
        pogoBox.x + pogoBox.width > target.position.x - halfW &&
        pogoBox.x < target.position.x + halfW &&
        pogoBox.y + pogoBox.height > target.position.y - halfH &&
        pogoBox.y < target.position.y + halfH;

      if (isColliding) {
        const health = target.getComponent(HealthComponent);
        if (health) {
          health.takeDamage(UNITS.PLAYER_MELEE_DAMAGE_BASE);
          this.owner.world.events.publish("DETERMINATION_CHANGED", { determination: 1 });
        }

        this.applyPogoRebound();
        return true;
      }
    }
    return false;
  }

  private pogoIncomingProjectiles(pogoBox: { x: number; y: number; width: number; height: number }): boolean {
    const activeProjectiles = this.owner.world.getProjectiles();

    for (const proj of activeProjectiles) {
      if (proj.isActive && proj.ownerId === "boss") {
        const pW = proj.size.width / 2;
        const pH = proj.size.height / 2;

        const isColliding =
          pogoBox.x + pogoBox.width > proj.position.x - pW &&
          pogoBox.x < proj.position.x + pW &&
          pogoBox.y + pogoBox.height > proj.position.y - pH &&
          pogoBox.y < proj.position.y + pH;

        if (isColliding) {
          this.owner.world.releaseProjectile(proj);
          this.owner.world.events.publish("DETERMINATION_CHANGED", { determination: 1 });
          this.applyPogoRebound();
          return true;
        }
      }
    }
    return false;
  }

  private pogoEnvironmentSurfaces(pogoBox: { x: number; y: number; width: number; height: number }): void {
    const surfaces = [
      ...this.owner.world.physicsWorld.solids,
      ...this.owner.world.physicsWorld.onewayPlatforms,
      ...this.owner.world.physicsWorld.hazards,
    ];

    for (const solid of surfaces) {
      const isColliding =
        pogoBox.x + pogoBox.width > solid.x &&
        pogoBox.x < solid.x + solid.width &&
        pogoBox.y + pogoBox.height > solid.y &&
        pogoBox.y < solid.y + solid.height;

      if (isColliding) {
        this.applyPogoRebound();
        break;
      }
    }
  }

  private applyPogoRebound(): void {
    this.owner.velocity.y = -this.pogoForce;
    this.owner.position.y -= 2;
    this.hasHitEnemyThisSwing = true;
    this.owner.world.events.publish("PLAYER_POGOED", undefined);
  }

  private gatherAwaitingTargets(): readonly BaseEntity[] {
    this.targetsScratchpad.length = 0;
    if (this.owner.world.boss && !this.owner.world.boss.isDead) {
      this.targetsScratchpad.push(this.owner.world.boss as BaseEntity);
    }
    const minions = this.owner.world.minions;
    for (let i = 0; i < minions.length; i++) {
      const minion = minions[i];
      if (minion && minion.status === EntityStatus.ACTIVE) {
        this.targetsScratchpad.push(minion as BaseEntity);
      }
    }
    return this.targetsScratchpad;
  }

  private calculateDistSq(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy;
  }
}
`,"src/entities/components/PhysicsComponent.ts":`import { IEntityComponent } from "@/entities/EntityComponent";
import { BaseEntity } from "@/entities/BaseEntity";
import { Rectangle } from "@/core/Interfaces";
import { UNITS } from "@/core/Units";

export interface PhysicsComponentOptions {
  gravity?: number;
}

export interface SweepResult {
  collided: boolean;
  t: number;
  normalX: number;
  normalY: number;
}

export class PhysicsComponent implements IEntityComponent {
  public owner!: BaseEntity;
  public gravity: number = 1200;
  public isGrounded: boolean = false;
  public isOnWallLeft: boolean = false;
  public isOnWallRight: boolean = false;

  public disablePlatformCollisionTimer: number = 0;

  private overlapScratch: Rectangle[] = [];
  private readonly cornerNudgeThreshold: number = UNITS.CORNER_NUDGE_MAX_OVERLAP;
  private readonly groundDetectionOffset: number = UNITS.GROUND_DETECTION_OFFSET;

  public setup(owner: BaseEntity, dependencies?: PhysicsComponentOptions): void {
    this.owner = owner;
    if (dependencies) {
      if (dependencies.gravity !== undefined) {
        this.gravity = dependencies.gravity;
      }
    }
  }

  public update(dt: number): void {
    if (this.disablePlatformCollisionTimer > 0) {
      this.disablePlatformCollisionTimer -= dt;
    }

    if (!this.isGrounded) {
      this.owner.velocity.y += this.gravity * dt;
    }

    this.executeSweptMovement(dt);
    this.evaluateGroundedStatus();
  }

  private executeSweptMovement(dt: number): void {
    this.isOnWallLeft = false;
    this.isOnWallRight = false;

    let timeLeft = 1.0;
    let iterations = 0;
    const maxIterations = 3;

    const halfH = this.owner.size.height / 2;

    this.resolveStaticOverlaps();

    while (timeLeft > 0 && iterations < maxIterations) {
      iterations++;

      const vx = this.owner.velocity.x;
      const vy = this.owner.velocity.y;

      if (vx === 0 && vy === 0) break;

      const pathW = this.owner.size.width + Math.abs(vx * dt) + 32;
      const pathH = this.owner.size.height + Math.abs(vy * dt) + 32;

      const solidCandidates = this.owner.world.physicsWorld.getOverlapCandidates(
        this.owner.position.x,
        this.owner.position.y,
        pathW,
        pathH,
        "solid",
        this.overlapScratch
      );

      let earliestT = 1.0;
      let normX = 0;
      let normY = 0;
      let hitFound = false;

      for (const solid of solidCandidates) {
        const sweep = this.sweptAABBCheck(this.owner.position, this.owner.size, vx, vy, solid, dt * timeLeft);
        if (sweep.collided && sweep.t < earliestT) {
          earliestT = sweep.t;
          normX = sweep.normalX;
          normY = sweep.normalY;
          hitFound = true;
        }
      }

      if (this.disablePlatformCollisionTimer <= 0 && vy >= 0) {
        const platformCandidates = this.owner.world.physicsWorld.getOverlapCandidates(
          this.owner.position.x,
          this.owner.position.y,
          pathW,
          pathH,
          "platform"
        );

        for (const platform of platformCandidates) {
          const prevFeetY = this.owner.position.y + halfH;
          if (prevFeetY - 2 <= platform.y) {
            const sweep = this.sweptAABBCheck(this.owner.position, this.owner.size, vx, vy, platform, dt * timeLeft);
            if (sweep.collided && sweep.t < earliestT && sweep.normalY === -1) {
              earliestT = sweep.t;
              normX = sweep.normalX;
              normY = sweep.normalY;
              hitFound = true;

              this.owner.world.events.publish("PLATFORM_IMPACT", {
                platform,
                velocityY: vy,
                massMultiplier: this.owner.id === "boss-01" ? 2.5 : 1.0
              });
            }
          }
        }
      }

      const stepEpsilon = 0.001;
      const moveFraction = Math.max(0, earliestT - stepEpsilon);
      this.owner.position.x += vx * moveFraction * dt * timeLeft;
      this.owner.position.y += vy * moveFraction * dt * timeLeft;

      timeLeft -= earliestT * timeLeft;

      if (hitFound) {
        if (normX !== 0) {
          this.owner.velocity.x = 0;
          if (normX > 0) this.isOnWallLeft = true;
          if (normX < 0) this.isOnWallRight = true;
        }
        if (normY !== 0) {
          this.owner.velocity.y = 0;
          if (normY < 0) {
            this.isGrounded = true;
          }
        }
      }
    }
  }

  private sweptAABBCheck(
    pos: { x: number; y: number },
    size: { width: number; height: number },
    vx: number, vy: number,
    solid: Rectangle,
    timeWindow: number
  ): SweepResult {
    const result: SweepResult = { collided: false, t: 1.0, normalX: 0, normalY: 0 };

    if (vx === 0 && vy === 0) return result;

    const halfW = size.width / 2;
    const halfH = size.height / 2;

    const pLeft = pos.x - halfW;
    const pRight = pos.x + halfW;
    const pTop = pos.y - halfH;
    const pBottom = pos.y + halfH;

    const dx = vx * timeWindow;
    const dy = vy * timeWindow;

    const xInvEntry = dx > 0 ? (solid.x - pRight) : ((solid.x + solid.width) - pLeft);
    const xInvExit  = dx > 0 ? ((solid.x + solid.width) - pLeft) : (solid.x - pRight);

    const yInvEntry = dy > 0 ? (solid.y - pBottom) : ((solid.y + solid.height) - pTop);
    const yInvExit  = dy > 0 ? ((solid.y + solid.height) - pTop) : (solid.y - pBottom);

    let rxEntry: number;
    let rxExit: number;
    if (dx !== 0) {
      rxEntry = xInvEntry / dx;
      rxExit = xInvExit / dx;
    } else {
      if (pRight > solid.x && pLeft < solid.x + solid.width) {
        rxEntry = -Infinity;
        rxExit = Infinity;
      } else {
        return result;
      }
    }

    let ryEntry: number;
    let ryExit: number;
    if (dy !== 0) {
      ryEntry = yInvEntry / dy;
      ryExit = yInvExit / dy;
    } else {
      if (pBottom > solid.y && pTop < solid.y + solid.height) {
        ryEntry = -Infinity;
        ryExit = Infinity;
      } else {
        return result;
      }
    }

    const tEntry = Math.max(rxEntry, ryEntry);
    const tExit = Math.min(rxExit, ryExit);

    if (tEntry > tExit || rxExit < 0 || ryExit < 0 || rxEntry > 1 || ryEntry > 1) {
      return result;
    }

    result.collided = true;
    result.t = Math.max(0, tEntry);

    if (rxEntry > ryEntry) {
      result.normalX = dx > 0 ? -1 : 1;
      result.normalY = 0;
    } else {
      result.normalX = 0;
      result.normalY = dy > 0 ? -1 : 1;
    }

    return result;
  }

  private resolveStaticOverlaps() {
    const halfW = this.owner.size.width / 2;
    const halfH = this.owner.size.height / 2;

    const solidCandidates = this.owner.world.physicsWorld.getOverlapCandidates(
      this.owner.position.x,
      this.owner.position.y,
      this.owner.size.width,
      this.owner.size.height,
      "solid",
      this.overlapScratch
    );

    for (const solid of solidCandidates) {
      if (this.isOverlapping(this.owner.position.x, this.owner.position.y, solid)) {
        const overlapX1 = (solid.x + solid.width) - (this.owner.position.x - halfW);
        const overlapX2 = (this.owner.position.x + halfW) - solid.x;
        const overlapY1 = (solid.y + solid.height) - (this.owner.position.y - halfH);
        const overlapY2 = (this.owner.position.y + halfH) - solid.y;

        const minX = Math.min(overlapX1, overlapX2);
        const minY = Math.min(overlapY1, overlapY2);

        if (minX < minY && minX <= this.cornerNudgeThreshold) {
          if (overlapX1 < overlapX2) {
            this.owner.position.x += overlapX1;
          } else {
            this.owner.position.x -= overlapX2;
          }
        } else if (minY <= this.cornerNudgeThreshold) {
          if (overlapY1 < overlapY2) {
            this.owner.position.y += overlapY1;
          } else {
            this.owner.position.y -= overlapY2;
            this.owner.velocity.y = 0;
          }
        }
      }
    }
  }

  private evaluateGroundedStatus(): void {
    this.isGrounded = false;
    const physicsWorld = this.owner.world.physicsWorld;
    const testPosY = this.owner.position.y + this.groundDetectionOffset;

    if (this.owner.velocity.y >= 0) {
      const solidCandidates = physicsWorld.getOverlapCandidates(
        this.owner.position.x,
        testPosY,
        this.owner.size.width + UNITS.BROAD_PHASE_PADDING_STANDARD,
        this.owner.size.height + UNITS.BROAD_PHASE_PADDING_STANDARD,
        "solid",
        this.overlapScratch
      );
      for (const solid of solidCandidates) {
        if (this.isOverlapping(this.owner.position.x, testPosY, solid)) {
          this.isGrounded = true;
          break;
        }
      }

      if (!this.isGrounded && this.disablePlatformCollisionTimer <= 0) {
        const platformCandidates = physicsWorld.getOverlapCandidates(
          this.owner.position.x,
          testPosY,
          this.owner.size.width + UNITS.BROAD_PHASE_PADDING_STANDARD,
          this.owner.size.height + UNITS.BROAD_PHASE_PADDING_STANDARD,
          "platform",
          this.overlapScratch
        );
        for (const platform of platformCandidates) {
          if (this.isOverlapping(this.owner.position.x, testPosY, platform)) {
            this.isGrounded = true;
            break;
          }
        }
      }
    }
  }

  private isOverlapping(x: number, y: number, rect: Rectangle): boolean {
    const halfWidth = this.owner.size.width / 2;
    const halfHeight = this.owner.size.height / 2;

    const left = x - halfWidth;
    const right = x + halfWidth;
    const top = y - halfHeight;
    const bottom = y + halfHeight;

    return right > rect.x && left < rect.x + rect.width && bottom > rect.y && top < rect.y + rect.height;
  }

  public teardown(): void {}
}
`,"src/entities/handlers/PlayerCombatHandler.ts":`import { Player } from "@/entities/Player";
import { HazardSystem } from "@/core/systems/HazardSystem";

export class PlayerCombatHandler {
  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  public updateGravity(isSliding: boolean) {
    const isFalling = !this.player.physics.isGrounded && this.player.velocity.y > 0;
    const isPogoing = this.player.meleeComponent.attackActive && this.player.meleeComponent.attackDirection === "down";
    const isNearJumpApex = !this.player.physics.isGrounded && Math.abs(this.player.velocity.y) < 120;

    if (isSliding) {
      this.player.physics.gravity = 650;
    } else if (isPogoing) {
      this.player.physics.gravity = 1200 * 0.85;
    } else if (isNearJumpApex) {
      this.player.physics.gravity = 1200 * 0.65;
    } else if (isFalling && this.player.inputReceiver.isPressed("MOVE_DOWN")) {
      this.player.physics.gravity = 1200 * 1.4;
    } else {
      this.player.physics.gravity = 1200;
    }
  }

  public handleHurtTimer(dt: number) {
    if (this.player.hurtTimer <= 0) return;

    this.player.hurtTimer -= dt;
    this.player.velocity.y += this.player.physics.gravity * dt;
    const knockbackFriction = 800.0;
    this.player.velocity.x = Math.sign(this.player.velocity.x) * Math.max(0, Math.abs(this.player.velocity.x) - knockbackFriction * dt);
  }

  public handleAttack() {
    if (this.player.inputReceiver.consumeBufferedAction("ATTACK", 100)) {
      this.player.fireballComponent.startCharging();

      if (this.player.meleeComponent.attackCooldownTimer <= 0) {
        if (this.player.inputReceiver.isPressed("MOVE_DOWN") && !this.player.physics.isGrounded) {
          this.player.meleeComponent.triggerAttack("down");
        } else if (this.player.inputReceiver.isPressed("MOVE_UP")) {
          this.player.meleeComponent.triggerAttack("up");
        } else {
          this.player.meleeComponent.triggerAttack("side");
        }
      }
    }

    if (this.player.inputReceiver.isJustReleased("ATTACK")) {
      const dirX = this.player.inputReceiver.getAxis("MOVE_LEFT", "MOVE_RIGHT");
      const dirY = this.player.inputReceiver.isPressed("MOVE_UP")
        ? -1
        : this.player.inputReceiver.isPressed("MOVE_DOWN") && !this.player.physics.isGrounded
          ? 1
          : 0;
      this.player.fireballComponent.releaseCharge(dirX, dirY, this.player.facingDirection);
    }
  }

  public checkHazardContact() {
    if (this.player.health.isInvincible() || this.player.isDead) return;

    const hit = HazardSystem.checkContact(this.player, this.player.world.physicsWorld);
    if (hit && !this.player.isDead) {
      this.player.physics.isGrounded = false;
    }
  }
}
`,"src/entities/handlers/PlayerInputHandler.ts":`import { Player } from "@/entities/Player";
import { TrigLUT } from "@/core/TrigLUT";
import { UNITS } from "@/core/Units";
import { setVec } from "@/core/VecUtils";

export class PlayerInputHandler {
  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  public getLastWallNormal(): number {
    return this.player.lastWallNormal;
  }

  public getWasOnWall(): boolean {
    return this.player.wasOnWall;
  }

  public updateWallVisuals(isPressedAgainstWall: boolean, isSliding: boolean) {
    let targetScaleX = 1.0;
    let targetScaleY = 1.0;

    if (isPressedAgainstWall) {
      targetScaleX = 0.91;
      targetScaleY = 1.09;

      if (isSliding) {
        targetScaleX = 0.85;
        targetScaleY = 1.15;

        if (TrigLUT.random() < 0.35) {
          const contactX = this.player.position.x - this.player.lastWallNormal * (this.player.size.width / 2) + (TrigLUT.random() * 8 - 4);
          const contactY = this.player.position.y + (this.player.size.height / 2);
          this.player.world.events.publishSpark(contactX, contactY, this.player.lastWallNormal === 1 ? -0.15 : Math.PI + 0.15, "hsl(45, 100%, 65%)", false, 1);
        }
      }
    }

    setVec(this.player.targetVisualScale, targetScaleX, targetScaleY);
  }

  public updateAirTime(dt: number) {
    if (!this.player.physics.isGrounded) {
      this.player.airtimeDuration += dt;
      this.player.maxFallSpeed = Math.max(this.player.maxFallSpeed, this.player.velocity.y);
    } else {
      if (this.player.airtimeDuration > 0.15) {
        const speedFactor = Math.max(0, (this.player.maxFallSpeed - 120) / 680);
        const factor = Math.min(1.0, 0.3 * speedFactor + 0.7 * speedFactor * speedFactor);
        if (factor > 0.01) {
          setVec(this.player.visualScale, 1.0 + 0.28 * factor, 1.0 - 0.28 * factor);
          setVec(this.player.scaleVelocity, 10 * factor, -18 * factor);
          this.player.velocity.x *= (1.0 - 0.8 * factor);
          this.player.world.events.publishDust(this.player.position.x, this.player.position.y + this.player.size.height / 2);
          this.player.world.events.publish("PLAYER_LANDED", undefined);
        }
      }
      this.player.airtimeDuration = 0;
      this.player.maxFallSpeed = 0;
    }
  }

  public handleWallCling(currentOnWall: boolean) {
    if (!currentOnWall || this.player.wasOnWall || this.player.physics.isGrounded) return;

    setVec(this.player.visualScale, 0.76, 1.24);

    const impactSide = this.player.physics.isOnWallLeft ? -1 : 1;
    const wallX = this.player.position.x + impactSide * (this.player.size.width / 2);

    this.player.world.events.publishDust(wallX, this.player.position.y, "vertical");
    this.player.world.events.publishSpark(wallX, this.player.position.y, impactSide > 0 ? Math.PI : 0, "rgba(255, 255, 255, 0.55)", false, 6);
  }

  public updateCoyoteAndWallTimers(dt: number) {
    if (this.player.physics.isGrounded) {
      this.player.coyoteTimer = 0.15;
      this.player.hasDoubleJump = true;
      this.player.dashComponent.resetDashCharge();
    } else {
      this.player.coyoteTimer -= dt;
    }

    if (this.player.physics.isOnWallLeft) {
      this.player.wallCoyoteTimer = 0.1;
      this.player.lastWallNormal = 1;
      this.player.hasDoubleJump = true;
      this.player.dashComponent.resetDashCharge();
    } else if (this.player.physics.isOnWallRight) {
      this.player.wallCoyoteTimer = 0.1;
      this.player.lastWallNormal = -1;
      this.player.hasDoubleJump = true;
      this.player.dashComponent.resetDashCharge();
    } else {
      this.player.wallCoyoteTimer -= dt;
    }
  }

  public updateMovement(moveAxis: number, dt: number) {
    if (this.player.meleeComponent.attackActive) {
      const friction = 2000.0;
      this.player.velocity.x = Math.sign(this.player.velocity.x) * Math.max(0, Math.abs(this.player.velocity.x) - friction * dt);
    } else {
      const targetSpeed = moveAxis * this.player.moveSpeed;
      let rate = moveAxis !== 0 ? UNITS.PLAYER_ACCEL : UNITS.PLAYER_DECEL;
      if (this.player.recoilTimer > 0) {
        rate = rate * 0.15;
      }
      this.player.velocity.x += (targetSpeed - this.player.velocity.x) * rate * dt;
    }

    if (moveAxis !== 0) {
      this.player.facingDirection = Math.sign(moveAxis);
    }

    if (!this.player.physics.isGrounded && this.player.velocity.y > 0 && this.player.wallCoyoteTimer > 0) {
      if (moveAxis !== 0 && Math.sign(moveAxis) === -this.player.lastWallNormal) {
        this.player.velocity.y = Math.min(this.player.velocity.y, this.player.wallSlideSpeed);
      }
    }
  }

  public handleDash() {
    if (
      !this.player.inputReceiver.consumeBufferedAction("DASH", 100) ||
      !this.player.dashComponent.canDash ||
      this.player.dashComponent.dashCooldown > 0
    ) {
      return;
    }

    let dirX = this.player.inputReceiver.getAxis("MOVE_LEFT", "MOVE_RIGHT");
    let dirY = 0;
    if (this.player.inputReceiver.isPressed("MOVE_UP")) {
      dirY = -1;
    } else if (this.player.inputReceiver.isPressed("MOVE_DOWN")) {
      dirY = 1;
    }

    if (dirX === 0 && dirY === 0) {
      dirX = this.player.facingDirection;
    }

    const len = Math.sqrt(dirX * dirX + dirY * dirY);
    const normX = dirX / len;
    const normY = dirY / len;

    this.player.dashComponent.triggerDash(normX, normY);
    setVec(this.player.visualScale, 1.25, 0.75);
  }

  public handleJump(dt: number) {
    if (!this.player.inputReceiver.consumeBufferedAction("JUMP", 100)) {
      this.player.jumpBufferTimer -= dt;
      return;
    }

    this.player.jumpBufferTimer = 0.1;
    this.resolveJump();
  }

  private resolveJump() {
    if (this.player.inputReceiver.isPressed("MOVE_DOWN") && this.isStandingOnOneway()) {
      this.player.physics.disablePlatformCollisionTimer = 0.25;
      this.player.position.y += 12;
      this.player.velocity.y = 180;
      this.player.physics.isGrounded = false;
      this.player.jumpBufferTimer = 0;
      this.player.world.events.publish("PLAYER_DROPPED", undefined);
    } else if (
      this.player.inputReceiver.isPressed("MOVE_DOWN") &&
      this.player.physics.isGrounded &&
      this.player.healingCharges > 0 &&
      this.player.health.currentHealth < this.player.health.maxHealth
    ) {
      this.player.healComponent.startHealing();
      this.player.jumpBufferTimer = 0;
    } else if (this.player.coyoteTimer > 0) {
      this.performJump();
    } else if (this.player.wallCoyoteTimer > 0) {
      this.player.velocity.y = -this.player.jumpForce;
      this.player.velocity.x = this.player.lastWallNormal * UNITS.PLAYER_WALL_JUMP_X_VELOCITY;
      this.player.coyoteTimer = 0;
      this.player.wallCoyoteTimer = 0;
      this.player.jumpBufferTimer = 0;
      setVec(this.player.visualScale, 0.82, 1.18);
      this.player.dashComponent.resetDashCharge();

      const wallX = this.player.position.x - this.player.lastWallNormal * (this.player.size.width / 2);
      this.player.world.events.publishDust(wallX, this.player.position.y, "vertical");
      this.player.world.events.publish("PLAYER_JUMPED", undefined);
    } else if (this.player.hasDoubleJump) {
      this.player.velocity.y = -this.player.jumpForce;
      this.player.hasDoubleJump = false;
      this.player.jumpBufferTimer = 0;
      setVec(this.player.visualScale, 0.82, 1.18);

      this.player.doubleJumpDiskTimer = 0.22;
      setVec(this.player.doubleJumpDiskPos, this.player.position.x, this.player.position.y + this.player.size.height / 2);

      this.player.world.events.publish("PLAYER_JUMPED", undefined);
    }
  }

  private performJump() {
    this.player.velocity.y = -this.player.jumpForce;
    this.player.coyoteTimer = 0;
    this.player.jumpBufferTimer = 0;
    setVec(this.player.visualScale, 0.82, 1.18);
    this.player.world.events.publishDust(this.player.position.x, this.player.position.y + this.player.size.height / 2);
    this.player.world.events.publish("PLAYER_JUMPED", undefined);
  }

  public handleJumpRelease() {
    if (this.player.inputReceiver.isJustReleased("JUMP") && this.player.velocity.y < 0) {
      this.player.velocity.y *= 0.4;
    }
  }

  private isStandingOnOneway(): boolean {
    const ownerHalfH = this.player.size.height / 2;
    const feetY = this.player.position.y + ownerHalfH;
    const halfW = this.player.size.width / 2;

    for (const platform of this.player.world.physicsWorld.onewayPlatforms) {
      if (this.player.position.x + halfW > platform.x && this.player.position.x - halfW < platform.x + platform.width) {
        if (Math.abs(feetY - platform.y) <= 12) {
          return true;
        }
      }
    }
    return false;
  }
}
`,"src/entities/handlers/PlayerVisuals.ts":`import { Software3DRenderer } from "../../core/visuals/Software3DRenderer";
import { Player } from "@/entities/Player";
import { PlayerFxRenderer } from "@/core/effects/PlayerFxRenderer";
import { UNITS } from "@/core/Units";
import { setVec } from "@/core/VecUtils";
import { TrigLUT } from "@/core/TrigLUT";

const AURA_COLORS = [
  'hsla(280, 90%, 25%, 0.35)',
  'hsla(285, 95%, 45%, 0.55)',
  'hsla(290, 100%, 75%, 0.8)',
  'hsla(0, 0%, 100%, 0.95)'
];

const chargeGradCache = document.createElement("canvas");
chargeGradCache.width = 64;
chargeGradCache.height = 64;
const chargeGradCtx = chargeGradCache.getContext("2d")!;
const chargeGrad = chargeGradCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
chargeGrad.addColorStop(0.0, '#ffffff');
chargeGrad.addColorStop(0.3, 'hsl(142, 100%, 80%)');
chargeGrad.addColorStop(1.0, 'rgba(255,255,255,0)');
chargeGradCtx.fillStyle = chargeGrad;
chargeGradCtx.fillRect(0, 0, 64, 64);

const chargeGradLvl2 = chargeGradCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
chargeGradLvl2.addColorStop(0.0, '#ffffff');
chargeGradLvl2.addColorStop(0.3, 'hsl(45, 100%, 75%)');
chargeGradLvl2.addColorStop(1.0, 'rgba(255,255,255,0)');
const chargeGradLvl2Canvas = document.createElement("canvas");
chargeGradLvl2Canvas.width = 64;
chargeGradLvl2Canvas.height = 64;
const chargeGradLvl2Ctx = chargeGradLvl2Canvas.getContext("2d")!;
chargeGradLvl2Ctx.fillStyle = chargeGradLvl2;
chargeGradLvl2Ctx.fillRect(0, 0, 64, 64);

export class PlayerVisuals {
  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  public updateRotation() {
    if (this.player.isCharging) return;

    setVec(this.player.targetVisualScale, 1.0, 1.0);
    if (!this.player.physics.isGrounded) {
      this.player.targetRotation = Math.sign(this.player.velocity.x) * Math.min(0.08, (Math.abs(this.player.velocity.x) / 1000) * 0.08);
    } else {
      const moveAxis = this.player.inputReceiver.getAxis("MOVE_LEFT", "MOVE_RIGHT");
      this.player.targetRotation = moveAxis * 0.12;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, alpha?: number) {
    if (this.player.isDead) return;

    const alphaVal = alpha !== undefined ? alpha : 1.0;
    const drawX = this.player.previousPosition.x + (this.player.position.x - this.player.previousPosition.x) * alphaVal;
    const drawY = this.player.previousPosition.y + (this.player.position.y - this.player.previousPosition.y) * alphaVal;

    for (const ghost of this.player.dashComponent.ghosts) {
      ctx.save();
      const gFeetY = ghost.y + this.player.size.height / 2;

      Software3DRenderer.drawGeometry(
        ctx,
        Software3DRenderer.BOX_GEOMETRY,
        ghost.x,
        gFeetY,
        this.player.size.width,
        this.player.size.height,
        this.player.visualScale.x,
        this.player.visualScale.y,
        0.15 * this.player.facingDirection,
        0.08,
        0,
        "hsla(142, 71%, 58%, " + ghost.opacity + ")",
        ghost.opacity,
        "feet"
      );
      ctx.restore();
    }

    if (this.player.doubleJumpDiskTimer > 0) {
      const p = 1.0 - this.player.doubleJumpDiskTimer / 0.22;
      const alphaDisk = (1.0 - p) * 0.8;
      const radius = 18 + p * 44;

      ctx.save();
      ctx.translate(this.player.doubleJumpDiskPos.x, this.player.doubleJumpDiskPos.y);

      ctx.strokeStyle = \`hsla(142, 71%, 58%, \${alphaDisk})\`;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = \`hsla(142, 100%, 80%, \${alphaDisk * 0.5})\`;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.6, radius * 0.6 * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    const feetY = drawY + this.player.size.height / 2;

    const nowTime = performance.now();
    const healCounts = { back: 0, front: 0 };
    const chargeCounts = { back: 0, front: 0 };

    if (this.player.isHealing) {
      const progress = Math.max(0, Math.min(1.0, (UNITS.HEAL_DURATION - this.player.healComponent.healTimer) / UNITS.HEAL_DURATION));
      PlayerFxRenderer.prepareHealSegments(nowTime, progress, healCounts);
    }

    if (this.player.isCharging) {
      PlayerFxRenderer.prepareChargeSegments(nowTime, this.player.chargeTimer, this.player.size.height, chargeCounts);
    }

    ctx.save();
    ctx.translate(drawX, feetY);
    ctx.rotate(this.player.rotation);

    if (this.player.isHealing) {
      ctx.save();
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      const progress = Math.max(0, Math.min(1.0, (UNITS.HEAL_DURATION - this.player.healComponent.healTimer) / UNITS.HEAL_DURATION));
      PlayerFxRenderer.renderHealBuffer(ctx, true, healCounts.back, progress);
      ctx.restore();
    }

    if (this.player.isCharging) {
      ctx.save();
      ctx.lineCap = "round";
      PlayerFxRenderer.renderChargeBuffer(ctx, true, chargeCounts.back);
      ctx.restore();
    }

    Software3DRenderer.drawGeometry(
      ctx,
      Software3DRenderer.BOX_GEOMETRY,
      0,
      0,
      this.player.size.width,
      this.player.size.height,
      this.player.visualScale.x,
      this.player.visualScale.y,
      0.15 * this.player.facingDirection + (this.player.velocity.x / 1120) * 0.35,
      0.08 + (this.player.velocity.y / 1200) * 0.22,
      0,
      this.player.health.isFlashing() ? "hsl(0, 0%, 100%)" : "hsl(142, 71%, 58%)",
      1.0,
      "feet"
    );

    if (this.player.healingCharges === this.player.maxHealingCharges) {
      ctx.save();
      const orbitTime = nowTime * 0.0028;
      ctx.fillStyle = "hsla(280, 100%, 75%, 0.45)";
      const numSparks = 3;
      const radius = 28;
      const centerLocalY = -this.player.size.height / 2;
      for (let i = 0; i < numSparks; i++) {
        const angle = orbitTime + (i * Math.PI * 2) / numSparks;
        const rx = Math.cos(angle) * radius;
        const ry = centerLocalY + Math.sin(angle) * radius * 0.35;
        ctx.fillRect(rx - 2.5, ry - 2.5, 5, 5);
      }
      ctx.restore();
    }

    const localCenterX = 0;
    const localCenterY = -this.player.size.height / 2;

    if (this.player.isHealing) {
      ctx.save();
      const progress = Math.max(0, Math.min(1.0, (UNITS.HEAL_DURATION - this.player.healComponent.healTimer) / UNITS.HEAL_DURATION));
      const baseW = this.player.size.width * (1.15 + progress * 0.75);
      const baseH = this.player.size.height * (1.1 + progress * 0.55);

      ctx.globalCompositeOperation = "lighter";

      AURA_COLORS.forEach((color, layerIdx) => {
        ctx.fillStyle = color;
        ctx.beginPath();

        const scaleFactor = 1.0 - layerIdx * 0.22;
        const width = baseW * scaleFactor;
        const height = baseH * scaleFactor;

        const bottomY = 0;
        const topY = -height;

        ctx.moveTo(-width / 2, bottomY);

        const leftSteps = 8;
        for (let j = 1; j <= leftSteps; j++) {
          const t = j / leftSteps;
          const currentY = bottomY - height * t;
          const angle = nowTime * 0.055 + j * 2.3 + layerIdx * 1.5;
          const spikeDist = (12 + progress * 16) * (1 - t * 0.5) * TrigLUT.sin(angle);
          const currentX = -width / 2 * (1 - t) + spikeDist;
          ctx.lineTo(currentX, currentY);
        }

        ctx.lineTo(0, topY);

        const rightSteps = 8;
        for (let j = rightSteps - 1; j >= 0; j--) {
          const t = j / rightSteps;
          const currentY = bottomY - height * t;
          const angle = nowTime * 0.055 + j * 2.3 + layerIdx * 1.5 + Math.PI;
          const spikeDist = (12 + progress * 16) * (1 - t * 0.5) * TrigLUT.sin(angle);
          const currentX = width / 2 * (1 - t) + spikeDist;
          ctx.lineTo(currentX, currentY);
        }

        ctx.lineTo(width / 2, bottomY);
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();

      ctx.save();
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      PlayerFxRenderer.renderHealBuffer(ctx, false, healCounts.front, progress);
      ctx.restore();
    }

    if (this.player.isCharging) {
      const chargeProgress = Math.max(0, Math.min(1.0, this.player.chargeTimer / UNITS.CHARGE_LVL2_TIME));
      const isLvl2 = this.player.chargeTimer >= UNITS.CHARGE_LVL2_TIME;

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      const coreRadius = (8 + chargeProgress * 14);
      const gradCanvas = isLvl2 ? chargeGradLvl2Canvas : chargeGradCache;
      ctx.drawImage(gradCanvas, localCenterX - coreRadius, localCenterY - coreRadius, coreRadius * 2, coreRadius * 2);

      ctx.save();
      ctx.lineCap = "round";
      PlayerFxRenderer.renderChargeBuffer(ctx, false, chargeCounts.front);
      ctx.restore();

      if (chargeProgress > 0.5) {
        const dischargeCount = isLvl2 ? 3 : 1;
        ctx.strokeStyle = isLvl2 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(132, 239, 158, 0.8)';
        ctx.lineWidth = isLvl2 ? 1.5 : 1.0;

        for (let d = 0; d < dischargeCount; d++) {
          if (TrigLUT.random() < 0.35) {
            const startAngle = TrigLUT.random() * Math.PI * 2;
            const rMax = (this.player.size.height * 0.35) + 20 * chargeProgress;

            ctx.beginPath();
            const cx = localCenterX + TrigLUT.cos(startAngle) * rMax;
            const cy = localCenterY + TrigLUT.sin(startAngle) * rMax;
            ctx.moveTo(cx, cy);

            const steps = 3;
            for (let s = 1; s <= steps; s++) {
              const t = s / steps;
              const nextAngle = startAngle + (TrigLUT.random() * 0.6 - 0.3);
              const nextRadius = rMax * (1.0 - t);
              const targetX = localCenterX + TrigLUT.cos(nextAngle) * nextRadius;
              const targetY = localCenterY + TrigLUT.sin(nextAngle) * nextRadius;

              ctx.lineTo(targetX, targetY);
            }
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    }

    ctx.restore();
  }
}
`,"src/hooks/useAudioSettings.ts":`import { useState } from "react";
import { settingsManager, AudioSettings } from "@/core/SettingsManager";
import { soundSynth } from "@/core/SoundSynth";

export function useAudioSettings() {
  const [audio, setAudio] = useState<AudioSettings>({ ...settingsManager.getAudio() });

  const handleVolumeChange = (field: keyof AudioSettings, value: number | boolean) => {
    const updated = { ...audio, [field]: value };
    setAudio(updated);
    settingsManager.setAudio(updated);
    soundSynth.updateVolumes();
  };

  const resetSettings = () => {
    const defaulted: AudioSettings = {
      masterVolume: 1.0,
      sfxVolume: 1.0,
      musicVolume: 1.0,
      masterMuted: false,
      sfxMuted: false,
      musicMuted: false,
    };
    setAudio(defaulted);
    settingsManager.setAudio(defaulted);
    soundSynth.updateVolumes();
    soundSynth.playHitConfirm();
  };

  return {
    audio,
    handleVolumeChange,
    resetSettings,
  };
}
`,"src/hooks/useBootSequence.ts":`import { useState, useEffect, startTransition } from "react";

export enum BootStage {
  NONE = 0,
  INITIALIZED = 1,
  ASSETS_PRELOADED = 2,
  ARENA_READY = 3,
}

export function useBootSequence() {
  const [bootStage, setBootStage] = useState<BootStage>(BootStage.NONE);

  useEffect(() => {
    startTransition(() => {
      setBootStage(BootStage.INITIALIZED);
    });

    const queuePreload = () => {
      startTransition(() => {
        setBootStage(BootStage.ASSETS_PRELOADED);
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(queuePreload, { timeout: 800 });
    } else {
      setTimeout(queuePreload, 150);
    }

    const queueFullSystem = () => {
      startTransition(() => {
        setBootStage(BootStage.ARENA_READY);
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(queueFullSystem, { timeout: 1500 });
    } else {
      setTimeout(queueFullSystem, 400);
    }
  }, []);

  return bootStage;
}
`,"src/hooks/useEngineSubscriptions.ts":`import { useEffect, useRef } from "react";
import { eventBroker } from "@/core/eventBroker";
import { useGameplayStore } from "@/store/useGameStore";

export function useEngineSubscriptions(
  triggerDialogue: (speaker: "player" | "boss", text: string) => void,
  resetDialogues: () => void
) {
  const triggerRef = useRef(triggerDialogue);
  const resetRef = useRef(resetDialogues);

  useEffect(() => {
    triggerRef.current = triggerDialogue;
    resetRef.current = resetDialogues;
  });

  useEffect(() => {
    const unsubs = [
      eventBroker.subscribe("DIALOGUE_TRIGGERED", ({ speaker, text }) => {
        triggerRef.current(speaker, text);
      }),
      eventBroker.subscribe("CLEAR_DIALOGUES", () => {
        resetRef.current();
      }),
      eventBroker.subscribe("PLAYER_LANDED", () => {
        useGameplayStore.getState().resetCombo();
      }),
      eventBroker.subscribe("BOSS_HURT", () => {
        useGameplayStore.getState().incrementCombo();
      }),
      eventBroker.subscribe("MINION_HURT", () => {
        useGameplayStore.getState().incrementCombo();
      }),
    ];

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, []);
}
`,"src/hooks/useFirstGesture.ts":`import { useEffect } from "react";
import { soundSynth } from "@/core/SoundSynth";

export function useFirstGesture(reloadSaveSlots: () => void) {
  useEffect(() => {
    const triggerOnFirstGesture = () => {
      soundSynth.startMusic();
      window.removeEventListener("click", triggerOnFirstGesture);
      window.removeEventListener("touchend", triggerOnFirstGesture);
    };

    window.addEventListener("click", triggerOnFirstGesture);
    window.addEventListener("touchend", triggerOnFirstGesture);

    reloadSaveSlots();

    return () => {
      window.removeEventListener("click", triggerOnFirstGesture);
      window.removeEventListener("touchend", triggerOnFirstGesture);
      soundSynth.stopMusic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
`,"src/hooks/useGameDialogue.ts":`import { useState, useEffect, useCallback } from "react";
import { soundSynth } from "@/core/SoundSynth";

export interface DialogueState {
  text: string;
  displayed: string;
  active: boolean;
  isTyping: boolean;
}

export function useGameDialogue() {
  const [playerDialogue, setPlayerDialogue] = useState<DialogueState>({
    text: "",
    displayed: "",
    active: false,
    isTyping: false,
  });
  const [bossDialogue, setBossDialogue] = useState<DialogueState>({
    text: "",
    displayed: "",
    active: false,
    isTyping: false,
  });

  useEffect(() => {
    if (!playerDialogue.text || !playerDialogue.active) return;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < playerDialogue.text.length) {
        const char = playerDialogue.text[idx];
        setPlayerDialogue((prev) => ({
          ...prev,
          displayed: playerDialogue.text.substring(0, idx + 1),
        }));
        soundSynth.playDialogueTick("player", char);
        idx++;
      } else {
        setPlayerDialogue((prev) => ({ ...prev, isTyping: false }));
        clearInterval(interval);

        setTimeout(() => {
          setPlayerDialogue((prev) => ({ ...prev, active: false }));
        }, 3000);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [playerDialogue.text, playerDialogue.active]);

  useEffect(() => {
    if (!bossDialogue.text || !bossDialogue.active) return;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < bossDialogue.text.length) {
        const char = bossDialogue.text[idx];
        setBossDialogue((prev) => ({
          ...prev,
          displayed: bossDialogue.text.substring(0, idx + 1),
        }));
        soundSynth.playDialogueTick("boss", char);
        idx++;
      } else {
        setBossDialogue((prev) => ({ ...prev, isTyping: false }));
        clearInterval(interval);

        setTimeout(() => {
          setBossDialogue((prev) => ({ ...prev, active: false }));
        }, 3000);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [bossDialogue.text, bossDialogue.active]);

  const triggerDialogue = useCallback((speaker: "player" | "boss", text: string) => {
    if (speaker === "player") {
      setPlayerDialogue({ text, displayed: "", active: true, isTyping: true });
    } else {
      setBossDialogue({ text, displayed: "", active: true, isTyping: true });
    }
  }, []);

  const resetDialogues = useCallback(() => {
    setPlayerDialogue({ text: "", displayed: "", active: false, isTyping: false });
    setBossDialogue({ text: "", displayed: "", active: false, isTyping: false });
  }, []);

  return {
    playerDialogue,
    bossDialogue,
    triggerDialogue,
    resetDialogues,
  };
}
`,"src/hooks/useMenuKeyboardNavigation.ts":`import { useEffect } from "react";
import type { Action } from "@/core/InputProvider";
import { soundSynth } from "@/core/SoundSynth";
import { isConfirmKey, isBackKey } from "@/core/menuNavigation";
import { useSessionStore } from "@/store/useGameStore";
import type { ScreenState } from "@/store/useGameStore";
import { screenConfigs, MenuContext } from "@/core/screenRoutes";
import type { AudioSettings } from "@/core/SettingsManager";

interface MenuCtxValues {
  navTo: (screen: ScreenState) => void;
  setMenuIndex: (index: number) => void;
  reloadSaveSlots: () => void;
  resetGameSession: () => void;
  handleSlotAction: (index: number, onPlay: () => void) => void;
  toggleCopyMode: () => void;
  toggleEraseMode: () => void;
  resetActions: () => void;
  audio: AudioSettings;
  handleVolumeChange: (field: keyof AudioSettings, value: number | boolean) => void;
  resetSettings: () => void;
}

export function useMenuKeyboardNavigation(
  menuCtxRef: React.MutableRefObject<MenuCtxValues>,
  setRebindTarget: (target: { action: Action; index: number } | null) => void,
  currentScreen: string,
  gameResult: string,
  rebindTarget: { action: Action; index: number } | null,
) {
  useEffect(() => {
    const cs = useSessionStore.getState();
    if ((cs.currentScreen === "PLAYING" && cs.gameResult === "PLAYING") || cs.currentScreen === "SOURCE_VIEW" || rebindTarget !== null)
      return;

    const handleMenuNavigation = (e: KeyboardEvent) => {
      const state = useSessionStore.getState();
      const ctx = menuCtxRef.current;
      const config = screenConfigs[state.currentScreen];
      if (!config) return;

      const context: MenuContext = {
        navTo: ctx.navTo,
        menuIndex: state.menuIndex,
        setMenuIndex: ctx.setMenuIndex,
        reloadSaveSlots: ctx.reloadSaveSlots,
        resetGameSession: ctx.resetGameSession,
        handleSlotAction: ctx.handleSlotAction,
        toggleCopyMode: ctx.toggleCopyMode,
        toggleEraseMode: ctx.toggleEraseMode,
        resetActions: ctx.resetActions,
        audio: ctx.audio,
        handleVolumeChange: ctx.handleVolumeChange,
        resetSettings: ctx.resetSettings,
        setRebindTarget,
        gameResult: state.gameResult,
      };

      const maxIndex = config.getMaxIndex(context);
      const isHorizontalEndScreen = state.currentScreen === "PLAYING" && state.gameResult !== "PLAYING";
      const isSoundSliderZone = state.currentScreen === "SOUND" && state.menuIndex < 3;

      const isMoveForward =
        e.key === "ArrowDown" ||
        e.code === "KeyS" ||
        (isHorizontalEndScreen && (e.key === "ArrowRight" || e.code === "KeyD")) ||
        (!isSoundSliderZone && !isHorizontalEndScreen && (e.key === "ArrowRight" || e.code === "KeyD"));

      const isMoveBackward =
        e.key === "ArrowUp" ||
        e.code === "KeyW" ||
        (isHorizontalEndScreen && (e.key === "ArrowLeft" || e.code === "KeyA")) ||
        (!isSoundSliderZone && !isHorizontalEndScreen && (e.key === "ArrowLeft" || e.code === "KeyA"));

      if (isMoveForward) {
        e.preventDefault();
        soundSynth.playSelectTick();
        ctx.setMenuIndex((state.menuIndex + 1) % (maxIndex + 1));
      } else if (isMoveBackward) {
        e.preventDefault();
        soundSynth.playSelectTick();
        ctx.setMenuIndex((state.menuIndex - 1 + (maxIndex + 1)) % (maxIndex + 1));
      } else if (isConfirmKey(e)) {
        e.preventDefault();
        config.onSelect(context);
      } else if (isBackKey(e)) {
        e.preventDefault();
        if (config.onBack) {
          config.onBack(context);
        }
      }

      if (
        isSoundSliderZone &&
        (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.code === "KeyA" || e.code === "KeyD")
      ) {
        if (config.onHorizontal) {
          e.preventDefault();
          const direction = e.key === "ArrowRight" || e.code === "KeyD" ? 1 : -1;
          config.onHorizontal(direction, context);
        }
      }
    };

    window.addEventListener("keydown", handleMenuNavigation);
    return () => {
      window.removeEventListener("keydown", handleMenuNavigation);
    };
  }, [currentScreen, rebindTarget, gameResult, menuCtxRef, setRebindTarget]);
}
`,"src/hooks/useMusicLifecycle.ts":`import { useEffect } from "react";
import { soundSynth } from "@/core/SoundSynth";

export function useMusicLifecycle(isPlayingScreen: boolean) {
  useEffect(() => {
    if (isPlayingScreen) {
      soundSynth.stopMusic();
    } else {
      soundSynth.setCabinetMuffle(true);
      if (soundSynth.hasUserGestured) {
        soundSynth.startMusic();
      }
    }
  }, [isPlayingScreen]);
}
`,"src/hooks/useRebindCapture.ts":`import { useEffect } from "react";
import { Action } from "@/core/InputProvider";
import { soundSynth } from "@/core/SoundSynth";
import { settingsManager } from "@/core/SettingsManager";

export function useRebindCapture(
  rebindTarget: { action: Action; index: number } | null,
  setRebindTarget: (target: null) => void,
  reloadSaveSlots: () => void
) {
  useEffect(() => {
    if (!rebindTarget) return;

    const handleRebindCapture = (e: KeyboardEvent) => {
      e.preventDefault();
      soundSynth.playHitConfirm();
      settingsManager.remapKey(rebindTarget.action, rebindTarget.index, e.code);
      setRebindTarget(null);
      reloadSaveSlots();
    };

    window.addEventListener("keydown", handleRebindCapture);
    return () => {
      window.removeEventListener("keydown", handleRebindCapture);
    };
  }, [rebindTarget, setRebindTarget, reloadSaveSlots]);
}
`,"src/hooks/useSaveSlots.ts":`import { useState } from "react";
import { saveManager, SaveSlotData } from "@/core/SaveManager";
import { soundSynth } from "@/core/SoundSynth";

export function useSaveSlots() {
  const [slots, setSlots] = useState<SaveSlotData[]>(() => saveManager.getSlots());
  const [copySourceIndex, setCopySourceIndex] = useState<number>(-1);
  const [isCopyMode, setIsCopyMode] = useState<boolean>(false);
  const [isEraseMode, setIsEraseMode] = useState<boolean>(false);

  const reloadSaveSlots = () => {
    setSlots(saveManager.getSlots());
  };

  const handleSlotAction = (index: number, onPlay: () => void) => {
    if (isEraseMode) {
      saveManager.eraseSlot(index);
      setIsEraseMode(false);
      soundSynth.playErrorTick();
      reloadSaveSlots();
      return;
    }

    if (isCopyMode) {
      if (copySourceIndex === -1) {
        if (slots[index]?.empty) {
          soundSynth.playErrorTick();
          return;
        }
        setCopySourceIndex(index);
        soundSynth.playSelectTick();
      } else {
        if (index === copySourceIndex) {
          soundSynth.playErrorTick();
          return;
        }
        saveManager.copySlot(copySourceIndex, index);
        setCopySourceIndex(-1);
        setIsCopyMode(false);
        soundSynth.playSelectTick();
        reloadSaveSlots();
      }
      return;
    }

    saveManager.selectSlot(index);
    soundSynth.playHitConfirm();
    onPlay();
  };

  const toggleCopyMode = () => {
    soundSynth.playSelectTick();
    setIsCopyMode(!isCopyMode);
    setCopySourceIndex(-1);
    setIsEraseMode(false);
  };

  const toggleEraseMode = () => {
    soundSynth.playSelectTick();
    setIsEraseMode(!isEraseMode);
    setIsCopyMode(false);
  };

  const resetActions = () => {
    setIsCopyMode(false);
    setIsEraseMode(false);
    setCopySourceIndex(-1);
  };

  return {
    slots,
    copySourceIndex,
    isCopyMode,
    isEraseMode,
    reloadSaveSlots,
    handleSlotAction,
    toggleCopyMode,
    toggleEraseMode,
    resetActions,
  };
}
`,"src/hooks/useSourceViewKeyboard.ts":`import { useEffect } from "react";
import { soundSynth } from "@/core/SoundSynth";
import { isConfirmKey, isBackKey } from "@/core/menuNavigation";
import { FileNode } from "@/components/menus/SourceViewScreen";

interface UseSourceViewKeyboardOptions {
  visibleNodes: FileNode[];
  activeIndex: number;
  setActiveIndex: (index: number | ((prev: number) => number)) => void;
  expandedDirs: Record<string, boolean>;
  setExpandedDirs: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
  setSelectedFile: (path: string) => void;
  onBack: () => void;
  isMobile: boolean;
  mobileView: "TOC" | "CODE";
  setMobileView: (view: "TOC" | "CODE") => void;
  handleDownload: () => void;
}

export function useSourceViewKeyboard({
  visibleNodes,
  activeIndex,
  setActiveIndex,
  expandedDirs,
  setExpandedDirs,
  setSelectedFile,
  onBack,
  isMobile,
  mobileView,
  setMobileView,
  handleDownload,
}: UseSourceViewKeyboardOptions) {
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (visibleNodes.length === 0) return;

      if (isMobile && mobileView === "CODE") {
        if (isBackKey(e) || e.code === "ArrowLeft" || e.code === "KeyA") {
          e.preventDefault();
          soundSynth.playSelectTick();
          setMobileView("TOC");
          return;
        }
      }

      const node = visibleNodes[activeIndex < visibleNodes.length ? activeIndex : 0];

      if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        soundSynth.playSelectTick();
        setActiveIndex((prev) => {
          if (prev >= visibleNodes.length) {
            if (prev === visibleNodes.length + 2) return 0;
            return prev + 1;
          }
          if (prev === visibleNodes.length - 1) return visibleNodes.length;
          return prev + 1;
        });
      } else if (e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        soundSynth.playSelectTick();
        setActiveIndex((prev) => {
          if (prev >= visibleNodes.length) {
            if (prev === visibleNodes.length) return visibleNodes.length - 1;
            return prev - 1;
          }
          if (prev === 0) return visibleNodes.length + 2;
          return prev - 1;
        });
      } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        e.preventDefault();
        soundSynth.playSelectTick();
        if (activeIndex < visibleNodes.length) {
          if (node.isDir && !expandedDirs[node.path]) {
            setExpandedDirs((prev) => ({ ...prev, [node.path]: true }));
          }
        } else {
          setActiveIndex((prev) => {
            if (prev === visibleNodes.length + 2) return 0;
            return prev + 1;
          });
        }
      } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        e.preventDefault();
        soundSynth.playSelectTick();
        if (activeIndex < visibleNodes.length) {
          if (node.isDir && expandedDirs[node.path]) {
            setExpandedDirs((prev) => ({ ...prev, [node.path]: false }));
          } else {
            const parts = node.path.split("/");
            if (parts.length > 1) {
              const parentPath = parts.slice(0, -1).join("/");
              const parentIdx = visibleNodes.findIndex((n) => n.isDir && n.path === parentPath);
              if (parentIdx !== -1) {
                setActiveIndex(parentIdx);
                return;
              }
            }
            setActiveIndex(visibleNodes.length + 2);
          }
        } else {
          setActiveIndex((prev) => {
            if (prev === visibleNodes.length) return visibleNodes.length - 1;
            return prev - 1;
          });
        }
      } else if (isConfirmKey(e)) {
        e.preventDefault();
        if (activeIndex < visibleNodes.length) {
          soundSynth.playHitConfirm();
          if (node.isDir) {
            setExpandedDirs((prev) => ({
              ...prev,
              [node.path]: !prev[node.path],
            }));
          } else {
            setSelectedFile(node.path);
            if (isMobile) setMobileView("CODE");
          }
        } else if (activeIndex === visibleNodes.length) {
          soundSynth.playHitConfirm();
          window.open("https://github.com/stevencasteel/BOX-BATTLE", "_blank");
        } else if (activeIndex === visibleNodes.length + 1) {
          handleDownload();
        } else if (activeIndex === visibleNodes.length + 2) {
          soundSynth.playErrorTick();
          onBack();
        }
      } else if (isBackKey(e)) {
        e.preventDefault();
        if (activeIndex < visibleNodes.length) {
          if (node.isDir && expandedDirs[node.path]) {
            soundSynth.playErrorTick();
            setExpandedDirs((prev) => ({ ...prev, [node.path]: false }));
          } else {
            soundSynth.playSelectTick();
            setActiveIndex(visibleNodes.length + 2);
          }
        } else {
          if (activeIndex === visibleNodes.length + 2) {
            soundSynth.playErrorTick();
            onBack();
          } else {
            soundSynth.playSelectTick();
            setActiveIndex(visibleNodes.length + 2);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [
    visibleNodes,
    activeIndex,
    expandedDirs,
    onBack,
    isMobile,
    mobileView,
    setActiveIndex,
    setExpandedDirs,
    setSelectedFile,
    setMobileView,
    handleDownload,
  ]);
}
`,"src/index.css":`@import "tailwindcss";

@theme {
  --animate-overlay-fade-in: overlay-fade-in 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  
  @keyframes overlay-fade-in {
    0% {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    100% {
      opacity: 1;
      backdrop-filter: blur(12px);
    }
  }
}

:root {
  --void-bg: #07080b;
  --surface-bg: #0c0e12;
  --surface-elevated: #141820;
  --surface-highlight: #1d222d;
  --signal-green: #22c55e;
  --signal-green-glow: rgba(34, 197, 94, 0.45);
  --signal-red: #ef4444;
  --signal-red-glow: rgba(239, 68, 68, 0.45);
  --signal-yellow: #eab308;
  --signal-yellow-glow: rgba(234, 179, 8, 0.45);

  --shadow-light: -4px -4px 12px rgba(255, 255, 255, 0.03);
  --shadow-dark: 6px 6px 18px rgba(0, 0, 0, 0.75);
  --shadow-inset-light: inset -2px -2px 6px rgba(255, 255, 255, 0.01);
  --shadow-inset-dark: inset 3px 3px 10px rgba(0, 0, 0, 0.9);

  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left: env(safe-area-inset-left, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
}

html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background-color: #050505;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}

body {
  background-color: var(--void-bg);
  font-family: "SF Mono", Monaco, Consolas, monospace;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: var(--surface-bg);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: var(--signal-green);
  border-radius: 2px;
  box-shadow: 0 0 6px var(--signal-green-glow);
}

::-webkit-scrollbar-thumb:hover {
  background: #4ade80;
}

@media (pointer: fine) {
  *,
  *::before,
  *::after,
  html, body, #root,
  iframe, canvas, video, svg, path,
  :hover, :focus, :active,
  ::backdrop {
    cursor: none !important;
  }
}

.code-viewer-pane,
.code-viewer-pane * {
  -webkit-user-select: text !important;
  user-select: text !important;
}
`,"src/main.tsx":`import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GauntletDirector } from "@/core/GauntletDirector";

GauntletDirector.init();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,"src/store/useCursorStore.ts":`import { create } from "zustand";

export type CursorType =
  | "default"
  | "text"
  | "view"
  | "view-small"
  | "play"
  | "video"
  | "grab"
  | "button"
  | "hidden";

interface CursorStore {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  cursorType: "default",
  setCursorType: (type) => set({ cursorType: type }),
}));
`,"src/store/useGameStore.ts":`import { create } from "zustand";
import { UNITS } from "@/core/Units";

export type ScreenState =
  | "TITLE"
  | "SAVE_SELECT"
  | "OPTIONS"
  | "SOUND"
  | "CONTROLS"
  | "CREDITS"
  | "SOURCE_VIEW"
  | "PLAYING";
export type GameResultState = "PLAYING" | "GAMEOVER" | "VICTORY";

export const SCREEN_DEPTHS: Record<ScreenState, number> = {
  TITLE: 0,
  SAVE_SELECT: 1,
  OPTIONS: 1,
  CREDITS: 1,
  SOURCE_VIEW: 1,
  SOUND: 2,
  CONTROLS: 2,
  PLAYING: 2,
};

interface SessionState {
  currentScreen: ScreenState;
  menuIndex: number;
  gameResult: GameResultState;
  retryCount: number;
  transitionActive: "SHUTDOWN" | "POWER_ON" | "NONE";
  currentStageIndex: number;
  setCurrentStageIndex: (index: number) => void;
  navTo: (screen: ScreenState) => void;
  setMenuIndex: (index: number) => void;
  setGameResult: (result: GameResultState) => void;
  incrementRetry: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  currentScreen: "TITLE",
  menuIndex: 0,
  gameResult: "PLAYING",
  retryCount: 0,
  transitionActive: "NONE",
  currentStageIndex: 0,
  setCurrentStageIndex: (index) => set({ currentStageIndex: index }),
  navTo: (screen) => {
    const current = get().currentScreen;
    if (current === screen && screen !== "PLAYING") return;

    const needsTransition = screen === "PLAYING" || current === "PLAYING";

    if (needsTransition) {
      set({ transitionActive: "SHUTDOWN" });
      setTimeout(() => {
        set((state) => ({
          currentScreen: screen,
          menuIndex: 0,
          gameResult: "PLAYING",
          retryCount: screen === "PLAYING" ? state.retryCount + 1 : state.retryCount,
          transitionActive: "POWER_ON",
        }));

        setTimeout(() => {
          set({ transitionActive: "NONE" });
        }, 400);
      }, 450);
    } else {
      set({
        currentScreen: screen,
        menuIndex: 0,
        gameResult: "PLAYING",
        transitionActive: "NONE",
      });
    }
  },
  setMenuIndex: (index) => set({ menuIndex: index }),
  setGameResult: (result) => set({ gameResult: result }),
  incrementRetry: () => set((state) => ({ retryCount: state.retryCount + 1 })),
}));

interface GameplayState {
  playerHP: number;
  bossHP: number;
  healingCharges: number;
  determination: number;
  isGlitching: boolean;
  bossDeathCoordinates: { x: number; y: number } | null;
  setPlayerHP: (hp: number) => void;
  setBossHP: (hp: number) => void;
  setHealingCharges: (charges: number) => void;
  setDetermination: (determination: number) => void;
  triggerGlitch: (duration?: number) => void;
  triggerBossDefeat: (x: number, y: number) => void;
  resetGameSession: () => void;
  comboCounter: number;
  incrementCombo: () => void;
  resetCombo: () => void;
}

export const useGameplayStore = create<GameplayState>((set, get) => ({
  playerHP: UNITS.PLAYER_MAX_HP,
  bossHP: UNITS.BOSS_MAX_HP,
  healingCharges: 0,
  determination: 0,
  isGlitching: false,
  bossDeathCoordinates: null,
  comboCounter: 0,
  incrementCombo: () => set((state) => ({ comboCounter: state.comboCounter + 1 })),
  resetCombo: () => set({ comboCounter: 0 }),
  setPlayerHP: (hp) => {
    const current = get().playerHP;
    if (hp !== current) {
      set({ playerHP: hp });
      if (hp < current) {
        get().triggerGlitch(150);
        get().resetCombo();
      }
    }
  },
  setBossHP: (hp) => {
    if (hp !== get().bossHP) {
      set({ bossHP: hp });
    }
  },
  setHealingCharges: (charges) => {
    if (charges !== get().healingCharges) {
      set({ healingCharges: charges });
    }
  },
  setDetermination: (det) => {
    if (det !== get().determination) {
      set({ determination: det });
    }
  },
  triggerGlitch: (duration = 150) => {
    set({ isGlitching: true });
    setTimeout(() => {
      set({ isGlitching: false });
    }, duration);
  },
  triggerBossDefeat: (x, y) => {
    set({ bossDeathCoordinates: { x, y } });
  },
  resetGameSession: () => {
    set({
      playerHP: UNITS.PLAYER_MAX_HP,
      bossHP: UNITS.BOSS_MAX_HP,
      healingCharges: 0,
      determination: 0,
      isGlitching: false,
      bossDeathCoordinates: null,
      comboCounter: 0,
    });
  },
}));
`,"src/store/useTutorialStore.ts":`import { create } from "zustand";
import { Action } from "@/core/InputProvider";

interface TutorialState {
  tutorialStep: number;
  calibratedKeys: Record<Action, boolean>;
  setTutorialStep: (step: number) => void;
  calibrateKey: (action: Action) => void;
  resetTutorial: () => void;
}

export const useTutorialStore = create<TutorialState>((set) => ({
  tutorialStep: 0,
  calibratedKeys: {
    MOVE_LEFT: false,
    MOVE_RIGHT: false,
    MOVE_UP: false,
    MOVE_DOWN: false,
    JUMP: false,
    ATTACK: false,
    DASH: false,
  },
  setTutorialStep: (step) => set({ tutorialStep: step }),
  calibrateKey: (action) =>
    set((state) => ({
      calibratedKeys: {
        ...state.calibratedKeys,
        [action]: true,
      },
    })),
  resetTutorial: () =>
    set({
      tutorialStep: 0,
      calibratedKeys: {
        MOVE_LEFT: false,
        MOVE_RIGHT: false,
        MOVE_UP: false,
        MOVE_DOWN: false,
        JUMP: false,
        ATTACK: false,
        DASH: false,
      },
    }),
}));
`,"src/styles/neumorphism.css":`.neo-elevated {
  background: var(--surface-elevated);
  box-shadow: var(--shadow-light), var(--shadow-dark);
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.neo-pressed {
  background: var(--surface-bg);
  box-shadow: var(--shadow-inset-light), var(--shadow-inset-dark);
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.neo-btn {
  background: var(--surface-elevated);
  box-shadow: var(--shadow-light), var(--shadow-dark);
  border: 1px solid rgba(255, 255, 255, 0.02);
  color: #a0aec0;
  padding: 16px 32px;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease, color 0.12s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  -webkit-tap-highlight-color: transparent;
}

.neo-btn:hover {
  background: var(--surface-highlight);
  color: #ffffff;
}

.neo-btn:active {
  transform: scale(0.97);
  background: var(--surface-bg);
}

.neo-btn-focused {
  background: var(--surface-bg);
  box-shadow: var(--shadow-inset-light), var(--shadow-inset-dark);
  color: var(--signal-green);
  border-color: rgba(34, 197, 94, 0.25);
  text-shadow: 0 0 8px var(--signal-green-glow);
}

.title-screen-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 4px 18px;
  position: relative;
}

.title-grid-overlay {
  position: absolute;
  inset: 0;
  background-size: 24px 24px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  pointer-events: none;
  z-index: 1;
}

.title-screen-header {
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2px;
}

.system-tag {
  font-size: 10px;
  color: #4a5568;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 4px 10px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.2);
}

.title-banner-overhauled {
  text-align: center;
  margin-top: 2px;
  width: 100%;
}

.title-banner-overhauled h1 {
  font-size: 26px;
  margin: 0;
  letter-spacing: 0.22em;
  font-weight: 900;
  color: #ffffff;
  text-shadow:
    0 4px 20px rgba(0, 0, 0, 0.95),
    0 0 10px rgba(255, 255, 255, 0.05);
  text-transform: uppercase;
}

.title-subtitle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-top: 2px;
}

.subtitle-line {
  height: 1px;
  flex-grow: 1;
  max-width: 60px;
  background: linear-gradient(to right, transparent, var(--signal-green), transparent);
}

.subtitle-text {
  font-size: 10px;
  color: var(--signal-green);
  margin: 0;
  letter-spacing: 0.35em;
  font-weight: bold;
  text-shadow: 0 0 8px var(--signal-green-glow);
}

.title-screen-center {
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.btn-container-overhauled {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.neo-btn-large {
  display: flex;
  align-items: center;
  position: relative;
  background: #0f1218;
  box-shadow:
    -4px -4px 10px rgba(255, 255, 255, 0.015),
    6px 6px 15px rgba(0, 0, 0, 0.8),
    inset 1px 1px 0px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 16px 24px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
  outline: none;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
}

.neo-btn-large:hover,
.neo-btn-large-focused {
  background: #0c0e12;
  border-color: var(--signal-green);
  box-shadow:
    0 0 15px rgba(34, 197, 94, 0.15),
    inset 0 0 8px rgba(34, 197, 94, 0.1),
    6px 6px 18px rgba(0, 0, 0, 0.95);
}

.neo-btn-large:active {
  transform: scale(0.98);
}

.neo-btn-large .btn-indicator-light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1e2430;
  margin-right: 18px;
  transition: background 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.neo-btn-large:hover .btn-indicator-light,
.neo-btn-large-focused .btn-indicator-light {
  background: var(--signal-green);
  box-shadow:
    0 0 10px var(--signal-green),
    0 0 20px var(--signal-green-glow);
}

.btn-label-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;
}

.btn-main-label {
  font-size: 13px;
  font-weight: 800;
  color: #a0aec0;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: color 0.15s ease;
  white-space: nowrap;
}

.neo-btn-large:hover .btn-main-label,
.neo-btn-large-focused .btn-main-label {
  color: #ffffff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

.btn-sub-label {
  font-size: 9px;
  font-weight: 500;
  color: #4a5568;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.15s ease;
  white-space: pre-line;
  line-height: 1.4;
}

.neo-btn-large:hover .btn-sub-label,
.neo-btn-large-focused .btn-sub-label {
  color: var(--signal-green);
  opacity: 0.85;
}

.cursor-arrow-large {
  position: absolute;
  right: 24px;
  color: var(--signal-green);
  font-size: 14px;
  font-weight: bold;
  animation: arrow-blink 0.4s infinite alternate;
  top: 50%;
  transform: translateY(-50%);
  line-height: 1;
  display: flex;
  align-items: center;
}

.cursor-arrow {
  position: absolute;
  right: 24px;
  width: 10px;
  height: 10px;
  color: var(--signal-green);
  animation: arrow-blink 0.4s infinite alternate;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes arrow-blink {
  0% {
    opacity: 0.3;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1.15);
  }
}

.title-screen-footer {
  z-index: 2;
  width: 100%;
  margin-top: 8px;
}

.footer-deco-line {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.05) 80%,
    transparent
  );
  width: 100%;
  margin-bottom: 6px;
}

.footer-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 8px;
  color: #4a5568;
  letter-spacing: 0.15em;
  padding: 0 12px;
  text-transform: uppercase;
}

.footer-center-prompt {
  color: #718096;
  font-weight: bold;
}

.neo-btn-led {
  display: flex;
  align-items: center;
  position: relative;
  background: #0f1218;
  box-shadow:
    -4px -4px 10px rgba(255, 255, 255, 0.015),
    6px 6px 15px rgba(0, 0, 0, 0.8),
    inset 1px 1px 0px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 12px 24px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
  outline: none;
  -webkit-tap-highlight-color: transparent;
  gap: 12px;
  color: #a0aec0;
  justify-content: flex-start;
}

.neo-btn-led:hover,
.neo-btn-led-focused {
  background: #0c0e12;
  border-color: var(--signal-green);
  box-shadow:
    0 0 15px rgba(34, 197, 94, 0.15),
    inset 0 0 8px rgba(34, 197, 94, 0.1),
    6px 6px 18px rgba(0, 0, 0, 0.95);
  color: #ffffff;
  text-shadow: 0 0 8px var(--signal-green-glow);
}

.neo-btn-led:active {
  transform: scale(0.98);
}

.neo-btn-led .btn-indicator-light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1e2430;
  transition: all 0.15s ease;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.neo-btn-led:hover .btn-indicator-light,
.neo-btn-led-focused .btn-indicator-light {
  background: var(--signal-green);
  box-shadow:
    0 0 10px var(--signal-green),
    0 0 20px var(--signal-green-glow);
}

.neo-btn-led-active {
  background: #0c0e12;
  border-color: var(--signal-yellow) !important;
  box-shadow:
    0 0 15px rgba(234, 179, 8, 0.15),
    inset 0 0 8px rgba(234, 179, 8, 0.1),
    6px 6px 18px rgba(0, 0, 0, 0.95) !important;
  color: #ffffff !important;
}

.neo-btn-led-active .btn-indicator-light {
  background: var(--signal-yellow) !important;
  box-shadow:
    0 0 10px var(--signal-yellow),
    0 0 20px var(--signal-yellow-glow) !important;
}

.led-dot {
  width: 10px;
  height: 10px;
  border-radius: 25%;
  transition: all 0.2s ease;
}

.led-green {
  background: var(--signal-green);
  box-shadow:
    0 0 8px var(--signal-green),
    0 0 16px var(--signal-green-glow);
}

.led-red {
  background: var(--signal-red);
  box-shadow:
    0 0 8px var(--signal-red),
    0 0 16px var(--signal-red-glow);
}

.led-yellow {
  background: var(--signal-yellow);
  box-shadow:
    0 0 8px var(--signal-yellow),
    0 0 16px var(--signal-yellow-glow);
}

.custom-range-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: var(--surface-bg);
  box-shadow: var(--shadow-inset-light), var(--shadow-inset-dark);
  outline: none;
  margin: 8px 0;
  border: 1px solid rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.custom-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 18px;
  border-radius: 4px;
  background: var(--surface-elevated);
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow:
    -2px -2px 6px rgba(255, 255, 255, 0.01),
    4px 4px 10px rgba(0, 0, 0, 0.8),
    inset 1px 1px 0px rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition:
    transform 0.1s ease,
    border-color 0.1s ease;
}

.custom-range-slider:focus::-webkit-slider-thumb,
.custom-range-slider::-webkit-slider-thumb:hover {
  border-color: var(--signal-green);
  transform: scale(1.08);
}

.custom-range-slider::-moz-range-thumb {
  width: 16px;
  height: 18px;
  border-radius: 4px;
  background: var(--surface-elevated);
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow:
    -2px -2px 6px rgba(255, 255, 255, 0.01),
    4px 4px 10px rgba(0, 0, 0, 0.8),
    inset 1px 1px 0px rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition:
    transform 0.1s ease,
    border-color 0.1s ease;
}

.custom-range-slider:focus::-moz-range-thumb,
.custom-range-slider::-moz-range-thumb:hover {
  border-color: var(--signal-green);
  transform: scale(1.08);
}

.custom-range-slider::-moz-range-progress {
  background: var(--signal-green);
  height: 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-right: none;
}

@keyframes led-wobble {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(1px, -1px) scale(1.15); filter: brightness(1.2) drop-shadow(0 0 6px var(--signal-yellow-glow)); }
  100% { transform: translate(0, 0) scale(1); }
}

.led-overflow-wobble {
  animation: led-wobble 0.6s infinite alternate ease-in-out;
}

.cursor-arrow-large {
  position: absolute !important;
  right: 24px !important;
  width: 14px !important;
  height: 14px !important;
  color: var(--signal-green) !important;
  animation: arrow-blink 0.4s infinite alternate !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-left: 0 !important;
  margin-top: 0 !important;
}

.cursor-arrow {
  position: absolute !important;
  right: 24px !important;
  width: 10px !important;
  height: 10px !important;
  color: var(--signal-green) !important;
  animation: arrow-blink 0.4s infinite alternate !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-left: 0 !important;
  margin-top: 0 !important;
}

@keyframes stress-shiver {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-1.2px, 0.8px); filter: brightness(1.2); }
  40% { transform: translate(1.2px, -0.8px); }
  60% { transform: translate(-0.8px, -1.2px); }
  80% { transform: translate(0.8px, 1.2px); }
}

.hud-stress-shiver {
  animation: stress-shiver 0.12s infinite linear !important;
}

@keyframes led-squash-spring {
  0% { transform: scale(1); }
  25% { transform: scale(1.18, 0.82); filter: brightness(1.2); }
  60% { transform: scale(0.92, 1.08); }
  100% { transform: scale(1); }
}
.led-spring-impact {
  animation: led-squash-spring 0.38s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

@keyframes led-elastic-pop {
  0% { transform: scale(0.3); opacity: 0; }
  55% { transform: scale(1.35); filter: brightness(1.3); }
  80% { transform: scale(0.95); }
  100% { transform: scale(1); opacity: 1; }
}
.led-elastic-spring {
  animation: led-elastic-pop 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
}
`};function v({visibleNodes:e,activeIndex:t,setActiveIndex:n,expandedDirs:r,setExpandedDirs:i,setSelectedFile:a,onBack:o,isMobile:s,mobileView:c,setMobileView:l,handleDownload:u}){(0,g.useEffect)(()=>{let p=p=>{if(e.length===0)return;if(s&&c===`CODE`&&(m(p)||p.code===`ArrowLeft`||p.code===`KeyA`)){p.preventDefault(),d.playSelectTick(),l(`TOC`);return}let h=e[t<e.length?t:0];if(p.code===`ArrowDown`||p.code===`KeyS`)p.preventDefault(),d.playSelectTick(),n(t=>t>=e.length?t===e.length+2?0:t+1:t===e.length-1?e.length:t+1);else if(p.code===`ArrowUp`||p.code===`KeyW`)p.preventDefault(),d.playSelectTick(),n(t=>t>=e.length?t===e.length?e.length-1:t-1:t===0?e.length+2:t-1);else if(p.code===`ArrowRight`||p.code===`KeyD`)p.preventDefault(),d.playSelectTick(),t<e.length?h.isDir&&!r[h.path]&&i(e=>({...e,[h.path]:!0})):n(t=>t===e.length+2?0:t+1);else if(p.code===`ArrowLeft`||p.code===`KeyA`)if(p.preventDefault(),d.playSelectTick(),t<e.length)if(h.isDir&&r[h.path])i(e=>({...e,[h.path]:!1}));else{let t=h.path.split(`/`);if(t.length>1){let r=t.slice(0,-1).join(`/`),i=e.findIndex(e=>e.isDir&&e.path===r);if(i!==-1){n(i);return}}n(e.length+2)}else n(t=>t===e.length?e.length-1:t-1);else f(p)?(p.preventDefault(),t<e.length?(d.playHitConfirm(),h.isDir?i(e=>({...e,[h.path]:!e[h.path]})):(a(h.path),s&&l(`CODE`))):t===e.length?(d.playHitConfirm(),window.open(`https://github.com/stevencasteel/BOX-BATTLE`,`_blank`)):t===e.length+1?u():t===e.length+2&&(d.playErrorTick(),o())):m(p)&&(p.preventDefault(),t<e.length?h.isDir&&r[h.path]?(d.playErrorTick(),i(e=>({...e,[h.path]:!1}))):(d.playSelectTick(),n(e.length+2)):t===e.length+2?(d.playErrorTick(),o()):(d.playSelectTick(),n(e.length+2)))};return window.addEventListener(`keydown`,p),()=>window.removeEventListener(`keydown`,p)},[e,t,r,o,s,c,n,i,a,l,u])}var y=u();function b(){return(0,y.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`18`,height:`18`,stroke:`currentColor`,strokeWidth:`2.5`,fill:`none`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,y.jsx)(`path`,{d:`M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22`})})}function x({onBack:e,isMobile:t,activeIndex:n,visibleNodesLength:r,setActiveIndex:i}){let s=()=>{d.playHitConfirm();let e=document.createElement(`a`);e.href=`./boxbattle_source_code.txt`,e.download=`boxbattle_source_code.txt`,document.body.appendChild(e),e.click(),document.body.removeChild(e)};return t?(0,y.jsxs)(`div`,{className:`source-view-footer`,style:{display:`flex`,flexDirection:`row`,gap:`8px`,width:`100%`,boxSizing:`border-box`,marginTop:`12px`,flexShrink:0},children:[(0,y.jsx)(`div`,{style:{flex:1,display:`flex`},children:(0,y.jsx)(`button`,{onClick:()=>window.open(`https://github.com/stevencasteel/BOX-BATTLE`,`_blank`),className:`neo-btn`,style:{width:`100%`,padding:`12px`,fontSize:`12px`,display:`flex`,alignItems:`center`,justifyContent:`center`,boxSizing:`border-box`},children:(0,y.jsx)(b,{})})}),(0,y.jsx)(`div`,{style:{flex:1,display:`flex`},children:(0,y.jsx)(`button`,{onClick:s,className:`neo-btn`,style:{width:`100%`,padding:`12px`,fontSize:`12px`,boxSizing:`border-box`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,y.jsx)(a,{size:18,strokeWidth:2.5,style:{flexShrink:0}})})}),(0,y.jsx)(`div`,{style:{flex:1,display:`flex`},children:(0,y.jsx)(`button`,{onClick:e,className:`neo-btn`,style:{width:`100%`,padding:`12px`,fontSize:`12px`,boxSizing:`border-box`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,y.jsx)(o,{size:18,strokeWidth:2.5,style:{flexShrink:0}})})})]}):(0,y.jsxs)(`div`,{className:`source-view-footer`,style:{display:`flex`,flexDirection:`row`,gap:`16px`,width:`100%`,height:`8.5vmin`,boxSizing:`border-box`,marginTop:`12px`,flexShrink:0},children:[(0,y.jsx)(h,{isFocused:n===r,onFocused:()=>i(r),onClick:()=>window.open(`https://github.com/stevencasteel/BOX-BATTLE`,`_blank`),leftIcon:(0,y.jsx)(b,{}),mainLabel:`GITHUB`,subLabel:`OPEN SOURCE`,showArrow:!1,style:{flex:1,height:`100%`,boxSizing:`border-box`}}),(0,y.jsx)(h,{isFocused:n===r+1,onFocused:()=>i(r+1),onClick:s,leftIcon:(0,y.jsx)(a,{size:18,strokeWidth:2.5,style:{flexShrink:0}}),mainLabel:`DOWNLOAD .TXT`,subLabel:`SINGLE FILE FOR LLM CHAT`,showArrow:!1,style:{flex:1,height:`100%`,boxSizing:`border-box`}}),(0,y.jsx)(h,{isFocused:n===r+2,onFocused:()=>i(r+2),onClick:e,leftIcon:(0,y.jsx)(o,{size:18,strokeWidth:2.5,style:{flexShrink:0}}),mainLabel:`BACK`,showArrow:!1,style:{flex:1,height:`100%`,boxSizing:`border-box`}})]})}function S(e){let t={name:`root`,path:``,isDir:!0,children:[],depth:-1};e.forEach(e=>{let n=e.split(`/`),r=t;n.forEach((t,i)=>{let a=i<n.length-1,o=n.slice(0,i+1).join(`/`),s=r.children.find(e=>e.name===t);s||(s={name:t,path:a?o:e,isDir:a,children:[],depth:i},r.children.push(s)),r=s})});let n=e=>{e.children.sort((e,t)=>e.isDir&&!t.isDir?-1:!e.isDir&&t.isDir?1:e.name.localeCompare(t.name)),e.children.forEach(n)};return n(t),t}function C(e,t,n=[]){return e.depth===-1?(e.children.forEach(e=>C(e,t,n)),n):(n.push(e),e.isDir&&t[e.path]&&e.children.forEach(e=>C(e,t,n)),n)}function w(e){let t=e.split(`.`).pop()||``;return t===`tsx`?`tsx`:t===`ts`?`typescript`:t===`js`||t===`jsx`?`javascript`:t===`css`?`css`:t===`json`?`json`:t===`md`?`markdown`:`text`}function T({onBack:e}){let[n]=(0,g.useState)(_),[a,o]=(0,g.useState)({src:!0,"src/components":!0,"src/core":!0}),[u,f]=(0,g.useState)((0,g.useMemo)(()=>Object.keys(_).sort(),[])[0]||``),[m,h]=(0,g.useState)(!1),[b,T]=(0,g.useState)(`TOC`),E=(0,g.useRef)(null),D=(0,g.useMemo)(()=>S(Object.keys(_)),[]),O=(0,g.useMemo)(()=>D?C(D,a):[],[D,a]),[k,A]=(0,g.useState)(0);return v({visibleNodes:O,activeIndex:k,setActiveIndex:A,expandedDirs:a,setExpandedDirs:o,setSelectedFile:f,onBack:e,isMobile:m,mobileView:b,setMobileView:T,handleDownload:()=>{d.playHitConfirm();let e=document.createElement(`a`);e.href=`./boxbattle_source_code.txt`,e.download=`boxbattle_source_code.txt`,document.body.appendChild(e),e.click(),document.body.removeChild(e)}}),(0,g.useEffect)(()=>{if(typeof window<`u`){let e=()=>{h(window.innerWidth<=800)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)}},[]),(0,g.useEffect)(()=>{if(k<O.length){let e=E.current?.querySelector(`.file-item-active`);e&&e.scrollIntoView({block:`nearest`,behavior:`smooth`})}},[k,O.length]),(0,y.jsxs)(`div`,{className:`flex-col h-full w-full`,style:{justifyContent:`space-between`,boxSizing:`border-box`,padding:`16px 12px`},children:[(0,y.jsxs)(`div`,{className:`title-banner`,style:{marginTop:`0`,paddingTop:`0`},children:[(0,y.jsx)(`h2`,{style:{fontSize:`1.8rem`,margin:0,fontWeight:`bold`,textTransform:`uppercase`,letterSpacing:`0.15em`,color:`#fff`},children:`SOURCE BROWSER`}),(0,y.jsx)(`p`,{style:{color:`#718096`,margin:`4px 0 0`,fontSize:`11px`,letterSpacing:`0.15em`},children:m?b===`TOC`?`TAP FILE TO VIEW  •  DRAG TO SCROLL`:`SWIPE TO SCROLL  •  TAP BUTTON TO EXIT CODE`:`UP/DOWN/LEFT/RIGHT: NAVIGATE  •  JUMP: ENTER/OPEN  •  ATTACK/DASH: EXIT`})]}),(0,y.jsxs)(`div`,{className:`source-view-workspace`,children:[(!m||b===`TOC`)&&(0,y.jsx)(`div`,{ref:E,className:`directory-tree-pane neo-pressed`,style:{WebkitOverflowScrolling:`touch`,width:m?`100%`:`24%`,height:m?`100%`:``},children:O.map((e,t)=>{let n=t===k,r=e.isDir&&!!a[e.path],p=!e.isDir&&e.path===u;return(0,y.jsxs)(`div`,{className:n?`file-item-active`:``,onClick:()=>{d.playSelectTick(),A(t),e.isDir?o(t=>({...t,[e.path]:!t[e.path]})):(f(e.path),m&&T(`CODE`))},style:{paddingTop:m?`14px`:`6px`,paddingBottom:m?`14px`:`6px`,paddingRight:m?`16px`:`10px`,paddingLeft:`${e.depth*(m?22:16)+(m?16:10)}px`,borderRadius:`6px`,fontSize:m?`13px`:`11px`,fontFamily:`monospace`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`8px`,color:n?`var(--signal-green)`:p?`#ffffff`:e.isDir?`#718096`:`#4a5568`,background:n?`rgba(34, 197, 94, 0.08)`:p?`rgba(255, 255, 255, 0.03)`:`transparent`,border:n?`1px solid rgba(34, 197, 94, 0.25)`:`1px solid transparent`,textShadow:n?`0 0 6px var(--signal-green-glow)`:`none`,wordBreak:`break-all`,transition:`all 0.12s ease`,textAlign:`left`},children:[(0,y.jsx)(`span`,{style:{minWidth:`12px`,fontSize:`10px`},children:e.isDir?r?`▼`:`▶`:` `}),e.isDir?r?(0,y.jsx)(s,{size:16,strokeWidth:1.5,style:{flexShrink:0}}):(0,y.jsx)(c,{size:16,strokeWidth:1.5,style:{flexShrink:0}}):e.name.endsWith(`.ts`)||e.name.endsWith(`.tsx`)||e.name.endsWith(`.js`)?(0,y.jsx)(l,{size:16,strokeWidth:1.5,style:{flexShrink:0}}):(0,y.jsx)(i,{size:16,strokeWidth:1.5,style:{flexShrink:0}}),(0,y.jsx)(`span`,{style:{fontWeight:e.isDir?`bold`:`normal`},children:e.name})]},e.path+`-`+t)})}),(!m||b===`CODE`)&&(0,y.jsxs)(`div`,{onMouseOver:()=>p.getState().setCursorType(`text`),onMouseLeave:()=>p.getState().setCursorType(`default`),className:`code-viewer-pane neo-pressed`,style:{WebkitOverflowScrolling:`touch`,width:m?`100%`:`76%`,height:m?`100%`:``,display:`flex`,flexDirection:`column`},children:[m&&(0,y.jsx)(`button`,{onClick:()=>{d.playSelectTick(),T(`TOC`)},className:`neo-btn`,style:{width:`100%`,padding:`12px`,fontSize:`12px`,marginBottom:`12px`,borderColor:`var(--signal-green)`,color:`var(--signal-green)`,flexShrink:0,borderRadius:`8px`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`8px`},children:`📁 BACK TO DIRECTORY`}),u?(0,y.jsxs)(`div`,{style:{textAlign:`left`,fontSize:`11px`,fontFamily:`monospace`,display:`flex`,flexDirection:`column`,height:`100%`,overflow:`hidden`},children:[(0,y.jsxs)(`div`,{style:{color:`hsl(142, 70%, 75%)`,marginBottom:`14px`,fontFamily:`monospace`,flexShrink:0,fontSize:m?`10px`:`11px`,wordBreak:`break-all`},children:[`// FILE: `,u]}),(0,y.jsx)(`div`,{style:{flexGrow:1,overflow:`auto`},children:(0,y.jsx)(t,{language:w(u),style:r,customStyle:{margin:0,padding:0,background:`transparent`,fontSize:m?`10px`:`11px`,lineHeight:`1.5`},children:n[u]||``})})]}):(0,y.jsx)(`span`,{style:{color:`#4a5568`,fontSize:`11px`},children:`Select a file in the directory tree to view content.`})]})]}),(0,y.jsx)(x,{onBack:e,isMobile:m,activeIndex:k,visibleNodesLength:O.length,setActiveIndex:A})]})}export{T as SourceViewScreen};