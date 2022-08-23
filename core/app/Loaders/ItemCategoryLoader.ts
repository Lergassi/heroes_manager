import ItemCategory from '../Entities/ItemCategory.js';
import EntityManager from '../../source/EntityManager.js';

export default class ItemCategoryLoader {
    load(data: object, entityManager: EntityManager) {
        let itemCategory = Object.create(ItemCategory.prototype);

        itemCategory['_id'] = <number>data['_id'];
        itemCategory['_name'] = data['_name'];
        itemCategory['_alias'] = data['_alias'];
        itemCategory['_description'] = data['_description'];
        itemCategory['_sort'] = <number>data['_sort'];
        if (data['_parent']) {
            itemCategory['_parent'] = entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByID(data['_parent']['id']);
        } else {
            itemCategory['_parent'] = undefined;
        }

        return itemCategory;
    }
}