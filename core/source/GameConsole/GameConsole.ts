import Command from './Command.js';
import AppError from '../Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import chalk from 'chalk';
import _ from 'lodash';
import ValidationError from '../Errors/ValidationError.js';
import {assertNotEmpty, assertNotNil} from '../assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import DebugApp from '../../app/Services/DebugApp.js';

export interface CommandOptions {
    name: string;
    arguments: string[];
}

export default class GameConsole {
    private readonly _commands: { [name: string]: Command };

    /**
     * @deprecated Сделать метод configUI(gameConsoleRC) в котором будет происходить настройка ui компонента.
     */
    get names(): string[] {
        let names = [];
        for (const commandsKey in this._commands) {
            names.push(this._commands[commandsKey].name);
        }

        return _.sortBy(names);
    }

    constructor() {
        this._commands = {};
    }

    register(command: Command) {
        assertNotNil(command);

        this._commands[command.name] = command;
    }

    hasCommand(name: string) {
        return this._commands.hasOwnProperty(name);
    }

    async run(name: string, commandArguments: string[] = []) {
        assertNotEmpty(name);

        let command = this._getCommand(name);

        DebugApp.debug(DebugNamespaceID.GameConsole)(sprintf('Command: %s', chalk.yellow(name)));

        await command.run(commandArguments);
    }

    async runByQuery(query: string) {
        let commandParams = this.parse(query);
        await this.run(commandParams.name, commandParams.arguments);
    }

    parse(query: string): CommandOptions {
        query = _.trim(query);
        if (!query) {
            throw ValidationError.notEmpty();
        }

        let commandQuerySplitted = _.split(query, ' ');

        return {
            name: commandQuerySplitted[0],
            arguments: _.slice(commandQuerySplitted, 1),
        };
    }

    private _getCommand(name: string) {
        if (this.hasCommand(name)) {
            return this._commands[name];
        }

        throw new AppError(sprintf('Команда %s не найдена.', name));
    }
}