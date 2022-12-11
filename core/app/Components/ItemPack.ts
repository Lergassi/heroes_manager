import Item from '../Entities/Item.js';
import {assertIsGreaterThanOrEqual, assertIsInstanceOf, assertNotNil} from '../../source/assert.js';

export default class ItemPack {
    private readonly _item: Item;
    private readonly _count: number;

    get item(): Item {
        return this._item;
    }

    get count(): number {
        return this._count;
    }

    constructor(item: Item, count: number) {
        assertIsInstanceOf(item, Item);
        assertIsGreaterThanOrEqual(count, 1);

        this._item = item;
        this._count = count;
    }
}