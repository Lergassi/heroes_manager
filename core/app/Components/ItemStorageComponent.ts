import Component from '../../source/Component.js';
import ItemStorageSlotComponent from './ItemStorageSlotComponent.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import Item from '../Entities/Item.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';

// export const DEFAULT_ITEM_STORAGE_SIZE = 20;

/**
 * todo: Вообще переделать. Убрать слоты с новыми идеями.
 */
export default class ItemStorageComponent extends Component {
    private readonly _size: number;
    // private readonly _slots: ItemStorageSlotComponent[];
    private readonly _slots: {[key: string]: ItemStorageSlotComponent};
    private readonly _itemStackFactory: ItemStackFactory;

    constructor(
        slots: ItemStorageSlotComponent[],
        itemStackFactory: ItemStackFactory,
    ) {
        super();
        this._size = slots.length;
        // this._slots = slots;
        this._slots = {};
        for (let i = 0; i < slots.length; i++) {
            this._slots[i.toString()] = slots[i];
        }
        this._itemStackFactory = itemStackFactory;

        //todo: Слоты надо либо скрыть, либо передавать из вне. Тогда логика ItemStorageComponent измениться и будет зависить от переданного кол-ва слотов. Сколько передали - такой и размер.
        // for (let i = 0; i < size; i++) {
        //     this.gameObject.addComponent(new ItemStorageSlotComponent(
        //         IDGenerator.generateID(),
        //         this.gameObject,
        //     ));
        // }
    }

    // /**
    //  * @deprecated
    //  */
    // get size(): number {
    //     return this._size;
    // }

    /**
     * @deprecated
     */
    get itemStorageSlotComponents(): ItemStorageSlotComponent[] {
        // return this._slots;
        // return undefined;

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
        // const itemStorageSlotComponents = this._slots;
        // itemStorageSlotComponents.map((itemStorageSlotComponent: ItemStorageSlotComponent) => {
        //     count += Number(!itemStorageSlotComponent.isFree());
        // });
        for (const slotsKey in this._slots) {
            count += Number(!this._slots[slotsKey].isFree());
        }

        return count;
    }

    get freeItemStorageSlotCount(): number {
        return this._size - this.busyItemStorageSlotCount;
    }

    // /**
    //  * @deprecated Использовать getFirstFreeItemStorageSlotComponent()
    //  */
    // findFirstFreeItemStorageSlotComponent(): ItemStorageSlotComponent {
    //     let freeItemStorageSlotComponent = null;
    //
    //     let itemStorageSlotComponents = this._slots;
    //     for (let i = 0; i < itemStorageSlotComponents.length; i++) {
    //         if (itemStorageSlotComponents[i].isFree()) {
    //             freeItemStorageSlotComponent = itemStorageSlotComponents[i];
    //             break;
    //         }
    //     }
    //
    //     return freeItemStorageSlotComponent;
    // }

    /**
     * @deprecated
     */
    getFreeItemStorageSlotComponents(): ItemStorageSlotComponent[] {
        let freeItemStorageSlotComponents: ItemStorageSlotComponent[] = [];
        // let itemStorageSlotComponents = this._slots;
        // for (let i = 0; i < itemStorageSlotComponents.length; i++) {
        //     if (itemStorageSlotComponents[i].isFree()) {
        //         freeItemStorageSlotComponents.push(itemStorageSlotComponents[i]);
        //     }
        // }

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
        // let freeItemStorageSlotComponent;
        // let itemStorageSlotComponents = this._slots;
        // for (let i = 0; i < itemStorageSlotComponents.length; i++) {
        //     if (itemStorageSlotComponents[i].isFree()) {
        //         freeItemStorageSlotComponent = itemStorageSlotComponents[i];
        //         break;
        //     }
        // }

        for (const slotsKey in this._slots) {
            if (this._slots[slotsKey].isFree()) {
                return this._slots[slotsKey];
            }
        }

        // return freeItemStorageSlotComponent;
        return undefined;
    }

    /**
     * @deprecated
     */
    getItemStorageSlotComponentsWithItem(item: Item): ItemStorageSlotComponent[] {
        let itemStorageSlotComponentsWithItem = [];
        // let itemStorageSlotComponents = this._slots;
        // for (let i = 0; i < itemStorageSlotComponents.length; i++) {
        //     if (itemStorageSlotComponents[i].containsItem(item)) {
        //         itemStorageSlotComponentsWithItem.push(itemStorageSlotComponents[i]);
        //     }
        // }

        for (const slotsKey in this._slots) {
            if (this._slots[slotsKey].containsItem(item)) {
                itemStorageSlotComponentsWithItem.push(this._slots[slotsKey]);
            }
        }

        return itemStorageSlotComponentsWithItem;
    }

    /**
     * todo: Может только itemStack?
     * @param item
     * @param count
     * @return Остаток.
     */
    addItem(item: Item, count: number = 1): number {
        // if (slotsWithItem.length) {
        //
        // }

        // let itemStacks = this._itemStackFactory.createSome(item, count);
        //
        // let slot = this.getFirstFreeItemStorageSlotComponent();
        // if (slot) {
        //     slot.placeItemStack(this._itemStackFactory.create(item, count));
        // }

        // slot.placeItemStack(this._itemStackFactory.create(item, count));
        let currentCount = count;
        let slotsWithItem = this.getItemStorageSlotComponentsWithItem(item);
        let freeSlots = this.getFreeItemStorageSlotComponents();
        while (currentCount > 0) {
            // console.log('slotsWithItem.length', slotsWithItem.length);
            for (let i = 0; i < slotsWithItem.length; i++) {
                // if (slotsWithItem[i].itemStack.count >= item.stackSize) {
                if (slotsWithItem[i].itemStack.isFull()) {
                    continue;
                }

                // let flawCount = slotsWithItem[i].itemStack.item.stackSize - slotsWithItem[i].itemStack.count;
                let flawCount = slotsWithItem[i].itemStack.flawCount();
                if (currentCount <= flawCount) {
                    // slotsWithItem[i].itemStack.count += currentCount;
                    slotsWithItem[i].itemStack.add(currentCount);
                    currentCount = 0;
                } else {
                    // slotsWithItem[i].itemStack.count += flawCount;
                    slotsWithItem[i].itemStack.add(flawCount);
                    currentCount -= flawCount;
                }
                // currentCount -= flawCount;
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
                // currentCount = -1;
            }
        }

        return currentCount;
    }

    addItemStack(itemStack: ItemStack) /* todo: return ID или остаток */ {
        let slot = this.getFirstFreeItemStorageSlotComponent();
        if (slot) {
            slot.placeItemStack(itemStack);
        }
    }

    clear(): void {
        // let itemStorageSlotComponents = this._slots;
        // for (let i = 0; i < itemStorageSlotComponents.length; i++) {
        //     itemStorageSlotComponents[i].destroyItemStack();
        // }
        for (const slotsKey in this._slots) {
            this._slots[slotsKey].destroyItemStack();
        }
    }

    //Предположим что ID доступен из вне, а слоты нет. И за рендер отвечает данный класс. И слоты снаружи не нужны. Или отдельный массив для слотов?
    clearSlot(ID: string) {
        this._slots[ID]?.destroyItemStack();
    }

    render(callback: (values: {
        // slots: ItemStorageSlotComponent[],
        slots: {[key: string]: ItemStorageSlotComponent},
    }) => void) {
        callback({
            slots: this._slots,
        });
    }
}