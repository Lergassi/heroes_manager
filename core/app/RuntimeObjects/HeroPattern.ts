import HeroClass from '../Entities/HeroClass.js';
import EquipSlot from '../Entities/EquipSlot.js';
import Item from '../Entities/Item.js';
import AppError from '../../source/AppError.js';
import ItemStack from './ItemStack.js';
import ItemStackPattern from './ItemStackPattern.js';

export class EquipSlotItemStackBuilder {
    private readonly _equipSlot: EquipSlot;
    private readonly _itemStackBuilder: ItemStackPattern;

    constructor(equipSlot: EquipSlot, item: Item) {
        if (!item.isEquipable) {
            throw AppError.itemNotEquipable(item);
        }

        if (!equipSlot.availableItemForEquip(item)) {
            throw AppError.itemNotAvailableForEquip(item, equipSlot);
        }

        this._equipSlot = equipSlot;
        this._itemStackBuilder = new ItemStackPattern(item);
    }

    build(): ItemStack {
        return this._itemStackBuilder.build();
    }
}

export default class HeroPattern {
    private readonly _heroClass: HeroClass;
    private readonly _level: number;
    private readonly _equip: EquipSlotItemStackBuilder[];

    constructor(
        heroClass: HeroClass,
        level: number,
        equip: EquipSlotItemStackBuilder[],
    ) {
        this._heroClass = heroClass;
        this._level = level;
        this._equip = equip;
    }
}