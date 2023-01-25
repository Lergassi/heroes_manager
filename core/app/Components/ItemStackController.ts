import _ from 'lodash';
import debug from 'debug';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStackControllerInterface, {
    ItemStackControllerInterfaceRender
} from '../Interfaces/ItemStackControllerInterface.js';
import AppError from '../../source/Errors/AppError.js';
import Viewer from '../../source/Viewer.js';
import {ItemID} from '../../types/enums/ItemID.js';
import EquipController from './EquipController.js';

export default class ItemStackController implements ItemStackControllerInterface {
    private _item: Item;
    /**
     * Если значение равно нулю, на рендер отдается null.
     * @private
     */
    private _count: unsigned;

    constructor() {
        this._item = null;  //todo: Далее тут может быть ItemStack без ограничений через композицию.
        this._count = 0;
    }

    addItem(item: Item, count: unsigned): unsigned {
        assertNotNil(item);
        assertIsGreaterThanOrEqual(count, 0);

        if (this._item && item !== this._item) {
            //@note: Возможно не надо возвращать ошибок. Метод называется addItem(), а не replace. Нужно заменить, поместить с заменой - это другая логика. Хотя для разработки можно оставить, а для игрока отключить.
            // debug(DebugNamespaceID.Throw)('ItemStackController занят другим предметом.');
            return count;
        }

        let flaw = 0;
        if (!this._item) {
            flaw = item.stackSize;
        } else {
            flaw = item.stackSize - this._count;
        }

        if (count <= flaw) {
            this._count += count;
            count = 0;
        } else {
            this._count += flaw;
            count -= flaw;
        }

        if (this._count > 0) {
            this._item = item;
        }

        return count;
    }

    removeItem(ID: ItemID, count: number): number {
        if (!this.totalItem(ID)) return 0;
        if (count <= 0) return 0;   //todo: Или исключение?

        let reminder = count;
        if (this._count >= count) {
            this._count -= count;

            reminder = count;
        } else {
            reminder = this._count;
            this._count = null; //Или ноль?
        }

        if (this._count <= 0) {
            this._item = null;
        }

        return reminder;
    }

    moveTo(target: ItemStorageInterface): void {
        if (this.isFree()) return;

        let reminder = this._count - target.addItem(this._item, this._count);
        this.removeItem(<ItemID>this._item.id, reminder);
    }

    totalItem(ID: ItemID): number {
        return (this._item && !_.isNil(ID) && this._item.id === ID) ? this._count : 0;
    }

    containItem(ID: ItemID): number {
        return !_.isNil(this._item) && this._item.id === ID ? this._count : 0;
    }

    isFree(): boolean {
        return _.isNil(this._item);
    }

    canAddItem(item: Item, count: number): number {
        if (!this._item) return item.stackSize >= count ? 0 : count - item.stackSize;
        if (this._item && this._item !== item) return count;

        let reminder = this._item.stackSize - this._count;

        return reminder >= count ? 0 : count - reminder;
    }

    clear(): void {
        this._item = undefined;
        this._count = 0;
    }

    moveToEquipSlot(equipSlot: EquipSlotInterface): boolean {
        if (this.isFree()) {
            debug(DebugNamespaceID.Throw)('Слот пустой.');
            return false;
        }

        if (!equipSlot.equip(this._item)) {
            debug(DebugNamespaceID.Throw)('Ошибка экипировки.');
            return false;
        }

        this.clear();

        return true;
    }

    moveToEquipSlotByEquipController(equipSlotID: EquipSlotID, equipController: EquipController): boolean {
        if (this.isFree()) {
            debug(DebugNamespaceID.Throw)('Слот пустой.');
            return false;
        }

        if (!equipController.equip(equipSlotID, this._item)) {
            debug(DebugNamespaceID.Throw)('Ошибка экипировки.');
            return false;
        }

        this.clear();

        return true;
    }

    renderByRequest(ui: ItemStackControllerInterfaceRender): void {
        ui.updateItem?.(this._item ? this._item.id : undefined, this._count > 0 ? this._count : undefined);
    }
}