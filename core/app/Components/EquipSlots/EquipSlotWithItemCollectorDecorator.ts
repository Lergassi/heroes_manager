// export default class EquipSlotWithItemCollectorDecorator implements EquipSlotInterface {
/**
 * @deprecated
 */
export default class EquipSlotWithItemCollectorDecorator {
    // private readonly _equipSlot: EquipSlotInterface;
    // private readonly _itemAttributeCollectionComponent: ItemCharacterAttributeCollector;
    // private _item: Item;
    //
    // constructor(equipSlot: EquipSlotInterface, itemAttributeCollectionComponent: ItemCharacterAttributeCollector) {
    //     this._equipSlot = equipSlot;
    //     this._itemAttributeCollectionComponent = itemAttributeCollectionComponent;
    //     this._item = null;
    // }
    //
    // equip(item: Item): boolean {
    //     this._itemAttributeCollectionComponent.addItem(item);
    //     this._item = item;
    //
    //     return this._equipSlot.equip(item);
    // }
    //
    // clear(): void {
    //     this._equipSlot.clear();
    //     this._itemAttributeCollectionComponent.removeItem(this._item);
    //     this._item = null;
    // }
    //
    // moveTo(itemStorage: ItemStorageInterface): boolean {
    //     if (!this._equipSlot.moveTo(itemStorage)) return false;
    //
    //     this.clear();
    //
    //     return true;
    // }
    //
    // isFree(): boolean {
    //     return this._equipSlot.isFree();
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