import _ from 'lodash';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';


type TSDB_LocationEnemy = {
    [ID in LocationTypeID]?: EnemyTypeID[];
};

let __ = {
    type: ['Пустыня', 'Горы', 'Побережье и тд'],
};

let location_enemies_data: TSDB_LocationEnemy = {
    [LocationTypeID.Forrest]: [
        EnemyTypeID.Boar,
        EnemyTypeID.Bear,
    ],
};

export const location_enemies = {
    find: function (locationTypeID: LocationTypeID, callback: (enemyTypeID: EnemyTypeID) => void) {
        _.map(location_enemies_data[locationTypeID], (data) => {
            callback(data);
        });
    },
};