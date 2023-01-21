import ItemStorageInterface from './ItemStorageInterface.js';

export interface ItemStackControllerInterfaceRender {
    updateItem(itemName: string, count: number): void;
    // removeItem(): void;
}

// export default interface ItemStackControllerInterface extends ItemStorageInterface {
export default interface ItemStackControllerInterface {
    renderByRequest(ui: ItemStackControllerInterfaceRender): void;
}