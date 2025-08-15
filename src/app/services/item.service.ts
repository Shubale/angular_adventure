import { Injectable, signal, WritableSignal } from '@angular/core';
import { Equipment } from '../models/equipment';
import { BehaviorSubject } from 'rxjs';
import Position from '../models/position';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public movingItem: BehaviorSubject<Equipment | undefined> =
    new BehaviorSubject<Equipment | undefined>(undefined);
  public lastPressedPosition: WritableSignal<Position> = signal([0, 0]);
  constructor() {}
}
