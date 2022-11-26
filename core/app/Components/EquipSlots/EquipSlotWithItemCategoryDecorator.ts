import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import ItemCategory from '../../Entities/ItemCategory.js';
import _ from 'lodash';
import AppError from '../../../source/Errors/AppError.js';
import {assertIsArray, assertIsMinLength, assertNotNil} from '../../../source/assert.js';

//todo: Далее внутри, без зависимостей, может быть компонент вообще без правил, просто для размещения предмета.
export default class EquipSlotWithItemCategoryDecorator implements EquipSlotInterface {
    private readonly _equipSlot: EquipSlotInterface;
    private readonly _availableItemCategories: ItemCategory[];

    constructor(equipSlot: EquipSlotInterface, availableItemCategories: ItemCategory[]) {
        assertNotNil(equipSlot);
        assertIsArray(availableItemCategories);

        this._equipSlot = equipSlot;
        this._availableItemCategories = availableItemCategories;
    }

    createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void {
        this._assertCanEquip(item);

        this._equipSlot.createItemStack(item, count, itemStackFactory);
    }

    clear(): void {
        this._equipSlot.clear();
    }

    isFree(): boolean {
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

    /**
     * @deprecated До тех пор, пока не будет экипировки из другого места. Использовать createItemStack.
     * @param itemStack
     */
    equip(itemStack: ItemStack): void {
        this._assertCanEquip(itemStack.item);

        this._equipSlot.equip(itemStack);
    }

    view(callback: (data: {
        item: string,
    }) => void) {
        this._equipSlot.view(callback);
    }
}