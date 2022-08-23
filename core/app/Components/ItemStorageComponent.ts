import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from './ItemStorageSlotComponent.js';
import AppError from '../../source/AppError.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';

export const ITEM_STORAGE_DEFAULT_SIZE = 20;

export default class ItemStorageComponent extends Component {
    private readonly _size: number;

    get size(): number {
        return this._size;
    }

    get busyItemStorageSlotCount(): number {
        let count = 0;
        const itemStorageSlotComponents = this.gameObject.findComponentsByName(ItemStorageSlotComponent.name);
        itemStorageSlotComponents.map((item: ItemStorageSlotComponent) => {
            count += Number(item.isBusy());
        });

        return count;
    }

    get freeItemStorageSlotCount(): number {
        return this._size - this.busyItemStorageSlotCount;
    }

    constructor(
        id: string,
        gameObject: GameObject,
        size: number
    ) {
        super(id, gameObject);
        this._size = size;
    }

    findFirstFreeItemStorageSlotComponent(): ItemStorageSlotComponent {
        let freeItemStorageSlotComponent = null;

        let itemStorageSlotComponents = <ItemStorageSlotComponent[]>this.gameObject.findComponentsByName(ItemStorageSlotComponent.name);
        for (let i = 0; i < itemStorageSlotComponents.length; i++) {
            if (itemStorageSlotComponents[i].isFree()) {
                freeItemStorageSlotComponent = itemStorageSlotComponents[i];
                break;
            }
        }

        return freeItemStorageSlotComponent;
    }

    getFirstFreeItemStorageSlotComponent(): ItemStorageSlotComponent {
        let freeItemStorageSlot = this.findFirstFreeItemStorageSlotComponent();
        if (!freeItemStorageSlot) {
            throw AppError.freeItemStorageSlotNotFound();
        }

        return freeItemStorageSlot;
    }

    addItemStack(itemStack: ItemStack) {
        this.getFirstFreeItemStorageSlotComponent().placeItemStack(itemStack);
    }
}