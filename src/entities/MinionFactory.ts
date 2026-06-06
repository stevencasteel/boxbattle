import { BaseMinion, MinionType } from "./BaseMinion";
import { TurretMinion } from "./TurretMinion";
import { LancerMinion } from "./LancerMinion";
import { FlyerMinion } from "./FlyerMinion";
import { ShielderMinion } from "./ShielderMinion";
import { IWorld } from "@/core/Interfaces";

export class MinionFactory {
  public static createMinion(type: MinionType, id: string, position: { x: number; y: number }, world: IWorld): BaseMinion {
    switch (type) {
      case "TURRET":
        return new TurretMinion(id, position, world);
      case "LANCER":
        return new LancerMinion(id, position, world);
      case "FLYER":
        return new FlyerMinion(id, position, world);
      case "SHIELDER":
        return new ShielderMinion(id, position, world);
      default:
        throw new Error(`Unknown minion type: ${type}`);
    }
  }
}
