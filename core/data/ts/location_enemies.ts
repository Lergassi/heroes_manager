import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import _ from 'lodash';

export type LocationEnemyChanceDBType = {enemy: EnemyTypeID, change: number};

export type LocationEnemyDBType = {
    locationLevelRange: number[],
    enemies: LocationEnemyChanceDBType[],
};

let data: LocationEnemyDBType[] = [
    {
        locationLevelRange: [1, 10],
        enemies: [
            {enemy: EnemyTypeID.EnemyType01, change: 100},
            {enemy: EnemyTypeID.EnemyType02, change: 100},
            {enemy: EnemyTypeID.EnemyType03, change: 100},
            {enemy: EnemyTypeID.EnemyType04, change: 100},
            {enemy: EnemyTypeID.EnemyType05, change: 60},
            // {enemy: EnemyTypeID.EnemyType06, change: 60},
            // {enemy: EnemyTypeID.EnemyType07, change: 40},
            // {enemy: EnemyTypeID.EnemyType08, change: 40},
            // {enemy: EnemyTypeID.EnemyType09, change: 20},
            // {enemy: EnemyTypeID.EnemyType10, change: 20},
        ],
    },
    {
        locationLevelRange: [10, 20],
        enemies: [
            {enemy: EnemyTypeID.EnemyType11, change: 100},
            {enemy: EnemyTypeID.EnemyType12, change: 100},
            {enemy: EnemyTypeID.EnemyType13, change: 100},
            {enemy: EnemyTypeID.EnemyType14, change: 100},
            {enemy: EnemyTypeID.EnemyType15, change: 60},
            // {enemy: EnemyTypeID.EnemyType16, change: 60},
            // {enemy: EnemyTypeID.EnemyType17, change: 40},
            // {enemy: EnemyTypeID.EnemyType18, change: 40},
            // {enemy: EnemyTypeID.EnemyType19, change: 20},
            // {enemy: EnemyTypeID.EnemyType20, change: 20},
        ],
    },
    {
        locationLevelRange: [20, 30],
        enemies: [
            {enemy: EnemyTypeID.EnemyType21, change: 100},
            {enemy: EnemyTypeID.EnemyType22, change: 100},
            {enemy: EnemyTypeID.EnemyType23, change: 100},
            {enemy: EnemyTypeID.EnemyType24, change: 100},
            {enemy: EnemyTypeID.EnemyType25, change: 60},
            // {enemy: EnemyTypeID.EnemyType26, change: 60},
            // {enemy: EnemyTypeID.EnemyType27, change: 40},
            // {enemy: EnemyTypeID.EnemyType28, change: 40},
            // {enemy: EnemyTypeID.EnemyType29, change: 20},
            // {enemy: EnemyTypeID.EnemyType30, change: 20},
        ],
    },
    {
        locationLevelRange: [30, 40],
        enemies: [
            {enemy: EnemyTypeID.EnemyType31, change: 100},
            {enemy: EnemyTypeID.EnemyType32, change: 100},
            {enemy: EnemyTypeID.EnemyType33, change: 100},
            {enemy: EnemyTypeID.EnemyType34, change: 100},
            {enemy: EnemyTypeID.EnemyType35, change: 60},
            // {enemy: EnemyTypeID.EnemyType36, change: 60},
            // {enemy: EnemyTypeID.EnemyType37, change: 40},
            // {enemy: EnemyTypeID.EnemyType38, change: 40},
            // {enemy: EnemyTypeID.EnemyType39, change: 20},
            // {enemy: EnemyTypeID.EnemyType40, change: 20},
        ],
    },
    {
        locationLevelRange: [40, 50],
        enemies: [
            {enemy: EnemyTypeID.EnemyType41, change: 100},
            {enemy: EnemyTypeID.EnemyType42, change: 100},
            {enemy: EnemyTypeID.EnemyType43, change: 100},
            {enemy: EnemyTypeID.EnemyType44, change: 100},
            {enemy: EnemyTypeID.EnemyType45, change: 60},
            // {enemy: EnemyTypeID.EnemyType46, change: 60},
            // {enemy: EnemyTypeID.EnemyType47, change: 40},
            // {enemy: EnemyTypeID.EnemyType48, change: 40},
            // {enemy: EnemyTypeID.EnemyType49, change: 20},
            // {enemy: EnemyTypeID.EnemyType50, change: 20},
        ],
    },
];

// let sample: LocationEnemyChanceDBType[] = [];

export const location_enemies = {
    find: (level: number): LocationEnemyChanceDBType[] => {
        for (const key in data) {
            if (_.inRange(level, data[key].locationLevelRange[0], data[key].locationLevelRange[1])) {
                return data[key].enemies;
            }
        }

        //todo: По идеи тут должно быть сообщение, что данных для уровня нету вместо пустого массива. Или ничего не возвращать, а скрыть логику.

        return [];
    },
};