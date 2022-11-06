import ItemStorageSlotComponent, {
    ItemStorageSlotComponentEventCode
} from '../../../core/app/Components/ItemStorageSlotComponent.js';
import React from 'react';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';
import {EventCode} from '../../../core/types/enums/EventCode.js';

export interface ItemStorageSlotRComponentProps {
    itemStorageSlotComponent: ItemStorageSlotComponent;
    ID: string;
}

export interface ItemStorageSlotRComponentState {
    itemStorageSlotComponent: ItemStorageSlotComponent;
}

export default class ItemStorageSlotRComponent extends React.Component<ItemStorageSlotRComponentProps, ItemStorageSlotRComponentState> {
    constructor(props: ItemStorageSlotRComponentProps) {
        super(props);

        this.state = {
            itemStorageSlotComponent: props.itemStorageSlotComponent,
        };

        EventSystem.addListener({
            codes: [
                ItemStorageSlotComponentEventCode.Update,
                EventCode.ItemStorageSlot_Clear,
            ],
            listener: {
                target: props.itemStorageSlotComponent,
                callback: (target) => {
                    this.setState((state) => {
                        return {
                            itemStorageSlotComponent: state.itemStorageSlotComponent,
                        };
                    });
                },
            },
        });

        this.clearHandler = this.clearHandler.bind(this);
    }

    clearHandler() {
        this.state.itemStorageSlotComponent.destroyItemStack();
    }

    render() {
        let itemStorageSlot = this.state.itemStorageSlotComponent;

        // return (
        //     <tr>
        //         <td>{this.props.ID}</td>
        //         <td>
        //             <ItemStackTextRComponent
        //                 itemStack={itemStorageSlot.itemStack}
        //             />
        //         </td>
        //         <td><button onClick={this.clearHandler}>Очистить</button></td>
        //     </tr>
        // );
        return this.template1(this.props.ID, itemStorageSlot);
        // return this.template2(this.props.ID, itemStorageSlot);
    }

    template1(ID, itemStorageSlot) {
        return (
            <tr>
                <td>{ID}</td>
                <td>
                    <ItemStackTextRComponent
                        itemStack={itemStorageSlot.itemStack}
                    />
                </td>
                <td><button onClick={this.clearHandler}>Очистить</button></td>
            </tr>
        );
    }

    template2(ID, itemStorageSlot) {
        return <div>42</div>
    }
}