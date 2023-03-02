import _ from 'lodash';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import {RangeType} from '../../types/main.js';

type TSDB_LocationEnemy = {
    enemyTypeID: EnemyTypeID,
    count: RangeType,
}

type TSDB_LocationEnemyDB = {
    [ID in LocationTypeID]?: TSDB_LocationEnemy[];
}

// let __ = {
//     type: ['Пустыня', 'Горы', 'Побережье и тд'],
// };

let enemies_db: TSDB_LocationEnemyDB = {
    [LocationTypeID.Forrest]: [
        // {enemyTypeID: EnemyTypeID.Boar, count: {min: 4, max: 6}},
        {enemyTypeID: EnemyTypeID.Boar, count: {min: 1000, max: 1000}},
        // {enemyTypeID: EnemyTypeID.Bear, count: {min: 1, max: 2}},
    ],
};

export const location_enemies = {
    find: function<T> (locationTypeID: LocationTypeID, callback: (enemyTypeID: EnemyTypeID, count: RangeType) => T): T[] {
        return _.map(enemies_db[locationTypeID], (data) => {
            return callback(data.enemyTypeID, data.count);
        });
    },
};