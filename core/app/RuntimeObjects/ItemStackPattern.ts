import Item from '../Entities/Item.js';
import ItemStack from './ItemStack.js';
import UUIDGenerator from '../../source/UUIDGenerator.js';

export default class ItemStackPattern {
    private readonly _item: Item;
    private readonly _count: number;
    private readonly _idGenerator: UUIDGenerator;

    constructor(idGenerator: UUIDGenerator, item: Item, count: number = 1) {
        //todo: validate
        this._idGenerator = idGenerator;
        this._item = item;
        this._count = count;
    }

    build(): ItemStack {
        return new ItemStack(this._idGenerator.generateID(), this._item, this._count);
    }
}