import MetadataManager, {repositoryManagerFinderCallback} from '../core/source/MetadataManager.js';
import TestObjectWithSimpleTypes from '../test/Serialize/TestObjectWithSimpleTypes.js';
import Serializer, {SerializeType} from '../core/source/Serializer.js';
import JsonSerializer from '../core/source/JsonSerializer.js';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';
import TestObjectWithLink from '../test/Serialize/TestObjectWithLink.js';
import TestObjectLink from '../test/Serialize/SupportObjects/TestObjectLink.js';
import TestObjectWithObject from '../test/Serialize/TestObjectWithObject.js';
import TestObjectSample from '../test/Serialize/SupportObjects/TestObjectSample.js';
import ArmorMaterial from '../core/app/Entities/ArmorMaterial.js';
import TestObjectWithCollections from '../test/Serialize/TestObjectWithCollections.js';
import serializer from 'serialize-javascript';
import messages from '../core/app/messages.js';
import TestObjectWithLinkCollections from '../test/Serialize/TestObjectWithLinkCollections.js';
import Container from '../core/source/Container.js';
import EntityManager from '../core/source/EntityManager.js';
import ContainerInterface from '../core/source/ContainerInterface.js';
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import {debugEntityManager, debugHero, debugItemStorage} from '../core/debug/debug_functions.js';
import DefaultContainerConfigure from '../core/app/DefaultContainerConfigure.js';
import fs from 'fs';
import PathResolver from '../server/source/PathResolver.js';
import ServerContainerConfigure from '../server/app/ServerContainerConfigure.js';
import HeroClass from '../core/app/Entities/HeroClass.js';
import ItemStorageFactory from '../core/app/Factories/ItemStorageFactory.js';
import PlayerContainerConfigure from '../core/app/PlayerContainerConfigure.js';
import ItemStorageComponent from '../core/app/Components/ItemStorageComponent.js';
import ItemStackFactory from '../core/app/Factories/ItemStackFactory.js';
import GameObject from '../core/source/GameObject.js';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import PlayerItemStorageFactory from '../core/app/Factories/PlayerItemStorageFactory.js';
import MainItemStorageListComponent from '../core/app/Components/MainItemStorageListComponent.js';
import TechItemStorageFactoryDecorator from '../core/app/Factories/TechItemStorageFactoryDecorator.js';
import GameObjectStorage from '../core/source/GameObjectStorage.js';
import ItemStorageFactoryInterface from '../core/app/Factories/ItemStorageFactoryInterface.js';
import GameObjectFactory from '../core/app/Factories/GameObjectFactory.js';
import MainHeroListComponent from '../core/app/Components/MainHeroListComponent.js';
import EntityManagerFacade from '../core/source/Facades/EntityManagerFacade.js';
import AppError from '../core/source/Errors/AppError.js';
import AutoIncrementIDGenerator from '../core/source/AutoIncrementIDGenerator.js';
import {Simulate} from 'react-dom/test-utils';
import Range from '../core/app/Range.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../core/app/consts.js';
import {ContainerKey} from '../core/types/enums/ContainerKey.js';
import {HeroClassID} from '../core/types/enums/HeroClassID.js';
import {ArmorMaterialID} from '../core/types/enums/ArmorMaterialID.js';
import {ItemID} from '../core/types/enums/ItemID.js';

function createEndPlayerContainer(): ContainerInterface {
    let container = new Container();
    (new DefaultContainerConfigure()).configure(container);
    // (new ServerContainerConfigure()).configure(container);
    (new CoreContainerConfigure()).configure(container);
    (new PlayerContainerConfigure()).configure(container);

    return container;
}

export function symbolGetStarted() {
    let s1 = Symbol('aaa');
    let s2 = Symbol('aaa');
    let s3 = Symbol('bbb');
    console.log(s1);
    console.log(s2);
    console.log(s3);
    console.log(s1 === s1);
    console.log(s1 === s2);
}

export function devSerializer() {
    let metadataManager = new MetadataManager();
    metadataManager.addMetadata({
        module: TestObjectWithSimpleTypes,
        mapping: {
            _boolean: {type: SerializeType.Boolean},
            _number: {type: SerializeType.Number},
            _string: {type: SerializeType.String},
        },
    });
    metadataManager.addMetadata({
        module: TestObjectLink,
        mapping: {
            _id: {type: SerializeType.Number},
            _value: {type: SerializeType.String},
        },
        finderCallback: repositoryManagerFinderCallback,
    });
    metadataManager.addMetadata({
        module: TestObjectWithLink,
        mapping: {
            _link: {type: SerializeType.Link},
        },
    });
    metadataManager.addMetadata({
        module: TestObjectSample,
        mapping: {
            _value: {type: SerializeType.String},
        },
    });
    metadataManager.addMetadata({
        module: TestObjectWithObject,
        mapping: {
            _object: {type: SerializeType.Object},
        },
    });
    metadataManager.addMetadata({
        module: TestObjectWithCollections,
        mapping: {
            _simpleTypeCollection: {type: SerializeType.Collection},
            _objectCollection: {type: SerializeType.Collection},
        },
    });
    metadataManager.addMetadata({
        module: TestObjectWithLinkCollections,
        mapping: {
            _linkCollection: {type: SerializeType.LinkCollection},
        },
    });
    metadataManager.addMetadata({
        module: TestObjectWithEnum,
        mapping: {
            _enumStringObject: {type: SerializeType.String},
            _enumNumberObject: {type: SerializeType.Number},
        },
    });

    let container = new Container();
    container.set<EntityManager>('core.entityManager', (container) => {
        return new EntityManager();
    });

    let serializer = new Serializer(container, metadataManager);
    let jsonSerializer = new JsonSerializer();

    // serializeSimpleTypes(serializer, jsonSerializer);
    // serializeWithLinks(serializer, jsonSerializer);
    // serializeWithObject(serializer, jsonSerializer);
    // serializeWithCollection(serializer, jsonSerializer);
    // serializeWithLinkCollections(container, serializer, jsonSerializer);

    // serializeRealEntities(container, serializer, jsonSerializer);
    // serializeItemCategory(container, serializer, jsonSerializer);
    testSerializeEnum(container, serializer, jsonSerializer);
}

export function testSerializeGameObject() {
    let container = new Container();
    (new DefaultContainerConfigure()).configure(container);
    (new ServerContainerConfigure()).configure(container);
    (new CoreContainerConfigure()).configure(container);
    (new PlayerContainerConfigure()).configure(container);

    let serializer = container.get<Serializer>('core.serializer');
    let jsonSerializer = container.get<JsonSerializer>('core.jsonSerializer');

    testSerializeHero(container, serializer, jsonSerializer);
}

function serializeSimpleTypes(serializer: Serializer, jsonSerializer: JsonSerializer) {
    let expectedJsonTestObjectWithSimpleTypes = '{"classname":"TestObjectWithSimpleTypes","data":{"_boolean":true,"_number":42,"_string":"Hello, World!"}}';
    let testObjectWithSimpleTypes = new TestObjectWithSimpleTypes(true, 42, 'Hello, World!');
    let serializedTestObjectWithSimpleTypes = serializer.serialize(testObjectWithSimpleTypes);
    let jsonTestObjectWithSimpleTypes = jsonSerializer.toJson(serializedTestObjectWithSimpleTypes);
    console.log(jsonTestObjectWithSimpleTypes === expectedJsonTestObjectWithSimpleTypes, sprintf('Итоговые json(строковые) данные для %s верны.', TestObjectWithSimpleTypes.name));

    let objectDataTestObjectWithSimpleTypes = jsonSerializer.parse(expectedJsonTestObjectWithSimpleTypes);
    let unserializedTestObjectWithSimpleTypes = serializer.unserialize(objectDataTestObjectWithSimpleTypes);
    console.log(_.isEqual(unserializedTestObjectWithSimpleTypes, testObjectWithSimpleTypes), sprintf('Восстановленный объект %s идентичный исходному.', TestObjectWithSimpleTypes.name));
}

