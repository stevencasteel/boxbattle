import { TrigLUT } from "../TrigLUT";

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Face {
  indices: number[];
  color: string;
  baseNormal: Vector3D;
}

export interface Geometry {
  vertices: Vector3D[];
  faces: Face[];
}

export class Software3DRenderer {
  private static readonly LIGHT_DIR = { x: 0.577, y: -0.577, z: 0.577 };

  public static readonly BOX_GEOMETRY: Geometry = {
    vertices: [
      { x: -0.5, y: -0.5, z: -0.5 },
      { x: 0.5, y: -0.5, z: -0.5 },
      { x: 0.5, y: 0.5, z: -0.5 },
      { x: -0.5, y: 0.5, z: -0.5 },
      { x: -0.5, y: -0.5, z: 0.5 },
      { x: 0.5, y: -0.5, z: 0.5 },
      { x: 0.5, y: 0.5, z: 0.5 },
      { x: -0.5, y: 0.5, z: 0.5 },
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

  public static readonly HEXAGON_GEOMETRY: Geometry = (() => {
    const vertices: Vector3D[] = [];
    const faces: Face[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      vertices.push({ x: Math.cos(angle) * 0.5, y: Math.sin(angle) * 0.5, z: -0.5 });
    }
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      vertices.push({ x: Math.cos(angle) * 0.5, y: Math.sin(angle) * 0.5, z: 0.5 });
    }
    faces.push({ indices: [5, 4, 3, 2, 1, 0], color: "FRONT", baseNormal: { x: 0, y: 0, z: -1 } });
    faces.push({ indices: [6, 7, 8, 9, 10, 11], color: "BACK", baseNormal: { x: 0, y: 0, z: 1 } });
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      const angle = ((i + 0.5) * Math.PI) / 3;
      faces.push({
        indices: [i, next, next + 6, i + 6],
        color: "SIDE",
        baseNormal: { x: Math.cos(angle), y: Math.sin(angle), z: 0 }
      });
    }
    return { vertices, faces };
  })();

  public static drawGeometry(
    ctx: CanvasRenderingContext2D,
    geometry: Geometry,
    posX: number,
    posY: number,
    sizeW: number,
    sizeH: number,
    scaleX: number,
    scaleY: number,
    yaw: number,
    pitch: number,
    roll: number,
    baseHslColor: string,
    alpha: number = 1.0,
    pivotY: "center" | "feet" = "center"
  ) {
    const projected: { x: number; y: number; z: number }[] = [];
    const hslMatch = baseHslColor.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/);
    const h = hslMatch ? parseFloat(hslMatch[1]) : 142;
    const s = hslMatch ? parseFloat(hslMatch[2]) : 71;
    const l = hslMatch ? parseFloat(hslMatch[3]) : 58;

    const cosY = TrigLUT.cos(yaw);
    const sinY = TrigLUT.sin(yaw);
    const cosP = TrigLUT.cos(pitch);
    const sinP = TrigLUT.sin(pitch);
    const cosR = TrigLUT.cos(roll);
    const sinR = TrigLUT.sin(roll);

