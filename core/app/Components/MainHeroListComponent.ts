import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import _ from 'lodash';
import HeroComponent, {HeroState} from './HeroComponent.js';
import AppError from '../../source/AppError.js';
import HeroFactory, {HeroFactoryCreateOptions} from '../Factories/HeroFactory.js';
import {unsigned} from '../types.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';

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
     * @deprecated
     * @param hero
     */
    addHero(hero: GameObject): void {
        if (!_.includes(this._heroes, hero)) {
            this._heroes.push(hero);
        }

        this.update();
    }

    deleteHero(hero: GameObject, gameObjectStorage: GameObjectStorage): void {
        if (!hero.get<HeroComponent>('heroComponent').canManipulate()) {
            throw new AppError('Нельзя удалить героя пока он занят.');
        }

        _.pull(this._heroes, hero);
        gameObjectStorage.remove(hero);

        this.update();
    }

    createHero(options: HeroFactoryCreateOptions, heroFactory: HeroFactory): GameObject {
        this.canAddHero();

        let hero = heroFactory.create(options);
        this._heroes.push(hero);

        this.update();

        return hero;
    }

    canAddHero(): void {
        if (this._heroes.length > this._max + 1) {
            throw AppError.playerHasMaxHeroes();
        }
    }

    //Если герой не будет доступен вне клссса, то как получить ссылку, которая передается сюда? А если он есть, то значит переместить его в локацию можно без HeroList. У героя устанавливается статус занято (target: локация). Список тут не нужен. Хотя список тоже может работать по этому же принципу.
    // place(hero: GameObject, placement: HeroPlacement) {
    //     placement.place(hero);
    //     hero.getComponent<HeroComponent>('heroComponent').place(placement);
    //     // _.pull(this._heroes, hero);
    // }
}