function serializeWithLinks(serializer: Serializer, jsonSerializer: JsonSerializer) {
    //WithLink
    let testObjectLink = new TestObjectLink(100, 'Дерево');
    let expectedTestObjectLink = '{"classname":"TestObjectLink","data":{"_id":100,"_value":"Дерево"}}';
    let expectedTestObjectWithLink1 = '{"classname":"TestObjectWithLink","data":{"_link":{"classname":"TestObjectLink","id":100}}}';
    let expectedTestObjectWithLink2 = '{"classname":"TestObjectWithLink","data":{"_link":{"classname":"TestObjectLink","id":100}}}';
    let testObjectWithLink1 = new TestObjectWithLink(testObjectLink);
    let testObjectWithLink2 = new TestObjectWithLink(testObjectLink);

    let serializedTestObjectLink = serializer.serialize(testObjectLink);
    let serializedTestObjectWithLink1 = serializer.serialize(testObjectWithLink1);
    let serializedTestObjectWithLink2 = serializer.serialize(testObjectWithLink2);

    let stringDataTestObjectLink = jsonSerializer.toJson(serializedTestObjectLink);
    let stringDataTestObjectWithLink1 = jsonSerializer.toJson(serializedTestObjectWithLink1);
    let stringDataTestObjectWithLink2 = jsonSerializer.toJson(serializedTestObjectWithLink2);

    // console.log(stringDataTestObjectLink === expectedTestObjectLink, sprintf('Итоговые json(строковые) данные для %s верны.', TestObjectLink.name));
    // console.log(stringDataTestObjectWithLink1 === expectedTestObjectWithLink1, sprintf('Итоговые json(строковые) данные для %s верны.', TestObjectWithLink.name));
    // console.log(stringDataTestObjectWithLink2 === expectedTestObjectWithLink2, sprintf('Итоговые json(строковые) данные для %s верны.', TestObjectWithLink.name));

    // let objectDataTestObjectLink = jsonSerializer.parse(expectedTestObjectLink);
    // let unserializedTestObjectLink = serializer.unserialize(objectDataTestObjectLink);
    // console.log(unserializedTestObjectLink);

    let objectDataTestObjectWithWithLink1 = jsonSerializer.parse(expectedTestObjectWithLink1);
    let unserializedTestObjectWithWithLink1 = serializer.unserialize(objectDataTestObjectWithWithLink1);

    let objectDataTestObjectWithWithLink2 = jsonSerializer.parse(expectedTestObjectWithLink2);
    let unserializedTestObjectWithWithLink2 = serializer.unserialize(objectDataTestObjectWithWithLink2);

    //after
    let objectDataTestObjectLink = jsonSerializer.parse(expectedTestObjectLink);
    let unserializedTestObjectLink = serializer.unserialize(objectDataTestObjectLink);

    serializer.finish();

    console.log(
        unserializedTestObjectLink instanceof TestObjectLink &&
        _.isEqual(unserializedTestObjectLink, testObjectLink),
        sprintf('Восстановленный объект %s идентичный исходному.', TestObjectLink.name)
    );
    console.log(
        _.isEqual(unserializedTestObjectWithWithLink1, testObjectWithLink1),
        sprintf('Восстановленный первый объект %s идентичный исходному.', TestObjectWithLink.name)
    );
    console.log(
        _.isEqual(unserializedTestObjectWithWithLink2, testObjectWithLink2),
        sprintf('Восстановленный второй объект %s идентичный исходному.', TestObjectWithLink.name)
    );
    //links
    console.log(
        unserializedTestObjectWithWithLink1['_link'] !== undefined &&
        unserializedTestObjectWithWithLink2['_link'] !== undefined &&
        unserializedTestObjectWithWithLink1['_link'] instanceof TestObjectLink &&
        unserializedTestObjectWithWithLink2['_link'] instanceof TestObjectLink &&
        unserializedTestObjectWithWithLink1['_link'] === unserializedTestObjectLink &&
        unserializedTestObjectWithWithLink2['_link'] === unserializedTestObjectLink &&
        unserializedTestObjectWithWithLink1['_link'] === unserializedTestObjectWithWithLink2['_link']
        , 'TestObjectLink в обоих TestObjectWithLink установлены и ссылаются на один и тот же объект (также восстановлынный).');
}

function serializeWithObject(serializer: Serializer, jsonSerializer: JsonSerializer) {
    let data = {
        value: 'Hello, World!',
    };
    let object = new TestObjectSample(data.value);
    let testObjectWithObject = new TestObjectWithObject(object);
    let expectedTestObjectLink = sprintf('{"classname":"TestObjectWithObject","data":{"_object":{"classname":"TestObjectSample","data":{"_value":"%s"}}}}', data.value);

    let serializedTestObjectWithObject = serializer.serialize(testObjectWithObject);
    let stringDataTestObjectWithObject = jsonSerializer.toJson(serializedTestObjectWithObject);
    console.log(expectedTestObjectLink === stringDataTestObjectWithObject, sprintf('Итоговые json(строковые) данные для %s верны.', TestObjectWithObject.name));

    let unserializedTestObjectWithObject = serializer.unserialize(jsonSerializer.parse(stringDataTestObjectWithObject));
    console.log(
        unserializedTestObjectWithObject !== undefined &&
        unserializedTestObjectWithObject instanceof TestObjectWithObject &&
        _.isEqual(unserializedTestObjectWithObject, testObjectWithObject)
        , sprintf('Восстановленный объект %s идентичен исходному.', TestObjectWithObject.name));
    console.log(
        unserializedTestObjectWithObject['_object'] !== undefined &&
        unserializedTestObjectWithObject['_object'] instanceof TestObjectSample &&
        _.isEqual(unserializedTestObjectWithObject['_object'], object)
        , sprintf('Объект типа Object в восстановленном объекте идентичен исходному.', TestObjectWithObject.name));
}

function serializeWithCollection(serializer: Serializer, jsonSerializer: JsonSerializer) {
    // let simpleTypesCollection = [0, 1, 2, 3];
    // let simpleTypesCollection = [0, 1, 2, 3, 'a', 'b', 'c', true, false, true, undefined, null];
    let simpleTypesCollection = [0, 1, 2, 3, '', 'a', 'b', 'c', true, false, null];
    // let simpleTypesCollection = [0, 1, 2, 3, 'a', 'b', 'c', true, false, true, undefined];
    // let simpleTypesCollection = [0, 1, 2, 3, 'a', 'b', 'c', true, false, true, undefined, null, {a: 42}];
    // let simpleTypesCollection = [0, 1, 2, 3, 'a', 'b', 'c', true, false, true, undefined, null];
    let objectsCollection = [new TestObjectSample('a'), new TestObjectSample('b'), new TestObjectSample('c')];
    let testObjectWithCollections = new TestObjectWithCollections(simpleTypesCollection, objectsCollection);
    console.log(testObjectWithCollections);

    let expectedTestObjectWithCollection = '{"classname":"TestObjectWithCollections","data":{"_simpleTypeCollection":[0,1,2,3,"","a","b","c",true,false,null],"_objectCollection":[{"classname":"TestObjectSample","data":{"_value":"a"}},{"classname":"TestObjectSample","data":{"_value":"b"}},{"classname":"TestObjectSample","data":{"_value":"c"}}]}}';

    let serializedObject = serializer.serialize(testObjectWithCollections);
    let stringDataSerializedObject = jsonSerializer.toJson(serializedObject);
    console.log(
        stringDataSerializedObject.length > 0 &&
        stringDataSerializedObject.length === expectedTestObjectWithCollection.length &&
        stringDataSerializedObject === expectedTestObjectWithCollection
    );

    let dataTestObjectWithCollection = jsonSerializer.parse(stringDataSerializedObject);
    let unserializedTestObjectWithCollections = serializer.unserialize(dataTestObjectWithCollection);
    console.log(
        unserializedTestObjectWithCollections instanceof TestObjectWithCollections &&
        _.isEqual(unserializedTestObjectWithCollections, testObjectWithCollections)
        , sprintf(messages.unserializeSuccess, TestObjectWithCollections.name));
}

export function testLinker() {
    let links = {
        // '100': {
        //     value: 'This is link.'
        // },
    };
    let o = {
        value: 10,
        link: 'link_response',
        // link: (object, property) => {
        //     console.log('object', object);
        //     console.log('property', property);
        // },
        // link: link,
    };
    // console.log(link);
    // console.log(o);
    // setLink(o, 'new value');
    let setLink = (object, property, link) => {
        // console.log('object', object);
        // console.log('property', property);
        // console.log('links', links);
        return {
            object: object,
            property: property,
            link: link,
        };
    };
    let callback = [];
    callback.push({
        object: o,
        property: 'link',
        link: {id: '100'},
    });
    // o['link'](o, 'link');
    console.log('o', o);
    console.log(callback);

    links['100'] = {
        value: 'This is link.',
    };
    // console.log(o);
    for (let i = 0; i < callback.length; i++) {
        callback[i].object[callback[i]['property']] = links[callback[i]['link']['id']];
    }
    console.log('o', o);
}

function setLink(a, b) {
    console.log(a);
    console.log(b);
    a.link = b;
}

interface TestModuleTarget {
    target: {
        name: string;
        prototype: object;
    };
}

export function testMetadata() {
    let metadata: TestModuleTarget = {
        target: ArmorMaterial,
    };
    ArmorMaterial.prototype;
    // console.log(metadata);
    console.log(metadata.target);
    console.log(metadata.target.name);
    console.log(metadata.target.prototype);

    let armorMaterial = Object.create(metadata.target.prototype);
    console.log(armorMaterial);
    console.log(armorMaterial instanceof ArmorMaterial);
    // console.log(armorMaterial.test());
}

export function javascriptSerializerGetStarted() {
    let o = {a: 42, b: undefined};

    let string = serializer(o);

    let armorMaterial = new ArmorMaterial(
        '42',
        'Armor Material',
        undefined,
        500,
    );
    // console.log(serializer(armorMaterial));
    let hero1 = {
        armorMaterial: armorMaterial,
    };
    let hero2 = {
        armorMaterial: armorMaterial,
    };

    // console.log(string);
    // console.log(serializer({
    //     str  : 'string',
    //     num  : 0,
    //     obj  : {foo: 'foo'},
    //     arr  : [1, 2, 3],
    //     bool : true,
    //     nil  : null,
    //     undef: undefined,
    //     inf  : Infinity,
    //     date : new Date("Thu, 28 Apr 2016 22:02:17 GMT"),
    //     map  : new Map([['hello', 'world']]),
    //     set  : new Set([123, 456]),
    //     fn   : function echo(arg) { return arg; },
    //     re   : /([^\s]+)/g,
    //     big  : BigInt(10),
    // }));
    // console.log(serializer(hero1));
    // console.log(serializer(hero2));

    // let armorMaterialString = '{"_id":42,"_name":"Armor Material","_alias":"armor_material","_description":null,"_sort":500}';
    // let armorMaterialString = '{"_id":42,"_name":"Armor Material","_alias":"armor_material","_description":null,"_sort":500}';
    // console.log(deserialize(armorMaterialString));
    // console.log(JSON.parse(armorMaterialString));
    console.log(typeof undefined);
    console.log(typeof null);
    // let a = 42;
    // let a = undefined;
    let a = null;
    if (a) {
        console.log('this is a');
    }
}

function deserialize(serializedJavascript){
    return eval('(' + serializedJavascript + ')');
}

