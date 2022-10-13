import EquipSlotRule from './EquipSlotRule.js';
import Item from './Item.js';
import AppError from '../../source/Errors/AppError.js';
import HeroComponent from '../Components/HeroComponent.js';

export default class EquipSlot {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _sort: number;
    private readonly _rules: EquipSlotRule[];

    constructor(
        id: string,
        name: string,
        description: string,
        sort: number,
        rules: EquipSlotRule[],
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._sort = sort;
        this._rules = rules;
    }

    canEquipItem(item: Item, heroComponent: HeroComponent): boolean {
        //todo: Переделать на ооп. Проверка материала должна зависить от слота. Руки, пальцы, шея, тринкет не должны содержать проверку на материал. Пока за материал отвественность на создание объекта.
        if (item.properties.armorMaterial && !heroComponent.heroClass.availableArmorMaterial(item.properties.armorMaterial)) {
            throw AppError.equipNotAvailableByArmorMaterial(item.properties.armorMaterial, heroComponent.heroClass);
        }

        let availableItemCategory = false;
        for (let i = 0; i < this._rules.length; i++) {
            if (this._rules[i].availableItemForEquip(item)) {
                availableItemCategory = true;
                break;
            }
        }
        if (!availableItemCategory) {
            throw AppError.itemCategoryNotAvailable(item, this);
        }

        return true;
    }
}