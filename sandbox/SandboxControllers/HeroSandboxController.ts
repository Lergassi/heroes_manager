import _ from 'lodash';
import debug from 'debug';
import AbstractSandboxController from './AbstractSandboxController.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import HeroClass from '../../core/app/Entities/HeroClass.js';
import {EntityID} from '../../core/types/enums/EntityID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import EquipSlotInterface from '../../core/app/Interfaces/EquipSlotInterface.js';
import {EquipSlotID} from '../../core/types/enums/EquipSlotID.js';
import ItemStack from '../../core/app/RuntimeObjects/ItemStack.js';
import Item from '../../core/app/Entities/Item.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import {detailHeroView} from '../../core/views.js';
import EquipController from '../../core/app/Components/EquipController.js';
import {ComponentID} from '../../core/types/enums/ComponentID.js';

export default class HeroSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devEquip();
        this._devEquipController();
        // this._devViewHero();
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
        hero.get<EquipController>(ComponentID.EquipController).equip(EquipSlotID.Head, em.get<Item>(EntityID.Item, ItemID.PlateBreastplate01));
        console.log(hero);
    }

    // private _devViewHero() {
    //     let em = this.container.get<EntityManagerInterface>(ContainerID.EntityManager);
    //     let heroFactory = this.container.get<HeroFactory>(ContainerID.HeroFactory);
    //
    //     let hero = heroFactory.create(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Warrior), 1);
    //     detailHeroView(hero);
    // }
}