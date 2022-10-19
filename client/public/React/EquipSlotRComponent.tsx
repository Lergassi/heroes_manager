import EquipSlotComponent from '../../../core/app/Components/EquipSlotComponent.js';
import React from 'react';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import EquipSlotInterface from '../../../core/app/Interfaces/EquipSlotInterface.js';

export interface EquipSlotRComponentProps {
    // equipSlotComponent: EquipSlotComponent,
    equipSlotComponent: EquipSlotInterface,
    name: string,
    updateHandler: () => void,
}

export interface EquipSlotRComponentState {
    equipSlotComponent: EquipSlotInterface,
}

export default class EquipSlotRComponent extends React.Component<EquipSlotRComponentProps, EquipSlotRComponentState> implements RComponentUpdateInterface {
    constructor(props: EquipSlotRComponentProps) {
        super(props);

        this.state = {
            equipSlotComponent: props.equipSlotComponent,
        };

        // this.state.equipSlotComponent.assignRComponent(this);
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
        this.props.equipSlotComponent.destroyItemStack();
        this.props.updateHandler();
    }

    render() {
        // let equipSlotComponent = this.state.equipSlotComponent;
        let equipSlotComponent = this.props.equipSlotComponent;
        // console.log(equipSlotComponent);
        let r;
        equipSlotComponent.render((values) => {
            r = (<span>{values.item ? values.item.name : 'Пусто'}</span>);
        });
        return (
            <tr>
                {/*<td>{equipSlotComponent['_id']}</td>*/}
                {/*<td>{equipSlotComponent.equipSlot['_name']/*todo: Доступ.*!/</td>*/}
                <td>{this.props.name ?? 'asd'}</td>
                <td>
                    {/*<ItemStackTextRComponent*/}
                    {/*    itemStack={equipSlotComponent.itemStack}*/}
                    {/*/>*/}
                    {r}
                </td>
                <td><button onClick={this.clearHandler}>Очистить</button></td>
            </tr>
        );
    }
}