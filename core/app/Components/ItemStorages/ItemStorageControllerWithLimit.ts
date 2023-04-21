import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import {unsigned} from '../../../types/main.js';
import Item from '../../Entities/Item.js';
import GameObject from '../../../source/GameObject.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {assertIsPositive} from '../../../source/assert.js';
import ItemStorageController from './ItemStorageController.js';
import _ from 'lodash';
import AppError from '../../../source/Errors/AppError.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import DebugApp from '../../Services/DebugApp.js';

/**
 * @deprecated
 */
export default class ItemStorageControllerWithLimit {
    private readonly _maxItemStorages: unsigned;
    private readonly _itemStorageController: ItemStorageController;
    private readonly _itemStorages: GameObject[];

    get length(): number {
        return this._itemStorageController.length;
    }

    constructor(maxItemStorages: unsigned) {
        assertIsPositive(maxItemStorages);

        this._maxItemStorages = maxItemStorages;
        this._itemStorages = [];    //todo: Возможно это не правильно и нужно иметь доступ к
        this._itemStorageController = new ItemStorageController(maxItemStorages);
    }

    addItemStorage(itemStorage: GameObject): number {
        //todo: Всё равно идея не окончательная и будет развиваться. Идея: Контроллер по принципу http, а этот класс будет Collection или вообще не будет.
        if (!this._canAddItemStorage()) return -1;

        if (this._itemStorageController.addItemStorage(itemStorage) !== -1) {
            this._itemStorages.push(itemStorage);
        }

        return this._itemStorages.length;
    }

    removeItemStorage(itemStorage: GameObject): number {
        if (this._itemStorageController.removeItemStorage(itemStorage) !== -1) {
            _.pull(this._itemStorages, itemStorage);
        }

        return this._itemStorages.length
    }

    addItem(itemID: ItemID, count: number): number {
        return this._itemStorageController.addItem(itemID, count);
    }

    moveTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    containItem(ID: ItemID): number {
        return this._itemStorageController.containItem(ID);
    }

    canAddItem(item: Item, count: number): number {
        return 0;
    }

    private _canAddItemStorage(): boolean {
        if (this._itemStorages.length >= this._maxItemStorages) {
            DebugApp.debug(DebugNamespaceID.Throw)('Нельзя добавить больше itemStorage больше .');
            return false;
        }

        return true;
    }
}