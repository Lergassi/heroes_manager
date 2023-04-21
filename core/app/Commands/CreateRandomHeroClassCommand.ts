import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {assertIsGreaterThanOrEqual} from '../../source/assert.js';
import HeroFactory from '../Factories/HeroFactory.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import MainHeroList from '../Components/MainHeroList.js';
import Random from '../Services/Random.js';

export default class CreateRandomHeroClassCommand extends Command {
    get name(): string {
        return CommandID.create_random_hero_class;
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
            HeroClassID.FireMage,
            HeroClassID.Warlock,
            HeroClassID.Support4,
            HeroClassID.Support5,
        ];

        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);
        let mainHeroList = this.container.get<MainHeroList>(ServiceID.MainHeroList);

        let i = 0;
        while (i < count) {
            try {
                mainHeroList.createHero(
                    Random.one(heroClasses),
                    1,
                );
            } catch (e) {
                console.log(e);
                break;
            }
            ++i;
        }
    }
}