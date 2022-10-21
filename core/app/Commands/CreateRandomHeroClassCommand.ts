import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {assertIsGreaterThan, assertIsGreaterThanOrEqual, assertIsPositive} from '../../source/assert.js';
import HeroFactory from '../Factories/HeroFactory.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
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
        let count = input.getArgument('count');
        if (count === 'max') {
            count = 100_000; //todo: Настройки или ооп.
        } else {
            count = parseInt(count, 10);
        }

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

        let heroFactory = this.container.get<HeroFactory>(ContainerKey.HeroFactory);
        let mainHeroList = this.container.get<MainHeroListComponent>(ContainerKey.MainHeroListComponent);

        let i = 0;
        while (i < count) {
            try {
                mainHeroList.createHero({
                    heroClass: Random.one(heroClasses),
                    level: 1,
                    heroFactory: heroFactory,
                });
            } catch (e) {
                console.log(e);
                break;
            }
            ++i;
        }
    }
}