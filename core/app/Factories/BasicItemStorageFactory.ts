import ItemStorageComponent, {DEFAULT_ITEM_STORAGE_SIZE} from '../Components/ItemStorageComponent.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import UUIDGenerator from '../../source/UUIDGenerator.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageFactoryInterface from './ItemStorageFactoryInterface.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';

export default class BasicItemStorageFactory implements ItemStorageFactoryInterface {
    private _container: ContainerInterface;
    private _idGenerator: IDGeneratorInterface;

    constructor(container: ContainerInterface, idGenerator: IDGeneratorInterface) {
        this._container = container;
        this._idGenerator = idGenerator;
    }

    create(size: number = DEFAULT_ITEM_STORAGE_SIZE): GameObject {
        let itemStorage = new GameObject(this._idGenerator.generateID());

        itemStorage.name = 'ItemStorage';
        itemStorage.addTags('#item_storage');

        itemStorage.addComponent(new ItemStorageComponent(
            this._idGenerator.generateID(),
            itemStorage,
            size,
        ));

        for (let i = 0; i < size; i++) {
            itemStorage.addComponent(new ItemStorageSlotComponent(
                this._idGenerator.generateID(),
                itemStorage,
            ));
        }

        return itemStorage;
    }
}