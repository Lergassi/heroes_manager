import Command from '../../../../core/source/GameConsole/Command.js';
import Input from '../../../../core/source/GameConsole/Input.js';
import UserDBObject from '../../DBObjects/UserDBObject.js';
import Security from '../../../source/Security.js';

export default class DebugUserEnvironmentCommand extends Command {
    get name(): string {
        return 'debug_user_env';
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsUserLoaded();

        // console.log('Загруженный пользователь: ' + this.container.get<UserDBObject>('server.userDBObject')['_id']);
        console.log('Загруженный пользователь: ' + this.container.get<Security>('server.security').user.id);
    }
}