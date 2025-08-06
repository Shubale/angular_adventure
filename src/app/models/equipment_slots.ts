import { Armour, Jewellery, Shield, Weapon } from './equipment';

export default class EquipmentSlots2 {
  weapon1: Weapon | undefined;
  weapon2: Weapon | Shield | undefined;

  helmet: Armour | undefined;
  gloves: Armour | undefined;
  bodyArmour: Armour | undefined;
  boots: Armour | undefined;

  ring1: Jewellery | undefined;
  ring2: Jewellery | undefined;
  amulet: Jewellery | undefined;
}
