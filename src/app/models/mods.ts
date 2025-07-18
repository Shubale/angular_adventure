interface IAllModifiers {
  minDmg: number;
  maxDmg: number;
  hitPoints: number;
  blockChance: number;
  dodgeChance: number;
  armour: number;
  hitChance: number;
  critChance: number;
  critDamage: number;
}

export type AllModifiers = Partial<IAllModifiers>;

export type CharacterModifiers = Required<IAllModifiers>;

export type WeaponModifiers = Required<Pick<IAllModifiers,
  'minDmg' | 'maxDmg' | 'critChance' | 'critDamage'>>
  & Partial<IAllModifiers>;
