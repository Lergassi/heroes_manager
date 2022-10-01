import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from './ItemStorageSlotComponent.js';
import AppError from '../../source/AppError.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import RComponentBridge from '../../../client/source/RComponentBridge.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import Item from '../Entities/Item.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';

export const DEFAULT_ITEM_STORAGE_SIZE = 20;

/**
 * Это контроллер.
 */
export default class ItemStorageComponent extends Component {
    private readonly _size: number;
    private readonly _slots: ItemStorageSlotComponent[];
    private readonly _itemStackFactory: ItemStackFactory;

    constructor(
        // id: number,
        // gameObject: GameObject,
        // size: number,
        // IDGenerator: IDGeneratorInterface,
        slots: ItemStorageSlotComponent[],
        itemStackFactory: ItemStackFactory,
    ) {
        super();
        this._size = slots.length;
        this._slots = slots;
        this._itemStackFactory = itemStackFactory;

        //todo: Слоты надо либо скрыть, либо передавать из вне. Тогда логика ItemStorageComponent измениться и будет зависить от переданного кол-ва слотов. Сколько передали - такой и размер.
        // for (let i = 0; i < size; i++) {
        //     this.gameObject.addComponent(new ItemStorageSlotComponent(
        //         IDGenerator.generateID(),
        //         this.gameObject,
        //     ));
        // }
    }

    /**
     * @deprecated
     */
    get size(): number {
        return this._size;
    }

    /**
     * @deprecated
     */
    get itemStorageSlotComponents(): ItemStorageSlotComponent[] {
        // return this.gameObject.getComponents<ItemStorageSlotComponent>(ItemStorageSlotComponent);
        return this._slots;
    }

    get busyItemStorageSlotCount(): number {
        let count = 0;
        // const itemStorageSlotComponents = this.gameObject.findComponentsByName(ItemStorageSlotComponent.name);
        const itemStorageSlotComponents = this._slots;
        itemStorageSlotComponents.map((itemStorageSlotComponent: ItemStorageSlotComponent) => {
            count += Number(!itemStorageSlotComponent.isFree());
        });

        return count;
    }

    get freeItemStorageSlotCount(): number {
        return this._size - this.busyItemStorageSlotCount;
    }

    /**
     * @deprecated Использовать getFirstFreeItemStorageSlotComponent()
     */
    findFirstFreeItemStorageSlotComponent(): ItemStorageSlotComponent {
        let freeItemStorageSlotComponent = null;

        // let itemStorageSlotComponents = <ItemStorageSlotComponent[]>this.gameObject.findComponentsByName(ItemStorageSlotComponent.name);
        let itemStorageSlotComponents = this._slots;
        for (let i = 0; i < itemStorageSlotComponents.length; i++) {
            if (itemStorageSlotComponents[i].isFree()) {
                freeItemStorageSlotComponent = itemStorageSlotComponents[i];
                break;
            }
        }

        return freeItemStorageSlotComponent;
    }

    getFreeItemStorageSlotComponents(): ItemStorageSlotComponent[] {
        let freeItemStorageSlotComponents: ItemStorageSlotComponent[] = [];
        // let itemStorageSlotComponents = <ItemStorageSlotComponent[]>this.gameObject.findComponentsByName(ItemStorageSlotComponent.name);
        let itemStorageSlotComponents = this._slots;
        for (let i = 0; i < itemStorageSlotComponents.length; i++) {
            if (itemStorageSlotComponents[i].isFree()) {
                freeItemStorageSlotComponents.push(itemStorageSlotComponents[i]);
            }
        }

        return freeItemStorageSlotComponents;
    }

    getFirstFreeItemStorageSlotComponent(): ItemStorageSlotComponent {
        // let freeItemStorageSlot = this.findFirstFreeItemStorageSlotComponent();
        // if (!freeItemStorageSlot) {
        //     throw AppError.freeItemStorageSlotNotFound();
        // }
        //
        // return freeItemStorageSlot;
        let freeItemStorageSlotComponent;
        // let itemStorageSlotComponents = <ItemStorageSlotComponent[]>this.gameObject.findComponentsByName(ItemStorageSlotComponent.name);
        let itemStorageSlotComponents = this._slots;
        for (let i = 0; i < itemStorageSlotComponents.length; i++) {
            if (itemStorageSlotComponents[i].isFree()) {
                freeItemStorageSlotComponent = itemStorageSlotComponents[i];
                break;
            }
        }

        return freeItemStorageSlotComponent;
    }

    getItemStorageSlotComponentsWithItem(item: Item): ItemStorageSlotComponent[] {
        let itemStorageSlotComponentsWithItem = [];
        // let itemStorageSlotComponents = <ItemStorageSlotComponent[]>this.gameObject.findComponentsByName(ItemStorageSlotComponent.name);
        let itemStorageSlotComponents = this._slots;
        for (let i = 0; i < itemStorageSlotComponents.length; i++) {
            if (itemStorageSlotComponents[i].containsItem(item)) {
                itemStorageSlotComponentsWithItem.push(itemStorageSlotComponents[i]);
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
            // throw AppError.freeItemStorageSlotNotFound();
            slot.placeItemStack(itemStack);
        }

        // slot.placeItemStack(itemStack);
    }

    clear() {
        // let itemStorageSlotComponents = this.gameObject.findComponentsByName<ItemStorageSlotComponent>(ItemStorageSlotComponent.name);
        let itemStorageSlotComponents = this._slots;
        for (let i = 0; i < itemStorageSlotComponents.length; i++) {
            itemStorageSlotComponents[i].clear();
        }
    }

    render(callback: (values: {
        slots: ItemStorageSlotComponent[],
    }) => void) {
        callback({
            slots: this._slots,
        });
    }
}