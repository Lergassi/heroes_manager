import ItemStorageSlotComponent, {
    ItemStorageSlotComponentEventCode
} from '../../../core/app/Components/ItemStorageSlotComponent.js';
import React from 'react';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';

export interface ItemStorageSlotRComponentProps {
    itemStorageSlotComponent: ItemStorageSlotComponent;
    ID: string;
}

export interface ItemStorageSlotRComponentState {
    itemStorageSlotComponent: ItemStorageSlotComponent;
}

/**
 * Только для слота в сумках. todo: Для других случаях нужен другой компонент.
 */
export default class ItemStorageSlotRComponent extends React.Component<ItemStorageSlotRComponentProps, ItemStorageSlotRComponentState> implements RComponentUpdateInterface {
    constructor(props: ItemStorageSlotRComponentProps) {
        super(props);

        this.state = {
            itemStorageSlotComponent: props.itemStorageSlotComponent,
        };
        // this.state.itemStorageSlotComponent.assignRComponent(this); qweqweqwe

        EventSystem.addListener({
            codes: [ItemStorageSlotComponentEventCode.Update],
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

    update(): void {
        this.setState(state => ({
            itemStorageSlotComponent: state.itemStorageSlotComponent,
        }));
    }

    clearHandler() {
        this.state.itemStorageSlotComponent.destroyItemStack();
    }

    render() {
        return (
            <tr>
                {/*<td>{this.state.itemStorageSlotComponent['_id']}</td>*/}
                <td>{this.props.ID}</td>
                <td>
                    <ItemStackTextRComponent
                        itemStack={this.state.itemStorageSlotComponent.itemStack}
                    />
                </td>
                <td><button onClick={this.clearHandler}>Очистить</button></td>
        </tr>
    );
    }
}