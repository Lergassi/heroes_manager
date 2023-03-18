import AbstractSandboxController from './AbstractSandboxController';
import ItemAttributeGenerator
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/ItemAttributeGenerator';
import {ServiceID} from '../../core/types/enums/ServiceID';
import HeroCharacterAttributeGenerator from '../../core/app/Services/BalanceTools/HeroCharacterAttributeGenerator';
import {ItemCount} from '../../core/types/main';
import {ItemID} from '../../core/types/enums/ItemID';
import debug from 'debug';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID';
import {DebugFormatterID} from '../../core/types/enums/DebugFormatterID';
import {ProductionValueGenerator} from '../../core/app/Services/BalanceTools/ProductionValueGenerator';
import GenerateItemsByPattern
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/GenerateItemsByPattern';
import {TSDB_ItemDB} from '../../core/data/ts/items';
import {TSDB_RecipeDB} from '../../core/data/ts/recipes';
import {ItemCategoryID} from '../../core/types/enums/ItemCategoryID';
import {ProductionID} from '../../core/types/enums/ProductionID';

export class ToolsSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devProductionBalance();
        // this._tests();

        this._use_generateEquip();
    }

    private _devProductionBalance() {
        let heroCharacterAttributeGenerator = this.container.get<HeroCharacterAttributeGenerator>(ServiceID.HeroCharacterAttributeGenerator);
        // let productionValueGenerator = this.container.get<ProductionValueGenerator>(ServiceID.ProductionValueGenerator);
        let productionValueGenerator = new ProductionValueGenerator();

        let maxHeroLevel = 100;
        let maxItemLevel = heroCharacterAttributeGenerator.heroLevelCorrespondsToItemLevel(maxHeroLevel);
        // let maxItemLevel = this.container.get<ItemAttributeGenerator>()

        let startIronOreGathering = {
            value: 50,
            period: 60,
        };

        let startBlacksmithCostProduction = 50;
        let itemLevelBlacksmithIncreaseCostProduction = 10;

        let startBlacksmithIronIngot = 20;
        let itemLevelBlacksmithIncreaseIronIngot = 10;

        let startBlacksmithCopperIngot = 10;
        let itemLevelBlacksmithIncreaseCopperIngot = 5;

        for (let itemLevel = 1; itemLevel <= maxItemLevel; itemLevel++) {
            let requiresItems: ItemCount[] = [];
            requiresItems.push({
                itemID: ItemID.IronIngot,
                // count: startBlacksmithIronIngot + itemLevelBlacksmithIncreaseIronIngot * ( itemLevel - 1 ),
                count: productionValueGenerator.requireItemsCount(ProductionID.Blacksmith, itemLevel, ItemID.IronIngot, ItemCategoryID.Breastplates),
                // count: productionValueGenerator.requireItemsCount(itemLevel, ItemID.CottonCloth),
            });
            requiresItems.push({
                itemID: ItemID.CopperIngot,
                // count: startBlacksmithCopperIngot + itemLevelBlacksmithIncreaseCopperIngot * ( itemLevel - 1 ),
                count: productionValueGenerator.requireItemsCount(ProductionID.Blacksmith, itemLevel, ItemID.CopperIngot, ItemCategoryID.Breastplates),
            });
            debug(DebugNamespaceID.Log)(DebugFormatterID.Json, [itemLevel, requiresItems]);
        }
    }

    private _tests() {
        // for (let i = 1; i <= maxHeroLevel; i++) {
        //     console.log(i, heroCharacterAttributeGenerator.heroLevelCorrespondsToItemLevel(i));
        // }
    }

    private _use_generateEquip() {
        let generateItemsByPattern = new GenerateItemsByPattern(
            this.container.get<ItemAttributeGenerator>(ServiceID.ItemAttributeGenerator),
            this.container.get<HeroCharacterAttributeGenerator>(ServiceID.HeroCharacterAttributeGenerator),
            this.container.get<ProductionValueGenerator>(ServiceID.ProductionValueGenerator),
        );

        let items: TSDB_ItemDB = {};
        let recipes: TSDB_RecipeDB = {};
        generateItemsByPattern.run(items, recipes);
        console.log(items);
        console.log(recipes);
    }
}