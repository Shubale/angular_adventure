import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public movingItem: Equipment | undefined;
  constructor() {}
}
