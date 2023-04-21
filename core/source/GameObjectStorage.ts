import GameObject from './GameObject.js';
import _ from 'lodash';
import AppError from './Errors/AppError.js';
import {assertIsInstanceOf, assertIsNumber, assertNotNil} from './assert.js';

export default class GameObjectStorage {
    private readonly _gameObjects: GameObject[];

    constructor() {
        this._gameObjects = [];
    }

    add(gameObject: GameObject): void {
        assertNotNil(gameObject);
        assertIsInstanceOf(gameObject, GameObject);

        if (!_.includes(this._gameObjects, gameObject)) {
            this._gameObjects.push(gameObject);
        }
    }

    remove(gameObject: GameObject): void {
        _.pull(this._gameObjects, gameObject);
    }

    /**
     * @deprecated
     * @param id
     */
    findOneByID(id: number): GameObject {
        for (let i = 0; i < this._gameObjects.length; i++) {
            if (this._gameObjects[i].ID === id) {
                return this._gameObjects[i];
            }
        }

        return undefined;
    }

    getOneByID(ID: number): GameObject | undefined {
        assertIsNumber(ID);

        for (let i = 0; i < this._gameObjects.length; i++) {
            if (this._gameObjects[i].ID === ID) {
                return this._gameObjects[i];
            }
        }

        return undefined;
    }

    /**
     * @deprecated
     * @param tag
     */
    findByTag(tag: string): GameObject[] {
        let result = [];
        for (let i = 0; i < this._gameObjects.length; i++) {
            if (this._gameObjects[i].hasTag(tag)) {
                result.push(this._gameObjects[i]);
            }
        }

        return result;
    }

    /**
     * @deprecated
     * @param tag
     */
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

    /**
     * @deprecated Бесполезный метод. Полностью уничтожать объект.
     */
    clear() {
        _.remove(this._gameObjects);
    }
}