import Item from '../Entities/Item.js';
import {UI_ItemCount, unsigned} from '../../types/main.js';
import {ItemID} from '../../types/enums/ItemID.js';

export interface ItemStorageInterfaceRender {
    // updateSlot(index: number, item: Item, count: number);
    updateItems(items: UI_ItemCount[]);  //todo: Пока так в виде массива данных. Дальше нужно передавать методы.
}

/**
 * Для сумки и коллекции сумок, стеков и других мест где нужно добавлять предметы.
 * todo: Разделить на сумки и просто классы для управления предметов типа слот экипировки. Интерфейс у обычной сумки и бесконечной не обязательно должен совпадать, особенно в плане рендера. Выделить отдельно интерфейс только на добавление предметов.
 */
export default interface ItemStorageInterface {
    /**
     *
     * @param item
     * @param count
     * @return Остаток. Сколько предметов НЕ добавлено. 0 = добавлены все предметы.
     */
    addItem(item: Item | ItemID, count: unsigned): unsigned;

    // totalItem(ID: ItemID): number;
    // containItem(ID: ItemID, count: number): boolean;
    containItem(ID: ItemID): number;
    /**
     * Удаляет предметы из хранилища. Стекуемые и не стекуемые.
     * @param ID
     * @param count
     * @return Кол-во удаленных предметов из сумки. 0 = не удалено ни одного предмета, return = count = удалены все предметы.
     */
    removeItem(ID: ItemID, count: number): number;

    moveTo(itemStorage: ItemStorageInterface): void;
    /**
     *
     * @param item
     * @param count
     * @return Остаток.
     */
    canAddItem(item: Item, count: number): number;
    renderByRequest(ui: ItemStorageInterfaceRender): void;
}