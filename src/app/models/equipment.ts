import {
  ArmourModifiers,
  JewelleryModifiers,
  ShieldModifiers,
  WeaponModifiers,
} from './mods';
import Size from './size';
import Position from './position';
import Container from './container';
import EquipmentSlots from './equipment_slots';

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
  position?: Position;
  container: Container | EquipmentSlots;
  mods:
    | WeaponModifiers
    | ArmourModifiers
    | JewelleryModifiers
    | ShieldModifiers;
}

export class Weapon implements Equipment {
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: WeaponModifiers,
    public size: Size,
    public position: Position,
    public container: Container | EquipmentSlots,
    public type: EquipmentType.WEAPON = EquipmentType.WEAPON,
  ) {
    if (!(this.container instanceof EquipmentSlots)) {
      this.container.putItem(this, this.position);
    } else {
      this.container.weapon1 = this;
    }
  }
}

export class Armour implements Equipment {
  constructor(
    public name: string,
    public rarity: ItemRarity,
    public mods: ArmourModifiers,
    public size: Size,
    public position: Position,
    public container: Container | EquipmentSlots,
    public type:
      | EquipmentType.BOOTS
      | EquipmentType.GLOVES
      | EquipmentType.BODY_ARMOUR
      | EquipmentType.HELMET,
  ) {
    if (!(this.container instanceof EquipmentSlots)) {
      this.container.putItem(this, this.position);
    } else {
      switch (type) {
        case EquipmentType.GLOVES:
          this.container.gloves = this;
          break;
        case EquipmentType.HELMET:
          this.container.helmet = this;
          break;
        case EquipmentType.BODY_ARMOUR:
          this.container.bodyArmour = this;
          break;
        case EquipmentType.BOOTS:
          this.container.boots = this;
          break;
      }
    }
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
    public type: EquipmentType.SHIELD = EquipmentType.SHIELD,
  ) {
    this.container.putItem(this, this.position);
  }
}