export function devJsonSerializer() {
    let jsonSerializer = new JsonSerializer();
    let object = {
        numberVariable: 42,
        stringVariable: 'Hello, World!',
        undefinedVariable: undefined,
    };

    // console.log(jsonSerializer.toJson(object));

    // let objectString = '{"numberVariable":42,"stringVariable":"Hello, World!","undefinedVariable":null}';
    // console.log(jsonSerializer.parse(objectString));

    // let a = undefined;
    // console.log(!(!a));
    // console.log(isFreeTest());
}

function isFreeTest() {
    // let a = undefined;
    // let a = 42;
    // let a = 0;
    // let a = '';
    let a = {};
    // let a = 1;

    return Boolean(a);
}

function serializeWithLinkCollections(container: ContainerInterface, serializer: Serializer, jsonSerializer: JsonSerializer) {
    let linkCollection = [
        new TestObjectLink(100, 'a'),
        new TestObjectLink(101, 'b'),
        new TestObjectLink(102, 'c'),
    ];

    container.get<EntityManager>('core.entityManager').getRepository(TestObjectLink.name).add(linkCollection[0]);
    container.get<EntityManager>('core.entityManager').getRepository(TestObjectLink.name).add(linkCollection[1]);
    container.get<EntityManager>('core.entityManager').getRepository(TestObjectLink.name).add(linkCollection[2]);
    // console.log(container.get<RepositoryManager>('core.entityManager'));

    let testObjectWithLinkCollections = new TestObjectWithLinkCollections(linkCollection);
    let expectedTestObjectWithLLinkCollections = '{"classname":"TestObjectWithLinkCollections","data":{"_linkCollection":[]}';

    let serializedTestObjectWithLinkCollections = serializer.serialize(testObjectWithLinkCollections);
    let stringDataTestObjectWithLinkCollections = jsonSerializer.toJson(serializedTestObjectWithLinkCollections);

    let unserializeTestObjectWithLinkCollections = serializer.unserialize(jsonSerializer.parse(stringDataTestObjectWithLinkCollections));
    console.log(unserializeTestObjectWithLinkCollections);
    serializer.finish();
}

function serializeRealEntities(container: ContainerInterface, serializer: Serializer, jsonSerializer: JsonSerializer) {
    (new DefaultContainerConfigure()).configure(container);
    (new ServerContainerConfigure()).configure(container);
    (new CoreContainerConfigure()).configure(container);
    // debugContainer(container);
    // debugRepositoryManager(container.get('core.entityManager'));
    // console.log(container.get('core.entityManager')['_repositories']);

    let coreSerializer = container.get<Serializer>('core.serializer');
    let coreJsonSerializer = container.get<JsonSerializer>('core.jsonSerializer');

    let dataPath = container.get<PathResolver>('server.pathResolver').resolve('core/data/entities.json');
    let stringData = fs.readFileSync(dataPath).toString();
    let objectData = coreJsonSerializer.parse(stringData);

    let data = objectData['_data'];
    let entityManager = container.get<EntityManager>('core.entityManager');
    // let entities = [];
    for (let i = 0; i < data.length; i++) {
        entityManager.getRepository(data[i]['classname']).add(coreSerializer.unserialize(data[i]));
    }
    coreSerializer.finish();
    debugEntityManager(entityManager);
    // debugItem(entityManager.getRepository<Item>(Item.name).getOneByAlias(ItemID.Wood));
    // debugItem(entityManager.getRepository<Item>(Item.name).getOneByAlias(ItemID.IronOre));
    // debugItem(entityManager.getRepository<Item>(Item.name).getOneByAlias(ItemID.OneHandedSword_01));
    // debugItem(entityManager.getRepository<Item>(Item.name).getOneByAlias(ItemID.PlateBreastplate_01));
}

function serializeItemCategory(container: ContainerInterface, serializer: Serializer, jsonSerializer: JsonSerializer) {
    // let weapon = new ItemCategory(
    //     100,
    //     'Оружие',
    //     'weapon',
    //     '',
    //     500,
    //     null,
    // );
    // let swords = new ItemCategory(
    //     '101',
    //     'Мечи',
    //     'swords',
    //     '',
    //     500,
    //     weapon,
    // );
    //
    // let itemCategories = [
    //     weapon,
    //     swords,
    // ];
    //
    // let serializedData = [];
    // for (let i = 0; i < itemCategories.length; i++) {
    //     serializedData.push(serializer.serialize(itemCategories[i]));
    // }
    // console.dir(serializedData,  {depth: 10});

    // let stringData = coreJsonSerializer.toJson(serializedData);
    // console.log(stringData);

    let expected = '[{"classname":"ItemCategory","data":{"_id":100,"_name":"Оружие","_alias":"weapon","_description":"","_sort":500,"_parent":null}},{"classname":"ItemCategory","data":{"_id":101,"_name":"Мечи","_alias":"swords","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":100}}}]';

    let unserializedObjectData = jsonSerializer.parse(expected);
    let unserializedItemCategories = [];
    for (let i = 0; i < unserializedObjectData.length; i++) {
        unserializedItemCategories.push(serializer.unserialize(unserializedObjectData[i]));
    }
    console.log(unserializedItemCategories);
    serializer.finish();
    console.log(unserializedItemCategories);
    console.log(unserializedItemCategories[1]['_parent'] === unserializedItemCategories[0]);
}

