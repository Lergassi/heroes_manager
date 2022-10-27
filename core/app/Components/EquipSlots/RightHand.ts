import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import LeftHand from './LeftHand.js';
import DefaultEquipSlot from './DefaultEquipSlot.js';
import {assertNotNil} from '../../../source/assert.js';

export default class RightHand implements EquipSlotInterface {
    private readonly _equipSlot: EquipSlotInterface;
    private readonly _leftHand: LeftHand;

    constructor(leftHand: LeftHand) {
    // constructor() {
        assertNotNil(leftHand);

        this._leftHand = leftHand;
        this._equipSlot = new DefaultEquipSlot();
    }

    createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void {
        this._equipSlot.createItemStack(item, count, itemStackFactory);
        if (item.isTwoHandWeapon()) {
            this._leftHand.block();
        }
    }

    clear(): void {
        this._equipSlot.clear();
        this._leftHand.unblock();
    }

    isFree(): boolean {
        return this._equipSlot.isFree();
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