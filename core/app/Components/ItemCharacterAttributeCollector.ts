import {ItemID} from '../../types/enums/ItemID.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

/**
 * И не важно теперь где и как располается предмет в каком слоте и какая логика слота.
 * todo: Пока один класс на все атрибуты. Дальше можно разделить.
 * @deprecated Использовать CharacterAttributeManager. Заметка по решению. Например не удобно при сохранении. Отдельный объект. При простом увеличении значения можно хранить только 1 значение (или baseValue/finalValue) и предметы в слотах.
 */
export default class ItemCharacterAttributeCollector {
    private readonly _items: ItemID[];

    constructor() {
        this._items = [];
    }

    addItem(itemID: ItemID): void {
        this._items.push(itemID);
    }

    removeItem(itemID: ItemID): void {
        _.pullAt(this._items, _.indexOf(this._items, itemID));
    }

    value(ID: CharacterAttributeID): number {
        let increaseValue = 0;
        for (let i = 0; i < this._items.length; i++) {
            // increaseValue += this._items[i].increaseCharacterAttribute(ID);
            increaseValue += 0; //todo: Переделать. В бд сейчас просто данные.
        }

        return increaseValue;
    }
}