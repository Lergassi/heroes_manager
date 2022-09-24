import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import _ from 'lodash';

export default class LocationListComponent extends Component {
    private readonly _locations: GameObject[];

    constructor(id: number, gameObject: GameObject) {
        super(id, gameObject);
        this._locations = [];
    }

    addLocation(location: GameObject): void {
        if (!_.includes(this._locations, location)) {
            this._locations.push(location);
        }
    }

    removeLocation(location: GameObject): void {
        _.pull(this._locations, location);
    }
}