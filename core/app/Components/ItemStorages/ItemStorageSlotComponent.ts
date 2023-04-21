import ItemStack from '../../RuntimeObjects/ItemStack.js';
import Item from '../../Entities/Item.js';
import _ from 'lodash';
import AppError from '../../../source/Errors/AppError.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import EventSystem from '../../../source/EventSystem.js';
import {EventCode} from '../../../types/enums/EventCode.js';
import ItemStackControllerInterface, {
    ItemStackControllerInterfaceRender
} from '../../Interfaces/ItemStackControllerInterface.js';
import ItemStackController from './ItemStackController.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import {ItemID} from '../../../types/enums/ItemID.js';

export enum ItemStorageSlotComponentEventCode {
    CreateItemStack = 'ItemStorageSlotComponent.CreateItemStack',
    Update = 'ItemStorageSlotComponent.Update',
}

export default class ItemStorageSlotComponent implements ItemStackControllerInterface {
    /**
     * @deprecated
     * @private
     */
    private _itemStack: ItemStack;
    // private _itemStackController: ItemStackControllerInterface;
    private _itemStackController: ItemStackController;

    /**
     * @deprecated
     */
    get itemStack(): ItemStack | undefined {
        return this._itemStack;
    }

    constructor() {
        this._itemStack = null;
        this._itemStackController = new ItemStackController();
    }

    addItem(item: Item, count: unsigned): unsigned {
        EventSystem.event(ItemStorageSlotComponentEventCode.Update, this);
        return this._itemStackController.addItem(item.id as ItemID, count);
    }

    moveTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    /**
     * @deprecated
     * @param item
     */
    canPlaceItem(item: Item): boolean {
        if (!this.isFree()) {
            throw new AppError('Слот занят. Сначала его нужно освободить.');
        }

        return true;
    }

    /**
     * todo: Метод не удобный. И itemStackFactory тоже не удобный инструмент.
     * @deprecated Далее использовать addItem. Слот или ItemStackController сам разбереться что делать.
     * Создает ItemStack. Если count > stackSize генерируется исключение. Для добавления и объединения предметов использовать другие методы.
     * @param options
     */
    createItemStack(options: {
        item: Item,
        count: unsigned,
        itemStackFactory: ItemStackFactory,
    }) {
        this.canPlaceItem(options.item);

        this._itemStack = options.itemStackFactory.create(options.item, options.count);
        EventSystem.event(ItemStorageSlotComponentEventCode.Update, this);
        // this._callbacks?.updateItem(this._itemStack?.item, this._itemStack?.count);
    }

    /**
     * @deprecated addItem
     * @param itemStack
     */
    placeItemStack(itemStack: ItemStack): void {
        this.canPlaceItem(itemStack.item);

        this._itemStack = itemStack;
        EventSystem.event(ItemStorageSlotComponentEventCode.Update, this);
    }

    isBusy(): boolean {
        return !_.isNil(this._itemStack);
    }

    isFree(): boolean {
        return !this.isBusy();
    }

    /**
     * @deprecated Использовать clear() или addItem/moveItem и очищать слот если вернули 0 (остаток).
     */
    destroyItemStack(): void {
        this._itemStack = null;
        EventSystem.event(EventCode.ItemStorageSlot_Clear, this);
    }

    clear() {
        this._itemStack = null;
        EventSystem.event(EventCode.ItemStorageSlot_Clear, this);
    }

    containsItem(item: Item): boolean {
        return this._itemStack && this._itemStack.containsItem(item);
    }

    totalItem(ID: ItemID): number {
        return 0;
    }

    removeItem(ID: ItemID, count: number): number {
        return 0;
    }

    containItem(ID: ItemID, count: number): boolean {
        return false;
    }

    canAddItem(item: Item, count: number): number {
        return 0;
    }

    renderByRequest(ui: ItemStackControllerInterfaceRender): void {
        this._itemStackController.renderByRequest(ui);
    }
}