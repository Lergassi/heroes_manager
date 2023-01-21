import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import Icon from '../../../core/app/Entities/Icon.js';
import {assert, assertIsGreaterThanOrEqual, assertIsNumber, assertNotNil} from '../../../core/source/assert.js';
import ItemStorageSlotRC from './ItemStorageSlotRC.js';
import ItemStorageComponent from '../../../core/app/Components/ItemStorageComponent.js';
import ItemStorageV2 from '../../../core/app/Components/ItemStorageV2.js';
import Item from '../../../core/app/Entities/Item.js';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import ItemSlotRC from './ItemSlotRC.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import ItemDatabase from '../../../core/source/ItemDatabase.js';
import {ItemID} from '../../../core/types/enums/ItemID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface.js';

export interface ItemStorageUIProps_Legacy {
    size: number;
    columns: number;
    // itemStorage?: ItemStorageV2;    //todo: Вопрос: интерфейс или класс? Или вообще другой интерфейс никак не связанный с объектом.
    itemStorage?: ItemStorageInterface;    //todo: Вопрос: интерфейс или класс? Или вообще другой интерфейс никак не связанный с объектом.
}

export interface ItemStorageUIState_Legacy {
    slots: {item: Item, count: number}[];
    // itemStorage: ItemStorageV2;
}

export default class ItemStorageRC_Legacy extends React.Component<ItemStorageUIProps_Legacy, ItemStorageUIState_Legacy> {
    private readonly _size: number;
    private readonly _columns: number;

    constructor(props: ItemStorageUIProps_Legacy) {
        assertIsGreaterThanOrEqual(props.size, 1);
        assertIsGreaterThanOrEqual(props.columns, 1);
        // assertIsGreaterThanOrEqual(props.size % props.columns, 0, 'Кол-во колонок должно быть ');

        super(props);

        //todo: Возможно стоит сделать правило в кратности строк и колонок размеру сумки.
        this._size = props.size;
        this._columns = props.columns;

        this.state = {
            slots: _.map(_.range(0, this._size), (index) => {
                return {
                    item: undefined,
                    count: undefined,
                };
            }),
            // itemStorage: props.itemStorage,
        };

        // let delay = 1;
        // let delayStep = 2000;
        // setTimeout(() => {
        //     // this.updateSlot(2, (window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_1), 10);
        //     // this.updateSlot(4, (window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_1), 10);
        //     // this.updateSlot(10, (window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_1), 10);
        //     // this.updateSlot(10222, (window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_1), 10);
        //     // this.updateSlot(1, (window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_1), 10);
        //     props.itemStorage.addItem((window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_1), 3);
        //     props.itemStorage.addItem((window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_2), 20);
        //     props.itemStorage.addItem((window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_3), 10);
        //     props.itemStorage.addItem((window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_3), 10);
        //     props.itemStorage.addItem((window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Herb_3), 10);
        // }, delay++ * delayStep);
    }

    componentDidMount() {
        // this.props.itemStorage?.attach({
        //     updateHandler: (index, item, count) => {
        //         this.updateSlot(index, item, count);
        //     },
        // });
    }

    //todo: Позже класс будет универсальный и не будет зависить от предмета, а для предмета будет другой класс.
    updateSlot(index: number, item: Item, count: number) {
        let slots = [...this.state.slots];
        assertNotNil(slots[index], 'Слот не найден.');

        slots[index].item = item;
        slots[index].count = count;

        this.setState((state) => {
            return {
                slots: slots,
            };
        });
    }

    render() {
        let slotIndex = 0;
        let columnIndex = 0;
        let rowIndex = 0;
        let rows = [];
        while (slotIndex < this._size) {
            let row = [];
            while (columnIndex < this._columns && slotIndex < this._size) {
                row.push(<ItemSlotRC
                    key={slotIndex}
                    showCount={true}
                    item={this.state.slots[slotIndex].item}
                    count={this.state.slots[slotIndex].count}
                />);
                ++columnIndex;
                ++slotIndex;
            }
            rows.push(<div key={rowIndex} className={'item-storage-row'}>{row}</div>);
            ++rowIndex;
            columnIndex = 0;
        }

        return (
            <div className={'item-storage'}>
                {rows}
            </div>
        );
    }
}