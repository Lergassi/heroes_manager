import Component from '../../source/Component.js';
import ItemStorageSlotComponent from './ItemStorageSlotComponent.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import Item from '../Entities/Item.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import GameObject from '../../source/GameObject.js';
import {unsigned} from '../../types/main.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';
import AppError from '../../source/Errors/AppError.js';
import {assertIsGreaterThanOrEqual, assertIsInstanceOf, assertNotNil} from '../../source/assert.js';
import EventSystem from '../../source/EventSystem.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export enum ItemStorageComponentEventCode {
    AddItem = 'ItemStorageComponent.AddItem',
    Clear = 'ItemStorageComponent.Clear',
    Update = 'ItemStorageComponent.Update',
}

/**
 * todo: Вообще переделать. Убрать слоты с новыми идеями.
 */
export default class ItemStorageComponent implements ItemStorageInterface {
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

    get freeItemStorageSlotCount(): number {
        return this._size - this.busyItemStorageSlotCount;
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
     * Добавляет предметы объединяя с другими стеками.
     * todo: Может только itemStack?
     * @param item
     * @param count
     * @return Остаток.
     */
    addItem(item: Item, count: unsigned): unsigned {
        assertIsInstanceOf(item, Item);
        assertIsGreaterThanOrEqual(count, 1);

        let currentCount = count;
        // for (const slotsKey in this._slots) {
        //     if (this._slots[slotsKey].isFree()) {
        //         this._slots[slotsKey].createItemStack({
        //             item: item,
        //         });
        //     }
        // }

        let slotsWithItem = this.getItemStorageSlotComponentsWithItem(item);
        let freeSlots = this.getFreeItemStorageSlotComponents();
        while (currentCount > 0) {
            //todo: Надо по слотам идти по порядку.
            for (let i = 0; i < slotsWithItem.length; i++) {
                if (slotsWithItem[i].itemStack.isFull()) {
                    continue;
                }

                let flawCount = slotsWithItem[i].itemStack.flawCount();
                if (currentCount <= flawCount) {
                    slotsWithItem[i].itemStack.add(currentCount);
                    currentCount = 0;
                } else {
                    slotsWithItem[i].itemStack.add(flawCount);
                    currentCount -= flawCount;
                }
            }

            if (currentCount > 0) {
                if (!freeSlots.length) {
                    break;
                }

                for (let j = 0; j < freeSlots.length; j++) {
                    let stackSize = currentCount <= item.stackSize ? currentCount : item.stackSize;
                    freeSlots[j].placeItemStack(this._itemStackFactory.create(item, stackSize));
                    currentCount -= stackSize;
                    if (currentCount <= 0) {
                        break;
                    }
                }
                break;
            }
        }

        if (count > 0 && currentCount < count) {
            EventSystem.event(ItemStorageComponentEventCode.Update, this);
        }

        return currentCount;
    }

    /**
     *
     * @param itemStorages
     * @param item
     * @param count Остаток.
     */
    static addItemToItemStorages(itemStorages: GameObject[], item: Item, count: number): unsigned {
        let originCount = count;
        for (let i = 0; i < itemStorages.length; i++) {
            if (!itemStorages[i].get<ItemStorageComponent>(GameObjectKey.ItemStorageComponent)) {
                throw AppError.componentNotFound(GameObjectKey.ItemStorageComponent);
            }

            // count -= count - itemStorages[i].get<ItemStorageComponent>(GameObjectKey.ItemStorageComponent).addItem(item, count);
            count -= count - itemStorages[i].get<ItemStorageInterface>(GameObjectKey.ItemStorageComponent).addItem(item, count);
            if (count <= 0) {
                break;
            }
        }

        if (originCount > 0 && count > 0) {
            debug(DebugNamespaceID.Warring)(sprintf('Предметы не добавлены %d - не хватило места.', count));
        }

        return count;
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

    clear(): void {
        for (const slotsKey in this._slots) {
            this._slots[slotsKey].destroyItemStack();
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

    render(callback: (values: {
        slots: {[key: string]: ItemStorageSlotComponent},
    }) => void) {
        callback({
            slots: this._slots,
        });
    }
}