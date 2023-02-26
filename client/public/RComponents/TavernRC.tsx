import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainHeroList from '../../../core/app/Components/MainHeroList.js';
import Tavern from '../../../core/app/Components/Tavern.js';
import {database} from '../../../core/data/ts/database.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {HeroClassID} from '../../../core/types/enums/HeroClassID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import {UI_WindowOptions} from '../../types/main.js';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface.js';

export type UI_TavernHero = {
    heroClassID: HeroClassID;
    count: number;
};

//todo: В RC. Вне ui доступ не нужен.
/**
 * Идея: в рендер передается только информация, что находится внутри. Остальные данные ui ищет сам. Пример: heroClassID + count. Другие данные по классу, ArmorMaterial/оружие, ui запрашивает из бд.
 * Таким образом кол-во данных для обмена между логикой и ui сокращается до минимума. И при изменении ui не нужно будет изменять логику.
 */
export interface TavernRCInterface {
    updateHero?(heroes: UI_TavernHero[]): void;
}

export interface TavernRenderInterface {
    renderByRequest(UI: TavernRCInterface): void
}

export interface TavernRCProps {
    container: ContainerInterface;
    tavern: Tavern; //todo: Найти решение не передавать в ui логику вообще. Сейчас нужна для управления через ui.
    // tavern: TavernRenderInterface;
    window: UI_WindowOptions;
}

interface TavernRCState {
    heroes: UI_TavernHero[];
    window: UI_WindowOptions;
}

export default class TavernRC extends React.Component<TavernRCProps, TavernRCState> implements TavernRCInterface, RCUpdateInterface {
    constructor(props: TavernRCProps) {
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

    updateHero(heroes: UI_TavernHero[]): void {
        this.setState((state) => {
            return {
                heroes: heroes,
            } as TavernRCState;
        });
    }

    render() {
        if (!(this.state.window.show && this.props.window.show)) return;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Таверна</div>
                    <div className={'widget__content'}>
                        <table className={'basic-table'}>
                            <tbody>
                                {_.map(this.state.heroes, (hero, index) => {
                                    return <tr key={index}>
                                        <td>{hero.heroClassID}</td>
                                        <td>{database.hero_classes.data.heroRole(hero.heroClassID)}</td>
                                        <td>
                                            {
                                                database.hero_classes.data.availableWeapons(hero.heroClassID, (ID) => {
                                                    return <span>{ID}</span>
                                                }).reduce((prev, curr) => {
                                                    return <>{prev}, {curr}</>;
                                                })
                                            }
                                        </td>
                                        <td>{hero.count}</td>
                                        <td><button className={'btn btn_default'} onClick={(event) => {
                                            this.props.tavern.hire(hero.heroClassID, this.props.container.get<MainHeroList>(ServiceID.MainHeroList));
                                            event.preventDefault();
                                        }}>hire</button></td>
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