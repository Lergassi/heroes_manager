import AbstractSandboxController from './AbstractSandboxController.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import {EntityID} from '../../core/types/enums/EntityID.js';
import Recipe from '../../core/app/Entities/Recipe.js';
import {RecipeID} from '../../core/types/enums/RecipeID.js';
import EndlessItemStorage from '../../core/app/Components/EndlessItemStorage.js';
import CraftWorkbench from '../../core/app/Services/CraftWorkbench.js';
import {debugItemStorage} from '../../core/debug/debug_functions.js';
import Item from '../../core/app/Entities/Item.js';
import InfinityItemStorage from '../../core/app/Components/InfinityItemStorage.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import CraftQueue from '../../core/app/Services/CraftQueue.js';
import ItemStorageV2 from '../../core/app/Components/ItemStorageV2.js';

export default class CraftSystemSandboxController extends AbstractSandboxController {
    run(): void {
        this._getStarted();
    }

    private _getStarted() {
        let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);

        // let resourcesItemStorage = new ItemStorageV2();

        let resourcesItemStorage = new InfinityItemStorage(em);
        // resourcesItemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10);
        resourcesItemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 100);
        resourcesItemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.IronOre), 100);
        resourcesItemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Coal), 100);
        resourcesItemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.IronIngot), 100);
        resourcesItemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Leather01), 100);
        // let resourcesItemStorage = new EndlessItemStorage();

        // let resultItemStorage = new InfinityItemStorage();
        let resultItemStorage = new ItemStorageV2(20, em);

        let woodBoards = em.get<Recipe>(EntityID.Recipe, RecipeID.WoodBoards);
        let oneHandedSword01 = em.get<Recipe>(EntityID.Recipe, RecipeID.OneHandedSword01);
        // console.log(woodBoards);

        // let craftQueue = new CraftQueue();
        // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // craftQueue.addRecipe(woodBoards, resourcesItemStorage);
        // console.log(craftQueue.shift());
        // console.log(craftQueue.shift());
        // console.log(craftQueue.shift());
        // console.log(craftQueue.shift());
        // console.log(craftQueue.shift());
        // console.log(craftQueue.shift());

        // console.log(resourcesItemStorage);
        // console.log(craftQueue);

        let craftWorkbench = new CraftWorkbench(em);
        // craftWorkbench.startCraft(craftQueue);
        craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.WoodBoards), resourcesItemStorage);
        // craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.OneHandedSword01), resourcesItemStorage);
        // craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.OneHandedSword01), resourcesItemStorage);
        // craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.PlateBreastplate01), resourcesItemStorage);
        // craftWorkbench.addRecipe(woodBoards, resourcesItemStorage);
        // craftWorkbench.addRecipe(woodBoards, resourcesItemStorage);
        craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.IronIngot), resourcesItemStorage);
        craftWorkbench.addRecipe(em.get<Recipe>(EntityID.Recipe, RecipeID.OneHandedSword01), resourcesItemStorage);
        // console.log(resourcesItemStorage);
        // craftWorkbench.startCraft();
        // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // craftWorkbench.cancelRecipe(resourcesItemStorage);
        // craftWorkbench.addRecipe(woodBoards, resourcesItemStorage);
        // craftWorkbench.addRecipe(oneHandedSword01, resourcesItemStorage);
        // craftWorkbench.startCraft();
        // console.log(resourcesItemStorage);
        // console.log(craftWorkbench);

        this.container.set('getResult', (container) => {
            return () => {
                craftWorkbench.getResult(resultItemStorage);
                console.log('resultItemStorage', resultItemStorage);
            };
        });
    }
}