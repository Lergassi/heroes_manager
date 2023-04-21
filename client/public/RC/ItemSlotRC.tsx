import _ from 'lodash';
import React from 'react';
import Item from '../../../core/app/Entities/Item.js';
import {IconID} from '../../../core/types/enums/IconID.js';

export interface ItemSlotRCProps {
    /**
     * По умолчанию 50 (50px).
     */
    blockSize?: number;
    showCount?: boolean;
    backgroundIconID?: string;

    item?: Item;
    count?: number;
}

export interface ItemSlotRCState {

}

export default class ItemSlotRC extends React.Component<ItemSlotRCProps, ItemSlotRCState> {
    private readonly _blockSize: number;
    private readonly _showCount: boolean;
    private readonly _backgroundIconID: string;

    constructor(props: ItemSlotRCProps) {
        super(props);

        this._blockSize = props.blockSize || 50;    /* todo: Наличие стилей нужно контролировать также как сущности. */
        this._showCount = props.showCount || false;
        this._backgroundIconID = props.backgroundIconID || IconID.BackgroundSlot02;
    }

    render() {
        return (
            <div className={'item-slot icon_' + this._blockSize}>
                <div
                    className={_.join(['icon', 'icon_' + this._blockSize, 'icon_' + this._backgroundIconID], ' ')}></div>
                {this._renderItem()}
            </div>
        );
    }

    private _renderItem() {
        if (!this.props.item) return undefined;

        let item = this.props.item;
        let count = this.props.count;

        return (
            <div className={'item-slot__item'}>
                {this._showCount ? <div className={'item-slot__count'}>{count}</div> : ''}
                <div className={_.join(['icon', 'icon_' + this._blockSize, 'icon_' + item.icon.id], ' ')}></div>
            </div>
        );
    }
}