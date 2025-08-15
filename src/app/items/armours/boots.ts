import { Armour, EquipmentType, ItemRarity } from '../../models/equipment';

const boots = new Armour(
  'Leather Boots',
  ItemRarity.COMMON,
  { armour: 15, hitPoints: 1 },
  [2, 2],
  undefined,
  EquipmentType.BOOTS,
  'assets/placeholders/equipment/boots_placeholder.svg',
);

export default boots;
