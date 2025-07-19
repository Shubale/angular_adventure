interface IAllModifiers {
  // These mods are the base for any additional values
  baseMinDmg: number;
  baseMaxDmg: number;
  baseCritChance: number;
  baseCritDamage: number;
  baseBlockChance: number;

  // These mods are always additive to the base or 0
  minDmg: number;
  maxDmg: number;
  critChance: number;
  critDamage: number;
  hitPoints: number;
  blockChance: number;
  dodgeChance: number;
  armour: number;
  hitChance: number;
}

export type AllModifiers = Partial<IAllModifiers>;

export type CharacterModifiers = Required<IAllModifiers>;

export type WeaponModifiers = Required<
  Pick<
    IAllModifiers,
    'baseMinDmg' | 'baseMaxDmg' | 'baseCritChance' | 'baseCritDamage'
  >
> &
  Partial<IAllModifiers>;

export type ArmourModifiers = Partial<IAllModifiers>;

export type JewelleryModifiers = Partial<IAllModifiers>;

export type ShieldModifiers = Required<Pick<IAllModifiers, 'baseBlockChance'>> &
  Partial<IAllModifiers>;
