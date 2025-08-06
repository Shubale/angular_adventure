import { CharacterModifiers } from './mods';
import Container from './container';
import EquipmentSlots from './equipment_slots';
import { ItemService } from '../services/item.service';
import { inject } from '@angular/core';
import { Equipment, EquipmentType } from './equipment';

export class Character {
  baseMods: CharacterModifiers;
  public currentHitPoints;
  public backpack: Container = new Container(6, 6);
  public equipment: Map<string, Equipment | undefined> = new Map<
    string,
    Equipment | undefined
  >([
    ['weapon1', undefined],
    ['weapon2', undefined],
    ['helmet', undefined],
    ['bodyArmour', undefined],
    ['gloves', undefined],
    ['boots', undefined],
    ['ring1', undefined],
    ['ring2', undefined],
    ['amulet', undefined],
  ]);
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
