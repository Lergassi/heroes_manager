import EquipSlotRule from './EquipSlotRule.js';
import Item from './Item.js';
import AppError from '../../source/Errors/AppError.js';
import HeroComponent from '../Components/HeroComponent.js';
import ItemCategory from './ItemCategory.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import EquipSlotAvailableItemCategoryInterface from '../Interfaces/EquipSlotAvailableItemCategoryInterface.js';

export default class EquipSlot {
    readonly id: string;
    readonly name: string;
    readonly sort: number;
    readonly itemCategories: EquipSlotAvailableItemCategoryInterface;

    constructor(
        id: string,
        name: string,
        sort: number,
        itemCategories: EquipSlotAvailableItemCategoryInterface,
    ) {
        this.id = id;
        this.name = name;
        this.sort = sort;
        this.itemCategories = itemCategories;
    }

    /**
     * @deprecated
     * @param item
     * @param heroComponent
     */
    canEquipItem(item: Item, heroComponent: HeroComponent): void {
        // //todo: Переделать на ооп. Проверка материала должна зависить от слота. Руки, пальцы, шея, тринкет не должны содержать проверку на материал. Пока за материал отвественность на создание объекта.
        // if (item.properties.armorMaterial && !heroComponent.heroClass.availableArmorMaterial(item.properties.armorMaterial)) {
        //     throw AppError.equipNotAvailableByArmorMaterial(item.properties.armorMaterial, heroComponent.heroClass);
        // }
        //
        // let availableItemCategory = false;
        // for (let i = 0; i < this._rules.length; i++) {
        //     if (this._rules[i].availableItemForEquip(item)) {
        //         availableItemCategory = true;
        //         break;
        //     }
        // }
        // if (!availableItemCategory) {
        //     throw AppError.itemCategoryNotAvailable(item, this);
        // }
        //
        // return true;
        throw AppError.deprecated();
    }
}