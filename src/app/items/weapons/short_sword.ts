import { EquipmentType, ItemRarity, Weapon } from '../../models/equipment';

const shortSword: Weapon = new Weapon(
  'Short sword',
  ItemRarity.COMMON,
  {
    baseCritChance: 0.1,
    baseCritDamage: 1.6,
    baseMaxDmg: 2,
    baseMinDmg: 5,
  },
  [3, 1],
  [0, 0],
  EquipmentType.WEAPON,
  'assets/placeholders/equipment/short_sword_placeholder.svg',
);
export default shortSword;
