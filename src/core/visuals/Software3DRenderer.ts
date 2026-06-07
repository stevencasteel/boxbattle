import { TrigLUT } from "../TrigLUT";

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
        const cacheId = `corrupt-box:${id}:${corruption.toFixed(2)}:${seed.toFixed(2)}:${teeth}`;
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
        const cacheId = `radial:${id}:${sides}:${innerRatio}:${phase}:${depth}`;
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

    public static drawGeometry(
        ctx: CanvasRenderingContext2D, geometry: Geometry, posX: number, posY: number,
        sizeW: number, sizeH: number, scaleX: number, scaleY: number,
        yaw: number, pitch: number, roll: number, baseHslColor: string,
        alpha: number = 1.0, pivotY: "center" | "feet" = "center"
    ) {
        const projected: { x: number; y: number; z: number }[] = [];
        const hslMatch = baseHslColor.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/);
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
            ctx.fillStyle = `hsl(${h}, ${s}%, ${shadedLightness}%)`;
            const rimGlow = Math.pow(1.0 - Math.abs(item.nz3), 4.0);
            ctx.lineWidth = 1.5 + rimGlow * 1.8;
            ctx.strokeStyle = `hsla(${h}, ${s}%, ${Math.min(100, shadedLightness + rimGlow * 20)}%, ${0.35 + rimGlow * 0.35})`;
            
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
