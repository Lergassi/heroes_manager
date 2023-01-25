import _ from 'lodash';
import debug from 'debug';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import Item from '../Entities/Item.js';
import GameObject from '../../source/GameObject.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Bag from './Bag.js';
import ItemStorageController from './ItemStorageController.js';

export default class EquipController {
    private readonly _hero: GameObject;

    constructor(hero: GameObject) {
        this._hero = hero;
    }

    equip(ID: EquipSlotID, item: Item): boolean {
        return this._hero.get<EquipSlotInterface>(ID)?.equip(item);
    }

    // equipFrom(equipSlotID: EquipSlotID, itemStorage: ItemStorageInterface, itemStorageSlotID: number): boolean {
    //     // if (this.equip(equipSlotID, ))
    // }

    // moveFromBag(equipSlotID: EquipSlotID, bag: Bag, slotID: number): boolean {
    //     if (this.eq)
    //
    //     return true;
    // }

    clear(ID: EquipSlotID): void {
        this._hero.get<EquipSlotInterface>(ID)?.clear();
    }

    moveTo(ID: EquipSlotID, itemStorage: ItemStorageInterface): boolean {
        if (!this._hero.get<EquipSlotInterface>(ID).moveTo(itemStorage)) {
            return false;
        }

        this.clear(ID);

        return true;
    }

    remove(ID: EquipSlotID, itemStorage: ItemStorageInterface) {
        // if (itemStorage.addItem())
    }
}