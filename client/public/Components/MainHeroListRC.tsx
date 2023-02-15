import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainHeroList, {MainHeroListRenderInterface} from '../../../core/app/Components/MainHeroList.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import GameObject from '../../../core/source/GameObject.js';
import {CommandID} from '../../../core/types/enums/CommandID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import DetailHeroRC from './DetailHeroRC.js';
import {MainLocationListRCState} from './MainLocationListRC.js';

export interface MainHeroListRCProps {
    container: ContainerInterface;
    mainHeroList: MainHeroList;
}

export interface MainHeroListRCState {
    window: {
        show: boolean,
    };
    mainHeroList: MainHeroList;
    heroes: MainHeroListRCElement[];
    activePage: number;
    totalPages: number;
    totalHeroes: number;
}

export class MainHeroListRCElement {
    hero: GameObject;
    ID: string;

    heroClassName: string;
    heroRoleName: string;
    state: string;
    averageItemLevel: number;

    level: number;
    exp: number;
    totalExpToLevelUp: number;

    currentHealthPoints: number;
    maxHealthPoints: number;
    isDead: boolean;

    strength: number;
    agility: number;
    intelligence: number;
    attackPower: number;

    // deleteHandler: (hero: GameObject) => void;
    deleteHandler: () => void;
}

export default class MainHeroListRC extends React.Component<MainHeroListRCProps, MainHeroListRCState> implements MainHeroListRenderInterface {
    private _options = {
        rows: 10,
    };

    constructor(props: MainHeroListRCProps) {
        super(props);

        this.state = {
            window: {
                show: true,
            },
            mainHeroList: props.mainHeroList,
            heroes: [],
            totalHeroes: 0,
            activePage: 1,
            totalPages: 0,
        };

        this.props.container.set<MainHeroListRC>(ServiceID.UI_MainHeroList, this);
        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);

        // window['app']['sandbox']['showPage'] = (page) => {
        //     console.log('this', this);
        //     this.showPage(page);
        // }
    }

    updateByRequest(): void {
        if (!this.state.window.show) return;

        // this.state.mainHeroList.renderByRequest(this, {page: this.state.activePage, elementForPage: this._options.rows});
        this.state.mainHeroList.renderByRequest(this, {offset: ((this.state.activePage > 0 ? this.state.activePage - 1 : 0)) * this._options.rows, count: this._options.rows});
    }

    showPage(page: number): void {
        this.setState((state) => {
            return {
                activePage: page,
            } as MainHeroListRCState;
        });
    }

    updateHeroes(heroes: MainHeroListRCElement[]): void {
        this.setState((state) => {
            return {
                heroes: heroes,
            } as MainHeroListRCState;
        });
    }

    updatePagination(totalPages:number, totalHeroes:number): void {
        this.setState((state) => {
            return {
                totalPages: totalPages,
                totalHeroes: totalHeroes,
            } as MainHeroListRCState;
        });
    }

    // updateTotalHeroes(totalHeroes: number): void {
    //     this.setState((state) => {
    //         return {
    //             totalHeroes: totalHeroes,
    //         } as MainHeroListRCState;
    //     });
    // }

    updateActivePage(activePage: number): void {
        this.setState((state) => {
            return {
                activePage: activePage,
            } as MainHeroListRCState;
        });
    }

    render() {
        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Героев</div>
                    <div className={'widget__content'}>
                        <div className={'hero-list-wrapper'}>
                            <table className={'hero-list-table'}>
                                <tbody>
                                <tr className={'hero-list-table-row'}>
                                    {/*<th></th>*/}
                                    <th>HeroClass (ID)</th>
                                    <th>Level</th>
                                    <th>HeroRole</th>
                                    <th>ActivityState</th>
                                    <th style={{width: '220px'}}>Level (xp)</th>
                                    <th>ilvl</th>
                                    <th>HP</th>
                                    <th>AP</th>
                                    <th>STR/AGI/INT</th>
                                    <th>Ctrl</th>
                                    {/*<th>to location</th>*/}
                                </tr>
                                    {_.map(this.state.heroes, (hero, index) => {
                                        return <tr key={index}>
                                            <td>{hero.heroClassName} ({hero.ID}) {hero.isDead ? 'X' : ''}</td>
                                            <td>{hero.level}</td>
                                            <td>{hero.heroRoleName}</td>
                                            <td>{hero.state}</td>
                                            <td>{hero.level} ({hero.exp}/{hero.totalExpToLevelUp})</td>
                                            <td>{hero.averageItemLevel}</td>
                                            <td>{hero.currentHealthPoints}/{hero.maxHealthPoints}</td>
                                            <td>{hero.attackPower}</td>
                                            <td>{hero.strength}/{hero.agility}/{hero.intelligence}</td>
                                            <td>
                                                <button className={'btn btn_default'} onClick={() => {
                                                    this.props.container.get<DetailHeroRC>(ServiceID.UI_DetailHero).updateHero(hero.hero, {show: true});
                                                }}>
                                                    detail
                                                </button>
                                                <button className={'btn btn_default'} onClick={() => {
                                                    hero.deleteHandler();
                                                }}>
                                                    delete
                                                </button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            {/*<div>activePage: {this.state.activePage}, pages: {this.state.totalPages}, totalHeroes: {this.state.totalHeroes}</div>*/}
                            <div>pages: {this.state.activePage}/{this.state.totalPages}, {this.state.totalHeroes}</div>
                            <div>
                                {_.map(_.range(1, this.state.totalPages + 1), (page) => {
                                    return <span key={page} className={'btn btn_default'} onClick={(event) => {
                                        this.updateActivePage(page);
                                        event.preventDefault();
                                    }}>{page}</span>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}