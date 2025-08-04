import { Component, inject } from '@angular/core';
import Size from '../models/size';
import { Character } from '../models/character';
import Container from '../models/container';
import {
  Armour,
  Equipment,
  EquipmentType,
  ItemRarity,
  Weapon,
} from '../models/equipment';
import { ContainerComponent } from '../container/container.component';
import { KeyValuePipe } from '@angular/common';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-hero',
  imports: [ContainerComponent, KeyValuePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  // Width, Height
  protected readonly BACKPACK_SIZE: Size = [13, 8];

  private itemService: ItemService = inject(ItemService);

  public hero: Character;

  constructor() {
    this.hero = new Character('The hero', {
      baseBlockChance: 0,
      baseCritChance: 0.05,
      baseCritDamage: 1.5,
      baseMaxDmg: 1,
      baseMinDmg: 1,
      armour: 0,
      blockChance: 0,
      critChance: 0,
      critDamage: 0,
      dodgeChance: 0,
      hitChance: 0,
      hitPoints: 10,
      maxDmg: 0,
      minDmg: 0,
    });
    this.hero.backpack = new Container(
      this.BACKPACK_SIZE[0],
      this.BACKPACK_SIZE[1],
    );
    const weapon: Weapon = new Weapon(
      'Short sword',
      ItemRarity.COMMON,
      {
        baseMinDmg: 1,
        baseMaxDmg: 5,
        baseCritChance: 0.1,
        baseCritDamage: 1.6,
      },
      [3, 1],
      [0, 0],
    );
    const weapon2: Weapon = new Weapon(
      'Zweihander',
      ItemRarity.UNCOMMON,
      {
        baseMinDmg: 6,
        baseMaxDmg: 18,
        baseCritChance: 0.15,
        baseCritDamage: 2.0,
      },
      [4, 2],
      [0, 1],
    );
    const testGloves = new Armour(
      'Leather gloves',
      ItemRarity.COMMON,
      { armour: 10, hitPoints: 3 },
      [2, 2],
      [0, 3],
      EquipmentType.GLOVES,
    );
    this.equipWeapon(weapon);
    this.hero.backpack.putItem(weapon2, weapon2.position!);
    this.hero.backpack.putItem(testGloves, testGloves.position!);
    // this.hero.equipArmour(testGloves);
  }
  onItemSlotClick(item: Equipment | undefined, slotType: EquipmentType) {
    console.log(
      'Clicked on item slot',
      item,
      slotType,
      this.itemService.movingItem.value,
    );
    // There isn't item in slot nor moving
    if (!item && !this.itemService.movingItem.value) return;
    // There isn't item in slot, but there is one moving
    if (!item && this.itemService.movingItem.value) {
      // Don't react if the slot doesn't match
      if (slotType != this.itemService.movingItem.value.type) {
        return;
      }
      // Since we check type of slot against item's type
      // we can be sure that we are equipping right item
      if (this.itemService.movingItem.value instanceof Armour)
        this.equipArmour(this.itemService.movingItem.value as Armour);
      if (this.itemService.movingItem.value instanceof Weapon)
        this.equipWeapon(this.itemService.movingItem.value as Weapon);
    }
    // Not empty slot and we are not moving an item -> grab that item
    if (item && !this.itemService.movingItem.value) {
      this.itemService.movingItem.next(item);
      if (item instanceof Armour) this.unEquipArmour(item as Armour);
      if (item instanceof Weapon) this.unEquipWeapon();
    }
  }

  public equipWeapon(weapon: Weapon): void {
    this.hero.mods.baseMinDmg = weapon.mods.baseMinDmg;
    this.hero.mods.baseMaxDmg = weapon.mods.baseMaxDmg;
    this.hero.mods.baseCritChance = weapon.mods.baseCritChance;
    this.hero.mods.baseCritDamage = weapon.mods.baseCritDamage;
    this.hero.equipment.set('weapon1', weapon);
    this.hero.backpack.removeItem(weapon);
    this.itemService.movingItem.next(undefined);
  }

  public unEquipWeapon(): void {
    this.hero.mods.baseMinDmg = this.hero.baseMods.baseMinDmg;
    this.hero.mods.baseMaxDmg = this.hero.baseMods.baseMaxDmg;
    this.hero.mods.baseCritChance = this.hero.baseMods.baseCritChance;
    this.hero.mods.baseCritDamage = this.hero.baseMods.baseCritDamage;
    this.hero.equipment.set('weapon1', undefined);
  }

  public equipArmour(armour: Armour): void {
    let mod: keyof typeof armour.mods;
    for (mod in armour.mods) {
      this.hero.mods[mod] += armour.mods[mod] ?? 0;
    }
    switch (armour.type) {
      case EquipmentType.GLOVES:
        this.hero.equipment.set('gloves', armour);
        break;
      case EquipmentType.HELMET:
        this.hero.equipment.set('helmet', armour);
        break;
      case EquipmentType.BODY_ARMOUR:
        this.hero.equipment.set('bodyArmour', armour);
        break;
      case EquipmentType.BOOTS:
        this.hero.equipment.set('boots', armour);
        break;
    }
    this.hero.backpack.removeItem(armour);
    this.itemService.movingItem.next(undefined);
  }

  public unEquipArmour(armour: Armour): void {
    if (!armour) return;
    let mod: keyof typeof armour.mods;
    for (mod in armour.mods) {
      this.hero.mods[mod] -= armour.mods[mod] ?? 0;
    }
    switch (armour.type) {
      case EquipmentType.GLOVES:
        this.hero.equipment.set('gloves', undefined);
        break;
      case EquipmentType.HELMET:
        this.hero.equipment.set('helmet', undefined);
        break;
      case EquipmentType.BODY_ARMOUR:
        this.hero.equipment.set('bodyArmour', undefined);
        break;
      case EquipmentType.BOOTS:
        this.hero.equipment.set('boots', undefined);
        break;
    }
  }

  protected readonly EquipmentType = EquipmentType;
}