    for (let i = 0; i < geometry.vertices.length; i++) {
      const v = geometry.vertices[i];
      const lx = v.x * sizeW * scaleX;
      
      const ly = pivotY === "feet"
        ? (v.y - 0.5) * sizeH * scaleY
        : v.y * sizeH * scaleY;
      
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
      for (const idx of face.indices) {
        sumZ += projected[idx].z;
      }
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

  public static drawFragments(
    ctx: CanvasRenderingContext2D,
    geometry: Geometry,
    posX: number,
    posY: number,
    sizeW: number,
    sizeH: number,
    scaleX: number,
    scaleY: number,
    yaw: number,
    pitch: number,
    roll: number,
    baseHslColor: string,
    shrapnelProgress: number,
    explosionSpeed: number = 220,
    alpha: number = 1.0,
    pivotY: "center" | "feet" = "center"
  ) {
    const hslMatch = baseHslColor.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/);
    const h = hslMatch ? parseFloat(hslMatch[1]) : 142;
    const s = hslMatch ? parseFloat(hslMatch[2]) : 71;
    const l = hslMatch ? parseFloat(hslMatch[3]) : 58;

    const cosY = TrigLUT.cos(yaw);
    const sinY = TrigLUT.sin(yaw);
    const cosP = TrigLUT.cos(pitch);
    const sinP = TrigLUT.sin(pitch);
    const cosR = TrigLUT.cos(roll);
    const sinR = TrigLUT.sin(roll);

    const facesWithFragments = geometry.faces.map((face) => {
      const n = face.baseNormal;
      const nx1 = n.x * cosY + n.z * sinY;
      const ny1 = n.y;
      const nz1 = -n.x * sinY + n.z * cosY;

      const nx2 = nx1;
      const ny2 = ny1 * cosP - nz1 * sinP;
      const nz2 = ny1 * sinP + nz1 * cosP;

      const nx3 = nx2 * cosR - ny2 * sinR;
      const ny3 = nx2 * sinR + ny2 * cosR;

      const gravityEffect = 0.5 * 980 * shrapnelProgress * shrapnelProgress;
      const offX = nx3 * explosionSpeed * shrapnelProgress;
      const offY = ny3 * explosionSpeed * shrapnelProgress + gravityEffect;
      const offZ = nz2 * explosionSpeed * shrapnelProgress;

      const faceProj: { x: number; y: number; z: number }[] = [];
      let sumZ = 0;

      for (const idx of face.indices) {
        const v = geometry.vertices[idx];
        const lx = v.x * sizeW * scaleX;
        
        const ly = pivotY === "feet"
          ? (v.y - 0.5) * sizeH * scaleY
          : v.y * sizeH * scaleY;
        
        const lz = v.z * ((sizeW + sizeH) / 2);

        const rx1 = lx * cosY + lz * sinY;
        const ry1 = ly;
        const rz1 = -lx * sinY + lz * cosY;

        const rx2 = rx1;
        const ry2 = ry1 * cosP - rz1 * sinP;
        const rz2 = ry1 * sinP + rz1 * cosP;

        const rx3 = rx2 * cosR - ry2 * sinR;
        const ry3 = rx2 * sinR + ry2 * cosR;

        const finalX = posX + rx3 + offX;
        const finalY = posY + ry3 + offY;
        const finalZ = rz2 + offZ;

        faceProj.push({ x: finalX, y: finalY, z: finalZ });
        sumZ += finalZ;
      }

      const avgZ = sumZ / face.indices.length;
      const dot = nx3 * this.LIGHT_DIR.x + ny3 * this.LIGHT_DIR.y + nz2 * this.LIGHT_DIR.z;
      const shadeFactor = 0.85 + dot * 0.3;

      return { face, avgZ, shadeFactor, projected: faceProj, nz3: nz2 };
    });

    facesWithFragments.sort((a, b) => b.avgZ - a.avgZ);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineJoin = "round";

    for (const item of facesWithFragments) {
      const shadedLightness = Math.max(10, Math.min(100, l * item.shadeFactor));
      ctx.fillStyle = `hsl(${h}, ${s}%, ${shadedLightness}%)`;

      const rimGlow = Math.pow(1.0 - Math.abs(item.nz3), 4.0);
      ctx.lineWidth = 1.5 + rimGlow * 3.5;
      ctx.strokeStyle = `hsla(${h}, ${s}%, ${Math.min(100, shadedLightness + rimGlow * 20)}%, ${0.35 + rimGlow * 0.35})`;

      ctx.beginPath();
      ctx.moveTo(item.projected[0].x, item.projected[0].y);
      for (let i = 1; i < item.projected.length; i++) {
        ctx.lineTo(item.projected[i].x, item.projected[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }
}
