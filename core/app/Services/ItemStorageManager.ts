import AppError from '../../source/AppError.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import ItemStackPattern from '../RuntimeObjects/ItemStackPattern.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import GameObject from '../../source/GameObject.js';
import {debugGameObjectStorage} from '../../debug/debug_functions.js';

export default class ItemStorageManager {
    private _gameObjectStorage: GameObjectStorage;

    get itemStorages(): GameObject[] {
        return this._gameObjectStorage.findByTag('#item_storage');
    }

    constructor(gameObjectStorage: GameObjectStorage) {
        this._gameObjectStorage = gameObjectStorage;
    }

    /**
     * @deprecated
     */
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
        // let freeItemStorageSlot = this.findFirstFreeItemStorageSlot();
        // if (!freeItemStorageSlot) {
        //     throw new AppError('Свободных слотов не найдено.');
        // }
        //
        // return freeItemStorageSlot;
        let itemStorages = this._gameObjectStorage.findByTag('#item_storage');
        for (let i = 0; i < itemStorages.length; i++) {
            // const itemStorageSlotComponents = <ItemStorageSlotComponent[]>itemStorages[i].findComponentsByName(ItemStorageSlotComponent.name);
            let itemStorageSlotComponents = itemStorages[i].getComponents<ItemStorageSlotComponent>(ItemStorageSlotComponent);
            for (let j = 0; j < itemStorageSlotComponents.length; j++) {
                if (itemStorageSlotComponents[j].isFree()) {
                    return itemStorageSlotComponents[j];
                }
            }
        }

        return undefined;
    }

    addItemStack(itemStack: ItemStack) {
        let freeItemStorageSlotComponent = this.getFirstFreeItemStorageSlot();
        if (!freeItemStorageSlotComponent) {
            throw AppError.freeItemStorageSlotNotFound();
        }
        freeItemStorageSlotComponent.placeItemStack(itemStack);
    }

    addItem(itemStackPattern: ItemStackPattern) {
        let freeItemStorageSlotComponent = this.getFirstFreeItemStorageSlot();
        if (!freeItemStorageSlotComponent) {
            throw AppError.freeItemStorageSlotNotFound();
        }
        freeItemStorageSlotComponent.placeItemStack(itemStackPattern.build());
    }

    moveFrom(itemStorageComponent: ItemStorageComponent): void {
        let slots = itemStorageComponent.itemStorageSlotComponents;
        for (let i = 0; i < slots.length; i++) {
            if (slots[i].isFree()) {
                continue;
            }

            //todo: Объединение предметов.
            let freeItemStorageSlotComponent = this.getFirstFreeItemStorageSlot();
            if (!freeItemStorageSlotComponent) {
                break;
            }
            freeItemStorageSlotComponent.placeItemStack(slots[i].itemStack);
            slots[i].clear();
        }
    }
}