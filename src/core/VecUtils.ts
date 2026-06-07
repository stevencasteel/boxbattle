import { Vector2D } from "./Interfaces";

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

export function distance(
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function distanceSq(
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function magnitude(v: { x: number; y: number }): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function intersectsAABB(
  pos1: { x: number; y: number },
  size1: { width: number; height: number },
  pos2: { x: number; y: number },
  size2: { width: number; height: number }
): boolean {
  const halfW1 = size1.width / 2;
  const halfH1 = size1.height / 2;
  const halfW2 = size2.width / 2;
  const halfH2 = size2.height / 2;

  return (
    pos1.x + halfW1 > pos2.x - halfW2 &&
    pos1.x - halfW1 < pos2.x + halfW2 &&
    pos1.y + halfH1 > pos2.y - halfH2 &&
    pos1.y - halfH1 < pos2.y + halfH2
  );
}

export function intersectsAABBWithRect(
  pos: { x: number; y: number },
  size: { width: number; height: number },
  rect: { x: number; y: number; width: number; height: number }
): boolean {
  const halfW = size.width / 2;
  const halfH = size.height / 2;

  return (
    pos.x + halfW > rect.x &&
    pos.x - halfW < rect.x + rect.width &&
    pos.y + halfH > rect.y &&
    pos.y - halfH < rect.y + rect.height
  );
}
