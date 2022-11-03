import MainItemStorageListComponent, {
    MainItemStorageListComponentEventCode
} from '../../../core/app/Components/MainItemStorageListComponent.js';
import React from 'react';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import ItemStorageRComponent from './ItemStorageRComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';
import ItemStorageControllerInterface from '../../../core/app/Interfaces/ItemStorageControllerInterface.js';
import _ from 'lodash';
import {EventCode} from '../../../core/types/enums/EventCode.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import EventSystemFactory from '../../../core/app/Services/EventSystemFactory.js';
import {ContainerID} from '../../../core/types/enums/ContainerID.js';

export interface ItemStorageControllerRComponentProps {
    container: ContainerInterface;
    itemStorageController: ItemStorageControllerInterface;
}

export interface ItemStorageControllerRComponentState {
    itemStorageController: ItemStorageControllerInterface;
}

export default class ItemStorageControllerRComponent extends React.Component<ItemStorageControllerRComponentProps, ItemStorageControllerRComponentState> implements RComponentUpdateInterface {
    constructor(props: ItemStorageControllerRComponentProps) {
        super(props);

        this.state = {
            itemStorageController: props.itemStorageController,
        };

        EventSystem.addListener({
            codes: [
                EventCode.ItemStorageController_AddItemStorage,
                EventCode.ItemStorageController_RemoveItemStorage,
            ],
            listener: {
                callback: (target) => {
                    this.setState((state) => {
                        return {
                            itemStorageController: state.itemStorageController,
                        };
                    });
                },
            },
        });
    }

    render() {
        let result;
        {this.state.itemStorageController.render((itemStorages) => {
            console.log(itemStorages);
            {result = _.map(itemStorages, (itemStorage) => {
                return <ItemStorageRComponent
                    key={itemStorage['_id']}
                    itemStorage={itemStorage}
                />
            })}
        })}

        return <span>{_.isEmpty(result) ? <span>empty</span> : result}</span>
    }

    update(): void {
        this.setState(state => ({
            itemStorageController: state.itemStorageController,
        }));
    }
}