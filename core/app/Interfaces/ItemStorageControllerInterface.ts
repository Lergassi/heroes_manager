import GameObject from '../../source/GameObject.js';
import {unsigned} from '../../types/main.js';

export default interface ItemStorageControllerInterface {
    /**
     *
     * @param itemStorage
     * @return Итоговое кол-во ItemStorage.
     */
    addItemStorage(itemStorage: GameObject): unsigned;

    /**
     *
     * @param itemStorage
     * @return Итоговое кол-во ItemStorage.
     */
    removeItemStorage(itemStorage: GameObject): unsigned;
    render(callback: (itemStorages: GameObject[]) => void);

    addListener(code, callback);
}