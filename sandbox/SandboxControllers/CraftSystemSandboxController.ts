import Production from '../../core/app/Components/Craft/Production.js';
import ProductionConfigurator from '../../core/app/Components/ProductionConfigurator.js';
import ItemStorage from '../../core/app/Components/ItemStorages/ItemStorage.js';
import Wallet from '../../core/app/Components/Wallet.js';
import Item from '../../core/app/Entities/Item.js';
import Recipe from '../../core/app/Entities/Recipe.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {separate} from '../../core/debug_functions.js';
import {EntityID} from '../../core/types/enums/EntityID.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import {RecipeID} from '../../core/types/enums/RecipeID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class CraftSystemSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devInfinityItemStorage();
        this._devCraft();
    }

    private _devInfinityItemStorage() {
        // let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);
        //
        // // let resourcesItemStorage = new ItemStorageV2();
        //
        // let resourcesItemStorage = new InfinityItemStorage(em);
        // // resourcesItemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10);
        // resourcesItemStorage._addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 100);
        // resourcesItemStorage._addItem(em.get<Item>(EntityID.Item, ItemID.IronOre), 100);
        // resourcesItemStorage._addItem(em.get<Item>(EntityID.Item, ItemID.Coal), 100);
        // resourcesItemStorage._addItem(em.get<Item>(EntityID.Item, ItemID.IronIngot), 100);
        // resourcesItemStorage._addItem(em.get<Item>(EntityID.Item, ItemID.Leather01), 100);
        // // let resourcesItemStorage = new EndlessItemStorage();
        //
        // // let resultItemStorage = new InfinityItemStorage();
        // let resultItemStorage = new ItemStorage(20, em);
        //
        // let woodBoards = em.get<Recipe>(EntityID.Recipe, RecipeID.WoodBoards);
        // let oneHandedSword01 = em.get<Recipe>(EntityID.Recipe, RecipeID.OneHandedSword01);
        // // console.log(woodBoards);
        //
        // // let craftQueue = new CraftQueue();
        // // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // // console.log(craftQueue.shift());
        // // console.log(craftQueue.shift());
        // // console.log(craftQueue.shift());
        // // console.log(craftQueue.shift());
        // // console.log(craftQueue.shift());
        // // console.log(craftQueue.shift());
        //
        // // console.log(resourcesItemStorage);
        // // console.log(craftQueue);
        //
        // let craftWorkbench = new CraftWorkbench(em);
        // // craftWorkbench.startCraft(craftQueue);
        // craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.WoodBoards), resourcesItemStorage);
        // // craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.OneHandedSword01), resourcesItemStorage);
        // // craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.OneHandedSword01), resourcesItemStorage);
        // // craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.PlateBreastplate01), resourcesItemStorage);
        // // craftWorkbench.addRecipe(woodBoards, resourcesItemStorage);
        // // craftWorkbench.addRecipe(woodBoards, resourcesItemStorage);
        // craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.IronIngot), resourcesItemStorage);
        // craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.OneHandedSword01), resourcesItemStorage);
        // // console.log(resourcesItemStorage);
        // // craftWorkbench.startCraft();
        // // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // // craftWorkbench.addRecipe(woodBoards, resourcesItemStorage);
        // // craftWorkbench.addRecipe(oneHandedSword01, resourcesItemStorage);
        // // craftWorkbench.startCraft();
        // // console.log(resourcesItemStorage);
        // // console.log(craftWorkbench);
        //
        // this.container.set('getResult', (container) => {
        //     return () => {
        //         craftWorkbench.getResult(resultItemStorage);
        //         console.log('resultItemStorage', resultItemStorage);
        //     };
        // });
    }

    private _devCraft() {
        let itemStorage = new ItemStorage(20);
        let wallet = new Wallet();
        // itemStorage.addItem(ItemID.IronIngot, 60);
        itemStorage.addItem(ItemID.IronIngot, 70);
        // itemStorage.addItem(ItemID.IronIngot, 121);
        // itemStorage.addItem(ItemID.IronIngot, 59);
        // itemStorage.addItem(ItemID.IronIngot, 0);
        itemStorage.debug();
        separate();

        let craft = new Production(
            this.container.get<EntityManagerInterface>(ServiceID.EntityManager),
        );

        let craftConfigurator = new ProductionConfigurator();
        craftConfigurator.configure(craft);
        console.log(craft);
        // craft.addItem(ItemID.Amulet01);
        // craft.addItem(ItemID.Uncommon_OneHandedSword_006_01);

        // craft.createItem(ItemID.Amulet01, itemStorage);
        craft.createItem(ItemID.Uncommon_OneHandedSword_006_01, itemStorage, wallet);
        craft.createItem(ItemID.Uncommon_OneHandedSword_006_01, itemStorage, wallet);

        itemStorage.debug();
    }
}