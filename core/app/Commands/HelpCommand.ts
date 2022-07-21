import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import chalk from 'chalk';

export default class HelpCommand extends Command {
    get name(): string {
        return 'help';
    }

    async execute(input: Input) {
        console.log('--- Help gameConsole ---');
        console.log(chalk.yellow(['list']) + ' - Список команд.');
    }
}