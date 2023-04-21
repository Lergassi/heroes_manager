import {ItemID} from '../../types/enums/ItemID';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface';
import {ONE_SECOND_IN_MILLISECONDS} from '../consts';

export interface MineRCInterface {
    updateItem?(itemID: ItemID, count: number, interval: number): void;
}

export interface MineRenderInterface {
    renderByRequest(ui: MineRCInterface): void;
}

export class Mine implements MineRenderInterface {
    private readonly _itemID: ItemID;
    private readonly _countForInterval: number;
    private readonly _interval: number;

    private readonly _itemStorage: ItemStorageInterface;
    private _intervalID;

    constructor(itemID: ItemID, countForInterval: number, interval: number, itemStorage: ItemStorageInterface) {
        this._itemID = itemID;
        this._countForInterval = countForInterval;
        this._interval = interval;
        this._itemStorage = itemStorage;

        // this._itemStorage = new ItemStorage(1);
        this._intervalID = setInterval(() => {
            let addedItemsCount = this._itemStorage.addItem(this._itemID, this._countForInterval);
            // debug(DebugNamespaceID.Log)(sprintf('Mining: Генерация предмета: "%s":"%s".', this._itemID, addedItemsCount));
        }, interval * ONE_SECOND_IN_MILLISECONDS);
    }

    renderByRequest(ui: MineRCInterface): void {
        ui.updateItem?.(
            this._itemID,
            this._countForInterval,
            this._interval,
        );
    }

    // getResources(itemStorage: ItemStorageInterface): void {
    //     this._itemStorage.moveAllItemsTo(itemStorage);
    // }
}