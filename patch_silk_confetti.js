import fs from 'fs';

let content = fs.readFileSync('src/ui/hud/HudOverlay.tsx', 'utf8');

const startMarker = `useEffect(() => {
    if (overlayVisible) {
      const confettiCanvas = document.getElementById("confetti-canvas") as HTMLCanvasElement | null;`;

const endMarker = `}, [overlayVisible, overlayTitle]);`;

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Failed to find confetti useEffect block in HudOverlay.tsx");
  process.exit(1);
}

const replacement = `useEffect(() => {
    if (!overlayVisible) return;

    let cleanupFn: (() => void) | undefined = undefined;
    const confettiCanvas = document.getElementById("confetti-canvas") as HTMLCanvasElement | null;
    
    if (confettiCanvas) {
      const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });

      if (overlayTitle === "VICTORY") {
        const fireConfetti = () => {
          myConfetti({
            particleCount: 360,
            spread: 80,
            origin: { y: 0.55, x: 0.5 },
            colors: ["#10b981", "#34d399", "#a7f3d0", "#ffffff"]
          });
          myConfetti({
            particleCount: 200,
            spread: 45,
            angle: 135,
            origin: { y: 0.55, x: 0.5 },
            colors: ["#10b981", "#34d399", "#a7f3d0", "#ffffff"]
          });
          myConfetti({
            particleCount: 200,
            spread: 45,
            angle: 45,
            origin: { y: 0.55, x: 0.5 },
            colors: ["#10b981", "#34d399", "#a7f3d0", "#ffffff"]
          });
        };

        fireConfetti();
        const intervalId = setInterval(fireConfetti, 3000);

        let rainIndex = 0;
        const victoryColors = ["#10b981", "#34d399", "#a7f3d0", "#ffffff"];
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

      } else if (overlayTitle === "DEFEATED") {
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
    
    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, [overlayVisible, overlayTitle]);`;

const before = content.substring(0, startIndex);
const after = content.substring(endIndex + endMarker.length);
const finalContent = before + replacement + after;

fs.writeFileSync('src/ui/hud/HudOverlay.tsx', finalContent, 'utf8');
console.log("Successfully patched SILK confetti effects!");
