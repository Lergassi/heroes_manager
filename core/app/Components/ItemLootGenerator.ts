import {ItemID} from '../../types/enums/ItemID.js';
import {ItemLoot} from '../../types/main.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import DebugApp from '../Services/DebugApp.js';

export default class ItemLootGenerator {
    private readonly _items: ItemLoot[];

    //todo: Смотреть как будет удобно пользоваться. Возможно стоит всё переделать на методы иначе придется менять много логики при изменении типа постоянно.
    constructor() {
        this._items = [];
    }

    addItem(itemID: ItemID, count: number, chance: number): void {
        this._items.push({
            ID: itemID,
            count: count,
            chance: chance,
        });
    }

    generate(itemStorage: ItemStorageInterface): void {
        DebugApp.debug(DebugNamespaceID.Indev)('Генерация лута без шанса выпадения.');
        for (let i = 0; i < this._items.length; i++) {
            itemStorage.addItem(this._items[i].ID, this._items[i].count);
        }
    }
}