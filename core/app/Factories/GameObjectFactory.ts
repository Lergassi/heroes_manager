import GameObject from '../../source/GameObject.js';
import UUIDGenerator from '../../source/UUIDGenerator.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';

export default class GameObjectFactory {
    private _idGenerator: IDGeneratorInterface;

    constructor(idGenerator: IDGeneratorInterface) {
        this._idGenerator = idGenerator;
    }

    create(): GameObject {
        return new GameObject(this._idGenerator.generateID());
    }
}