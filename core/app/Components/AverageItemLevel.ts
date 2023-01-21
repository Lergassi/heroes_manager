import _ from 'lodash';
import debug from 'debug';
import Item from '../Entities/Item.js';

export interface AverageItemLevelRender {
    updateAverageItemLevel?(value: number): void;
}

export default class AverageItemLevel {
    private readonly _items: Item[];
    private _value: number;

    get value(): number {
        return this._value;
    }

    constructor() {
        this._items = [];
    }

    addItem(item: Item): void {
        this._items.push(item);
        this._calculate();
    }

    removeItem(item: Item): void {
        _.pullAt(this._items, _.indexOf(this._items, item));
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
            sum += this._items[i].itemLevel;
            ++count;
        }

        this._value = sum === 0 ? 0 : _.floor(sum / count);
    }
}