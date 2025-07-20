import { ArmourModifiers, CharacterModifiers } from './mods';
import { Armour, EquipmentType, ItemRarity, Weapon } from './equipment';
import Container from './container';
import EquipmentSlots from './equipment_slots';
import { ItemService } from '../services/item.service';
import { inject } from '@angular/core';

export class Character {
  private baseMods: CharacterModifiers;
  public currentHitPoints;
  public backpack: Container = new Container(6, 6);
  public equipment: EquipmentSlots = new EquipmentSlots();
  private itemService: ItemService = inject(ItemService);
  constructor(
    public name: string,
    public mods: CharacterModifiers,
  ) {
    this.baseMods = JSON.parse(JSON.stringify(mods));
    this.currentHitPoints = JSON.parse(JSON.stringify(mods.hitPoints));
    //localStorage.setItem('wep', JSON.stringify(this.weapon));
    //console.log(JSON.parse(localStorage.getItem('wep') ?? '{}'));
  }

  public equipWeapon(weapon: Weapon): void {
    this.mods.baseMinDmg = weapon.mods.baseMinDmg;
    this.mods.baseMaxDmg = weapon.mods.baseMaxDmg;
    this.mods.baseCritChance = weapon.mods.baseCritChance;
    this.mods.baseCritDamage = weapon.mods.baseCritDamage;
    this.equipment.weapon1 = weapon;
    this.backpack.removeItem(weapon);
    weapon.container = this.equipment;
  }

  public unEquipWeapon(): void {
    this.mods.baseMinDmg = this.baseMods.baseMinDmg;
    this.mods.baseMaxDmg = this.baseMods.baseMaxDmg;
    this.mods.baseCritChance = this.baseMods.baseCritChance;
    this.mods.baseCritDamage = this.baseMods.baseCritDamage;
    this.equipment.weapon1 = undefined;
  }

  public equipArmour(armour: Armour): void {
    let mod: keyof typeof armour.mods;
    for (mod in armour.mods) {
      this.mods[mod] += armour.mods[mod] ?? 0;
    }
    switch (armour.type) {
      case EquipmentType.GLOVES:
        this.equipment.gloves = armour;
        break;
      case EquipmentType.HELMET:
        this.equipment.helmet = armour;
        break;
      case EquipmentType.BODY_ARMOUR:
        this.equipment.bodyArmour = armour;
        break;
      case EquipmentType.BOOTS:
        this.equipment.boots = armour;
        break;
    }
    this.backpack.removeItem(armour);
    armour.container = this.equipment;
    this.itemService.movingItem = undefined;
  }

  public unEquipArmour(armour: Armour): void {
    if (!armour) return;
    let mod: keyof typeof armour.mods;
    for (mod in armour.mods) {
      this.mods[mod] -= armour.mods[mod] ?? 0;
    }
    switch (armour.type) {
      case EquipmentType.GLOVES:
        this.equipment.gloves = undefined;
        break;
      case EquipmentType.HELMET:
        this.equipment.helmet = undefined;
        break;
      case EquipmentType.BODY_ARMOUR:
        this.equipment.bodyArmour = undefined;
        break;
      case EquipmentType.BOOTS:
        this.equipment.boots = undefined;
        break;
    }
  }

  public takeDmg(dmg: number): void {
    dmg = dmg - this.mods.armour > 0 ? dmg - this.mods?.armour : 0;
    console.log(this.name, ' took ', dmg, ' damage');
    this.currentHitPoints -= dmg;
    if (this.currentHitPoints <= 0) {
      console.log(this.name, ' has died');
      this.currentHitPoints = 0;
    }
  }

  public rollDmg(): number {
    return (
      Math.floor(Math.random() * (this.mods.maxDmg - this.mods.minDmg + 1)) +
      this.mods.minDmg
    );
  }

  public attack(attacked: Character): boolean {
    if (this.mods.hitChance - attacked.mods.dodgeChance < Math.random()) {
      console.log('Attack missed');
      return false;
    }
    attacked.takeDmg(this.rollDmg());
    return true;
  }
}
