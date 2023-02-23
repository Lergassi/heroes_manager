import _ from 'lodash';
import debug from 'debug';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import GenerateItemsByPattern
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/GenerateItemsByPattern.js';
import ItemAttributeGenerator
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/ItemAttributeGenerator.js';
import HeroCharacterAttributeGenerator from '../../core/app/Services/BalanceTools/HeroCharacterAttributeGenerator.js';
import {database} from '../../core/data/ts/database.js';
import {TSDB_Recipe, TSDB_RecipeDB} from '../../core/data/ts/recipes.js';
import EntityManager from '../../core/source/EntityManager.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import {TSDB_Item, TSDB_ItemDB} from '../../core/types/TSDB_Item.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class RecipeSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devGetStarted();
        // this._devDatabase();
        // this._devGenerator();
        this._devFileDB();
    }

    private _devDatabase() {
        console.log(database.recipes.data.resultCount(ItemID.Uncommon_Plate_Breastplate_9_01));
        database.recipes.data.requireItems(ItemID.Uncommon_Plate_Breastplate_9_01, (ID, count) => {
            console.log(ID, count);
        });
    }

    private _devGetStarted() {
        // this.container.get<EntityManager>(ServiceID.EntityManager).debug.items();
    }

    private _devGenerator() {
        let items: TSDB_ItemDB = {};
        let recipes: TSDB_RecipeDB = {};
        let generateItems = new GenerateItemsByPattern(
            this.container,
            this.container.get<ItemAttributeGenerator>(ServiceID.ItemAttributeGenerator),
            this.container.get<HeroCharacterAttributeGenerator>(ServiceID.HeroCharacterAttributeGenerator),
        );
        generateItems.run(items, recipes);
        console.log(items);
        console.log(recipes);
    }

    private _devFileDB() {
        database.recipes.data.requireItems(ItemID.Uncommon_Plate_Breastplate_121_01, (ID, count) => {
            console.log(ItemID.Uncommon_Plate_Breastplate_121_01, ID, count);
        });
    }
}

let recipe: {
    ID: string,
    resultItemID: ItemID,
    resultItemCount: string,
    requireItems: {itemID: ItemID, count: number},
};