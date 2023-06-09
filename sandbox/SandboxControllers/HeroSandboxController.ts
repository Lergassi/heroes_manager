import ActionStateController from '../../core/app/Components/ActionStateController.js';
import AverageItemLevel from '../../core/app/Components/AverageItemLevel.js';
import CharacterAttribute from '../../core/app/Components/CharacterAttribute.js';
import CharacterAttributeManager from '../../core/app/Components/CharacterAttributeManager.js';
import Endurance from '../../core/app/Components/Endurance.js';
import DefaultEquipSlot from '../../core/app/Components/EquipSlots/DefaultEquipSlot.js';
import EquipSlotArmorMaterialRule from '../../core/app/Components/EquipSlots/EquipSlotArmorMaterialRule.js';
import EquipSlotItemCategoryRule from '../../core/app/Components/EquipSlots/EquipSlotItemCategoryRule.js';
import Experience from '../../core/app/Components/Experience.js';
import HealthPoints from '../../core/app/Components/HealthPoints.js';
import HealthPointsController from '../../core/app/Components/HealthPointsController.js';
import HeroClass from '../../core/app/Entities/HeroClass.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import ItemStorageFactory from '../../core/app/Factories/ItemStorageFactory.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import HeroCharacterAttributeGenerator from '../../core/app/Services/BalanceTools/HeroCharacterAttributeGenerator.js';
import {debug_detailHero} from '../../core/debug/debug_functions.js';
import {ArmorMaterialID} from '../../core/types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../../core/types/enums/CharacterAttributeID.js';
import {ComponentID} from '../../core/types/enums/ComponentID.js';
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
        // this._devEquipSlotRules();
        // this._devCharacterAttributeManager();
        // this._devHealthPointsController();
        // this._devEndurance();
        this._devIncreaseCharacterAttributeByLevelUp();

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
        let hero = this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1);
        let characterAttributeManager = new CharacterAttributeManager(hero);

        let ID = EquipSlotID.Chest;
        let equipSlot = new DefaultEquipSlot(
            ID,
            new AverageItemLevel(),
            characterAttributeManager,
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

    private _devCharacterAttributeManager() {

    }

    private _devHealthPointsController() {
        let itemStorage = this.container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(20);
        itemStorage.addItem(ItemID.HealthPotion01, 10);

        let healPoints = new HealthPoints(
            new CharacterAttribute(CharacterAttributeID.MaxHealthPoints, 100),
            new ActionStateController(),
        );
        itemStorage.debug();
        healPoints.debug();
        // healPoints.kill();

        healPoints.damage(99);
        healPoints.debug();

        let healPointsController = new HealthPointsController(
            healPoints,
        );

        healPointsController.update(itemStorage);
        healPointsController.update(itemStorage);
        healPointsController.update(itemStorage);
        healPointsController.update(itemStorage);
        healPointsController.update(itemStorage);
        healPoints.debug();
    }

    private _devEndurance() {
        let actionStateController = new ActionStateController();
        let endurance = new Endurance(actionStateController);

        // actionStateController.addState(CharacterActionStateCode.Dead);
        endurance.remove(0);

        console.log(actionStateController);
        console.log(endurance);
        console.log(actionStateController.canAction());
    }

    private _devIncreaseCharacterAttributeByLevelUp() {
        // hero_classes.mainCharacterAttributes(HeroClassID.Warrior, (ID, ratio) => {
        //     console.log(ID, ratio);
        // });
        // console.log(hero_classes.armorMaterials(HeroClassID.Warrior, (ID, a, b) => {
        //     console.log(ID, a, b);
        // }));
        let generator = new HeroCharacterAttributeGenerator();

        let heroClassID = HeroClassID.Warrior;
        // let heroClassID = HeroClassID.Paladin;
        let level = 2;
        let maxLevel = 100;
        // console.log(generator.baseHeroMaxHealthPoints(level, heroClassID));
        // console.log(generator.baseHeroMaxHealthPoints(level - 1, heroClassID));
        // console.log(level, generator.increaseForLevel(level++, heroClassID));

        // while (level <= maxLevel) {
        //     console.log(level, generator.increaseForLevel(level, heroClassID), generator.baseHeroMaxHealthPoints(level, heroClassID), generator.baseHeroMaxHealthPoints(level - 1, heroClassID));
        //     level++;
        // }

        let hero = this.container.get<HeroFactory>(ServiceID.HeroFactory).create(heroClassID, 1);
        debug_detailHero(hero);

        hero.get<Experience>(ComponentID.Experience).addExp(200);
        debug_detailHero(hero);
    }
}