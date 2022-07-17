import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from './ItemStorageSlotComponent.js';
import AppError from '../../source/AppError.js';

export const ITEM_STORAGE_DEFAULT_SIZE = 20;

export default class ItemStorageComponent extends Component {
    private readonly _size: number;

    get size(): number {
        return this._size;
    }

    constructor(
        id: number,
        gameObject: GameObject,
        size: number
    ) {
        super(id, gameObject);
        this._size = size;
    }

    findFirstFreeItemStorageSlotComponent(): ItemStorageSlotComponent {
        let freeItemStorageSlotComponent = undefined;

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
            throw new AppError('Свободных слотов не найдено.');
        }

        return freeItemStorageSlot;
    }
}