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

    public static getTransformedBossGeometry(stageIdx: number, _phase: number, time: number): Geometry {
        const baseBox = [
            { x: -0.5, y: -0.5, z: -0.5 }, { x: 0.5, y: -0.5, z: -0.5 },
            { x: 0.5, y: 0.5, z: -0.5 }, { x: -0.5, y: 0.5, z: -0.5 },
            { x: -0.5, y: -0.5, z: 0.5 }, { x: 0.5, y: -0.5, z: 0.5 },
            { x: 0.5, y: 0.5, z: 0.5 }, { x: -0.5, y: 0.5, z: 0.5 },
        ];

        let w = 1.0;
        let h = 1.0;
        let d = 1.0;

        if (stageIdx === 0) {
            w = 1.0; h = 1.0; d = 0.9;
        } else if (stageIdx === 1) {
            w = 0.58; h = 1.5; d = 0.5;
        } else if (stageIdx === 2) {
            w = 1.33; h = 0.38; d = 1.2;
        } else if (stageIdx === 3) {
            w = 0.75; h = 1.25; d = 0.6;
        } else if (stageIdx === 4) {
            w = 1.25; h = 0.75; d = 1.5;
        } else if (stageIdx === 5) {
            w = 1.33; h = 1.33; d = 1.4;
        } else if (stageIdx === 6) {
            const isGlitched = Math.sin(time * 12) > 0.7;
            w = isGlitched ? 1.4 : 1.0;
            h = isGlitched ? 0.7 : 1.0;
            d = 1.0;
        }

        const vertices = baseBox.map((v, idx) => {
            let x = v.x * w;
            let y = v.y * h;
            let z = v.z * d;

            if (stageIdx === 0) {
                const offset = Math.sin(time * 8 + y * 2) * 0.12 * Math.sign(y);
                x += offset;
            } else if (stageIdx === 1) {
                const scaleY = 1.0 + 0.15 * Math.sin(time * 12);
                y *= scaleY;
            } else if (stageIdx === 2) {
                const angle = y * 0.5 * Math.sin(time * 6);
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                const rx = x * cosA - z * sinA;
                const rz = x * sinA + z * cosA;
                x = rx;
                z = rz;
            } else if (stageIdx === 3) {
                const expansion = 1.0 + 0.18 * Math.pow(Math.abs(Math.sin(time * 18 + idx)), 4);
                x *= expansion;
                y *= expansion;
                z *= expansion;
            } else if (stageIdx === 4) {
                const theta = Math.atan2(z, x);
                const r = Math.sqrt(x * x + z * z);
                const wave = 1.0 + 0.14 * Math.sin(theta * 4 + time * 4);
                x = Math.cos(theta) * r * wave;
                z = Math.sin(theta) * r * wave;
                y += Math.sin(time * 3 + x * 2) * 0.08;
            } else if (stageIdx === 5) {
                const step = Math.floor(time * 2.25) % 2 === 0 ? 0.95 : 1.05;
                x *= step;
                y *= step;
                z *= step;
            } else if (stageIdx === 6) {
                const glitch = Math.sin(time * 24) > 0.8;
                if (glitch) {
                    x += Math.sin(y * 10) * 0.15;
                    y += Math.cos(x * 10) * 0.1;
                }
            }

            return { x, y, z };
        });

        return {
            vertices,
            faces: Software3DRenderer.BOX_GEOMETRY.faces
        };
    }

    public static drawSacredGeometry(
        ctx: CanvasRenderingContext2D,
        stageIdx: number,
        time: number,
        glowColor: string,
        project: (u: number, v: number) => { x: number; y: number }
    ) {
        ctx.save();
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 1.5;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        const drawCircle = (r: number) => {
            ctx.beginPath();
            const steps = 32;
            for (let i = 0; i <= steps; i++) {
                const theta = (i * Math.PI * 2) / steps;
                const p = project(r * Math.cos(theta), r * Math.sin(theta));
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        };

        if (stageIdx === 0) {
            // Prime Wound: Scrolling zigzag diagonal wave grid
            const spacing = 0.22;
            const scroll = (time * 0.4) % spacing;

            for (let offset = -1.2; offset < 1.2; offset += spacing) {
                ctx.beginPath();
                let started = false;
                for (let u = -0.6; u <= 0.6; u += 0.05) {
                    const v = offset + scroll + u;
                    if (v >= -0.6 && v <= 0.6) {
                        const p = project(u, v);
                        if (!started) { ctx.moveTo(p.x, p.y); started = true; }
                        else ctx.lineTo(p.x, p.y);
                    }
                }
                ctx.stroke();
            }

            const zigCount = 16;
            for (let offset = -1.2; offset < 1.2; offset += spacing) {
                ctx.beginPath();
                let started = false;
                for (let i = 0; i <= zigCount; i++) {
                    const t = i / zigCount;
                    const u = -0.6 + 1.2 * t;
                    const baseV = offset - scroll + u;
                    if (baseV >= -0.6 && baseV <= 0.6) {
                        const amp = 0.045;
                        const zigzag = (i % 2 === 0 ? 1 : -1) * amp;
                        const p = project(u + zigzag, baseV - zigzag);
                        if (!started) { ctx.moveTo(p.x, p.y); started = true; }
                        else ctx.lineTo(p.x, p.y);
                    }
                }
                ctx.stroke();
            }
        } else if (stageIdx === 1) {
            // Scarlet Lock: Interlocking horizontal and vertical scrolling grids
            const spacing = 0.22;
            const scrollH = (time * 0.35) % spacing;
            const scrollV = (time * 0.22) % spacing;

            for (let v = -0.8; v <= 0.8; v += spacing) {
                ctx.beginPath();
                const p1 = project(-0.6, v + scrollH);
                const p2 = project(0.6, v + scrollH);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            for (let u = -0.8; u <= 0.8; u += spacing) {
                ctx.beginPath();
                const p1 = project(u + scrollV, -0.6);
                const p2 = project(u + scrollV, 0.6);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            drawCircle(0.16);
            drawCircle(0.36);
        } else if (stageIdx === 2) {
            // Carminal Orbit: Rippling Concentric Circles & Radial Zigzag Rays
            const spacing = 0.18;
            const scroll = (time * 0.3) % spacing;

            for (let r = scroll; r < 0.9; r += spacing) {
                if (r <= 0.01) continue;
                drawCircle(r);
            }

            const rays = 8;
            const baseAngle = time * 1.5;
            const segments = 10;
            for (let i = 0; i < rays; i++) {
                const angle = baseAngle + (i * Math.PI * 2) / rays;
                ctx.beginPath();
                let started = false;
                for (let j = 0; j <= segments; j++) {
                    const r = 0.8 * (j / segments);
                    const theta = angle + 0.15 * Math.sin(j * 1.8 + time * 8) * (j % 2 === 0 ? 1 : -1);
                    const p = project(r * Math.cos(theta), r * Math.sin(theta));
                    if (!started) { ctx.moveTo(p.x, p.y); started = true; }
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }
        } else if (stageIdx === 3) {
            // Vermilion Needle: Columns of nested sharp chevron patterns
            const spacingX = 0.18;
            const spacingY = 0.22;
            const scrollY = (time * 0.5) % spacingY;

            for (let x = -0.8; x <= 0.8; x += spacingX) {
                ctx.beginPath();
                const p1 = project(x, -0.6);
                const p2 = project(x, 0.6);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            const colCount = 6;
            for (let col = -colCount; col <= colCount; col++) {
                const lx = col * spacingX;
                for (let y = -0.8; y <= 0.8; y += spacingY) {
                    const curY = y + scrollY;
                    if (curY >= -0.6 && curY <= 0.6) {
                        ctx.beginPath();
                        const pLeft = project(lx - spacingX * 0.5, curY - spacingY * 0.3);
                        const pMid = project(lx, curY + spacingY * 0.3);
                        const pRight = project(lx + spacingX * 0.5, curY - spacingY * 0.3);
                        ctx.moveTo(pLeft.x, pLeft.y);
                        ctx.lineTo(pMid.x, pMid.y);
                        ctx.lineTo(pRight.x, pRight.y);
                        ctx.stroke();
                    }
                }
            }
        } else if (stageIdx === 4) {
            // Marrow Rot: Organic Sinuous Ribbon Waves Scrolling Across
            const waveCount = 3;
            const stepX = 0.05;
            for (let w = 0; w < waveCount; w++) {
                const phase = (w * Math.PI) / waveCount;
                const scrollX = time * 4.0;
                const amp = 0.14;

                ctx.beginPath();
                let first = true;
                for (let lu = -0.6; lu <= 0.6; lu += stepX) {
                    const lv = amp * Math.sin(lu * 7.0 + scrollX + phase) * Math.cos(lu * 2.4);
                    const p = project(lu, lv);
                    if (first) { ctx.moveTo(p.x, p.y); first = false; }
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }

            for (let w = 0; w < waveCount; w++) {
                const phase = (w * Math.PI) / waveCount + Math.PI / 2;
                const scrollY = time * 3.0;
                const amp = 0.12;

                ctx.beginPath();
                let first = true;
                for (let lv = -0.6; lv <= 0.6; lv += stepX) {
                    const lu = amp * Math.cos(lv * 7.0 + scrollY + phase) * Math.sin(lv * 2.4);
                    const p = project(lu, lv);
                    if (first) { ctx.moveTo(p.x, p.y); first = false; }
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }
        } else if (stageIdx === 5) {
            // Rust Cathedral: Isometric Columnar Wireframe Grid
            const spacing = 0.25;
            const scroll = (time * 0.3) % spacing;

            for (let u = -0.8; u <= 0.8; u += spacing) {
                ctx.beginPath();
                const p1 = project(u + scroll, -0.6);
                const p2 = project(u + scroll, 0.6);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            for (let offset = -1.2; offset <= 1.2; offset += spacing) {
                ctx.beginPath();
                let started = false;
                for (let u = -0.6; u <= 0.6; u += 0.1) {
                    const v = offset + scroll * 0.866 + u * 0.577;
                    if (v >= -0.6 && v <= 0.6) {
                        const p = project(u, v);
                        if (!started) { ctx.moveTo(p.x, p.y); started = true; }
                        else ctx.lineTo(p.x, p.y);
                    }
                }
                ctx.stroke();
            }

            for (let offset = -1.2; offset <= 1.2; offset += spacing) {
                ctx.beginPath();
                let started = false;
                for (let u = -0.6; u <= 0.6; u += 0.1) {
                    const v = offset - scroll * 0.866 - u * 0.577;
                    if (v >= -0.6 && v <= 0.6) {
                        const p = project(u, v);
                        if (!started) { ctx.moveTo(p.x, p.y); started = true; }
                        else ctx.lineTo(p.x, p.y);
                    }
                }
                ctx.stroke();
            }
        } else {
            // The False Square: Glitchy, morphing seamless square grid
            const spacing = 0.22;
            const scroll = (time * 0.4) % spacing;

            const isGlitchActive = Math.sin(time * 18) > 0.8;
            const glitchX = isGlitchActive ? Math.sin(time * 50) * 0.05 : 0;
            const glitchY = isGlitchActive ? Math.cos(time * 40) * 0.03 : 0;

            ctx.save();

            for (let v = -0.8; v <= 0.8; v += spacing) {
                ctx.beginPath();
                const p1 = project(-0.6 + glitchX, v + scroll + glitchY);
                const p2 = project(0.6 + glitchX, v + scroll + glitchY);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            for (let u = -0.8; u <= 0.8; u += spacing) {
                ctx.beginPath();
                const p1 = project(u + scroll + glitchX, -0.6 + glitchY);
                const p2 = project(u + scroll + glitchX, 0.6 + glitchY);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            const sqSpacing = 0.16;
            const sqScroll = (time * 0.25) % sqSpacing;
            for (let r = sqScroll; r < 0.8; r += sqSpacing) {
                if (r <= 0.01) continue;
                ctx.beginPath();
                const p1 = project(-r + glitchX, -r + glitchY);
                const p2 = project(r + glitchX, -r + glitchY);
                const p3 = project(r + glitchX, r + glitchY);
                const p4 = project(-r + glitchX, r + glitchY);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.lineTo(p4.x, p4.y);
                ctx.closePath();
                ctx.stroke();
            }
            ctx.restore();
        }

        ctx.restore();
    }

    public static drawGeometry(
        ctx: CanvasRenderingContext2D, geometry: Geometry, posX: number, posY: number,
        sizeW: number, sizeH: number, scaleX: number, scaleY: number,
        yaw: number, pitch: number, roll: number, baseHslColor: string,
        alpha: number = 1.0, pivotY: "center" | "feet" = "center",
        bossStageIdx: number = -1
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

            // Projection mapping on ALL visible faces of the 3D box model!
            if (bossStageIdx >= 0) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(projected[firstIdx].x, projected[firstIdx].y);
                for (let i = 1; i < face.indices.length; i++) {
                    ctx.lineTo(projected[face.indices[i]].x, projected[face.indices[i]].y);
                }
                ctx.closePath();
                ctx.clip();
                
                const time = performance.now() / 1000;
                // Modulate projection intensity to respect the 3D face's direct lighting
                const strokeColor = `hsla(${h}, ${s}%, ${Math.min(100, shadedLightness + 35)}%, 0.8)`;
                
                // Establish a screen-space projection mapped center at the box model's origin
                const transformLocalPoint = (lx: number, ly: number, lz: number) => {
                    const x0 = lx * sizeW * scaleX;
                    const lyVal = pivotY === "feet" ? (ly - 0.5) * sizeH * scaleY : ly * sizeH * scaleY;
                    const z0 = lz * ((sizeW + sizeH) / 2);
                    
                    const x1 = x0 * cosY + z0 * sinY;
                    const y1 = lyVal;
                    const z1 = -x0 * sinY + z0 * cosY;
                    
                    const x2 = x1;
                    const y2 = y1 * cosP - z1 * sinP;

                    
                    const x3 = x2 * cosR - y2 * sinR;
                    const y3 = x2 * sinR + y2 * cosR;
                    
                    return { x: posX + x3, y: posY + y3 };
                };

                const project3D = (u: number, v: number) => {
                    let lx: number, ly: number, lz: number;
                    if (face.color === "FRONT") {
                        lx = u; ly = v; lz = -0.5;
                    } else if (face.color === "BACK") {
                        lx = -u; ly = v; lz = 0.5;
                    } else if (face.color === "LEFT") {
                        lx = -0.5; ly = v; lz = u;
                    } else if (face.color === "RIGHT") {
                        lx = 0.5; ly = v; lz = -u;
                    } else if (face.color === "TOP") {
                        lx = u; ly = -0.5; lz = v;
                    } else { // BOTTOM
                        lx = u; ly = 0.5; lz = -v;
                    }
                    return transformLocalPoint(lx, ly, lz);
                };
                
                Software3DRenderer.drawSacredGeometry(ctx, bossStageIdx, time, strokeColor, project3D);
                ctx.restore();
            }
        }
        ctx.restore();
    }
}
