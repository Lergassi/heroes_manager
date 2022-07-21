import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';

export default class TestCommand extends Command {
    get name(): string {
        return 'test_command';
    }

    get description(): string {
        return 'This is description of test_command.';
    }

    async execute(input: Input) {
        console.log('command execute: ' + this.name);
    }
}