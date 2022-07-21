import RepositoryManager from '../../source/RepositoryManager.js';
import EquipSlot from '../Entities/EquipSlot.js';
import EquipSlotRule from '../Entities/EquipSlotRule.js';
import HeroClass from '../Entities/HeroClass.js';
import ItemCategory from '../Entities/ItemCategory.js';

export default class EquipSlotLoader {
    load(data: object, repositoryManager: RepositoryManager) {
        let equipSlot = Object.create(EquipSlot.prototype);

        equipSlot['_id'] = <number>data['_id'];
        equipSlot['_name'] = data['_name'];
        equipSlot['_alias'] = data['_alias'];
        equipSlot['_description'] = data['_description'];
        equipSlot['_sort'] = <number>data['_sort'];
        equipSlot['_rules'] = data['_rules'].map((equipSlotRuleData) => {
            let equipSlotRule = Object.create(EquipSlotRule.prototype);

            equipSlotRule['_heroClass'] = repositoryManager.getRepository(HeroClass.name).getOneByID(equipSlotRuleData['_heroClass']['id']);
            equipSlotRule['_itemCategories'] = equipSlotRuleData['_itemCategories'].map((itemCategoryData) => {
                return repositoryManager.getRepository(ItemCategory.name).getOneByID(itemCategoryData['id']);
            });

            return equipSlotRule;
        });

        return equipSlot;
    }
}