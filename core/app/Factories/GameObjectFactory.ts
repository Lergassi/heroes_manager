import GameObject from '../../source/GameObject.js';
import UUIDGenerator from '../../source/UUIDGenerator.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';

export default class GameObjectFactory {
    private readonly _idGenerator: IDGeneratorInterface;
    private readonly _gameObjectStorage: GameObjectStorage;

    constructor(
        gameObjectStorage: GameObjectStorage,
        idGenerator: IDGeneratorInterface,
    ) {
        this._gameObjectStorage = gameObjectStorage;
        this._idGenerator = idGenerator;
    }

    create(): GameObject {
        let go = new GameObject(this._idGenerator.generateID());
        this._gameObjectStorage.add(go);

        return go;
    }
}