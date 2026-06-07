import fs from 'fs';

fs.writeFileSync('src/components/menus/TitleScreen.css', '/* TitleScreen styles inherited globally from neumorphism.css to maintain DRY chancel configuration */\n', 'utf8');
console.log('Cleared duplicated styles in TitleScreen.css.');

const vecUtilsCode = `import { Vector2D } from "./Interfaces";

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
`;
fs.writeFileSync('src/core/VecUtils.ts', vecUtilsCode, 'utf8');
console.log('Consolidated math/AABB overlap logic into VecUtils.ts.');

{
  const path = 'src/core/systems/MinionCollisionSystem.ts';
  let content = fs.readFileSync(path, 'utf8');
  content = `import { intersectsAABB } from "@/core/VecUtils";\n` + content;
  
  const targetStr = `      if (!isColliding) {
        const pW = player.size.width / 2;
        const pH = player.size.height / 2;
        const mW = minion.size.width / 2;
        const mH = minion.size.height / 2;

        isColliding =
          player.position.x + pW > minion.position.x - mW &&
          player.position.x - pW < minion.position.x + mW &&
          player.position.y + pH > minion.position.y - mH &&
          player.position.y - pH < minion.position.y + mH;
      }`;
  const newStr = `      if (!isColliding) {
        isColliding = intersectsAABB(player.position, player.size, minion.position, minion.size);
      }`;

  const targetStrExt = `      if (extBox) {
        const pW = player.size.width / 2;
        const pH = player.size.height / 2;

        const isLanceColliding =
          player.position.x + pW > extBox.x - extBox.width / 2 &&
          player.position.x - pW < extBox.x + extBox.width / 2 &&
          player.position.y + pH > extBox.y - extBox.height / 2 &&
          player.position.y - pH < extBox.y + extBox.height / 2;

        if (isLanceColliding) {
          isColliding = true;
          applyLanceKnockback = true;
        }
      }`;
  const newStrExt = `      if (extBox) {
        const isLanceColliding = intersectsAABB(player.position, player.size, extBox, extBox);

        if (isLanceColliding) {
          isColliding = true;
          applyLanceKnockback = true;
        }
      }`;

  if (!content.includes(targetStr) || !content.includes(targetStrExt)) {
    console.error('Error: Pattern mismatches in MinionCollisionSystem.ts');
    process.exit(1);
  }
  content = content.replace(targetStr, newStr).replace(targetStrExt, newStrExt);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Patched MinionCollisionSystem.ts.');
}

{
  const path = 'src/core/systems/TraversalHazards.ts';
  let content = fs.readFileSync(path, 'utf8');
  content = `import { intersectsAABBWithRect } from "@/core/VecUtils";\n` + content;

  const targetStrRespawn = `            const pW = player.size.width / 2;
            const pH = player.size.height / 2;
            const isOverlapping =
              player.position.x + pW > this.rect.x &&
              player.position.x - pW < this.rect.x + this.rect.width &&
              player.position.y + pH > this.rect.y &&
              player.position.y - pH < this.rect.y + this.rect.height;`;
  const newStrRespawn = `            const isOverlapping = intersectsAABBWithRect(player.position, player.size, this.rect);`;

  const targetStrPogo = `          const pW = player.size.width / 2;
          const pH = player.size.height / 2;

          const isOverlapping =
            player.position.x + pW > this.rect.x &&
            player.position.x - pW < this.rect.x + this.rect.width &&
            player.position.y + pH > this.rect.y &&
            player.position.y - pH < this.rect.y + this.rect.height;`;
  const newStrPogo = `          const isOverlapping = intersectsAABBWithRect(player.position, player.size, this.rect);`;

  const targetStrGate = `          const pW = player.size.width / 2;
          const pH = player.size.height / 2;

          const isOverlapping =
            player.position.x + pW > this.rect.x &&
            player.position.x - pW < this.rect.x + this.rect.width &&
            player.position.y + pH > this.rect.y &&
            player.position.y - pH < this.rect.y + this.rect.height;`;
  const newStrGate = `          const isOverlapping = intersectsAABBWithRect(player.position, player.size, this.rect);`;

  if (!content.includes(targetStrRespawn) || !content.includes(targetStrPogo) || !content.includes(targetStrGate)) {
    console.error('Error: Pattern mismatches in TraversalHazards.ts');
    process.exit(1);
  }
  content = content.replace(targetStrRespawn, newStrRespawn).replace(targetStrPogo, newStrPogo).replace(targetStrGate, newStrGate);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Patched TraversalHazards.ts.');
}

