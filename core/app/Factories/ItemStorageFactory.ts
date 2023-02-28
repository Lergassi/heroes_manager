import ItemStorageComponent from '../Components/ItemStorages/ItemStorageComponent.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from '../Components/ItemStorages/ItemStorageSlotComponent.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import ItemStorageFactoryInterface from './ItemStorageFactoryInterface.js';
import ItemStackFactory from './ItemStackFactory.js';
import GameObjectFactory from './GameObjectFactory.js';
import {unsigned} from '../../types/main.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import ItemStorage from '../Components/ItemStorages/ItemStorage.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export default class ItemStorageFactory {
    private readonly _gameObjectStorage: GameObjectStorage;
    private readonly _itemStackFactory: ItemStackFactory;
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _entityManager: EntityManagerInterface;

    constructor(
        gameObjectStorage: GameObjectStorage,
        itemStackFactory: ItemStackFactory, //todo: Наверное фабрика для стеков тут не нужна.
        gameObjectFactory: GameObjectFactory,
        entityManager: EntityManagerInterface,
    ) {
        this._gameObjectStorage = gameObjectStorage;
        this._itemStackFactory = itemStackFactory;
        this._gameObjectFactory = gameObjectFactory;
        this._entityManager = entityManager;
    }

    createGameObject(size: number): GameObject {
        let itemStorage = this._gameObjectFactory.create();

        itemStorage.name = 'ItemStorage';
        itemStorage.addTags('#item_storage');

        this.createIn(size, itemStorage);

        return itemStorage;
    }

    create(size: number): ItemStorageInterface {
        return new ItemStorage(size, this._entityManager);
    }

    /**
     * @deprecated Сумка всегда отдельно. Не добавлять поведение сумки в несумку.
     * @param size
     * @param gameObject
     */
    createIn(size: unsigned, gameObject: GameObject) {
        // let slots = [];
        // let slotIDPrefix = 'slot_';
        // for (let i = 0; i < size; i++) {
        //     let slot = new ItemStorageSlotComponent();
        //     slots.push(slot);
        //     gameObject.set(slotIDPrefix + i.toString(), slot);
        // }

        // let itemStorage = gameObject.set<ItemStorageComponent>(ComponentID.ItemStorageComponent, new ItemStorageComponent(
        //     slots,
        //     this._itemStackFactory,
        // ));
        let itemStorage = gameObject.set<ItemStorageInterface>(ComponentID.ItemStorage, new ItemStorage(
            size,
            this._entityManager,
        ));

        return itemStorage;    //todo: Тут будет контроллер.
    }
}