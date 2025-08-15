import { EquipmentType, ItemRarity, Shield } from '../../models/equipment';

const shield = new Shield(
  'Metal shield',
  ItemRarity.COMMON,
  { armour: 10, baseBlockChance: 0.22 },
  [3, 2],
  [0, 5],
  EquipmentType.SHIELD,
  'assets/placeholders/equipment/shield_placeholder.svg',
);

export default shield;
