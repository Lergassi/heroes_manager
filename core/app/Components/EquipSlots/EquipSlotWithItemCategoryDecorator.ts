import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../types.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import ItemCategory from '../../Entities/ItemCategory.js';
import _ from 'lodash';
import AppError from '../../../source/Errors/AppError.js';
import {assertIsArray, assertIsMinLength} from '../../../source/assert.js';

//todo: Далее внутри, без зависимостей, может быть компонент вообще без правил, просто для размещения предмета.
export default class EquipSlotWithItemCategoryDecorator implements EquipSlotInterface {
    // private _itemStack: ItemStack;
    private _equipSlot: EquipSlotInterface;
    private readonly _availableItemCategories: ItemCategory[];

    //todo: Пока без ID.
    constructor(equipSlot: EquipSlotInterface, availableItemCategories: ItemCategory[]) {
        // assertMinLength(availableItemCategories, 1);
        assertIsArray(availableItemCategories);

        this._equipSlot = equipSlot;
        this._availableItemCategories = availableItemCategories;
        // this._itemStack = null;
    }

    /**
     * @deprecated До тех пор, пока не будет экипировки из другого места. Использовать createItemStack.
     * @param itemStack
     */
    equip(itemStack: ItemStack): void {
        this._assertCanEquip(itemStack.item);

        // this._itemStack = itemStack;
        this._equipSlot.equip(itemStack);

        // return true;
    }

    createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void {
        this._assertCanEquip(item);

        // this._itemStack = itemStackFactory.create(item, count);
        this._equipSlot.createItemStack(item, count, itemStackFactory);

        // return true;
    }

    destroyItemStack(): void {
        // this._itemStack = null;

        this._equipSlot.destroyItemStack();

        // return true;
    }

    isFree(): boolean {
        // return _.isNil(this._itemStack);
        return this._equipSlot.isFree();
    }

    private _assertCanEquip(item: Item): void {
        if (!this.isFree()) {
            throw new AppError('Слот уже занят.');
        }

        if (!item.hasItemCategory(this._availableItemCategories)) {
            throw AppError.itemCategoryNotAvailable();
        }
    }

    render(callback: (values: {
        item: Item,
    }) => void) {
        this._equipSlot.render(callback);
    }
}