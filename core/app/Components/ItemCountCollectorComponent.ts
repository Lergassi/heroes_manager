import Item from '../Entities/Item.js';
import {unsigned} from '../types.js';

export default class ItemCountCollectorComponent {
    private _items: {[ID: string]: {item: Item, count: unsigned}};

    constructor() {
        this._items = {};
    }

    addItem(item: Item, count: unsigned) {}
    removeItem(item: Item, count: unsigned) {}
    itemCount(item: Item) {}
    hasItem(item: Item) {}
    hasItemCount(item: Item, count: unsigned) {}
}