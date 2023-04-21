import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {database} from '../../../data/ts/database.js';
import {assertNotNil} from '../../../source/assert.js';
import {ArmorMaterialID} from '../../../types/enums/ArmorMaterialID.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import EquipSlotRuleInterface from '../../Interfaces/EquipSlotRuleInterface.js';
import DebugApp from '../../Services/DebugApp.js';

export default class EquipSlotArmorMaterialRule implements EquipSlotRuleInterface {
    private readonly armorMaterialIDs: ArmorMaterialID[];

    constructor(armorMaterialIDS: ArmorMaterialID[] = []) {
        this.armorMaterialIDs = armorMaterialIDS;
    }

    canEquip(ID: EquipSlotID, itemID: ItemID): boolean {
        assertNotNil(database.items.data.hasItem(itemID), 'Item не найден.');

        let armorMaterialID = database.items.data.armorMaterial(itemID);
        if (_.isNil(armorMaterialID)) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Предмет "%s" не содержит ArmorMaterial.', itemID));
            return false;
        }

        //todo: Будет ошибка если в массиве будут null/undefined и не будет категории.
        if (!_.includes(this.armorMaterialIDs, armorMaterialID)) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Предмет "%s" с материалом "%s" нельзя экипировать в слот "%s".', itemID, armorMaterialID, ID));
            return false;
        }

        return true;
    }
}