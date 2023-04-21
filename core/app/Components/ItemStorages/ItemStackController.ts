import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {database} from '../../../data/ts/database.js';
import {assert, assertIsInteger} from '../../../source/assert.js';
import {DebugFormatterID} from '../../../types/enums/DebugFormatterID.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import ItemStackControllerInterface, {
    ItemStackControllerInterfaceRender
} from '../../Interfaces/ItemStackControllerInterface.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import EquipController from '../EquipController.js';
import DebugApp from '../../Services/DebugApp.js';

export default class ItemStackController implements ItemStackControllerInterface {
    private _itemID: ItemID;
    /**
     * Если значение равно нулю, на рендер отдается null.
     * @private
     */
    private _count: number;
    private readonly _entityManager: EntityManagerInterface;

    constructor() {
        this._itemID = null;
        this._count = null;
    }

    // /**
    //  * @deprecated
    //  * @param item
    //  * @param count
    //  */
    // _addItem(item: Item, count: number): number {
    //     assertNotNil(item);
    //     assertIsGreaterThanOrEqual(count, 0);
    //
    //     if (this._item && item !== this._item) {
    //         //@note: Возможно не надо возвращать ошибок. Метод называется addItem(), а не replace. Нужно заменить, поместить с заменой - это другая логика. Хотя для разработки можно оставить, а для игрока отключить.
    //         // debug(DebugNamespaceID.Throw)('ItemStackController занят другим предметом.');
    //         return count;
    //     }
    //
    //     let flaw = 0;
    //     if (!this._item) {
    //         flaw = item.stackSize;
    //     } else {
    //         flaw = item.stackSize - this._count;
    //     }
    //
    //     if (count <= flaw) {
    //         this._count += count;
    //         count = 0;
    //     } else {
    //         this._count += flaw;
    //         count -= flaw;
    //     }
    //
    //     if (this._count > 0) {
    //         this._item = item;
    //     }
    //
    //     return count;
    // }

    // /**
    //  *
    //  * @param item
    //  * @param count
    //  * @return Кол-во добавленных предметов. return = 0 - не добавлено ни одного предмета.
    //  */
    // _addItem2(item: Item | ItemID, count: number): number {
    //     item = !(item instanceof Item) ? this._entityManager.get<Item>(EntityID.Item, item) : item;
    //     assertNotNil(item);
    //
    //     if (count <= 0) return 0;
    //
    //     if (this._item && item !== this._item) {
    //         //@note: Возможно не надо возвращать ошибок. Метод называется addItem(), а не replace. Нужно заменить, поместить с заменой - это другая логика. Хотя для разработки можно оставить, а для игрока отключить.
    //         // debug(DebugNamespaceID.Throw)('ItemStackController занят другим предметом.');
    //         return 0;
    //     }
    //
    //     let flaw = 0;
    //     if (this._item) {
    //         flaw = item.stackSize - this._count;
    //     } else {
    //         flaw = item.stackSize;
    //     }
    //
    //     if (count <= flaw) {
    //         this._count += count;
    //         // count = 0;
    //     } else {
    //         this._count += flaw;
    //         count = flaw;
    //     }
    //
    //     if (this._count > 0) {
    //         this._item = item;
    //     }
    //
    //     return count;
    // }

    /**
     *
     * @param itemID
     * @param count
     * @return Кол-во добавленных предметов. return = 0 - не добавлено ни одного предмета.
     */
    addItem(itemID: ItemID, count: number): number {
        assert(database.items.data.hasItem(itemID), sprintf('Предмет "%s" не найден в базе данных.', itemID));

        if (count <= 0) return 0;
        if (!this.isFree() && !this.containItem(itemID)) return 0;
        //@note: Возможно не надо возвращать ошибок. Метод называется addItem(), а не replace. Нужно заменить, поместить с заменой - это другая логика. Хотя для разработки можно оставить, а для игрока отключить.
        // debug(DebugNamespaceID.Throw)('ItemStackController занят другим предметом.');

        let stackSize = database.items.data.stackSize(itemID);

        let flaw = 0;
        if (!this.isFree()) {
            flaw = stackSize - this._count;
        } else {
            flaw = stackSize;
        }

        if (count <= flaw) {
            this._count += count;
        } else {
            this._count += flaw;
            count = flaw;
        }

        if (this._count > 0) {
            this._itemID = itemID;
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
            this.clear();
        }

        return reminder;
    }

    removeItemByIndex(count: number): number {
        if (this.isEmpty()) return 0;

        return this.removeItem(this._itemID, count);
    }

    removeItemByIndexTo(count: number, itemStorage: ItemStorageInterface): number {
        if (this.isEmpty()) return 0;   //todo: Как сделать так, чтобы вызывать проверку только 1 раз?

        let addedItemsCount = itemStorage.addItem(this._itemID, count);

        return this.removeItem(this._itemID, addedItemsCount);
    }

    moveTo(target: ItemStorageInterface): void {
        if (this.isFree()) return;

        this.removeItem(this._itemID, target.addItem(this._itemID, this._count));
    }

    totalItem(ID: ItemID): number {
        if (!this._itemID) return 0;
        if ((this._itemID !== ID)) return 0;

        return this._count;
    }

    //??
    containItem(ID: ItemID): number {
        if (!this._itemID) return 0;
        if ((this._itemID !== ID)) return 0;

        return this._count;
    }

    has(itemID: ItemID, count: number): boolean {
        if (count <= 0) return false;

        return this.containItem(itemID) === count;
    }

    isFree(): boolean {
        return _.isNil(this._itemID);
    }

    isEmpty(): boolean {
        return _.isNil(this._itemID);
    }

    canAddItem(itemID: ItemID, count: number): number {
        assert(database.items.data.hasItem(itemID), 'Предмет не найден.');
        assertIsInteger(count);

        let stackSize = database.items.data.stackSize(itemID);

        if (count <= 0) return 0;
        if (this.isFree()) return stackSize >= count ? count : stackSize;
        if (!this.isFree() && !this.containItem(itemID)) return 0;

        let reminder = stackSize - this._count;

        return reminder >= count ? count : reminder;
    }

    clear(): void {
        this._itemID = null;
        this._count = null;
    }

    moveToEquipSlot(equipSlot: EquipSlotInterface): boolean {
        if (this.isFree()) {
            DebugApp.debug(DebugNamespaceID.Throw)('Слот сумки пустой.');
            return false;
        }

        if (!equipSlot.equip(this._itemID)) {
            DebugApp.debug(DebugNamespaceID.Throw)('Ошибка экипировки.');
            return false;
        }

        this.clear();

        return true;
    }

    moveToEquipSlotByEquipController(equipSlotID: EquipSlotID, equipController: EquipController): boolean {
        if (this.isFree()) {
            DebugApp.debug(DebugNamespaceID.Throw)('Слот сумки пустой.');
            return false;
        }

        if (!equipController.equip(equipSlotID, this._itemID)) {
            DebugApp.debug(DebugNamespaceID.Throw)('Ошибка экипировки.');
            return false;
        }

        this.clear();

        return true;
    }

    renderByRequest(ui: ItemStackControllerInterfaceRender): void {
        // ui.updateItem?.(this._item ? this._item.id : undefined, this._count > 0 ? this._count : undefined);
        // ui.updateItem?.(this._itemID, this.isFree() ? null : this._count);
        ui.updateItem?.(this._itemID, this._count);
    }

    debug(): void {
        DebugApp.debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
            itemID: this.isFree() ? null : this._itemID,
            count: this.isFree() ? null : this._count,
        });
    }
}