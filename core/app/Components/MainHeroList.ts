import debug from 'debug';
import _ from 'lodash';
import {MainHeroListRCElement} from '../../../client/public/Components/MainHeroListRC.js';
import {assertIsInstanceOf, assertIsPositive, assertNotNil} from '../../source/assert.js';
import AppError from '../../source/Errors/AppError.js';
import EventSystem from '../../source/EventSystem.js';
import GameObject from '../../source/GameObject.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {unsigned} from '../../types/main.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import HeroClass from '../Entities/HeroClass.js';
import HeroFactory from '../Factories/HeroFactory.js';
import AverageItemLevel from './AverageItemLevel.js';
import Experience from './Experience.js';
import HealthPoints from './HealthPoints.js';
import HeroActivityStateController from './HeroActivityStateController.js';
import HeroComponent from './HeroComponent.js';
import TakeComponent from './TakeComponent.js';

export enum MainHeroListComponentEventCode {
    CreateHero = 'MainHeroListComponent.CreateHero',
    DeleteHero = 'MainHeroListComponent.DeleteHero',
}

/**
 * Отличается от локации тем, что тут есть постраничная навигация и в ui передается только определенное кол-во героев.
 */
export interface MainHeroListRender {
    updateTotalHeroes?(totalHeroes: number): void;
    updateHeroes?(heroes: MainHeroListRCElement[]): void;
    updatePagination?(activePage: number, totalPages: number): void;
}

/**
 * Без обратной связи с ui.
 */
export default class MainHeroList {
    private readonly _gameObjectStorage: GameObjectStorage;
    private readonly _heroes: GameObject[];
    private _max: unsigned; //todo: Значение нужно увеличить с ростом уровня игрока.
    private readonly _options = {
        heroesForPage: 10,
    };

    /**
     * todo: totalPages зависит от числа элементов на страницу, значение передается из вне. А также этот метод не должно быть тут и убрать из _options.
     */
    totalPages(elementForPage: number): number {
        return _.ceil((this._heroes.length) / elementForPage);
    }

    constructor(
        gameObjectStorage: GameObjectStorage,
        max: unsigned,
    ) {
        this._gameObjectStorage = gameObjectStorage;
        this._max = max;
        this._heroes = [];
    }

    createHero(
        heroClass: HeroClass | HeroClassID,
        level: unsigned,
        heroFactory: HeroFactory,
    ): GameObject {
        assertNotNil(heroClass);
        assertIsPositive(level);
        assertNotNil(heroFactory);

        if (!this.canCreateHero()) return null;

        let hero = heroFactory.create(
            heroClass,
            level,
        );
        this._heroes.push(hero);

        let heroIndex = this._heroes.length - 1;
        EventSystem.event(MainHeroListComponentEventCode.CreateHero, this);

        return hero;
    }

    addHero(hero: GameObject): void {
        if (!this.canCreateHero()) return null;

        if (!_.includes(this._heroes, hero)) {
            this._heroes.push(hero);
        }
    };

    //todo: Переделать на ID или индекс. Так будет удобнее управлять через ui.
    deleteHero(hero: GameObject): void {
        assertIsInstanceOf(hero, GameObject);

        this.canDeleteHero(hero);

        _.pull(this._heroes, hero);
        this._gameObjectStorage.remove(hero);

        EventSystem.event(MainHeroListComponentEventCode.DeleteHero, this);
    }

    canCreateHero(): boolean {
        if (this._heroes.length + 1 > this._max) {
            debug(DebugNamespaceID.Throw)('У игрока максимальное кол-во героев.');
            return false;
        }

        return true;
    }

    canDeleteHero(hero: GameObject): void {
        if (!hero.get<HeroActivityStateController>(ComponentID.ActivityStateController).isFree()) {
            throw new AppError('Нельзя удалить героя пока он занят.');
        }
    }

    map(callback: (hero: GameObject) => void) {
        _.map(this._heroes, (hero) => {
            callback(hero);
        });
    }

    get(index: number): GameObject {
        return this._heroes[index];
    }

