import React from 'react';
import ReactDOM from 'react-dom/client';
import ItemStorageSlotComponent from '../../../core/app/Components/ItemStorageSlotComponent.js';

export interface ItemStorageSlotRComponentProps {
    itemStorageSlotComponent: ItemStorageSlotComponent;
}

export default class ItemStorageSlotRComponent extends React.Component<ItemStorageSlotRComponentProps, any>{
    private _itemStorageSlotComponent: ItemStorageSlotComponent;

    constructor(props: ItemStorageSlotRComponentProps) {
        super(props);

        this._itemStorageSlotComponent = props.itemStorageSlotComponent;
    }

    render() {
        let itemStack;
        if (!this._itemStorageSlotComponent.isFree()) {
            // itemStack
        }

        return (
            <div>

            </div>
        );
    }
}