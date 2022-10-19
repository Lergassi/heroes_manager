import {HeroClassID} from '../../types/enums/HeroClassID.js';
import ItemCategory from './ItemCategory.js';
import EquipSlotAvailableItemCategoryInterface from '../Interfaces/EquipSlotAvailableItemCategoryInterface.js';

export default class EquipSlotAvailableItemCategory implements EquipSlotAvailableItemCategoryInterface {
    private _itemCategories: ItemCategory[];

    constructor(itemCategories: ItemCategory[]) {
        this._itemCategories = itemCategories;
    }

    get(heroClassID: HeroClassID): ItemCategory[] {
        return this._itemCategories;
    }
}