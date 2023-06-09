import AppError from './Errors/AppError.js';
import ContainerInterface from './ContainerInterface.js';
import _ from 'lodash';
import {assert} from './assert.js';
import {DebugNamespaceID} from '../types/enums/DebugNamespaceID.js';
import DebugApp from '../app/Services/DebugApp.js';

//todo: Заменить any на Template.
export default class Container implements ContainerInterface {
    private readonly _services;

    constructor() {
        this._services = {};
    }

    //Объявления функций нужны, чтобы работали подсказки в ide где 1 из аргументов указан как any.
    // set<T>(key: string, value: (container: ContainerInterface) => T): void;
    // set<T>(key: string, value: T): void;
    // set<T>(key: string, value: T | ((container: ContainerInterface) => T)): void {
    set<T>(key: string, value: T | ((container: ContainerInterface) => T)): T {
        if (value instanceof Function) {
            this._services[key] = value(this);
        } else {
            this._services[key] = value;
        }

        // DebugApp.debug(DebugNamespaceID.Load)('[OK]: Container: ' + key);

        // this._services[key] = value(this);

        return this._services[key];
    }

    /**
     * @throws
     * @param key
     */
    get<T>(key: string): T {
        assert(typeof key === 'string');
        assert(key.length > 0);

        // if (!this.has(key)) {
        //     throw new AppError(sprintf('Сервис с ключом %s не найден в контейнере.', key));
        // }

        return this._services[key];
    }

    /**
     * @deprecated
     * todo: Убрать.
     * @param pattern
     */
    getByPattern(pattern: string) {
        let result = [];
        let keySplitted = this._splitPattern(pattern);
        if (!this._validatePattern(keySplitted)) {
            throw new AppError('Неверный формат keyOrPattern.');
        }

        for (const servicesKey in this._services) {
            if (_.startsWith(servicesKey, keySplitted[0] + '.')) {
                result.push(this._services[servicesKey]);
            }
        }

        return result;
    }

    has(key: string): boolean {
        return this._services.hasOwnProperty(key);
    }

    remove(keyOrPattern: string): void {
        let keySplitted = this._splitPattern(keyOrPattern);
        if (keySplitted.length === 1) {
            delete this._services[keyOrPattern];
        } else if (this._validatePattern(keySplitted)) {
            for (const servicesKey in this._services) {
                if (_.startsWith(servicesKey, keySplitted[0] + '.')) {
                    delete this._services[servicesKey];
                }
            }
        } else {
            throw new AppError('Неверный формат keyOrPattern.');
        }
    }

    private _splitPattern(pattern: string) {
        return _.split(pattern, '.');
    }

    private _validatePattern(pattern: string[]) {
        return pattern.length === 2 && pattern[1] === '*';
    }
}