import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Container, { ContainerCell } from '../models/container';
import { CellComponent } from './cell/cell.component';
import Position from '../models/position';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  @Input() container!: Container;

  private itemService: ItemService = inject(ItemService);

  public getIterable(n: number): Iterable<number> {
    return Array(n);
  }

  protected mousePosition: Position = [0, 0];

  onItemClick($event: ContainerCell) {
    console.log('Container click: ', JSON.stringify($event.data?.name));
    // Base case. Cell is empty and not moving an item
    if (!$event.data && !this.itemService.movingItem.value) return;
    // Empty cell == can put item if it is being moved
    // OR
    // Cell with data, but of the same equipment we try to move
    if (
      (!$event.data && this.itemService.movingItem.value) ||
      ($event.data &&
        this.itemService.movingItem.value &&
        $event!.data === this.itemService.movingItem.value)
    ) {
      this.container.putItem(this.itemService.movingItem.value, [
        $event.y,
        $event.x,
      ]);
      return;
    }
    // Cell has data and we are not moving an item
    if ($event.data && !this.itemService.movingItem.value) {
      // We can be sure that data exists since we've exhausted isMovingItem options
      // when data is not present
      this.itemService.movingItem.next($event.data);
      this.container.removeItem($event.data);

      console.log('Set moving item to', $event.data);
    }
  }

  onItemHover(item: ContainerCell) {
    if (this.itemService.movingItem) {
      this.mousePosition = [item.y, item.x];
    }
  }

  shouldHighlightCell(
    cellPosition: Position,
    hoverPosition: Position,
  ): boolean {
    if (!this.itemService.movingItem.value) return false;
    if (cellPosition === hoverPosition) return true;
    if (
      cellPosition[1] <
        this.itemService.movingItem.value.size[1] + hoverPosition[1] &&
      cellPosition[1] >= hoverPosition[1] &&
      cellPosition[0] <
        this.itemService.movingItem.value.size[0] + hoverPosition[0] &&
      cellPosition[0] >= hoverPosition[0]
    ) {
      return true;
    }
    return false;
  }
}
