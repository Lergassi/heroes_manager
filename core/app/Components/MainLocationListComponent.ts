import Component from '../../source/Component.js';
import {unsigned} from '../types.js';
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
    private _min: unsigned;
    private _max: unsigned;

    constructor(
        min: unsigned,
        max: unsigned,
    ) {
        super();
        this._locations = [];
        this._min = min;
        this._max = max;
    }

    create(options: LocationFactoryCreateOptions, locationFactory: LocationFactory): GameObject {
        this.canCreateLocation();

        let location = locationFactory.create(options);

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