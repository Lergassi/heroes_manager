import _ from 'lodash';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {targetIsNilAndReplacedReport} from '../../functions.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {ItemCount, ItemCountDBType, ItemLoot, RangeType} from '../../types/main.js';

type TSDB_ItemLoot = {
    ID: ItemID,
    count: RangeType,
    chance: number,
}

type TSDB_EnemyLoot = {
    items: TSDB_ItemLoot[],
    exp: number,
    money: RangeType,
}

type TSDB_EnemyLootDB = {
    [ID in EnemyTypeID]?: TSDB_EnemyLoot;
};

let enemy_loot_data: TSDB_EnemyLootDB = {
    [EnemyTypeID.Boar]: {
        exp: 42,
        items: [
            {ID: ItemID.Wood, count: {min: 0, max: 2}, chance: 1},
            {ID: ItemID.Skin01, count: {min: 2, max: 4}, chance: 1},
            {ID: ItemID.Leather01, count: {min: 0, max: 1}, chance: 1},
        ],
        money: {min: 100, max: 200},
    },
};

export const enemy_loot = {
    items: function (enemyTypeID: EnemyTypeID, callback: (itemID: ItemID, count: RangeType, chance: number) => void): void {
        _.map(enemy_loot_data[enemyTypeID]?.items, (data) => {
            callback(data.ID, data.count, data.chance);
        });
    },
    exp: function (enemyTypeID: EnemyTypeID): number {
        return enemy_loot_data[enemyTypeID]?.exp ?? 0;
    },
    money: function (enemyTypeID: EnemyTypeID): RangeType {
        return enemy_loot_data[enemyTypeID]?.money ?? {min: 0, max: 0};
    },
};