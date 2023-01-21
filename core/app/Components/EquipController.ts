import _ from 'lodash';
import debug from 'debug';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import Item from '../Entities/Item.js';
import GameObject from '../../source/GameObject.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export default class EquipController {
    private readonly _hero: GameObject;

    constructor(hero: GameObject) {
        this._hero = hero;
    }

    equip(ID: EquipSlotID, item: Item): boolean {
        return this._hero.get<EquipSlotInterface>(ID)?.equip(item);
    }

    clear(ID: EquipSlotID): boolean {
        return this._hero.get<EquipSlotInterface>(ID)?.clear();
    }

    remove(ID: EquipSlotID, itemStorage: ItemStorageInterface) {
        // if (itemStorage.addItem())
    }
}