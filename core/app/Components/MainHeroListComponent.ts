import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import _ from 'lodash';
import HeroComponent from './HeroComponent.js';
import AppError from '../../source/Errors/AppError.js';
import HeroFactory from '../Factories/HeroFactory.js';
import {unsigned} from '../../types/types.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import EventSystem from '../../source/EventSystem.js';
import HeroClass from '../Entities/HeroClass.js';
import {assert, assertIsInstanceOf} from '../../source/assert.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import TakeComponent from './TakeComponent.js';
import {takeCoverage} from 'v8';

export enum MainHeroListComponentEventCode {
    CreateHero = 'MainHeroListComponent.CreateHero',
    DeleteHero = 'MainHeroListComponent.DeleteHero',
}

export default class MainHeroListComponent {
    private readonly _heroes: GameObject[];
    private _max: unsigned;

    /**
     * @deprecated
     */
    get heroes(): GameObject[] {
        return this._heroes;
    }

    constructor(
        max: unsigned,
    ) {
        this._heroes = [];
        this._max = max;
    }

    createHero(
        heroClass: HeroClass | HeroClassID,
        level: unsigned,
        heroFactory: HeroFactory,
    ): GameObject {
        this.canCreateHero();

        // let level = options.level ?? 1;

        let hero = heroFactory.create(
            heroClass,
            level,
        );
        this._heroes.push(hero);

        EventSystem.event(MainHeroListComponentEventCode.CreateHero, this);

        return hero;
    }

    deleteHero(hero: GameObject, gameObjectStorage: GameObjectStorage): void {
        assertIsInstanceOf(hero, GameObject);
        assertIsInstanceOf(gameObjectStorage, GameObjectStorage);

        this.canDeleteHero(hero);

        _.pull(this._heroes, hero);
        gameObjectStorage.remove(hero);

        EventSystem.event(MainHeroListComponentEventCode.DeleteHero, this);
    }

    canCreateHero(): void {
        if (this._heroes.length + 1 > this._max) {
            throw AppError.playerHasMaxHeroes();
        }
    }

    canDeleteHero(hero: GameObject): void {
        if (hero.get<TakeComponent>(TakeComponent.name) && !hero.get<TakeComponent>(TakeComponent.name).isFree()) {
            throw new AppError('Нельзя удалить героя пока он занят.');
        }
    }
}