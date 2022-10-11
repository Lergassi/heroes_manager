import Item from './Entities/Item.js';
import ItemDatabase from './ItemDatabase.js';
import _ from 'lodash';

type generateWithConditionOptions = {
    count: number;
}

let generateWithConditionOptionsDefault: Partial<generateWithConditionOptions> = {
    count: 1,
}

export default class RandomItemGenerator {
    private _itemDatabase: ItemDatabase;

    constructor(itemDatabase: ItemDatabase) {
        this._itemDatabase = itemDatabase;
    }

    /**
     * При count > 1 могут быть одинаковые предметы.
     */
    generate(): Item {
    // generate() {
        let items = this._itemDatabase.all();
        return items[_.random(0, items.length - 1)];
    }

    generateItems(count: number): Item[] {
        let result = [];
        let i = 0;
        while (i < count) {
            result.push(this.generate());
            ++i;
        }

        return result;
    }

    generateWithCondition(condition, options: Partial<generateWithConditionOptions> = {}) {
        console.log(options);
    }
}