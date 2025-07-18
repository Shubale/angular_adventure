import { CharacterModifiers } from './mods';
import { Weapon } from './equipment';
import Container from './container';

export class Character {
  private baseMods: CharacterModifiers;
  public currentHitPoints;
  public backpack: Container = new Container(6, 6);
  constructor(
    public name: string,
    public mods: CharacterModifiers,
  ) {
    this.baseMods = JSON.parse(JSON.stringify(mods));
    this.currentHitPoints = JSON.parse(JSON.stringify(mods.hitPoints));
    //localStorage.setItem('wep', JSON.stringify(this.weapon));
    //console.log(JSON.parse(localStorage.getItem('wep') ?? '{}'));
  }

  public equipWeapon(weapon: Weapon): void {
    this.mods.minDmg = weapon.mods.minDmg;
    this.mods.maxDmg = weapon.mods.maxDmg;
    this.mods.critChance = weapon.mods.critChance;
    this.mods.critDamage = weapon.mods.critDamage;
  }

  public unequipWeapon(): void {
    this.mods.minDmg = this.baseMods.minDmg;
    this.mods.maxDmg = this.baseMods.maxDmg;
    this.mods.critChance = this.baseMods.critChance;
    this.mods.critDamage = this.baseMods.critDamage;
  }

  public takeDmg(dmg: number): void {
    dmg = dmg - this.mods.armour > 0 ? dmg - this.mods?.armour : 0;
    console.log(this.name, ' took ', dmg, ' damage');
    this.currentHitPoints -= dmg;
    if (this.currentHitPoints <= 0) {
      console.log(this.name, ' has died');
      this.currentHitPoints = 0;
    }
  }

  public rollDmg(): number {
    return (
      Math.floor(Math.random() * (this.mods.maxDmg - this.mods.minDmg + 1)) +
      this.mods.minDmg
    );
  }

  public attack(attacked: Character): boolean {
    if (this.mods.hitChance - attacked.mods.dodgeChance < Math.random()) {
      console.log('Attack missed');
      return false;
    }
    attacked.takeDmg(this.rollDmg());
    return true;
  }
}
