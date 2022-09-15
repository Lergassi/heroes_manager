import React from 'react';
import GameObject from '../../../core/source/GameObject.js';
import ItemStorageSlotComponent from '../../../core/app/Components/ItemStorageSlotComponent.js';
import ItemStack, {ItemStackPlaceInterface} from '../../../core/app/RuntimeObjects/ItemStack.js';
import ItemStorageComponent from '../../../core/app/Components/ItemStorageComponent.js';
import {debugItemStorage} from '../../../core/debug/debug_functions.js';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import ItemStorageListComponent from '../../../core/app/Components/ItemStorageListComponent.js';

export interface ItemStackRComponentProps {
    itemStack: ItemStack;
}

export interface ItemStackRComponentState {

}

export class ItemStackRComponent extends React.Component<ItemStackRComponentProps, ItemStackRComponentState>{
    constructor(props: ItemStackRComponentProps) {
        super(props);
    }

    render() {
        let itemStack = this.props.itemStack;
        let element;
        if (itemStack) {
            element = <span>
                {this._renderItemStack(itemStack)}
            </span>;
        } else {
            element = <span>free</span>
        }

        return (
            <span>
                {element}
            </span>
        );
    }

    _renderItemStack(itemStack: ItemStack) {
        let element;
        if (itemStack.item.isEquipable) {
            element = <span>{itemStack.item.name}</span>
        } else {
            element = <span>{itemStack.item.name} ({itemStack.count})</span>
        }

        return element;
    }
}

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
        let itemStorage: GameObject = this.state.itemStorage;
        let itemStorageSlotComponents = itemStorage.findComponentsByName<ItemStorageSlotComponent>(ItemStorageSlotComponent.name);
        return (
            <div>
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

    update(target): void {
        this.setState(state => ({
            itemStorage: target,
        }));
    }
}

export interface ItemStorageSlotRComponentProps {
    itemStorageSlotComponent: ItemStorageSlotComponent;
}

export interface ItemStorageSlotRComponentState {
    itemStorageSlotComponent: ItemStorageSlotComponent;
}

export class ItemStorageSlotRComponent extends React.Component<ItemStorageSlotRComponentProps, ItemStorageSlotRComponentState> implements RComponentUpdateInterface {
    constructor(props: ItemStorageSlotRComponentProps) {
        super(props);

        this.state = {
            itemStorageSlotComponent: props.itemStorageSlotComponent,
        };
        this.state.itemStorageSlotComponent.assignRComponent(this);

        this.clearHandler = this.clearHandler.bind(this);
    }

    update(target): void {
        this.setState(state => ({
            itemStorageSlotComponent: target,
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
                    <ItemStackRComponent
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

    update(target): void {
        this.setState(state => ({
            itemStorageCollection: target,
        }));
    }
}