export function testSerializeEntityManager() {
    let container = new Container();
    (new DefaultContainerConfigure()).configure(container);
    (new ServerContainerConfigure()).configure(container);
    (new CoreContainerConfigure()).configure(container);

    let coreSerializer = container.get<Serializer>('core.serializer');
    let coreJsonSerializer = container.get<JsonSerializer>('core.jsonSerializer');

    // let entityManager = (new EntityManagerCreator()).create();
    // debugEntityManager(entityManager);

    // let data = [];
    // for (const repositoryName in entityManager['_repositories']) {
    //     for (let i = 0; i < entityManager['_repositories'][repositoryName]['_items'].length; i++) {
    //         data.push(coreSerializer.serialize(entityManager['_repositories'][repositoryName]['_items'][i]));
    //     }
    // }
    // console.log(coreJsonSerializer.toJson(data));

    let stringData = '[{"classname":"ArmorMaterial","data":{"_id":"a86d1e86-1768-47c0-a630-2eb8c49ef029","_name":"Латы","_alias":"plate","_description":"","_sort":500}},{"classname":"ArmorMaterial","data":{"_id":"7e9daae3-eb9d-41c6-8589-d5830edc10d0","_name":"Кожа","_alias":"leather","_description":"","_sort":510}},{"classname":"ArmorMaterial","data":{"_id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0","_name":"Ткань","_alias":"cloth","_description":"","_sort":520}},{"classname":"CharacterAttribute","data":{"_id":"0380bfd3-1885-4788-bb11-0216e6d216b5","_name":"Сила","_alias":"strength","_description":"Увеличивает силу атаки у классов с главной характеристикой \\"Сила\\".","_sort":500}},{"classname":"CharacterAttribute","data":{"_id":"61134aa3-fa19-45a6-a740-b1013abd7bed","_name":"Ловкость","_alias":"agility","_description":"Увеличивает силу атаки у классов с главной характеристикой \\"Ловкость\\".","_sort":510}},{"classname":"CharacterAttribute","data":{"_id":"8bd442cf-c3e0-4ecd-8276-9a9df012320c","_name":"Интеллект","_alias":"intelligence","_description":"Увеличивает силу атаки и кол-во очков магии у классов с главной характеристикой \\"Интеллект\\".","_sort":520}},{"classname":"CharacterAttribute","data":{"_id":"62f04c4e-fae1-4acb-baad-ef196964368d","_name":"Скорость атаки","_alias":"attack_speed","_description":"","_sort":530}},{"classname":"CharacterAttribute","data":{"_id":"578f79f9-87df-4218-b5ae-f70572c3794f","_name":"Критический удар","_alias":"critical_strike","_description":"","_sort":540}},{"classname":"CharacterAttribute","data":{"_id":"226cccb3-8738-473d-9488-15c550203c4b","_name":"Выносливость","_alias":"stamina","_description":"","_sort":550}},{"classname":"CharacterAttribute","data":{"_id":"03b8d14f-dbc6-47f5-90a6-8d005b837e57","_name":"Удача","_alias":"luck","_description":"Влияет на многие характеристики.","_sort":560}},{"classname":"Currency","data":{"_id":"998495f3-567b-4dc8-af87-70916e96f50a","_name":"Золото","_alias":"gold","_description":"","_sort":500}},{"classname":"Currency","data":{"_id":"3a4b5a8a-68e3-4f4c-86b0-5dbd6b161f3c","_name":"Очки исследования","_alias":"research_points","_description":"","_sort":510}},{"classname":"Quality","data":{"_id":"363b5284-5638-417b-b53c-edd2d90d5a42","_name":"Poor","_alias":"poor","_description":"Серые вещи. Мусор для продажи.","_sort":500}},{"classname":"Quality","data":{"_id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc","_name":"Common","_alias":"common","_description":"Белые вещи.","_sort":510}},{"classname":"Quality","data":{"_id":"2b7bd30d-7c02-4275-8685-0ad6025a7c48","_name":"Uncommon","_alias":"uncommon","_description":"Зеленые вещи.","_sort":520}},{"classname":"Quality","data":{"_id":"f020a3ba-0e4c-45ce-b05b-efdc56283305","_name":"Rare","_alias":"rare","_description":"Синие вещи.","_sort":530}},{"classname":"Quality","data":{"_id":"e442f182-328f-4126-b9ab-d3ca902c3edf","_name":"Epic","_alias":"epic","_description":"Фиолетовые вещи.","_sort":540}},{"classname":"Quality","data":{"_id":"0c969893-94e9-4851-b890-c39f5a1979ae","_name":"Legendary","_alias":"legendary","_description":"Оранжевые вещи.","_sort":550}},{"classname":"HeroRole","data":{"_id":"8317f2cf-5ec0-4ec8-81e3-9ae0c308c7c8","_name":"Танк","_alias":"tank","_description":"","_sort":500}},{"classname":"HeroRole","data":{"_id":"189a0a98-c90a-4deb-a933-2fa76bd147d3","_name":"Поддержка","_alias":"support","_description":"","_sort":510}},{"classname":"HeroRole","data":{"_id":"b0a0b54b-4c1e-4fe3-b43d-addad24b664e","_name":"Боец","_alias":"damage_dealer","_description":"","_sort":520}},{"classname":"ItemCategory","data":{"_id":"611abe4d-86fc-4107-baab-54a95e1ae2fd","_name":"Оружие","_alias":"weapons","_description":"","_sort":500,"_parent":null}},{"classname":"ItemCategory","data":{"_id":"e8326c4b-8762-450c-9128-e868ade59db1","_name":"Одноручные мечи","_alias":"one_handed_swords","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"874d2f2c-96e6-4d4b-aa79-abaa2cd7d8a6","_name":"Двуручные мечи","_alias":"two_handed_swords","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"a217e997-83b8-4ac5-8bf1-271c46b947db","_name":"Одноручные топоры","_alias":"one_handed_axes","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"a697e1d7-dd76-4056-8053-06ad8ae6ad40","_name":"Двуручные топоры","_alias":"two_handed_axes","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"02434bf5-a2cf-47d6-b388-0e4a10745656","_name":"Посохи","_alias":"staffs","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e","_name":"Жезлы","_alias":"wands","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"1916d139-3891-4e97-b0f8-a3670061f861","_name":"Кинжалы","_alias":"daggers","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"cea704a3-4cf8-4182-af74-69dc336fbd44","_name":"Луки","_alias":"bows","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"9bfbae69-b95a-4d5d-8df9-ccf2aa27a840","_name":"Арбалеты","_alias":"crossbows","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"bd2fabdf-72a8-4302-b20c-2c0696c6831b","_name":"Револьверы","_alias":"revolvers","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"}}},{"classname":"ItemCategory","data":{"_id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8","_name":"Броня","_alias":"armor","_description":"","_sort":500,"_parent":null}},{"classname":"ItemCategory","data":{"_id":"de977f36-a225-405d-a6bf-664b31fbe67f","_name":"Шлемы","_alias":"helmets","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"de977f36-a225-405d-a6bf-664b31fbe67f","_name":"Нагрудники","_alias":"breastplates","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"d66b65e1-cebd-40b8-9d42-c1518bf4387d","_name":"Сапоги","_alias":"boots","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"c5a44fa9-6028-4ab0-8ac3-dcb69973ea03","_name":"Перчатки","_alias":"gloves","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"98d13cf4-8241-4129-bb6c-3a1ffaa3c90f","_name":"Штаны","_alias":"pants","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"eb003637-a6d5-4192-b7e4-136da550e734","_name":"Наплечники","_alias":"shoulders","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"d4e1aef8-4300-4567-b24b-a269512a82cf","_name":"Поясы","_alias":"belts","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"7b67f17e-0f12-463e-b18b-22a4fe470ce0","_name":"Браслеты","_alias":"bracers","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"0765d7ba-600e-41cf-863e-176acfa19ae5","_name":"Амулеты","_alias":"amulets","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"01a33c6d-339c-4a82-91c7-2b9442e057a4","_name":"Кольца","_alias":"rings","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"3e86e1de-c59d-4aed-a968-ab864410e132","_name":"Аксессуары","_alias":"trinkets","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"6fbb8dcb-f86f-495f-82cb-9cfeecd85c00","_name":"Щиты","_alias":"shields","_description":"","_sort":500,"_parent":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"}}},{"classname":"ItemCategory","data":{"_id":"4df46a18-2d85-40d1-bdc8-6dbda6d12574","_name":"Ресурсы","_alias":"resources","_description":"","_sort":500,"_parent":null}},{"classname":"ItemCategory","data":{"_id":"acd5d4fc-31cf-4ffe-a69a-026b51613818","_name":"Материалы","_alias":"materials","_description":"","_sort":500,"_parent":null}},{"classname":"Item","data":{"_id":"09954f0a-3291-4569-b288-02d073bc826f","_name":"Древесина","_alias":"wood","_description":"","_stackSize":20,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"4df46a18-2d85-40d1-bdc8-6dbda6d12574"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"d2423253-3eff-4715-b2a8-228f78cd1968","_name":"Железная руда","_alias":"ore","_description":"","_stackSize":20,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"4df46a18-2d85-40d1-bdc8-6dbda6d12574"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"83eea98a-21f9-48ed-b2a9-88b2638ac03b","_name":"Железный слиток","_alias":"iron_bar","_description":"","_stackSize":20,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"4df46a18-2d85-40d1-bdc8-6dbda6d12574"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"a5492c54-9a4d-42b7-8ec3-a8ccaa787854","_name":"Одноручный меч (01)","_alias":"one_handed_sword_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"7e294428-7448-43d0-aff0-23f86511fdf2","_name":"Двуурчный меч (01)","_alias":"two_handed_sword_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"f01594a0-efdc-418d-98e9-fe4128a5bc63","_name":"Кинжал (01)","_alias":"dagger_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"1efc1c84-bc42-49c6-ba6a-87615a5308ea","_name":"Одноручный топор (01)","_alias":"one_handed_axe_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"2c6e3f0f-0f64-45d3-a9d5-68775b938d36","_name":"Двуручный топор (01)","_alias":"two_handed_axe_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"5d67d7e2-76f5-435c-a0e0-e76cc5c23564","_name":"Посох (01)","_alias":"staff_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"6dead4cd-91cd-4f48-b103-0a7e7f652b3c","_name":"Жезл (01)","_alias":"wand_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"7a00f9f6-d6a7-471c-b95f-a48533cfdeb8","_name":"Револьвер (01)","_alias":"revolver_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"611abe4d-86fc-4107-baab-54a95e1ae2fd"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"b0ccfb06-588e-4ea8-bac4-25d57f18cc29","_name":"Кольцо (01)","_alias":"ring_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"fe4042e6-43fd-468f-9e64-9c661cec4cb9","_name":"Амулет (01)","_alias":"amulet_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"9d2775b7-7700-4ab6-9b4c-2cd03d7b98fc","_name":"Тринкет (01)","_alias":"trinket_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"f2d58c88-a439-46b7-a4ef-e849963356b9","_name":"Щит (01)","_alias":"shield_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":null}},{"classname":"Item","data":{"_id":"51a2a98c-584b-47ca-a2aa-fe4d32b323df","_name":"Латный шлем (01)","_alias":"plate_helmet_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"d54c9ab6-faac-4ef9-a2f1-407e71304a24","_name":"Латные наплечники (01)","_alias":"plate_shoulders_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"b18f9675-20f1-49b0-939a-f9d5ec4a199d","_name":"Латный нагрудник (01)","_alias":"plate_breastplate_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"30630466-c3b2-4a0e-a347-93b919dd3102","_name":"Латный браслет (01)","_alias":"plate_bracer_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"0de0097c-9d4a-4094-b800-d37196ac3207","_name":"Латные перчатки (01)","_alias":"plate_gloves_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"f65240d0-5c4f-47b7-ae18-91d2714cd715","_name":"Латный пояс (01)","_alias":"plate_belt_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"6547cc56-741c-4a17-ba44-6368298c6dd2","_name":"Латный штаны (01)","_alias":"plate_pants_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"604677b5-e285-4c04-9ee3-537746621f5a","_name":"Латный сапоги (01)","_alias":"plate_boots_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"4de1e1bc-5842-4e78-a956-6b43735293c3","_name":"Кожаный шлем (01)","_alias":"leather_helmet_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"f30905f4-e924-4ad2-bbaf-5099a99eaf10","_name":"Кожаные наплечники (01)","_alias":"leather_shoulders_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"ada53cb7-244c-4a31-9649-c558bbd7800b","_name":"Кожаный нагрудник (01)","_alias":"leather_breastplate_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"4dc33853-057f-441d-95ac-94aad1211c61","_name":"Кожаный браслет (01)","_alias":"leather_bracer_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"07ec4b03-30d9-482a-8f97-4a3f016cce0c","_name":"Кожаные перчатки (01)","_alias":"leather_gloves_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"0e7a301c-918d-4565-9de1-cb2edab327aa","_name":"Кожаный пояс (01)","_alias":"leather_belt_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"9eb09be0-7c1d-4fba-bb11-b6745449978c","_name":"Кожаный штаны (01)","_alias":"leather_pants_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"e1d91749-5c45-47b4-bb31-9053e33a576d","_name":"Кожаный сапоги (01)","_alias":"leather_boots_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"f4bac01f-0d07-4948-b235-631f7e63d83e","_name":"Тканевый шлем (01)","_alias":"cloth_helmet_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"a92dfe24-68c9-44a9-ad5c-45a392e60850","_name":"Тканевые наплечники (01)","_alias":"cloth_shoulders_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"6b7a9104-6f81-4f24-8403-a6d9577011a6","_name":"Тканевый нагрудник (01)","_alias":"cloth_breastplate_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"d5e4b73a-68bd-4ddf-954f-e70d4e367d2b","_name":"Тканевый браслет (01)","_alias":"cloth_bracer_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"f9aaca7a-4acd-448e-a0d1-ea1a1c916d9f","_name":"Тканевые перчатки (01)","_alias":"cloth_gloves_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"61847221-ee77-4e81-809c-3d980aecdfd9","_name":"Тканевый пояс (01)","_alias":"cloth_belt_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"fa9dc8a9-c74b-4c55-9a2b-4d5c1e045f29","_name":"Тканевый штаны (01)","_alias":"cloth_pants_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"Item","data":{"_id":"c4ea5041-7709-402a-8bbd-f43e82735902","_name":"Тканевый сапоги (01)","_alias":"cloth_boots_01","_description":"","_stackSize":1,"_itemLevel":1,"_sort":500,"_isEquipable":false,"_itemCategory":{"classname":"ItemCategory","id":"640236fb-3b22-4c0e-b74a-4edf3e62d6a8"},"_quality":{"classname":"Quality","id":"ddc2fb35-2593-4f5d-948d-61d53573b1cc"},"_armorMaterial":{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}}},{"classname":"HeroClass","data":{"_id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b","_name":"Воин","_alias":"warrior","_description":"","_sort":500,"_heroRole":{"classname":"HeroRole","id":"8317f2cf-5ec0-4ec8-81e3-9ae0c308c7c8"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"e8326c4b-8762-450c-9128-e868ade59db1"},{"classname":"ItemCategory","id":"a217e997-83b8-4ac5-8bf1-271c46b947db"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"a86d1e86-1768-47c0-a630-2eb8c49ef029"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"0380bfd3-1885-4788-bb11-0216e6d216b5"}]}},{"classname":"HeroClass","data":{"_id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe","_name":"Паладин","_alias":"paladin","_description":"","_sort":510,"_heroRole":{"classname":"HeroRole","id":"8317f2cf-5ec0-4ec8-81e3-9ae0c308c7c8"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"e8326c4b-8762-450c-9128-e868ade59db1"},{"classname":"ItemCategory","id":"a217e997-83b8-4ac5-8bf1-271c46b947db"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"a86d1e86-1768-47c0-a630-2eb8c49ef029"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"0380bfd3-1885-4788-bb11-0216e6d216b5"}]}},{"classname":"HeroClass","data":{"_id":"c7890a07-7bf4-41e7-97fd-3be54426d132","_name":"Разбойник","_alias":"rogue","_description":"","_sort":520,"_heroRole":{"classname":"HeroRole","id":"b0a0b54b-4c1e-4fe3-b43d-addad24b664e"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"1916d139-3891-4e97-b0f8-a3670061f861"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"7e9daae3-eb9d-41c6-8589-d5830edc10d0"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"61134aa3-fa19-45a6-a740-b1013abd7bed"}]}},{"classname":"HeroClass","data":{"_id":"567eb990-4e02-4d6b-b95c-16d191acce9b","_name":"Гладиатор","_alias":"gladiator","_description":"","_sort":530,"_heroRole":{"classname":"HeroRole","id":"b0a0b54b-4c1e-4fe3-b43d-addad24b664e"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"e8326c4b-8762-450c-9128-e868ade59db1"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"a86d1e86-1768-47c0-a630-2eb8c49ef029"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"0380bfd3-1885-4788-bb11-0216e6d216b5"}]}},{"classname":"HeroClass","data":{"_id":"ff162123-f440-46dc-a6ed-459efd9b8a8d","_name":"Лучник","_alias":"archer","_description":"","_sort":540,"_heroRole":{"classname":"HeroRole","id":"b0a0b54b-4c1e-4fe3-b43d-addad24b664e"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"cea704a3-4cf8-4182-af74-69dc336fbd44"},{"classname":"ItemCategory","id":"9bfbae69-b95a-4d5d-8df9-ccf2aa27a840"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"7e9daae3-eb9d-41c6-8589-d5830edc10d0"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"61134aa3-fa19-45a6-a740-b1013abd7bed"}]}},{"classname":"HeroClass","data":{"_id":"216fae48-8fed-4eb1-ba05-8c19c941435e","_name":"Стрелок","_alias":"gunslinger","_description":"","_sort":550,"_heroRole":{"classname":"HeroRole","id":"b0a0b54b-4c1e-4fe3-b43d-addad24b664e"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"bd2fabdf-72a8-4302-b20c-2c0696c6831b"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"7e9daae3-eb9d-41c6-8589-d5830edc10d0"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"61134aa3-fa19-45a6-a740-b1013abd7bed"},{"classname":"CharacterAttribute","id":"8bd442cf-c3e0-4ecd-8276-9a9df012320c"}]}},{"classname":"HeroClass","data":{"_id":"231f3a84-c7c1-4876-8a43-84d838e93e1a","_name":"Маг","_alias":"mage","_description":"","_sort":560,"_heroRole":{"classname":"HeroRole","id":"b0a0b54b-4c1e-4fe3-b43d-addad24b664e"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"02434bf5-a2cf-47d6-b388-0e4a10745656"},{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"8bd442cf-c3e0-4ecd-8276-9a9df012320c"}]}},{"classname":"HeroClass","data":{"_id":"92200122-b76b-4264-8082-f39af9f21d01","_name":"Чернокнижник","_alias":"warlock","_description":"","_sort":570,"_heroRole":{"classname":"HeroRole","id":"b0a0b54b-4c1e-4fe3-b43d-addad24b664e"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"02434bf5-a2cf-47d6-b388-0e4a10745656"},{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"8bd442cf-c3e0-4ecd-8276-9a9df012320c"}]}},{"classname":"HeroClass","data":{"_id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd","_name":"Священик","_alias":"priest","_description":"","_sort":560,"_heroRole":{"classname":"HeroRole","id":"189a0a98-c90a-4deb-a933-2fa76bd147d3"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"02434bf5-a2cf-47d6-b388-0e4a10745656"},{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"8bd442cf-c3e0-4ecd-8276-9a9df012320c"}]}},{"classname":"HeroClass","data":{"_id":"bd3fdce4-3820-4621-b519-59ab1398b4eb","_name":"Друид","_alias":"druid","_description":"","_sort":560,"_heroRole":{"classname":"HeroRole","id":"189a0a98-c90a-4deb-a933-2fa76bd147d3"},"_availableWeaponItemCategories":[{"classname":"ItemCategory","id":"02434bf5-a2cf-47d6-b388-0e4a10745656"},{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}],"_availableArmorMaterials":[{"classname":"ArmorMaterial","id":"e13f90ff-eabe-4966-bec8-b805d2c1b4b0"}],"_mainCharacterAttributes":[{"classname":"CharacterAttribute","id":"8bd442cf-c3e0-4ecd-8276-9a9df012320c"}]}},{"classname":"EquipSlot","data":{"_id":"4223fda7-b0b3-4cda-8cbf-073246cb9df6","_name":"Голова","_alias":"head","_description":"","_sort":500,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}}]}},{"classname":"EquipSlot","data":{"_id":"6be05e16-d9f4-470d-9c99-505e9d6a1a6a","_name":"Плечи","_alias":"shoulders","_description":"","_sort":510,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"eb003637-a6d5-4192-b7e4-136da550e734"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"eb003637-a6d5-4192-b7e4-136da550e734"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"eb003637-a6d5-4192-b7e4-136da550e734"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"eb003637-a6d5-4192-b7e4-136da550e734"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"eb003637-a6d5-4192-b7e4-136da550e734"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"eb003637-a6d5-4192-b7e4-136da550e734"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"eb003637-a6d5-4192-b7e4-136da550e734"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"eb003637-a6d5-4192-b7e4-136da550e734"}]}}]}},{"classname":"EquipSlot","data":{"_id":"8b7a7277-6011-462a-a258-7d774ed51d1e","_name":"Грудь","_alias":"chest","_description":"","_sort":520,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"de977f36-a225-405d-a6bf-664b31fbe67f"}]}}]}},{"classname":"EquipSlot","data":{"_id":"df67d5be-c5af-45ad-8467-821ea6c0429f","_name":"Запястье","_alias":"wrist","_description":"","_sort":530,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"7b67f17e-0f12-463e-b18b-22a4fe470ce0"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"7b67f17e-0f12-463e-b18b-22a4fe470ce0"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"7b67f17e-0f12-463e-b18b-22a4fe470ce0"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"7b67f17e-0f12-463e-b18b-22a4fe470ce0"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"7b67f17e-0f12-463e-b18b-22a4fe470ce0"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"7b67f17e-0f12-463e-b18b-22a4fe470ce0"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"7b67f17e-0f12-463e-b18b-22a4fe470ce0"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"7b67f17e-0f12-463e-b18b-22a4fe470ce0"}]}}]}},{"classname":"EquipSlot","data":{"_id":"926bb2e2-640d-4f25-89ff-167457ac6d83","_name":"Руки","_alias":"hands","_description":"","_sort":540,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"c5a44fa9-6028-4ab0-8ac3-dcb69973ea03"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"c5a44fa9-6028-4ab0-8ac3-dcb69973ea03"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"c5a44fa9-6028-4ab0-8ac3-dcb69973ea03"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"c5a44fa9-6028-4ab0-8ac3-dcb69973ea03"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"c5a44fa9-6028-4ab0-8ac3-dcb69973ea03"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"c5a44fa9-6028-4ab0-8ac3-dcb69973ea03"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"c5a44fa9-6028-4ab0-8ac3-dcb69973ea03"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"c5a44fa9-6028-4ab0-8ac3-dcb69973ea03"}]}}]}},{"classname":"EquipSlot","data":{"_id":"1afeb2f6-9231-412b-9083-357a8828ee12","_name":"Талия","_alias":"waist","_description":"","_sort":550,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"d4e1aef8-4300-4567-b24b-a269512a82cf"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"d4e1aef8-4300-4567-b24b-a269512a82cf"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"d4e1aef8-4300-4567-b24b-a269512a82cf"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"d4e1aef8-4300-4567-b24b-a269512a82cf"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"d4e1aef8-4300-4567-b24b-a269512a82cf"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"d4e1aef8-4300-4567-b24b-a269512a82cf"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"d4e1aef8-4300-4567-b24b-a269512a82cf"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"d4e1aef8-4300-4567-b24b-a269512a82cf"}]}}]}},{"classname":"EquipSlot","data":{"_id":"f32b66c1-dd40-491e-9c39-bbc245086281","_name":"Ноги","_alias":"legs","_description":"","_sort":560,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"98d13cf4-8241-4129-bb6c-3a1ffaa3c90f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"98d13cf4-8241-4129-bb6c-3a1ffaa3c90f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"98d13cf4-8241-4129-bb6c-3a1ffaa3c90f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"98d13cf4-8241-4129-bb6c-3a1ffaa3c90f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"98d13cf4-8241-4129-bb6c-3a1ffaa3c90f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"98d13cf4-8241-4129-bb6c-3a1ffaa3c90f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"98d13cf4-8241-4129-bb6c-3a1ffaa3c90f"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"98d13cf4-8241-4129-bb6c-3a1ffaa3c90f"}]}}]}},{"classname":"EquipSlot","data":{"_id":"3c25204e-4771-485e-96c4-914c99519a95","_name":"Ступни","_alias":"foots","_description":"","_sort":570,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"d66b65e1-cebd-40b8-9d42-c1518bf4387d"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"d66b65e1-cebd-40b8-9d42-c1518bf4387d"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"d66b65e1-cebd-40b8-9d42-c1518bf4387d"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"d66b65e1-cebd-40b8-9d42-c1518bf4387d"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"d66b65e1-cebd-40b8-9d42-c1518bf4387d"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"d66b65e1-cebd-40b8-9d42-c1518bf4387d"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"d66b65e1-cebd-40b8-9d42-c1518bf4387d"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"d66b65e1-cebd-40b8-9d42-c1518bf4387d"}]}}]}},{"classname":"EquipSlot","data":{"_id":"9d9fbf4e-1a2f-46f0-b10e-f5963403ed33","_name":"Шея","_alias":"neck","_description":"","_sort":580,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"0765d7ba-600e-41cf-863e-176acfa19ae5"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"0765d7ba-600e-41cf-863e-176acfa19ae5"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"0765d7ba-600e-41cf-863e-176acfa19ae5"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"0765d7ba-600e-41cf-863e-176acfa19ae5"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"0765d7ba-600e-41cf-863e-176acfa19ae5"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"0765d7ba-600e-41cf-863e-176acfa19ae5"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"0765d7ba-600e-41cf-863e-176acfa19ae5"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"0765d7ba-600e-41cf-863e-176acfa19ae5"}]}}]}},{"classname":"EquipSlot","data":{"_id":"b421b711-1a3f-4558-b245-a76aa8348b30","_name":"Палец 1","_alias":"finger_1","_description":"","_sort":590,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}}]}},{"classname":"EquipSlot","data":{"_id":"c68bd399-504b-40ab-afb0-4fd5da96036b","_name":"Палец 2","_alias":"finger_2","_description":"","_sort":600,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"01a33c6d-339c-4a82-91c7-2b9442e057a4"}]}}]}},{"classname":"EquipSlot","data":{"_id":"60735275-5510-4430-85e8-8e0105579c80","_name":"Аксессуар","_alias":"trinket","_description":"","_sort":610,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"3e86e1de-c59d-4aed-a968-ab864410e132"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"3e86e1de-c59d-4aed-a968-ab864410e132"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"3e86e1de-c59d-4aed-a968-ab864410e132"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"3e86e1de-c59d-4aed-a968-ab864410e132"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"3e86e1de-c59d-4aed-a968-ab864410e132"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"3e86e1de-c59d-4aed-a968-ab864410e132"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"3e86e1de-c59d-4aed-a968-ab864410e132"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"3e86e1de-c59d-4aed-a968-ab864410e132"}]}}]}},{"classname":"EquipSlot","data":{"_id":"bba431bf-a332-4bee-8f5b-e5bd19337ec7","_name":"Правая рука","_alias":"right_hand","_description":"","_sort":620,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"e8326c4b-8762-450c-9128-e868ade59db1"},{"classname":"ItemCategory","id":"a217e997-83b8-4ac5-8bf1-271c46b947db"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"e8326c4b-8762-450c-9128-e868ade59db1"},{"classname":"ItemCategory","id":"a217e997-83b8-4ac5-8bf1-271c46b947db"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"1916d139-3891-4e97-b0f8-a3670061f861"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"e8326c4b-8762-450c-9128-e868ade59db1"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"02434bf5-a2cf-47d6-b388-0e4a10745656"},{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"02434bf5-a2cf-47d6-b388-0e4a10745656"},{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"02434bf5-a2cf-47d6-b388-0e4a10745656"},{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"02434bf5-a2cf-47d6-b388-0e4a10745656"},{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}]}}]}},{"classname":"EquipSlot","data":{"_id":"800282dc-a818-4459-8245-a37f06e976ff","_name":"Правая рука","_alias":"right_hand","_description":"","_sort":620,"_rules":[{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"},"_itemCategories":[{"classname":"ItemCategory","id":"6fbb8dcb-f86f-495f-82cb-9cfeecd85c00"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"a0e6e0ba-1781-498b-8608-09f1d825e5fe"},"_itemCategories":[{"classname":"ItemCategory","id":"6fbb8dcb-f86f-495f-82cb-9cfeecd85c00"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"c7890a07-7bf4-41e7-97fd-3be54426d132"},"_itemCategories":[{"classname":"ItemCategory","id":"1916d139-3891-4e97-b0f8-a3670061f861"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"567eb990-4e02-4d6b-b95c-16d191acce9b"},"_itemCategories":[{"classname":"ItemCategory","id":"e8326c4b-8762-450c-9128-e868ade59db1"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"231f3a84-c7c1-4876-8a43-84d838e93e1a"},"_itemCategories":[{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"92200122-b76b-4264-8082-f39af9f21d01"},"_itemCategories":[{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd"},"_itemCategories":[{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}]}},{"classname":"EquipSlotRule","data":{"_heroClass":{"classname":"HeroClass","id":"bd3fdce4-3820-4621-b519-59ab1398b4eb"},"_itemCategories":[{"classname":"ItemCategory","id":"0876ae49-d54c-4d4b-a123-c6d0d4588f4e"}]}}]}}]';

    let entityManager = new EntityManager();

    let unserializedData = coreJsonSerializer.parse(stringData);
    for (let i = 0; i < unserializedData.length; i++) {
        let entity = coreSerializer.unserialize(unserializedData[i]);
        // console.dir(entity, {depth: 10});
        entityManager.getRepository(unserializedData[i]['classname']).add(entity);
    }
    coreSerializer.finish();
    // debugEntityManager(entityManager);
    // console.dir(entityManager.getRepository(EquipSlot.name), {depth: 20});
    // console.dir(entityManager.getRepository(ItemCategory.name), {depth: 20});
    // console.dir(entityManager.getRepository(HeroClass.name), {depth: 20});
    // console.dir(entityManager, {depth: 20});
}

