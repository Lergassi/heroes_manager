import HeroClass from './HeroClass.js';
import ItemCategory from './ItemCategory.js';

export default class EquipSlotRule {
    private readonly _heroClass: HeroClass;
    private readonly _itemCategories: ItemCategory[];

    get heroClass(): HeroClass {
        return this._heroClass;
    }

    get itemCategories(): ItemCategory[] {
        return this._itemCategories;
    }

    constructor(heroClass: HeroClass, itemCategories: ItemCategory[]) {
        this._heroClass = heroClass;
        this._itemCategories = itemCategories;
    }
}