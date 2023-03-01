import ArmorMaterial from '../../Entities/ArmorMaterial.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import _ from 'lodash';
import AppError from '../../../source/Errors/AppError.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';

// export default class EquipSlotWithArmorMaterialDecorator implements EquipSlotInterface {
/**
 * @deprecated
 */
export default class EquipSlotWithArmorMaterialDecorator {
    // private readonly _equipSlot: EquipSlotInterface;
    // private readonly _armorMaterials: ArmorMaterial[];
    //
    // constructor(equipSlot: EquipSlotInterface, armorMaterials: ArmorMaterial[]) {
    //     this._equipSlot = equipSlot;
    //     this._armorMaterials = armorMaterials;
    // }
    //
    // equip(item: Item): boolean {
    //     if (!this.canEquip(item)) return false;
    //
    //     return this._equipSlot.equip(item);
    // }
    //
    // clear(): void {
    //     this._equipSlot.clear();
    // }
    //
    // moveTo(itemStorage: ItemStorageInterface): boolean {
    //     return this._equipSlot.moveTo(itemStorage);
    // }
    //
    // isFree(): boolean {
    //     return this._equipSlot.isFree();
    // }
    //
    // canEquip(item: Item): boolean {
    //     if (!item.properties.armorMaterial) {
    //         debug(DebugNamespaceID.Throw)('Предмет без материала нельзя экипировать в данный слот.');
    //         return false;
    //     }
    //
    //     if (!item.hasArmorMaterial(this._armorMaterials)) {
    //         debug(DebugNamespaceID.Throw)(sprintf('Предмет "%s" с материалом "%s" не доступен для класса.', item.id, item.properties.armorMaterial.id));
    //         return false;
    //     }
    //
    //     return true;
    // }
    //
    // renderByRequest(ui: EquipSlotInterfaceRender): void {
    //     this._equipSlot.renderByRequest(ui);
    // }
    //
    // debug(): void {
    //     this._equipSlot.debug();
    // }
}