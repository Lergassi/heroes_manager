import ItemCategory from '../Entities/ItemCategory.js';
import RepositoryManager from '../../source/RepositoryManager.js';

export default class ItemCategoryLoader {
    load(data: object, repositoryManager: RepositoryManager) {
        let itemCategory = Object.create(ItemCategory.prototype);

        itemCategory['_id'] = <number>data['_id'];
        itemCategory['_name'] = data['_name'];
        itemCategory['_alias'] = data['_alias'];
        itemCategory['_description'] = data['_description'];
        itemCategory['_sort'] = <number>data['_sort'];
        if (data['_parent']) {
            itemCategory['_parent'] = repositoryManager.getRepository<ItemCategory>(ItemCategory.name).getOneByID(data['_parent']['id']);
        } else {
            itemCategory['_parent'] = undefined;
        }

        return itemCategory;
    }
}