import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import {unsigned} from '../../types/main.js';
import Item from '../Entities/Item.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageControllerInterface from '../Interfaces/ItemStorageControllerInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {assertIsPositive, assertNotNil} from '../../source/assert.js';
import ItemStorageController from './ItemStorageController.js';
import _ from 'lodash';
import EventSystem from '../../source/EventSystem.js';

export default class ItemStorageControllerWithLimit implements ItemStorageControllerInterface, ItemStorageInterface {
    private readonly _maxItemStorages: unsigned;
    private readonly _itemStorageController: ItemStorageController;
    private readonly _itemStorages: GameObject[];

    constructor(maxItemStorages: unsigned) {
        assertIsPositive(maxItemStorages);

        this._maxItemStorages = maxItemStorages;
        this._itemStorages = [];    //todo: Возможно это не правильно и нужно иметь доступ к
        this._itemStorageController = new ItemStorageController();
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

    addItem(item: Item, count: unsigned): unsigned {
        return this._itemStorageController.addItem(item, count);
    }

    private _canAddItemStorage(): boolean {
        if (this._itemStorages.length >= this._maxItemStorages) {
            debug(DebugNamespaceID.Throw)('Нельзя добавить больше itemStorage больше .');
            return false;
        }

        return true;
    }

    render(callback: (itemStorages: GameObject[]) => void) {
        callback(this._itemStorages);
    }
}