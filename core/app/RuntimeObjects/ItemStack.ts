import Item from '../Entities/Item.js';

export const DEFAULT_STACK_SIZE = 20;

//todo: id пока убран.
export default class ItemStack {
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

    constructor(item: Item, count: number = DEFAULT_STACK_SIZE) {
        //todo: validate
        this._item = item;
        this._count = count;
    }
}