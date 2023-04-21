import React from 'react';
import GameObject from '../../../core/source/GameObject.js';
import ItemStorageComponent, {
    ItemStorageComponentEventCode
} from '../../../core/app/Components/ItemStorages/ItemStorageComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';

export interface ItemStorageRComponentProps {
    itemStorage: GameObject;
}

export interface ItemStorageRComponentState {
    itemStorage: GameObject;
}

// export default class ItemStorageRComponent extends React.Component<ItemStorageRComponentProps, ItemStorageRComponentState> implements RComponentUpdateInterface {
export default class ItemStorageRComponent extends React.Component<ItemStorageRComponentProps, ItemStorageRComponentState> {
    private _itemStorage: GameObject;

    constructor(props: ItemStorageRComponentProps) {
        super(props);

        this.state = {
            itemStorage: props.itemStorage,
        };
        this._itemStorage = props.itemStorage;

        EventSystem.addListener({
            codes: [
                ItemStorageComponentEventCode.Update,
            ],
            listener: {
                callback: (target) => {
                    this.setState((state) => {
                        return {
                            itemStorage: state.itemStorage,
                        };
                    });
                },
            },
        });
    }

    render() {
        let itemStorage = this.state.itemStorage;

        let itemStorageSlotsTableRows = [];
        // itemStorage.get<ItemStorageComponent>(ComponentID.ItemStorage).render((options) => {
        //     _.map(options.slots, (itemStorageSlotComponent, index) => {
        //         itemStorageSlotsTableRows.push((<ItemStorageSlotRComponent
        //             key={index}
        //             ID={index}
        //             itemStorageSlotComponent={itemStorageSlotComponent}
        //         />));
        //     });
        // });

        return (
            <div className={'block'}>
                <div className={'block__title'}>
                    <span>ItemStorage, id: {this.state.itemStorage.ID}, {this.state.itemStorage.getComponent<ItemStorageComponent>(ItemStorageComponent).busyItemStorageSlotCount}/{this.state.itemStorage.getComponent<ItemStorageComponent>(ItemStorageComponent)['_size']}</span>
                </div>
                <div className={'block__content'}>
                    <table className={'basic-table'}>
                        <tbody>
                        {itemStorageSlotsTableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}