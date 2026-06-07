import { BaseMinion, MinionType } from "./BaseMinion";
import { TurretMinion } from "./TurretMinion";
import { LancerMinion } from "./LancerMinion";
import { FlyerMinion } from "./FlyerMinion";
import { ShielderMinion } from "./ShielderMinion";
import { IWorld } from "@/core/Interfaces";
import {
  PitLancerMinion,
  CompassWaspMinion,
  ClampjawMinion,
  HymnNailMinion,
  BlisterOxMinion,
  BellHammerMinion,
  ShardChoirMinion
} from "./NewGauntletMinions";

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
      case "PIT_LANCER":
        return new PitLancerMinion(id, position, world);
      case "COMPASS_WASP":
        return new CompassWaspMinion(id, position, world);
      case "CLAMPJAW":
        return new ClampjawMinion(id, position, world);
      case "HYMN_NAIL":
        return new HymnNailMinion(id, position, world);
      case "BLISTER_OX":
        return new BlisterOxMinion(id, position, world);
      case "BELL_HAMMER":
        return new BellHammerMinion(id, position, world);
      case "SHARD_CHOIR":
        return new ShardChoirMinion(id, position, world);
      default:
        throw new Error(`Unknown minion type: ${type}`);
    }
  }
}
