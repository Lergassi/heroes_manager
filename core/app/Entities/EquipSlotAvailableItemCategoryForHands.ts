import {HeroClassID} from '../../types/enums/HeroClassID.js';
import ItemCategory from './ItemCategory.js';
import EquipSlotAvailableItemCategoryInterface from '../Interfaces/EquipSlotAvailableItemCategoryInterface.js';

export default class EquipSlotAvailableItemCategoryForHands implements EquipSlotAvailableItemCategoryInterface {
    private readonly _itemCategories: { [heroClassID in HeroClassID]?: ItemCategory[] };

    constructor(itemCategories: { [heroClassID in HeroClassID]?/*todo: Временно. enum не удобно. А если классов будет 100? При добавлении нового класса нужно всю программу менять сразу.*/: ItemCategory[] }) {
        this._itemCategories = itemCategories;
    }

    getItemCategories(heroClassID: HeroClassID): ItemCategory[] {
        return this._itemCategories[heroClassID] ?? [];
    }
}