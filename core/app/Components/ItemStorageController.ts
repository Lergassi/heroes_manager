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

export default class ItemStorageController implements ItemStorageControllerInterface, ItemStorageInterface {
    private readonly _itemStorages: GameObject[];

    get length(): number {
        return this._itemStorages.length;
    }

    constructor() {
        this._itemStorages = [];
    }

    addItemStorage(itemStorage: GameObject): number {
        if (_.includes(this._itemStorages, itemStorage)) return -1;

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
}