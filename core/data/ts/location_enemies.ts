import _ from 'lodash';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import {RangeType} from '../../types/main.js';

type TSDB_LocationEnemy = {
    [ID in LocationTypeID]?: {
        enemyTypeID: EnemyTypeID,
        count: RangeType,
    }[];
};

// let __ = {
//     type: ['Пустыня', 'Горы', 'Побережье и тд'],
// };

let location_enemies_data: TSDB_LocationEnemy = {
    [LocationTypeID.Forrest]: [
        {enemyTypeID: EnemyTypeID.Boar, count: {min: 4, max: 6}},
        {enemyTypeID: EnemyTypeID.Bear, count: {min: 1, max: 2}},
    ],
};

export const location_enemies = {
    find: function (locationTypeID: LocationTypeID, callback: (enemyTypeID: EnemyTypeID, count: RangeType) => void) {
        _.map(location_enemies_data[locationTypeID], (data) => {
            callback(data.enemyTypeID, data.count);
        });
    },
};