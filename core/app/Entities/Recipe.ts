import Item from './Item.js';
import {unsigned} from '../types.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';

export interface RequireItemInterface {
    readonly item: Item;
    readonly count: number;
}

export default class Recipe {
    readonly id: string;
    readonly item: Item;
    readonly resultCount: unsigned;
    readonly requireItems: RequireItemInterface[];
    
    constructor(
        id: string,
        item: Item,
        resultCount: number,
        requireItems: RequireItemInterface[],
    ) {
        this.id = id;
        this.item = item;
        this.resultCount = resultCount;
        this.requireItems = requireItems;
    }

    // craftItemStack(itemStackFactory: ItemStackFactory) {
    //     return itemStackFactory.create(this.item, this.resultCount);
    // }
}