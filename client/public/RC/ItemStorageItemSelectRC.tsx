import React from 'react';
import {ItemID} from '../../../core/types/enums/ItemID';
import ItemStorageController from '../../../core/app/Components/ItemStorages/ItemStorageController';
import {UI_ItemCountObject, UI_ItemStorage} from '../../../core/types/main';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface';
import UIUpdater from '../../app/UIUpdater';
import {ServiceID} from '../../../core/types/enums/ServiceID';
import ContainerInterface from '../../../core/source/ContainerInterface';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface';

interface ItemStorageItemSelectRCProps {
    container: ContainerInterface;
    itemStorageController: ItemStorageController;
    handler?: (itemID: ItemID, itemStorage: ItemStorageInterface) => void;
}

interface ItemStorageItemSelectRCState {
    items: UI_ItemCountObject;
    selectedItemID: ItemID;
}

export class ItemStorageItemSelectRC extends React.Component<ItemStorageItemSelectRCProps, ItemStorageItemSelectRCState> implements RCUpdateInterface {
    constructor(props: ItemStorageItemSelectRCProps) {
        super(props);

        this.state = {
            items: {},
            selectedItemID: null,
        };

        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    updateByRequest(): void {
        let items: UI_ItemCountObject = {};
        this.props.container.get<ItemStorageController>(ServiceID.ItemStorageController).renderItemStorageControllerByRequest({
            updateItemStorages(itemStorages: UI_ItemStorage[]) {
                for (let i = 0; i < itemStorages.length; i++) {
                    for (let j = 0; j < itemStorages[i].slots.length; j++) {
                        if (!itemStorages[i].slots[j].item.itemID) continue;

                        if (!items.hasOwnProperty(itemStorages[i].slots[j].item.itemID)) {
                            items[itemStorages[i].slots[j].item.itemID] = 0;
                        }

                        items[itemStorages[i].slots[j].item.itemID] += itemStorages[i].slots[j].item.count;
                    }
                }
            },
        });

        this.setState((state) => {
            return {
                items: items,
                selectedItemID: state.selectedItemID ?? (_.keys(items)[0] ?? null),
            } as ItemStorageItemSelectRCState;
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        this.setState({
            selectedItemID: event.target.value as ItemID,
        } as ItemStorageItemSelectRCState);
    }

    render() {
        // console.log(this.state.selectedItemID);
        return (
            <div>
                <select name="" id="" onChange={this.onChangeHandler}>
                    {_.map(this.state.items, (count, itemID: ItemID, collection) => {
                        return <option key={itemID} value={itemID}>{itemID}: {count}</option>
                    })}
                </select>
                <button className={'btn btn_default'} onClick={(event) => {
                    event.preventDefault();
                    this.props.handler?.(this.state.selectedItemID, this.props.itemStorageController);
                }}>PLANT
                </button>
            </div>
        );
    }
}