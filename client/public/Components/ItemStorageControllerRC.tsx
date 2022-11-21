import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ItemStorageControllerInterface from '../../../core/app/Interfaces/ItemStorageControllerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import ItemStorageRC from './ItemStorageRC.js';
import ItemStorageV2 from '../../../core/app/Components/ItemStorageV2.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';

export interface ItemStorageControllerRCProps {
    itemStorageController: ItemStorageControllerInterface;
}

export interface ItemStorageControllerRCState {
    itemStorages: GameObject[];
}

export default class ItemStorageControllerRC extends React.Component<ItemStorageControllerRCProps, ItemStorageControllerRCState> {
    constructor(props: ItemStorageControllerRCProps) {
        super(props);

        this.state = {
            itemStorages: [],
        };
    }

    componentDidMount() {
        this.props.itemStorageController.attach({
            addItemStorage: (itemStorageController, itemStorages) => {
                this.updateItemStorages(itemStorages);
            }
        });
    }

    updateItemStorages(itemStorages: GameObject[]) {
        this.setState((state) => {
            return {
                itemStorages: itemStorages,
            };
        });
    }

    render() {
        let itemStorages = this.state.itemStorages;

        return (
            <div>
                {_.map(itemStorages, (itemStorage, index) => {
                    return <div key={index} className={'widget'}>
                        <div className={'widget__title'}>
                            Хранилище
                        </div>
                        <div className={'widget__content'}>
                            <ItemStorageRC
                                size={20}
                                columns={4}
                                itemStorage={itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent)}
                            />
                        </div>
                    </div>
                })}
            </div>
        );
    }
}