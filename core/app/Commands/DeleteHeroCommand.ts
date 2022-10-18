import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';

export default class DeleteHeroCommand extends Command {
    get name(): string {
        return 'hero.delete';
    }

    configure() {
        super.configure();
        this.addArgument('hero_id', '', true);
    }

    async execute(input: Input) {
        //todo: Где то должна происходить проверка возможности полностью удалить героя.
        let heroId = parseInt(input.getArgument('hero_id'), 10);

        this
            .container
            .get<MainHeroListComponent>(ContainerKey.MainHeroListComponent)
            .deleteHero(
                this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).getOneByID(heroId),
                this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage),
            );
    }
}