import React from 'react';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import ItemStorageComponent from '../../../core/app/Components/ItemStorageComponent.js';
import PlayerItemStorageSlot from './PlayerItemStorageSlot.js';
import EntityManagerInterface from '../../../core/app/Interfaces/EntityManagerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import Icon from '../../../core/app/Entities/Icon.js';
import {EntityID} from '../../../core/types/enums/EntityID.js';
import {IconID} from '../../../core/types/enums/IconID.js';

export interface PlayerItemStorageProps {
    container: ContainerInterface;
    itemStorage: ItemStorageComponent;
}

export interface PlayerItemStorageState {
    itemStorage: ItemStorageComponent;
}

export default class PlayerItemStorage extends React.Component<PlayerItemStorageProps, PlayerItemStorageState> {
    private readonly _cols = 5;
    // private readonly _rows = 5;

    constructor(props: PlayerItemStorageProps) {
        super(props);

        this.state = {
            itemStorage: props.itemStorage,
        };
    }

    render() {
        // let itemStorage = this.state.itemStorage;
        //
        // let position = 0;
        // let columnIndex = 0;
        // let result = [];
        // itemStorage.render((options) => {
        //     let rows = [];
        //     for (const slotKey in options.slots) {
        //         rows.push(<PlayerItemStorageSlot
        //             key={slotKey}
        //             backgroundIcon={this.props.container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Icon>(EntityID.Icon, IconID.BackgroundSlot01)}
        //             itemStorageSlot={options.slots[slotKey]}
        //         />)
        //
        //         ++columnIndex;
        //         if (columnIndex >= this._cols) {
        //             columnIndex = 0;
        //             result.push(<div key={position} className={'player-item-storage-slot-row clearfix'}>{rows}</div>);
        //             rows = [];
        //         }
        //         ++position;
        //     }
        // });

        return (
            <div>
                {/*{result}*/}
            </div>
        );
    }

    _renderRow() {

    }
}