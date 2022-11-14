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

export interface ItemStorageUIProps {
    size: number;
    columns: number;
    // itemStorage?: ItemStorageV2;    //todo: Вопрос: интерфейс или класс?
}

export interface ItemStorageUIState {
    slots: any;
}

export default class ItemStorageRC extends React.Component<ItemStorageUIProps, ItemStorageUIState> {
    private readonly _size: number;
    private readonly _columns: number;
    private readonly _slots: any;

    constructor(props: ItemStorageUIProps) {
        assertIsGreaterThanOrEqual(props.size, 1);
        assertIsGreaterThanOrEqual(props.columns, 1);
        // assertIsGreaterThanOrEqual(props.size % props.columns, 0, 'Кол-во колонок должно быть ');

        super(props);

        //todo: Возможно стоит сделать правило в кратности строк и колонок размеру сумки.
        this._slots = [];
        this._size = props.size;
        this._columns = props.columns;
    }

    updateSlot(item: Item, count: number, index: string) {

    }

    render() {
        let slotIndex = 0;
        let columnIndex = 0;
        let rowIndex = 0;
        let rows = [];
        while (slotIndex < this._size) {
            let row = [];
            while (columnIndex < this._columns && slotIndex < this._size) {
                // row.push(<ItemStorageSlotRC
                //     key={slotIndex}
                // />);
                row.push(<ItemSlotRC
                    key={slotIndex}
                    showCount={true}
                    // blockSize={50}
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