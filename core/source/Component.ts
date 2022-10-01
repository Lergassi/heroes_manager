import GameObject from './GameObject.js';
import RComponentBridge, {
    AssignRComponentInterface,
    RComponentUpdateInterface
} from '../../client/source/RComponentBridge.js';
import _ from 'lodash';

// export default class Component {
export default class Component implements AssignRComponentInterface {
    /**
     * @deprecated
     */
    private readonly _id: number = this['_generateID'];

    /**
     * @deprecated
     */
    private readonly _gameObject: GameObject;
    private _assignedRComponents: RComponentUpdateInterface[];

    /**
     * @deprecated
     */
    get gameObject(): GameObject {
        return this._gameObject;
    }

    /**
     * @deprecated id и gameObject не актуальны.
     * @param id
     * @param gameObject
     */
    constructor(id?: number, gameObject?: GameObject) {
        // console.log(this._id);
        // console.log(Component[Symbol('idGenerator')]);
        // console.log(Component['idGenerator']);
        // console.log(Component['idGenerator']());
        // console.log('Component[\'generateID2\']', Component['generateID2']);
        // console.log('this[\'generateID2\']', this['generateID2']);
        // console.log('this[\'generateID2\']', this['generateID2']);
        // console.log('generateID3', this['generateID3']);
        // console.log(Component['ID']);
        // console.log('this', this['ID']);
        // this['_id'] = Component['generateID']();
        // this['_id'] = this['ID'];
        // console.log(Component['idGenerator'].generateID());
        // this._id = 42;
    // constructor() {
    // constructor(id: number, gameObject: GameObject) {
        // this._id = id;
        // this._assignedRComponents = [];
        // if (gameObject !== undefined) {
        // // if (arguments.length === 1) {
        // // if (gameObject === undefined) {
        //     this._gameObject = gameObject;
        //     // this._rComponentBridges = new RComponentBridge();
        //     // this._rComponentBridges.update(this);
        //     // this._rComponentBridges = [];
        // } else {
        //
        // }
        // this._id = id;
        // this._gameObject = gameObject;
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
            // this._assignedRComponents[i].update(this);
            this._assignedRComponents[i].update();
        }
        // this.gameObject.update();

        // for (let i = 0; i < this._listeners.length; i++) {
        //     this._listeners[i].update();
        // }
    }
}