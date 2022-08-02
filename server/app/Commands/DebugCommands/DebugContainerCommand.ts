import Command from '../../../../core/source/GameConsole/Command.js';
import Input from '../../../../core/source/GameConsole/Input.js';
import {debugContainer} from '../../../../core/debug/debug_functions.js';

export default class DebugContainerCommand extends Command {
    get name(): string {
        return 'debug_container';
    }

    async execute(input: Input) {
        debugContainer(this.container);
    }
}