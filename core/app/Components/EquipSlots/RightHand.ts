import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../types.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import LeftHand from './LeftHand.js';
import DefaultEquipSlot from './DefaultEquipSlot.js';
import {assertNotNil} from '../../../source/assert.js';

export default class RightHand implements EquipSlotInterface {
    private readonly _equipSlot: EquipSlotInterface;
    private readonly _leftHand: LeftHand;

    constructor(leftHand: LeftHand) {
        assertNotNil(leftHand);

        this._leftHand = leftHand;
        this._equipSlot = new DefaultEquipSlot();
    }

    createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void {
        this._equipSlot.createItemStack(item, count, itemStackFactory);
        if (item.isTwoHandWeapon()) {
            console.log(this._leftHand);
            this._leftHand.block();
        }
    }

    destroyItemStack(): void {
        this._equipSlot.destroyItemStack();
        this._leftHand.unblock();
    }

    equip(itemStack: ItemStack): void {
        this._equipSlot.equip(itemStack);
    }

    isFree(): boolean {
        return this._equipSlot.isFree();
    }

    render(callback: (values: {
        item: Item,
    }) => void) {
        this._equipSlot.render(callback);
    }
}