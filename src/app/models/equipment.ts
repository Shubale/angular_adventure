import {
  ArmourModifiers,
  JewelleryModifiers,
  ShieldModifiers,
  WeaponModifiers,
} from './mods';
import Size from './size';
import Position from './position';
import Container from './container';

export enum EquipmentType {
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
  position: Position | undefined;
  mods:
    | WeaponModifiers
    | ArmourModifiers
    | JewelleryModifiers
    | ShieldModifiers;
  imagePath: string;
}

export class Weapon implements Equipment {
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: WeaponModifiers,
    public size: Size,
    public position: Position | undefined,
    public type: EquipmentType.WEAPON = EquipmentType.WEAPON,
    public imagePath: string,
    container?: Container,
  ) {
    if (container && this.position) container.putItem(this, this.position);
  }
}

export class Armour implements Equipment {
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: ArmourModifiers,
    public size: Size,
    public position: Position | undefined,
    public type:
      | EquipmentType.BOOTS
      | EquipmentType.GLOVES
      | EquipmentType.BODY_ARMOUR
      | EquipmentType.HELMET,
    public imagePath: string,
    container?: Container,
  ) {
    if (container && this.position) container.putItem(this, this.position);
  }
}

export class Jewellery implements Equipment {
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: JewelleryModifiers,
    public size: Size,
    public position: Position | undefined,
    public type: EquipmentType.AMULET | EquipmentType.RING,
    public imagePath: string,
    container?: Container,
  ) {
    if (container && this.position) container.putItem(this, this.position);
  }
}

export class Shield implements Equipment {
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: ShieldModifiers,
    public size: Size,
    public position: Position | undefined,
    public type: EquipmentType.SHIELD = EquipmentType.SHIELD,
    public imagePath: string,
    container?: Container,
  ) {
    if (container && this.position) container.putItem(this, this.position);
  }
}
