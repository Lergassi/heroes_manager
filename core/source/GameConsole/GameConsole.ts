import Command from './Command.js';
import AppError from '../AppError.js';
import {sprintf} from 'sprintf-js';
import chalk from 'chalk';
import debug from 'debug';
import _ from 'lodash';

export default class GameConsole {
    private readonly _commands: {
        [name: string]: Command,
    };

    get commands(): { [name: string]: Command } {
        return _.clone(this._commands);
    }

    constructor() {
        this._commands = {};
    }

    register(command: Command) {
        // if (this.hasCommandByName(command.name)) {
        //     throw new AppError(sprintf('Команда с названием "%s" уже зарегистрирована.', command.name));
        // }

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

    async run(name: string, commandArguments = []) {
        let command = this.getCommand(name);
        debug('info')('GameConsole command:', chalk.yellow(name)); //todo: Сделать отдельно в виде логера.
        await command.run(commandArguments);
    }
}