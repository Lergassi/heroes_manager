import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import Security from '../../source/Security.js';
import {sprintf} from 'sprintf-js';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import DebugApp from '../../../core/app/Services/DebugApp.js';

export default class SecurityStatusCommand extends Command {
    get name(): string {
        return 'server.security.status';
    }

    async execute(input: Input) {
        let userDBObject = this.container.get<Security>('server.security').user;
        let playerDBObject = this.container.get<Security>('server.security').player;

        DebugApp.debug(DebugNamespaceID.Info)('user: ' + (userDBObject ? sprintf('%s (%s)',
            userDBObject.id,
            userDBObject.email,
        ) : undefined));
        DebugApp.debug(DebugNamespaceID.Info)('player: ' + (playerDBObject ? sprintf('%s (%s)',
            playerDBObject.id,
            playerDBObject.name,
        ) : undefined));
    }
}