import ArmorMaterial from '../Entities/ArmorMaterial.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import Item from '../Entities/Item.js';
import ItemCategory from '../Entities/ItemCategory.js';
import Quality from '../Entities/Quality.js';
import RepositoryManager from '../../source/RepositoryManager.js';

export default class ItemLoader {
    load(data: object, repositoryManager: RepositoryManager) {
        let item = Object.create(Item.prototype);

        item['_id'] = <number>data['_id'];
        item['_name'] = data['_name'];
        item['_alias'] = data['_alias'];
        item['_description'] = data['_description'];
        item['_stackSize'] = <number>data['_stackSize'];
        item['_itemLevel'] = <number>data['_itemLevel'];
        item['_sort'] = <number>data['_sort'];
        item['_isEquipable'] = <boolean>data['_isEquipable'];
        item['_itemCategory'] = repositoryManager.getRepository<ItemCategory>(ItemCategory.name).getOneByID(<number>data['_itemCategory']['id']);
        item['_quality'] = repositoryManager.getRepository<Quality>(Quality.name).getOneByID(<number>data['_quality']['id']);
        item['_armorMaterial'] = data['_armorMaterial'] ?
            repositoryManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByID(<number>data['_armorMaterial']['id']) : undefined;

        return item;
    }
}