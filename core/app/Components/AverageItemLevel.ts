import _ from 'lodash';
import {database} from '../../data/ts/database.js';
import {ItemID} from '../../types/enums/ItemID.js';

export interface AverageItemLevelRender {
    updateAverageItemLevel?(value: number): void;
}

export default class AverageItemLevel {
    private readonly _items: ItemID[];
    private _value: number;

    get value(): number {
        return this._value;
    }

    constructor() {
        this._items = [];
        this._value = 0;
    }

    addItem(itemID: ItemID): void {
        this._items.push(itemID);
        this._calculate();
    }

    removeItem(itemID: ItemID): void {
        _.pullAt(this._items, _.indexOf(this._items, itemID));
        this._calculate();
    }

    renderByRequest(ui: AverageItemLevelRender): void {
        ui.updateAverageItemLevel?.(this.value);
    }

    private _calculate(): void {
        if (this._items.length === 0) {
            this._value = 0;

            return;
        }

        let sum = 0;
        let count = 0;

        for (let i = 0; i < this._items.length; i++) {
            sum += Number(database.items.data.itemLevel(this._items[i]));
            ++count;
        }

        this._value = sum === 0 ? 0 : _.floor(sum / count);
    }
}