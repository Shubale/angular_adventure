import { AllModifiers, WeaponModifiers } from './mods';
import Size from './size';
import Position from './position';
import Container from './container';

enum EquipmentType {
  WEAPON,
  SHIELD,
  HELMET,
  BODY_ARMOUR,
  BOOTS,
  GLOVES,
  RING,
  AMULET,
}

export enum ItemRarity {
  COMMON,
  UNCOMMON,
  RARE,
  UNIQUE,
}

export interface Equipment {
  name: string;
  type: EquipmentType;
  rarity: ItemRarity;
  size: Size;
  position: Position;
  container: Container;
}

export class Weapon implements Equipment {
  type: EquipmentType = EquipmentType.WEAPON;
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: WeaponModifiers,
    public size: Size,
    public position: Position,
    public container: Container,
  ) {
    this.container.putItem(this);
  }
}
