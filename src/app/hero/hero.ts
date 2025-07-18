import { Component } from '@angular/core';
import Size from '../models/size';
import { Character } from '../models/character';
import Container, { ContainerCell } from '../models/container';
import { Equipment, ItemRarity, Weapon } from '../models/equipment';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  // Width, Height
  protected readonly BACKPACK_SIZE: Size = [13, 8];

  protected isMovingItem: boolean = false;

  protected movingItem: Equipment | undefined;

  public getIterable(n: number): Iterable<number> {
    return new Array(n);
  }

  public hero: Character;

  constructor() {
    this.hero = new Character('The hero', {
      armour: 0,
      blockChance: 0,
      critChance: 0,
      critDamage: 0,
      dodgeChance: 0,
      hitChance: 0,
      hitPoints: 0,
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
        minDmg: 1,
        maxDmg: 5,
        critChance: 0.1,
        critDamage: 1.6,
      },
      [3, 1],
      [0, 0],
      this.hero.backpack,
    );
    console.log(this.hero.backpack);
  }

  onItemClick($event: ContainerCell) {
    console.log($event);
    // Base case. Cell is empty and not moving an item
    if (!$event.data && !this.isMovingItem) return;
    // Empty cell == can put item if it is being moved
    // OR
    // Cell with data, but of the same equipment we try to move
    if (
      (!$event.data && this.isMovingItem) ||
      ($event.data && this.isMovingItem && $event!.data === this.movingItem)
    ) {
      if (this.hero.backpack.moveItem(this.movingItem!, [$event.y, $event.x])) {
        this.isMovingItem = false;
        console.log('Unmove');
        return;
      }
    }
    // Cell has data and we are not moving an item
    if ($event.data && !this.isMovingItem) {
      // We can be sure that data exists since we've exhausted isMovingItem options
      // when data is not present
      this.movingItem = $event!.data;
      this.isMovingItem = true;
    }

    console.log(`You are ${this.movingItem ? '' : 'not'} moving item`);
  }

  onItemHover($event: MouseEvent) {
    console.log(typeof $event.target);
    if (this.isMovingItem) {
      ($event.target as HTMLElement).style.backgroundColor = 'green';
    }
  }

  onUnhoverItem($event: MouseEvent) {
    console.log($event);
    ($event.target as HTMLElement).style.backgroundColor = 'grey';
  }
}
