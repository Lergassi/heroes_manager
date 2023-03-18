import {BuildingID} from '../../types/enums/BuildingID';
import {ItemCount} from '../../types/main';
import {ItemID} from '../../types/enums/ItemID';

type TSDB_Building = {
    ID: BuildingID;
    requireItems: ItemCount[];
}

type TSDB_BuildingDB = {
    [ID in BuildingID]?: TSDB_Building;
}

let db: TSDB_BuildingDB = {
    [BuildingID.CoalMine]: {
        ID: BuildingID.CoalMine,
        requireItems: [
            {itemID: ItemID.Wood, count: 10},
        ],
    },
    [BuildingID.IronOreMine]: {
        ID: BuildingID.IronOreMine,
        requireItems: [
            {itemID: ItemID.Wood, count: 10},
        ],
    },
    [BuildingID.CopperOreMine]: {
        ID: BuildingID.CopperOreMine,
        requireItems: [
            {itemID: ItemID.Wood, count: 5},
        ],
    },
};

export const buildings = {
    find: function (ID: BuildingID): TSDB_Building {
        return db[ID]?.ID ? _.assign({}, db[ID]) : null;
    },
}