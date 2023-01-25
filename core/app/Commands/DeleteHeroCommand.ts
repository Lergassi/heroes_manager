import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import MainHeroList from '../Components/MainHeroList.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';

export default class DeleteHeroCommand extends Command {
    get name(): string {
        return CommandID.delete_hero;
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
            .get<MainHeroList>(ServiceID.MainHeroList)
            .deleteHero(
                this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(heroId),

            );
    }
}