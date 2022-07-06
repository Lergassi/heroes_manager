import debug from 'debug';
import AppDebugger from './AppDebugger.js';

export default class DebugContainer {
    private readonly _items;
    // private _appDebugger: AppDebugger;

    // constructor(appDebugger: AppDebugger) {
    constructor() {
        // this._appDebugger = appDebugger;
        this._items = {};
    }

    add(item) {
        this._items.push(item);
    }

    // debug() {
    //     for (let i = 0; i < this._items.length; i++) {
    //         debug('debug')('%%', this._items[i].);
        // }
    // }

    createContainer() {
        let container = new DebugContainer();
        this.add(container);

        return container;
    }
}