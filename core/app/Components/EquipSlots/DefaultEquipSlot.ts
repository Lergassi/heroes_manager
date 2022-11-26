import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import _ from 'lodash';
import EventSystem from '../../../source/EventSystem.js';
import {EquipSlotComponentEventCode} from '../EquipSlotComponent.js';
import AppError from '../../../source/Errors/AppError.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../../types/enums/DebugFormatterID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';

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

    view(callback: (data: {
        item: string,
    }) => void) {
        // callback(this._itemStack?.item?.id ?? null);
        callback({
            item: this._itemStack?.item?.id ?? null,
        });
        // debug(DebugNamespaceID.Info)(DebugFormatterID.Json, {
        //     ID: this._ID,
        //     item: this._itemStack?.item?.id ?? null,
        // });
        /*
            logger.write(this._);
            this._equipSlot.view(logger)
            logger.write('item: ' + this._itemStack?.item?.id ?? null);
         */
    }
}