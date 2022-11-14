import GameObject from '../../source/GameObject.js';
import {unsigned} from '../../types/main.js';

//todo: Придумать другое название.
export default interface ItemStorageControllerInterface {
    /**
     *
     * @param itemStorage
     * @return Итоговое кол-во ItemStorage, -1 в случае ошибки.
     */
    addItemStorage(itemStorage: GameObject): number;

    /**
     *
     * @param itemStorage
     * @return Итоговое кол-во ItemStorage, -1 в случае ошибки.
     */
    removeItemStorage(itemStorage: GameObject): number;
    render(callback: (itemStorages: GameObject[]) => void);
    get length(): number;

    // addListener(code, callback);
}