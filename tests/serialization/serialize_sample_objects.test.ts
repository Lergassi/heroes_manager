import MetadataManager, {repositoryManagerFinderCallback} from '../../core/source/MetadataManager.js';
import TestObjectWithSimpleTypes from '../../test/Serialize/TestObjectWithSimpleTypes.js';
import Serializer, {SerializeType} from '../../core/source/Serializer.js';
import JsonSerializer from '../../core/source/JsonSerializer.js';
import {sprintf} from 'sprintf-js';
import TestObjectLink from '../../test/Serialize/SupportObjects/TestObjectLink.js';
import TestObjectWithLink from '../../test/Serialize/TestObjectWithLink.js';
import TestObjectWithCollections from '../../test/Serialize/TestObjectWithCollections.js';
import TestObjectSample from '../../test/Serialize/SupportObjects/TestObjectSample.js';
import TestObjectWithObject from '../../test/Serialize/TestObjectWithObject.js';
import messages from '../../core/app/messages.js';
import TestObjectWithLinkCollections from '../../test/Serialize/TestObjectWithLinkCollections.js';
import Container from '../../core/source/Container.js';
import EntityManager from '../../core/source/EntityManager.js';
import {ContainerKey} from '../../core/types/enums/ContainerKey.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';

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
    module: TestObjectWithCollections,
    mapping: {
        _simpleTypeCollection: {type: SerializeType.Collection},
        _objectCollection: {type: SerializeType.Collection},
    },
});
metadataManager.addMetadata({
    module: TestObjectWithObject,
    mapping: {
        _object: {type: SerializeType.Object},
    },
});
metadataManager.addMetadata({
    module: TestObjectSample,
    mapping: {
        _value: {type: SerializeType.String},
    },
});
metadataManager.addMetadata({
    module: TestObjectWithLinkCollections,
    mapping: {
        _linkCollection: {type: SerializeType.LinkCollection},
    },
});

let data = [];
data.push({
    target: TestObjectWithSimpleTypes,
    instance: new TestObjectWithSimpleTypes(true, 42, 'Hello, World!'),
    expectedStringData: '{"classname":"TestObjectWithSimpleTypes","data":{"_boolean":true,"_number":42,"_string":"Hello, World!"}}',
});

let clearContainer = new Container();
clearContainer.set<EntityManager>(ContainerKey.EntityManager, (container) => {
    return new EntityManager();
});
let clearSerializer = new Serializer(clearContainer, metadataManager);

let container = new Container();
container.set<EntityManager>(ContainerKey.EntityManager, (container) => {
    return new EntityManager();
});

let serializer = new Serializer(container, metadataManager);
let jsonSerializer = new JsonSerializer();

for (let i = 0; i < data.length; i++) {
    let serializedObject = serializer.serialize(data[i].instance);
    let stringData = jsonSerializer.toJson(serializedObject);

    test(sprintf('Итоговые json(строковые) данные для %s верны.', data[i].target.name), () => {
        expect(typeof stringData).toBe('string');
        expect(stringData.length).toBeGreaterThan(0);
        expect(stringData).toBe(data[i].expectedStringData);
    });

    let dataObject = jsonSerializer.parse(data[i].expectedStringData);
    let unserializedObject = serializer.unserialize(dataObject);

    test(sprintf('Восстановленный объект %s идентичный исходному.', data[i].target.name), () => {
        expect(unserializedObject).toBeInstanceOf(data[i].target);
        expect(unserializedObject).toStrictEqual(data[i].instance);
    });
}

let testObjectLinkData = {
    id: 100,
    value: 'Дерево',
};
let testObjectLink = new TestObjectLink(testObjectLinkData.id, testObjectLinkData.value);
let testObjectWithLink1 = new TestObjectWithLink(testObjectLink);
let testObjectWithLink2 = new TestObjectWithLink(testObjectLink);

let expectedTestObjectLink = sprintf('{"classname":"TestObjectLink","data":{"_id":%s,"_value":"%s"}}', testObjectLinkData.id, testObjectLinkData.value);
let expectedTestObjectWithLink1 = sprintf('{"classname":"TestObjectWithLink","data":{"_link":{"classname":"TestObjectLink","id":%s}}}', testObjectLinkData.id);
let expectedTestObjectWithLink2 = sprintf('{"classname":"TestObjectWithLink","data":{"_link":{"classname":"TestObjectLink","id":%s}}}', testObjectLinkData.id);

