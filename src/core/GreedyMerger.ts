import { Rectangle } from "./Interfaces";

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
