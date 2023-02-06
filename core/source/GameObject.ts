import _ from 'lodash';
import AppError from './Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import RComponentBridge, {
    AssignRComponentInterface,
    RComponentUpdateInterface
} from '../../client/source/RComponentBridge.js';
import {assert} from './assert.js';
import {ComponentID} from '../types/enums/ComponentID.js';

export default class GameObject {
    private readonly _ID: number;
    private _name: string;
    private readonly _tags: string[];
    private readonly _components;
    private readonly _componentNames: {[key: string]: any};

    get ID(): number {
        return this._ID;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    /**
     * @deprecated
     */
    get tags(): string[] {
        return this._tags;
    }

    constructor(
        id: number,
    ) {
        this._ID = id;
        this._name = GameObject.name + ': ' + this._ID;
        this._components = [];
        this._componentNames = {};
        this._tags = [];
    }

    /**
     * @deprecated Пока есть GameObject далее работает как контейнер.
     * @param component
     */
    addComponent<Component>(component: Component): Component {
        if (!_.includes(this._components, component)) {
            this._components.push(component);
        }

        return component;
    }

    /**
     * @deprecated
     * @param name
     */
    getComponent<Component>(name: string): Component;
    getComponent<Component>(Module: Function): Component;
    getComponent<Component>(nameOrModule: string | Function): Component {
        if (typeof nameOrModule === 'string') {
            return <Component>this._componentNames[nameOrModule];
        } else {
            for (let i = 0; i < this._components.length; i++) {
                if (this._components[i] instanceof nameOrModule) {
                    return <Component>this._components[i];
                }
            }
        }

        return undefined;
    }

    /**
     * @deprecated
     * @param Module
     */
    getComponents<Component>(Module: Function): Component[] {
        let result: Component[] = [];
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i] instanceof Module) {
                result.push(<Component>this._components[i]);
            }
        }

        return result;
    }

    /**
     * @deprecated
     * @param name
     */
    findComponentByName<T>(name: string): T {
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i].constructor.name === name) {
                return <T>this._components[i];
            }
        }

        return undefined;
    }

    /**
     * @deprecated Использовать get.
     * @param name
     */
    findComponentsByName<T>(name: string): T[] {
        let result = [];
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i].constructor.name === name) {
                result.push(this._components[i]);
            }
        }

        return result;
    }

    /**
     * @deprecated Поиска компонента на встроенному ID больше не доступен.
     * @param id
     */
    getComponentByID<T>(id: number): T {
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i].id === id) {
                return <T>this._components[i];
            }
        }

        throw new AppError(sprintf('Component с id=%s не найден.', id));
    }

    /**
     * @deprecated
     * @param name
     */
    getComponentByName<T>(name: string): T {
        let component = this.findComponentByName(name);
        if (!component) {
            throw new AppError(sprintf('Component с name %s не найден.', name));
        }

        return <T>component;
    }

    /**
     * Для удобства замены в ide теги должны начинать со знака #.
     * todo: Убрать. Не акутально.
     */
    addTags(tags: string | string[]): void {
        if (typeof tags === 'string') {
            tags = [tags];
        }

        for (let i = 0; i < tags.length; i++) {
            if (!this.hasTag(tags[i])) {
                this._tags.push(tags[i]);
            }
        }
    }

    hasTag(tag: string): boolean {
        return _.includes(this._tags, tag);
    }

    /**
     * @indev
     * Как контейнер. Также вызывается метод addComponent.
     * @param key Только строки из enum GameObjectKey.
     * @param component
     */
    set<T>(key: string | ComponentID, component: T): T {
    // set<T>(key: GameObjectKey, component: T): T {
        assert(typeof key === 'string');
        // assert(key.length > 0);

        this.addComponent(component);
        this._componentNames[key] = component;

        return component;
    }

    /**
     * Получить компонент по ключу как в контейнере. Только строки из enum GameObjectKey.
     * @indev
     */
    get<T>(key: string | ComponentID): T {
        assert(typeof key === 'string');
        // assert(key.length > 0);

        return <T>this._componentNames[key];
    }
}