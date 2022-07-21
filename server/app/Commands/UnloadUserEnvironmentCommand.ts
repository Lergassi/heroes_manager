import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import AppError from '../../../core/source/AppError.js';
import debug from 'debug';

export default class UnloadUserEnvironmentCommand extends Command {
    get name(): string {
        return 'unload_user_env';
    }

    async execute(input: Input) {
        this.container.get('security').assertIsUserLoaded();

        if (this.container.get('security').isPlayerLoaded()) {
            throw new AppError('Нельзя выгрузить окружение пользователя без предварительной выгрузки окружения игрока.');
        }

        this.container.remove('user');
        debug('info')('Окружение пользователя выгружено.');
    }
}