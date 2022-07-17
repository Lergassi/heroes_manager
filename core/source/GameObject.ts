import Component from './Component.js';
import _ from 'lodash';
import AppError from './AppError.js';
import {sprintf} from 'sprintf-js';

export default class GameObject {
    private readonly _id: number;
    private _name: string;
    private readonly _components: Component[];
    private readonly _tags: string[];

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get tags(): string[] {
        return this._tags;
    }

    constructor(
        id: number,
    ) {
        this._id = id;
        this._name = GameObject.name;
        this._components = [];
        this._tags = [];
    }

    addComponent(component: Component): void {
        if (!_.includes(this._components, component)) {
            this._components.push(component);
        }
    }

    findComponentByName(name: string): Component {
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i].constructor.name === name) {
                return this._components[i];
            }
        }

        return undefined;
    }

    findComponentsByName(name: string): Component[] {
        let result = [];
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i].constructor.name === name) {
                result.push(this._components[i]);
            }
        }

        return result;
    }

    getComponentByID(id: number): Component {
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i]['_id'] === id) {
                return this._components[i];
            }
        }

        throw new AppError(sprintf('Component с id=%s не найден.', id));
    }

    getComponentByName(name: string): Component {
        let component = this.findComponentByName(name);
        if (!component) {
            throw new AppError(sprintf('Component с name %s не найден.', name));
        }

        return component;
    }

    /**
     * Для удобства замены в ide теги должны начинать со знака #.
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
}