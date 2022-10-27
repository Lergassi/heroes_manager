import AppError from '../../source/Errors/AppError.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import GameObject from '../../source/GameObject.js';
import {unsigned} from '../../types/main.js';
import Item from '../Entities/Item.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

/**
 * @deprecated
 */
export default class ItemStorageManager implements ItemStorageInterface {
    private _gameObjectStorage: GameObjectStorage;

    /**
     * @deprecated
     */
    get itemStorages(): GameObject[] {
        return this._gameObjectStorage.findByTag('#item_storage');
    }

    constructor(gameObjectStorage: GameObjectStorage) {
        this._gameObjectStorage = gameObjectStorage;
    }

    /**
     * @deprecated
     */
    getFirstFreeItemStorageSlot() {
    // getFirstFreeItemStorageSlot(itemStorages: GameObject[]) {
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
        // let freeItemStorageSlotComponent = this.getFirstFreeItemStorageSlot(itemStorages);
        if (!freeItemStorageSlotComponent) {
            throw AppError.freeItemStorageSlotNotFound();
        }

        freeItemStorageSlotComponent.placeItemStack(itemStack);
    }

    addItem(item: Item, count: unsigned): unsigned {
        return ItemStorageComponent.addItemToItemStorages(this.itemStorages, item, count);
    }

    createItemStack(options: {
        item: Item,
        count: unsigned,
        itemStackFactory: ItemStackFactory,
    }) {
        let freeItemStorageSlotComponent = this.getFirstFreeItemStorageSlot();
        if (!freeItemStorageSlotComponent) {
            throw AppError.freeItemStorageSlotNotFound();
        }

        freeItemStorageSlotComponent.createItemStack({
            item: options.item,
            count: options.count,
            itemStackFactory: options.itemStackFactory,
        });
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
            slots[i].destroyItemStack();
        }
    }
}