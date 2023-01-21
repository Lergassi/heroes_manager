import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import debug from 'debug';
import Security from '../../source/Security.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';

export default class UnloadUserEnvironmentCommand extends Command {
    get name(): string {
        return 'unload_user_env';
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsUserLoaded();

        if (this.container.get<Security>('server.security').isPlayerLoaded()) {
            await this.container.get<GameConsole>(ServiceID.GameConsole).run('unload_player_env');
        }
        this.container.get<Security>('server.security').logoutUser();

        debug(DebugNamespaceID.Info)('Окружение пользователя выгружено.');
    }
}