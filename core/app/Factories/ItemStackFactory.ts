import Item from '../Entities/Item.js';
import ItemRepository from '../Repositories/ItemRepository.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import AutoIncrementIDGenerator from '../../source/AutoIncrementIDGenerator.js';

export default class ItemStackFactory {
    private readonly _idGenerator: AutoIncrementIDGenerator;
    private readonly _itemRepository: ItemRepository;

    constructor(idGenerator: AutoIncrementIDGenerator, itemRepository: ItemRepository) {
        this._idGenerator = idGenerator;
        this._itemRepository = itemRepository;
    }

    create(item: Item, count = 1): ItemStack {
        return new ItemStack(this._idGenerator.generateID(), item, count);
    }

    createByItemAlias(alias: string, count = 1): ItemStack {
        return this.create(this._itemRepository.getOneByAlias(alias), count);
    }
}