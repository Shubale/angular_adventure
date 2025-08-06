import { Injectable } from '@angular/core';
import EquipmentSlots from '../models/equipment_slots';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public equipment: EquipmentSlots = new EquipmentSlots();

  constructor() {}
}
