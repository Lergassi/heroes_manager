import GameObject from '../../source/GameObject.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../types.js';
import ItemStorageComponent from './ItemStorageComponent.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';

export default class ItemStorageUnion {
    /**
     *
     * @param itemStorages
     * @param item
     * @param count Остаток.
     */
    addItem(itemStorages: GameObject[], item: Item, count: number): unsigned {
        for (let i = 0; i < itemStorages.length; i++) {
            count -= count - itemStorages[i].get<ItemStorageComponent>(GameObjectKey.ItemStorageComponent).addItem(item, count);
            if (count <= 0) {
                break;
            }
        }

        return count;
    }
}