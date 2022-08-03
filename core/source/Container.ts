import AppError from './AppError.js';
import {sprintf} from 'sprintf-js';
import ContainerInterface from './ContainerInterface.js';
import _ from 'lodash';

//todo: Заменить any на Template.
export default class Container implements ContainerInterface {
    private readonly _services;

    constructor() {
        this._services = {};
    }

    //Объявления функций нужны, чтобы работали подсказки в ide где 1 из аргументов указан как any.
    set<T>(key: string, value: (container: ContainerInterface) => T): void;
    set<T>(key: string, value: T): void;
    set<T>(key: string, value: T | ((container: ContainerInterface) => T)): void {
        if (value instanceof Function) {
            this._services[key] = value(this);
        } else {
            this._services[key] = value;
        }

        // this._services[key] = value(this);

        // return this._services[key];
    }

    get<T>(key: string): T {
        if (!key) {
            throw new AppError('key не может быть пустым.');
        }

        if (!this.has(key)) {
            throw new AppError(sprintf('Сервис с ключом %s не найден в контейнере.', key));
        }

        return this._services[key];
    }

    has(key: string): boolean {
        return this._services.hasOwnProperty(key);
    }

    remove(keyOrPattern: string): void {
        let keySplitted = _.split(keyOrPattern, '.');
        if (keySplitted.length === 1) {
            delete this._services[keyOrPattern];
        } else if (keySplitted.length === 2 && keySplitted[1] === '*') {
            for (const servicesKey in this._services) {
                if (_.startsWith(servicesKey, keySplitted[0] + '.')) {
                    delete this._services[servicesKey];
                }
            }
        } else {
            throw new AppError('Неверный формат keyOrPattern.');
        }
    }
}