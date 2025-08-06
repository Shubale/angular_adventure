import { EquipmentType, ItemRarity, Weapon } from '../../models/equipment';

const greatSword: Weapon = new Weapon(
  'Zweihander',
  ItemRarity.UNCOMMON,
  {
    baseMinDmg: 6,
    baseMaxDmg: 18,
    baseCritChance: 0.15,
    baseCritDamage: 2.0,
  },
  [4, 2],
  [0, 1],
  EquipmentType.WEAPON,
  'assets/placeholders/equipment/great_sword_placeholder.svg',
);

export default greatSword;
