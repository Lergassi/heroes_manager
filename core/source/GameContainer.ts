export default class GameContainer {
    private _id: number = this['_generateID'];
    private readonly _components: {};

    constructor() {
        this._components = {};
    }

    setComponent<T>(key: string, component: T): T {
        this._components[key] = component;

        return component;
    }

    getComponent<T>(key: string): T {
        return this._components[key];
    }

    getComponents<T>(keyOrModule: Function | string): T[] {
        if (typeof keyOrModule === 'string') {
            return this._components[keyOrModule];
        } else if (typeof keyOrModule === 'function') {

        }
    }

    // add() {
    //
    // }
}