import Serializer from '../../core/source/Serializer.js';
import Container from '../../core/source/Container.js';
import JsonSerializer from '../../core/source/JsonSerializer.js';
import TestObjectCreator from '../TestObjectCreator.js';
import serializedData from '../data/serilalized.js';
import ArmorMaterial from '../../core/app/Entities/ArmorMaterial.js';
import messages from '../../core/app/messages.js';
import Currency from '../../core/app/Entities/Currency.js';
import Quality from '../../core/app/Entities/Quality.js';
import ItemCategory from '../../core/app/Entities/ItemCategory.js';
import MetadataManager from '../../core/source/MetadataManager.js';

// let alias = 'test_armor_material';
let testData = [
    {
        alias: 'test_armor_material',
        module: ArmorMaterial,
    },
    {
        alias: 'test_currency',
        module: Currency,
    },
    {
        alias: 'test_quality',
        module: Quality,
    },
    {
        alias: 'test_item_category1',
        module: ItemCategory,
    },
    // {
    //     alias: 'test_item_category2',
    //     module: ItemCategory,
    // },
];
let serializer = new Serializer(new Container(), new MetadataManager());
let jsonSerializer = new JsonSerializer();
let testObjectCreator = new TestObjectCreator();
let entityManager = testObjectCreator.createRepositoryManager();

for (let i = 0; i < testData.length; i++) {
    let alias = testData[i].alias;
    let data = jsonSerializer.parse(serializedData[alias]);

    // let entity = entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(alias);
    let entity = entityManager.getRepository(testData[i].module.name).getOneByAlias(alias);
    let unserializedEntity = serializer.unserialize(data);

    test(messages['unserializedObjectEqualToExpected'], () => {
        expect(unserializedEntity).toBeInstanceOf(testData[i].module);
        expect(unserializedEntity).toEqual(entity);
    });
}

