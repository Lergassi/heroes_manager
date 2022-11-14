import Item, {ItemFilterCondition} from '../app/Entities/Item.js';
import _ from 'lodash';
import ItemCategory from '../app/Entities/ItemCategory.js';
import {assertIsString, assertNotEmpty} from './assert.js';
import Random from '../app/Services/Random.js';
import {number} from 'yargs';

/**
 * todo: В будущем это будет полноценная бд.
 */
export default class ItemDatabase {
    private readonly _items: {[ID: string]: Item};

    constructor(items: {[ID: string]: Item} = {}) {
        this._items = items;
    }

    get(ID: string): Item | undefined {
        assertIsString(ID);
        assertNotEmpty(ID);

        return this._items[ID];
    }

    randomOne() {
        return _.sample(this._items);
    }

    // randomSome(count: number) {
    //     return _.sampleSize(this._items, count);
    // }

    //todo: А зачем такой метод?
    // all(): Item[] {
    all(): {[ID: string]: Item} {
        return this._items;
    }

    //todo: Временно тут.
    getByItemCategory(itemCategory: ItemCategory | ItemCategory[]): Item[] {
        let result = [];
        for (const itemID in this._items) {
            if (this._items[itemID].hasItemCategory(itemCategory)) {
                result.push(this._items[itemID]);
            }
        }

        return result;
    }

    getBy(condition, filter, callback = undefined) {

    }
}