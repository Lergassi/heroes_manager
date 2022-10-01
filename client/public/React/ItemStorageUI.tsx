import React from 'react';
import GameObject from '../../../core/source/GameObject.js';
import ItemStorageSlotComponent from '../../../core/app/Components/ItemStorageSlotComponent.js';
import ItemStack, {ItemStackPlaceInterface} from '../../../core/app/RuntimeObjects/ItemStack.js';
import ItemStorageComponent from '../../../core/app/Components/ItemStorageComponent.js';
import {debugItemStorage} from '../../../core/debug/debug_functions.js';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import ItemStorageListComponent from '../../../core/app/Components/ItemStorageListComponent.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';

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
        let itemStorageSlotComponents = itemStorage.getComponents<ItemStorageSlotComponent>(ItemStorageSlotComponent);
        return (
            <div className={'block'}>
                <div>ItemStorage</div>
                <div>id: {this.state.itemStorage['_id']}, {this.state.itemStorage.getComponent<ItemStorageComponent>(ItemStorageComponent).busyItemStorageSlotCount}/{this.state.itemStorage.getComponent<ItemStorageComponent>(ItemStorageComponent).size}</div>
                <table className={'basic-table'}>
                    <tbody>
                        {itemStorageSlotComponents.map((itemStorageSlotComponent) => (
                            <ItemStorageSlotRComponent
                                key={itemStorageSlotComponent['_id']}
                                itemStorageSlotComponent={itemStorageSlotComponent}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    // update(target): void {
    update(): void {
        this.setState(state => ({
            // itemStorage: target,
            itemStorage: state.itemStorage,
        }));
    }
}

export interface ItemStorageSlotRComponentProps {
    itemStorageSlotComponent: ItemStorageSlotComponent;
}

export interface ItemStorageSlotRComponentState {
    itemStorageSlotComponent: ItemStorageSlotComponent;
}

/**
 * Только для слота в сумках. todo: Для других случаях нужен другой компонент.
 */
export class ItemStorageSlotRComponent extends React.Component<ItemStorageSlotRComponentProps, ItemStorageSlotRComponentState> implements RComponentUpdateInterface {
    constructor(props: ItemStorageSlotRComponentProps) {
        super(props);

        this.state = {
            itemStorageSlotComponent: props.itemStorageSlotComponent,
        };
        this.state.itemStorageSlotComponent.assignRComponent(this);

        this.clearHandler = this.clearHandler.bind(this);
    }

    // update(target): void {
    update(): void {
        this.setState(state => ({
            // itemStorageSlotComponent: target,
            itemStorageSlotComponent: state.itemStorageSlotComponent,
        }));
    }

    clearHandler() {
        this.state.itemStorageSlotComponent.clear();
    }

    render() {
        return (
            <tr>
                <td>{this.state.itemStorageSlotComponent['_id']}</td>
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

export interface ItemStorageCollectionRComponentProps {
    itemStorageCollection: ItemStorageListComponent;
}

export interface ItemStorageCollectionRComponentState {
    itemStorageCollection: ItemStorageListComponent;
}

export class ItemStorageCollectionRComponent extends React.Component<ItemStorageCollectionRComponentProps, ItemStorageCollectionRComponentState> implements RComponentUpdateInterface {
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

    // update(target): void {
    update(): void {
        this.setState(state => ({
            // itemStorageCollection: target,
            itemStorageCollection: state.itemStorageCollection,
        }));
    }
}