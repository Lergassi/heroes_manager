import {BuildingID} from '../../types/enums/BuildingID';
import {ItemCount} from '../../types/main';
import {ItemID} from '../../types/enums/ItemID';

type TSDB_Building = {
    ID: BuildingID;
    requireItems: ItemCount[];
    cost: number;
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
        cost: 0,
    },
    [BuildingID.IronOreMine]: {
        ID: BuildingID.IronOreMine,
        requireItems: [
            {itemID: ItemID.Wood, count: 10},
        ],
        cost: 0,
    },
    [BuildingID.CopperOreMine]: {
        ID: BuildingID.CopperOreMine,
        requireItems: [
            {itemID: ItemID.Wood, count: 5},
        ],
        cost: 0,
    },
    [BuildingID.GardenBed]: {
        ID: BuildingID.GardenBed,
        requireItems: [
            {itemID: ItemID.Wood, count: 5},
        ],
        cost: 42,
    },
};

export const buildings = {
    find: function (ID: BuildingID): TSDB_Building {
        //копия
        return db[ID]?.ID ? _.assign({}, db[ID]) : null;
    },
}