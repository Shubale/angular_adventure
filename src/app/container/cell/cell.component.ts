import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerCell } from '../../models/container';
import Position from '../../models/position';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  @Input() data!: ContainerCell;
  @Input() isHighlighted!: boolean;
  @Input() position!: Position;

  comparePosition(p1: Position, p2: Position): boolean {
    return p1[0] == p2[0] && p1[1] == p2[1];
  }
}
