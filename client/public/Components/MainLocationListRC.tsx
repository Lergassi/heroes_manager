import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {LocationState} from '../../../core/app/Components/Location.js';
import MainLocationList, {MainLocationListRender} from '../../../core/app/Components/MainLocationList.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_ItemCount, UI_VeinItemCount} from '../../../core/types/main.js';
import UIUpdater from '../../app/UIUpdater.js';
import DetailLocationRC from './DetailLocationRC.js';

export interface MainLocationListRCProps {
    container: ContainerInterface;
    mainLocationList: MainLocationList;
}

export interface MainLocationListRCState {
    window: {
        show: boolean,
    },
    locations: MainLocationListRCElement[];
    activePage: number;
    totalPages: number;
}

export interface MainLocationListRCElement {
    location: GameObject;
    ID: string;
    level: number;
    state: string;
    lifeHeroesCount: number;
    totalHeroesCount: number;
    lifeEnemiesCount: number;
    totalEnemiesCount: number;
    money: number;
    veins: UI_VeinItemCount[];
    loot: UI_ItemCount[];
}

export default class MainLocationListRC extends React.Component<MainLocationListRCProps, MainLocationListRCState> implements MainLocationListRender {
    constructor(props: MainLocationListRCProps) {
        super(props);

        this.state = {
            window: {
                show: true,
            },
            locations: [],
            activePage: 0,
            totalPages: 0,
        };

        this.props.container.set<MainLocationListRC>(ServiceID.UI_MainLocationList, this);
        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    updateByRequest(): void {
        if (!this.state.window.show) return;

        this.props.mainLocationList?.renderByRequest(this);
    }

    updateLocations(locations: MainLocationListRCElement[]): void {
        this.setState((state) => {
            return {
                locations: locations,
            } as MainLocationListRCState;
        });
    }

    updatePagination(activePage: number, totalPages: number): void {}

    render() {
        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Локации</div>
                    <div className={'widget__content'}>
                        <table className={'basic-table'}>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>level</th>
                                    <th>state</th>
                                    <th>heroes (L/T)</th>
                                    <th>enemies (L/T)</th>
                                    <th>veins</th>
                                    <th>loot</th>
                                    <th>money</th>
                                    <th>Управление</th>
                                </tr>
                                {_.map(this.state.locations, (location, index) => {
                                    return <tr key={index}>
                                        <td>{location.ID}</td>
                                        <td>{location.level}</td>
                                        <td>{location.state}</td>
                                        <td>{location.lifeHeroesCount}/{location.totalHeroesCount}</td>
                                        <td>{location.lifeEnemiesCount}/{location.totalEnemiesCount}</td>
                                        <td>
                                            <ul>
                                                {_.map(location.veins, (vein, index) => {
                                                    return <li key={index}>{vein.itemName}: {vein.count}/{vein.startCount}</li>
                                                })}
                                            </ul>
                                        </td>
                                        <td>
                                            <ul>
                                                {_.map(location.loot, (item, index) => {
                                                    if (!item.itemName) return;

                                                    return <li key={index}>{item.itemName}: {item.count}</li>
                                                })}
                                            </ul>
                                        </td>
                                        <td>{location.money}</td>
                                        <td>
                                            <button onClick={() => {
                                                this.props.container.get<DetailLocationRC>(ServiceID.UI_DetailLocation).updateLocation(location.location, {show: true});
                                            }}>detail</button>
                                        </td>
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