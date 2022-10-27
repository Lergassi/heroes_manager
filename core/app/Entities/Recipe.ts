import Item from './Item.js';
import {unsigned} from '../../types/main.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import ItemPackInterface from '../Interfaces/ItemPackInterface.js';

export default class Recipe {
    private readonly _id: string;
    private readonly _item: Item;
    private readonly _resultCount: unsigned;
    private readonly _requireItems: ItemPackInterface[];

    get id(): string {
        return this._id;
    }

    get item(): Item {
        return this._item;
    }

    get resultCount(): unsigned {
        return this._resultCount;
    }

    get requireItems(): ItemPackInterface[] {
        return this._requireItems;
    }

    constructor(
        id: string,
        item: Item,
        resultCount: number,
        requireItems: ItemPackInterface[],
    ) {
        this._id = id;
        this._item = item;
        this._resultCount = resultCount;
        this._requireItems = requireItems;
    }

    // craftItemStack(itemStackFactory: ItemStackFactory) {
    //     return itemStackFactory.create(this.item, this.resultCount);
    // }
}