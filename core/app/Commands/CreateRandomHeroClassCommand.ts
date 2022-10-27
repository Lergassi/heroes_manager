import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {assertIsGreaterThan, assertIsGreaterThanOrEqual, assertIsPositive} from '../../source/assert.js';
import HeroFactory from '../Factories/HeroFactory.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';
import Random from '../Services/Random.js';

export default class CreateRandomHeroClassCommand extends Command {
    get name(): string {
        return CommandNameID.create_random_hero_class;
    }

    configure() {
        super.configure();
        this.addArgument('count', '', false, 1);
    }

    async execute(input: Input) {
        let count = parseInt(input.getArgument('count'), 10);
        // let count = input.getArgument('count');
        // if (count === 'max') {
        //     count = 100_000; //todo: Настройки или ооп.
        // } else {
        //     count = parseInt(count, 10);
        // }

        assertIsGreaterThanOrEqual(count, 1);

        //todo: Дублирование кода?
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

        let i = 0;
        while (i < count) {
            try {
                mainHeroList.createHero(
                    Random.one(heroClasses),
                    1,
                    heroFactory,
                );
            } catch (e) {
                console.log(e);
                break;
            }
            ++i;
        }
    }
}