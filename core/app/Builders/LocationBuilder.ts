import GameObject from '../../source/GameObject.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import Location from '../Components/Location.js';
import LocationFactory from '../Factories/LocationFactory.js';

export default class LocationBuilder {
    private readonly _locationFactory: LocationFactory;

    private _level: number;

    constructor(level: number) {
        this._level = level;
    }

    addEnemy(): LocationBuilder {
        return this;
    }

    addVein(): LocationBuilder {
        return this;
    }

    build(): GameObject {
        let locationGO = this._locationFactory.create(LocationTypeID.Forrest, this._level);
        let location = locationGO.get<Location>(ComponentID.Location);

        

        return locationGO;
    }
}