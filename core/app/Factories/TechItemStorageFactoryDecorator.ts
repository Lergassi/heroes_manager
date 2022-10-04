import ItemStorageFactoryInterface from './ItemStorageFactoryInterface.js';
import GameObject from '../../source/GameObject.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';

/**
 * @decorator
 */
export default class TechItemStorageFactoryDecorator implements ItemStorageFactoryInterface {
    private _itemStorageFactory: ItemStorageFactoryInterface;
    private _gameObjectStorage: GameObjectStorage;

    // constructor(itemStorageFactory: ItemStorageFactoryInterface, container: ContainerInterface) {
    constructor(itemStorageFactory: ItemStorageFactoryInterface, gameObjectStorage: GameObjectStorage) {
        this._itemStorageFactory = itemStorageFactory;
        this._gameObjectStorage = gameObjectStorage;
    }

    create(size: number): GameObject {
        let itemStorage = this._itemStorageFactory.create(size);
        this._gameObjectStorage.add(itemStorage);

        return itemStorage;
    }
}