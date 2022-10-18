import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import _ from 'lodash';
import HeroComponent from './HeroComponent.js';
import AppError from '../../source/Errors/AppError.js';
import HeroFactory, {HeroFactoryCreateOptions} from '../Factories/HeroFactory.js';
import {unsigned} from '../types.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import EventSystem from '../../source/EventSystem.js';
import HeroClass from '../Entities/HeroClass.js';
import {assert} from '../../source/assert.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';

/**
 * @deprecated
 */
export interface PlacementControllerInterface {
    // place<T>(target: T): void;
    // removePlacement<T>(placement: T): void;
    // equal(placement: PlacementInterface): boolean;
}

/**
 * @deprecated
 * Интерфейс для объекта, которому нужно сменить состояние/поместить в определенное место. Не перемещение! Например героя можно поместить в группу и только одну. Чтобы управление было удобным, с бъектом можно одновременно совершать только одно действие. Размещен в группе локации - занят.
 */
export interface PlacementInterface<T> {
    // place<T>(target: T): void;
    place(target: T): void;
    // place(target: PlacementControllerInterface): void;
    removePlacement(placement: T): void;
    // removePlacement<T>(placement: T): void;
    // removePlacement(placement: PlacementControllerInterface): void;
    // equal(placement: PlacementInterface): boolean;
}

export enum MainHeroListComponentEventCode {
    CreateHero = 'MainHeroListComponent.CreateHero',
    DeleteHero = 'MainHeroListComponent.DeleteHero',
}

export default class MainHeroListComponent extends Component {
    private readonly _heroes: GameObject[];
    private _min: unsigned;
    private _max: unsigned;

    /**
     * @deprecated
     */
    get heroes(): GameObject[] {
        return this._heroes;
    }

    constructor(
        min: unsigned,
        max: unsigned,
    ) {
        super();
        this._heroes = [];
        this._min = max;
        this._max = max;
    }

    /**
     * @deprecated Использовать createHero.
     * @param hero
     */
    addHero(hero: GameObject): void {
        if (!_.includes(this._heroes, hero)) {
            this._heroes.push(hero);
        }

        this.update();
    }

    createHero(options: {
        heroClass: HeroClass | HeroClassID;
        heroFactory: HeroFactory;
        level: unsigned;
    }): GameObject {
        this.canCreateHero();

        // let level = options.level ?? 1;

        let hero = options.heroFactory.create({
            heroClass: options.heroClass,
            level: options.level,
        });
        this._heroes.push(hero);

        EventSystem.event(MainHeroListComponentEventCode.CreateHero, this);

        return hero;
    }

    deleteHero(hero: GameObject, gameObjectStorage: GameObjectStorage): void {
        assert(hero instanceof GameObject);
        assert(gameObjectStorage instanceof GameObjectStorage);

        this.canDeleteHero(hero);

        _.pull(this._heroes, hero);
        gameObjectStorage.remove(hero);

        EventSystem.event(MainHeroListComponentEventCode.DeleteHero, this);
    }

    canCreateHero(): void {
        if (this._heroes.length > this._max + 1) {
            throw AppError.playerHasMaxHeroes();
        }
    }

    canDeleteHero(hero: GameObject): void {
        if (!hero.get<HeroComponent>(HeroComponent.name).canManipulate()) {
            throw new AppError('Нельзя удалить героя пока он занят.');
        }
    }
}