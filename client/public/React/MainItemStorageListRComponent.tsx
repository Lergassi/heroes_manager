import MainItemStorageListComponent, {
    MainItemStorageListComponentEventCode
} from '../../../core/app/Components/MainItemStorageListComponent.js';
import React from 'react';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import ItemStorageRComponent from './ItemStorageRComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';
import ItemStorageControllerInterface from '../../../core/app/Interfaces/ItemStorageControllerInterface.js';
import _ from 'lodash';
import {EventCode} from '../../../core/types/enums/EventCode.js';

export interface ItemStorageCollectionRComponentProps {
    // itemStorageCollection: MainItemStorageListComponent;
    itemStorageController: ItemStorageControllerInterface;
}

export interface ItemStorageCollectionRComponentState {
    // itemStorageController: MainItemStorageListComponent;
    itemStorageController: ItemStorageControllerInterface;
}

export default class MainItemStorageListRComponent extends React.Component<ItemStorageCollectionRComponentProps, ItemStorageCollectionRComponentState> implements RComponentUpdateInterface {
    constructor(props: ItemStorageCollectionRComponentProps) {
        super(props);

        this.state = {
            itemStorageController: props.itemStorageController,
        };

        props.itemStorageController.addListener(
            EventCode.ItemStorageController_Update,
            (target) => {
                return this.setState((state) => {
                    return {
                        itemStorageController: state.itemStorageController,
                    };
                });
            },
        );
        // EventSystem.addListener({
        //         codes: [
        //             // MainItemStorageListComponentEventCode.Update,
        //             EventCode.ItemStorageController_Update,
        //         ],
        //         listener: {
        //             callback: (target) => {
        //                 return this.setState((state) => {
        //                     return {
        //                         itemStorageController: state.itemStorageController,
        //                     };
        //                 });
        //             },
        //             target: props.itemStorageController,
        //         },
        //     }
        // );
    }

    render() {
        let result;
        {this.state.itemStorageController.render((itemStorages) => {
            {result = _.map(itemStorages, (itemStorage) => {
                return <ItemStorageRComponent
                    key={itemStorage['_id']}
                    itemStorage={itemStorage}
                />
            })}
        })}

        return <span>{_.isEmpty(result) ? <span>empty</span> : result}</span>
    }

    update(): void {
        this.setState(state => ({
            itemStorageController: state.itemStorageController,
        }));
    }
}