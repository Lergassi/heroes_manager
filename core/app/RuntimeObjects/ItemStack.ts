import Item from '../Entities/Item.js';
import AppError from '../../source/AppError.js';
import {sprintf} from 'sprintf-js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';

// export const DEFAULT_STACK_SIZE = 20;
export const DEFAULT_STACK_SIZE = 50;

export interface ItemStackPlaceInterface {
    get itemStack(): ItemStack;
    placeItemStack(itemStack: ItemStack): void;
    clear(): void;
}

/**
 * Случаи, когда нужно указать предмет и его количество. В том числе для не stackable.
 */
export interface ItemCountInterface {
    get item(): Item;
    get count(): number;
    set count(value: number);
}

export interface ItemCountReadonlyInterface {
    get item(): Item;
    get count(): number;
}

export class ItemCountReadonly implements ItemCountReadonlyInterface {
    private readonly _itemCount: ItemCountInterface;

    get item(): Item {
        return this._itemCount.item;
    }

    get count(): number {
        return this._itemCount.count;
    }

    constructor(item: Item, count: number) {
        this._itemCount = new ItemCount(item, count);
    }
}

//todo: Надо както по другому назвать. Для экипировки как то не правильно когда будут отображаться меч с кол-вом 100 например.
export class ItemCount implements ItemCountInterface {
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

    constructor(item: Item, count: number) {
        this._item = item;
        this._count = count;
    }
}

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
        if (value <= 0 || value > this._item.stackSize) {
            throw AppError.itemStackSizeWrong(this._item);
        }
        this._count = value;
    }

    constructor(id: string, item: Item, count: number = 1) {
        this._id = id;
        this._item = item;
        this.count = count;
    }

    containsItem(item: Item): boolean {
        return this._item === item;
    }

    //todo:
    // separate(count: number, itemStackFactory: ItemStackFactory) {
    //
    // }
}