import Item from '../Entities/Item.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import _ from 'lodash';
import {ItemID} from '../../types/enums/ItemID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';

export default class ItemStackFactory {
    private readonly _idGenerator: IDGeneratorInterface;
    private readonly _entityManager: EntityManagerInterface;

    constructor(idGenerator: IDGeneratorInterface, entityManager: EntityManagerInterface) {
        this._idGenerator = idGenerator;
        this._entityManager = entityManager;
    }

    /**
     * Создает только 1 стек если count <= item.stackSize.
     * @param item
     * @param count В пределах диапазона 1 - stackSize.
     */
    create(item: Item | ItemID, count: number): ItemStack {
        if (!(item instanceof Item)) {
            item = this._entityManager.get<Item>(EntityID.Item, item);
        }

        return new ItemStack(item, count);
    }

    /**
     * Создает несколько стеков разделяя count между стеками.
     * @param item
     * @param count
     */
    createSome(item: Item, count: number = 1): ItemStack[] {
        let itemStacks: ItemStack[] = [];
        if (count <= item.stackSize) {
            itemStacks.push(this.create(item, count));
        } else {
            let stacksCount = _.round(count / item.stackSize);
            let stacksRemainder = count % item.stackSize;
            let i = 0;
            while (i < stacksCount) {
                itemStacks.push(this.create(item, item.stackSize));
                ++i;
            }
            if (stacksRemainder) {
                itemStacks.push(this.create(item, stacksRemainder));
            }
        }

        return itemStacks;
    }
}