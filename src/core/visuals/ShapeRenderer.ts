import { getColorHSL, ColorRole } from "../design/ColorRoles";

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
