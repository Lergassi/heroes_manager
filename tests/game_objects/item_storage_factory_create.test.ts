import AutoIncrementIDGenerator from '../../core/source/AutoIncrementIDGenerator.js';
import ItemStorageFactory from '../../core/app/Factories/ItemStorageFactory.js';
import GameObject from '../../core/source/GameObject.js';
import {sprintf} from 'sprintf-js';
import ItemStorageSlotComponent from '../../core/app/Components/ItemStorageSlotComponent.js';
import _ from 'lodash';
import ItemStorageComponent from '../../core/app/Components/ItemStorageComponent.js';
import UUIDGenerator from '../../core/source/UUIDGenerator.js';
import Container from '../../core/source/Container.js';
import ItemStackFactory from '../../core/app/Factories/ItemStackFactory.js';
import EntityManager from '../../core/source/EntityManager.js';
import GameObjectStorage from '../../core/source/GameObjectStorage.js';

// let itemStorageFactory = new ItemStorageFactory(new AutoIncrementIDGenerator(1));
let IDGenerator = new UUIDGenerator();
let itemStackFactory = new ItemStackFactory(
    // IDGenerator,
    null,
    new EntityManager(),
);
let itemStorageFactory = new ItemStorageFactory(
    new GameObjectStorage(),
    itemStackFactory,
    // IDGenerator,
    null,
);

let size = 10;
let itemStorage = itemStorageFactory.create(size);

//expected
let expectedComponentLength = 11;
let expectedItemStorageComponentLength = 1;
let expectedItemStorageSlotComponentLength = size;
let expectedTags = ['#item_storage'];

test('itemStorage instanceof GameObject', () => {
    expect(itemStorage).toBeInstanceOf(GameObject);
});

test(sprintf('У каждого компонента ссылка _gameObject установлена на правильный родительский объект.'), () => {
    expect(_.every(itemStorage['_components'], (item) => {
        return item['_gameObject'] === itemStorage;
    })).toBeTruthy();
});

test(sprintf('itemStorage.name === %s', 'ItemStorage'), () => {
    expect(itemStorage['_name']).toBe('ItemStorage');
});

test(sprintf('itemStorage.tags.length === %s', expectedTags.length), () => {
    expect(itemStorage['_tags']).toHaveLength(expectedTags.length);
});

test(sprintf('itemStorage.tags.includes all tags %s', _.join(expectedTags, ', ')), () => {
    expect(_.every(expectedTags, (item) => {
        return _.includes(itemStorage['_tags'], item);
    })).toBeTruthy();
});

/**
 * Компоненты.
 */

test(sprintf('itemStorage содержит правильное кол-во компонентов.'), () => {
    expect(itemStorage['_components']).toHaveLength(expectedComponentLength);
});

test(sprintf('itemStorage содержит правильное кол-во ItemStorageComponent.'), () => {
    expect(itemStorage.findComponentsByName<ItemStorageComponent>(ItemStorageComponent.name)).toHaveLength(expectedItemStorageComponentLength);
});

test('itemStorageComponent instanceof ItemStorageComponent', () => {
    expect(itemStorage.findComponentsByName<ItemStorageComponent>(ItemStorageComponent.name)[0]).toBeInstanceOf(ItemStorageComponent);
});

test(sprintf('itemStorage содержит правильное кол-во ItemStorageSlotComponent.'), () => {
    expect(itemStorage.findComponentsByName<ItemStorageSlotComponent>(ItemStorageSlotComponent.name)).toHaveLength(expectedItemStorageSlotComponentLength);
});

test(sprintf('Каждый itemStorageSlotComponent instanceof ItemStorageSlotComponent.'), () => {
    expect(_.every(itemStorage.findComponentsByName(ItemStorageSlotComponent.name), (item) => {
        return item instanceof ItemStorageSlotComponent;
    })).toBeTruthy();
});