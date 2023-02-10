import AppError from '../Errors/AppError.js';
import {sprintf} from 'sprintf-js';

export default class Input {
    private readonly _inputCommandArguments;

    constructor(inputCommandArguments) {
        this._inputCommandArguments = inputCommandArguments;
    }

    getArgument(name): string {
        if (!this.hasArgument(name)) {
            throw new AppError(sprintf('Аргумент %s не указан.', name));
        }

        return this._inputCommandArguments[name].value ?? '';
    }

    hasArgument(name): boolean {
        return this._inputCommandArguments.hasOwnProperty(name);
    }
}