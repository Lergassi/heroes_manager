import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';

export default class ExitCommand extends Command {
    get name(): string {
        return 'exit';
    }

    get description(): string {
        return 'Выгрузка окружения пользователя и игрока.';
    }

    async execute(input: Input) {
        this.container.get('security').assertIsUserLoaded();

        if (this.container.get('security').isPlayerLoaded()) {
            await this.container.get('gameConsole').getCommandByName('unload_player_env').run();
        }
        await this.container.get('gameConsole').getCommandByName('unload_user_env').run();
    }
}