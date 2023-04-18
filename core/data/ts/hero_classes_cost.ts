import {HeroClassID} from '../../types/enums/HeroClassID.js';
import _ from 'lodash';

type TSDB_HeroClassCost = {
    heroClassId: string;
    // level: number;
    cost: number;
}

type TSDB_HeroClassCostDB = TSDB_HeroClassCost[]

const tsdb_heroClassCostDB: TSDB_HeroClassCostDB = [
    {heroClassId: HeroClassID.Warrior, cost: 350},
    {heroClassId: HeroClassID.Gunslinger, cost: 200},
    {heroClassId: HeroClassID.FireMage, cost: 450},
    {heroClassId: HeroClassID.Support1, cost: 1000},

    //Для basic сценария.
    {heroClassId: HeroClassID.Tank1, cost: 0},
    {heroClassId: HeroClassID.Paladin, cost: 0},
    {heroClassId: HeroClassID.Tank2, cost: 0},
    {heroClassId: HeroClassID.Tank3, cost: 0},
    {heroClassId: HeroClassID.Gladiator, cost: 0},
    {heroClassId: HeroClassID.Barbarian, cost: 0},
    {heroClassId: HeroClassID.PlateDamageDealer1, cost: 0},
    {heroClassId: HeroClassID.PlateDamageDealer2, cost: 0},
    {heroClassId: HeroClassID.PlateDamageDealer3, cost: 0},
    {heroClassId: HeroClassID.LeatherDamageDealer1, cost: 0},
    {heroClassId: HeroClassID.Rogue, cost: 0},
    {heroClassId: HeroClassID.Archer, cost: 0},
    {heroClassId: HeroClassID.LeatherDamageDealer2, cost: 0},
    {heroClassId: HeroClassID.Necromancer, cost: 0},
    {heroClassId: HeroClassID.Mage1, cost: 0},
    {heroClassId: HeroClassID.Mage2, cost: 0},
    {heroClassId: HeroClassID.Warlock, cost: 0},
    {heroClassId: HeroClassID.Support2, cost: 0},
    {heroClassId: HeroClassID.Support3, cost: 0},
    {heroClassId: HeroClassID.Support4, cost: 0},
    {heroClassId: HeroClassID.Support5, cost: 0},
];

export const hero_classes_cost = {
    findAll(): TSDB_HeroClassCost[] {
        return _.cloneDeep(tsdb_heroClassCostDB);
    },
    find(heroClassID: string): TSDB_HeroClassCost {
        return _.cloneDeep(_.find(tsdb_heroClassCostDB, (value) => {
            return value.heroClassId === heroClassID;
        }) ?? null);
    },
};