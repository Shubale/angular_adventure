import { Armour, EquipmentType, ItemRarity } from '../../models/equipment';

const helmet = new Armour(
  'Leather gloves',
  ItemRarity.COMMON,
  { armour: 20, hitPoints: 5 },
  [2, 2],
  undefined,
  EquipmentType.HELMET,
  'assets/placeholders/equipment/helmet_placeholder.svg',
);

export default helmet;
