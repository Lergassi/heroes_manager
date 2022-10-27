import Component from '../../source/Component.js';
import {unsigned} from '../../types/main.js';
import GameObject from '../../source/GameObject.js';
import LocationFactory, {LocationFactoryCreateOptions} from '../Factories/LocationFactory.js';
import EventSystem from '../../source/EventSystem.js';
import AppError from '../../source/Errors/AppError.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import _ from 'lodash';
import LocationComponent from './LocationComponent.js';
import {assert} from '../../source/assert.js';

export enum MainLocationListComponentEventCode {
    CreateLocation = 'MainLocationListComponent.CreateLocation',
    DeleteLocation = 'MainLocationListComponent.DeleteLocation',
}

export default class MainLocationListComponent extends Component {
    private readonly _locations: GameObject[];
    private _max: unsigned;

    constructor(
        max: unsigned,
    ) {
        super();
        this._locations = [];
        this._max = max;
    }

    create(
        level: unsigned,
        locationFactory: LocationFactory,   //todo: Должен быть в конце. Возможно тут стоит использовать options или отдельный аргумент для зависимостей.
        internalItemStorageSize?: unsigned,
        heroGroupSize?: unsigned,
    ): GameObject {
        this.canCreateLocation();

        let location = locationFactory.create(
            level,
            internalItemStorageSize,
            heroGroupSize,
        );

        this._locations.push(location);
        EventSystem.event(MainLocationListComponentEventCode.CreateLocation, this);

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

    canCreateLocation(): void {
        if (this._locations.length > this._max + 1) {
            throw new AppError('Нельзя создать новую локацию. У игрока максимальное кол-во локаций.');
        }
    }

    canDeleteLocation(location: GameObject): void {
        location.get<LocationComponent>(LocationComponent.name).canDelete();
    }

    render(callback: ({}: Readonly<{
        locations: GameObject[],
    }>) => void) {
        callback({
            locations: this._locations,
        });
    }
}