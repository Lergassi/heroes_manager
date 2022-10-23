import React from 'react';
import GameObject from '../../../core/source/GameObject.js';
import ItemStorageSlotComponent from '../../../core/app/Components/ItemStorageSlotComponent.js';
import ItemStorageComponent, {
    ItemStorageComponentEventCode
} from '../../../core/app/Components/ItemStorageComponent.js';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import MainItemStorageListComponent from '../../../core/app/Components/MainItemStorageListComponent.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import ItemStorageSlotRComponent from './ItemStorageSlotRComponent.js';
import _ from 'lodash';
import {GameObjectKey} from '../../../core/types/enums/GameObjectKey.js';
import ItemStorageSlots, {ItemStorageSlotsRender} from '../../../core/app/Components/ItemStorageSlots.js';
import EventSystem from '../../../core/source/EventSystem.js';

export interface ItemStorageRComponentProps {
    itemStorage: GameObject;
}

export interface ItemStorageRComponentState {
    itemStorage: GameObject;
}

export default class ItemStorageRComponent extends React.Component<ItemStorageRComponentProps, ItemStorageRComponentState> implements RComponentUpdateInterface {
    private _itemStorage: GameObject;
    _itemStorageSlots: ItemStorageSlots;

    constructor(props: ItemStorageRComponentProps) {
        super(props);

        this.state = {
            itemStorage: props.itemStorage,
        };
        this._itemStorage = props.itemStorage;
        this.state.itemStorage.assignRComponent(this);
        // this._itemStorageSlots = new ItemStorageSlots([10, 20, 30]);
        this._itemStorageSlots = new ItemStorageSlots(this._itemStorage.get<ItemStorageComponent>(GameObjectKey.ItemStorageComponent).itemStorageSlotComponents);

        EventSystem.addListener({
            codes: [
                ItemStorageComponentEventCode.Update,
            ],
            listener: {
                callback: (target) => {
                    console.log('target', target);
                    this.setState((state) => {
                        return {
                            itemStorage: state.itemStorage,
                        };
                    });
                },
                target: this._itemStorage.get<ItemStorageComponent>(GameObjectKey.ItemStorageComponent)
            },
        });
    }

    render() {
        let itemStorage = this.state.itemStorage;
        // itemStorage.get<ItemStorageComponent>('itemStorageComponent').itemStorageSlotComponents
        //todo: Переделать на render(), метод уже есть и используется в локациях.
        let itemStorageSlotComponents = itemStorage.getComponents<ItemStorageSlotComponent>(ItemStorageSlotComponent);
        // let itemStorageSlotComponents = itemStorage.get<ItemStorageSlotComponent>(ItemStorageSlotComponent);

        let itemsElementTableRows = [];
        itemStorage.get<ItemStorageComponent>(GameObjectKey.ItemStorageComponent).render((values) => {
            _.map(values.slots, (itemStorageSlotComponent, index) => {
                itemsElementTableRows.push((<ItemStorageSlotRComponent
                    key={index}
                    ID={index}
                    itemStorageSlotComponent={itemStorageSlotComponent}
                />));
            });
        });

        //todo: Рендер может быть разный и не зависеть от класса. Например сумка у локации отображается совсем иначе.
        // let itemStorageSlots = this._itemStorageSlots.render((values: ItemStorageSlotsRender) => {
        // // let itemStorageSlots;
        // // this._newRender.render((values: ItemStorageSlotsRender) => {
        //     return _.map(values.itemStorageSlots, (itemStorageSlotComponent, itemStorageSlotComponentIndex) => {
        //         return (
        //             <div key={itemStorageSlotComponentIndex}>{itemStorageSlotComponentIndex}: {itemStorageSlotComponent.render2((values) => {
        //                 return (<span>
        //                     {values.itemStack ? <span>{values.itemStack.item.name} ({values.itemStack.count})</span> : 'Пусто'}
        //                 </span>);
        //             })}</div>
        //         );
        //     });
        // });

        return (
            <div className={'block'}>
                <div className={'block__title'}>
                    <span>ItemStorage</span>
                    <span>id: {this.state.itemStorage.ID}, {this.state.itemStorage.getComponent<ItemStorageComponent>(ItemStorageComponent).busyItemStorageSlotCount}/{this.state.itemStorage.getComponent<ItemStorageComponent>(ItemStorageComponent)['_size']}</span>
                </div>
                <div className={'block__content'}>
                    {/*{itemStorageSlots}*/}
                    <table className={'basic-table'}>
                        <tbody>
                        {/*{itemStorageSlotComponents.map((itemStorageSlotComponent) => (*/}
                        {/*    <ItemStorageSlotRComponent*/}
                        {/*        key={itemStorageSlotComponent['_id']}*/}
                        {/*        itemStorageSlotComponent={itemStorageSlotComponent}*/}
                        {/*    />*/}
                        {/*))}*/}
                        {itemsElementTableRows}
                        {/*{itemStorage.getComponent<ItemStorageComponent>('itemStorageComponent').render((values) => {*/}
                        {/*    */}
                        {/*})}*/}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    update(): void {
        this.setState(state => ({
            itemStorage: state.itemStorage,
        }));
    }
}