import {ItemID} from '../../types/enums/ItemID';

type TSDB_Seed = {
    itemID: ItemID;
    resultItemID: ItemID;
    resultItemsCount: number;
    growthDuration: number;
}

type TSDB_SeedDB = {
    [ID in ItemID]?: TSDB_Seed;
}

let db: TSDB_SeedDB = {
    [ItemID.CottonSeed]: {
        itemID: ItemID.CottonSeed,
        resultItemID: ItemID.Cotton,
        resultItemsCount: 2,
        growthDuration: 30,
    },
    [ItemID.Herb01Seed]: {
        itemID: ItemID.Herb01Seed,
        resultItemID: ItemID.Herb01,
        resultItemsCount: 8,
        growthDuration: 15,
    },
    [ItemID.Herb02Seed]: {
        itemID: ItemID.Herb02Seed,
        resultItemID: ItemID.Herb02,
        resultItemsCount: 4,
        growthDuration: 30,
    },
};

export const seeds = {
    find: function (itemID: ItemID): TSDB_Seed {
        return db[itemID] ? _.assign({}, db[itemID]) : null;
    }
};