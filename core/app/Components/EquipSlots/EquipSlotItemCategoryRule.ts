import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {database} from '../../../data/ts/database.js';
import {assertNotNil} from '../../../source/assert.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import {ItemCategoryID} from '../../../types/enums/ItemCategoryID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import EquipSlotRuleInterface from '../../Interfaces/EquipSlotRuleInterface.js';
import DebugApp from '../../Services/DebugApp.js';

export default class EquipSlotItemCategoryRule implements EquipSlotRuleInterface {
    private readonly _itemCategoryIDs: ItemCategoryID[];

    constructor(itemCategoryIDs: ItemCategoryID[] = []) {
        this._itemCategoryIDs = itemCategoryIDs;
    }

    canEquip(ID: EquipSlotID, itemID: ItemID): boolean {
        assertNotNil(database.items.data.hasItem(itemID), 'Item не найден.');

        let itemCategoryID = database.items.data.itemCategory(itemID);

        //todo: Будет ошибка если в массиве будут null/undefined и не будет категории.
        if (!_.includes(this._itemCategoryIDs, itemCategoryID)) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Предмет категории "%s" нельзя экипировать в слот "%s".', itemCategoryID, ID));
            return false;
        }

        return true;
    }
}