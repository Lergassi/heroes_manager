import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import {ContainerID} from '../../../core/types/enums/ContainerID.js';

//todo: alias
export default class UnloadFullEnvironmentCommand extends Command {
    get name(): string {
        return 'unload';
    }

    async execute(input: Input) {
        await this.container.get<GameConsole>(ContainerID.GameConsole).run('unload_user_env');
    }
}