import Input from '../../source/GameConsole/Input.js';
import Command from '../../source/GameConsole/Command.js';
import GameConsole from '../../source/GameConsole/GameConsole.js';
import chalk from 'chalk';
import {sprintf} from 'sprintf-js';
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
        let gameConsole: GameConsole = this.container.get('gameConsole');
        let commands = gameConsole.commands;
        for (const commandName in commands) {
            console.log(
                sprintf(
                    '%s%s',
                    chalk.yellow(commands[commandName].name),
                    commands[commandName].description ? ' - ' + commands[commandName].description : '',
                )
            );
        }
    }
}