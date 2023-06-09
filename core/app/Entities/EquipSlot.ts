import EquipSlotAvailableItemCategoryInterface from '../Interfaces/EquipSlotAvailableItemCategoryInterface.js';

export default class EquipSlot {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _sort: number;
    private readonly _itemCategories: EquipSlotAvailableItemCategoryInterface;

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get sort(): number {
        return this._sort;
    }

    get itemCategories(): EquipSlotAvailableItemCategoryInterface {
        return this._itemCategories;
    }

    constructor(
        id: string,
        name: string,
        sort: number,
        itemCategories: EquipSlotAvailableItemCategoryInterface,
    ) {
        this._id = id;
        this._name = name;
        this._sort = sort;
        this._itemCategories = itemCategories;
    }
}