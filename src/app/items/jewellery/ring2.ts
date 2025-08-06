import { EquipmentType, ItemRarity, Jewellery } from '../../models/equipment';

const ring2: Jewellery = new Jewellery(
  'Amethyst Ring',
  ItemRarity.UNCOMMON,
  {
    hitChance: 0.1,
  },
  [1, 1],
  [7, 0],
  EquipmentType.RING,
  'assets/placeholders/equipment/ring2_placeholder.svg',
);

export default ring2;
