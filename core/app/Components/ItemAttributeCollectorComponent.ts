import Item from '../Entities/Item.js';
import {CharacterAttributeID} from '../types.js';
import _ from 'lodash';

/**
 * И не важно теперь где и как располается предмет в каком слоте и какая логика слота.
 * todo: Пока один класс на все атрибуты. Дальше можно разделить.
 */
export default class ItemAttributeCollectorComponent {
    private _items: Item[];

    constructor() {
        this._items = [];
    }

    addItem(item: Item): void {
        if (!_.includes(this._items, item)) {
            this._items.push(item);
        }
    }

    remoteItem(item: Item): void {
        _.pull(this._items, item);
    }

    increaseCharacterAttribute(ID: CharacterAttributeID): number {
        let increaseValue = 0;
        for (let i = 0; i < this._items.length; i++) {
            increaseValue += this._items[i].increaseCharacterAttribute(ID);
        }

        return increaseValue;
    }
}