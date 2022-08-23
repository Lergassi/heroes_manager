import Input from '../../../core/source/GameConsole/Input.js';
import Command from '../../../core/source/GameConsole/Command.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import chalk from 'chalk';
import {sprintf} from 'sprintf-js';
import debug from 'debug';
import _ from 'lodash';

export default class ListCommand extends Command {
    get name(): string {
        return 'list';
    }

    get description(): string {
        return 'Выводит все доступные команды.';
    }

    async execute(input: Input) {
        debug('info')('GameConsole. Все доступные команды.');
        const gameConsole = this.container.get<GameConsole>('gameConsole');
        const commands = _.sortBy(gameConsole.commands, ['name']);
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