import {sprintf} from 'sprintf-js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../../source/assert.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import {ItemCount, UI_ItemStorageSlot} from '../../../types/main.js';
import ItemStorageInterface, {ItemStorageInterfaceRender} from '../../Interfaces/ItemStorageInterface.js';
import EquipController from '../EquipController.js';
import ItemStackController from './ItemStackController.js';
import DebugApp from '../../Services/DebugApp.js';

export default class ItemStorage implements ItemStorageInterface {
    private readonly _size: number;
    private readonly _itemStackControllers: ItemStackController[];

    constructor(size: number) {
        assertIsGreaterThanOrEqual(size, 1);
        // this._itemStackControllers = itemStackControllers;
        // this._size = itemStackControllers.length;

        this._size = size;
        this._itemStackControllers = [];
        for (let i = 0; i < this._size; i++) {
            this._itemStackControllers.push(new ItemStackController());
        }
    }

    // /**
    //  * @deprecated
    //  * @param item
    //  * @param count
    //  */
    // _addItem(item: Item | ItemID, count: unsigned): unsigned {
    //     item = !(item instanceof Item) ? this._entityManager.get<Item>(EntityID.Item, item) : item;
    //     assertNotNil(item);
    //
    //     // assertIsGreaterThanOrEqual(count, 0);
    //     if (count <= 0) return 0;   //А почему было удалено?
    //
    //     let originCount = count;
    //     for (let i = 0; i < this._itemStackControllers.length; i++) {
    //         count = this._itemStackControllers[i]._addItem(item, count);
    //         if (count <= 0) break;
    //     }
    //
    //     if (originCount !== count) {
    //         debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));
    //     }
    //
    //     //todo: Можно ввести уровень сообщений.
    //     // debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));
    //     // this._updateHandler?.(this._itemStackControllers);
    //     // for (let i = 0; i < this._handlers.length; i++) {
    //     //     this._handlers[i].updateSlotHandler();
    //     // }
    //
    //     return count;
    // }

    // /**
    //  *
    //  * @param item
    //  * @param count
    //  * @return Кол-во добавленных предметов.
    //  */
    // _addItem2(item: Item | ItemID, count: number): number {
    //     item = !(item instanceof Item) ? this._entityManager.get<Item>(EntityID.Item, item) : item;
    //     assertNotNil(item);
    //
    //     if (count <= 0) return count;
    //
    //     let originCount = count;
    //     for (let i = 0; i < this._itemStackControllers.length; i++) {
    //         count -= this._itemStackControllers[i]._addItem2(item, count);
    //         if (count <= 0) break;
    //     }
    //
    //     if (originCount !== count) {
    //         debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));
    //     }
    //
    //     return originCount - count;
    // }

    addItem(itemID: ItemID, count: number): number {
        if (count <= 0) return 0;

        let originCount = count;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            count -= this._itemStackControllers[i].addItem(itemID, count);
            if (count <= 0) break;
        }
        let addedItemsCount = originCount - count;

        if (originCount !== count) {
            DebugApp.debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', itemID, addedItemsCount, originCount));
        }

        return addedItemsCount;
    }

    moveAllItemsTo(target: ItemStorageInterface): void {
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            this._itemStackControllers[i].moveTo(target);
        }
    }

    totalItem(ID: ItemID): number {
        let total = 0;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            total += this._itemStackControllers[i].totalItem(ID);
        }

        return total;
    }

    removeItem(ID: ItemID, count: number): number {
        let originCount = count;
        //todo: Как лучше: с начала или конца?
        // for (let i = this._itemStackControllers.length - 1; i >= 0; i--) {
        //     count -= this._itemStackControllers[i].removeItem(ID, count);
        //     if (count <= 0) break;
        // }
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            count -= this._itemStackControllers[i].removeItem(ID, count);
            if (count <= 0) break;
        }

        let removedItemsCount = originCount - count;

        if (removedItemsCount !== 0) {
            DebugApp.debug(DebugNamespaceID.Log)(sprintf('Удалено предметов "%s": %s из %s.', ID, removedItemsCount, originCount));
        }

        return removedItemsCount;
    }

    removeItems(items: ItemCount[]): void {
        for (let i = 0; i < items.length; i++) {
            this.removeItem(items[i].itemID, items[i].count);
        }
    }

    containItem(ID: ItemID): number {
        let count = 0;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            count += this._itemStackControllers[i].containItem(ID);
        }

        return count;
    }

    hasItem(itemID: ItemID, count): boolean {
        assertIsGreaterThanOrEqual(count, 1);

        return this.containItem(itemID) >= count;
    }

    hasItems(items: ItemCount[]): boolean {
        if (!items.length) return true;
        // if (!this._itemStackControllers.length) return false;

        for (let i = 0; i < items.length; i++) {
            if (!this.hasItem(items[i].itemID, items[i].count)) return false;
        }

        return true;
    }

    canAddItem(itemID: ItemID, count: number): number {
        let totalCanAddItemCount = 0
        let itemStackControllerCanAddItemCount = 0;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            itemStackControllerCanAddItemCount = this._itemStackControllers[i].canAddItem(itemID, count);
            totalCanAddItemCount += itemStackControllerCanAddItemCount;
            count -= itemStackControllerCanAddItemCount;

            itemStackControllerCanAddItemCount = 0;

            if (count <= 0) break;
        }

        return totalCanAddItemCount;
    }

    clear(index: number): void {
        assertNotNil(this._itemStackControllers[index], 'Слот не найден.');

        this._itemStackControllers[index].clear();
    }

    clearAllItems(): void {
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            this._itemStackControllers[i].clear();
        }
    }

    // moveToEquipSlot(itemStorageSlotID: number, equipSlot: EquipSlotInterface): boolean {
    //     return this._itemStackControllers[itemStorageSlotID].moveToEquipSlot(equipSlot);
    // }

    moveToEquipSlotByEquipController(index: number, equipController: EquipController, equipSlotID: EquipSlotID): boolean {
        assertNotNil(this._itemStackControllers[index], 'Слот не найден.');

        return this._itemStackControllers[index].moveToEquipSlotByEquipController(equipSlotID, equipController);
    }

    isEmpty(): boolean {
        return _.every(_.map(this._itemStackControllers, (value) => {
            return value.isFree();
        }));
    }

    removeByIndex(index: number, count: number): number {
        if (!this._itemStackControllers[index]) return 0;

        return this._itemStackControllers[index].removeItemByIndex(count);
    }

    removeByIndexTo(index: number, count: number, itemStorage: ItemStorageInterface): number {
        if (!this._itemStackControllers[index]) return 0;

        return this._itemStackControllers[index].removeItemByIndexTo(count, itemStorage);
    }

    /**
     * По умолчанию рендер по слотам.
     * @param ui
     */
    renderByRequest(ui: ItemStorageInterfaceRender): void {
        let items: UI_ItemStorageSlot[] = [];
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            this._itemStackControllers[i].renderByRequest({
                updateItem(itemID: ItemID, count: number): void {
                    items.push({index: i, item: {itemID: itemID, count: count}});
                },
            });
        }

        ui.updateItems?.(items);
    }

    debug(): void {
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            this._itemStackControllers[i].debug();
        }
    }
}