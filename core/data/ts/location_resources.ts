import _ from 'lodash';
import {ItemID} from '../../types/enums/ItemID.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import {RangeType} from '../../types/main.js';

type TSDB_LocationResource = {
    itemID: ItemID,
    count: RangeType,
};

type TSDB_LocationResourceBD = {
    [ID in LocationTypeID]?: TSDB_LocationResource[];
}

let resources: TSDB_LocationResourceBD = {
    [LocationTypeID.Forrest]: [
        // {itemID: ItemID.Wood, count: {min: 1000, max: 1000}},
        {itemID: ItemID.IronOre, count: {min: 1000, max: 1000}},
    ],
};

export const location_resources = {
    find: function<T> (locationTypeID: LocationTypeID, callback: (itemID: ItemID, count: RangeType) => T): T[] {
        return _.map(resources[locationTypeID], (value, index, collection) => {
            return callback(value.itemID, value.count);
        });
    },
};