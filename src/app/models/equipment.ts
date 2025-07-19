import {
  ArmourModifiers,
  JewelleryModifiers,
  ShieldModifiers,
  WeaponModifiers,
} from './mods';
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
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: WeaponModifiers,
    public size: Size,
    public position: Position,
    public container: Container,
    public type: EquipmentType.WEAPON = EquipmentType.WEAPON,
  ) {
    this.container.putItem(this, this.position);
  }
}

export class Armour implements Equipment {
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: ArmourModifiers,
    public size: Size,
    public position: Position,
    public container: Container,
    public type:
      | EquipmentType.BOOTS
      | EquipmentType.GLOVES
      | EquipmentType.BODY_ARMOUR
      | EquipmentType.HELMET,
  ) {
    this.container.putItem(this, this.position);
  }
}

export class Jewellery implements Equipment {
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: JewelleryModifiers,
    public size: Size,
    public position: Position,
    public container: Container,
    public type: EquipmentType.AMULET | EquipmentType.RING,
  ) {
    this.container.putItem(this, this.position);
  }
}

export class Shield implements Equipment {
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: ShieldModifiers,
    public size: Size,
    public position: Position,
    public container: Container,
    public type: EquipmentType.SHIELD,
  ) {
    this.container.putItem(this, this.position);
  }
}
