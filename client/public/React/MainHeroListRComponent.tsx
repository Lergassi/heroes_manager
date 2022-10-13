import React from 'react';
import MainHeroListComponent, {
    MainHeroListComponentEventCode
} from '../../../core/app/Components/MainHeroListComponent.js';
import EquipSlotComponent from '../../../core/app/Components/EquipSlotComponent.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import ExperienceComponent from '../../../core/app/Components/ExperienceComponent.js';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import CharacterAttributeComponent from '../../../core/app/Components/CharacterAttributeComponent.js';
import GameObject from '../../../core/source/GameObject.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import MainHeroTableRowRComponent from './MainHeroTableRowRComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';
import HeroDetailRComponent from './HeroDetailRComponent.js';

interface HeroListRComponentProps {
    container: ContainerInterface;
    heroListComponent: MainHeroListComponent;
}

interface HeroListRComponentState {
    heroListComponent: MainHeroListComponent;
    selectedHero: GameObject;
}

export default class MainHeroListRComponent extends React.Component<HeroListRComponentProps, HeroListRComponentState> implements RComponentUpdateInterface {
    private readonly _container: ContainerInterface;

    constructor(props: HeroListRComponentProps) {
        super(props);

        this._container = props.container;

        this.state = {
            heroListComponent: props.heroListComponent,
            selectedHero: null,
        };

        EventSystem.addListener({
            codes: [
                MainHeroListComponentEventCode.CreateHero,
                MainHeroListComponentEventCode.DeleteHero,
            ],
            listener: {
                callback: (target) => {
                    this.setState((state) => {
                        return {
                            heroListComponent: state.heroListComponent,
                        };
                    });
                },
            // target:
            },
        });

        this._selectHero = this._selectHero.bind(this);
        this.deleteHero = this.deleteHero.bind(this);
    }

    update(): void {
        this.setState(state => ({
            heroListComponent: state.heroListComponent,
        }));
    }

    private _selectHero(hero: GameObject) {
        this.setState((state) => ({
            selectedHero: hero,
        }));
        window['sandbox']['showHero']();    //todo: Пока так. От чего будет зависеть окно отображение героя пока не ясно.
    }

    async deleteHero(hero: GameObject) {
        await this._container.get<GameConsole>('gameConsole').run('hero.delete', [hero.ID.toString()]);
    }

    render() {
        let heroList = this.state.heroListComponent.heroes.map((hero, index) => {
            return (
                <MainHeroTableRowRComponent
                    key={hero.ID}
                    container={this._container}
                    hero={hero}
                    selectHero={this._selectHero}
                    deleteHero={this.deleteHero}
                />
            );
        });

        return (
            <div className={'block'}>
                <table className={'basic-table basic-table__full-width'}>
                    <tbody>
                    <tr>
                        <th>id</th>
                        <th>heroClass</th>
                        <th>level (exp)</th>
                        <th>Health points</th>
                        <th>Magic points</th>
                        <th>Attack power</th>
                        <th>STR/AGL/INT</th>
                        <th></th>
                    </tr>
                    {heroList}
                    </tbody>
                </table>
                <HeroDetailRComponent
                    hero={this.state.selectedHero}
                />
            </div>
        );
    }
}