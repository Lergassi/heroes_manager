import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainHeroList, {MainHeroListRender} from '../../../core/app/Components/MainHeroList.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';

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
    ID: string;
    heroClassName: string;
    heroRoleName: string;
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
}

export default class MainHeroListRC extends React.Component<MainHeroListRCProps, MainHeroListRCState> implements MainHeroListRender {
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

        // window['app']['sandbox']['showPage'] = (page) => {
        //     console.log('this', this);
        //     this.showPage(page);
        // }
    }

    updateByRequest(): void {
        if (!this.state.window.show) return;

        this.state.mainHeroList.renderByRequest(this, {page: this.state.activePage, elementPerPage: this._options.rows});
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

    updatePagination(activePage: number, totalPages: number): void {
        this.setState((state) => {
            return {
                activePage: activePage,
                totalPages: totalPages,
            } as MainHeroListRCState;
        });
    }

    updateTotalHeroes(totalHeroes: number): void {
        this.setState((state) => {
            return {
                totalHeroes: totalHeroes,
            } as MainHeroListRCState;
        });
    }

    render() {
        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Главный список героев</div>
                    <div className={'widget__content'}>
                        <div className={'hero-list-wrapper'}>
                            <table className={'hero-list-table'}>
                                <tbody>
                                <tr className={'hero-list-table-row'}>
                                    {/*<th></th>*/}
                                    <th>Класс (ID)</th>
                                    <th>Роль</th>
                                    <th style={{width: '220px'}}>Уровень (опыт)</th>
                                    <th>ilvl</th>
                                    <th>Очки здоровья</th>
                                    <th>Сила атаки</th>
                                    <th>СИЛ/ЛОВ/ИНТ</th>
                                    <th>Управление</th>
                                </tr>
                                    {_.map(this.state.heroes, (hero, index) => {
                                        return <tr key={index}>
                                            <td>{hero.heroClassName} ({hero.ID}) {hero.isDead ? 'X' : ''}</td>
                                            <td>{hero.heroRoleName}</td>
                                            <td>{hero.level} ({hero.exp}/{hero.totalExpToLevelUp})</td>
                                            <td>{hero.averageItemLevel}</td>
                                            <td>{hero.currentHealthPoints}/{hero.maxHealthPoints}</td>
                                            <td>{hero.attackPower}</td>
                                            <td>{hero.strength}/{hero.agility}/{hero.intelligence}</td>
                                            <td>удалить, детали</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            <div>activePage: {this.state.activePage}, pages: {this.state.totalPages}, totalHeroes: {this.state.totalHeroes}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}