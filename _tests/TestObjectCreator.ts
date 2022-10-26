import EntityManager from '../core/source/EntityManager.js';

export default class TestObjectCreator {
    createRepositoryManager(): EntityManager {
        let entityManager = new EntityManager();
        //Без зависимостей.
        // entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
        //     '100',
        //     'test ArmorMaterial',   //todo: Возможно стоит использовать случайно сгенерированные данные, чтобы не придумывать каждый раз значения.
        //     'test_armor_material',
        //     '',
        //     500,
        // ));
        // entityManager.getRepository<Quality>(Quality.name).add(new Quality(
        //     '101',
        //     'test Quality',
        //     'test_quality',
        //     '',
        //     500,
        // ));
        // // entityManager.getRepository<Quality>(Quality.name).add(new Quality(
        // //     101,
        // //     'test Quality',
        // //     'test_quality',
        // //     '',
        // //     500,
        // // ));
        // entityManager.getRepository<Currency>(Currency.name).add(new Currency(
        //     '102',
        //     'test Currency',
        //     'test_currency',
        //     '',
        //     500,
        // ));
        // entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
        //     '105',
        //     'test HeroRole',
        //     'test_hero_role',
        //     '',
        //     500,
        // ));
        // entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
        //     '106',
        //     'test CharacterAttribute',
        //     'test_character_attribute',
        //     '',
        //     500,
        // ));
        // // //С зависимостями.
        // entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
        //     '103',
        //     'test ItemCategory1',
        //     'test_item_category1',
        //     '',
        //     500,
        //     undefined,
        // ));
        // entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
        //     '104',
        //     'test ItemCategory2',
        //     'test_item_category2',
        //     '',
        //     500,
        //     entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('test_item_category1'),
        // ));
        // entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
        //     '108',
        //     'test Ресурсы',
        //     'test_resources',
        //     '',
        //     500,
        //     undefined,
        // ));
        // entityManager.getRepository<Item>(Item.name).add(new Item(
        //     '107',
        //     'test Дерево',
        //     'test_item_wood',
        //     '',
        //     20,
        //     1,
        //     500,
        //     false,
        //     entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('test_resources'),
        //     entityManager.getRepository<Quality>(Quality.name).getOneByAlias('test_quality'),
        //     entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('test_armor_material'),
        // ));

        return entityManager;
    }
}