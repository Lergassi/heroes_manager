import EquipSlot from '../Entities/EquipSlot.js';
import ItemStack, {ItemStackPlaceInterface} from '../RuntimeObjects/ItemStack.js';
import Item from '../Entities/Item.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import HeroComponent from './HeroComponent.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import EventSystem from '../../source/EventSystem.js';
import {unsigned} from '../../types/main.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {assert} from '../../source/assert.js';

export enum EquipSlotComponentEventCode {
    CreateItemStack = 'EquipSlotComponent.CreateItemStack',
    DestroyItemStack = 'EquipSlotComponent.DestroyItemStack',
}

/**
 * @deprecated Использовать DefaultEquipSlot, по рукам и тд.
 */
export default class EquipSlotComponent implements ItemStackPlaceInterface {
    private readonly _equipSlot: EquipSlot;
    private readonly _heroComponent: HeroComponent;
    private _itemStack: ItemStack;
    private _itemAttributeCollectionComponent: ItemCharacterAttributeCollector;

    /**
     * @deprecated
     */
    get equipSlot(): EquipSlot {
        return this._equipSlot;
    }

    get itemStack(): ItemStack {
        return this._itemStack;
    }

    constructor(
        equipSlot: EquipSlot,
        heroComponent: HeroComponent,
        itemAttributeCollectorComponent: ItemCharacterAttributeCollector,   //todo: В декоратор.
    ) {
        this._equipSlot = equipSlot;
        this._heroComponent = heroComponent;
        this._itemAttributeCollectionComponent = itemAttributeCollectorComponent;
        this._itemStack = null;
    }

    canPlaceItem(item: Item): boolean {
        // this._equipSlot.canEquipItem(item, this._heroComponent);
        if (!this.isFree()) {
            throw new AppError('Слот занят. Сначала его нужно освободить.');
        }

        return true;
    }

    /**
     * @deprecated Для создания использовать метод createItemStack.
     * @param itemStack
     */
    placeItemStack(itemStack: ItemStack): void {
        this.canPlaceItem(itemStack.item);
        this._itemStack = itemStack;
        // this._itemAttributeCollectionComponent.addItem(itemStack.item);
    }

    //todo: Сделать один интерфейс.
    createItemStack(options: {
        item: Item,
        count: unsigned,
        itemStackFactory: ItemStackFactory,
    }): void {
        assert(options.itemStackFactory instanceof ItemStackFactory);

        this.canPlaceItem(options.item);
        this._itemStack = options.itemStackFactory.create(options.item, options.count);
        // this._itemAttributeCollectionComponent.addItem(options.item);
    }

    clear(): void { //todo: Переименовать в destroy.
        if (this.isBusy()) {
            // this._itemAttributeCollectionComponent.removeItem(this._itemStack.item);
            this._itemStack = null;
            EventSystem.event(EquipSlotComponentEventCode.DestroyItemStack, this);
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