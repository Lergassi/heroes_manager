import Component from '../../source/Component.js';
import ItemStackSlot from '../RuntimeObjects/ItemStackSlot.js';
import ItemStack, {ItemStackPlaceInterface} from '../RuntimeObjects/ItemStack.js';
import GameObject from '../../source/GameObject.js';
import Item from '../Entities/Item.js';
import _ from 'lodash';
import AppError from '../../source/Errors/AppError.js';
import RComponentBridge, {AssignRComponentInterface} from '../../../client/source/RComponentBridge.js';
import ItemStorageComponent from './ItemStorageComponent.js';

export default class ItemStorageSlotComponent extends Component implements ItemStackPlaceInterface, AssignRComponentInterface {
    private _itemStack: ItemStack;

    get itemStack(): ItemStack {
        return this._itemStack;
    }

    constructor(id?: number, gameObject?: GameObject) {
        super(id, gameObject);
        this._itemStack = null;
    }

    canPlaceItem(item: Item): boolean {
        if (!this.isFree()) {
            throw new AppError('Слот занят. Сначала его нужно освободить.');
        }

        return true;
    }

    placeItemStack(itemStack: ItemStack): void {
        this.canPlaceItem(itemStack.item);
        this._itemStack = itemStack;
        this.update();

        // this.gameObject.update();
    }

    isBusy(): boolean {
        return !_.isNil(this._itemStack);
    }

    isFree(): boolean {
        return !this.isBusy();
    }

    clear(): void {
        this._itemStack = null;

        // this.gameObject.update();
        this.update();
    }

    // assignRComponent(rComponent): void {
    //     this._rComponentBridge.rComponent = rComponent;
    // }
    //
    // update() {
    //     this._rComponentBridge.update(this);
    // }
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