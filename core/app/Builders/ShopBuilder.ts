import _ from 'lodash';
import debug from 'debug';
import Shop from '../Components/Shop.js';
import Item from '../Entities/Item.js';

type ShopBuilderPosition = {
    item: Item;
    count: number;
    price: number;
};

export default class ShopBuilder {
    private readonly _items: ShopBuilderPosition[];

    constructor() {
        this._items = [];
    }

    add(value: ShopBuilderPosition) {
        this._items.push(value);
    }

    // build(): Shop {
    //     // return Shop.createByBuilder(this);
    //     // return undefined;
    // }

    map(callback: (item: ShopBuilderPosition) => void) {
        _.map(this._items, (item) => {
            callback(item);
        });
    }
}