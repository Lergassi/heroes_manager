import Item, {ItemFilterCondition} from './Entities/Item.js';
import _ from 'lodash';

/**
 * Пока нет базы данных по предметам.
 */
export default class ItemDatabase {
    private readonly _items: Item[];

    constructor(items: Item[]) {
        this._items = items;
    }

    get count(): number {
        return this._items.length;
    }

    get(ID: string): Item {
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i]['_id'] === ID) { //todo: Доступ.
                return this._items[i];
            }
        }

        return undefined;
    }

    all(): Item[] {
        return _.concat<Item>(this._items);
    }

    /**
     * @deprecated
     * @param filter
     */
    filter(filter: ItemFilterCondition): Item[] {
        let result = [];
        for (let i = 0; i < this._items.length; i++) {
            if (_.includes(filter.itemCategory, this._items[i].itemCategory)) {
                result.push(this._items[i]);
            }
        }

        return result;
    }

    // random() {
    //     return this._items[_.random(0, this._items.length - 1)];
    // }
    //
    // randomItems(count: number) {
    //     let result = [];
    //     let i = 0;
    //     while (i < count) {
    //         result.push(this.random());
    //         ++i;
    //     }
    //
    //     return result;
    // }
    //
    // randomWithFilter(count: number, filter: ItemFilter) {
    //     // generator.get(this._items, count);
    // }
}