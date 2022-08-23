import GameObject from './GameObject.js';

export default class Component {
    private readonly _id: string;
    private readonly _gameObject: GameObject;

    get gameObject(): GameObject {
        return this._gameObject;
    }

    constructor(id: string, gameObject: GameObject) {
        this._id = id;
        this._gameObject = gameObject;
    }
}