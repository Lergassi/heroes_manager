import MainItemStorageListComponent from '../../../core/app/Components/MainItemStorageListComponent.js';
import React from 'react';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import ItemStorageRComponent from './ItemStorageRComponent.js';

export interface ItemStorageCollectionRComponentProps {
    itemStorageCollection: MainItemStorageListComponent;
}

export interface ItemStorageCollectionRComponentState {
    itemStorageCollection: MainItemStorageListComponent;
}

export default class MainItemStorageListRComponent extends React.Component<ItemStorageCollectionRComponentProps, ItemStorageCollectionRComponentState> implements RComponentUpdateInterface {
    constructor(props: ItemStorageCollectionRComponentProps) {
        super(props);

        this.state = {
            itemStorageCollection: props.itemStorageCollection,
        };
        this.state.itemStorageCollection.assignRComponent(this);
    }

    render() {
        return (<div>
            {this.state.itemStorageCollection.itemStorages.map((itemStorage) => (
                <ItemStorageRComponent
                    key={itemStorage['_id']}
                    itemStorage={itemStorage}
                />
            ))}
        </div>);
    }

    update(): void {
        this.setState(state => ({
            itemStorageCollection: state.itemStorageCollection,
        }));
    }
}