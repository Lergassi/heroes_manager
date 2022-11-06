import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {CommandID} from '../../types/enums/CommandID.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {assertNotNil} from '../../source/assert.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import TakeComponent from '../Components/TakeComponent.js';
import AppError from '../../source/Errors/AppError.js';

export default class KillHeroCommand extends Command {
    get name(): string {
        return CommandID.kill_hero;
    }

    configure() {
        super.configure();
        this.addArgument('hero_id', '', true);
    }

    async execute(input: Input) {
        let heroID = parseInt(input.getArgument('hero_id'), 10);
        let hero = this.container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByID(heroID);
        assertNotNil(hero);

        //todo: Неверно. Нужно искать в главном списке и проверять возможность убить командой. Но пока так.
        if (!hero.get<TakeComponent>(TakeComponent.name).isFree()) {
            throw new AppError();
        }

        hero.get<HealthPointsComponent>(HealthPointsComponent.name).kill();
    }
}