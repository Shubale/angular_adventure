import { EquipmentType, ItemRarity, Jewellery } from '../../models/equipment';

const goldAmulet: Jewellery = new Jewellery(
  'Gold Amulet',
  ItemRarity.UNCOMMON,
  {
    maxDmg: 3,
    minDmg: 1,
  },
  [1, 1],
  [6, 0],
  EquipmentType.AMULET,
  'assets/placeholders/equipment/amulet_placeholder.svg',
);

export default goldAmulet;
