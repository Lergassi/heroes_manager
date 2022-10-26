import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/types.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import DefaultEquipSlot from './DefaultEquipSlot.js';
import AppError from '../../../source/Errors/AppError.js';
import RightHand from './RightHand.js';

export default class LeftHand implements EquipSlotInterface {
    private _equipSlot: EquipSlotInterface
    // private _rightHand: EquipSlotInterface
    private _isBlock: boolean

    constructor() {
    // constructor(rightHand: EquipSlotInterface) {
        this._equipSlot = new DefaultEquipSlot();
        // this._rightHand = new DefaultEquipSlot();
        this._isBlock = false;
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
        // return this._equipSlot.isFree() && this._rightHand.isFree();
    }

    block() {
        this._isBlock = true;
    }

    unblock() {
        this._isBlock = false;
    }

    private _assertCanEquip(item: Item): void {
        if (this._isBlock) {
        // if (!this.isFree()) {
            throw new AppError('Слот заблокирован.');
        }
    }

    render(callback: (values: {
        item: Item,
    }) => void) {
        this._equipSlot.render(callback);
    }

    equip(itemStack: ItemStack) {
        this._equipSlot.equip(itemStack);
    }
}