let serializedTestObjectLink = serializer.serialize(testObjectLink);
let serializedTestObjectWithLink1 = serializer.serialize(testObjectWithLink1);
let serializedTestObjectWithLink2 = serializer.serialize(testObjectWithLink2);

let stringDataTestObjectLink = jsonSerializer.toJson(serializedTestObjectLink);
let stringDataTestObjectWithLink1 = jsonSerializer.toJson(serializedTestObjectWithLink1);
let stringDataTestObjectWithLink2 = jsonSerializer.toJson(serializedTestObjectWithLink2);

test(sprintf('Итоговые json(строковые) данные для %s верны.', TestObjectLink.name), () => {
    expect(stringDataTestObjectLink).toBe(expectedTestObjectLink);
});
test(sprintf('Итоговые json(строковые) данные для %s верны.', TestObjectWithLink.name), () => {
    expect(stringDataTestObjectWithLink1).toBe(expectedTestObjectWithLink1);
    expect(stringDataTestObjectWithLink2).toBe(expectedTestObjectWithLink2);
});

describe.each([
    [stringDataTestObjectLink, expectedTestObjectLink, TestObjectLink],
    [stringDataTestObjectWithLink1, expectedTestObjectWithLink1, TestObjectWithLink],
    [stringDataTestObjectWithLink2, expectedTestObjectWithLink2, TestObjectWithLink],
])(sprintf('Итоговые json(строковые) данные верны.'), (a, expected, target) => {
    test(sprintf('Итоговые json(строковые) данные для %s верны.', target.name), () => {
        expect(a).toBe(expected);
    });
});

let objectDataTestObjectWithWithLink1 = jsonSerializer.parse(expectedTestObjectWithLink1);
let unserializedTestObjectWithWithLink1 = serializer.unserialize(objectDataTestObjectWithWithLink1);

let objectDataTestObjectWithWithLink2 = jsonSerializer.parse(expectedTestObjectWithLink2);
let unserializedTestObjectWithWithLink2 = serializer.unserialize(objectDataTestObjectWithWithLink2);

//Сериализация объекта Link вынесена ниже прочих объектов, так как обработка может происходить в случайном порядке.
let objectDataTestObjectLink = jsonSerializer.parse(stringDataTestObjectLink);
let unserializedTestObjectLink = serializer.unserialize(objectDataTestObjectLink);

serializer.finish();

// test(sprintf('Восстановленный объект %s идентичный исходному.', TestObjectLink.name), () => {
//     expect(unserializedTestObjectLink).toBeDefined();
//     expect(unserializedTestObjectLink).toBeInstanceOf(TestObjectLink);
//     expect(unserializedTestObjectLink).toStrictEqual(testObjectLink);
// });

describe(sprintf('Объект %s восстановлен правильно.', TestObjectWithLink.name), () => {
    test(sprintf('Восстановленный объект %s идентичный исходному.', TestObjectWithLink.name), () => {
        expect(unserializedTestObjectWithWithLink1).toBeDefined();
        expect(unserializedTestObjectWithWithLink1).toBeInstanceOf(TestObjectWithLink);
        expect(unserializedTestObjectWithWithLink1).toStrictEqual(testObjectWithLink1);

        expect(unserializedTestObjectWithWithLink2).toBeDefined();
        expect(unserializedTestObjectWithWithLink2).toBeInstanceOf(TestObjectWithLink);
        expect(unserializedTestObjectWithWithLink2).toStrictEqual(testObjectWithLink2);
    });
});

describe('Объект Link востановлен правильно.', () => {
    test('TestObjectLink в TestObjectWithLink установлен.', () => {
        expect(unserializedTestObjectWithWithLink1['_link']).toBeDefined();
        expect(unserializedTestObjectWithWithLink1['_link']).toBeInstanceOf(TestObjectLink);

        expect(unserializedTestObjectWithWithLink2['_link']).toBeDefined();
        expect(unserializedTestObjectWithWithLink2['_link']).toBeInstanceOf(TestObjectLink);
    });

    test('TestObjectLink в TestObjectWithLink ссылается на один и тот же объект (также восстановленный).', () => {
        expect(unserializedTestObjectWithWithLink1['_link']).toStrictEqual(unserializedTestObjectLink);
        expect(unserializedTestObjectWithWithLink2['_link']).toStrictEqual(unserializedTestObjectLink);
        expect(unserializedTestObjectWithWithLink1['_link'] === unserializedTestObjectWithWithLink2['_link']).toBeTruthy();
    });
});

