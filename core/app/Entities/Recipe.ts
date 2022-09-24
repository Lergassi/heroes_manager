import Item from './Item.js';

export interface RequireItemInterface {
    readonly item: Item;
    readonly count: number;
}

export default class Recipe {
    private readonly _id: string;
    private readonly _item: Item;
    private readonly _alias: string;
    private readonly _sort: number;
    private readonly _resultCount: number;
    private readonly _requireItems: RequireItemInterface[];

    get id(): string {
        return this._id;
    }

    get item(): Item {
        return this._item;
    }

    get alias(): string {
        return this._alias;
    }

    get sort(): number {
        return this._sort;
    }

    get resultCount(): number {
        return this._resultCount;
    }

    get requireItems(): RequireItemInterface[] {
        return this._requireItems;
    }

    constructor(
        id: string,
        item: Item,
        alias: string,
        sort: number,
        resultCount: number,
        requireItems: RequireItemInterface[],
    ) {
        this._id = id;
        this._item = item;
        this._alias = alias;
        this._sort = sort;
        this._resultCount = resultCount;
        this._requireItems = requireItems;
    }
}