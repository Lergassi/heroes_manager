import DefaultContainerConfigure from '../core/app/DefaultContainerConfigure.js';
import Container from '../core/source/Container.js';
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import EntityManager from '../core/source/EntityManager.js';
import HeroClass from '../core/app/Entities/HeroClass.js';
import EquipSlot from '../core/app/Entities/EquipSlot.js';
import EquipSlotComponent from '../core/app/Components/EquipSlotComponent.js';
import _ from 'lodash';
import sum from '../test_objects/sum.js';
import ItemStackFactory from '../core/app/Factories/ItemStackFactory.js';
import AppError from '../core/source/AppError.js';
import TestObjectLink from '../test/Serialize/SupportObjects/TestObjectLink.js';
import TestObjectWithLink from '../test/Serialize/TestObjectWithLink.js';
import {sprintf} from 'sprintf-js';
import ItemStack from '../core/app/RuntimeObjects/ItemStack.js';
import HeroComponent from '../core/app/Components/HeroComponent.js';

let container = new Container();
(new DefaultContainerConfigure()).configure(container);
(new CoreContainerConfigure()).configure(container);

let heroClass = container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior');
let equipSlot = container.get<EntityManager>('core.entityManager').getRepository<EquipSlot>(EquipSlot.name).getOneByAlias('equip_slot_head');
let availableItemStack = container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_helmet_01');

let hero = container.get<HeroFactory>('core.heroFactory').create(heroClass);
let equipSlotComponent = _.filter(hero.findComponentsByName<EquipSlotComponent>(EquipSlotComponent.name), (equipSlotComponent) => {
    return equipSlotComponent.equipSlot === equipSlot;
})[0];

describe('Test available item category.', () => {
    test(sprintf('ItemStack with item "%s" available for equip slot "%s".', availableItemStack.item.name, equipSlotComponent.equipSlot.name), () => {
        expect(equipSlotComponent.placeItemStack(availableItemStack)).toBeTruthy();
        equipSlotComponent.clear();
    });
});


describe.each([
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_breastplate_01')],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_belt_01')],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_bracer_01')],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_gloves_01')],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_shoulders_01')],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_boots_01')],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_pants_01')],
])('Test not available item category.', (a) => {
    test(sprintf('ItemStack with item "%s" not available for equip slot "%s".', a.item.name, equipSlotComponent.equipSlot.name), () => {
        expect(() => {
            equipSlotComponent.placeItemStack(a);
        }).toThrow();
    });
});

describe.each([
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_helmet_01')],
    // [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_leather_helmet_01')],
])('Test available armor material.', (a) => {
    test(sprintf('ItemStack with armor material "%s" available for hero class "%s".', a.item.armorMaterial.name, hero.getComponentByName<HeroComponent>(HeroComponent.name).heroClass.name), () => {
        expect(equipSlotComponent.placeItemStack(a)).toBeTruthy();
        equipSlotComponent.clear();
    });

});


describe.each([
    // [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_helmet_01')],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_leather_helmet_01')],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_cloth_helmet_01')],
])('Test not available armor material.', (a) => {
    test(sprintf('ItemStack with armor material "%s" not available for hero class "%s".', a.item.armorMaterial.name, hero.getComponentByName<HeroComponent>(HeroComponent.name).heroClass.name), () => {
        expect(() => {
            equipSlotComponent.placeItemStack(a);
        }).toThrow();
    });
});