import _ from 'lodash';
import debug from 'debug';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import Item from '../Entities/Item.js';

export default class EquipController {
    private _equipSlots: [];

    equip(equipSlotID: EquipSlotID, item: Item) {

    }

    view(callback) {
        callback();
    }
}