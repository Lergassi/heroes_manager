import ArmorMaterial from '../Entities/ArmorMaterial.js';
import HeroClass from '../Entities/HeroClass.js';
import ItemCategory from '../Entities/ItemCategory.js';
import HeroRole from '../Entities/HeroRole.js';
import CharacterAttributeEntity from '../Entities/CharacterAttributeEntity.js';
import EntityManager from '../../source/EntityManager.js';

export default class HeroClassLoader {
    load(data: object, entityManager: EntityManager) {
        let heroClass = Object.create(HeroClass.prototype);

        heroClass['_id'] = data['_id'];
        heroClass['_name'] = data['_name'];
        heroClass['_alias'] = data['_alias'];
        heroClass['_description'] = data['_description'];
        heroClass['_sort'] = data['_sort'];
        heroClass['_heroRole'] = entityManager.getRepository<HeroRole>(HeroRole.name).getOneByID(data['_heroRole']['id']);
        heroClass['_availableWeaponItemCategories'] = data['_availableWeaponItemCategories'].map((item) => {
            return entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByID(item['id']);
        });
        heroClass['_availableArmorMaterials'] = data['_availableArmorMaterials'].map((item) => {
            return entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByID(item['id']);
        });
        heroClass['_mainCharacterAttributes'] = data['_mainCharacterAttributes'].map((item) => {
            return entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByID(item['id']);
        });

        return heroClass;
    }
}