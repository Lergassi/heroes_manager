import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {ItemID} from '../../types/enums/ItemID.js';

/**
 * Для сумки и коллекции сумок, стеков и других мест где нужно добавлять предметы.
 * todo: Разделить на сумки и просто классы для управления предметов типа слот экипировки. Выделить отдельно интерфейс только на добавление предметов.
 */
export default interface ItemStorageInterface {
    /**
     *
     * @param item
     * @param count
     * @return Остаток.
     */
    addItem(item: Item, count: unsigned): unsigned;

    // totalItem(ID: ItemID): number;
    containItem(ID: ItemID, count: number): boolean;
    /**
     * Удаляет предметы из хранилища. Стекуемые и не стекуемые.
     * @param ID
     * @param count
     * @return Кол-во удаленных предметов.
     */
    removeItem(ID: ItemID, count: number): number;
    // hasFreeSlot(): boolean;
    moveTo(itemStorage: ItemStorageInterface): void;
}