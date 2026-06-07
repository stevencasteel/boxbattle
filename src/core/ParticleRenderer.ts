import { Particle } from "./Interfaces";
import { TrigLUT } from "./TrigLUT";

const colorCache = new Map<string, { h: number; s: number; l: number } | null>();
const lerpCache = new Map<string, string>();

function parseHsl(str: string): { h: number; s: number; l: number } | null {
  if (colorCache.has(str)) return colorCache.get(str)!;
  const match = str.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/);
  if (!match) { colorCache.set(str, null); return null; }
  const result = { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  colorCache.set(str, result);
  return result;
}

function lerpHsl(startStr: string, endStr: string, pct: number): string {
  if (!startStr || !endStr) return startStr;
  const step = Math.round(pct * 20);
  const cacheKey = `${startStr}_${endStr}_${step}`;
  const cached = lerpCache.get(cacheKey);
  if (cached) return cached;
  const c1 = parseHsl(startStr); const c2 = parseHsl(endStr);
  if (!c1 || !c2) return startStr;
  const factor = 1 - step / 20;
  const h = c1.h + (c2.h - c1.h) * factor;
  const s = c1.s + (c2.s - c1.s) * factor;
  const l = c1.l + (c2.l - c1.l) * factor;
  const result = `hsl(${h}, ${s}%, ${l}%)`;
  lerpCache.set(cacheKey, result); colorCache.set(result, { h, s, l });
  return result;
}

function getHslaColor(colorStr: string, alpha: number): string {
  const parsed = parseHsl(colorStr);
  if (parsed) return `hsla(${parsed.h}, ${parsed.s}%, ${parsed.l}%, ${alpha})`;
  return colorStr;
}

export class ParticleRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public renderParticles(particles: readonly Particle[], alpha: number = 0): void {
    const ctx = this.ctx;
    const len = particles.length;
    if (len === 0) return;

    ctx.save();

    const sparkBuckets = new Map<string, Particle[]>();
    const dustBuckets = new Map<string, Particle[]>();
    const lines: Particle[] = [];
    const rings: Particle[] = [];
    const timeStep = 1 / 60; // Base engine fixed tick rate

    for (let i = 0; i < len; i++) {
      const p = particles[i];
      const pct = p.life / p.maxLife;

      if (p.shape === "spark") {
        const sparkColor = p.startColor && p.endColor ? lerpHsl(p.startColor, p.endColor, pct) : p.color;
        const colorKey = p.startColor && p.endColor ? sparkColor : `${p.color}_${Math.round(pct * 20)}`;
        let bucket = sparkBuckets.get(colorKey);
        if (!bucket) { bucket = []; sparkBuckets.set(colorKey, bucket); }
        bucket.push(p);
      } else if (p.shape === "dust") {
        let bucket = dustBuckets.get(p.color);
        if (!bucket) { bucket = []; dustBuckets.set(p.color, bucket); }
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
        const renderX = sp.x + (sp.vx * alpha * timeStep);
        const renderY = sp.y + (sp.vy * alpha * timeStep);
        ctx.beginPath();
        ctx.arc(renderX, renderY, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (const [color, bucket] of dustBuckets) {
      ctx.fillStyle = color;
      for (let j = 0; j < bucket.length; j++) {
        const dp = bucket[j];
        const pct = dp.life / dp.maxLife;
        ctx.globalAlpha = pct;
        const renderX = dp.x + (dp.vx * alpha * timeStep);
        const renderY = dp.y + (dp.vy * alpha * timeStep);
        ctx.fillRect(renderX - dp.size / 2, renderY - dp.size / 2, dp.size, dp.size * 0.7);
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const p = lines[i];
      const pct = p.life / p.maxLife;
      const speed = TrigLUT.fastSqrt(p.vx * p.vx + p.vy * p.vy);
      let ux = 1; let uy = 0;
      if (speed > 0) { ux = p.vx / speed; uy = p.vy / speed; }
      
      const renderX = p.x + (p.vx * alpha * timeStep);
      const renderY = p.y + (p.vy * alpha * timeStep);
      
      const x1 = renderX - ux * p.size * 8;
      const y1 = renderY - uy * p.size * 8;
      const x2 = renderX + ux * p.size * 6;
      const y2 = renderY + uy * p.size * 6;

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
      const renderX = p.x + (p.vx * alpha * timeStep);
      const renderY = p.y + (p.vy * alpha * timeStep);
      ctx.beginPath();
      ctx.arc(renderX, renderY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = pct;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    ctx.restore();
  }
}
