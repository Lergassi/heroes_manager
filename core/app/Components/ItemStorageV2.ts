import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import Viewer from '../../source/Viewer.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {UI_ItemCount, unsigned} from '../../types/main.js';
import HeroClass from '../Entities/HeroClass.js';
import Item from '../Entities/Item.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import ItemStorageInterface, {ItemStorageInterfaceRender} from '../Interfaces/ItemStorageInterface.js';
import ItemStackController from './ItemStackController.js';

export default class ItemStorageV2 implements ItemStorageInterface {
    private readonly _size: number;
    private readonly _itemStackControllers: ItemStackController[];
    private _entityManager: EntityManagerInterface;

    constructor(size: number, entityManager: EntityManagerInterface) {
        assertIsGreaterThanOrEqual(size, 1);
        assertNotNil(entityManager);
        // this._itemStackControllers = itemStackControllers;
        // this._size = itemStackControllers.length;

        this._entityManager = entityManager;

        this._size = size;
        this._itemStackControllers = [];
        for (let i = 0; i < this._size; i++) {
            this._itemStackControllers.push(new ItemStackController());
        }
    }

    addItem(item: Item | ItemID, count: unsigned): unsigned {
        item = !(item instanceof Item) ? this._entityManager.get<Item>(EntityID.Item, item) : item;
        assertNotNil(item);
        // assertIsGreaterThanOrEqual(count, 0);

        // if (count === 0) return 0;

        let originCount = count;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            count = this._itemStackControllers[i].addItem(item, count);
            // this._onChange(index, this._item, this._count);
        }

        if (originCount !== count) {
            debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));
        }

        //todo: Можно ввести уровень сообщений.
        // debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));
        // this._updateHandler?.(this._itemStackControllers);
        // for (let i = 0; i < this._handlers.length; i++) {
        //     this._handlers[i].updateSlotHandler();
        // }

        return count;
    }

    moveTo(target: ItemStorageInterface): void {
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
        for (let i = this._itemStackControllers.length - 1; i >= 0; i--) {
            count -= this._itemStackControllers[i].removeItem(ID, count);
            if (count <= 0) break;
        }
        let removeItemsCount = originCount - count;
        debug(DebugNamespaceID.Log)(sprintf('Удалено предметов "%s": %s из %s.', ID, removeItemsCount, originCount));

        return removeItemsCount;
    }

    containItem(ID: ItemID): number {
        let count = 0;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            count += this._itemStackControllers[i].containItem(ID);
        }

        return count;
    }

    canAddItem(item: Item, count: number): number {
        let reminder = count;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            reminder = this._itemStackControllers[i].canAddItem(item, reminder);
        }

        return reminder;
    }

    renderByRequest(ui: ItemStorageInterfaceRender): void {
        let items: UI_ItemCount[] = [];
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            this._itemStackControllers[i].renderByRequest({
                updateItem(itemName: string, count: number): void {
                    items.push({itemName: itemName, count: count});
                },
            });
        }

        ui.updateItems?.(items);
    }
}