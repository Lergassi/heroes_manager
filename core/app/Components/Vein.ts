import {ItemID} from '../../types/enums/ItemID.js';
import {UI_VeinItemCount} from '../../types/main.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import DebugApp from '../Services/DebugApp.js';

export interface VeinRender {
    update?(item: UI_VeinItemCount);
}

export default class Vein {
    private _itemID: ItemID;
    private _startCount: number;
    private _count: number;

    private readonly _options = {
        itemsCountForHit: 1,
    };

    constructor() {
        this._itemID = null;
        this._startCount = null;
        this._count = null;
    }

    config(itemID: ItemID, count: number): void {
        this._itemID = itemID;
        this._count = count;
        this._startCount = count;
    }

    /**
     * todo: Только другим разработчикам и самому себе не понятно будет как этим пользоваться и зачем нужен посредник в виде Gatherer. Хотя вроде как очевидно, что при таком использовании жила не звисит от игрока, и поэтому явно нужна зависимость от состояния героя.
     * @param itemStorage
     * @return Собрано ресурсов.
     */
    gather(itemStorage: ItemStorageInterface): number {
        if (!this.canGather()) return 0;

        let gatheredCount = itemStorage.addItem(this._itemID, this._options.itemsCountForHit);  //todo: А вообще можно не учитывать заполнение сумок - пусть игрок контролирует.
        this._count -= gatheredCount;

        return gatheredCount;
    }

    isEmpty(): boolean {
        return this._count <= 0;
    }

    canGather(): boolean {
        if (this.isEmpty()) {
            DebugApp.debug(DebugNamespaceID.Throw)('Жила истощена.');
            return false;
        }

        return true;
    }

    renderByRequest(ui: VeinRender): void {
        ui.update?.({
            itemID: this._itemID,
            startCount: this._startCount,
            count: this._count,
        });
    }
}