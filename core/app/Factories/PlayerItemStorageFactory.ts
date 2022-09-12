import ItemStorageFactoryInterface from './ItemStorageFactoryInterface.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../Components/ItemStorageComponent.js';
import GameObject from '../../source/GameObject.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageListComponent from '../Components/ItemStorageListComponent.js';

export default class PlayerItemStorageFactory implements ItemStorageFactoryInterface {
    private _itemStorageFactory: ItemStorageFactoryInterface;
    private _container: ContainerInterface;
    private _itemStorageCollectionComponent: ItemStorageListComponent;

    constructor(itemStorageFactory: ItemStorageFactoryInterface, container: ContainerInterface, itemStorageCollectionComponent: ItemStorageListComponent) {
        this._itemStorageFactory = itemStorageFactory;
        this._container = container;
        this._itemStorageCollectionComponent = itemStorageCollectionComponent;
    }

    create(size: number = DEFAULT_ITEM_STORAGE_SIZE): GameObject {
        this._itemStorageCollectionComponent.canAddItemStorage();

        let itemStorage = this._itemStorageFactory.create(size);
        this._itemStorageCollectionComponent.add(itemStorage);

        return itemStorage;
    }
}