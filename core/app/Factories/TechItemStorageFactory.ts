import ItemStorageFactoryInterface from './ItemStorageFactoryInterface.js';
import GameObject from '../../source/GameObject.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../Components/ItemStorageComponent.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';

/**
 * decorator
 */
export default class TechItemStorageFactory implements ItemStorageFactoryInterface {
    private _itemStorageFactory: ItemStorageFactoryInterface;
    private _container: ContainerInterface;

    constructor(itemStorageFactory: ItemStorageFactoryInterface, container: ContainerInterface) {
        this._itemStorageFactory = itemStorageFactory;
        this._container = container;
    }

    create(size: number = DEFAULT_ITEM_STORAGE_SIZE): GameObject {
        let itemStorage = this._itemStorageFactory.create(size);

        this._container.get<GameObjectStorage>('player.gameObjectStorage').add(itemStorage);

        return itemStorage;
    }
}