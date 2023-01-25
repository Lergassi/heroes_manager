import {formatDuration, intervalToDuration} from 'date-fns';
import _ from 'lodash';
import React from 'react';
import ItemStorageController from '../../../core/app/Components/ItemStorageController.js';
import Location, {LocationRender, LocationState} from '../../../core/app/Components/Location.js';
import MainHeroList from '../../../core/app/Components/MainHeroList.js';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface.js';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface.js';
import {assertNotNil} from '../../../core/source/assert.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import GameObject from '../../../core/source/GameObject.js';
import {CommandID} from '../../../core/types/enums/CommandID.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_ItemCount, UI_ShortHero} from '../../../core/types/main.js';
import UIUpdater from '../../app/UIUpdater.js';
import HeroListSelectRC from './HeroListSelectRC.js';
import {MainHeroListRCElement} from './MainHeroListRC.js';

export interface DetailLocationRCProps {
    container: ContainerInterface;
    mainHeroList: MainHeroList;
}

export interface DetailLocationRCState {
    location: GameObject;
    ID: string;

    window: {
        show: boolean,
    },

    state: string;
    level: number;

    // gatheringPerformance: number;
    timeToClose: number;

    heroes: DetailLocationRCHeroElement[];
    enemies: DetailLocationRCEnemyElement[];
    // veins: DetailLocationRCVeinElement[];
    veins: UI_ItemCount[];

    items: UI_ItemCount[];
    money: number;

    selectedHeroID: string;
    heroesList: DetailLocationRCHeroElement[];
}

export interface DetailLocationRCHeroElement {
    ID: string;
    heroClassName: string;
    level: number;
    attackPower: number;
    currentHealthPoints: number;
    maxHealthPoints: number;
    isDead: boolean;
    //управление
}

export interface DetailLocationRCEnemyElement {
    enemyTypeName: string;
    level: number;
    attackPower: number;
    currentHealthPoints: number;
    maxHealthPoints: number;
    isDead: boolean;
}

export interface DetailLocationRCVeinElement {
    itemName: string;
    count: number;
}

export interface DetailLocationRCLootElement {
    itemName: string;
    count: string;
}

export default class DetailLocationRC extends React.Component<DetailLocationRCProps, DetailLocationRCState> implements LocationRender {
    constructor(props: DetailLocationRCProps) {
        super(props);

        this.state = {
            location: undefined,
            ID: '',

            window: {
                show: false,
            },

            state: '',
            level: 0,
            // gatheringPerformance: 0.4,
            // timeToClose: 8 * 60 * 60,
            timeToClose: 0,
            // timeToClose: 8 * 60 * 60 * 24 + 1 + 60 * 60,

            heroes: [],
            enemies: [],
            veins: [],

            items: [],
            money: 0,

            // selectedHeroID: props.heroes[0] ? props.heroes[0].ID : undefined,
            selectedHeroID: '', //todo: Отдельный компонент выбора. Только для ui.
            heroesList: [],
        };

        this.props.container.set<DetailLocationRC>(ServiceID.UI_DetailLocation, this);
        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);

        this.hide = this.hide.bind(this);
        this.startHunting = this.startHunting.bind(this);
        this.stopHunting = this.stopHunting.bind(this);
        this.getRewards = this.getRewards.bind(this);
        this.addHero = this.addHero.bind(this);
        this.removeHero = this.removeHero.bind(this);

