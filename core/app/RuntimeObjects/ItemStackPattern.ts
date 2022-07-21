import Item from '../Entities/Item.js';
import ItemStack from './ItemStack.js';
import AppError from '../../source/AppError.js';
import {sprintf} from 'sprintf-js';

export default class ItemStackPattern {
    private readonly _item: Item;
    private readonly _count: number;

    constructor(item: Item, count: number = 1) {
        //todo: validate
        if (count > item.stackSize) {
            throw AppError.itemStackSizeOverflow(item.stackSize);
        }

        this._item = item;
        this._count = count;
    }

    build(): ItemStack {
        return new ItemStack(this._item, this._count);
    }
}