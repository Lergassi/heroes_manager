import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import GameObject from '../../../source/GameObject.js';
import GameObjectStorage from '../../../source/GameObjectStorage.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';

export default class InspectGameObjectCommand extends Command {
    get name(): string {
        return 'inspect_game_object';
    }

    configure() {
        super.configure();
        this.addArgument('id', '', true);
        this.addArgument('depth', '', false, 1);
        this.addArgument('showHidden', '1/0', false, 0);
    }

    async execute(input: Input) {
        let id = parseInt(input.getArgument('id'), 10);
        let options = {
            depth: parseInt(input.getArgument('depth'), 10),
            showHidden: input.getArgument('showHidden') === '1',
        };

        let gameObject = <GameObject>this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(id);
        console.dir(gameObject, options);
    }
}