import GameObject from './GameObject.js';
import RComponentBridge, {
    AssignRComponentInterface,
    RComponentUpdateInterface
} from '../../client/source/RComponentBridge.js';
import _ from 'lodash';

// export default class Component {
export default class Component implements AssignRComponentInterface {
    private readonly _id: number;
    private readonly _gameObject: GameObject;
    // private _rComponentBridges: RComponentBridge;
    // private _rComponentBridges: RComponentBridge[];
    private _assignedRComponents: RComponentUpdateInterface[];

    get gameObject(): GameObject {
        return this._gameObject;
    }

    constructor(id: number, gameObject: GameObject) {
        this._id = id;
        this._gameObject = gameObject;
        // this._rComponentBridges = new RComponentBridge();
        // this._rComponentBridges.update(this);
        // this._rComponentBridges = [];
        this._assignedRComponents = [];
    }

    // assignRComponent(rComponent): void {
    assignRComponent(rComponent: RComponentUpdateInterface): void {
        // this._rComponentBridges.rComponent = rComponent;
        // this._rComponentBridges.push(new RComponentBridge(rComponent));
        this._assignedRComponents.push(rComponent);
    }

    removeRComponent(rComponent): void {
        // _.pull(this._rComponentBridges, );
    }

    update(): void {
        // this._rComponentBridges.update(this);

        // for (let i = 0; i < this._rComponentBridges.length; i++) {
        //     this._rComponentBridges[i].update(this);
        // }

        for (let i = 0; i < this._assignedRComponents.length; i++) {
            this._assignedRComponents[i].update(this);
        }
    }
}