export function testSerializeItemStorage(container: ContainerInterface, serializer: Serializer, jsonSerializer: JsonSerializer) {
    let itemStorage = container.get<ItemStorageFactoryInterface>(ContainerKey.ItemStorageFactory).create(DEFAULT_ITEM_STORAGE_SIZE);

    itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        container.get<ItemStackFactory>(ContainerKey.ItemStackFactory).createByItemAlias(ItemID.Wood, 20),
    );
    itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        container.get<ItemStackFactory>(ContainerKey.ItemStackFactory).createByItemAlias(ItemID.Wood, 20),
    );
    itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        container.get<ItemStackFactory>(ContainerKey.ItemStackFactory).createByItemAlias(ItemID.OneHandedSword_01, 1),
    );

    let expectedStringData = '{"classname":"GameObject","data":{"_id":1,"_name":"ItemStorage","_tags":["#item_storage"],"_components":[{"classname":"ItemStorageComponent","data":{"_id":2,"_gameObject":{"classname":"GameObject","id":1},"_size":20}},{"classname":"ItemStorageSlotComponent","data":{"_id":3,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":{"classname":"ItemStack","data":{"_id":23,"_item":{"classname":"Item","id":"09954f0a-3291-4569-b288-02d073bc826f"},"_count":20}}}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":4,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":{"classname":"ItemStack","data":{"_id":24,"_item":{"classname":"Item","id":"09954f0a-3291-4569-b288-02d073bc826f"},"_count":20}}}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":5,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":{"classname":"ItemStack","data":{"_id":25,"_item":{"classname":"Item","id":"a5492c54-9a4d-42b7-8ec3-a8ccaa787854"},"_count":1}}}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":6,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":7,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":8,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":9,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":10,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":11,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":12,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":13,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":14,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":15,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":16,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":17,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":18,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":19,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":20,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":21,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"ItemStorageSlotComponent","data":{"_id":22,"_gameObject":{"classname":"GameObject","id":1},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}}]}}';

    // debugItemStorage(itemStorage);
    let serializedDataItemStorage = serializer.serialize(itemStorage);
    let stringDataItemStorage = jsonSerializer.toJson(serializedDataItemStorage);

    let objectData = jsonSerializer.parse(expectedStringData);

    let unserializedItemStorage = serializer.unserialize<GameObject>(objectData);
    serializer.finish();

    console.log(unserializedItemStorage);
    debugItemStorage(unserializedItemStorage);
    console.log(
        _.isEqual(unserializedItemStorage, itemStorage),
        'ItemStorages is equal.'
    );
}

