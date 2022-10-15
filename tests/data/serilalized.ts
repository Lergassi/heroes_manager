import ArmorMaterial from '../../core/app/Entities/ArmorMaterial.js';
import Quality from '../../core/app/Entities/Quality.js';
import Currency from '../../core/app/Entities/Currency.js';
import JsonSerializer from '../../core/source/JsonSerializer.js';
import ItemCategory from '../../core/app/Entities/ItemCategory.js';
import HeroRole from '../../core/app/Entities/HeroRole.js';
import CharacterAttributeData from '../../core/app/Entities/CharacterAttributeData.js';

let jsonSerializer = new JsonSerializer();

//todo: Здесь должны быть строки. Иначе ошибки еще тестировать и ошибки toJson надо будет.
export default {
    test_armor_material: jsonSerializer.toJson({
        classname: ArmorMaterial.name,
        data: {
            _id: 100,
            _name: 'test ArmorMaterial',
            _alias: 'test_armor_material',
            _description: '',
            _sort: 500,
        },
    }),
    test_quality: jsonSerializer.toJson({
        classname: Quality.name,
        data: {
            _id: 101,
            _name: 'test Quality',
            _alias: 'test_quality',
            _description: '',
            _sort: 500,
        },
    }),
    test_currency: jsonSerializer.toJson({
        classname: Currency.name,
        data: {
            _id: 102,
            _name: 'test Currency',
            _alias: 'test_currency',
            _description: '',
            _sort: 500,
        },
    }),
    test_item_category1: jsonSerializer.toJson({
        classname: ItemCategory.name,
        data: {
            _id: 103,
            _name: 'test ItemCategory1',
            _alias: 'test_item_category1',
            _description: '',
            _sort: 500,
            _parent: null,
        },
    }),
    test_item_category2: jsonSerializer.toJson({
        classname: ItemCategory.name,
        data: {
            _id: 104,
            _name: 'test ItemCategory2',
            _alias: 'test_item_category2',
            _description: '',
            _sort: 500,
            _parent: {
                classname: ItemCategory.name,
                id: 103,
            },
        },
    }),
    test_hero_role: jsonSerializer.toJson({
        classname: HeroRole.name,
        data: {
            _id: 105,
            _name: 'test HeroRole',
            _alias: 'test_hero_role',
            _description: '',
            _sort: 500,
        },
    }),
    test_character_attribute: jsonSerializer.toJson({
        classname: CharacterAttributeData.name,
        data: {
            _id: 106,
            _name: 'test CharacterAttribute',
            _alias: 'test_character_attribute',
            _description: '',
            _sort: 500,
        },
    }),
};