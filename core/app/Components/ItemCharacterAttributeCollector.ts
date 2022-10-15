import Item from '../Entities/Item.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

/**
 * И не важно теперь где и как располается предмет в каком слоте и какая логика слота.
 * todo: Пока один класс на все атрибуты. Дальше можно разделить.
 */
export default class ItemCharacterAttributeCollector {
    private _items: Item[];

    constructor() {
        this._items = [];
    }

    addItem(item: Item): void {
        this._items.push(item);
    }

    removeItem(item: Item): void {
        _.pullAt(this._items, _.indexOf(this._items, item));
    }

    value(ID: CharacterAttributeID): number {
        let increaseValue = 0;
        for (let i = 0; i < this._items.length; i++) {
            increaseValue += this._items[i].increaseCharacterAttribute(ID);
        }

        return increaseValue;
    }
}