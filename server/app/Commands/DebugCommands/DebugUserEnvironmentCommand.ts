import Command from '../../../../core/source/GameConsole/Command.js';
import Input from '../../../../core/source/GameConsole/Input.js';

export default class DebugUserEnvironmentCommand extends Command {
    get name(): string {
        return 'debug_user_env';
    }

    async execute(input: Input) {
        this.container.get('security').assertIsUserLoaded();

        console.log('Загруженный пользователь: ' + this.container.get('user')['_id']);
    }
}