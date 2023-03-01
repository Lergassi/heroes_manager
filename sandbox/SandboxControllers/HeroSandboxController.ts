import AverageItemLevel from '../../core/app/Components/AverageItemLevel.js';
import DefaultEquipSlot from '../../core/app/Components/EquipSlots/DefaultEquipSlot.js';
import EquipSlotArmorMaterialRule from '../../core/app/Components/EquipSlots/EquipSlotArmorMaterialRule.js';
import EquipSlotItemCategoryRule from '../../core/app/Components/EquipSlots/EquipSlotItemCategoryRule.js';
import ItemCharacterAttributeCollector from '../../core/app/Components/ItemCharacterAttributeCollector.js';
import HeroClass from '../../core/app/Entities/HeroClass.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {debug_detailHero} from '../../core/debug/debug_functions.js';
import {ArmorMaterialID} from '../../core/types/enums/ArmorMaterialID.js';
import {EntityID} from '../../core/types/enums/EntityID.js';
import {EquipSlotID} from '../../core/types/enums/EquipSlotID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../core/types/enums/ItemCategoryID.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class HeroSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devEquip();
        // this._devEquipController();
        // this._devViewHero();
        // this._devCreateHeroWithStrategy();
        this._devEquipSlotRules();

        // this._useHeroFactory();
    }

    private _devEquip() {
        let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);

        let hero = heroFactory.create(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Warrior), 1);
        console.log(hero);

        // hero.get<EquipSlotInterface>(EquipSlotID.Head).equip(new ItemStack(em.get<Item>(EntityID.Item, ItemID.PlateHelmet01)));
        // hero.get<EquipSlotInterface>(EquipSlotID.Chest).equip(new ItemStack(em.get<Item>(EntityID.Item, ItemID.PlateBreastplate01)));
    }

    private _devEquipController() {
        let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);

        let hero = heroFactory.create(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Warrior), 1);
        console.log(hero);

        // console.log(hero.get<EquipSlotInterface>(EquipSlotID.Head));
        // hero.get<EquipSlotInterface>(EquipSlotID.Head).equip(em.get<Item>(EntityID.Item, ItemID.PlateHelmet01));
        // hero.get<EquipSlotInterface>(EquipSlotID.Chest).equip(em.get<Item>(EntityID.Item, ItemID.PlateBreastplate01));
        // console.log(hero.get<EquipSlotInterface>(EquipSlotID.Head));
        // hero.get<EquipSlotInterface>(EquipSlotID.Head).clear();
        // console.log(hero.get<EquipSlotInterface>(EquipSlotID.Head));
        // console.log(hero);

        // hero.get<EquipController>(ComponentID.EquipController).equip(EquipSlotID.Head, em.get<Item>(EntityID.Item, ItemID.PlateHelmet01));
        // hero.get<EquipController>(ComponentID.EquipController).equip(EquipSlotID.Head, em.get<Item>(EntityID.Item, ItemID.PlateHelmet01));
        // hero.get<EquipController>(ComponentID.EquipController).equip(EquipSlotID.Head, em.get<Item>(EntityID.Item, ItemID.PlateBreastplate01));
        // console.log(hero);
    }

    // private _devViewHero() {
    //     let em = this.container.get<EntityManagerInterface>(ContainerID.EntityManager);
    //     let heroFactory = this.container.get<HeroFactory>(ContainerID.HeroFactory);
    //
    //     let hero = heroFactory.create(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Warrior), 1);
    //     detailHeroView(hero);
    // }

    private _devCreateHeroWithStrategy() {
        let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);

        let level = 1;
        let heroClassID = HeroClassID.Warrior;
        // let hero = heroFactory.createByStrategy(level, heroClassID);
    }

    private _useHeroFactory() {
        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);

        let hero = heroFactory.create(HeroClassID.Warrior, 1);
        console.log('hero', hero);
        debug_detailHero(hero);
    }

    private _devEquipSlotRules() {
        let ID = EquipSlotID.Chest;
        let equipSlot = new DefaultEquipSlot(
            ID,
            new AverageItemLevel(),
            new ItemCharacterAttributeCollector(),
            [
                new EquipSlotItemCategoryRule([
                    // ItemCategoryID.OneHandedSwords,
                    ItemCategoryID.Breastplates,
                    // ItemCategoryID.Shields,
                ]),
                new EquipSlotArmorMaterialRule([
                    ArmorMaterialID.Plate,
                    // ArmorMaterialID.Leather,
                ]),
            ],
        );
        console.log(equipSlot);

        // let itemID = ItemID.Wood;
        let itemID = ItemID.OneHandedSword01;
        // let itemID = ItemID.PlateBreastplate01;
        // let itemID = ItemID.ClothBreastplate01;
        equipSlot.equip(itemID);

        this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1);
    }
}