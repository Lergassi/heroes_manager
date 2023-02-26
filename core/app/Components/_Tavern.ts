import _ from 'lodash';
import debug from 'debug';
import HeroClass from '../Entities/HeroClass.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import HeroFactory from '../Factories/HeroFactory.js';
import MainHeroList from './MainHeroList.js';

export default class _Tavern {
    private readonly _heroes: {heroClass: HeroClass, level: number}[];

    constructor() {
        this._heroes = [];
    }

    add(heroClass: HeroClass, level: number): number {
        return this._heroes.push({
            heroClass: heroClass,
            level: level,
        });
    }

    delete(index: number): void {
        if (_.isNil(this._heroes[index])) {
            debug(DebugNamespaceID.Error)('Герой не найден.');
            return;
        }

        _.pullAt(this._heroes, index);
    }

    hire(index: number, heroFactory: HeroFactory, target: MainHeroList): void {
        if (_.isNil(this._heroes[index])) {
            debug(DebugNamespaceID.Error)('Герой не найден.');
            return;
        }

        if (!target.createHero(this._heroes[index].heroClass, this._heroes[index].level)) return;

        this.delete(index);
        debug(DebugNamespaceID.Log)('Герой нанят.');
    }
}