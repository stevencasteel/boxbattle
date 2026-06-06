import { Player } from "@/entities/Player";
import { HealthComponent } from "@/entities/components/HealthComponent";
import { EntityStatus, IWorld } from "@/core/Interfaces";
import { LancerMinion } from "@/entities/LancerMinion";
import { BaseMinion } from "@/entities/BaseMinion";

export class MinionCollisionSystem {
  public update(minions: IWorld["minions"], player: Player, dt: number): void {
    for (let i = minions.length - 1; i >= 0; i--) {
      const minion = minions[i];
      minion.update(dt);

      if (player.isDead || minion.status !== EntityStatus.ACTIVE) continue;

      let isColliding = false;
      let applyLanceKnockback = false;

      if (minion instanceof LancerMinion && minion.lanceExtended) {
        const lanceWidth = 72;
        const lanceHeight = 14.4;
        const lanceX = minion.position.x + minion.facingDirection * 44;
        const lanceY = minion.position.y - 9.6;

        const pW = player.size.width / 2;
        const pH = player.size.height / 2;

        const isLanceColliding =
          player.position.x + pW > lanceX - lanceWidth / 2 &&
          player.position.x - pW < lanceX + lanceWidth / 2 &&
          player.position.y + pH > lanceY - lanceHeight / 2 &&
          player.position.y - pH < lanceY + lanceHeight / 2;

        if (isLanceColliding) {
          isColliding = true;
          applyLanceKnockback = true;
        }
      }

      if (!isColliding) {
        const pW = player.size.width / 2;
        const pH = player.size.height / 2;
        const mW = minion.size.width / 2;
        const mH = minion.size.height / 2;

        isColliding =
          player.position.x + pW > minion.position.x - mW &&
          player.position.x - pW < minion.position.x + mW &&
          player.position.y + pH > minion.position.y - mH &&
          player.position.y - pH < minion.position.y + mH;
      }

      if (isColliding) {
        const playerHealth = player.getComponent(HealthComponent);
        if (playerHealth) {
          const damaged = playerHealth.takeDamage(1);
          if (damaged) {
            if (applyLanceKnockback && minion instanceof BaseMinion) {
              const knockbackDir = minion.facingDirection !== 0 ? minion.facingDirection : 1;
              player.velocity.x = knockbackDir * 650;
              player.velocity.y = -350;
            } else {
              const knockbackDir = Math.sign(player.position.x - minion.position.x);
              player.velocity.x = (knockbackDir !== 0 ? knockbackDir : 1) * 450;
              player.velocity.y = -350;
            }
          }
        }
      }
    }
  }
}
