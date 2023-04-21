import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import Security from '../../source/Security.js';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import DebugApp from '../../../core/app/Services/DebugApp.js';

export default class UnloadPlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'unload_player_env';
    }

    get description(): string {
        return 'Выгружает окружение игрока БЕЗ сохранения.';
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsPlayerLoaded();

        this.container.get<Security>('server.security').logoutPlayer();
        this.container.remove('player.*');

        DebugApp.debug(DebugNamespaceID.Info)('Окружение игрока выгружено.');
    }
}