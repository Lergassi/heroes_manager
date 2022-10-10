import Component from './Component.js';
import _ from 'lodash';
import AppError from './Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import ComponentInterface from './ComponentInterface.js';
import RComponentBridge, {
    AssignRComponentInterface,
    RComponentUpdateInterface
} from '../../client/source/RComponentBridge.js';
import ItemStack from '../app/RuntimeObjects/ItemStack.js';

export default class GameObject implements AssignRComponentInterface {
    // private readonly _id: number = this['_generateID'];
    private readonly _id: number;
    // private readonly _id: number;
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
        // console.log('_id', this._id);
        // console.log('_ID1', this['_ID']);
        // console.log('_ID2', this['_ID']);
        // console.log('_ID3', this['_ID']);
        // this._id = id;
        // this['_id'] = GameObject['generateID']();
        this._id = id;
        // this._name = GameObject.name + ': ' + this._id;
        this._name = GameObject.name + ': ' + this['_id'];
        this._components = [];
        this._componentNames = {};
        this._tags = [];
        // this._rComponentBridge = new RComponentBridge();
        // this._rComponentBridge.update(this);
        this._rComponentBridges = [];
        this._assignedRComponents = [];
    }

    addComponent<Component>(component: Component): Component {
        if (!_.includes(this._components, component)) {
            this._components.push(component);
        }

        return component;
    }

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
            // this._assignedRComponents[i].update(this);
            this._assignedRComponents[i].update();
        }
        // for (let i = 0; i < this._components.length; i++) {
        //     if (typeof this._components[i]['update'] === 'function') {
        //         this._components[i]['update']();
        //     }
        // }
    }

    /**
     * Также вызывается метод addComponent.
     * @dev
     */
    set<Component>(name: string, component: Component): Component {
        this.addComponent(component);
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