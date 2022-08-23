import ItemCategory from './ItemCategory.js';
import Quality from './Quality.js';
import ArmorMaterial from './ArmorMaterial.js';

export default class Item {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _alias: string;
    private readonly _description: string;
    private readonly _stackSize: number;
    private readonly _itemLevel: number;
    private readonly _sort: number;
    private readonly _isEquipable: boolean;
    private readonly _itemCategory: ItemCategory;
    private readonly _quality: Quality;
    private readonly _armorMaterial: ArmorMaterial; //todo: Временно. Необязательные параметры перенести в другое место.

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get alias(): string {
        return this._alias;
    }

    get description(): string {
        return this._description;
    }

    get stackSize(): number {
        return this._stackSize;
    }

    get itemLevel(): number {
        return this._itemLevel;
    }

    get sort(): number {
        return this._sort;
    }

    get isEquipable(): boolean {
        return this._isEquipable;
    }

    get itemCategory(): ItemCategory {
        return this._itemCategory;
    }

    get quality(): Quality {
        return this._quality;
    }

    get armorMaterial(): ArmorMaterial {
        return this._armorMaterial;
    }

    constructor (
        id: string,
        name: string,
        alias: string,
        description: string,
        stackSize: number,
        itemLevel: number,
        sort: number,
        isEquipable: boolean,
        itemCategory: ItemCategory,
        quality: Quality,
        armorMaterial: ArmorMaterial,
    ) {
        this._id = id;
        this._name = name;
        this._alias = alias;
        this._description = description;
        this._stackSize = stackSize;
        this._itemLevel = itemLevel;
        this._sort = sort;
        this._isEquipable = isEquipable;
        this._itemCategory = itemCategory;
        this._quality = quality;
        this._armorMaterial = armorMaterial;
    }
}