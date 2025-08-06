import { EquipmentType, ItemRarity, Jewellery } from '../../models/equipment';

const ring1: Jewellery = new Jewellery(
  'Diamond Ring',
  ItemRarity.UNCOMMON,
  {
    critChance: 0.05,
    critDamage: 0.05,
  },
  [1, 1],
  [5, 0],
  EquipmentType.AMULET,
  'assets/placeholders/equipment/ring1_placeholder.svg',
);

export default ring1;
