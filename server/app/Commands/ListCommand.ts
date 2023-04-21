import Input from '../../../core/source/GameConsole/Input.js';
import Command from '../../../core/source/GameConsole/Command.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import chalk from 'chalk';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import DebugApp from '../../../core/app/Services/DebugApp.js';

export default class ListCommand extends Command {
    get name(): string {
        return 'list';
    }

    get description(): string {
        return 'Выводит все доступные команды.';
    }

    async execute(input: Input) {
        DebugApp.debug(DebugNamespaceID.Info)('--- GameConsole. Все доступные команды. ---');
        let gameConsole = this.container.get<GameConsole>(ServiceID.GameConsole);
        let names = gameConsole.names;
        for (let i = 0; i < names.length; i++) {
            // console.log(chalk.yellow(names[i]));
            DebugApp.debug(DebugNamespaceID.Info)(names[i]);
        }
    }
}