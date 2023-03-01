import debug from 'debug';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {assertIsGreaterThanOrEqual, assertIsPositive, assertNotNil} from '../../../source/assert.js';
import AppError from '../../../source/Errors/AppError.js';
import EventSystem from '../../../source/EventSystem.js';
import GameObject from '../../../source/GameObject.js';
import {ComponentID} from '../../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import {EventCode} from '../../../types/enums/EventCode.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import {UI_ItemStorage, UI_ItemStorageSlot, unsigned} from '../../../types/main.js';
import Item from '../../Entities/Item.js';
import {ItemStorageControllerInterfaceRender} from '../../Interfaces/ItemStorageControllerInterface.js';
import ItemStorageInterface, {ItemStorageInterfaceRender} from '../../Interfaces/ItemStorageInterface.js';
import EquipController from '../EquipController.js';
import ItemStorage from './ItemStorage.js';

export interface ItemStorageControllerRender {
    updateSlots?(itemStorageID: number, slots: UI_ItemStorageSlot[]): void;
    updateItemStorages?(itemStorages: UI_ItemStorage[]): void;
}

/**
 * todo: Переименовать в BagCollection. Изменить и разделить интерфейс. Убрать max в другое место.
 */
export default class ItemStorageController implements ItemStorageInterface {
    private readonly _itemStorages: GameObject[];
    private readonly _max: number;

    get length(): number {
        return this._itemStorages.length;
    }

    constructor(max: number) {
        assertIsPositive(max)

        this._itemStorages = [];
        this._max = max;
    }

    //todo: Убрать GameObject.
    //todo: Учесть в будущем, что создание itemStorage происходит за пределами контроллера.
    addItemStorage(itemStorage: GameObject): number {
        if (_.includes(this._itemStorages, itemStorage)) return -1;
        if (this._itemStorages.length >= this._max) {
            debug(DebugNamespaceID.Throw)('У игрока максимальное кол-во сумок.');
            return -1;
        }

        this._itemStorages.push(itemStorage);
        debug(DebugNamespaceID.Log)('Добавлен ItemStorage.');
        EventSystem.event(EventCode.ItemStorageController_AddItemStorage, this);

        return this._itemStorages.length;
    }

    removeItemStorage(itemStorage: GameObject): number {
        if (!_.includes(this._itemStorages, itemStorage)) return -1;

        _.pull(this._itemStorages, itemStorage);
        debug(DebugNamespaceID.Log)('Удален ItemStorage.');
        EventSystem.event(EventCode.ItemStorageController_RemoveItemStorage, this);

        return this._itemStorages.length;
    }

    // /**
    //  *
    //  * @param item
    //  * @param count
    //  * @return Остаток.
    //  */
    // _addItem(item: Item | ItemID, count: unsigned): unsigned {
    //     if (!this._itemStorages.length) {
    //         debug(DebugNamespaceID.Throw)('Не найдено ни одного ItemStorage.');
    //         return count;
    //     }
    //
    //     for (let i = 0; i < this._itemStorages.length; i++) {
    //         count = this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorage)?._addItem(item, count);
    //         if (count <= 0) break;
    //     }
    //     // debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));
    //
    //     return count;
    // }

    addItem(itemID: ItemID, count: number): number {
        if (!this._itemStorages.length) {
            debug(DebugNamespaceID.Throw)('Не найдено ни одного ItemStorage.');
            return 0;
        }

        let originCount = count;
        for (let i = 0; i < this._itemStorages.length; i++) {
            count -= this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorage)?.addItem(itemID, count);
            if (count <= 0) break;
        }
        let addedItemsCount = originCount - count;
        // debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', itemID, addedItemsCount, originCount));

        return addedItemsCount;
    }

    moveAllItemsTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    // totalItem(ID: ItemID): number {
    //     let totalCount = 0;
    //     for (let i = 0; i < this._itemStorages.length; i++) {
    //         totalCount += this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorageComponent).totalItem(ID);
    //     }
    //
    //     return totalCount;
    // }

    removeItem(ID: ItemID, count: number): number {
        let originCount = count;
        for (let i = 0; i < this._itemStorages.length; i++) {
            count -= this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorage).removeItem(ID, count);
            if (count <= 0) break;
        }

        return originCount - count;
    }

    containItem(ID: ItemID): number {
        let count = 0;
        for (let i = 0; i < this._itemStorages.length; i++) {
            count += this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorage).containItem(ID);
        }

        return count;
    }

    hasItem(itemID: ItemID, count): boolean {
        assertIsGreaterThanOrEqual(count, 1);

        return this.containItem(itemID) >= count;
    }

    canAddItem(itemID: ItemID, count: number): number {
        return 0;
    }

    //todo: Тут явно это не нужно. Надо разделить интерфейс для сумки и коллекции сумок. Название временное.
    renderAllByRequest(ui: ItemStorageControllerInterfaceRender): void {
        ui.updateItemStorages?.(this._itemStorages);
    }

    renderByRequest(ui: ItemStorageInterfaceRender): void {
        //...
    }

    //todo: Основной метод пока не будет разделен интерфейс ItemStorageInterface.
    // renderItemStorageControllerByRequest(ui: ItemStorageControllerRender): void {
    //     let that = this;
    //     for (let i = 0; i < this._itemStorages.length; i++) {
    //         this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorage).renderByRequest({
    //             updateItems(slots: UI_ItemStorageSlot[]) {
    //                 ui.updateSlots?.(that._itemStorages[i].ID, slots);
    //             },
    //         });
    //     }
    // }

    renderItemStorageControllerByRequest(ui: ItemStorageControllerRender): void {
        let that = this;
        let itemStorages: UI_ItemStorage[] = [];
        for (let i = 0; i < this._itemStorages.length; i++) {
            let itemStorage: UI_ItemStorage = {
                ID: this._itemStorages[i].ID,
                slots: [],
            };
            this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorage).renderByRequest({
                updateItems(slots: UI_ItemStorageSlot[]) {
                    itemStorage.slots = slots;
                },
            });

            itemStorages.push(itemStorage);
        }

        ui.updateItemStorages?.(itemStorages);
    }

    clear(index: number): void {
        throw AppError.notWorking('Использовать clear для ItemStorage.');
    }

    clearAllItems(): void {
        for (let i = 0; i < this._itemStorages.length; i++) {
            this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorage).clearAllItems();
        }
    }

    moveToEquipSlotByEquipController(itemStorageID: number, itemStorageSlotID: number, equipController: EquipController, equipSlotID: EquipSlotID): boolean {
        let itemStorage = _.find(this._itemStorages, (itemStorage) => {
            return itemStorage.ID === itemStorageID;
        });
        assertNotNil(itemStorage, sprintf('Сумка c ID: "%s" не найдена.', itemStorageID));

        return itemStorage.get<ItemStorage>(ComponentID.ItemStorage).moveToEquipSlotByEquipController(itemStorageSlotID, equipController, equipSlotID);
        // return equipController.equipFrom(equipSlotID, );
    }

    debug(): void {
        throw AppError.notImplements();
    }

    isEmpty(): boolean {
        return _.every(_.map(this._itemStorages, (value) => {
            return value.get<ItemStorageInterface>(ComponentID.ItemStorage).isEmpty();
        }));
    }
}