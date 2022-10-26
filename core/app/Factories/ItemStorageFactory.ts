import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageFactoryInterface from './ItemStorageFactoryInterface.js';
import ItemStackFactory from './ItemStackFactory.js';
import GameObjectFactory from './GameObjectFactory.js';
import {unsigned} from '../../types/types.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';

export default class ItemStorageFactory implements ItemStorageFactoryInterface {
    private readonly _gameObjectStorage: GameObjectStorage;
    private readonly _itemStackFactory: ItemStackFactory;
    private readonly _gameObjectFactory: GameObjectFactory;

    constructor(
        gameObjectStorage: GameObjectStorage,
        itemStackFactory: ItemStackFactory, //todo: Наверное фабрика для стеков тут не нужна.
        gameObjectFactory: GameObjectFactory,
    ) {
        this._gameObjectStorage = gameObjectStorage;
        this._itemStackFactory = itemStackFactory;
        this._gameObjectFactory = gameObjectFactory;
    }

    create(size: number): GameObject {
        let itemStorage = this._gameObjectFactory.create();

        itemStorage.name = 'ItemStorage';
        itemStorage.addTags('#item_storage');

        this.createIn(size, itemStorage);

        return itemStorage;
    }

    /**
     * @deprecated Сумка всегда отдельно. Не добавлять поведение сумки в несумку.
     * @param size
     * @param gameObject
     */
    createIn(size: unsigned, gameObject: GameObject) {
        let slots = [];
        let slotIDPrefix = 'slot_';
        for (let i = 0; i < size; i++) {
            let slot = new ItemStorageSlotComponent();
            slots.push(slot);
            // gameObject.addComponent(slot);
            gameObject.set(slotIDPrefix + i.toString(), slot);
        }

        let itemStorageComponent = gameObject.set<ItemStorageComponent>(GameObjectKey.ItemStorageComponent, new ItemStorageComponent(
            slots,
            this._itemStackFactory,
        ));

        return itemStorageComponent;    //todo: Тут будет контроллер.
    }
}