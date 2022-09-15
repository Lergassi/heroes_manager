import Component from './Component.js';
import _ from 'lodash';
import AppError from './AppError.js';
import {sprintf} from 'sprintf-js';
import ComponentInterface from './ComponentInterface.js';
import RComponentBridge, {
    AssignRComponentInterface,
    RComponentUpdateInterface
} from '../../client/source/RComponentBridge.js';

export default class GameObject implements AssignRComponentInterface {
    private readonly _id: number;
    private _name: string;
    private readonly _tags: string[];
    private readonly _components: ComponentInterface[]; //todo: У компонентов не будет интерфейсов.
    // private readonly _components: [];
    // private readonly _components: any[];
    // private readonly _componentNames: {[name: string]: ComponentInterface};
    private readonly _componentNames: {[name: string]: Object};
    // private _rComponentBridge: RComponentBridge;
    private _rComponentBridges: RComponentBridge[];
    private _assignedRComponents: RComponentUpdateInterface[];

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
        this._name = GameObject.name + ': ' + id;
        this._components = [];
        this._componentNames = {};
        this._tags = [];
        // this._rComponentBridge = new RComponentBridge();
        // this._rComponentBridge.update(this);
        this._rComponentBridges = [];
        this._assignedRComponents = [];
    }

    addComponent<T>(component: T): T {
        if (!_.includes(this._components, component)) {
            this._components.push(component);
        }

        return component;
    }

    getComponent<T>(Module: Function): T {
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i] instanceof Module) {
                return <T>this._components[i];
                // return this._components[i];
            }
        }

        return undefined;
    }

    getComponents<T>(Module: Function): T[] {
        let result: T[] = [];
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i] instanceof Module) {
                result.push(<T>this._components[i]);
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
     * @deprecated Использовать getComponents
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
     * @deprecated
     * @param id
     */
    getComponentByID<T>(id: number): T {
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i]['_id'] === id) {
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

    assignRComponent(rComponent: RComponentUpdateInterface): void {
        // this._rComponentBridge.rComponent = rComponent;
        // this._rComponentBridges.push(new RComponentBridge(rComponent));
        this._assignedRComponents.push(rComponent);
    }

    removeRComponent(rComponent): void {

    }

    update() {
        // this._rComponentBridge.update(this);
        // for (let i = 0; i < this._rComponentBridges.length; i++) {
        //     this._rComponentBridges[i].update(this);
        // }
        for (let i = 0; i < this._assignedRComponents.length; i++) {
            this._assignedRComponents[i].update(this);
        }
        // for (let i = 0; i < this._components.length; i++) {
        //     if (typeof this._components[i]['update'] === 'function') {
        //         this._components[i]['update']();
        //     }
        // }
    }

    /**
     * @dev
     */
    set<Component>(name: string, component: Component): Component {
        // this._componentNames[name] = <ComponentInterface>component; //todo: Убрать ComponentInterface.
        this._componentNames[name] = component;

        return component;
    }

    /**
     * @dev
     */
    get<Component>(name: string): Component {
        // if (!this._componentNames.hasOwnProperty(name)) {
        //     throw new AppError(sprintf('Компонент "%s" не найден в GameObject.', name));
        // }

        return <Component>this._componentNames[name];
    }
}