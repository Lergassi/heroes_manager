import EquipSlotComponent from '../../../core/app/Components/EquipSlotComponent.js';
import React from 'react';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';

export interface EquipSlotRComponentProps {
    equipSlotComponent: EquipSlotComponent,
    updateHandler: () => void,
}

export interface EquipSlotRComponentState {
    equipSlotComponent: EquipSlotComponent,
}

export default class EquipSlotRComponent extends React.Component<EquipSlotRComponentProps, EquipSlotRComponentState> implements RComponentUpdateInterface {
    constructor(props: EquipSlotRComponentProps) {
        super(props);

        this.state = {
            equipSlotComponent: props.equipSlotComponent,
        };

        this.state.equipSlotComponent.assignRComponent(this);
        // EventSystem.addListener({
        //     codes: [
        //         EquipSlotComponentEventCode.PlaceItemStack,
        //         EquipSlotComponentEventCode.Clear,
        //     ],
        //     listener: {
        //         callback: (target) => {
        //             console.log(4242424);
        //             this.setState((state) => {
        //                 return {
        //                     equipSlotComponent: state.target,
        //                 };
        //             });
        //         },
        //         target: this.state.equipSlotComponent,
        //     },
        // });

        this.clearHandler = this.clearHandler.bind(this);
    }

    // update(target) {
    update() {
        this.setState((state) => ({
            // equipSlotComponent: target,
            equipSlotComponent: state.equipSlotComponent,
        }));
    }

    clearHandler() {
        this.props.equipSlotComponent.clear();
        this.props.updateHandler();
    }

    render() {
        // let equipSlotComponent = this.state.equipSlotComponent;
        let equipSlotComponent = this.props.equipSlotComponent;
        return (
            <tr>
                <td>{equipSlotComponent['_id']}</td>
                <td>{equipSlotComponent.equipSlot.name}</td>
                <td>
                    <ItemStackTextRComponent
                        itemStack={equipSlotComponent.itemStack}
                    />
                </td>
                <td><button onClick={this.clearHandler}>Очистить</button></td>
            </tr>
        );
    }
}