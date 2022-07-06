import debug from 'debug';
import DebugContainer from './DebugContainer.js';

export default class AppDebugger {
    _items;
    constructor() {
        this._items = [];
    }

    createContainer() {
        let container = new DebugContainer();
        this._items.push(container);

        return container;
    }

    debug() {
        for (let i = 0; i < this._items.length; i++) {
            debug('debug')('%o', this._items[i]);
        }
    }
}