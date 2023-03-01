import EquipSlotInterface, {
    EquipSlotInterfaceRender,
} from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import ItemCategory from '../../Entities/ItemCategory.js';
import _ from 'lodash';
import AppError from '../../../source/Errors/AppError.js';
import {assertIsArray, assertIsMinLength, assertNotNil} from '../../../source/assert.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import {resolveObjectURL} from 'buffer';
import debug from 'debug';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';

//todo: Далее внутри, без зависимостей, может быть компонент вообще без правил, просто для размещения предмета.
// export default class EquipSlotWithItemCategoryDecorator implements EquipSlotInterface {
/**
 * @deprecated
 */
export default class EquipSlotWithItemCategoryDecorator {
    // private readonly _equipSlot: EquipSlotInterface;
    // private readonly _availableItemCategories: ItemCategory[];
    //
    // constructor(equipSlot: EquipSlotInterface, availableItemCategories: ItemCategory[]) {
    //     assertNotNil(equipSlot);
    //     assertIsArray(availableItemCategories);
    //
    //     this._equipSlot = equipSlot;
    //     this._availableItemCategories = availableItemCategories;
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
    //     if (!this.isFree()) {
    //         debug(DebugNamespaceID.Throw)('Слот занят.');
    //         return false;
    //     }
    //
    //     if (!item.hasItemCategory(this._availableItemCategories)) {
    //         debug(DebugNamespaceID.Throw)(sprintf('Предмет категории %s нельзя экипировать в выбранный слот.', item.itemCategory.id));
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