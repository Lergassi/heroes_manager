import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import Security from '../../source/Security.js';

export default class ExitCommand extends Command {
    get name(): string {
        return 'exit';
    }

    get description(): string {
        return 'Выгрузка окружения пользователя и игрока.';
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsUserLoaded();

        await this.container.get<GameConsole>('server.gameConsole').run('unload_user_env');
    }
}