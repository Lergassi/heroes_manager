import _ from 'lodash';
import debug from 'debug';
import HeroClass from '../Entities/HeroClass.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import HeroFactory from '../Factories/HeroFactory.js';
import MainHeroListComponent from './MainHeroListComponent.js';

export default class Tavern {
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

    hire(index: number, heroFactory: HeroFactory, target: MainHeroListComponent): void {
        if (_.isNil(this._heroes[index])) {
            debug(DebugNamespaceID.Error)('Герой не найден.');
            return;
        }

        if (!target.createHero(this._heroes[index].heroClass, this._heroes[index].level, heroFactory)) return;

        this.delete(index);
        debug(DebugNamespaceID.Log)('Герой нанят.');
    }
}