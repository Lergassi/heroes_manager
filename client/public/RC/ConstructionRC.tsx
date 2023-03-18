import React from 'react';
import {UI_WindowOptions} from '../../types/main';
import {Construction} from '../../../core/app/Components/Construction';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface';
import {BuildingID} from '../../../core/types/enums/BuildingID';
import _ from 'lodash';
import {database} from '../../../core/data/ts/database';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface';
import {ServiceID} from '../../../core/types/enums/ServiceID';
import {ItemID} from '../../../core/types/enums/ItemID';
import UIUpdater from '../../app/UIUpdater';
import ContainerInterface from '../../../core/source/ContainerInterface';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface';

export type UI_Building = {
    ID: BuildingID;
    itemID: ItemID;
    count: number;
    interval: number;
};

interface ConstructionRCProps {
    container: ContainerInterface;
    construction: Construction;
    // construction: ConstructionRenderInterface;
    window: UI_WindowOptions;
}

interface ConstructionRCState {
    buildings: UI_Building[];
    window: UI_WindowOptions;
}

export interface ConstructionRCInterface {
    // updateItems?(items: UI_ProductionItem[]): void;
    updateBuildings?(buildings: UI_Building[]): void
}

export interface ConstructionRenderInterface {
    renderByRequest(UI: ConstructionRCInterface): void
}

export class ConstructionRC extends React.Component<ConstructionRCProps, ConstructionRCState> implements ConstructionRCInterface, RCUpdateInterface {
    private readonly _availableBuildings = [
        BuildingID.CoalMine,
        BuildingID.IronOreMine,
        BuildingID.CopperOreMine,
    ];

    constructor(props: ConstructionRCProps) {
        super(props);

        this.state = {
            buildings: [],
            window: {show: true},
        };

        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    updateByRequest(): void {
        this.props.construction.renderByRequest(this);
    }

    updateBuildings(buildings: UI_Building[]): void {
        this.setState((state) => {
            return {
                buildings: buildings,
            } as ConstructionRCState;
        });
    }

    render() {
        if (!(this.state.window.show && this.props.window.show)) return;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Available buildings</div>
                    <div className={'widget__content'}>
                        <table className={'basic-table'}>
                            <tbody>
                            <tr>
                                <th>BUILDING_ID</th>
                                <th>REQUIRE_ITEMS</th>
                                <th>CTRL</th>
                            </tr>
                            {_.map(this._availableBuildings, (availableBuildingID, index, collection) => {
                                return <tr key={BuildingID.IronOreMine}>
                                    <td>{availableBuildingID}</td>
                                    <td>{_.map(database.buildings.find(availableBuildingID).requireItems, (value, index, collection) => {
                                        return <div>{value.itemID}: {value.count}/{this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController).containItem(value.itemID)}</div>
                                    })}</td>
                                    <td><button className={'btn btn_default'} onClick={(event) => {
                                        event.preventDefault();
                                        this.props.construction.build(availableBuildingID, this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController));
                                    }}>BUILD</button></td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>{/*end widget__content*/}
                </div>{/*end widget*/}
                <div className={'widget'}>
                    <div className={'widget__title'}>Buildings</div>
                    <div className={'widget__content'}>
                        <table className={'basic-table'}>
                            <tbody>
                            <tr>
                                <th>BUILDING_ID</th>
                                <th>ITEM_ID</th>
                                <th>COUNT/PERIOD(s)</th>
                            </tr>
                            {_.map(this.state.buildings, (building, index) => {
                                return <tr key={index}>
                                    <td>{building.ID}</td>
                                    <td>{building.itemID}</td>
                                    <td>{building.count}/{building.interval}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>{/*end widget__content*/}
                </div>{/*end widget*/}
            </div>
        );
    }
}