import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import debug from 'debug';

export default class UnloadPlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'unload_player_env';
    }

    get description(): string {
        return 'Выгружает окружение игрока без сохранения.';
    }

    async execute(input: Input) {
        this.container.get('security').assertIsPlayerLoaded();

        this.container.remove('player');
        this.container.get('gameObjectStorage').clear();
        debug('info')('Окружение игрока выгружено.');
    }
}