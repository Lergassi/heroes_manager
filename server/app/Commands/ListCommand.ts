import Input from '../../../core/source/GameConsole/Input.js';
import Command from '../../../core/source/GameConsole/Command.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import chalk from 'chalk';
import debug from 'debug';

export default class ListCommand extends Command {
    get name(): string {
        return 'list';
    }

    get description(): string {
        return 'Выводит все доступные команды.';
    }

    async execute(input: Input) {
        debug('info')('GameConsole. Все доступные команды.');
        let gameConsole = this.container.get<GameConsole>('gameConsole');
        let names = gameConsole.names;
        for (let i = 0; i < names.length; i++) {
            console.log(chalk.yellow(names[i]));
        }
    }
}