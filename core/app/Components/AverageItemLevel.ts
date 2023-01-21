import _ from 'lodash';
import debug from 'debug';
import Item from '../Entities/Item.js';

export interface AverageItemLevelRender {
    updateAverageItemLevel?(value: number): void;
}

export default class AverageItemLevel {
    private readonly _items: Item[];
    private _value: number;

    private _callbacks;

    get value(): number {
        return this._value;
    }

    constructor() {
        this._items = [];
        this._callbacks = [];
    }

    addItem(item: Item): void {
        this._items.push(item);
        this.updateUI();
    }

    removeItem(item: Item): void {
        _.pullAt(this._items, _.indexOf(this._items, item));
        this.updateUI();
    }

    render(callback: (value: number) => void) {
        if (!_.includes(this._callbacks, callback)) {
            this._callbacks.push(callback);
        }
        this.updateUI();
    }

    removeRender(callback: (value: number) => void) {
        _.pull(this._callbacks, callback);
    }

    updateUI() {
        for (let i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](this.value);
        }
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

        this._value = count === 0 ? 0 : _.floor(sum / count);
    }
}