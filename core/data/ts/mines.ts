import {BuildingID} from '../../types/enums/BuildingID';
import {ItemID} from '../../types/enums/ItemID';

type TSDB_Mine = {
    buildingID: BuildingID;
    resultItemID: ItemID;
    interval: number;
    countForInterval: number;
}

type TSDB_MineDB = {
    [ID in BuildingID]?: TSDB_Mine;
}

let db: TSDB_MineDB = {
    [BuildingID.CoalMine]: {
        buildingID: BuildingID.CoalMine,
        resultItemID: ItemID.Coal,
        interval: 10,
        countForInterval: 10,
    },
    [BuildingID.IronOreMine]: {
        buildingID: BuildingID.IronOreMine,
        resultItemID: ItemID.IronOre,
        interval: 10,
        countForInterval: 20,
    },
    [BuildingID.CopperOreMine]: {
        buildingID: BuildingID.CopperOreMine,
        resultItemID: ItemID.CopperOre,
        interval: 10,
        countForInterval: 10,
    },
};

export const mines = {
    find: function (buildingID: BuildingID): TSDB_Mine {
        return db[buildingID] ? _.assign({}, db[buildingID]) : null;
    }
};