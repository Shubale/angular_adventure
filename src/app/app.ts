import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    effect(() => {
      const [top, left] = this.itemService.lastPressedPosition();
      if (!this.itemService.movingItem.value) {
        return;
      }
      this.left = `calc(${left}px - ${this.itemService.movingItem.value?.size[1]}rem`;
      this.top = `calc(${top}px - ${this.itemService.movingItem.value?.size[0]}rem`;
    });
  }
  protected itemService: ItemService = inject(ItemService);
  protected left: string = '';
  protected top: string = '';

  protected readonly title = signal('Angular Adventure');

  onMouseMove(event: MouseEvent): void {
    if (!this.itemService.movingItem.value) return;
    this.left = `calc(${event.x}px - ${this.itemService.movingItem.value?.size[1]}rem`;
    this.top = `calc(${event.y}px - ${this.itemService.movingItem.value?.size[0]}rem`;
  }
}
