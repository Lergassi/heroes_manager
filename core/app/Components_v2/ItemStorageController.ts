import GameContainer from '../../source/GameContainer.js';
import ItemSlot from './ItemSlot.js';
import Item from '../Entities/Item.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';

/**
 * @deprecated
 */
export default class ItemStorageController {
    private readonly _size: number;
    // private readonly _itemSlots: GameContainer[];
    private readonly _itemSlots: ItemSlot[];
    private readonly _itemStackFactory: ItemStackFactory;

    constructor(options: {
        // itemSlots: GameContainer[],
        itemSlots: ItemSlot[],
        // gameContainer: GameContainer,
        itemStackFactory: ItemStackFactory,
    }) {
        this._size = options.itemSlots.length;
        this._itemSlots = options.itemSlots;
        this._itemStackFactory = options.itemStackFactory;
    }

    get busyItemSlotsCount(): number {
        let count = 0;
        this._itemSlots.map((itemSlot) => {
            count += Number(!itemSlot.isFree());
        });

        return count;
    }

    get freeItemSlotsCount(): number {
        return this._size - this.busyItemSlotsCount;
    }

    getFirstFreeItemSlot(): ItemSlot {
        for (let i = 0; i < this._itemSlots.length; i++) {
            if (this._itemSlots[i].isFree()) {
                return this._itemSlots[i];
            }
        }

        return undefined;
    }

    getFirstItemSlotWithItem(item: Item): ItemSlot {
        for (let i = 0; i < this._itemSlots.length; i++) {
            if (this._itemSlots[i].containsItem(item)) {
                return this._itemSlots[i];
            }
        }

        return undefined;
    }

    getItemSlotsWithItem(item: Item): ItemSlot[] {
        let itemSlotsWithItem: ItemSlot[] = [];
        for (let i = 0; i < this._itemSlots.length; i++) {
            if (this._itemSlots[i].containsItem(item)) {
                itemSlotsWithItem.push(this._itemSlots[i]);
            }
        }

        return itemSlotsWithItem;
    }

    getFreeItemSlots(): ItemSlot[] {
        let freeItemSlots: ItemSlot[] = [];
        for (let i = 0; i < this._itemSlots.length; i++) {
            if (this._itemSlots[i].isFree()) {
                freeItemSlots.push(this._itemSlots[i]);
            }
        }

        return freeItemSlots;
    }

    destroyItemStacks() {
        for (let i = 0; i < this._itemSlots.length; i++) {
            this._itemSlots[i].destroyItemStack();
        }
    }

    /**
     * todo: Может только itemStack?
     * @param item
     * @param count
     * @return Остаток.
     */
    addItem(item: Item, count: number): number {
        let currentCount = count;
        let itemSlotsWithItem = this.getItemSlotsWithItem(item);
        let freeItemSlots = this.getFreeItemSlots();
        console.log(itemSlotsWithItem.length);
        console.log(freeItemSlots.length);
        while (currentCount > 0) {
            // for (let i = 0; i < itemSlotsWithItem.length; i++) {
            //     // if (itemSlotsWithItem[i].itemStack.count >= item.stackSize) {
            //     if (itemSlotsWithItem[i].hasCount(item.stackSize)) {
            //         continue;
            //     }
            //
            //     // let flawCount = itemSlotsWithItem[i].itemStack.item.stackSize - itemSlotsWithItem[i].itemStack.count;
            //     let flawCount = itemSlotsWithItem[i].flawCount(item.stackSize);
            //     if (currentCount <= flawCount) {
            //         itemSlotsWithItem[i].itemStack.count += currentCount;
            //         currentCount = 0;
            //     } else {
            //         itemSlotsWithItem[i].itemStack.count += flawCount;
            //         currentCount -= flawCount;
            //     }
            //     // currentCount -= flawCount;
            // }

            if (currentCount > 0) {
                if (!freeItemSlots.length) {
                    break;
                }

                for (let j = 0; j < freeItemSlots.length; j++) {
                    let count = currentCount <= item.stackSize ? currentCount : item.stackSize;
                    freeItemSlots[j].place(this._itemStackFactory.create(item, count));
                    currentCount -= count;
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

    /**
     * Метод просто добавляет в свободный слот, если найден, стек. Без объединения.
     * @param itemStack
     */
    addItemStack(itemStack: ItemStack): boolean {
        let itemSlot = this.getFirstFreeItemSlot();
        if (!itemSlot) {
            return false;
        }

        itemSlot.place(itemStack);

        return true;
    }
}