import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';

export default class DeleteHeroCommand extends Command {
    get name(): string {
        return CommandNameID.delete_hero;
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
            .get<MainHeroListComponent>(ContainerID.MainHeroList)
            .deleteHero(
                this.container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByID(heroId),
                this.container.get<GameObjectStorage>(ContainerID.GameObjectStorage),
            );
    }
}