import Command from '../../../../core/source/GameConsole/Command.js';
import Input from '../../../../core/source/GameConsole/Input.js';
import AppError from '../../../../core/source/AppError.js';

export default class TestThrowCommand extends Command {
    get name(): string {
        return 'test_throw';
    }

    async execute(input: Input) {
        throw new AppError('TestThrowCommandError');
        console.log('This is ' + this.name);
    }
}