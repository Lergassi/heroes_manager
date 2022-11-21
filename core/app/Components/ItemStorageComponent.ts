import ItemStorageSlotComponent from './ItemStorageSlotComponent.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import Item from '../Entities/Item.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import GameObject from '../../source/GameObject.js';
import {unsigned} from '../../types/main.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import AppError from '../../source/Errors/AppError.js';
import {assertIsGreaterThanOrEqual, assertIsInstanceOf, assertNotNil} from '../../source/assert.js';
import EventSystem from '../../source/EventSystem.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import RenderInterface from '../Interfaces/RenderInterface.js';

export enum ItemStorageComponentEventCode {
    AddItem = 'ItemStorageComponent.AddItem',
    Clear = 'ItemStorageComponent.Clear',
    Update = 'ItemStorageComponent.Update',
}

/**
 * todo: Вообще переделать. Убрать слоты с новыми идеями.
 */
// export default class ItemStorageComponent implements ItemStorageInterface, RenderInterface<{slots: {[key: string]: ItemStorageSlotComponent}}> {
export default class ItemStorageComponent implements ItemStorageInterface {
// export default class ItemStorageComponent implements ItemStorageInterface, RenderInterface {
    private readonly _size: number;
    private readonly _slots: {[key: string]: ItemStorageSlotComponent};
    private readonly _itemStackFactory: ItemStackFactory;

    constructor(
        slots: ItemStorageSlotComponent[],
        itemStackFactory: ItemStackFactory,
    ) {
        this._size = slots.length;
        this._slots = {};
        for (let i = 0; i < slots.length; i++) {
            this._slots[i.toString()] = slots[i];
        }
        this._itemStackFactory = itemStackFactory;
    }

    /**
     * todo: Может только itemStack?
     * @param item
     * @param count
     * @return Остаток.
     */
    addItem(item: Item, count: unsigned): unsigned {
        assertIsInstanceOf(item, Item);
        assertIsGreaterThanOrEqual(count, 0);

        for (const slotsKey in this._slots) {
            count = this._slots[slotsKey].addItem(item, count);
        }
        // for (let i = 0; i < this._itemStackControllers.length; i++) {
        //     count = this._itemStackControllers[i].addItem(item, count);
        // }

        return count;
    }

    // /**
    //  * todo: Может только itemStack?
    //  * @param item
    //  * @param count
    //  * @return Остаток.
    //  */
    // addItem(item: Item, count: unsigned): unsigned {
    //     assertIsInstanceOf(item, Item);
    //     assertIsGreaterThanOrEqual(count, 0);
    //
    //     let currentCount = count;
    //
    //     let slotsWithItem = this.getItemStorageSlotComponentsWithItem(item);
    //     let freeSlots = this.getFreeItemStorageSlotComponents();
    //     while (currentCount > 0) {
    //         //todo: Надо по слотам идти по порядку.
    //         for (let i = 0; i < slotsWithItem.length; i++) {
    //             if (slotsWithItem[i].itemStack.isFull()) {
    //                 continue;
    //             }
    //
    //             let flawCount = slotsWithItem[i].itemStack.flawCount();
    //             if (currentCount <= flawCount) {
    //                 slotsWithItem[i].itemStack.add(currentCount);
    //                 currentCount = 0;
    //             } else {
    //                 slotsWithItem[i].itemStack.add(flawCount);
    //                 currentCount -= flawCount;
    //             }
    //         }
    //
    //         if (currentCount > 0) {
    //             if (!freeSlots.length) {
    //                 break;
    //             }
    //
    //             for (let j = 0; j < freeSlots.length; j++) {
    //                 let stackSize = currentCount <= item.stackSize ? currentCount : item.stackSize;
    //                 freeSlots[j].placeItemStack(this._itemStackFactory.create(item, stackSize));
    //                 currentCount -= stackSize;
    //                 if (currentCount <= 0) {
    //                     break;
    //                 }
    //             }
    //             break;
    //         }
    //     }
    //
    //     //todo: Нужно отдельное сообщение если предметы не добавлены.
    //     // debug(DebugNamespaceID.Log)(sprintf('В сумку добавлено предметов "%s": %s из %s.', item.name, count - currentCount, count));
    //     if (count > 0 && currentCount < count) {
    //         EventSystem.event(ItemStorageComponentEventCode.Update, this);
    //     }
    //     debug(DebugNamespaceID.Log)(sprintf('В сумку добавлено предметов "%s": %s из %s.', item.name, count - currentCount, count));    //todo: Оставить это сообщение для контроллера или логгера.
    //
    //     return currentCount;
    // }

