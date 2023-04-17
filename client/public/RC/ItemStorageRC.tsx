import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Item from '../../../core/app/Entities/Item.js';
import ItemStorageInterface, {ItemStorageInterfaceRender} from '../../../core/app/Interfaces/ItemStorageInterface.js';
import {assertIsGreaterThanOrEqual} from '../../../core/source/assert.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_ItemCount, UI_ItemStorageSlot} from '../../../core/types/main.js';
import UIUpdater from '../../app/UIUpdater.js';
import {sprintf} from 'sprintf-js';
import {database} from '../../../core/data/ts/database.js';

export interface PlayerTableItemStorageRCProps {
    ID: string;
    size: number;
    itemStorage: ItemStorageInterface;
    itemStorageID: string;
    container: ContainerInterface;
}

interface PlayerTableItemStorageRCState {
    slots: UI_ItemStorageSlot[];
}

export default class ItemStorageRC extends React.Component<PlayerTableItemStorageRCProps, PlayerTableItemStorageRCState> implements ItemStorageInterfaceRender {
    private readonly _size: number;

    constructor(props: PlayerTableItemStorageRCProps) {
        assertIsGreaterThanOrEqual(props.size, 1);

        super(props);

        this._size = props.size;

        this.state = {
            slots: _.map(_.range(0, this._size), (index) => {
                return {
                    index: index,
                    item : {
                        itemID: undefined,
                        count : undefined,
                    },
                };
            }),
            // itemStorageID: props.itemStorage.itemStorageID,
        };

        // this.props.container.set<PlayerTableItemStorageRC>(ServiceID.UI_PlayerItemStorage + '.', this)
        this.props.container.set<ItemStorageRC>(props.ID, this);
        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);

        this.clear = this.clear.bind(this);
    }

    updateByRequest(): void {
        this.props.itemStorage.renderByRequest(this);
    }

    updateItems(items: UI_ItemStorageSlot[]) {
        this.setState((state) => {
            return {
                slots: items,
            } as PlayerTableItemStorageRCState;
        });
    }

    clear(index: number) {
        this.props.itemStorage.clear(index);
    }

    render() {
        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>ItemStorageRC ({this.props.itemStorageID})</div>
                    <div className={'widget__content'}>
                        <table className={'basic-table'}>
                            <tbody>
                                <tr>
                                    <th style={{width: '300px'}}>Item</th>
                                    <th style={{width: '300px'}}>Count</th>
                                    <th>Ctrl</th>
                                </tr>
                                {_.map(this.state.slots, (slot, index) => {
                                    if (slot.item.count) {
                                        return <tr key={index}>
                                            <td>
                                                <span className={sprintf("icon icon_%s icon_32 icon_first-column-column-padding", database.items.data.iconId(slot.item.itemID))}></span>
                                                <span className={'first-table-column-padding-for-icon'}>{slot.item.itemID}</span>
                                            </td>
                                            <td>{slot.item.count}</td>
                                            <td><button className={'btn btn_danger'} onClick={this.clear.bind(this, index)}>DELETE</button></td>
                                        </tr>
                                    } else {
                                        return <tr key={index}>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>{/*end widget__content*/}
                </div>{/*end widget*/}
            </div>
        );
    }
}