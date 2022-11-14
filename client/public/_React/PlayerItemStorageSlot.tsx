import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ItemStorageSlotComponent from '../../../core/app/Components/ItemStorageSlotComponent.js';
import {sprintf} from 'sprintf-js';
import Icon from '../../../core/app/Entities/Icon.js';

export interface PlayerItemStorageSlotProps {
    itemStorageSlot: ItemStorageSlotComponent;
    backgroundIcon: Icon;
}

export interface PlayerItemStorageSlotState {
    itemStorageSlot: ItemStorageSlotComponent;
}

export default class PlayerItemStorageSlot extends React.Component<PlayerItemStorageSlotProps, PlayerItemStorageSlotState> {
    private readonly _defaultIcon = '/images/icons/bordered/64x64/question01.png';
    private readonly _style;

    constructor(props: PlayerItemStorageSlotProps) {
        super(props);

        this._style = {

        };

        this.clearHandler = this.clearHandler.bind(this);
    }

    render() {
        let itemStorageSlot = this.props.itemStorageSlot;

        let style = {
            // backgroundImage: sprintf('url("%s")', this.props.itemStorageSlot.isFree() ? this.props.backgroundIcon.path : this.props.itemStorageSlot.itemStack.item.icon.path),
            // backgroundImage: sprintf('url("%s")', this.props.itemStorageSlot.isFree() ? this.props.backgroundIcon.path : this.props.itemStorageSlot.itemStack.item.icon.path),
        };
        return (
            <div className={'player-item-storage-slot player-item-storage-slot_icon'} style={style}>
                {/*<span><button onClick={this.clearHandler}>x</button></span>*/}
            </div>
        );
    }

    clearHandler() {
        this.props.itemStorageSlot.destroyItemStack();
    }
}