import {HttpMethod} from './Http.js';
import AppError from '../../core/source/Errors/AppError.js';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';
import DebugApp from '../../core/app/Services/DebugApp.js';

export default class Route {
    private readonly _httpMethods: Array<string>;
    private readonly _pattern: string;
    private readonly _callback: (req, res) => void;

    constructor(httpMethods: Array<HttpMethod>, pattern: string, callback: (req, res) => void) {
        if (!httpMethods.length) {
            throw new AppError('methods должен содержать хотя бы 1 метод.');
        }

        if (!pattern.length) {
            throw new AppError('pattern не может быть пустым.');
        }

        this._httpMethods = httpMethods;
        this._pattern = pattern;
        this._callback = callback;
    }

    // run(req, res) {
    async run(req, res) {
        // throw new AppError('42');
        await this._callback(req, res);
    }

    equal(httpMethod: HttpMethod, pattern: string) {
        return this.hasHttpMethod(httpMethod) && this._pattern === pattern;
    }

    hasHttpMethod(httpMethod: HttpMethod): boolean {
        return this._httpMethods.indexOf(httpMethod) !== -1;
    }

    debug() {
        DebugApp.debug(DebugNamespaceID.Debug)(this._httpMethods.join(', ') + ': ' + this._pattern);
    }
}