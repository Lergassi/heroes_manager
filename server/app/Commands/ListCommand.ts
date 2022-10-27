import Input from '../../../core/source/GameConsole/Input.js';
import Command from '../../../core/source/GameConsole/Command.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import chalk from 'chalk';
import debug from 'debug';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import {ContainerID} from '../../../core/types/enums/ContainerID.js';

export default class ListCommand extends Command {
    get name(): string {
        return 'list';
    }

    get description(): string {
        return 'Выводит все доступные команды.';
    }

    async execute(input: Input) {
        debug(DebugNamespaceID.Info)('GameConsole. Все доступные команды.');
        let gameConsole = this.container.get<GameConsole>(ContainerID.GameConsole);
        let names = gameConsole.names;
        for (let i = 0; i < names.length; i++) {
            console.log(chalk.yellow(names[i]));
        }
    }
}