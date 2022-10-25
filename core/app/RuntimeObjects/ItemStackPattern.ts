import Item from '../Entities/Item.js';
import ItemStack from './ItemStack.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';

/**
 * @deprecated
 */
export default class ItemStackPattern {
    private readonly _item: Item;
    private readonly _count: number;
    private readonly _idGenerator: IDGeneratorInterface;

    constructor(idGenerator: IDGeneratorInterface, item: Item, count: number = 1) {
        //todo: validate
        this._idGenerator = idGenerator;
        this._item = item;
        this._count = count;
    }

    build(): ItemStack {
        return new ItemStack(this._idGenerator.generateID(), this._item, this._count);
    }
}