let objectSample = new TestObjectSample('Hello, World!');
let testObjectWithObject = new TestObjectWithObject(objectSample);
let expectedTestObjectObject = '{"classname":"TestObjectWithObject","data":{"_object":{"classname":"TestObjectSample","data":{"_value":"Hello, World!"}}}}';

let serializedTestObjectWithObject = serializer.serialize(testObjectWithObject);
let stringDataTestObjectWithObject = jsonSerializer.toJson(serializedTestObjectWithObject);

describe(sprintf(messages.serializeSuccess, TestObjectWithObject.name), () => {
    test(sprintf(messages.serializedDataEqualToExpected, TestObjectWithObject.name), () => {
        expect(typeof stringDataTestObjectWithObject).toBe('string');
        expect(stringDataTestObjectWithObject.length).toBeGreaterThan(0);
        expect(stringDataTestObjectWithObject).toBe(expectedTestObjectObject);
    });
});

let unserializedTestObjectWithObject = serializer.unserialize(jsonSerializer.parse(stringDataTestObjectWithObject));
describe(sprintf(messages.unserializeSuccess, TestObjectWithObject.name), () => {
    test(sprintf(messages.unserializedObjectEqualToExpected, TestObjectWithObject.name), () => {
        expect(unserializedTestObjectWithObject).toBeDefined();
        expect(unserializedTestObjectWithObject).toBeInstanceOf(TestObjectWithObject);
        expect(unserializedTestObjectWithObject).toStrictEqual(testObjectWithObject);
    });

    test('Объект _object типа Object восстановлен правильно.', () => {
        expect(unserializedTestObjectWithObject['_object']).toBeDefined();
        expect(unserializedTestObjectWithObject['_object']).toBeInstanceOf(TestObjectSample);
        expect(unserializedTestObjectWithObject['_object']).toStrictEqual(testObjectWithObject['_object']);
    });
});

let simpleTypesCollection = [0, 1, 2, 3, '', 'a', 'b', 'c', true, false, null];
let objectsCollection = [new TestObjectSample('a'), new TestObjectSample('b'), new TestObjectSample('c')];
let testObjectWithCollections = new TestObjectWithCollections(simpleTypesCollection, objectsCollection);

let expectedTestObjectWithCollections = '{"classname":"TestObjectWithCollections","data":{"_simpleTypeCollection":[0,1,2,3,"","a","b","c",true,false,null],"_objectCollection":[{"classname":"TestObjectSample","data":{"_value":"a"}},{"classname":"TestObjectSample","data":{"_value":"b"}},{"classname":"TestObjectSample","data":{"_value":"c"}}]}}';

let serializedTestObjectWithCollections = serializer.serialize(testObjectWithCollections);
let stringDataTestObjectWithCollections = jsonSerializer.toJson(serializedTestObjectWithCollections);

describe(sprintf(messages.serializeSuccess, TestObjectWithCollections.name), () => {
    test(sprintf(messages.serializedDataEqualToExpected, TestObjectWithCollections.name), () => {
        expect(typeof stringDataTestObjectWithCollections).toBe('string');
        expect(stringDataTestObjectWithCollections.length).toBeGreaterThan(0);
        expect(stringDataTestObjectWithCollections.length).toBe(expectedTestObjectWithCollections.length);
        expect(stringDataTestObjectWithCollections).toBe(expectedTestObjectWithCollections);
    });
});

let unserializeTestObjectWithCollections = serializer.unserialize(jsonSerializer.parse(stringDataTestObjectWithCollections));

describe(sprintf(messages.unserializeSuccess, TestObjectWithCollections.name), () => {
    test(sprintf(messages.unserializedObjectEqualToExpected, TestObjectWithCollections.name), () => {
        expect(unserializeTestObjectWithCollections).toBeDefined();
        expect(unserializeTestObjectWithCollections).toBeInstanceOf(TestObjectWithCollections);
        expect(unserializeTestObjectWithCollections).toStrictEqual(testObjectWithCollections);
    });
});

