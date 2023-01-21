import _ from 'lodash';
import React from 'react';
import ItemStorageController from '../../../core/app/Components/ItemStorageController.js';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_ItemCount} from '../../../core/types/main.js';
import ItemStorageRC from './ItemStorageRC.js';

export interface ItemStorageControllerRCProps {
    container: ContainerInterface;
    itemStorageController: ItemStorageController;
}

export interface ItemStorageControllerRCState {
    itemStorageController: ItemStorageController;
    itemStorages: GameObject[];
}

export default class ItemStorageControllerRC extends React.Component<ItemStorageControllerRCProps, ItemStorageControllerRCState> {
    constructor(props: ItemStorageControllerRCProps) {
        super(props);

        this.state = {
            itemStorageController: props.itemStorageController,
            itemStorages: [],
        };

        this.props.container.set<ItemStorageControllerRC>(ServiceID.UI_ItemStorageController, this);
    }

    updateByRequest(): void {
        this.state.itemStorageController.renderAllByRequest(this);
    }

    updateItemStorages(itemStorages: GameObject[]) {
        this.setState((state) => {
            return {
                itemStorages: itemStorages,
            } as ItemStorageControllerRCState;
        });
    }

    updateItemStorage(index: number, items: UI_ItemCount[]): void {

    }

    render() {
        let itemStorages = this.state.itemStorages;

        return (
            <div>
                {_.map(itemStorages, (itemStorage, index) => {
                    return <ItemStorageRC
                        key={index}
                        container={this.props.container}
                        itemStorage={itemStorage.get<ItemStorageInterface>(ComponentID.ItemStorage)}
                        itemStorageID={String(itemStorage.ID)}
                        size={20}
                        ID={ServiceID.UI_ItemStorage + '.' + String(index)}
                    />
                })}
            </div>
        );
    }
}