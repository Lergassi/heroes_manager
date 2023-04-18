import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Endurance from '../../../core/app/Components/Endurance.js';
import HealthPoints from '../../../core/app/Components/HealthPoints.js';
import MainHeroList, {MainHeroListRenderInterface} from '../../../core/app/Components/MainHeroList.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import GameObject from '../../../core/source/GameObject.js';
import {CommandID} from '../../../core/types/enums/CommandID.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import {UI_WindowOptions} from '../../types/main.js';
import DetailHeroRC from './DetailHeroRC.js';
import {MainLocationListRCState} from './MainLocationListRC.js';
import {sprintf} from 'sprintf-js';
import {database} from '../../../core/data/ts/database.js';

export interface MainHeroListRCProps {
    container: ContainerInterface;
    mainHeroList: MainHeroList;
    window: UI_WindowOptions;
}

export interface MainHeroListRCState {
    mainHeroList: MainHeroList;
    heroes: MainHeroListRCElement[];
    activePage: number;
    totalPages: number;
    totalHeroes: number;
    window: UI_WindowOptions;
}

export class MainHeroListRCElement {
    hero: GameObject;
    ID: string;

    heroClassId: string;
    heroClassName: string;
    heroRoleName: string;
    state: string;
    averageItemLevel: number;

    endurance: number;
    maxEndurance: number;
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
        window['app']['sandbox']['test2'] = (windowState) => {
            this.setState((state) => {
                return {
                    window: {
                        show: windowState,
                    },
                } as MainHeroListRCState;
            });
        }
    }

    updateByRequest(): void {
        if (!(this.props.window.show && this.state.window.show)) return;

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
        if (!(this.props.window.show && this.state.window.show)) return;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>MainHeroListRC</div>
                    <div className={'widget__content'}>
                        <div className={'hero-list-wrapper'}>
                            {/*<table className={'hero-list-table'}>*/}
                            <table className={'basic-table'}>
                                <tbody>
                                {/*<tr className={'hero-list-table-row'}>*/}
                                <tr className={''}>
                                    {/*<th></th>*/}
                                    <th>HeroClassID (ID)</th>
                                    {/*<th style={{width: '220px'}}>Level (xp)</th>*/}
                                    <th>Level (xp)</th>
                                    <th>HP</th>
                                    <th>Endurance</th>
                                    <th>HeroRole</th>
                                    <th>ActivityState</th>
                                    <th>ilvl</th>
                                    <th>AP</th>
                                    <th>STR/AGI/INT</th>
                                    <th>Ctrl</th>
                                    {/*<th>to location</th>*/}
                                </tr>
                                    {_.map(this.state.heroes, (hero, index) => {
                                        return <tr key={index}>
                                            <td>
                                                <span className={sprintf("icon icon_%s icon_32 icon_first-column-column-padding", database.hero_classes.data.find(hero.heroClassId).iconId)}></span>
                                                <span className={'first-table-column-padding-for-icon'}>
                                                    <a href="" onClick={(event) => {
                                                        event.preventDefault();
                                                        this.props.container.get<DetailHeroRC>(ServiceID.UI_DetailHero).updateHero(hero.hero, {show: true});
                                                    }}>{hero.heroClassName} ({hero.ID}) {hero.isDead ? 'X' : ''}</a>
                                                </span>
                                            </td>
                                            <td>{hero.level} ({hero.exp}/{hero.totalExpToLevelUp})</td>
                                            <td>{hero.currentHealthPoints}/{hero.maxHealthPoints}</td>
                                            <td>{hero.endurance}/{hero.maxEndurance}</td>
                                            <td>{hero.heroRoleName}</td>
                                            <td>{hero.state}</td>
                                            <td>{hero.averageItemLevel}</td>
                                            <td>{hero.attackPower}</td>
                                            <td>{hero.strength}/{hero.agility}/{hero.intelligence}</td>
                                            <td>
                                                <button className={'btn btn_default'} onClick={() => {
                                                    this.props.container.get<DetailHeroRC>(ServiceID.UI_DetailHero).updateHero(hero.hero, {show: true});
                                                }}>DETAIL</button>
                                                <button className={'btn btn_default'} onClick={() => {
                                                    hero.hero.get<HealthPoints>(ComponentID.HealthPoints).resurrect();
                                                }}>RESURRECT</button>
                                                <button className={'btn btn_default'} onClick={() => {
                                                    hero.hero.get<Endurance>(ComponentID.Endurance).reset();
                                                }}>RESET_ENDURANCE</button>
                                                {/*<button className={'btn btn_danger'} onClick={() => {*/}
                                                {/*    hero.deleteHandler();*/}
                                                {/*}}>DELETE</button>*/}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            <div className={'pagination'}>
                                <span>
                                    {_.map(_.range(1, this.state.totalPages + 1), (page) => {
                                        return <span key={page} className={'btn btn_default'} onClick={(event) => {
                                            this.updateActivePage(page);
                                            event.preventDefault();
                                        }}>{page}</span>
                                    })}
                                </span>
                                <span>pages: {this.state.activePage}/{this.state.totalPages}, totalHeroes: {this.state.totalHeroes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}