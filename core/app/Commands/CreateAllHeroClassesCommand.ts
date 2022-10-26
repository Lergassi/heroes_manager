import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import HeroFactory from '../Factories/HeroFactory.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';

export default class CreateAllHeroClassesCommand extends Command {
    get name(): string {
        return CommandNameID.create_all_hero_classes;
    }

    async execute(input: Input) {
        let heroClasses = [
            HeroClassID.Warrior,
            HeroClassID.Paladin,
            HeroClassID.Rogue,
            HeroClassID.Gladiator,
            HeroClassID.Archer,
            HeroClassID.Gunslinger,
            HeroClassID.Mage,
            HeroClassID.Warlock,
            HeroClassID.Priest,
            HeroClassID.Druid,
        ];

        let heroFactory = this.container.get<HeroFactory>(ContainerID.HeroFactory);
        let mainHeroList = this.container.get<MainHeroListComponent>(ContainerID.MainHeroList);

        for (let i = 0; i < heroClasses.length; i++) {
            mainHeroList.createHero(
                heroClasses[i],
                1,
                heroFactory,
            );
        }
    }
}