import AppError from '../../source/AppError.js';
import Item from '../Entities/Item.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import ItemStackPattern from '../RuntimeObjects/ItemStackPattern.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';

export default class ItemStorageManager {
    private _gameObjectStorage: GameObjectStorage;

    constructor(gameObjectStorage: GameObjectStorage) {
        this._gameObjectStorage = gameObjectStorage;
    }

    findFirstFreeItemStorageSlot() {
        const itemStorages = this._gameObjectStorage.findByTag('#item_storage');
        for (let i = 0; i < itemStorages.length; i++) {
            const itemStorageSlotComponents = <ItemStorageSlotComponent[]>itemStorages[i].findComponentsByName(ItemStorageSlotComponent.name);
            for (let j = 0; j < itemStorageSlotComponents.length; j++) {
                if (itemStorageSlotComponents[j].isFree()) {
                    return itemStorageSlotComponents[j];
                }
            }
        }

        return undefined;
    }

    getFirstFreeItemStorageSlot() {
        let freeItemStorageSlot = this.findFirstFreeItemStorageSlot();
        if (!freeItemStorageSlot) {
            throw new AppError('Свободных слотов не найдено.');
        }

        return freeItemStorageSlot;
    }

    addItemStack(itemStack: ItemStack) {
        const freeItemStorageSlotComponent = this.getFirstFreeItemStorageSlot();
        freeItemStorageSlotComponent.placeItemStack(itemStack);
    }

    addItem(itemStackPattern: ItemStackPattern) {
        const freeItemStorageSlotComponent = this.getFirstFreeItemStorageSlot();
        freeItemStorageSlotComponent.placeItemStack(itemStackPattern.build());
    }
}