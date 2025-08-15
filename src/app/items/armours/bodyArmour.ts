import { Armour, EquipmentType, ItemRarity } from '../../models/equipment';

const bodyArmour = new Armour(
  'Plate armour',
  ItemRarity.COMMON,
  { armour: 50 },
  [4, 2],
  undefined,
  EquipmentType.BODY_ARMOUR,
  'assets/placeholders/equipment/body_armour_placeholder.svg',
);

export default bodyArmour;
