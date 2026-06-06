# BOX BATTLE

Mega Man / Hollow Knight precision traversal gauntlet prototype.

Ported over from a Gemini 2.5 Pro in Godot to React + TypeScript + Vite + Zustand using Gemini 3.5 Flash

Play the game here:
👉 **[GitHub.io](https://stevencasteel.github.io/boxbattle/)**
👉 **[Itch.io](https://stevencasteel.itch.io/boxbattle)**

---

## Player Controls

- **Move Left / Right**: `Left Arrow` / `Right Arrow` or `A` / `D`
- **Look / Move Up**: `Up Arrow` or `W`
- **Crouch / Move Down**: `Down Arrow` or `S`
- **Jump**: `X` or `.` (Period) or `Space`
- **Melee Attack**: `C` or `,` (Comma)
- **Dash**: `Z` or `/` (Slash)
- **Determination Heal**: Hold `Move Down` + Press `Jump` (Requires 1 active Heal Charge)

_Key bindings are fully customizable inside the Options menu._

---

## Technical Architecture

- **Presentation & UI**: React 19, TypeScript 6, Vite 8, Zustand 5
- **Physics Simulation**: Custom 60Hz Semi-Implicit Euler accumulator loop with swept collision checks and corner-nudging
- **Sound Design**: Pure procedural waveform synthesis utilizing native Web Audio API oscillators, filters, and envelope gains (zero external binary audio assets)
