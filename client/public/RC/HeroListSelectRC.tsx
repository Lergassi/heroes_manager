import _ from 'lodash';
import React from 'react';
import MainHeroList, {MainHeroListRenderInterface} from '../../../core/app/Components/MainHeroList.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import {MainHeroListRCElement} from './MainHeroListRC.js';

export interface HeroListSelectRCProps {
    container: ContainerInterface;
    mainHeroList: MainHeroList;
    handleAddHeroChange: (ID: string) => void;
}

export interface HeroListSelectRCState {
    mainHeroList: MainHeroList;
    heroes: MainHeroListRCElement[];
    selectedHeroID: string;
}

/**
 * Компонент для изменения внешнего состояния.
 */
export default class HeroListSelectRC extends React.Component<HeroListSelectRCProps, HeroListSelectRCState> implements MainHeroListRenderInterface {
    constructor(props: HeroListSelectRCProps) {
        super(props);

        this.state = {
            mainHeroList: props.mainHeroList,
            heroes: [],
            selectedHeroID: '',
        };

        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);

        this.handleAddHeroChange = this.handleAddHeroChange.bind(this);
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
                if (!state.selectedHeroID) {
                    newState.selectedHeroID = heroes[0].ID;
                }
            } else {
                newState.selectedHeroID = '';
            }

            return newState;
        });
    }

    handleAddHeroChange(event): void {
        event.preventDefault();
        this.setState((state) => {
            return {
                selectedHeroID: event.target.value,
            } as HeroListSelectRCState;
        });
    }

    render() {
        return (
            <div>
                <select value={this.state.selectedHeroID} name="" id="" onChange={this.handleAddHeroChange}>
                    {_.map(this.state.heroes, (hero, index) => {
                        return <option key={index}
                                       value={hero.ID}>{hero.heroClassName} ({hero.ID}), {hero.level} lvl</option>
                    })}
                </select>
                <button className={'btn btn_default'}
                        onClick={this.props.handleAddHeroChange.bind(this, this.state.selectedHeroID)}>ADD_HERO
                </button>
            </div>
        );
    }
}