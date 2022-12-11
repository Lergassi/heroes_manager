import GameObject from '../../source/GameObject.js';
import _ from 'lodash';
import AppError from '../../source/Errors/AppError.js';
import HeroFactory from '../Factories/HeroFactory.js';
import {unsigned} from '../../types/main.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import EventSystem from '../../source/EventSystem.js';
import HeroClass from '../Entities/HeroClass.js';
import {assertIsInstanceOf, assertIsPositive, assertNotNil} from '../../source/assert.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import TakeComponent from './TakeComponent.js';
import ExperienceComponent from './ExperienceComponent.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {MainHeroListElement} from '../../../client/public/Components/MainHeroListRC.js';
import {IconID} from '../../types/enums/IconID.js';
import HeroComponent from './HeroComponent.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import EquipSlot from '../Entities/EquipSlot.js';
import {sprintf} from 'sprintf-js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export enum MainHeroListComponentEventCode {
    CreateHero = 'MainHeroListComponent.CreateHero',
    DeleteHero = 'MainHeroListComponent.DeleteHero',
}

export type MainHeroListComponentCallbacks = {
    // experienceCallbacks: (index: number, experienceComponentCallbacks: ExperienceComponentCallbacks) => void;
    addHero: (heroListElement: MainHeroListElement) => void;
    deleteHero: (index: number) => void;
    // updateHero: (index: number, heroListElement: MainHeroListElement) => void;

    // readHeroClass: (index: number, value: string) => void;

    updateExp: (index: number, value) => void;
    updateTotalExpToLevelUp: (index: number, value) => void;
    updateLevel: (index: number, value: number) => void;

    // updateEquipSlot: (index: number, equipSlotID: EquipSlotID, icon: IconID) => void;
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
        for (let i = 0; i < this._callbacks.length; i++) {
            this._attachHero(this._callbacks[i], heroIndex, this._heroes[heroIndex]);
        }

        return hero;
    }

    deleteHero(hero: GameObject, gameObjectStorage: GameObjectStorage): void {
        assertIsInstanceOf(hero, GameObject);
        assertIsInstanceOf(gameObjectStorage, GameObjectStorage);

        this.canDeleteHero(hero);

        _.pull(this._heroes, hero);
        gameObjectStorage.remove(hero);

        EventSystem.event(MainHeroListComponentEventCode.DeleteHero, this);
        for (let i = 0; i < this._callbacks.length; i++) {
            // this._callbacks[i].deleteHero();
        }
    }

    canCreateHero(): boolean {
        if (this._heroes.length + 1 > this._max) {
            debug(DebugNamespaceID.Throw)('У игрока максимальное кол-во героев.');
            return false;
        }

        return true;
    }

    canDeleteHero(hero: GameObject): void {
        if (hero.get<TakeComponent>(TakeComponent.name) && !hero.get<TakeComponent>(TakeComponent.name).isFree()) {
            throw new AppError('Нельзя удалить героя пока он занят.');
        }
    }

    _callbacks: MainHeroListComponentCallbacks[] = [];

    attach(callbacks: MainHeroListComponentCallbacks) {
        this._callbacks.push(callbacks);

        for (let i = 0; i < this._callbacks.length; i++) {
            for (let heroIndex = 0; heroIndex < this._heroes.length; heroIndex++) {
                this._attachHero(callbacks, heroIndex, this._heroes[heroIndex]);
            }
        }
    }

    private _attachHero(callbacks, index, hero: GameObject) {
        let heroListElement = {
            heroClassIconID: undefined,
            heroClassName: undefined,
            exp: undefined,
            totalExpToLevelUp: undefined,
            level: undefined,
            strength: undefined,
            agility: undefined,
            intelligence: undefined,
            currentHealthPoints: undefined,
            maxHealthPoints: undefined,
            attackPower: undefined,
        };

        hero.get<HeroComponent>(ComponentID.Hero).attach({
            readHeroClass: (heroClass) => {
                heroListElement.heroClassIconID = heroClass.icon.id;
                heroListElement.heroClassName = sprintf('%s (%s)', heroClass.name, hero.ID);
            },
        });

        callbacks.addHero(heroListElement);

        hero.get<ExperienceComponent>(ComponentID.Experience).attach({
            updateExp: (value) => {
                callbacks.updateExp(index, value);
            },
            updateTotalExpToLevelUp: (value) => {
                callbacks.updateTotalExpToLevelUp(index, value);
            },
            updateLevel: (value) => {
                callbacks.updateLevel(index, value);
            },
        });

        // hero.get<EquipSlot>(EquipSlotID.Head).attach({
        //
        // });
    }
}