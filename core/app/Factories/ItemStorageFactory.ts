import ItemStorageComponent, {DEFAULT_ITEM_STORAGE_SIZE} from '../Components/ItemStorageComponent.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import UUIDGenerator from '../../source/UUIDGenerator.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageFactoryInterface from './ItemStorageFactoryInterface.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import ItemStackFactory from './ItemStackFactory.js';

export default class ItemStorageFactory implements ItemStorageFactoryInterface {
    private readonly _gameObjectStorage: GameObjectStorage;
    private readonly _itemStackFactory: ItemStackFactory;
    private readonly _idGenerator: IDGeneratorInterface;

    constructor(
        gameObjectStorage: GameObjectStorage,
        itemStackFactory: ItemStackFactory, //todo: Наверное фабрика для стеков тут не нужна.
        idGenerator: IDGeneratorInterface,
    ) {
        this._gameObjectStorage = gameObjectStorage;
        this._itemStackFactory = itemStackFactory;
        this._idGenerator = idGenerator;
    }

    create(size: number = DEFAULT_ITEM_STORAGE_SIZE): GameObject {
        let itemStorage = new GameObject(this._idGenerator.generateID());

        itemStorage.name = 'ItemStorage';
        itemStorage.addTags('#item_storage');

        itemStorage.set<ItemStorageComponent>('itemStorageComponent', new ItemStorageComponent(
            this._idGenerator.generateID(),
            itemStorage,
            size,
            this._idGenerator,
            this._itemStackFactory,
        ));

        //todo: ItemStorageComponent не имеет смысла без слотов.
        // for (let i = 0; i < size; i++) {
        //     itemStorage.addComponent(new ItemStorageSlotComponent(
        //         this._idGenerator.generateID(),
        //         itemStorage,
        //     ));
        // }

        this._gameObjectStorage.add(itemStorage);

        return itemStorage;
    }
}