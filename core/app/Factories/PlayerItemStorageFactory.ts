import ItemStorageFactoryInterface from './ItemStorageFactoryInterface.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import GameObject from '../../source/GameObject.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';

export default class PlayerItemStorageFactory implements ItemStorageFactoryInterface {
    private _itemStorageFactory: ItemStorageFactoryInterface;
    private _container: ContainerInterface;
    private _itemStorageCollectionComponent: MainItemStorageListComponent;

    constructor(itemStorageFactory: ItemStorageFactoryInterface, container: ContainerInterface, itemStorageCollectionComponent: MainItemStorageListComponent) {
        this._itemStorageFactory = itemStorageFactory;
        this._container = container;
        this._itemStorageCollectionComponent = itemStorageCollectionComponent;
    }

    create(size: number): GameObject {
        this._itemStorageCollectionComponent.canAddItemStorage();

        let itemStorage = this._itemStorageFactory.create(size);
        this._itemStorageCollectionComponent.add(itemStorage);

        return itemStorage;
    }
}