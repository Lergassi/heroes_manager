import Item from '../Entities/Item.js';
import AppError from '../../source/AppError.js';

export const DEFAULT_STACK_SIZE = 20;

export default class ItemStack {
    private readonly _id: string;
    private readonly _item: Item;
    private _count: number;

    get item(): Item {
        return this._item;
    }

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        this._count = value;
    }

    constructor(id: string, item: Item, count: number = 1) {
        if (count > item.stackSize) {
            throw AppError.itemStackSizeOverflow(item.stackSize);
        }

        //todo: validate

        this._id = id;
        this._item = item;
        this._count = count;
    }
}