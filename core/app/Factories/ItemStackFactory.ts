import Item from '../Entities/Item.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import EntityManager from '../../source/EntityManager.js';
import _ from 'lodash';

export default class ItemStackFactory {
    private readonly _idGenerator: IDGeneratorInterface;
    private readonly _entityManager: EntityManager;

    constructor(idGenerator: IDGeneratorInterface, entityManager: EntityManager) {
        this._idGenerator = idGenerator;
        this._entityManager = entityManager;
    }

    /**
     * Создает только 1 стек если count <= item.stackSize.
     * @param item
     * @param count В пределах диапазона 1 - stackSize.
     */
    create(item: Item, count: number): ItemStack {
        return new ItemStack(this._idGenerator.generateID(), item, count);
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

    /**
     * @deprecated Предметы по alias можно получить только из бд и в местах где это необходмо: консольная команда, строители и тд.
     * @param alias
     * @param count
     */
    createByItemAlias(alias: string, count = 1): ItemStack {
        return this.create(this._entityManager.get<Item>(Item, alias), count);
    }
}