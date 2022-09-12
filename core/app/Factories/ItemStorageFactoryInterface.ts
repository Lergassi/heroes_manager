import GameObject from '../../source/GameObject.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../Components/ItemStorageComponent.js';

export default interface ItemStorageFactoryInterface {
    // create(size: number = DEFAULT_ITEM_STORAGE_SIZE): GameObject;
    create(size: number): GameObject;
}