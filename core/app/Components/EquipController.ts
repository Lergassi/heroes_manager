import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import GameObject from '../../source/GameObject.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export default class EquipController {
    private readonly _hero: GameObject;

    constructor(hero: GameObject) {
        this._hero = hero;
    }

    equip(ID: EquipSlotID, itemID: ItemID): boolean {
        return this._hero.get<EquipSlotInterface>(ID)?.equip(itemID);
    }

    // equipFrom(equipSlotID: EquipSlotID, itemID: ItemID, itemStorage: ItemStorageInterface): boolean {
    //     return this._hero.get<EquipSlotInterface>(equipSlotID)?.equipFrom(itemID, itemStorage);
    // }

    // moveFromBag(equipSlotID: EquipSlotID, bag: Bag, slotID: number): boolean {
    //     if (this.eq)
    //
    //     return true;
    // }

    clear(ID: EquipSlotID): void {
        this._hero.get<EquipSlotInterface>(ID)?.clear();
    }

    removeEquipTo(ID: EquipSlotID, itemStorage: ItemStorageInterface): boolean {
        if (!this._hero.get<EquipSlotInterface>(ID).removeEquipTo(itemStorage)) {
            return false;
        }

        // this.clear(ID);

        return true;
    }
}