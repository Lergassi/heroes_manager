import debug from 'debug';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {
    ProductionRCInterface,
    ProductionRenderInterface,
    UI_ProductionItem
} from '../../../../client/public/RC/ProductionRC.js';
import {database} from '../../../data/ts/database.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import ItemStorage from '../ItemStorages/ItemStorage.js';

/**
 * Мгновенный крафт.
 * Доступность предметов настраивается отдельно от бд.
 */
export default class Production implements ProductionRenderInterface {
    private readonly _resourcesItemStorage: ItemStorageInterface;
    private readonly _resultItemStorage: ItemStorageInterface;
    private readonly _items: {[ID in ItemID]?: {
        // available: boolean,
    }};

    //todo: Далее тут будет бд вместо сущностей.
    constructor(entityManager: EntityManagerInterface) {
        this._items = {};
        this._resourcesItemStorage = new ItemStorage(100, entityManager);   //todo: Фабрика.
        this._resultItemStorage = new ItemStorage(100, entityManager);      //todo: Фабрика.
    }

    addItem(itemID: ItemID): boolean {
        if (this.available(itemID)) return false;

        if (!database.recipes.data.hasRecipe(itemID)) {
            debug(DebugNamespaceID.Throw)(sprintf('Рецепт для предмета "%s" не найден.', itemID));
            return false;
        }

        this._items[itemID] = {};
        // debug(DebugNamespaceID.Debug)(sprintf('Предмет "%s" добавлен в производство.', itemID));

        return true;
    }

    available(itemID: ItemID): boolean {
        return this._items.hasOwnProperty(itemID);
    }

    createItem(itemID: ItemID, itemStorage: ItemStorageInterface): boolean {
        if (!this.available(itemID)) {
            debug(DebugNamespaceID.Throw)(sprintf('Предмет "%s" не доступен для производства.', itemID));
            return false;
        }

        if (!this._hasRequireItems(itemID, itemStorage)) {
            debug(DebugNamespaceID.Throw)(sprintf('Не достаточно ресурсов для производства "%s".', itemID));
            return false;
        }

        if (!this._resultItemStorage.isEmpty()) {
            debug(DebugNamespaceID.Throw)(sprintf('Нужно забрать результат предыдущего производства.', itemID));
            return false;
        }

        // if (!itemStorage.canAddItem(itemID, database.recipes.data.resultCount(itemID))) {
        //     debug(DebugNamespaceID.Throw)(sprintf('Не достаточно места для результата производства "%s".', itemID));
        //     return false;
        // }

        database.recipes.data.requireItems(itemID, (ID, count) => {
            this._resourcesItemStorage.addItem(ID, itemStorage.removeItem(ID, count));
        });

        //Доп проверка.
        if (!this._hasRequireItems(itemID, this._resourcesItemStorage)) {
            debug(DebugNamespaceID.Throw)(sprintf('Не достаточно ресурсов для производства "%s". Ошибка при перещении.', itemID));

            this._resourcesItemStorage.moveAllItemsTo(itemStorage);
            this._resourcesItemStorage.clearAllItems();  //todo: Если предеты не поместились, сейчас просто удаляются. Учесть в будущем.

            return false;
        }

        let resultCount = database.recipes.data.resultCount(itemID);
        let flow = resultCount - itemStorage.addItem(itemID, resultCount);
        this._resourcesItemStorage.clearAllItems();
        if (flow !== 0) {
            this._resultItemStorage.addItem(itemID, flow);
            debug(DebugNamespaceID.Throw)('Не достаточно места. Предмет прмещен во временное хранилище.');
        }

        return true;    //todo: Тут явно не правильная логика. Метод не гарантирует правильность выполнения. Например если не хватит места под результат, то предметы добавятся в временное хранилище/на землю/на почту.
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

    getPreviousProduction(itemStorage: ItemStorageInterface): void {
        this._resultItemStorage.moveAllItemsTo(itemStorage);
    }

    //todo: Сделать уничерсальный механизм проверки списков предметов в хранилищах.
    private _hasRequireItems(itemID: ItemID, itemStorage: ItemStorageInterface): boolean {
        return _.every(database.recipes.data.requireItems(itemID, (ID, count) => {
            return itemStorage.hasItem(ID, count);
        }));
    }
}