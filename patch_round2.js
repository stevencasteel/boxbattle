import fs from 'fs';

// 1. Patch PlayerVisuals.ts for "feet" pivot and resting yaw/pitch tilt (Pronounced 3D)
{
  const path = 'src/entities/handlers/PlayerVisuals.ts';
  let content = fs.readFileSync(path, 'utf8');
  
  const searchStr = 'Software3DRenderer.drawGeometry(';
  const targetIdx = content.indexOf(searchStr);
  const blockEnd = content.indexOf(');', targetIdx) + 2;
  
  const newBlock = `Software3DRenderer.drawGeometry(
      ctx,
      Software3DRenderer.BOX_GEOMETRY,
      0,
      0,
      this.player.size.width,
      this.player.size.height,
      this.player.visualScale.x,
      this.player.visualScale.y,
      0.15 * this.player.facingDirection + (this.player.velocity.x / 1120) * 0.35,
      0.08 + (this.player.velocity.y / 1200) * 0.22,
      0,
      this.player.health.isFlashing() ? "hsl(0, 0%, 100%)" : "hsl(142, 71%, 58%)",
      1.0,
      "feet"
    );`;

  if (targetIdx === -1) {
    console.error("Failed to find drawGeometry call in PlayerVisuals.ts");
    process.exit(1);
  }
  
  const before = content.substring(0, targetIdx);
  const after = content.substring(blockEnd);
  fs.writeFileSync(path, before + newBlock + after, 'utf8');
  console.log("Patched PlayerVisuals.ts for feet pivot");
}

// 2. Patch BossVisuals.ts for "feet" pivot and resting yaw/pitch tilt (Pronounced 3D)
{
  const path = 'src/core/visuals/BossVisuals.ts';
  let content = fs.readFileSync(path, 'utf8');
  
  const searchStr = 'Software3DRenderer.drawGeometry(';
  const targetIdx = content.indexOf(searchStr);
  const blockEnd = content.indexOf(');', targetIdx) + 2;
  
  const newBlock = `Software3DRenderer.drawGeometry(
          ctx,
          Software3DRenderer.BOX_GEOMETRY,
          0,
          0,
          boss.size.width,
          boss.size.height,
          boss.visualScale.x,
          boss.visualScale.y,
          0.15 * boss.facingDirection + (boss.velocity.x / boss.lungeSpeed) * 0.45,
          0.08 + (boss.velocity.y / 1200) * 0.25,
          0,
          baseColor,
          1.0,
          "feet"
        );`;

  if (targetIdx === -1) {
    console.error("Failed to find drawGeometry call in BossVisuals.ts");
    process.exit(1);
  }
  
  const before = content.substring(0, targetIdx);
  const after = content.substring(blockEnd);
  fs.writeFileSync(path, before + newBlock + after, 'utf8');
  console.log("Patched BossVisuals.ts for feet pivot");
}

// 3. Patch MinionVisuals.ts for custom pivotY parsing
{
  const path = 'src/core/visuals/MinionVisuals.ts';
  let content = fs.readFileSync(path, 'utf8');
  
  const searchStr = 'const geom = (minion.id.includes("TURRET")';
  const blockStart = content.indexOf(searchStr);
  const blockEnd = content.lastIndexOf('}', content.indexOf('ctx.fillRect(minion.facingDirection', blockStart)) + 1;
  
  const newBlock = `const geom = (minion.id.includes("TURRET") || minion.id.includes("SHIELDER"))
          ? Software3DRenderer.HEXAGON_GEOMETRY
          : Software3DRenderer.BOX_GEOMETRY;

        const yaw = 0.15 * minion.facingDirection + (minion.velocity.x / 450) * 0.35;
        const pitch = 0.08 + (minion.velocity.y / 1000) * 0.22;
        const pivotY = minion.squashPivot === "feet" ? "feet" : "center";
        const posY = pivotY === "feet" ? 0 : -minion.size.height / 2;
        const localY = minion.squashPivot === "feet" ? -minion.size.height / 2 : 0;

        if (minion.isDying) {
          const shrapnelProgress = 1.0 - minion.dissolveTimer / 0.5;
          Software3DRenderer.drawFragments(
            ctx,
            geom,
            0,
            posY,
            minion.size.width,
            minion.size.height,
            minion.visualScale.x,
            minion.visualScale.y,
            yaw,
            pitch,
            0,
            minion.minionColor,
            shrapnelProgress,
            180,
            minion.dissolveTimer / 0.5,
            pivotY
          );
        } else {
          let baseColor = minion.minionColor;
          if (minion.health.isFlashing()) {
            baseColor = "hsl(0, 0%, 100%)";
          } else if (minion.attackState === "TELEGRAPH") {
            baseColor = "hsl(45, 100%, 50%)";
          }

          Software3DRenderer.drawGeometry(
            ctx,
            geom,
            0,
            posY,
            minion.size.width,
            minion.size.height,
            minion.visualScale.x,
            minion.visualScale.y,
            yaw,
            pitch,
            0,
            baseColor,
            1.0,
            pivotY
          );
        }`;

  if (blockStart === -1) {
    console.error("Failed to find draw block in MinionVisuals.ts");
    process.exit(1);
  }
  
  const before = content.substring(0, blockStart);
  const after = content.substring(blockEnd);
  fs.writeFileSync(path, before + newBlock + after, 'utf8');
  console.log("Patched MinionVisuals.ts for customizable pivots");
}

// 4. Upgrade CinematicDeathRenderer.ts to draw beautiful, tumbling 3D fragments
{
  const path = 'src/core/effects/CinematicDeathRenderer.ts';
  let content = fs.readFileSync(path, 'utf8');
  
  content = "import { Software3DRenderer } from \"../visuals/Software3DRenderer\";\n" + content;
  
  const oldBlock = `            ctx.save();
            ctx.translate(curX, curY);
            ctx.rotate(progress * 4 + row);
            ctx.fillRect(-size / 2, -size / 2, size, size);
            ctx.restore();`;
            
  const newBlock = `            const fYaw = progress * 6 + row;
            const fPitch = progress * 4 - row;
            const fRoll = progress * 5 + row * 2;
            const fColor = (row + (row % gridCols)) % 2 === 0 ? primaryColor : secondaryColor;
            Software3DRenderer.drawGeometry(
              ctx,
              Software3DRenderer.BOX_GEOMETRY,
              curX,
              curY,
              size,
              size,
              1.0,
              1.0,
              fYaw,
              fPitch,
              fRoll,
              fColor,
              opacity
            );`;
            
  if (!content.includes(oldBlock)) {
    console.error("Could not find fillRect block in CinematicDeathRenderer.ts");
    process.exit(1);
  }
  
  content = content.replace(oldBlock, newBlock);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Patched CinematicDeathRenderer.ts to render cascading volumetric 3D pixels (voxels)");
}
