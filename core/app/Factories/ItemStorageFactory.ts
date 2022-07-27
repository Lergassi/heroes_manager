import ItemStorageComponent, {ITEM_STORAGE_DEFAULT_SIZE} from '../Components/ItemStorageComponent.js';
import GameObject from '../../source/GameObject.js';
import AutoIncrementIDGenerator from '../../source/AutoIncrementIDGenerator.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';

export default class ItemStorageFactory {
    private _idGenerator: AutoIncrementIDGenerator;

    constructor(idGenerator: AutoIncrementIDGenerator) {
        this._idGenerator = idGenerator;
    }

    create(size: number = ITEM_STORAGE_DEFAULT_SIZE): GameObject {
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