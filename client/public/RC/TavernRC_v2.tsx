import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainHeroList from '../../../core/app/Components/MainHeroList.js';
import Tavern_v2 from '../../../core/app/Components/Tavern_v2.js';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface.js';
import {database} from '../../../core/data/ts/database.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {HeroClassID} from '../../../core/types/enums/HeroClassID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import {UI_WindowOptions} from '../../types/main.js';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface.js';

export type UI_TavernHero_v2 = {
    heroClassID: HeroClassID;
    level: number;
    cost: number;
}

//todo: В RC. Вне ui доступ не нужен.
/**
 * Идея: в рендер передается только информация, что находится внутри. Остальные данные ui ищет сам. Пример: heroClassID + count. Другие данные по классу, ArmorMaterial/оружие, ui запрашивает из бд.
 * Таким образом кол-во данных для обмена между логикой и ui сокращается до минимума. И при изменении ui не нужно будет изменять логику.
 */
export interface TavernRCInterface_v2 {
    updateHero?(heroes: UI_TavernHero_v2[]): void;
}

export interface TavernRenderInterface_v2 {
    renderByRequest(UI: TavernRCInterface_v2): void
}

export interface TavernRCProps_v2 {
    container: ContainerInterface;
    tavern: Tavern_v2; //todo: Найти решение не передавать в ui логику вообще. Сейчас нужна для управления через ui.
    mainHeroList: MainHeroList;
    wallet: WalletInterface;
    // tavern: TavernRenderInterface;
    window: UI_WindowOptions;
}

interface TavernRCState_v2 {
    heroes: UI_TavernHero_v2[];
    window: UI_WindowOptions;
}

export default class TavernRC_v2 extends React.Component<TavernRCProps_v2, TavernRCState_v2> implements TavernRCInterface_v2, RCUpdateInterface {
    constructor(props: TavernRCProps_v2) {
        super(props);

        this.state = {
            heroes: [],
            window: {
                show: true,
            },
        };

        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    updateByRequest(): void {
        if (!(this.state.window.show && this.props.window.show)) return;

        this.props.tavern.renderByRequest(this);
    }

    updateHero(heroes: UI_TavernHero_v2[]): void {
        this.setState((state) => {
            return {
                heroes: heroes,
            } as TavernRCState_v2;
        });
    }

    render() {
        if (!(this.state.window.show && this.props.window.show)) return;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>TavernRC_v2</div>
                    <div className={'widget__content'}>
                        <table className={'basic-table'}>
                            <tbody>
                                <tr>
                                    <th>HeroClassID</th>
                                    <th>HeroRoleID</th>
                                    <th>level</th>
                                    <th>AvailableWeapons</th>
                                    <th>Cost</th>
                                    <th>Ctrl</th>
                                </tr>
                                {_.map(this.state.heroes, (hero, index) => {
                                    return <tr key={index}>
                                        <td>{hero.heroClassID} {index}</td>
                                        <td>{database.hero_classes.data.heroRole(hero.heroClassID)}</td>
                                        <td>{hero.level}</td>
                                        <td>
                                            {
                                                database.hero_classes.data.availableWeapons(hero.heroClassID, (ID) => {
                                                    return <span>{ID}</span>
                                                }).reduce((prev, curr) => {
                                                    return <>{prev}, {curr}</>;
                                                })
                                            }
                                        </td>
                                        <td>{hero.cost}</td>
                                        <td><button className={'btn btn_default'} onClick={(event) => {
                                            this.props.tavern.hire(
                                                index,
                                                // this.props.container.get<MainHeroList>(ServiceID.MainHeroList),
                                                // this.props.container.get<WalletInterface>(ServiceID.Wallet),
                                                this.props.mainHeroList,
                                                this.props.wallet,
                                            );
                                            event.preventDefault();
                                        }}>HIRE</button></td>
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