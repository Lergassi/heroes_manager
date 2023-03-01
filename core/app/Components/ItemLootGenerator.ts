import {ItemID} from '../../types/enums/ItemID.js';
import {ItemLoot, RangeType, unsigned} from '../../types/main.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import ItemStorageComponent from './ItemStorages/ItemStorageComponent.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import _ from 'lodash';

export default class ItemLootGenerator {
    private readonly _items: ItemLoot[];

    //todo: Смотреть как будет удобно пользоваться. Возможно стоит всё переделать на методы иначе придется менять много логики при изменении типа постоянно.
    constructor() {
        this._items = [];
    }

    addItem(itemID: ItemID, count: RangeType, chance: number): void {
        this._items.push({
            ID: itemID,
            count: count,
            chance: chance,
        });
    }

    generate(itemStorage: ItemStorageInterface): void {
        debug(DebugNamespaceID.Indev)('Генерация лута без шанса.');
        for (let i = 0; i < this._items.length; i++) {
            itemStorage.addItem(this._items[i].ID, _.random(this._items[i].count.min, this._items[i].count.max));
        }
    }
}