import DefaultContainerConfigure from '../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import Container from '../core/source/Container.js';
import CoreContainerConfigure from '../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import HeroClass from '../core/app/Entities/HeroClass.js';
import EquipSlot from '../core/app/Entities/EquipSlot.js';
import EquipSlotComponent from '../core/app/Components/EquipSlotComponent.js';
import _ from 'lodash';
import ItemStackFactory from '../core/app/Factories/ItemStackFactory.js';
import {sprintf} from 'sprintf-js';
import HeroComponent from '../core/app/Components/HeroComponent.js';
import {HeroClassID} from '../core/types/enums/HeroClassID.js';
import {EquipSlotID} from '../core/types/enums/EquipSlotID.js';
import {ItemID} from '../core/types/enums/ItemID.js';
import {ServiceID} from '../core/types/enums/ServiceID.js';
import EntityManagerInterface from '../core/app/Interfaces/EntityManagerInterface.js';

let container = new Container();
(new DefaultContainerConfigure()).configure(container);
(new CoreContainerConfigure()).configure(container);

let heroClass = container.get<EntityManagerInterface>(ServiceID.EntityManager).getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior);
let equipSlot = container.get<EntityManagerInterface>(ServiceID.EntityManager).getRepository<EquipSlot>(EquipSlot.name).getOneByAlias(EquipSlotID.Head);
let availableItemStack = container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlateHelmet01);

let hero = container.get<HeroFactory>(ServiceID.HeroFactory).create(
    heroClass,
    1,
);
let equipSlotComponent = _.filter(hero.findComponentsByName<EquipSlotComponent>(EquipSlotComponent.name), (equipSlotComponent) => {
    return equipSlotComponent.equipSlot === equipSlot;
})[0];

describe('Test available item category.', () => {
    // test(sprintf('ItemStack with item "%s" available for equip slot "%s".', availableItemStack.item.name, equipSlotComponent.equipSlot.name), () => {
    // test(sprintf('ItemStack with item "%s" available for equip slot "%s".', availableItemStack.item.name, equipSlotComponent.equipSlot['_name']/*todo: Доступ.*/), () => {
    test(sprintf('ItemStack with item "%s" available for equip slot "%s".', undefined, equipSlotComponent.equipSlot['_name']/*todo: Доступ.*/), () => {
        expect(equipSlotComponent.placeItemStack(availableItemStack)).toBeTruthy();
        equipSlotComponent.clear();
    });
});


describe.each([
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlateBreastplate01)],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlateBelt01)],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlateBracer01)],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlateGloves01)],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlateShoulders01)],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlateBoots01)],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlatePants01)],
])('Test not available item category.', (a) => {
    // test(sprintf('ItemStack with item "%s" not available for equip slot "%s".', a.item.name, equipSlotComponent.equipSlot.name), () => {
    // test(sprintf('ItemStack with item "%s" not available for equip slot "%s".', a.item.name, equipSlotComponent.equipSlot['_name']/*todo: Доступ.*/), () => {
    test(sprintf('ItemStack with item "%s" not available for equip slot "%s".', undefined, equipSlotComponent.equipSlot['_name']/*todo: Доступ.*/), () => {
        expect(() => {
            equipSlotComponent.placeItemStack(a);
        }).toThrow();
    });
});

describe.each([
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlateHelmet01)],
    // [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.LeatherHelmet_01)],
])('Test available armor material.', (a) => {
    // test(sprintf('ItemStack with armor material "%s" available for hero class "%s".', a.item.armorMaterial.name, hero.getComponentByName<HeroComponent>(HeroComponent.name).heroClass.name), () => {
    test(sprintf('ItemStack with armor material "%s" available for hero class "%s".', undefined, hero.getComponentByName<HeroComponent>(HeroComponent.name).heroClassID.name), () => {
        expect(equipSlotComponent.placeItemStack(a)).toBeTruthy();
        equipSlotComponent.clear();
    });

});


describe.each([
    // [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.PlateHelmet_01)],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.LeatherHelmet01)],
    [container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(ItemID.ClothHelmet01)],
])('Test not available armor material.', (a) => {
    // test(sprintf('ItemStack with armor material "%s" not available for hero class "%s".', a.item.armorMaterial.name, hero.getComponentByName<HeroComponent>(HeroComponent.name).heroClass.name), () => {
    test(sprintf('ItemStack with armor material "%s" not available for hero class "%s".', undefined, hero.getComponentByName<HeroComponent>(HeroComponent.name).heroClassID.name), () => {
        expect(() => {
            equipSlotComponent.placeItemStack(a);
        }).toThrow();
    });
});