    //todo: Убрать страницы - мешают. Нужно чтобы
    renderByRequest(ui: MainHeroListRender, options?: {page: number, elementForPage: number}): void {
        let page = options?.page ?? 1;
        // let elementForPage = options?.elementForPage ?? this._options.heroesForPage;
        let elementForPage = options?.elementForPage ?? this._heroes.length;

        let startIndex = 0;
        if (page <= 1) {
            startIndex = 0;
        } else if (page > this.totalPages(elementForPage)) {
            startIndex = this._heroes.length - 1;
        } else {
            startIndex = (page - 1) * elementForPage - 1;
        }

        let endIndex = startIndex + elementForPage;
        if (endIndex > this._heroes.length) {
            endIndex = this._heroes.length ? this._heroes.length : 0;
        }

        //Не удалять дебаг инфу.
        // console.log('startIndex', startIndex);
        // console.log('endIndex', endIndex);

        let heroes: MainHeroListRCElement[] = [];
        for (let i = startIndex; i < endIndex; i++) {
            let hero: MainHeroListRCElement = {
                hero: this._heroes[i],
                ID: '',
                agility: 0,
                attackPower: 0,
                currentHealthPoints: 0, state: '',
                exp: 0,
                heroClassName: '',
                heroRoleName: '',
                intelligence: 0,
                averageItemLevel: 0,
                level: 0,
                maxHealthPoints: 0,
                strength: 0,
                totalExpToLevelUp: 0,
                isDead: false,
                deleteHandler: (): void => {
                    this.deleteHero(this._heroes[i]);
                },
            };

            hero.ID = String(this._heroes[i].ID);
            this._heroes[i].get<HeroActivityStateController>(ComponentID.ActivityStateController).renderByRequest({
                updateState(state: string) {
                    hero.state = state;
                },
            });
            this._heroes[i].get<HeroComponent>(ComponentID.Hero).renderByRequest({
                updateHeroClassName(value: string): void {
                    hero.heroClassName = value;
                },
                updateHeroRoleName(value: string) {
                    hero.heroRoleName = value;
                },
            });
            this._heroes[i].get<Experience>(ComponentID.Experience).renderByRequest({
                updateExp(value: number): void {
                    hero.exp = value;
                },
                updateLevel(value: number): void {
                    hero.level = value;
                },
                updateTotalExpToLevelUp(value: number): void {
                    hero.totalExpToLevelUp = value;
                },
            });

            this._heroes[i].get<AverageItemLevel>(ComponentID.AverageItemLevel).renderByRequest({
                updateAverageItemLevel(value: number) {
                    hero.averageItemLevel = value;
                },
            });

            this._heroes[i].get<CharacterAttributeInterface>(CharacterAttributeID.Strength).renderByRequest({
                updateCharacterAttributeFinalValue(ID: CharacterAttributeID, value: number): void {
                    hero.strength = value;
                },
            });
            this._heroes[i].get<CharacterAttributeInterface>(CharacterAttributeID.Agility).renderByRequest({
                updateCharacterAttributeFinalValue(ID: CharacterAttributeID, value: number): void {
                    hero.agility = value;
                },
            });
            this._heroes[i].get<CharacterAttributeInterface>(CharacterAttributeID.Intelligence).renderByRequest({
                updateCharacterAttributeFinalValue(ID: CharacterAttributeID, value: number): void {
                    hero.intelligence = value;
                },
            });

            this._heroes[i].get<HealthPoints>(ComponentID.HealthPoints).renderByRequest({
                updateHealthPoints(currentHealthPoints: number, maxHealthPoints: number): void {
                    hero.currentHealthPoints = currentHealthPoints;
                    hero.maxHealthPoints = maxHealthPoints;
                },
                updateDeadState(isDead: boolean): void {
                    hero.isDead = isDead;
                },
            });

            this._heroes[i].get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower).renderByRequest({
                updateCharacterAttributeFinalValue(ID: CharacterAttributeID, value: number): void {
                    hero.attackPower = value;
                },
            });

            heroes.push(hero);
        }//end for

        ui.updateHeroes?.(heroes);
        ui.updatePagination?.(page, this.totalPages(elementForPage));
        ui.updateTotalHeroes?.(this._heroes.length);
    }
}