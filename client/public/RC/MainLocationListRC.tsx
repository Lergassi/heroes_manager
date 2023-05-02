import _ from 'lodash';
import React from 'react';
import MainLocationList, {MainLocationListRender} from '../../../core/app/Components/MainLocationList.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_ItemCount, UI_VeinItemCount} from '../../../core/types/main.js';
import UIUpdater from '../../app/UIUpdater.js';
import {UI_WindowOptions} from '../../types/main.js';
import DetailLocationRC from './DetailLocationRC.js';

export interface MainLocationListRCProps {
    container: ContainerInterface;
    mainLocationList: MainLocationList;
    window: UI_WindowOptions;
}

export interface MainLocationListRCState {
    locations: MainLocationListRCElement[];
    activePage: number;
    totalPages: number;
    totalLocations: number;
    window: UI_WindowOptions;
}

export interface MainLocationListRCElement {
    location: GameObject;
    ID: string;
    name: string;
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
    private _options = {
        rows: 14,
    };

    constructor(props: MainLocationListRCProps) {
        super(props);

        this.state = {
            window: {
                show: true,
            },
            locations: [],
            activePage: 1,
            totalPages: 0,
            totalLocations: 0,
        };

        this.props.container.set<MainLocationListRC>(ServiceID.UI_MainLocationList, this);
        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);

        this.changeActivePageHandler = this.changeActivePageHandler.bind(this);
    }

    updateByRequest(): void {
        if (!(this.state.window.show && this.props.window.show)) return;

        this.props.mainLocationList?.renderByRequest(this, {
            offset: ((this.state.activePage > 0 ? this.state.activePage - 1 : 0)) * this._options.rows,
            count: this._options.rows
        });
    }

    updateLocations(locations: MainLocationListRCElement[]): void {
        this.setState((state) => {
            return {
                locations: locations,
            } as MainLocationListRCState;
        });
    }

    updateActivePage(activePage: number): void {
        this.setState((state) => {
            return {
                activePage: activePage,
            } as MainLocationListRCState;
        });
    }

    updatePagination(totalPages: number, totalLocations: number): void {
        this.setState((state) => {
            return {
                totalPages: totalPages,
                totalLocations: totalLocations,
            } as MainLocationListRCState;
        });
    }

    changeActivePageHandler(e) {
        this.setState((state) => {
            return {
                activePage: e.target.value ?? 1,
            } as MainLocationListRCState;
        });
    }

    render() {
        if (!(this.state.window.show && this.props.window.show)) return;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>MainLocationListRC</div>
                    <div className={'widget__content'}>
                        <table className={'basic-table'}>
                            <tbody>
                            <tr>
                                <th>Type (ID)</th>
                                <th>Level</th>
                                <th>HuntingState</th>
                                <th>Heroes (L/T)</th>
                                <th>Enemies (L/T)</th>
                                {/*<th>Veins</th>*/}
                                <th>Loot</th>
                                <th>Money</th>
                                <th>Ctrl</th>
                            </tr>
                            {_.map(this.state.locations, (location, index) => {
                                return <tr key={index}>
                                    <td>
                                        <a href="" onClick={(event) => {
                                            event.preventDefault();
                                            this.props.container.get<DetailLocationRC>(ServiceID.UI_DetailLocation).updateLocation(location.location, {show: true});
                                        }}>{location.name} ({location.ID})</a>
                                    </td>
                                    <td>{location.level}</td>
                                    <td>{location.state}</td>
                                    <td>{location.lifeHeroesCount}/{location.totalHeroesCount}</td>
                                    <td>{location.lifeEnemiesCount}/{location.totalEnemiesCount}</td>
                                    {/*<td>*/}
                                    {/*    <ul>*/}
                                    {/*        /!*{_.map(location.veins, (vein, index) => {*!/*/}
                                    {/*        /!*    return <li key={index}>{vein.itemID}: {vein.count}/{vein.startCount}</li>*!/*/}
                                    {/*        /!*})}*!/*/}
                                    {/*    </ul>*/}
                                    {/*</td>*/}
                                    {/* todo: Временно скрыто. Надо сделать компонент для считывания списка предметов из ItemStorage без стеков. */}
                                    <td>
                                        {/*<ul>*/}
                                        {/*    {_.map(location.loot, (item, index) => {*/}
                                        {/*        if (!item.itemID) return;*/}

                                        {/*        return <li key={index}>{item.itemID}: {item.count}</li>*/}
                                        {/*    })}*/}
                                        {/*</ul>*/}
                                    </td>
                                    <td>{location.money}</td>
                                    <td>
                                        <button className={'btn btn_default'} onClick={() => {
                                            this.props.container.get<DetailLocationRC>(ServiceID.UI_DetailLocation).updateLocation(location.location, {show: true});
                                        }}>DETAIL
                                        </button>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                        <div>
                            <span>
                                {_.map(_.range(1, this.state.totalPages + 1), (page) => {
                                    return <span key={page} className={'btn btn_default'} onClick={(event) => {
                                        this.updateActivePage(page);
                                        event.preventDefault();
                                    }}>{page}</span>
                                })}
                            </span>
                            <span>pages: {this.state.activePage}/{this.state.totalPages}, items: {this.state.totalLocations}</span>
                        </div>
                    </div>
                    {/*end widget__content*/}
                </div>
                {/*end widget*/}
            </div>
        );
    }//render
}