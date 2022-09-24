import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {debugHeroes, debugItemStorages, debugPlayerGameObject, debugWallets} from '../../../debug/debug_functions.js';
import Security from '../../../../server/source/Security.js';

export default class DebugPlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'debug_player_env';
    }

    async execute(input: Input) {
        debugPlayerGameObject(this.container);
        debugWallets(this.container);
        // debugItemStorages(this.container);
        debugHeroes(this.container)
    }
}