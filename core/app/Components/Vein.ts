import Item from '../Entities/Item.js';
import {assertIsGreaterThanOrEqual, assertIsInstanceOf, assertNotNil} from '../../source/assert.js';
import _ from 'lodash';
import {UI_ItemCount, UI_VeinItemCount} from '../../types/main.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export interface VeinRender {
    update?(item: UI_VeinItemCount);
}

export default class Vein {
    private readonly _minCountForGather: number = 1;
    private readonly _maxCountForGather: number = 4;  //todo: Шанс. Максимальное значение должно быть реже чем среднее.

    private readonly _item: Item;
    private _startCount: number;
    private _count: number;

    constructor(item: Item, count: number) {
        assertIsInstanceOf(item, Item);
        assertIsGreaterThanOrEqual(count, 1);

        this._item = item;
        this._startCount = count;
        this._count = count;
    }

    /**
     * todo: Только другим разработчикам и самому себе не понятно будет как этим пользоваться и зачем нужен посредник в виде Gatherer. Хотя вроде как очевидно, что при таком использовании жила не звисит от игрока, и поэтому явно нужна зависимость от состояния героя.
     * @param itemStorage
     * @return Остаток в жиле.
     */
    gather(itemStorage: ItemStorageInterface): number {
        if (!this.canGather()) return 0;

        let count = this._generateCount();
        let reminder = itemStorage._addItem(this._item, count);  //todo: А вообще можно не учитывать заполнение сумок - пусть игрок контролирует.

        this._count -= count - reminder;

        return this._count;
    }

    isEmpty(): boolean {
        return this._count <= 0;
    }

    canGather(): boolean {
        if (this._count <= 0) {
            debug(DebugNamespaceID.Throw)('Жила истощена.');
            return false;
        }

        return true;
    }

    renderByRequest(ui: VeinRender): void {
        ui.update?.({
            itemName: this._item.id,
            startCount: this._startCount,
            count: this._count,
        });
    }

    private _generateCount(): number {
        // if (!this.canGather()) return 0; //todo: Нужна ли тут проверка? ---> Можно сделать что возвращается 0 если жила пустая, а потом объект адялется.
        if (this._count <= 0) return 0;
        if (this._count === 1) return 1;

        return _.random(this._minCountForGather, this._maxCountForGather <= this._count ? this._maxCountForGather : this._count);
    }
}