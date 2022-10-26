import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import ArmorMaterial from '../../Entities/ArmorMaterial.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/types.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import _ from 'lodash';
import AppError from '../../../source/Errors/AppError.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';

export default class EquipSlotWithArmorMaterialDecorator implements EquipSlotInterface {
    private readonly _equipSlot: EquipSlotInterface;
    private readonly _armorMaterials: ArmorMaterial[];

    constructor(equipSlot: EquipSlotInterface, armorMaterials: ArmorMaterial[]) {
        this._equipSlot = equipSlot;
        this._armorMaterials = armorMaterials;
    }

    createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void {
        this._assertCanEquip(item);

        this._equipSlot.createItemStack(item, count, itemStackFactory);
    }

    clear(): void {
        this._equipSlot.clear();
    }

    isFree(): boolean {
        return this._equipSlot.isFree();
    }

    equip(itemStack: ItemStack): void {
        this._assertCanEquip(itemStack.item);

        this._equipSlot.equip(itemStack);
    }

    render(callback: (values: {
        item: Item,
    }) => void) {
        this._equipSlot.render(callback);
    }

    private _assertCanEquip(item: Item): void {
        if (!item.hasArmorMaterial(this._armorMaterials)) {
            throw AppError.equipNotAvailableByArmorMaterial();
        }
    }
}