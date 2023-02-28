import _ from 'lodash';
import debug from 'debug';
import React, {BaseSyntheticEvent, ReactEventHandler, SyntheticEvent} from 'react';
import ReactDOM from 'react-dom/client';
import EquipController from '../../../core/app/Components/EquipController.js';
import ItemStorageController, {
    ItemStorageControllerRender
} from '../../../core/app/Components/ItemStorages/ItemStorageController.js';
import {ItemStorageInterfaceRender} from '../../../core/app/Interfaces/ItemStorageInterface.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import {CommandID} from '../../../core/types/enums/CommandID.js';
import {EquipSlotID} from '../../../core/types/enums/EquipSlotID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_ItemStorage, UI_ItemStorageSlot} from '../../../core/types/main.js';
import UIUpdater from '../../app/UIUpdater.js';

export interface EquipItemListRCProps {
    container: ContainerInterface;
    itemStorageController: ItemStorageController;
    equipSlotIDs: EquipSlotID[];
    equipController: EquipController;
}

export interface EquipItemListRCState {
    itemStorageController: ItemStorageController;
    selectedEquipSlotID: EquipSlotID;
    selectedItemStorageID: number;
    selectedItemStorageSlotID: number;
    itemStorages: UI_ItemStorage[];
}

export default class EquipItemListRC extends React.Component<EquipItemListRCProps, EquipItemListRCState> implements ItemStorageControllerRender {
    constructor(props: EquipItemListRCProps) {
        super(props);

        this.state = {
            itemStorageController: this.props.itemStorageController,
            selectedEquipSlotID: this.props.equipSlotIDs.length ? this.props.equipSlotIDs[0] : undefined,
            itemStorages: [],
            selectedItemStorageID: undefined,
            selectedItemStorageSlotID: undefined,
        };

        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);

        this.move = this.move.bind(this);
        this.handlerOnChangeItemStorageSlot = this.handlerOnChangeItemStorageSlot.bind(this);
        this.handlerOnChangeEquipSlot = this.handlerOnChangeEquipSlot.bind(this);
    }

    updateByRequest(): void {
        this.state.itemStorageController.renderItemStorageControllerByRequest(this);
    }

    updateSlots(itemStorageID: number, slots: UI_ItemStorageSlot[]): void {
        // this.setState((state) => {
        //     // let itemStorages = state.itemStorages;
        //     state.itemStorages[itemStorageID] = slots;
        //
        //     return {
        //         itemStorages: state.itemStorages,
        //     } as EquipItemListRCState;
        // });
    }

    updateItemStorages(itemStorages: UI_ItemStorage[]): void {
        this.setState((state) => {
            let newState = {
                itemStorages: itemStorages
            } as EquipItemListRCState;

            if (_.isNil(state.selectedItemStorageID) && itemStorages.length) {
                newState.selectedItemStorageID = itemStorages[0].ID;
                newState.selectedItemStorageSlotID = itemStorages[0].slots[0].ID;
            }

            return newState;
        });
    }

    move(): void {
        this.props.itemStorageController.moveToEquipSlotByEquipController(this.state.selectedItemStorageID, this.state.selectedItemStorageSlotID, this.props.equipController, this.state.selectedEquipSlotID);
    }

    handlerOnChangeItemStorageSlot(event): void {
        let values = _.split(event.target.value, ',');
        this.setState({
            selectedItemStorageID: Number(values[0]),
            selectedItemStorageSlotID: Number(values[1]),
        } as EquipItemListRCState);
    }

    handlerOnChangeEquipSlot(e): void {
        this.setState({selectedEquipSlotID: e.target.value} as EquipItemListRCState);
    }

    render() {
        return (
            <div>
                <select name="" id="" value={this.state.selectedEquipSlotID} onChange={this.handlerOnChangeEquipSlot}>
                    {_.map(this.props.equipSlotIDs, (equipSlotID, index) => {
                        return <option key={index} value={equipSlotID}>{equipSlotID}</option>
                    })}
                </select>
                <select name="" id="" onChange={this.handlerOnChangeItemStorageSlot}>
                    {_.map(this.state.itemStorages, (itemStorage, itemStorageIndex) => {
                        return _.map(itemStorage.slots, (slot, itemStorageSlotIndex) => {
                            if (!slot.item.itemID) return;

                            return <option key={itemStorageSlotIndex} value={[String(itemStorage.ID), String(slot.ID)]}>{slot.item.itemID}</option>
                        });
                    })}
                </select>
                <button className={'btn btn_default'} onClick={this.move}>move</button>
            </div>
        );
    }
}