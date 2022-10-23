import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../types.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import _ from 'lodash';
import EventSystem from '../../../source/EventSystem.js';
import {EquipSlotComponentEventCode} from '../EquipSlotComponent.js';
import AppError from '../../../source/Errors/AppError.js';

//todo: Броня и руки - это разные слоты! Переделать.
export default class DefaultEquipSlot implements EquipSlotInterface {
    private _itemStack: ItemStack;

    constructor() {
        this._itemStack = null;
    }

    createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void {
        this._assertCanCreateItemStack();

        this._itemStack = itemStackFactory.create(item, count);
        EventSystem.event(EquipSlotComponentEventCode.CreateItemStack, this);
    }

    clear(): void {
        if (this.isFree()) {
            return;
        }

        this._itemStack = null;
        EventSystem.event(EquipSlotComponentEventCode.DestroyItemStack, this);
    }

    isFree(): boolean {
        return _.isNil(this._itemStack);
    }

    render(callback: (values: {
        item: Item,
    }) => void) {
        callback({
            item: this.isFree() ? null : this._itemStack.item,
        });
    }

    private _assertCanCreateItemStack(): void {
        this._assertCanEquipItem();
    }

    private _assertCanEquipItem(): void {
        if (!this.isFree()) {
            throw new AppError('Слот занят.');
        }
    }

    equip(itemStack: ItemStack): void {
        this._assertCanCreateItemStack();

        this._itemStack = itemStack;
    }
}