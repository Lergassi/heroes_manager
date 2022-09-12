import Command from '../../../../core/source/GameConsole/Command.js';
import Input from '../../../../core/source/GameConsole/Input.js';
import Security from '../../../source/Security.js';
import debug from 'debug';

export default class DebugUserEnvironmentCommand extends Command {
    get name(): string {
        return 'debug_user_env';
    }

    async execute(input: Input) {
        // this.container.get<Security>('server.security').assertIsUserLoaded();
        // this.container.get<Security>('security').assertIsUserLoaded();

        // console.dir('', {
        //     depth: 10,
        //     breakLength: 10,
        // })
        // debug('debug')('Загруженный пользователь: ' + this.container.get<Security>('server.security').user.id);
    }
}