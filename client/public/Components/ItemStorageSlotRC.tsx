import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import Item from '../../../core/app/Entities/Item.js';
import {sprintf} from 'sprintf-js';
import {ICON_BACKGROUND_SLOT, ICON_QUESTION01} from '../../../core/app/consts.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import ItemDatabase from '../../../core/source/ItemDatabase.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {ItemID} from '../../../core/types/enums/ItemID.js';

export interface ItemStorageSlotUIProps {

}

export interface ItemStorageSlotUIState {
    item: Item;
    count: number;
}

export default class ItemStorageSlotRC extends React.Component<ItemStorageSlotUIProps, ItemStorageSlotUIState> {

    constructor(props: ItemStorageSlotUIProps) {
        super(props);

        this.state = {
            item: null,
            count: null,
        };

        let delay = 1;
        let delayStep = 1000;
        setTimeout(() => {
            // this.updateItem((window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);
            this.updateItem((window['app']['container'] as ContainerInterface).get<ItemDatabase>(ServiceID.ItemDatabase).randomOne(), 12);
            // this.updateItem(null, 12);
            console.log('setTimeout updateItem');
        }, delay++ * delayStep);
        // setTimeout(() => {
        //     this.clear();
        //     console.log('setTimeout clear');
        // }, delay++ * delayStep);
        // window['_sandbox']['update'].push(() => {
        //     // this.updateItem((window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);
        //     // this.updateItem('wood', 12);
        //     console.log('update this', this);
        // });
    }

    componentDidMount() {
        // console.log('ItemStorageSlotUI.didMount.this', this);
    }

    updateItem(item: Item, count: number) {
        this.setState((state) => {
            return {
                item: item,
                count: count,
            };
        });
    }

    clear() {
        this.setState({
            item: null,
            count: null,
        });
    }

    render() {
        return (
            <div className={'item-storage-slot'}>
                <div className={'icon icon_50'}></div>
                {this._renderItem()}
            </div>
        );
    }

    private _renderItem() {
        if (!this.state.item) return undefined;
        // if (!this.props.item) return undefined;

        let item = this.state.item;
        let count = this.state.count;

        return (
            <div className={'item-storage-slot__item'} title={item.id}>
                <div className={'item-storage-slot__count'}>{count}</div>
                <div className={'icon icon_50 ' + 'icon_' + item.icon.id}></div>
            </div>
        );
    }
}