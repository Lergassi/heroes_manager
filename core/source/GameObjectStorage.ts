import GameObject from './GameObject.js';
import _ from 'lodash';
import AppError from './AppError.js';

export default class GameObjectStorage {
    private readonly _gameObjects: GameObject[];

    constructor() {
        this._gameObjects = [];
    }

    add(gameObject: GameObject): void {
        if (!_.includes(this._gameObjects, gameObject)) {
            this._gameObjects.push(gameObject);
        }
    }

    remove(gameObject: GameObject): void {
        _.pull(this._gameObjects, gameObject);
    }

    findOneByID(id: number): GameObject {
        for (let i = 0; i < this._gameObjects.length; i++) {
            if (this._gameObjects[i]['_id'] === id) {
                return this._gameObjects[i];
            }
        }

        return undefined;
    }

    getOneByID(id: number): GameObject {
        let gameObject = this.findOneByID(id);
        if (gameObject) {
            return gameObject;
        }

        throw AppError.gameObjectNotFound(id);
    }

    findByTag(tag: string): GameObject[] {
        let result = [];
        for (let i = 0; i < this._gameObjects.length; i++) {
            if (this._gameObjects[i].hasTag(tag)) {
                result.push(this._gameObjects[i]);
            }
        }

        return result;
    }

    findOneByTag(tag: string): GameObject {
        let gameObjects = this.findByTag(tag);
        if (gameObjects.length) {
            return gameObjects[0];
        }

        return undefined;
    }

    getOneByTag(tag: string): GameObject {
        let gameObject = this.findOneByTag(tag);
        if (gameObject) {
            return gameObject;
        }

        throw AppError.gameObjectNotFound(tag);
    }
}