export function testSerializeHero(container: ContainerInterface, serializer: Serializer, jsonSerializer: JsonSerializer) {
    let heroClass = container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior);
    let hero = container.get<HeroFactory>(ContainerKey.HeroFactory).create(
        heroClass,
        1,
    );
    debugHero(hero);
    let serializedHero = serializer.serialize(hero);
    let serializedStringData = jsonSerializer.toJson(serializedHero);
    // console.dir(serializedHero, {depth: 20});
    // console.log(stringData);

    let stringData = '{"classname":"GameObject","data":{"_id":1,"_name":"Hero","_tags":["#hero"],"_components":[{"classname":"HeroComponent","data":{"_id":2,"_gameObject":{"classname":"GameObject","id":1},"_name":"Hero","_heroClass":{"classname":"HeroClass","id":"bc0c6967-f35b-47eb-b71b-f9270a9b296b"}}},{"classname":"LevelComponent","data":{"_id":3,"_gameObject":{"classname":"GameObject","id":1},"_level":1,"_maxLevel":100,"_exp":0}},{"classname":"EquipSlotComponent","data":{"_id":4,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"4223fda7-b0b3-4cda-8cbf-073246cb9df6"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":5,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"6be05e16-d9f4-470d-9c99-505e9d6a1a6a"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":6,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"8b7a7277-6011-462a-a258-7d774ed51d1e"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":7,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"df67d5be-c5af-45ad-8467-821ea6c0429f"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":8,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"926bb2e2-640d-4f25-89ff-167457ac6d83"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":9,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"1afeb2f6-9231-412b-9083-357a8828ee12"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":10,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"f32b66c1-dd40-491e-9c39-bbc245086281"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":11,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"3c25204e-4771-485e-96c4-914c99519a95"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":12,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"9d9fbf4e-1a2f-46f0-b10e-f5963403ed33"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":13,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"b421b711-1a3f-4558-b245-a76aa8348b30"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":14,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"c68bd399-504b-40ab-afb0-4fd5da96036b"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":15,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"60735275-5510-4430-85e8-8e0105579c80"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":16,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"bba431bf-a332-4bee-8f5b-e5bd19337ec7"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"EquipSlotComponent","data":{"_id":17,"_gameObject":{"classname":"GameObject","id":1},"_equipSlot":{"classname":"EquipSlot","id":"800282dc-a818-4459-8245-a37f06e976ff"},"_itemStackSlot":{"classname":"ItemStackSlot","data":{"_itemStack":null}}}},{"classname":"CharacterAttributeComponent","data":{"_id":18,"_gameObject":{"classname":"GameObject","id":1},"_characterAttribute":{"classname":"CharacterAttribute","id":"0380bfd3-1885-4788-bb11-0216e6d216b5"},"_baseValue":120}},{"classname":"CharacterAttributeComponent","data":{"_id":19,"_gameObject":{"classname":"GameObject","id":1},"_characterAttribute":{"classname":"CharacterAttribute","id":"61134aa3-fa19-45a6-a740-b1013abd7bed"},"_baseValue":120}},{"classname":"CharacterAttributeComponent","data":{"_id":20,"_gameObject":{"classname":"GameObject","id":1},"_characterAttribute":{"classname":"CharacterAttribute","id":"8bd442cf-c3e0-4ecd-8276-9a9df012320c"},"_baseValue":120}},{"classname":"CharacterAttributeComponent","data":{"_id":21,"_gameObject":{"classname":"GameObject","id":1},"_characterAttribute":{"classname":"CharacterAttribute","id":"226cccb3-8738-473d-9488-15c550203c4b"},"_baseValue":120}},{"classname":"CharacterAttributeComponent","data":{"_id":22,"_gameObject":{"classname":"GameObject","id":1},"_characterAttribute":{"classname":"CharacterAttribute","id":"578f79f9-87df-4218-b5ae-f70572c3794f"},"_baseValue":120}},{"classname":"CharacterAttributeComponent","data":{"_id":23,"_gameObject":{"classname":"GameObject","id":1},"_characterAttribute":{"classname":"CharacterAttribute","id":"03b8d14f-dbc6-47f5-90a6-8d005b837e57"},"_baseValue":120}},{"classname":"HealthPointsComponent","data":{"_id":24,"_gameObject":{"classname":"GameObject","id":1},"_currentHealthPoints":120,"_maxHealthPoints":120,"_state":"LIFE"}},{"classname":"MagicPointsComponent","data":{"_id":25,"_gameObject":{"classname":"GameObject","id":1},"_currentMagicPoints":100,"_maxMagicPoints":100}},{"classname":"AttackPowerComponent","data":{"_id":26,"_gameObject":{"classname":"GameObject","id":1},"_baseMinAttackPower":30,"_baseMaxAttackPower":40,"_dependentCharacterAttributeComponents":[{"classname":"CharacterAttributeComponent","id":18}]}}]}}';
    let objectData = jsonSerializer.parse(stringData);

    let unserializedHero = serializer.unserialize<GameObject>(objectData);
    serializer.finish();
    // console.log(unserializedHero);
    // debugHero(unserializedHero);
    console.log(_.isEqual(unserializedHero, hero));
}

