import Command from '../../../source/GameConsole/Command.js';
import util, {InspectOptions} from 'util';
import Input from '../../../source/GameConsole/Input.js';
import GameObject from '../../../source/GameObject.js';

export default class InspectGameObjectCommand extends Command {
    get name(): string {
        return 'inspect_game_object';
    }

    configure() {
        super.configure();
        this.addArgument('id', '', true);
        this.addArgument('depth',  '', false, 1);
        this.addArgument('showHidden', '1/0', false, 0);
    }

    async execute(input: Input) {
        let id: number = parseInt(input.getArgument('id'));
        let options = {
            depth: parseInt(input.getArgument('depth')),
            showHidden: input.getArgument('showHidden') === '1',
        };

        let gameObject = <GameObject>this.container.get('gameObjectStorage').getOneByID(id);
        console.log(util.inspect(gameObject, options));
    }
}