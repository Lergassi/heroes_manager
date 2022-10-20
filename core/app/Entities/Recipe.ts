import Item from './Item.js';
import {unsigned} from '../types.js';

export interface RequireItemInterface {
    readonly item: Item;
    readonly count: number;
}

export default class Recipe {
    readonly id: string;
    readonly item: Item;
    readonly sort: number;
    readonly resultCount: unsigned;
    readonly requireItems: RequireItemInterface[];
    
    constructor(
        id: string,
        item: Item,
        sort: number,
        resultCount: number,
        requireItems: RequireItemInterface[],
    ) {
        this.id = id;
        this.item = item;
        this.sort = sort;
        this.resultCount = resultCount;
        this.requireItems = requireItems;
    }
}