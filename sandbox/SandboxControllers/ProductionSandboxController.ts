import Production from '../../core/app/Components/Production';
import ProductionConfigurator from '../../core/app/Components/ProductionConfigurator.js';
import ItemStorage from '../../core/app/Components/ItemStorages/ItemStorage.js';
import Wallet from '../../core/app/Components/Wallet.js';
import {separate} from '../../core/debug_functions.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import AbstractSandboxController from './AbstractSandboxController.js';
// import fns, {differenceInSeconds} from 'date-fns';
import {BuildingID} from '../../core/types/enums/BuildingID';
import {Construction} from '../../core/app/Components/Construction';
import {MineFactory} from '../../core/app/Factories/MineFactory';
import {Farming} from '../../core/app/Components/Farming';

export default class ProductionSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devInfinityItemStorage();
        // this._devCraft();
        // this._devV2();
        // this._devBuildings();
        this._devFarming();
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

        let craft = new Production();

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

    private _devV2() {
        let blacksmith = new Production();
        console.log(blacksmith);
    }

    private _devBuildings() {
        // let date1 = new Date('03.15.2022');
        // console.log(date1);
        // let now = new Date();
        // // console.log(now - date1);
        // console.log(fns);
        // // console.log(differenceInSeconds(now, date1));
        // console.log(fns.differenceInSeconds(now, date1));
        // // console.log(fns.differenceInSeconds(date1, now));

        // let mine = new Mining(ItemID.IronOre, 10, 1);
        // let mine = new Mine(ItemID.IronOre, 20, 60);
        // console.log(mine);

        // console.log(database.buildings.find(BuildingID.IronOreMine));
        // console.log(database.buildings.find(BuildingID.CopperOreMine));

        let construction = new Construction(
            new MineFactory(),
        );
        let itemStorage = new ItemStorage(20);
        itemStorage.addItem(ItemID.Wood, 100);

        construction.build(BuildingID.IronOreMine, itemStorage, undefined);
    }

    private _devFarming() {
        // console.log(database.seeds.find(ItemID.Herb01Seed));
        // console.log(database.seeds.find(ItemID.IronOre));

        let itemStorage = new ItemStorage(10);
        itemStorage.addItem(ItemID.Wood, 123);
        itemStorage.addItem(ItemID.Herb01Seed, 10);

        // let money = 0;
        // let money = 41;
        let money = 100;
        let wallet = new Wallet(money);

        let farming = new Farming();

        farming.buildGardenBed(itemStorage, wallet);

        farming.plant(0, ItemID.Herb01Seed, itemStorage);
    }
}