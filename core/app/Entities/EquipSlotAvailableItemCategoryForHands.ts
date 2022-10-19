import {HeroClassID} from '../../types/enums/HeroClassID.js';
import ItemCategory from './ItemCategory.js';
import EquipSlotAvailableItemCategoryInterface from '../Interfaces/EquipSlotAvailableItemCategoryInterface.js';

export default class EquipSlotAvailableItemCategoryForHands implements EquipSlotAvailableItemCategoryInterface {
    private _itemCategories: {[heroClassID in HeroClassID]: ItemCategory[]};

    constructor(itemCategories: {[heroClassID in HeroClassID]: ItemCategory[]}) {
        this._itemCategories = itemCategories;
    }

    get(heroClassID: HeroClassID): ItemCategory[] {
        return this._itemCategories[heroClassID] ?? [];
    }
}