import AppError from './AppError.js';
import {sprintf} from 'sprintf-js';

//todo: Заменить any на Template.
export default class Container {
    private readonly _services;

    constructor() {
        this._services = {};
    }

    //Объявления функций нужны, чтобы работали подсказки в ide где 1 из аргументов указан как any.
    set(key: string, value: any): void;
    set(key: string, value: (container: Container) => any): void;
    set(key: string, value: any | ((container: Container) => any)): void {
        if (typeof value === 'function') {
            this._services[key] = value(this);
        } else {
            this._services[key] = value;
        }
    }

    get(key: string): any {
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
}