enum TestSerializeStringEnum {
    LIFE = 'LIFE',
    DEAD = 'DEAD',
}

enum TestSerializeNumberEnum {
    one = 1,
    two = 2,
}

class TestObjectWithEnum {
    _enumStringObject: TestSerializeStringEnum;
    _enumNumberObject: TestSerializeNumberEnum;

    constructor(enumObject, enumNumberObject) {
        this._enumStringObject = enumObject;
        this._enumNumberObject = enumNumberObject;
    }
}

export function testSerializeEnum(container: ContainerInterface, serializer: Serializer, jsonSerializer: JsonSerializer) {
    let testObjectWithEnum = new TestObjectWithEnum(TestSerializeStringEnum.LIFE, TestSerializeNumberEnum.two);
    // console.log(testObjectWithEnum);
    let serializedObject = serializer.serialize(testObjectWithEnum);
    // let stringData = jsonSerializer.toJson(serializedObject);
    // console.log(stringData);

    let stringData = '{"classname":"TestObjectWithEnum","data":{"_enumStringObject":"LIFE","_enumNumberObject":2}}';
    let objectData = jsonSerializer.parse(stringData);
    let unserializedObject = serializer.unserialize<TestObjectWithEnum>(objectData);
    console.log(unserializedObject);
    console.log(unserializedObject._enumStringObject);
    console.log(unserializedObject._enumStringObject === TestSerializeStringEnum.LIFE);
    console.log(unserializedObject._enumNumberObject);
    console.log(unserializedObject._enumNumberObject === TestSerializeNumberEnum.two);
    console.log(_.isEqual(unserializedObject, testObjectWithEnum));
}

export function testClosure() {
    let a = [0,0,0,0,0];
    console.log(a);

    let callback;
    for (let i = 0; i < a.length; i++) {
        if (i === 2) {
            callback = (target) => {
                console.log('i', i);
                a[i] = target;
            }
        }
    }

    callback(42);
    console.log(a);
}

export function testClearArray() {
    let a = [1,2,3,4,5];
    console.log(a.splice(0, 5));
    console.log(a);
}

export function testContainerGetByPattern() {
    let container = new Container();
    (new DefaultContainerConfigure()).configure(container);
    (new ServerContainerConfigure()).configure(container);
    (new CoreContainerConfigure()).configure(container);
    (new PlayerContainerConfigure()).configure(container);

    // debugContainer(container);

    let services = container.getByPattern('player.*');
    console.log(services);

    let metadataManager = container.get<MetadataManager>('core.metadataManager')
    let serializer = container.get<Serializer>('core.serializer');

    let serializeServices = _.filter(_.map(services, (service) => {
        // console.log(service?.constructor?.name);
        // console.log(metadataManager.hasMetadata(service.constructor.name));
        if (service?.constructor?.name && metadataManager.hasMetadata(service.constructor.name)) {
            console.log(42);
            return serializer.serialize(service);
        }
    }), (item) => {
        // return item !== undefined;
        return !_.isNil(item);
    });
    console.log('serializeServices', serializeServices);
}

export function testUUIDGenerator() {
    let container = createEndPlayerContainer();

    let itemStorageFactory = container.get<ItemStorageFactoryInterface>(ContainerKey.ItemStorageFactory);

    let itemStorage = itemStorageFactory.create(20);
    debugItemStorage(itemStorage);
}

export function testItemStorageFactories() {
    let container = new Container();
    // let idGenerator = new UUIDGenerator();
    let idGenerator = new AutoIncrementIDGenerator(1);
    let gameObjectStorage = new GameObjectStorage();

    container.set(ContainerKey.GameObjectStorage, gameObjectStorage);
    container.set('player.realtimeObjectIdGenerator', idGenerator);

    let basicItemStorageFactory = new ItemStorageFactory(
        gameObjectStorage,
        container.get<ItemStackFactory>(ContainerKey.ItemStackFactory),
        // idGenerator,
        null,
    );
    // debugItemStorage(basicItemStorageFactory.create());

    let techItemStorageFactory = new TechItemStorageFactoryDecorator(
        basicItemStorageFactory,
        container.get<GameObjectStorage>(ContainerKey.GameObjectStorage),
    );

    let itemStorageCollectionGameObject = new GameObject(idGenerator.generateID());
    let itemStorageCollectionComponent = <MainItemStorageListComponent>itemStorageCollectionGameObject.addComponent(new MainItemStorageListComponent(
        4,
        [
            // techItemStorageFactory.create(),
        ],
    ));
    container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).add(itemStorageCollectionGameObject);

    let playerItemStorageFactory = new PlayerItemStorageFactory(
        techItemStorageFactory,
        container,
        itemStorageCollectionComponent,
    );

    // let itemStorageFactory = basicItemStorageFactory;
    // let itemStorageFactory = techItemStorageFactory;
    let itemStorageFactory = playerItemStorageFactory;
    debugItemStorage(itemStorageFactory.create(20));
    console.log(gameObjectStorage);
    console.log(itemStorageCollectionComponent);
}

