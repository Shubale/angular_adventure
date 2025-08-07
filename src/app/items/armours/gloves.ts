import { Armour, EquipmentType, ItemRarity } from '../../models/equipment';

const testGloves = new Armour(
  'Leather gloves',
  ItemRarity.COMMON,
  { armour: 10, hitPoints: 3 },
  [2, 2],
  [0, 3],
  EquipmentType.GLOVES,
  'assets/placeholders/equipment/gloves_placeholder.svg',
);

export default testGloves;
