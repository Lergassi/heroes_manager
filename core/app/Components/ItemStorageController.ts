import GameObject from '../../source/GameObject.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import _ from 'lodash';
import {ComponentID} from '../../types/enums/ComponentID.js';
import ItemStorageControllerInterface from '../Interfaces/ItemStorageControllerInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import EventSystem from '../../source/EventSystem.js';
import {EventCode} from '../../types/enums/EventCode.js';
import AppError from '../../source/Errors/AppError.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {assertIsGreaterThanOrEqual, assertIsPositive} from '../../source/assert.js';

export default class ItemStorageController implements ItemStorageControllerInterface, ItemStorageInterface {
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
        for (let i = 0; i < this._handlers.length; i++) {
            this._handlers[i].addItemStorage(this, this._itemStorages);
        }

        return this._itemStorages.length;
    }

    removeItemStorage(itemStorage: GameObject): number {
        if (!_.includes(this._itemStorages, itemStorage)) return -1;

        _.pull(this._itemStorages, itemStorage);
        debug(DebugNamespaceID.Log)('Удален ItemStorage.');
        EventSystem.event(EventCode.ItemStorageController_RemoveItemStorage, this);

        return this._itemStorages.length;
    }

    /**
     *
     * @param item
     * @param count
     * @return Остаток.
     */
    addItem(item: Item, count: unsigned): unsigned {
        if (!this._itemStorages.length) {
            debug(DebugNamespaceID.Throw)('Предмет не добавлен. Не найдено ни одного ItemStorage.');
            return count;
        }

        for (let i = 0; i < this._itemStorages.length; i++) {
            // count -= count - this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorageComponent)?.addItem(item, count);
            count = this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorageComponent)?.addItem(item, count);
            if (count <= 0) break;
        }
        // debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));

        return count;
    }

    moveTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    render(callback: (itemStorages: GameObject[]) => void) {
        callback(this._itemStorages);
    }

    _handlers: {
        addItemStorage: (itemStorageController: ItemStorageControllerInterface, itemStorages: GameObject[]) => void,
    }[] = [];

    attach(handlers: {
        addItemStorage: (itemStorageController: ItemStorageControllerInterface, itemStorages: GameObject[]) => void,
    }) {
        this._handlers.push(handlers);
        handlers.addItemStorage(this, this._itemStorages);
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
            count -= this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorageComponent).removeItem(ID, count);
            if (count <= 0) break;
        }

        return originCount - count;
    }

    containItem(ID: ItemID): number {
        let count = 0;
        for (let i = 0; i < this._itemStorages.length; i++) {
            count += this._itemStorages[i].get<ItemStorageInterface>(ComponentID.ItemStorageComponent).containItem(ID);
        }

        return count;
    }

    canAddItem(item: Item, count: number): number {
        return 0;
    }
}