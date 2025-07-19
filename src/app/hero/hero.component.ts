import { Component } from '@angular/core';
import Size from '../models/size';
import { Character } from '../models/character';
import Container from '../models/container';
import { Armour, EquipmentType, ItemRarity, Weapon } from '../models/equipment';
import { ContainerComponent } from '../container/container.component';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [ContainerComponent, KeyValuePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  // Width, Height
  protected readonly BACKPACK_SIZE: Size = [13, 8];

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
      this.hero.backpack,
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
      this.hero.backpack,
    );
    const testGloves = new Armour(
      'Leather gloves',
      ItemRarity.COMMON,
      { armour: 10, hitPoints: 3 },
      [2, 2],
      [0, 3],
      this.hero.backpack,
      EquipmentType.GLOVES,
    );
    this.hero.equipWeapon(weapon);
    this.hero.equipArmour(testGloves);
  }
}
