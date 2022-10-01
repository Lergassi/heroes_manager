import ItemSlot from './ItemSlot.js';

export default class ItemSlots {
    private readonly _itemSlots: {[id: string]: ItemSlot};

    constructor(itemSlots: ItemSlot[]) {
        this._itemSlots = {};
        for (let i = 0; i < itemSlots.length; i++) {
            this._itemSlots[i.toString()] = itemSlots[i];
        }
    }

    get(key: string): ItemSlot | undefined {
        return this._itemSlots[key];
    }
}