import GathererInterface from '../Interfaces/GathererInterface.js';
import {GatheringPointTypeID} from './Location.js';
import Item from '../Entities/Item.js';
import {assertIsGreaterThanOrEqual, assertIsInstanceOf, assertNotNil} from '../../source/assert.js';
import _ from 'lodash';
import {UI_ItemCount, UI_VeinItemCount, unsigned} from '../../types/main.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export interface GatheringPointRender {
    update(item: UI_VeinItemCount);
}

export default class GatheringPoint {
    private readonly _minCountForGather: unsigned = 1;
    private readonly _maxCountForGather: unsigned = 4;  //todo: Шанс. Максимальное значение должно быть реже чем среднее.

    private readonly _type: GatheringPointTypeID;
    private readonly _item: Item;
    private _startCount: unsigned;
    private _count: unsigned;

    constructor(type: GatheringPointTypeID, item: Item, count: unsigned) {
        assertNotNil(type);
        assertIsInstanceOf(item, Item);
        assertIsGreaterThanOrEqual(count, 1);

        this._type = type;
        this._item = item;
        this._startCount = count;
        this._count = count;
    }

    /**
     *
     * @param gatherer
     * @return Остаток в жиле.
     */
    gather(gatherer: GathererInterface): unsigned {
        assertNotNil(gatherer);

        if (!this.canGather()) return 0;
        // if (!gatherer.()) return 0;

        let count = this._generateCount();
        let reminder = gatherer.add(this._item, count);
        if (reminder !== count) {
            this._count -= count - reminder;
        }

        return this._count;
    }

    gather2(): number {
        if (!this.canGather()) return 0;

        let count = this._generateCount();
        this._count -= count;

        return count;
    }

    /**
     * todo: Только другим разработчикам и самому себе не понятно будет как этим пользоваться и зачем нужен посредник в виде Gatherer. Хотя вроде как очевидно, что при таком использовании жила не звисит от игрока, и поэтому явно нужна зависимость от состояния героя.
     * @param itemStorage
     * @return Остаток в жиле.
     */
    gather3(itemStorage: ItemStorageInterface): unsigned {
        if (!this.canGather()) return 0;

        let count = this._generateCount();
        let reminder = itemStorage.addItem(this._item, count);  //todo: А вообще можно не учитывать заполнение сумок - пусть игрок контролирует.

        this._count -= count - reminder;

        return this._count;
    }

    private _generateCount(): unsigned {
        // if (!this.canGather()) return 0; //todo: Нужна ли тут проверка? ---> Можно сделать что возвращается 0 если жила пустая, а потом объект адялется.
        if (this._count <= 0) return 0;
        if (this._count === 1) return 1;

        return _.random(this._minCountForGather, this._maxCountForGather <= this._count ? this._maxCountForGather : this._count);
    }

    canGather(): boolean {
        if (this._count <= 0) {
            debug(DebugNamespaceID.Throw)('Жила истощена.');
            return false;
        }

        return true;
    }

    isEmpty(): boolean {
        return this._count <= 0;
    }

    renderByRequest(ui: GatheringPointRender): void {
        ui.update({
            itemName: this._item.id,
            startCount: this._startCount,
            count: this._count,
        });
    }
}