{
  const path = 'src/entities/components/PhysicsComponent.ts';
  let content = fs.readFileSync(path, 'utf8');
  content = `import { intersectsAABBWithRect } from "@/core/VecUtils";\n` + content;

  const targetStr = `  private isOverlapping(x: number, y: number, rect: Rectangle): boolean {
    const halfWidth = this.owner.size.width / 2;
    const halfHeight = this.owner.size.height / 2;

    const left = x - halfWidth;
    const right = x + halfWidth;
    const top = y - halfHeight;
    const bottom = y + halfHeight;

    return right > rect.x && left < rect.x + rect.width && bottom > rect.y && top < rect.y + rect.height;
  }`;
  const newStr = `  private isOverlapping(x: number, y: number, rect: Rectangle): boolean {
    return intersectsAABBWithRect({ x, y }, this.owner.size, rect);
  }`;

  if (!content.includes(targetStr)) {
    console.error('Error: Pattern mismatches in PhysicsComponent.ts');
    process.exit(1);
  }
  content = content.replace(targetStr, newStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Patched PhysicsComponent.ts.');
}

{
  const path = 'src/core/EncounterDirector.ts';
  let content = fs.readFileSync(path, 'utf8');
  content = `import { distance } from "@/core/VecUtils";\n` + content;

  const targetStr = `    for (const anchor of candidates) {
      const dp = player ? Math.sqrt(Math.pow(player.position.x - anchor.x, 2) + Math.pow(player.position.y - anchor.y, 2)) : 500;
      const db = boss ? Math.sqrt(Math.pow(boss.position.x - anchor.x, 2) + Math.pow(boss.position.y - anchor.y, 2)) : 500;`;
  const newStr = `    for (const anchor of candidates) {
      const dp = player ? distance(player.position, anchor) : 500;
      const db = boss ? distance(boss.position, anchor) : 500;`;

  if (!content.includes(targetStr)) {
    console.error('Error: Pattern mismatches in EncounterDirector.ts');
    process.exit(1);
  }
  content = content.replace(targetStr, newStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Patched EncounterDirector.ts.');
}

{
  const path = 'src/core/audio/sfxPresetData.ts';
  let content = fs.readFileSync(path, 'utf8');
  content += `\nexport const DORIAN_RATIOS = [1.0000, 1.1225, 1.1892, 1.3348, 1.4983, 1.6818, 1.7818, 2.0000, 2.2449, 2.3784, 2.6697, 2.9966];\n`;
  fs.writeFileSync(path, content, 'utf8');
  console.log('Appended DORIAN_RATIOS to sfxPresetData.ts.');
}

{
  const path = 'src/core/audio/sfx/PlayerSFX.ts';
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(`import { SFX_PRESETS } from "../sfxPresetData";`, `import { SFX_PRESETS, DORIAN_RATIOS } from "../sfxPresetData";`);
  content = content.replace(`const DORIAN_RATIOS = [1.0000, 1.1225, 1.1892, 1.3348, 1.4983, 1.6818, 1.7818, 2.0000, 2.2449, 2.3784, 2.6697, 2.9966];`, '');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Patched PlayerSFX.ts.');
}

{
  const path = 'src/core/audio/sfx/BossSFX.ts';
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(`import { SFX_PRESETS } from "../sfxPresetData";`, `import { SFX_PRESETS, DORIAN_RATIOS } from "../sfxPresetData";`);
  content = content.replace(`const DORIAN_RATIOS = [1.0000, 1.1225, 1.1892, 1.3348, 1.4983, 1.6818, 1.7818, 2.0000, 2.2449, 2.3784, 2.6697, 2.9966];`, '');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Patched BossSFX.ts.');
}

console.log('DRY optimization completed successfully!');
