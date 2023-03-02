import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainHeroList, {MainHeroListRenderInterface} from '../../../core/app/Components/MainHeroList.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import {HeroListSelectRCState} from './HeroListSelectRC.js';
import {MainHeroListRCElement} from './MainHeroListRC.js';

export interface HeroScrolledListSelectRCProps {
    container: ContainerInterface;
    mainHeroList: MainHeroList;
    handleAddHeroChange: (ID: string) => void;
}

export interface HeroScrolledListSelectRCState {
    mainHeroList: MainHeroList;
    heroes: MainHeroListRCElement[];
    // selectedHeroID: string;
}

export default class HeroScrolledListSelectRC extends React.Component<HeroScrolledListSelectRCProps, HeroScrolledListSelectRCState> implements MainHeroListRenderInterface {
    constructor(props: HeroScrolledListSelectRCProps) {
        super(props);

        this.state = {
            mainHeroList: this.props.mainHeroList,
            heroes: [],
            // handleAddHeroChange: this.props.handleAddHeroChange,
        };

        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    updateByRequest(): void {
        this.state.mainHeroList.renderByRequest(this);
    }

    updateHeroes(heroes: MainHeroListRCElement[]): void {
        this.setState((state) => {
            let newState = {
                heroes: heroes,
            } as HeroListSelectRCState;

            //todo: @bug При удалении героя, selectedHeroID не сбрасывается.
            if (heroes.length) {
                // if (!state.selectedHeroID) {
                //     newState.selectedHeroID = heroes[0].ID;
                // }
            } else {
                // newState.selectedHeroID = '';
            }

            return newState;
        });
    }

    render() {
        return (
            <div className={'scrolled-list-select'}>
                <table className={'basic-table'}>
                    <tbody>
                        {_.map(this.state.heroes, (hero , index) => {
                            return <tr key={index}>
                                <td>{hero.heroClassName} ({hero.ID}), {hero.level} lvl</td>
                                <td><button className={'btn btn_default'} onClick={this.props.handleAddHeroChange.bind(this, hero.ID)}>ADD</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}