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
let testObjectFactory = new TestObjectCreator();
let entityManager = testObjectFactory.createRepositoryManager();

for (let i = 0; i < testData.length; i++) {
    let entity = entityManager.getRepository(testData[i].module.name).getOneByAlias(testData[i].alias);
    let serializedEntity = serializer.serialize(entity);
    let jsonSerializedEntity = jsonSerializer.toJson(serializedEntity);

    test(messages['serializedDataEqualToExpected'], () => {
        expect(jsonSerializedEntity.length).toBeGreaterThan(0);
        expect(jsonSerializedEntity).toBe(serializedData[testData[i].alias]);
    });
}