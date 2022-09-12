import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import EquipSlot from '../Entities/EquipSlot.js';
import ItemStackSlot from '../RuntimeObjects/ItemStackSlot.js';
import ItemStack, {ItemStackPlaceInterface} from '../RuntimeObjects/ItemStack.js';
import Item from '../Entities/Item.js';
import AppError from '../../source/AppError.js';
import _ from 'lodash';
import HeroComponent from './HeroComponent.js';

export default class EquipSlotComponent extends Component implements ItemStackPlaceInterface {
    private readonly _equipSlot: EquipSlot;
    private _itemStack: ItemStack;

    get equipSlot(): EquipSlot {
        return this._equipSlot;
    }

    get itemStack(): ItemStack {
        return this._itemStack;
    }

    constructor(
        id: number,
        gameObject: GameObject,
        equipSlot: EquipSlot,
    ) {
        super(id, gameObject);
        this._equipSlot = equipSlot;
        this._itemStack = null;
    }

    canPlaceItem(item: Item): boolean {
        this._equipSlot.canEquipItem(item, this.gameObject.getComponentByName<HeroComponent>(HeroComponent.name))
        if (!this.isFree()) {
            throw new AppError('Слот занят. Сначала его нужно освободить.');
        }

        return true;
    }

    placeItemStack(itemStack: ItemStack): void {
        this.canPlaceItem(itemStack.item);
        this._itemStack = itemStack;

        this.update();
    }

    clear(): void {
        this._itemStack = null;

        this.update();
    }

    isFree(): boolean {
        return _.isNil(this._itemStack);
    }
}