import {HeroClassID} from '../../types/enums/HeroClassID.js';
import ItemCategory from './ItemCategory.js';
import EquipSlotAvailableItemCategoryInterface from '../Interfaces/EquipSlotAvailableItemCategoryInterface.js';

export default class EquipSlotAvailableItemCategory implements EquipSlotAvailableItemCategoryInterface {
    private readonly _itemCategories: ItemCategory[];

    constructor(itemCategories: ItemCategory[]) {
        this._itemCategories = itemCategories;
    }

    getItemCategories(heroClassID: HeroClassID): ItemCategory[] {
        return this._itemCategories;
    }
}