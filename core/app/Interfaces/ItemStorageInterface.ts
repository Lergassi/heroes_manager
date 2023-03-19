import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import EquipController from '../Components/EquipController.js';
import Item from '../Entities/Item.js';
import {ItemCount, UI_ItemCount, UI_ItemStorageSlot, unsigned} from '../../types/main.js';
import {ItemID} from '../../types/enums/ItemID.js';

export interface ItemStorageInterfaceRender {
    // updateSlot(index: number, item: Item, count: number);
    // updateItems(items: UI_ItemCount[]);  //todo: Пока так в виде массива данных. Дальше нужно передавать методы.
    updateItems(slots: UI_ItemStorageSlot[]);  //todo: Пока так в виде массива данных. Дальше нужно передавать методы.
}

/**
 * Для сумки и коллекции сумок, стеков и других мест где нужно добавлять предметы.
 * todo: Разделить на сумки и просто классы для управления предметов типа слот экипировки. Интерфейс у обычной сумки и бесконечной не обязательно должен совпадать, особенно в плане рендера. Выделить отдельно интерфейс только на добавление предметов.
 * todo: Теперь это интерфейс для сумок. Всё что не сумки пока не обязательные методы до момента разделения.
 */
export default interface ItemStorageInterface {
    addItem(itemID: ItemID, count: number): number;
    containItem(ID: ItemID): number;
    hasItem(itemID: ItemID, count): boolean;
    hasItems(items: ItemCount[]): boolean;
    /**
     * Удаляет предметы из хранилища. Стекуемые и не стекуемые.
     * @param ID
     * @param count
     * @return Кол-во удаленных предметов из сумки. 0 = не удалено ни одного предмета, return = count = удалены все предметы.
     */
    removeItem(ID: ItemID, count: number): number;
    removeItems(items: ItemCount[]): void;
    // removeItemTo(itemID: ItemID, count: number, itemStorage: ItemStorageInterface): number;
    moveAllItemsTo(itemStorage: ItemStorageInterface): void;
    /**
     *
     * @param itemID
     * @param count
     * @return Сколько можно добавить из указанных.
     */
    canAddItem(itemID: ItemID, count: number): number;
    clear(index: number): void;
    clearAllItems(): void;
    isEmpty(): boolean;

    renderByRequest(ui: ItemStorageInterfaceRender): void;

    debug(): void;

    //todo: Для слотов. В отдельный интерфейс.
    // addByIndex(index: number, itemID: ItemID, count: number): number;
    // addByIndexFrom(index: number, itemID: ItemID, count: number, itemStorage: ItemStorageInterface): number;
    removeByIndex(index: number, count: number): number;
    removeByIndexTo(index: number, count: number, itemStorage: ItemStorageInterface): number;
}