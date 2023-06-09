import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import chalk from 'chalk';
import DebugApp from '../../../core/app/Services/DebugApp.js';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import {CommandID} from '../../../core/types/enums/CommandID.js';

export default class HelpCommand extends Command {
    get name(): string {
        return CommandID.help;
    }

    async execute(input: Input) {
        // console.log('--- Help gameConsole ---');
        // console.log(chalk.yellow(['list']) + ' - Список команд.');
        DebugApp.debug(DebugNamespaceID.Info)('--- Help gameConsole ---');
        DebugApp.debug(DebugNamespaceID.Info)('list - Список команд.');
        DebugApp.debug(DebugNamespaceID.Info)('--- Управление ---');
        DebugApp.debug(DebugNamespaceID.Info)('tab - автодополнение команд');
        DebugApp.debug(DebugNamespaceID.Info)('up/down - выбор команд из истории выполнения');
    }
}