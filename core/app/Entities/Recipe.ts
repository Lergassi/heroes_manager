import Item from './Item.js';
import {unsigned} from '../../types/main.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import ItemPackInterface from '../Interfaces/ItemPackInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import {ItemID} from '../../types/enums/ItemID.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class Recipe {
    private readonly _id: string;
    private readonly _resultItem: Item;
    private readonly _resultCount: number;
    private readonly _craftTimeInSeconds: number;
    private readonly _requireItems: ItemPackInterface[];

    get id(): string {
        return this._id;
    }

    get resultItem(): Item {
        return this._resultItem;
    }

    get resultCount(): number {
        return this._resultCount;
    }

    get craftTimeInSeconds(): number {
        return this._craftTimeInSeconds;
    }

    get requireItems(): ItemPackInterface[] {
        return this._requireItems;
    }

    constructor(
        id: string,
        resultItem: Item,
        resultCount: number,
        craftTimeInSeconds: number,
        requireItems: ItemPackInterface[],
    ) {
        this._id = id;
        this._resultItem = resultItem;
        this._resultCount = resultCount;
        this._craftTimeInSeconds = craftTimeInSeconds;
        this._requireItems = requireItems;
    }

    containRequireItems(itemStorage: ItemStorageInterface): boolean {
        for (let i = 0; i < this._requireItems.length; i++) {
            if (!itemStorage.containItem(<ItemID>this._requireItems[i].item.id, this._requireItems[i].count)) return false;
        }

        return true;
    }

    /**
     *
     * @param itemStorage
     * @return Остаток
     */
    createItem(itemStorage: ItemStorageInterface): number {
        return itemStorage.addItem(this._resultItem, this._resultCount);
    }

    createRequireItems(itemStorage: ItemStorageInterface): void {
        for (let i = 0; i < this._requireItems.length; i++) {
            itemStorage.addItem(this._requireItems[i].item, this._requireItems[i].count);
        }
    }

    removeRequireItems(itemStorage: ItemStorageInterface): void {
        for (let i = 0; i < this._requireItems.length; i++) {
            itemStorage.removeItem(<ItemID>this._requireItems[i].item.id, this._requireItems[i].count);
        }
    }

    // removeRequireItems(itemStorage: ItemStorageInterface) {
    //
    // }
}