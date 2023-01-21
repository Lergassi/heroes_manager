import debug from 'debug';
import _ from 'lodash';
import {
    DetailLocationRCEnemyElement,
    DetailLocationRCHeroElement, DetailLocationRCVeinElement
} from '../../../client/public/Components/DetailLocationRC.js';
import {MainLocationListRCElement} from '../../../client/public/Components/MainLocationListRC.js';
import {assert, assertIsInstanceOf} from '../../source/assert.js';
import EventSystem from '../../source/EventSystem.js';
import GameObject from '../../source/GameObject.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {UI_ItemCount, UI_VeinItemCount, unsigned} from '../../types/main.js';
import LocationFactory from '../Factories/LocationFactory.js';
import Location from './Location.js';

export enum MainLocationListComponentEventCode {
    AddLocation = 'MainLocationListComponent.AddLocation',
    DeleteLocation = 'MainLocationListComponent.DeleteLocation',
}

export interface MainLocationListRender {
    updateLocations?(locations: MainLocationListRCElement[]): void;
    updatePagination?(activePage: number, totalPages: number): void;
}

export default class MainLocationList {
    private readonly _locations: GameObject[];
    private _max: unsigned;

    constructor(
        max: unsigned,  //todo: Изменяемый игровой параметр.
    ) {
        this._locations = [];
        this._max = max;
    }

    /**
     * @deprecated Не удобно. Фабрика будет меняться и передавать данные через аргументы будет не удобно. Либо колбек, либо add и rule или другое решение.
     * @param level
     * @param locationFactory
     */
    create(
        level: unsigned,
        locationFactory: LocationFactory,   //todo: Должен быть в конце. Возможно тут стоит использовать options или отдельный аргумент для зависимостей.
        // internalItemStorageSize?: unsigned,
        // heroGroupSize?: unsigned,
    ): GameObject {
        if (!this.canAddLocation()) return;

        let location = locationFactory.create(
            level,
            // internalItemStorageSize,
            // heroGroupSize,
        );

        this._locations.push(location);
        EventSystem.event(MainLocationListComponentEventCode.AddLocation, this);

        return location;
    }

    delete(location: GameObject, gameObjectStorage: GameObjectStorage): void {
        assert(location instanceof GameObject);
        assert(gameObjectStorage instanceof GameObjectStorage);

        this.canDeleteLocation(location);

        if (_.includes(this._locations, location)) {
            _.pull(this._locations, location);
            gameObjectStorage.remove(location);

            EventSystem.event(MainLocationListComponentEventCode.DeleteLocation, this);
        }
    }

    add(location: GameObject): boolean {
        assertIsInstanceOf(location, GameObject);

        if (!this.canAddLocation()) return false;

        this._locations.push(location);
        EventSystem.event(MainLocationListComponentEventCode.AddLocation, this);

        return true;
    }

    canAddLocation(): boolean {
        if (this._locations.length > this._max + 1) {
            debug(DebugNamespaceID.Throw)('Нельзя добавить новую локацию. У игрока максимальное кол-во локаций.');
            return false;
        }

        return true;
    }

    canDeleteLocation(location: GameObject): boolean {
        if (!location.get<Location>(ComponentID.Location).canDelete()) return false;

        return true;
    }

    renderByRequest(ui: MainLocationListRender): void {
        // console.log('renderByRequest', this._locations);
        //в1. Передавать сразу все данные.        // let locations: {id: 42, level: 42, heroes: [], enemies: [], ...}[] = [];
        // ui.updateLocations(locations);
        // ui.updatePagination(activePage, totalPages);

        //в2.
        let locations: MainLocationListRCElement[] = [];
        for (let i = 0; i < this._locations.length; i++) {
            let locationData: MainLocationListRCElement = {
                ID: String(this._locations[i].ID),
                level: 0,
                lifeEnemiesCount: 0,
                lifeHeroesCount: 0,
                loot: [],
                money: 0,
                state: undefined,
                totalEnemiesCount: 0,
                totalHeroesCount: 0,
                veins: [],
            };

            // locationData.ID = String(this._locations[i].ID);
            this._locations[i].get<Location>(ComponentID.Location).renderByRequest({
                updateState(state: string) {
                    locationData.state = state;
                },
                updateEnemies(enemies: DetailLocationRCEnemyElement[]): void {
                    for (let j = 0; j < enemies.length; j++) {
                        if (!enemies[i].isDead) {
                            locationData.lifeEnemiesCount++;
                        }
                    }
                    locationData.totalEnemiesCount = enemies.length;
                }, updateHeroes(heroes: DetailLocationRCHeroElement[]): void {
                    for (let j = 0; j < heroes.length; j++) {
                        if (!heroes[j].isDead) {
                            locationData.lifeHeroesCount++;
                        }
                    }
                    locationData.totalHeroesCount = heroes.length;
                }, updateLevel(level: number): void {
                    locationData.level = level;
                }, updateLoot(loot: UI_ItemCount[]): void {
                    locationData.loot = loot;
                }, updateMoney(value: number): void {
                    locationData.money = value;
                // }, updateVeins(veins: DetailLocationRCVeinElement[]): void {
                }, updateVeins(veins: UI_VeinItemCount[]): void {
                    locationData.veins = veins;
                }
            });

            locations.push(locationData);
        }

        ui.updateLocations?.(locations);
    }
}