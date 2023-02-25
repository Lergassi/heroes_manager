import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import HeroFactory from '../Factories/HeroFactory.js';
import MainHeroList from '../Components/MainHeroList.js';
import {CommandID} from '../../types/enums/CommandID.js';

export default class CreateAllHeroClassesCommand extends Command {
    get name(): string {
        return CommandID.create_all_hero_classes;
    }

    async execute(input: Input) {
        let heroClasses = [
            HeroClassID.Warrior,
            HeroClassID.Paladin,
            HeroClassID.Tank1,
            HeroClassID.Tank2,
            HeroClassID.Tank3,

            HeroClassID.Gladiator,
            HeroClassID.Barbarian,
            HeroClassID.PlateDamageDealer1,
            HeroClassID.PlateDamageDealer2,
            HeroClassID.PlateDamageDealer3,

            HeroClassID.Rogue,
            HeroClassID.Archer,
            HeroClassID.Gunslinger,
            HeroClassID.LeatherDamageDealer1,
            HeroClassID.LeatherDamageDealer2,

            HeroClassID.FireMage,
            HeroClassID.Mage1,
            HeroClassID.Mage2,
            HeroClassID.Warlock,
            HeroClassID.Necromancer,

            HeroClassID.Support4,
            HeroClassID.Support5,
            HeroClassID.Support1,
            HeroClassID.Support2,
            HeroClassID.Support3,
        ];

        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);
        let mainHeroList = this.container.get<MainHeroList>(ServiceID.MainHeroList);

        for (let i = 0; i < heroClasses.length; i++) {
            mainHeroList.createHero(
                heroClasses[i],
                1,
                heroFactory,
            );
        }
    }
}