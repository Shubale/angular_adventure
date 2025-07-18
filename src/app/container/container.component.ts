import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Container, { ContainerCell } from '../models/container';
import { Equipment } from '../models/equipment';
import { CellComponent } from './cell/cell.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  @Input() container!: Container;

  protected isMovingItem: boolean = false;

  protected movingItem: Equipment | undefined;

  public getIterable(n: number): Iterable<number> {
    return Array(n);
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
      if (this.container.moveItem(this.movingItem!, [$event.y, $event.x])) {
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
