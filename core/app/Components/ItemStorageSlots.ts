import ItemStorageSlotComponent from './ItemStorageSlotComponent.js';

export type ItemStorageSlotsRender = {
    // items: number[];
    itemStorageSlots: ItemStorageSlotComponent[];
}

// export default class ItemStorageSlots<R> {
export default class ItemStorageSlots {
    private readonly _itemStorageSlots: ItemStorageSlotComponent[];
    // private readonly _items: number[];

    constructor(itemStorageSlots: ItemStorageSlotComponent[]) {
    // constructor(items: number[]) {
        this._itemStorageSlots = itemStorageSlots;
        // this._items = items;
    }

    /**
     * @indev
     * @param index
     */
    get(index: number): ItemStorageSlotComponent {
        return this._itemStorageSlots[index];
    }

    render(callback: (values: any) => any) {
        return callback({
            // items: this._items,
            itemStorageSlots: this._itemStorageSlots,
        } as ItemStorageSlotsRender);
    }
}