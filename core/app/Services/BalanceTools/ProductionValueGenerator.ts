import {ItemID} from '../../../types/enums/ItemID';
import {production_formulas} from './formulas/production_formulas';
import config from '../../../config/config';
import {ItemCategoryID} from '../../../types/enums/ItemCategoryID';
import {database} from '../../../data/ts/database';
import {ItemAttributeID} from '../../../types/enums/ItemAttributeID';
import {ProductionID} from '../../../types/enums/ProductionID';

export class ProductionValueGenerator {
    requireItemsCount(productionID: ProductionID, itemLevel: number, resourceID: ItemID, itemCategoryID: ItemCategoryID) {
        return production_formulas.requireItemsCount({
            itemLevel: itemLevel,
            startValue: config.production_start_item_level[productionID]?.[resourceID] ?? 0,
            itemLevelIncreaseValue: config.production_increase_item_level[productionID]?.[resourceID] ?? 0,
            itemCategoryCraftRatio: database.item_categories.ratios.ratioByItemAttribute(itemCategoryID, ItemAttributeID.CraftRatio),
        });
    }

    productionCost(itemLevel: number, itemCategoryID: ItemCategoryID) {
        return production_formulas.productionCost({
            itemLevel: itemLevel,
            startValue: config.start_equip_production_cost,
            valueForItemLevel: config.equip_item_level_increase_production_cost,
            itemCategoryCraftRatio: database.item_categories.ratios.ratioByItemAttribute(itemCategoryID, ItemAttributeID.CraftRatio),
        });
    }
}