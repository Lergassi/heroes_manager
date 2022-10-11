import Component from '../../source/Component.js';
import EquipSlot from '../Entities/EquipSlot.js';
import ItemStack, {ItemStackPlaceInterface} from '../RuntimeObjects/ItemStack.js';
import Item from '../Entities/Item.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import HeroComponent from './HeroComponent.js';
import ItemAttributeCollectorComponent from './ItemAttributeCollectorComponent.js';
import EventSystem from '../../source/EventSystem.js';

export enum EquipSlotComponentEventCode {
    PlaceItemStack = 'EquipSlotComponent.placeItemStack',
    Clear = 'EquipSlotComponent.Clear',
}

export default class EquipSlotComponent extends Component implements ItemStackPlaceInterface {
    private readonly _equipSlot: EquipSlot;
    private readonly _heroComponent: HeroComponent;
    private _itemStack: ItemStack;
    private _increaseItemCollectorComponent: ItemAttributeCollectorComponent;

    get equipSlot(): EquipSlot {
        return this._equipSlot;
    }

    get itemStack(): ItemStack {
        return this._itemStack;
    }

    constructor(options: {
        equipSlot: EquipSlot,
        heroComponent: HeroComponent,
        increaseItemCollectorComponent: ItemAttributeCollectorComponent,
    }) {
        super();
        this._equipSlot = options.equipSlot;
        this._heroComponent = options.heroComponent;
        this._itemStack = null;
        this._increaseItemCollectorComponent = options.increaseItemCollectorComponent;
    }

    canPlaceItem(item: Item): boolean {
        // this._equipSlot.canEquipItem(item, this.gameObject.getComponentByName<HeroComponent>(HeroComponent.name))
        this._equipSlot.canEquipItem(item, this._heroComponent)
        if (!this.isFree()) {
            throw new AppError('Слот занят. Сначала его нужно освободить.');
        }

        return true;
    }

    placeItemStack(itemStack: ItemStack): void {
        this.canPlaceItem(itemStack.item);
        this._itemStack = itemStack;
        this._increaseItemCollectorComponent.addItem(itemStack.item);

        this.update();
    }

    clear(): void { //todo: Переименовать в destroy.
        if (this.isBusy()) {
            this._increaseItemCollectorComponent.removeItem(this._itemStack.item);
            this._itemStack = null;
            EventSystem.event(EquipSlotComponentEventCode.Clear, this);
        }

        // this.update();
    }

    isBusy(): boolean {
        return !_.isNil(this._itemStack);
    }

    isFree(): boolean {
        return !this.isBusy();
    }
}