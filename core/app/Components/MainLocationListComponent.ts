import Component from '../../source/Component.js';
import {unsigned} from '../types.js';
import GameObject from '../../source/GameObject.js';
import LocationFactory, {LocationFactoryCreateOptions} from '../Factories/LocationFactory.js';
import EventSystem from '../../source/EventSystem.js';
import AppError from '../../source/AppError.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import _ from 'lodash';
import LocationComponent, {GatheringItemPoint} from './LocationComponent.js';
import {LevelRange} from './LevelComponent.js';
import ItemStorageComponent from './ItemStorageComponent.js';
import HeroGroupComponent from './HeroGroupComponent.js';

export enum MainLocationListComponentEventCode {
    CreateLocation = 'MainLocationListComponent.CreateLocation',
    DeleteLocation = 'MainLocationListComponent.DeleteLocation',
}

export default class MainLocationListComponent extends Component {
    private readonly _locations: GameObject[];
    private _min: unsigned;
    private _max: unsigned;
    private readonly _eventSystem: EventSystem;

    constructor(
        min: unsigned,
        max: unsigned,
        eventSystem: EventSystem,
    ) {
        super();
        this._locations = [];
        this._min = min;
        this._max = max;
        this._eventSystem = eventSystem;
    }

    create(options: LocationFactoryCreateOptions, locationFactory: LocationFactory): GameObject {
        this.canCreateLocation();

        let location = locationFactory.create(options);

        this._locations.push(location);
        this._eventSystem.event<MainLocationListComponent>(MainLocationListComponentEventCode.CreateLocation, this);

        return location;
    }

    delete(location: GameObject, gameObjectStorage: GameObjectStorage): void {
        this.canDeleteLocation(location);

        if (_.includes(this._locations, location)) {
            _.pull(this._locations, location);
            gameObjectStorage.remove(location);

            this._eventSystem.event<MainLocationListComponent>(MainLocationListComponentEventCode.DeleteLocation, this);
        }
    }

    canCreateLocation(): void {
        if (this._locations.length > this._max + 1) {
            throw new AppError('Нельзя создать новую локацию. У игрока максимальное кол-во локаций.');
        }
    }

    canDeleteLocation(location: GameObject): void {
        location.get<LocationComponent>('locationComponent').canDelete();
    }

    render(callback: ({}: Readonly<{
        locations: GameObject[],
    }>) => void) {
        callback({
            locations: this._locations,
        });
    }
}