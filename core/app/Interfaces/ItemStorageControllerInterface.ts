import GameObject from '../../source/GameObject.js';

export interface ItemStorageControllerInterfaceRender {
    updateItemStorages?(itemStorages: GameObject[]): void;
}

//todo: Придумать другое название.
export default interface ItemStorageControllerInterface {
    get length(): number;

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

    renderByRequest(ui: ItemStorageControllerInterfaceRender): void;
}