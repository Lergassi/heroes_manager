import _ from 'lodash';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {targetIsNilAndReplacedReport} from '../../functions.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {ItemCount, ItemCountDBType, ItemLoot, RangeType} from '../../types/main.js';

export type EnemyLootDBType = {
    enemyTypeID: EnemyTypeID,
    loot: EnemyLootItemDBType[],
    exp: number,
    money: {min: number, max: number},
};

export type EnemyLootItemDBType = {
    ID: ItemID;
    count: RangeType;
    chance: number;
};

let enemy_loot_data: EnemyLootDBType[] = [
    {
        enemyTypeID: EnemyTypeID.Boar,
        loot: [
            {ID: ItemID.Skin01, count: {min: 4, max: 2}, chance: 10},
        ],
        exp: 100,
        money: {max: 100, min: 200},
    },
    // {
    //     enemyTypeID: EnemyTypeID.EnemyType02,
    //     loot: [
    //         {ID: ItemID.Wood, count: {max: 12, min: 22}, chance: 80},
    //         {ID: ItemID.IronOre, count: {max: 4, min: 12}, chance: 50},
    //         {ID: ItemID.OneHandedSword01, count: {max: 1, min: 1}, chance: 10},
    //     ],
    //     exp: 42,
    //     money: {max: 100, min: 200},
    // },
];

let empty: EnemyLootDBType = {enemyTypeID: undefined, exp: 0, loot: [], money: {max: 0, min: 0}};

export const enemy_loot = {
    find: (enemyTypeID: EnemyTypeID): EnemyLootDBType => {
        let enemyLootDBData = _.find(enemy_loot_data, (item) => {
            return item.enemyTypeID === enemyTypeID;
        });

        targetIsNilAndReplacedReport(enemyLootDBData, sprintf('Данные "enemy_loot" для %s не найдены, и заменены на нулевые значения.', JSON.stringify({
            enemyTypeID: enemyTypeID,
        })));

        return enemyLootDBData ?? empty;
    },
};