    clear(): void {
        for (const slotsKey in this._slots) {
            this._slots[slotsKey].destroyItemStack();
        }

        EventSystem.event(ItemStorageComponentEventCode.Update, this);
    }

    render(callback: (options: {
        slots: {[key: string]: ItemStorageSlotComponent},
    }) => void) {
        callback({
            slots: this._slots,
        });
    }

    //todo: @indev До появления StackController и пока есть геттеры у слотов и стеков.
    moveTo(itemStorage: ItemStorageInterface) {
        for (const slotKey in this._slots) {
            if (!this._slots[slotKey].isFree()) {
                if (!itemStorage.addItem(this._slots[slotKey].itemStack.item, this._slots[slotKey].itemStack.count)) {
                    this._slots[slotKey].destroyItemStack();
                }
            }
        }
    }

    //----------------------------------------------------------------
    // deprecated:
    //----------------------------------------------------------------

    /**
     * @deprecated
     */
    get freeItemStorageSlotCount(): number {
        return this._size - this.busyItemStorageSlotCount;
    }

    /**
     * @deprecated
     */
    get itemStorageSlotComponents(): ItemStorageSlotComponent[] {
        let slots = [];
        for (const slotsKey in this._slots) {
            slots.push(this._slots[slotsKey]);
        }

        return slots;
    }

    /**
     * @deprecated Только для рендера.
     */
    get busyItemStorageSlotCount(): number {
        let count = 0;
        for (const slotsKey in this._slots) {
            count += Number(!this._slots[slotsKey].isFree());
        }

        return count;
    }

    /**
     * @deprecated
     */
    getFreeItemStorageSlotComponents(): ItemStorageSlotComponent[] {
        let freeItemStorageSlotComponents: ItemStorageSlotComponent[] = [];

        for (const slotKey in this._slots) {
            if (this._slots[slotKey].isFree()) {
                freeItemStorageSlotComponents.push(this._slots[slotKey]);
            }
        }

        return freeItemStorageSlotComponents;
    }

    /**
     * @deprecated
     */
    getFirstFreeItemStorageSlotComponent(): ItemStorageSlotComponent {
        for (const slotsKey in this._slots) {
            if (this._slots[slotsKey].isFree()) {
                return this._slots[slotsKey];
            }
        }

        return undefined;
    }

    /**
     * @deprecated
     */
    getItemStorageSlotComponentsWithItem(item: Item): ItemStorageSlotComponent[] {
        let itemStorageSlotComponentsWithItem = [];

        for (const slotsKey in this._slots) {
            if (this._slots[slotsKey].containsItem(item)) {
                itemStorageSlotComponentsWithItem.push(this._slots[slotsKey]);
            }
        }

        return itemStorageSlotComponentsWithItem;
    }

    /**
     * @deprecated Использовать метод move.
     * @param itemStack
     */
    addItemStack(itemStack: ItemStack) /* todo: return ID или остаток */ {
        let slot = this.getFirstFreeItemStorageSlotComponent();
        if (slot) {
            slot.placeItemStack(itemStack);
        }

        EventSystem.event(ItemStorageComponentEventCode.Update, this);
    }

    /**
     * Предположим что ID доступен из вне, а слоты нет. И за рендер отвечает данный класс. И слоты снаружи не нужны. Или отдельный массив для слотов?
     * @deprecated Слотов не будет.
     * @param ID
     */
    clearSlot(ID: string) {
        this._slots[ID]?.destroyItemStack();

        EventSystem.event(ItemStorageComponentEventCode.Update, this);
    }

    /**
     * @deprecated Временно для рендера, до новой системы сумок.
     * @param index
     */
    getItemStorageSlot(index: number): ItemStorageSlotComponent {
        assertNotNil(this._slots[index], 'ItemStorageSlot не найден.');

        return this._slots[index];
    }
}