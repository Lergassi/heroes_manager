import {ItemID} from '../../types/enums/ItemID.js';
import {unsigned} from '../../types/main.js';
import ItemDatabase from '../../source/ItemDatabase.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

/**
 * @indev
 */
export default class ItemKit {
    private readonly _items: { itemID: ItemID, count: unsigned }[];

    //Удобно создать массив, но не удобно то, что сущностей может не быть, так как поиск их происходит в методе create(). todo: Может без сущностей? Слотов уже нету.
    constructor(items: { itemID: ItemID; count: unsigned }[]) {
        this._items = items;
    }

    create(itemStorage: ItemStorageInterface, itemDatabase: ItemDatabase) {
        for (let i = 0; i < this._items.length; i++) {
            itemStorage.addItem(this._items[i].itemID, this._items[i].count);
        }
    }
}