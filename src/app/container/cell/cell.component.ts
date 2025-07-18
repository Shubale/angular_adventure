import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Equipment } from '../../models/equipment';
import { ContainerCell } from '../../models/container';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  @Input() data!: ContainerCell;
}
