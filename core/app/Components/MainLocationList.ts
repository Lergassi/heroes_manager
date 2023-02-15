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
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import {UI_ItemCount, UI_VeinItemCount, unsigned} from '../../types/main.js';
import LocationFactory from '../Factories/LocationFactory.js';
import Location from './Location.js';

export enum MainLocationListComponentEventCode {
    AddLocation = 'MainLocationListComponent.AddLocation',
    DeleteLocation = 'MainLocationListComponent.DeleteLocation',
}

export interface MainLocationListRender {
    updateLocations?(locations: MainLocationListRCElement[]): void;
    updatePagination?(totalPages: number, totalLocations: number): void;
}

export default class MainLocationList {
    private readonly _locations: GameObject[];
    private _max: unsigned;

    /**
     *
     * @param max -1 = без ограничений.
     */
    constructor(
        max: number = -1,
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
    ): GameObject {
        if (!this.canAddLocation()) return;

        let location = locationFactory.create(LocationTypeID.Forrest, 
            level,
        );

        this._locations.push(location);

        return location;
    }

    add(location: GameObject): boolean {
        assertIsInstanceOf(location, GameObject);

        if (!this.canAddLocation()) return false;

        this._locations.push(location);

        return true;
    }

    delete(location: GameObject, gameObjectStorage: GameObjectStorage): void {
        assert(location instanceof GameObject);
        assert(gameObjectStorage instanceof GameObjectStorage);

        this.canDeleteLocation(location);

        if (_.includes(this._locations, location)) {
            _.pull(this._locations, location);
            gameObjectStorage.remove(location);
        }
    }

    canAddLocation(): boolean {
        if (this._max === -1) return true;

        if (this._locations.length > this._max + 1) {
            /*
                Варианты сообщений:
                'Ошибка создании локации. У игрока максимальное кол-во локаций.'
                'Ошибка/игрока ошибка. У игрока максимальное кол-во локаций.' - без сообщения оо ошибке создания.
             */
            debug(DebugNamespaceID.Throw)('Нельзя добавить новую локацию. У игрока максимальное кол-во локаций.');
            return false;
        }

        return true;
    }

    canDeleteLocation(location: GameObject): boolean {
        if (!location.get<Location>(ComponentID.Location).canDelete()) return false;

        return true;
    }

    //todo: Рендер списков с навигацией в отдельный класс.
    renderByRequest(ui: MainLocationListRender, options?: {offset: number, count: number}): void {
        let offset = options?.offset ?? 0;
        let count = options?.count ?? this._locations.length;
        let locationsForPage = offset + count;

        let locations: MainLocationListRCElement[] = [];
        for (let i = offset; i < locationsForPage && i < this._locations.length; i++) {
            let locationData: MainLocationListRCElement = {
                location: this._locations[i],
                ID: String(this._locations[i].ID),
                name: '',
                level: 0,
                lifeEnemiesCount: 0,
                lifeHeroesCount: 0,
                loot: [],
                money: 0,
                state: '',
                totalEnemiesCount: 0,
                totalHeroesCount: 0,
                veins: [],
            };

            this._locations[i].get<Location>(ComponentID.Location).renderByRequest({
                updateName(name: string) {
                    locationData.name = name;
                },
                updateState(state: string) {
                    locationData.state = state;
                },
                updateEnemies(enemies: DetailLocationRCEnemyElement[]): void {
                    for (let j = 0; j < enemies.length; j++) {
                        if (!enemies[j].isDead) {
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
                }, updateVeins(veins: UI_VeinItemCount[]): void {
                    locationData.veins = veins;
                }
            });

            locations.push(locationData);
        }

        ui.updateLocations?.(locations);
        ui.updatePagination?.(_.ceil(this._locations.length / count), this._locations.length);
    }
}