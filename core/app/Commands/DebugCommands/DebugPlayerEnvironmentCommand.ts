import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {debugHeroes, debugItemStorages, debugWallet, debugWallets} from '../../../debug/debug_functions.js';

export default class DebugPlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'debug_player_env';
    }

    async execute(input: Input) {
        this.container.get('security').assertIsPlayerLoaded();

        debugWallets(this.container);
        debugItemStorages(this.container)
        debugHeroes(this.container)
    }
}