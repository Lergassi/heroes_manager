import {Method} from './Http.js';
import AppError from '../../core/source/AppError.js';

export default class Route {
    private readonly _methods: Array<string>;
    private readonly _pattern: string;
    private readonly _callback: (req, res) => void;

    constructor(methods: Array<Method>, pattern: string, callback: (req, res) => void) {
        if (!methods.length) {
            throw new AppError('methods должен содержать хотя бы 1 метод.');
        }

        if (!pattern.length) {
            throw new AppError('pattern не может быть пустым.');
        }

        this._methods = methods;
        this._pattern = pattern;
        this._callback = callback;
    }

    run(req, res) {
        this._callback(req, res);
    }

    private _hasMethod(method: Method): boolean {
        for (let i = 0; i < this._methods.length; i++) {
            if (this._methods[i] === method) {
                return true;
            }
        }

        return false;
    }

    equal(method: Method, pattern: string) {
        return this._hasMethod(method) && this._pattern === pattern;
    }
}