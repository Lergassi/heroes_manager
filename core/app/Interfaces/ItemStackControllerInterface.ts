import {ItemID} from '../../types/enums/ItemID.js';
import ItemStorageInterface from './ItemStorageInterface.js';

export interface ItemStackControllerInterfaceRender {
    updateItem(itemID: ItemID, count: number): void;
    // removeItem(): void;
}

// export default interface ItemStackControllerInterface extends ItemStorageInterface {
export default interface ItemStackControllerInterface {
    renderByRequest(ui: ItemStackControllerInterfaceRender): void;
}