export function testInherit() {
    // function ID(ID) {
    //     this.ID = ID;
    // }
    //
    // function Person(firstName, lastName) {
    //     this.firstName = firstName
    //     this.lastName = lastName
    // }
    // Person.prototype.getFullName = function () {
    //     return this.firstName + ' ' + this.lastName
    // }
    //
    // let person = new Person('Dan', 'Abramov')
    // // console.log(Person.prototype); //> Dan Abramov
    // // console.log(person); //> Dan Abramov
    // // console.log(person.prototype); //> Dan Abramov
    // // console.log(person.getFullName()); //> Dan Abramov
    // // console.log(Object.create(Person.prototype));
    //
    // function User(firstName, lastName, email, password) {
    //     // call super constructor:
    //     Person.call(this, firstName, lastName)
    //     this.email = email
    //     this.password = password
    // }
    // User.prototype = Object.create(Person.prototype);
    // User.prototype.setEmail = function(email) {
    //     this.email = email
    // }
    // User.prototype.getEmail = function() {
    //     return this.email
    // }
    // User.prototype.getFullName = function () {
    //     return 'User Name: ' +
    //         this.firstName + ' ' +
    //         this.lastName
    // }
    // let user = new User('firstName', 'lasName', 'email', 'password');
    // // user.setEmail('dan@abramov.com')
    // // console.log(User.prototype);
    // console.log(user);
    // console.log(user.getFullName());
    // console.log(person.getFullName());

    // interface ComponentInterface {
    //
    // }
    //
    // class IDComponentDecorator implements ComponentInterface {
    //     private _ID: number;
    //     private _component;
    //
    //     constructor(component, ID: number) {
    //         this._ID = ID;
    //         this._component = component;
    //     }
    // }
    //
    // class HealthComponent implements ComponentInterface {
    //     private _min: number;
    //     private _max: number;
    //     private _current: number;
    //     private _isDead: boolean;
    //
    //     constructor(max: number, current: number) {
    //         this._min = 0;
    //         this._max = max;
    //         this._current = current;
    //         this._isDead = false;
    //     }
    // }
    //
    // // let component = new ComponentInterface();
    // // component = new IDComponentDecorator(component, 42);
    // // component = new HealthComponent(component, 42);
    //
    // let healthComponent = new HealthComponent(100, 100);
    // console.log(healthComponent);
    //
    // let finalHealthComponent = new IDComponentDecorator(healthComponent, 42);
    // console.log(finalHealthComponent);

    //---
    interface Service {

    }

    class ServiceIDDecorator {
        id: number;

        constructor(id: number) {
            this.id = id;
        }
    }

    //---

    // interface CharacterAttributeInterface {
    //     get value(): number;
    // }
    //
    // /*
    //     сила_атаки = базовая_характеристика + бафф_1 + бафф_2 + ... + бафф_n
    //  */
}

export function testHeroController() {
    let container = createEndPlayerContainer();

    let heroControllerGameObject = container.get<GameObjectFactory>('player.gameObjectFactory').create();

    let heroController = heroControllerGameObject.addComponent<MainHeroListComponent>(new MainHeroListComponent(
        10,
    ));

    let warrior = container.get<HeroFactory>(ContainerKey.HeroFactory).create(
        container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
        1,
    );
    let mage = container.get<HeroFactory>(ContainerKey.HeroFactory).create(
        container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
        1,
    );
    heroController.addHero(warrior);
    heroController.addHero(warrior);
    heroController.addHero(mage);
    console.log(heroController);
    // heroController.deleteHero(warrior);
    console.log(heroController);
}

export function testEntityManagerFacade() {
    interface Module {
        name: string;
        prototype: object;
    }

    let container = createEndPlayerContainer();
    // let entity = function<Entity>(target: Entity, alias: string): Entity {
    //     //@ts-ignore
    //     return container.get<EntityManager>('core.entityManager').getRepository<Entity>(target.name).getOneByAlias(alias);
    // };
    let facade = container.get<EntityManagerFacade>(ContainerKey.EntityManagerFacade);

    // let entity = facade.entity(Item, 'wood1');
    let entity = facade.entity(ArmorMaterial, ArmorMaterialID.Plate);
    console.log(entity);
}

export function testEquipSlotDecorators() {
    /*
    Правила:
        Предмет экипируем?
        Подходит ли предмет для класса? (постоянные_ограничения) Материал брони, ограничение у предмета (например: "только для мага"), доступность оружия, разбойники - только дагеры.
            Проверка на оружие есть только у рук.
        Подходит ли предмет для слота? Можно сделать так, чтобы не было зависимости от класса. Голова - шлемы, грудь - нагрудник, правая рука: [большой список ВСЕХ оружий], левая рука: [ВСЁ ОДНОРУЧНОЕ ОРУЖИЕ, щиты, сферы (D3)] - двуручное оружие не доступно, а также блокируется при экипировке двуручника в правой руке.
        Подходит ли предмет для героя? (временные_ограничения) Уровень, прокачка навыка.
     */

    function constantRule(item) {
        if (item.isEquipable) {
            throw new AppError('Предмет нельзя экипировать.');
        }

        if (!this.categories.include(item.category)) {  //Категории заданы строго в коде и изменить нельзя.
            throw new AppError('Предмет не подходит для слота.');
        }
    }

    function tempRule(item) {
        if (
            this.hero.level < item.requireLevel ||
            !this.hero.hasSkill(item.requireSkill.skill) ||
            this.hero.hasSkill(item.requireSkill.skill) && this.hero.getSkill('название_скилла').value < item.requireSkill.value
        ) {
            throw new AppError('Предмет ПОКА нельзя экипировать для данного героя.');
        }
    }

    //Только для слотов брони. Не для шеи, пальцев, тринкетов, обеих рук.
    function armorMaterialRule(item) {
        if (
            // item.armorMaterial ??    //Нужна ли данная проверка? Если код будет идти после проверки доступности на слот, то значит проверка не нужна. Декоратор будет добавляться только в слоты брони.
            item.armorMaterial !== this.hero.armorMaterial
            // item.armorMaterial !== this.hero.armorMaterial ||
            // !this.heroClass.availableItem(item) //Проверка всего: материал, класса, оружие и тд. Не зависит от слота.
        ) {
            throw new AppError('Предмет не доступен для героя.');
        }
    }

    function rightHandRuleDecorator(item) {
        if (!this.heroClass.availableWeaponCategory(item.category)) {
            throw new AppError('Герою не доступен данный вид оружия.');
        }
    }

    function leftHandRuleDecorator(item) {
        if (!this.heroClass.availableWeaponCategory(item.category)) {
            throw new AppError('Герою не доступен данный вид оружия.');
        }
    }
}

export function testJSLinks() {
    let a1 = {foo1: 'bar1'};
    let a2 = a1;
    console.log(a1);
    console.log(a2);
    a1['foo2'] = 'bar2';
    a2['foo3'] = 'bar3';
    console.log(a1);
    console.log(a2);
    a1 = null;
    console.log(a1);
    console.log(a2);
}

export interface InterfaceA1 {

}

export interface InterfaceA2 {

}

export class ClassA1 implements InterfaceA1, InterfaceA2 {

}

export class ClassA2 {
    test(n: number, a: ClassA1): ClassA1 {
        return n;
    }
}

let classA1 = new ClassA1();
// console.log(classA1 instanceof Interface);
function Function1(a: InterfaceA1, b: ClassA1, n: number = 42) {

}
// Function1(42, 42, 'asd');
// Function1(42, new ClassA2(), 'asd');
// Function1(42, new ClassA2());   //??????????????????
// let f1 = new Function1(42, new ClassA2());
//
// let classA2 = new ClassA2();
// classA2.test(42, 'asd');

// let item = new Item(
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
// );


export function testLodashFind() {
    // let users = [
    //     { 'user': 'barney',  'age': 36, 'active': true },
    //     { 'user': 'fred',    'age': 40, 'active': false },
    //     { 'user': 'pebbles', 'age': 1,  'active': true }
    // ];
    let users = {
        '0': { 'user': 'barney',  'age': 36, 'active': true },
        '1' : { 'user': 'fred',    'age': 40, 'active': false },
        '2' : { 'user': 'pebbles', 'age': 1,  'active': true }
    };

    // console.log(_.find(users, function(o) { return o.age < 40; }));
    // console.log(_.findKey(users, function(o) { return o.age < 40; }));
    console.log(_.findKey(users, function(o) { return o.age === 1; }));
}

export function testItemBuilder() {
    // let itemBuilder = new ItemBuilder();
}

export function testNumberKeysForObject() {
    let o = {
        a: 42,
        42: '42',
        // 42: 42,
    };
    console.log(42);
    console.log(o['a']);
    console.log(o['42']);
    // console.log(<number>o['42']);
    console.log(Number(o['42']));
    console.log('112332');
    console.log(112332);
    console.log(Number('112332'));
}

export function testLevelRange() {
    console.log([
        // new Range(10),
        new Range(1, 10),
        // new Range([10, 20]),
    ]);

    console.log(_.inRange(1, 1, 10));
    console.log(_.inRange(10, 1, 10));
}

// type World = "world";
// type Greeting = `hello ${World}`;
// type Resources = ItemCategoryAlias.Resources;
// // type ItemCategoryAlias = ItemCategoryAlias.Resources | ItemCategoryAlias.Rings;
//
// interface TestItemBuilderInterface {
//     name: string;
//     // itemCategory: string;
//     // itemCategory: Resources;
//     itemCategory: ItemCategoryAlias;
// }
//
// export function testTypeForAlias() {
//     // type A = 'a';
//     //
//     // // let w: World = 'world';
//     // let r: Resources = ItemCategoryAlias.Resources;
//     // console.log(r);
//     //
//     // let itemBuilder: TestItemBuilderInterface = {
//     //     name: 'Дерево',
//     //     // itemCategory: ItemCategoryAlias.Resources,
//     //     itemCategory: ItemCategoryAlias.Resources,
//     // };
//     ItemCategoryAlias['asd'] = 42;  //А так можно?
//     console.log(ItemCategoryAlias);
// }


enum TestEnumMerging {
    one = 'one',
    two = 'two',
}

enum TestEnumMerging {
    three = 'three',
}

export function testEnumMerging() {
    console.log(TestEnumMerging);
}