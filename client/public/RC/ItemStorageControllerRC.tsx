import _ from 'lodash';
import React from 'react';
import ItemStorageController from '../../../core/app/Components/ItemStorages/ItemStorageController.js';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_ItemCount} from '../../../core/types/main.js';
import UIUpdater from '../../app/UIUpdater.js';
import {UI_WindowOptions} from '../../types/main.js';
import ItemStorageRC from './ItemStorageRC.js';

export interface ItemStorageControllerRCProps {
    container: ContainerInterface;
    itemStorageController: ItemStorageController;
    window: UI_WindowOptions;
}

export interface ItemStorageControllerRCState {
    itemStorageController: ItemStorageController;
    itemStorages: GameObject[];
    window: UI_WindowOptions;
}

export default class ItemStorageControllerRC extends React.Component<ItemStorageControllerRCProps, ItemStorageControllerRCState> {
    constructor(props: ItemStorageControllerRCProps) {
        super(props);

        this.state = {
            itemStorageController: props.itemStorageController,
            itemStorages: [],
            window: {
                show: true,
            },
        };

        this.props.container.set<ItemStorageControllerRC>(ServiceID.UI_ItemStorageController, this);
        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    updateByRequest(): void {
        if (!(this.state.window.show && this.props.window.show)) return;

        this.state.itemStorageController.renderAllByRequest(this);
    }

    updateItemStorages(itemStorages: GameObject[]) {
        this.setState((state) => {
            return {
                itemStorages: itemStorages,
            } as ItemStorageControllerRCState;
        });
    }

    render() {
        if (!(this.state.window.show && this.props.window.show)) return;

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