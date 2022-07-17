import GameObject from './GameObject.js';

export default class Component {
    private readonly _id: number;
    private readonly _gameObject: GameObject;

    get id(): number {
        return this._id;
    }

    get gameObject(): GameObject {
        return this._gameObject;
    }

    constructor(id: number, gameObject: GameObject) {
        this._id = id;
        this._gameObject = gameObject;
    }
}