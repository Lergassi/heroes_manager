import Item from '../Entities/Item.js';
import ItemStack from './ItemStack.js';
import AppError from '../../source/AppError.js';
import {sprintf} from 'sprintf-js';
import AutoIncrementIDGenerator from '../../source/AutoIncrementIDGenerator.js';

export default class ItemStackPattern {
    private readonly _item: Item;
    private readonly _count: number;
    private readonly _idGenerator: AutoIncrementIDGenerator;

    constructor(idGenerator: AutoIncrementIDGenerator, item: Item, count: number = 1) {
        //todo: validate
        this._idGenerator = idGenerator;
        this._item = item;
        this._count = count;
    }

    build(): ItemStack {
        return new ItemStack(this._idGenerator.generateID(), this._item, this._count);
    }
}