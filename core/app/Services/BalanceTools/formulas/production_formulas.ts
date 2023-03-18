import _ from 'lodash';

function requireItemsCount(values: {
    itemLevel: number,
    startValue: number,
    itemLevelIncreaseValue: number,
    itemCategoryCraftRatio: number,
}) {
    return _.round(
        (values.startValue + values.itemLevelIncreaseValue * ( values.itemLevel - 1 ) ) * values.itemCategoryCraftRatio
    );
}

function productionCost(values: {
    itemLevel: number,
    startValue: number,
    valueForItemLevel: number,
    itemCategoryCraftRatio: number,
}) {
    return _.round(
        ( values.startValue + values.valueForItemLevel * ( values.itemLevel - 1 ) ) * values.itemCategoryCraftRatio
    );
}

export const production_formulas = {
    requireItemsCount: requireItemsCount,
    productionCost: productionCost,
};