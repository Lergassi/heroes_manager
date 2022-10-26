import Item, {ItemFilterCondition} from '../app/Entities/Item.js';
import _ from 'lodash';
import ItemCategory from '../app/Entities/ItemCategory.js';

/**
 * todo: В будущем это будет полноценная бд.
 */
export default class ItemDatabase {
    // private readonly _items: Item[];
    private readonly _items: {[ID: string]: Item};

    // constructor(items: Item[]) {
    constructor(items: {[ID: string]: Item} = {}) {
        this._items = items;
    }

    // get count(): number {
    //     return this._items.length;
    // }

    get(ID: string): Item | undefined {
        // for (let i = 0; i < this._items.length; i++) {
        //     if (this._items[i].id === ID) { //todo: Доступ.
        //         return this._items[i];
        //     }
        // }
        //
        // return undefined;
        return this._items[ID];
    }

    // add(ID: string, item: Item) {
    //
    // }

    //todo: А зачем такой метод?
    // all(): Item[] {
    all(): {[ID: string]: Item} {
        // return _.concat<Item>(this._items);
        // return _.concat();
        return this._items;
    }

    getByItemCategory(itemCategory: ItemCategory | ItemCategory[]): Item[] {
        let result = [];
        for (const itemID in this._items) {
            if (this._items[itemID].hasItemCategory(itemCategory)) {
                result.push(this._items[itemID]);
            }
        }

        return result;
    }
}