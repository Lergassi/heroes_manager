import Component from '../../source/Component.js';
import ItemStack, {ItemStackPlaceInterface} from '../RuntimeObjects/ItemStack.js';
import GameObject from '../../source/GameObject.js';
import Item from '../Entities/Item.js';
import _ from 'lodash';
import AppError from '../../source/Errors/AppError.js';
import {AssignRComponentInterface} from '../../../client/source/RComponentBridge.js';
import {unsigned} from '../types.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';

export default class ItemStorageSlotComponent extends Component implements ItemStackPlaceInterface, AssignRComponentInterface {
    private _itemStack: ItemStack;

    get itemStack(): ItemStack {
        return this._itemStack;
    }

    constructor() {
        super();
        this._itemStack = null;
    }

    canPlaceItem(item: Item): boolean {
        if (!this.isFree()) {
            throw new AppError('Слот занят. Сначала его нужно освободить.');
        }

        return true;
    }

    /**
     * Создает ItemStack. Если count > stackSize генерируется исключение. Для добавления и объединения предметов использовать другие методы.
     * @param options
     */
    createItemStack(options: {
        item: Item,
        count: unsigned,
        itemStackFactory: ItemStackFactory,
    }) {
        this.canPlaceItem(options.item);

        this._itemStack = options.itemStackFactory.create(options.item, options.count);

        this.update();
    }

    placeItemStack(itemStack: ItemStack): void {
        this.canPlaceItem(itemStack.item);

        this._itemStack = itemStack;

        this.update();
    }

    isBusy(): boolean {
        return !_.isNil(this._itemStack);
    }

    isFree(): boolean {
        return !this.isBusy();
    }

    destroyItemStack(): void {
        this._itemStack = null;

        this.update();
    }

    containsItem(item: Item): boolean {
        return this._itemStack && this._itemStack.containsItem(item);
    }

    render(callback: (values: {
        itemStack: ItemStack,
    }) => void) {
        callback({
            itemStack: this._itemStack,
        });
    }
}