        this.handleAddHeroChange = this.handleAddHeroChange.bind(this);
        // this.handleRemoveHeroChange = this.handleRemoveHeroChange.bind(this);
    }

    updateByRequest(): void {
        if (!this.state.window.show) return;

        this.updateID(String(this.state.location.ID));  //todo: Будет так до новой системы GameObject.
        this.state.location?.get<Location>(ComponentID.Location).renderByRequest(this);
        // this.props.mainHeroList.renderByRequest(this);
    }

    updateLocation(location: GameObject, options?: {show?: boolean}): void {
        assertNotNil(location);

        // if (!location) return;
        // if (this.state.location && this.state.location === location) return;

        // this.removeLocation();

        this.setState((state, props) => {
            return {
                location: location,
            } as DetailLocationRCState;
        });
        this.resetHeroList();
        // this.setState((state: DetailLocationRCState) => {
        //     return {
        //         location: undefined,
        //
        //         window: {
        //             show: false,
        //         },
        //
        //         level: 0,
        //         // gatheringPerformance: 0.4,
        //         // timeToClose: 8 * 60 * 60,
        //         timeToClose: 0,
        //         // timeToClose: 8 * 60 * 60 * 24 + 1 + 60 * 60,
        //
        //         heroes: [],
        //         enemies: [],
        //         veins: [],
        //
        //         items: [],
        //         money: 0,
        //     };
        // });

        // location.get<LocationComponent>(ComponentID.Location).render(this);
        // location.get<Location>(ComponentID.Location).renderByRequest(this);
        // this.updateByRequest();
        // debug(DebugNamespaceID.Log)('Локация установлена для: ' + ServiceID.UI_DetailLocation);
        if (options?.show) this.show();
    }

    show(): void {
        this.setState((state) => {
            return {
                window: {
                    show: true,
                },
            } as DetailLocationRCState;
        });
    }

    hide() {
        console.log('hide');
        this.setState((state) => {
            return {
                window: {
                    show: false,
                },
            } as DetailLocationRCState;
        });
    }

    updateID(ID: string): void {
        this.setState((state) => {
            return {
                ID: ID,
            } as DetailLocationRCState;
        });
    }

    toggleWindow(): void {
        this.setState((state) => {
            return {
                window: {
                    show: !state.window.show,
                },
            } as DetailLocationRCState;
        });
    }

    isLocationSelected(): boolean {
        return !_.isNil(this.state.location);
    }

    removeLocation(): void {
        this.setState((state) => {
            return {
                location: undefined,
            }  as DetailLocationRCState;
        });

        //todo: Удаление привязок.
        // debug(DebugNamespaceID.Log)('Локация удалена для: ' + ServiceID.UI_DetailLocation);
    }

    updateState(state: string): void {
        this.setState((stateRC) => {
            return {
                state: state,
            } as DetailLocationRCState;
        });
    }

    updateLevel(level: number): void {
        // if (!this.isLocationSelected()) return;

        this.setState((state) => {
            return {
                level: level,
            } as DetailLocationRCState;
        });
    }

    updateHeroes(heroes: DetailLocationRCHeroElement[]): void {
        this.setState((state) => {
            return {
                heroes: heroes,
            } as DetailLocationRCState;
        });
    }

    updateEnemies(enemies: DetailLocationRCEnemyElement[]): void {
        this.setState((state) => {
            return {
                enemies: enemies,
            } as DetailLocationRCState;
        });
    }

    // updateVeins(veins: DetailLocationRCVeinElement[]): void {
    updateVeins(veins: UI_ItemCount[]): void {
        this.setState((state) => {
            return {
                veins: veins,
            } as DetailLocationRCState;
        });
    }

    updateLoot(items: UI_ItemCount[]): void {
        this.setState((state) => {
            return {
                items: items,
            } as DetailLocationRCState;
        });
    }

    updateMoney(value: number): void {
        this.setState((state) => {
            return {
                money: value,
            } as DetailLocationRCState;
        });
    }

    startHunting(): void {
        this.state.location?.get<Location>(ComponentID.Location).startHunting();
    }

    stopHunting(): void {
        this.state.location?.get<Location>(ComponentID.Location).stopHunting();
    }

    getRewards(): void {
        //todo: Команда.
        this.state.location?.get<Location>(ComponentID.Location).getReward({
            itemStorage: this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController),
            wallet: this.props.container.get<WalletInterface>(ServiceID.Wallet),
        });
    }

    async addHero(value: string) {
        await this.props.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.add_hero_to_location, [this.state.ID, value]);
    }


    async removeHero(heroID: string) {
        await this.props.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.remove_hero_from_location, [this.state.ID, heroID]);
    }

    handleAddHeroChange(event) {
        event.preventDefault();
        this.setState({selectedHeroID: event.target.value} as DetailLocationRCState);
    }

    resetHeroList(): void {
        this.setState((state) => {
            return {
                selectedHeroID: this.state.heroesList.length ? this.state.heroesList[0].ID : undefined,
            } as DetailLocationRCState;
        });
    }

    render() {
        if (!this.state.location) return;
        if (!this.state.window.show) return;

        let heroes = this.state.heroes;
        let enemies = this.state.enemies;
        let veins = this.state.veins;
        let loot = this.state.items;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Локация ({this.state.ID})<button className={'widget__hide-button'} onClick={this.hide}>close</button></div>
                </div>
                <div className={'row'} key={0}>
                {/*<div className={''} key={0}>*/}
                    <div className={'col col-25'}>
                        <div className={'widget'}>
                            <div className={'widget__title'}>Информация</div>
                            <div className={'widget__content'}>
                                <ul>
                                    <li>Уровень: {this.state.level}</li>
                                    {/*<li>Эффективность сбора: {this.state.gatheringPerformance}</li>*/}
                                    <li>Время до закрытия: {formatDuration(intervalToDuration({start: 0, end: this.state.timeToClose * 1000}))} часов</li>
                                    <li>Золото: {this.state.money}</li>
                                </ul>
                            </div>
                        </div>
                        <div className={'widget'}>
                            <div className={'widget__title'}>Управление</div>
                            <div className={'widget__content'}>
                                {this.state.state === LocationState.Waiting ?
                                    <button className={'btn btn_primary'} onClick={this.startHunting}>startHunting</button> :
                                    <button className={'btn btn_primary'} onClick={this.stopHunting}>stopHunting</button>
                                }
                                <button className={'btn btn_primary'} onClick={this.getRewards}>getRewards</button>
                                {/*<button className={'btn btn_danger'}>Удалить локацию</button>*/}
                            </div>
                        </div>
                        {/*<div className={'widget'}>*/}
                        {/*    <div className={'widget__title'}>Журнал</div>*/}
                        {/*    <div className={'widget__content'}>*/}
                        {/*        <div>Охота запущена</div>*/}
                        {/*        <div>Добыча ресурсов: 42</div>*/}
                        {/*        <div>Добыча ресурсов: 42</div>*/}
                        {/*        <div>Умер герой</div>*/}
                        {/*        <div>Добыча ресурсов: 42</div>*/}
                        {/*        <div>Умер враг</div>*/}
                        {/*        <div>Конец</div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>{/*end col*/}
                    <div className={'col col-25'}>
                        <div className={'widget'}>
                            <div className={'widget__title'}>Герои</div>
                            <div className={'widget__content'}>
                                <table className={'basic-table'}>
                                    <tbody>
                                        <tr>
                                            <th>Класс</th>
                                            <th>Уровень</th>
                                            <th>Сила атаки</th>
                                            <th>Очки здоровья</th>
                                            <th>Управление</th>
                                        </tr>
                                        {_.map(heroes, (hero, index) => {
                                            return <tr key={index}>
                                                <td>{hero.heroClassName} {hero.isDead ? '(X)' : ''}</td>
                                                <td>{hero.level}</td>
                                                <td>{hero.attackPower}</td>
                                                <td>{hero.currentHealthPoints}/{hero.maxHealthPoints}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        this.removeHero(hero.ID);
                                                    }}>remove</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                <div>
                                    <HeroListSelectRC
                                        container={this.props.container}
                                        mainHeroList={this.props.mainHeroList}
                                        // selectedHeroID={undefined}
                                        handleAddHeroChange={this.addHero}
                                    />
                                </div>
                            </div>{/*end widget__content*/}
                        </div>{/*end widget*/}
                    </div>{/*end col*/}
                    <div className={'col col-25'}>
                        <div className={'widget'}>
                            <div className={'widget__title'}>Враги</div>
                            <div className={'widget__content'}>
                                <table className={'basic-table'}>
                                    <tbody>
                                        <tr>
                                            <th>Тип</th>
                                            <th>Уровень</th>
                                            <th>Сила атаки</th>
                                            <th>Очки здоровья</th>
                                        </tr>
                                        {_.map(enemies, (enemy, index) => {
                                            return <tr key={index}>
                                                <td>{enemy.enemyTypeName} {enemy.isDead ? '(X)' : ''}</td>
                                                <td>{enemy.level}</td>
                                                <td>{enemy.attackPower}</td>
                                                <td>{enemy.currentHealthPoints}/{enemy.maxHealthPoints}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>{/*end col*/}
                    <div className={'col col-25'}>
                        <div className={'widget'}>
                            <div className={'widget__title'}>Ресурсы для сбора</div>
                            <div className={'widget__content'}>
                                <table className={'basic-table'}>
                                    <tbody>
                                        <tr>
                                            <th>Ресурс</th>
                                            <th>Кол-во</th>
                                            {/*<th>Эффективность сбора (0.4)</th>*/}
                                        </tr>
                                        {_.map(veins, (vein, index) => {
                                            return <tr key={index}>
                                                <td>{vein.itemName}</td>
                                                <td>{vein.count}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={'widget'}>
                            <div className={'widget__title'}>Добыча</div>
                            <div className={'widget__content'}>
                                <table className={'basic-table'}>
                                    <tbody>
                                    <tr>
                                        <th>Предмет</th>
                                        <th>Кол-во</th>
                                    </tr>
                                    {_.map(loot, (data, index) => {
                                        return <tr key={index}>
                                            <td>{data.itemName}</td>
                                            <td>{data.count}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                                {/*<ItemStorageRC*/}
                                {/*    size={10}*/}
                                {/*    columns={5}*/}
                                {/*/>*/}
                            </div>
                        </div>
                    </div>{/*end col*/}
                </div>{/*end row*/}
            </div>
        );
    }
}