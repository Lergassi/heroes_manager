import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import ItemCharacterAttributeCollector from '../ItemCharacterAttributeCollector.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';

export default class EquipSlotWithItemCollectorDecorator implements EquipSlotInterface {
    private readonly _equipSlot: EquipSlotInterface;
    private readonly _itemCharacterAttributeCollection: ItemCharacterAttributeCollector;
    private _item: Item;

    constructor(equipSlot: EquipSlotInterface, itemAttributeCollectionComponent: ItemCharacterAttributeCollector) {
        this._equipSlot = equipSlot;
        this._itemCharacterAttributeCollection = itemAttributeCollectionComponent;
        this._item = null;
    }

    createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void {
        this._equipSlot.createItemStack(item, count, itemStackFactory);
        this._itemCharacterAttributeCollection.addItem(item);
        this._item = item;
    }

    clear(): void {
        if (!this.isFree()) {
            this._equipSlot.clear();
            this._itemCharacterAttributeCollection.removeItem(this._item);
            this._item = null;
        }
    }

    isFree(): boolean {
        return this._equipSlot.isFree();
    }

    render(callback: (values: {
        item: Item,
    }) => void) {
        this._equipSlot.render(callback);
    }

    equip(itemStack: ItemStack): void {
        this._equipSlot.equip(itemStack);
        this._itemCharacterAttributeCollection.addItem(itemStack.item);
        this._item = itemStack.item;
    }
}