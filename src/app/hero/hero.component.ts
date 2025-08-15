import { Component, inject } from '@angular/core';
import Size from '../models/size';
import { Character } from '../models/character';
import Container from '../models/container';
import {
  Armour,
  Equipment,
  EquipmentType,
  ItemRarity,
  Jewellery,
  Weapon,
} from '../models/equipment';
import { ContainerComponent } from '../container/container.component';
import { KeyValuePipe } from '@angular/common';
import { ItemService } from '../services/item.service';
import shortSword from '../items/weapons/short_sword';
import greatSword from '../items/weapons/great_sword';
import goldAmulet from '../items/jewellery/amulet';
import ring1 from '../items/jewellery/ring1';
import ring2 from '../items/jewellery/ring2';
import testGloves from '../items/armours/gloves';
import boots from '../items/armours/boots';
import helmet from '../items/armours/helmet';
import bodyArmour from '../items/armours/bodyArmour';

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

    this.equipWeapon(shortSword, 1);
    this.equipArmour(boots);
    this.equipArmour(helmet);
    this.equipArmour(bodyArmour);
    this.hero.backpack.putItem(greatSword, greatSword.position!);
    this.hero.backpack.putItem(testGloves, testGloves.position!);
    this.hero.backpack.putItem(goldAmulet, goldAmulet.position!);
    this.hero.backpack.putItem(ring1, ring1.position!);
    this.hero.backpack.putItem(ring2, ring2.position!);
    // this.hero.equipArmour(testGloves);
  }
  onItemSlotClick(
    item: Equipment | undefined,
    slotType: Array<EquipmentType>,
    mouseEvent: MouseEvent,
    ringSlot?: 1 | 2,
    weaponSlot?: 1 | 2,
  ) {
    console.log(
      'Clicked on item slot',
      item,
      slotType,
      this.itemService.movingItem.value,
      '',
      mouseEvent,
    );
    this.itemService.lastPressedPosition.set([mouseEvent.y, mouseEvent.x]);
    // There isn't item in slot nor moving
    if (!item && !this.itemService.movingItem.value) return;
    // There isn't item in slot, but there is one moving
    if (this.itemService.movingItem.value) {
      const itemCopy = undefined;

      // Don't react if the slot doesn't match
      if (!slotType.includes(this.itemService.movingItem.value.type)) {
        console.log(
          'Wrong slot type',
          this.itemService.movingItem.value.type,
          slotType,
        );
        return;
      }
      if (item) {
        this.swapItems(item, ringSlot, weaponSlot);
        return;
      }
      // Since we check type of slot against item's type
      // we can be sure that we are equipping right item
      if (this.itemService.movingItem.value instanceof Armour)
        this.equipArmour(this.itemService.movingItem.value as Armour);
      if (this.itemService.movingItem.value instanceof Weapon)
        this.equipWeapon(
          this.itemService.movingItem.value as Weapon,
          weaponSlot!,
        );
      if (this.itemService.movingItem.value instanceof Jewellery)
        this.equipJewellery(
          this.itemService.movingItem.value as Jewellery,
          ringSlot,
        );

      this.itemService.movingItem.next(itemCopy);
      return;
    }
    // Not empty slot and we are not moving an item -> grab that item
    if (item && !this.itemService.movingItem.value) {
      this.unequipEquipment(item, ringSlot, weaponSlot);
    }
  }

  private swapItems(item: Equipment, ringSlot?: 1 | 2, weaponSlot?: 1 | 2) {
    if (item instanceof Armour) this.unEquipArmour(item as Armour);
    if (item instanceof Weapon) this.unEquipWeapon(weaponSlot!);
    if (item instanceof Jewellery)
      this.unequipJewellery(item as Jewellery, ringSlot);
    if (this.itemService.movingItem.value instanceof Armour)
      this.equipArmour(this.itemService.movingItem.value as Armour);
    if (this.itemService.movingItem.value instanceof Weapon)
      this.equipWeapon(
        this.itemService.movingItem.value as Weapon,
        weaponSlot!,
      );
    if (this.itemService.movingItem.value instanceof Jewellery)
      this.equipJewellery(
        this.itemService.movingItem.value as Jewellery,
        ringSlot,
      );
    this.itemService.movingItem.next(item);
  }

  private unequipEquipment(
    item: Equipment,
    ringSlot?: 1 | 2,
    weaponSlot?: 1 | 2,
  ) {
    this.itemService.movingItem.next(item);
    if (item instanceof Armour) this.unEquipArmour(item as Armour);
    if (item instanceof Weapon) this.unEquipWeapon(weaponSlot!);
    if (item instanceof Jewellery)
      this.unequipJewellery(item as Jewellery, ringSlot);
  }

  public equipWeapon(weapon: Weapon, weaponSlot: 1 | 2): void {
    if (weaponSlot !== 1 && weaponSlot !== 2) {
      throw new Error('You did not provide weaponSlot variable!');
    }
    if (weaponSlot === 2 && !this.hero.equipment.get('weapon1')) {
      weaponSlot = 1;
    }
    if (weaponSlot === 2 && this.hero.equipment.get('weapon1')) {
      const weapon1 = this.hero.equipment.get('weapon1') as Weapon;
      const meanStats = {
        baseMinDmg:
          ((weapon1.mods.baseMinDmg + weapon.mods.baseMinDmg) / 2) * 1.2,
        baseMaxDmg:
          ((weapon1.mods.baseMaxDmg + weapon.mods.baseMaxDmg) / 2) * 1.2,
        baseCritChance:
          ((weapon1.mods.baseCritChance + weapon.mods.baseCritChance) / 2) *
          1.2,
        baseCritDamage:
          ((weapon1.mods.baseCritDamage + weapon.mods.baseCritDamage) / 2) *
          1.2,
      };
      let dummyWeapon: Weapon | null = new Weapon(
        '',
        ItemRarity.COMMON,
        meanStats,
        [0, 0],
        undefined,
        EquipmentType.WEAPON,
        '',
      );
      this.setBaseDamage(dummyWeapon);
      dummyWeapon = null;
    } else {
      this.setBaseDamage(weapon);
    }
    this.hero.equipment.set(`weapon${weaponSlot}`, weapon);
    this.hero.backpack.removeItem(weapon);
    this.itemService.movingItem.next(undefined);
  }

  public unEquipWeapon(weaponSlot: 1 | 2): void {
    if (weaponSlot !== 1 && weaponSlot !== 2) {
      throw new Error('You did not provide weaponSlot variable!');
    }
    this.hero.equipment.set(`weapon${weaponSlot}`, undefined);
    if (weaponSlot === 1) {
      if (this.hero.equipment.get('weapon2') instanceof Weapon) {
        const weapon2 = this.hero.equipment.get('weapon2') as Weapon;
        this.hero.equipment.set('weapon1', weapon2);
        this.hero.equipment.set('weapon2', undefined);
        this.setBaseDamage(weapon2);
      } else {
        this.setBaseDamage(undefined);
      }
    }
    if (weaponSlot === 2) {
      if (this.hero.equipment.get('weapon1') instanceof Weapon) {
        const weapon1 = this.hero.equipment.get('weapon1') as Weapon;
        this.setBaseDamage(weapon1);
      }
    }
  }

  public equipJewellery(jewellery: Jewellery, ringSlot?: 1 | 2): void {
    let mod: keyof typeof jewellery.mods;
    for (mod in jewellery.mods) {
      this.hero.mods[mod] += jewellery.mods[mod] ?? 0;
    }
    switch (jewellery.type) {
      case EquipmentType.RING:
        if (ringSlot !== 1 && ringSlot !== 2) {
          throw new Error('You did not provide ring slot!');
        }
        this.hero.equipment.set(`ring${ringSlot}`, jewellery);
        break;
      case EquipmentType.AMULET:
        this.hero.equipment.set('amulet', jewellery);
        break;
    }
    this.hero.backpack.removeItem(jewellery);
    this.itemService.movingItem.next(undefined);
  }

  public unequipJewellery(jewellery: Jewellery, ringSlot?: 1 | 2): void {
    if (!jewellery) return;
    let mod: keyof typeof jewellery.mods;
    for (mod in jewellery.mods) {
      this.hero.mods[mod] -= jewellery.mods[mod] ?? 0;
    }
    switch (jewellery.type) {
      case EquipmentType.RING:
        if (ringSlot !== 1 && ringSlot !== 2) {
          throw new Error('You did not provide ring slot!');
        }
        this.hero.equipment.set(`ring${ringSlot}`, undefined);
        break;
      case EquipmentType.AMULET:
        this.hero.equipment.set('amulet', undefined);
        break;
    }
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

  private setBaseDamage(source: Weapon | undefined): void {
    if (!source) {
      this.hero.mods.baseMinDmg = this.hero.baseMods.baseMinDmg;
      this.hero.mods.baseMaxDmg = this.hero.baseMods.baseMaxDmg;
      this.hero.mods.baseCritChance = this.hero.baseMods.baseCritChance;
      this.hero.mods.baseCritDamage = this.hero.baseMods.baseCritDamage;
    } else {
      this.hero.mods.baseMinDmg = source.mods.baseMinDmg;
      this.hero.mods.baseMaxDmg = source.mods.baseMaxDmg;
      this.hero.mods.baseCritChance = source.mods.baseCritChance;
      this.hero.mods.baseCritDamage = source.mods.baseCritDamage;
    }
  }

  protected readonly EquipmentType = EquipmentType;
  protected readonly console = console;
}
