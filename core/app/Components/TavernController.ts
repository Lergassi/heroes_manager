import _ from 'lodash';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import Tavern from './Tavern.js';

export default class TavernController {
    private readonly _tavern: Tavern;
    private _availableHeroClasses = [
        HeroClassID.Tank1,
        HeroClassID.Warrior,
        HeroClassID.Paladin,
        HeroClassID.Tank2,
        HeroClassID.Tank3,
        HeroClassID.Gladiator,
        HeroClassID.Barbarian,
        HeroClassID.PlateDamageDealer1,
        HeroClassID.PlateDamageDealer2,
        HeroClassID.PlateDamageDealer3,
        HeroClassID.LeatherDamageDealer1,
        HeroClassID.Rogue,
        HeroClassID.Archer,
        HeroClassID.LeatherDamageDealer2,
        HeroClassID.Gunslinger,
        HeroClassID.Necromancer,
        HeroClassID.Mage1,
        HeroClassID.Mage2,
        HeroClassID.Warlock,
        HeroClassID.FireMage,
        HeroClassID.Support1,
        HeroClassID.Support2,
        HeroClassID.Support3,
        HeroClassID.Support4,
        HeroClassID.Support5,
    ];
    private readonly _options = {
        heroes: 5,
        eachHeroes: 1,
    };

    constructor(tavern: Tavern) {
        this._tavern = tavern;
    }

    update(): void {
        this._tavern.removeAll();

        let i = 0;
        while (i < this._options.heroes) {
            let index = _.random(0, this._availableHeroClasses.length - 1);
            this._tavern.add(this._availableHeroClasses[index], this._options.eachHeroes);
            i++;
        }
    }
}