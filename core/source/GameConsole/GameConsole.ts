import Command from './Command.js';
import AppError from '../Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import chalk from 'chalk';
import debug from 'debug';
import _ from 'lodash';
import ValidationError from '../Errors/ValidationError.js';
import {assertNotNil} from '../assert.js';

export interface CommandOptions {
    name: string;
    arguments: string[];
}

export default class GameConsole {
    private readonly _commands: {[name: string]: Command};

    /**
     * @deprecated
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

    getCommand(name: string) {
        if (this.hasCommand(name)) {
            return this._commands[name];
        }

        throw new AppError(sprintf('Команда %s не найдена.', name));
    }

    async run(name: string, commandArguments: string[] = []) {
        let command = this.getCommand(name);
        debug('log:game_console')(sprintf('Command: %s', chalk.yellow(name)));
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
}