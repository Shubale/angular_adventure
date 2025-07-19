import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Container, { ContainerCell } from '../models/container';
import { Equipment } from '../models/equipment';
import { CellComponent } from './cell/cell.component';
import Position from '../models/position';

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

  protected mousePosition: Position = [0, 0];

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
  }

  onItemHover(item: ContainerCell) {
    if (this.isMovingItem) {
      this.mousePosition = [item.y, item.x];
    }
  }

  shouldHighlightCell(
    cellPosition: Position,
    hoverPosition: Position,
  ): boolean {
    if (!this.isMovingItem) return false;
    if (!this.movingItem) return false;
    if (cellPosition === hoverPosition) return true;
    if (
      cellPosition[1] < this.movingItem.size[1] + hoverPosition[1] &&
      cellPosition[1] >= hoverPosition[1] &&
      cellPosition[0] < this.movingItem.size[0] + hoverPosition[0] &&
      cellPosition[0] >= hoverPosition[0]
    ) {
      return true;
    }
    return false;
  }
}