let linkCollection = [
    new TestObjectLink(100, 'a'),
    new TestObjectLink(101, 'b'),
    new TestObjectLink(102, 'c'),
];

container.get<EntityManagerInterface>(ContainerKey.EntityManager).getRepository(TestObjectLink.name).add(linkCollection[0]);
container.get<EntityManagerInterface>(ContainerKey.EntityManager).getRepository(TestObjectLink.name).add(linkCollection[1]);
container.get<EntityManagerInterface>(ContainerKey.EntityManager).getRepository(TestObjectLink.name).add(linkCollection[2]);

let testObjectWithLinkCollections = new TestObjectWithLinkCollections(linkCollection);
let expectedTestObjectWithLLinkCollections = '{"classname":"TestObjectWithLinkCollections","data":{"_linkCollection":[{"classname":"TestObjectLink","id":100},{"classname":"TestObjectLink","id":101},{"classname":"TestObjectLink","id":102}]}}';

let serializedTestObjectWithLinkCollections = serializer.serialize(testObjectWithLinkCollections);
let stringDataTestObjectWithLinkCollections = jsonSerializer.toJson(serializedTestObjectWithLinkCollections);

describe(sprintf(messages.serializeSuccess, TestObjectWithLinkCollections.name), () => {
    test(sprintf(messages.serializedDataEqualToExpected, TestObjectWithLinkCollections.name), () => {
        expect(typeof stringDataTestObjectWithLinkCollections).toBe('string');
        expect(stringDataTestObjectWithLinkCollections.length).toBeGreaterThan(0);
        expect(stringDataTestObjectWithLinkCollections.length).toBe(expectedTestObjectWithLLinkCollections.length);
        expect(stringDataTestObjectWithLinkCollections).toBe(expectedTestObjectWithLLinkCollections);
    });
});

//Link сущестуют.
let unserializeTestObjectWithLinkCollectionsWithExistsLinks = serializer.unserialize(jsonSerializer.parse(stringDataTestObjectWithLinkCollections));
serializer.finish();

describe(sprintf(messages.unserializeSuccess + ' Link уже сеществуют и находятся в EntityManager.', TestObjectWithLinkCollections.name), () => {
    test(sprintf(messages.unserializedObjectEqualToExpected, TestObjectWithLinkCollections.name), () => {
        expect(unserializeTestObjectWithLinkCollectionsWithExistsLinks).toBeDefined();
        expect(unserializeTestObjectWithLinkCollectionsWithExistsLinks).toBeInstanceOf(TestObjectWithLinkCollections);
        expect(unserializeTestObjectWithLinkCollectionsWithExistsLinks).toStrictEqual(testObjectWithLinkCollections);
    });
});

//Link не сущестуют и обрабатываются вместе с LinkCollection.
let stringDataLinkCollection = '[{"classname":"TestObjectLink","data":{"_id":100,"_value":"a"}},{"classname":"TestObjectLink","data":{"_id":101,"_value":"b"}},{"classname":"TestObjectLink","data":{"_id":102,"_value":"c"}}]';
let objectDataLinkCollection = jsonSerializer.parse(stringDataLinkCollection);
for (let i = 0; i < objectDataLinkCollection.length; i++) {
    clearSerializer.unserialize(objectDataLinkCollection[i]);
}

let unserializeTestObjectWithLinkCollectionsWithNotExistsLinks = clearSerializer.unserialize(jsonSerializer.parse(stringDataTestObjectWithLinkCollections));
clearSerializer.finish();

describe(sprintf(messages.unserializeSuccess + ' Link не сеществуют и обрабатываются вместе с LinkCollection.', TestObjectWithLinkCollections.name), () => {
    test(sprintf(messages.unserializedObjectEqualToExpected, TestObjectWithLinkCollections.name), () => {
        expect(unserializeTestObjectWithLinkCollectionsWithNotExistsLinks).toBeDefined();
        expect(unserializeTestObjectWithLinkCollectionsWithNotExistsLinks).toBeInstanceOf(TestObjectWithLinkCollections);
        expect(unserializeTestObjectWithLinkCollectionsWithNotExistsLinks).toStrictEqual(testObjectWithLinkCollections);
    });
});