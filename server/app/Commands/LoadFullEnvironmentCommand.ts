import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';

//todo: Сделать alias.
export default class LoadFullEnvironmentCommand extends Command {
    get name(): string {
        return 'load';
    }

    configure() {
        super.configure();
        this.addArgument('user_ID', '', true);
        this.addArgument('player_ID', '', true);
    }

    async execute(input: Input) {
        let usedID: string = input.getArgument('user_ID');
        let playerID: string = input.getArgument('player_ID');

        await this.container.get<GameConsole>(ServiceID.GameConsole).run('load_user_env', [usedID]);
        await this.container.get<GameConsole>(ServiceID.GameConsole).run('load_player_env', [playerID]);
    }
}