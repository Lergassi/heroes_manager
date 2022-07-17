import Item from '../Entities/Item.js';
import ItemRepository from '../Repositories/ItemRepository.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';

export default class ItemStackFactory {
    private readonly _itemRepository: ItemRepository;

    constructor(itemRepository: ItemRepository) {
        this._itemRepository = itemRepository;
    }

    create(item: Item, count = 1): ItemStack {
        return new ItemStack(item, count);
    }

    createByItemAlias(alias: string, count = 1): ItemStack {
        return this.create(this._itemRepository.getOneByAlias(alias), count);
    }
}