import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import Size from '../models/size';
import { Character } from '../models/character';
import Container, { ContainerCell } from '../models/container';
import { Equipment, ItemRarity, Weapon } from '../models/equipment';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-hero',
  imports: [ContainerComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {
  // Width, Height
  protected readonly BACKPACK_SIZE: Size = [13, 8];

  protected HTMLArrayReferences: Array<HTMLCollection> = [];

  @ViewChildren('backpack_row') protected t!: QueryList<ElementRef>;

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

  ngAfterViewInit() {
    console.log('Children: ', this.t.get(0)?.nativeElement.children[1]);
    // this.t.get(0)?.nativeElement?.children[1]?.style?.backgroundColor = 'red';
    this.t?.forEach((e) => {
      console.log(e);
    });
  }
}
