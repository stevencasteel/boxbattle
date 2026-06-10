import { Particle, IEventBus } from "./Interfaces";
import { TrigLUT } from "./TrigLUT";

const STRIDE = 9;
const MAX_PARTICLES = 400;

export class ParticleSystem {
  private worker: Worker | null = null;
  private buffer: ArrayBuffer;
  private view: Float32Array;
  private isWorkerBusy: boolean = false;
  private unsubs: (() => void)[] = [];
  private events: IEventBus;

  private visualMetadata: {
    color: string;
    size: number;
    shape: "spark" | "dust" | "ring" | "line";
    startColor: string;
    endColor: string;
  }[];

  constructor(events: IEventBus) {
    this.events = events;
    this.buffer = new ArrayBuffer(MAX_PARTICLES * STRIDE * Float32Array.BYTES_PER_ELEMENT);
    this.view = new Float32Array(this.buffer);
    this.visualMetadata = Array.from({ length: MAX_PARTICLES }, () => ({
      color: "",
      size: 0,
      shape: "spark",
      startColor: "",
      endColor: "",
    }));

    if (typeof window !== "undefined") {
      this.worker = new Worker("./workers/particle.worker.js");
      this.setupWorker();
    }
    this.setupListeners();
  }

  private setupWorker() {
    if (!this.worker) return;
    this.worker.onmessage = (e) => {
      if (e.data.type === "UPDATE_COMPLETE") {
        this.buffer = e.data.buffer;
        this.view = new Float32Array(this.buffer);
        this.isWorkerBusy = false;
      }
    };
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

          let sCol = pColor;
          let eCol = pColor;
          if (pColor.includes("350") || pColor.includes("red") || pColor.includes("280")) {
            sCol = "hsl(45, 100%, 75%)";
            eCol = "hsl(350, 80%, 40%)";
          } else if (pColor.includes("142") || pColor.includes("green")) {
            sCol = "hsl(120, 100%, 80%)";
            eCol = "hsl(142, 100%, 30%)";
          }

          this.spawn(x, y, vx, vy, size, life, shape || "spark", 0.94, sCol, eCol, turbulence || 0);
        }
      })
    );

    this.unsubs.push(
      this.events.subscribe("SPAWN_DUST", ({ x, y, direction }) => {
        const count = 14;
        const isVertical = direction === "vertical";
        for (let i = 0; i < count; i++) {
          const dir = i % 2 === 0 ? 1 : -1;
          const pSpeedX = isVertical ? -dir * (4 + TrigLUT.random() * 10) : dir * (125 + TrigLUT.random() * 160);
          const pSpeedY = isVertical ? dir * (125 + TrigLUT.random() * 160) : -4 - TrigLUT.random() * 10;
          const size = 3.5 + TrigLUT.random() * 3.5;
          const life = 0.35;

          this.spawn(x, y, pSpeedX, pSpeedY, size, life, "dust", 0.88, "rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0.35)", 0);
        }
      })
    );

    this.unsubs.push(
      this.events.subscribe("SPAWN_BLAST", ({ x, y, color }) => {
        this.spawn(x, y, 0, 0, 8, 0.16, "ring", 1.0, color, color, 0);
      })
    );
  }

  private spawn(
    x: number, y: number, vx: number, vy: number,
    size: number, life: number, shape: "spark" | "dust" | "ring" | "line",
    drag: number, startColor: string, endColor: string, turbulence: number
  ) {
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const idx = i * STRIDE;
      if (this.view[idx + 8] === 0.0) {
        this.view[idx] = x;
        this.view[idx + 1] = y;
        this.view[idx + 2] = vx;
        this.view[idx + 3] = vy;
        this.view[idx + 4] = life;
        this.view[idx + 5] = life;
        this.view[idx + 6] = drag;
        this.view[idx + 7] = turbulence;
        this.view[idx + 8] = 1.0;

        this.visualMetadata[i] = { color: startColor, size, shape, startColor, endColor };
        break;
      }
    }
  }

  public update(dt: number) {
    if (this.isWorkerBusy || !this.worker || this.buffer.byteLength === 0) {
      return;
    }
    this.isWorkerBusy = true;
    this.worker.postMessage({ type: "UPDATE", buffer: this.buffer, dt }, [this.buffer]);
  }

  public getParticles(): Particle[] {
    const list: Particle[] = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const idx = i * STRIDE;
      if (this.view[idx + 8] === 1.0) {
        const meta = this.visualMetadata[i];
        list.push({
          x: this.view[idx],
          y: this.view[idx + 1],
          vx: this.view[idx + 2],
          vy: this.view[idx + 3],
          life: this.view[idx + 4],
          maxLife: this.view[idx + 5],
          drag: this.view[idx + 6],
          color: meta.color,
          size: meta.size,
          shape: meta.shape,
          startColor: meta.startColor,
          endColor: meta.endColor,
        });
      }
    }
    return list;
  }

  public cleanup() {
    this.unsubs.forEach((unsub) => unsub());
    this.unsubs = [];
    if (this.worker) {
      this.worker.terminate();
    }
  }
}
