import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import debug from 'debug';
import Security from '../../source/Security.js';

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

        debug('info')('Окружение игрока выгружено.');
    }
}