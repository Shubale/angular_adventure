import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public movingItem: BehaviorSubject<Equipment | undefined> =
    new BehaviorSubject<Equipment | undefined>(undefined);
  constructor() {}
}
