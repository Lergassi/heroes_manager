import React from 'react';
import GameObject from '../../../core/source/GameObject.js';
import ItemStorageSlotComponent from '../../../core/app/Components/ItemStorageSlotComponent.js';
import ItemStorageComponent from '../../../core/app/Components/ItemStorageComponent.js';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import MainItemStorageListComponent from '../../../core/app/Components/MainItemStorageListComponent.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import ItemStorageSlotRComponent from './ItemStorageSlotRComponent.js';
import _ from 'lodash';

export interface ItemStorageRComponentProps {
    itemStorage: GameObject;
}

export interface ItemStorageRComponentState {
    itemStorage: GameObject;
}

export default class ItemStorageRComponent extends React.Component<ItemStorageRComponentProps, ItemStorageRComponentState> implements RComponentUpdateInterface {
    private _itemStorage: GameObject;

    constructor(props: ItemStorageRComponentProps) {
        super(props);

        this.state = {
            itemStorage: props.itemStorage,
        };
        this._itemStorage = props.itemStorage;
        this.state.itemStorage.assignRComponent(this);
    }

    render() {
        let itemStorage = this.state.itemStorage;
        // itemStorage.get<ItemStorageComponent>('itemStorageComponent').itemStorageSlotComponents
        //todo: Переделать на render(), метод уже есть и используется в локациях.
        let itemStorageSlotComponents = itemStorage.getComponents<ItemStorageSlotComponent>(ItemStorageSlotComponent);

        let itemsElementTableRows = [];
        itemStorage.getComponent<ItemStorageComponent>('itemStorageComponent').render((values) => {
            _.map(values.slots, (value, index) => {
                itemsElementTableRows.push((<ItemStorageSlotRComponent
                    key={index}
                    ID={index}
                    itemStorageSlotComponent={value}
                />));
            });
        });

        return (
            <div className={'block'}>
                <div>ItemStorage</div>
                <div>id: {this.state.itemStorage.ID}, {this.state.itemStorage.getComponent<ItemStorageComponent>(ItemStorageComponent).busyItemStorageSlotCount}/{this.state.itemStorage.getComponent<ItemStorageComponent>(ItemStorageComponent)['_size']}</div>
                <table className={'basic-table'}>
                    <tbody>
                        {/*{itemStorageSlotComponents.map((itemStorageSlotComponent) => (*/}
                        {/*    <ItemStorageSlotRComponent*/}
                        {/*        key={itemStorageSlotComponent['_id']}*/}
                        {/*        itemStorageSlotComponent={itemStorageSlotComponent}*/}
                        {/*    />*/}
                        {/*))}*/}
                        {itemsElementTableRows}
                        {/*{itemStorage.getComponent<ItemStorageComponent>('itemStorageComponent').render((values) => {*/}
                        {/*    */}
                        {/*})}*/}
                    </tbody>
                </table>
            </div>
        );
    }

    update(): void {
        this.setState(state => ({
            itemStorage: state.itemStorage,
        }));
    }
}