import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {
    ProductionRCInterface,
    ProductionRenderInterface,
    UI_ProductionItem
} from '../../../client/public/RC/ProductionRC';
import {database} from '../../data/ts/database';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID';
import {ItemID} from '../../types/enums/ItemID';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface';
import WalletInterface from '../Interfaces/WalletInterface';
import ItemStorage from './ItemStorages/ItemStorage';
import DebugApp from '../Services/DebugApp.js';

/**
 * Мгновенный крафт.
 * Доступность предметов настраивается отдельно от бд.
 */
export default class Production implements ProductionRenderInterface {
    private readonly _resourcesItemStorage: ItemStorageInterface;
    private readonly _resultItemStorage: ItemStorageInterface;
    private readonly _items: {
        [ID in ItemID]?: {
            // available: boolean,
        }
    };

    //todo: Далее тут будет бд вместо сущностей.
    constructor() {
        this._items = {};
        this._resourcesItemStorage = new ItemStorage(100);   //todo: Фабрика.
        this._resultItemStorage = new ItemStorage(100);      //todo: Фабрика.
    }

    addItem(itemID: ItemID): boolean {
        if (this.available(itemID)) return false;

        if (!database.recipes.data.hasRecipe(itemID)) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Рецепт для предмета "%s" не найден.', itemID));
            return false;
        }

        this._items[itemID] = {};
        // debug(DebugNamespaceID.Debug)(sprintf('Предмет "%s" добавлен в производство.', itemID));

        return true;
    }

    available(itemID: ItemID): boolean {
        return this._items.hasOwnProperty(itemID);
    }

    createItem(itemID: ItemID, itemStorage: ItemStorageInterface, wallet: WalletInterface): boolean {
        if (!this.available(itemID)) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Предмет "%s" не доступен для производства.', itemID));
            return false;
        }

        if (!this._hasRequireItems(itemID, itemStorage)) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Не достаточно ресурсов для производства "%s".', itemID));
            return false;
        }

        if (wallet.value < database.recipes.data.cost(itemID)) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Не достаточно денег.'));
            return false;
        }

        if (!this._resultItemStorage.isEmpty()) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Нужно забрать результат предыдущего производства.', itemID));
            return false;
        }

        // if (!itemStorage.canAddItem(itemID, database.recipes.data.resultCount(itemID))) {
        //     debug(DebugNamespaceID.Throw)(sprintf('Не достаточно места для результата производства "%s".', itemID));
        //     return false;
        // }

        database.recipes.data.requireItems(itemID, (ID, count) => {
            // this._resourcesItemStorage.addItem(ID, itemStorage.removeItem(ID, count));  //todo: Может не хватить места, если использовать обычную сумку со слотами.
            itemStorage.removeItem(ID, count);
        });
        wallet.remove(database.recipes.data.cost(itemID));

        //Доп проверка.
        // if (!this._hasRequireItems(itemID, this._resourcesItemStorage)) {
        //     debug(DebugNamespaceID.Throw)(sprintf('Не достаточно ресурсов для производства "%s". Ошибка при перещении.', itemID));
        //
        //     this._resourcesItemStorage.moveAllItemsTo(itemStorage);
        //     this._resourcesItemStorage.clearAllItems();  //todo: Если предметы не поместились, сейчас просто удаляются. Учесть в будущем.
        //
        //     return false;
        // }

        let resultCount = database.recipes.data.resultCount(itemID);
        let addedItemsCount = itemStorage.addItem(itemID, resultCount); //Предмет производиться в не зависимости от наличия места.
        let flow = resultCount - addedItemsCount;
        // this._resourcesItemStorage.clearAllItems();
        if (flow !== 0) {
            this._resultItemStorage.addItem(itemID, flow);
            DebugApp.debug(DebugNamespaceID.Throw)('Не достаточно места для результата производства. Предмет помещены во временное хранилище.');
        }

        return true;    //todo: Тут явно не правильная логика. Метод не гарантирует правильность выполнения. Например если не хватит места под результат, то предметы добавятся в временное хранилище/на землю/на почту.
    }

    getPreviousProduction(itemStorage: ItemStorageInterface): void {
        this._resultItemStorage.moveAllItemsTo(itemStorage);
    }

    renderByRequest(UI: ProductionRCInterface): void {
        let items: UI_ProductionItem[] = [];
        let key: ItemID;
        for (key in this._items) {
            items.push({itemID: key});
        }
        UI.updateItems(items);
        // UI.updateItems([
        //     {itemID: ItemID.Wood},
        //     {itemID: ItemID.Uncommon_OneHandedSword_006_01},
        // ]);
    }

    //todo: Сделать уничерсальный механизм проверки списков предметов в хранилищах.
    private _hasRequireItems(itemID: ItemID, itemStorage: ItemStorageInterface): boolean {
        return _.every(database.recipes.data.requireItems(itemID, (ID, count) => {
            return itemStorage.hasItem(ID, count);
        }));
    }
}