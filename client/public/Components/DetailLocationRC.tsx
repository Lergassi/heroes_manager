import {formatDuration, intervalToDuration} from 'date-fns';
import _ from 'lodash';
import React from 'react';
import Location, {LocationRender} from '../../../core/app/Components/Location.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {ItemCount, UI_ItemCount} from '../../../core/types/main.js';
import debug from 'debug';

export interface DetailLocationRCProps {
    container: ContainerInterface;
}

export interface DetailLocationRCState {
    location: GameObject;

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
}

export interface DetailLocationRCHeroElement {
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
        };

        props.container.set<DetailLocationRC>(ServiceID.UI_DetailLocation, this);
        window['app']['sandbox']['updateLocation'] = (location) => {
            this.updateLocation(location);
            this.show();
            console.log('this.state', this.state);
        };
    }

    show(): void {
        this.setState((state) => {
            return {
                window: {
                    show: true,
                },
            };
        });
    }

    hide() {
        this.setState((state) => {
            return {
                window: {
                    show: false,
                },
            };
        });
    }

    toggleWindow(): void {
        this.setState((state) => {
            return {
                window: {
                    show: !state.window.show,
                },
            };
        });
    }

    updateByRequest(): void {
        if (!this.state.window.show) return;

        this.state.location?.get<Location>(ComponentID.Location).renderByRequest(this);
    }

    isLocationSelected(): boolean {
        return !_.isNil(this.state.location);
    }

    updateLocation(location: GameObject): void {
        if (!location) return;
        if (this.state.location && this.state.location === location) return;

        this.removeLocation();

        this.setState((state, props) => {
            return {
                location: location,
            } as DetailLocationRCState;
        });
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
        location.get<Location>(ComponentID.Location).renderByRequest(this);
        // this.updateByRequest();
        debug(DebugNamespaceID.Log)('Локация установлена для: ' + ServiceID.UI_DetailLocation);
    }

    removeLocation(): void {
        this.setState((state) => {
            return {
                location: undefined,
            }  as DetailLocationRCState;
        });

        //todo: Удаление привязок.
        debug(DebugNamespaceID.Log)('Локация удалена для: ' + ServiceID.UI_DetailLocation);
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

    render() {
        if (!this.state.location) return;
        if (!this.state.window.show) return;

        // let heroes = [
        //     // {heroClass: HeroClassID.Warrior, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
        //     undefined,
        //     {heroClassName: HeroClassID.FireMage, level: _.random(1, 100), attackPower: _.random(18, 26), currentHealthPoints: 100, maxHealthPoints: 100},
        //     {heroClassName: HeroClassID.Gunslinger, level: _.random(1, 100), attackPower: _.random(18, 26), currentHealthPoints: 100, maxHealthPoints: 100},
        //     // undefined,
        //     // undefined,
        //     {heroClassName: HeroClassID.Rogue, level: _.random(1, 100), attackPower: _.random(18, 26), currentHealthPoints: 100, maxHealthPoints: 100},
        //     {heroClassName: HeroClassID.Paladin, level: _.random(1, 100), attackPower: _.random(18, 26), currentHealthPoints: 100, maxHealthPoints: 100},
        // ];
        //
        // let enemies = [
        //     {enemyTypeName: EnemyID.Boar, level: _.random(1, 100), attackPower: _.random(18, 26), currentHealthPoints: 100, maxHealthPoints: 100},
        //     {enemyTypeName: EnemyID.Fox, level: _.random(1, 100), attackPower: _.random(18, 26), currentHealthPoints: 100, maxHealthPoints: 100},
        //     // undefined,
        //     {enemyTypeName: EnemyID.Bear, level: _.random(1, 100), attackPower: _.random(18, 26), currentHealthPoints: 100, maxHealthPoints: 100},
        //     // undefined,
        //     {enemyTypeName: EnemyID.Wolf, level: _.random(1, 100), attackPower: _.random(18, 26), currentHealthPoints: 100, maxHealthPoints: 100},
        //     {enemyTypeName: EnemyID.Skeleton, level: _.random(1, 100), attackPower: _.random(18, 26), currentHealthPoints: 100, maxHealthPoints: 100},
        //     // undefined,
        // ];
        //
        // let veins = [
        //     {itemName: ItemID.IronOre, count: _.random(20, 40)},
        //     {itemName: ItemID.Herb01, count: _.random(20, 40)},
        //     {itemName: ItemID.Herb02, count: _.random(20, 40)},
        //     {itemName: ItemID.Wood, count: _.random(20, 40)},
        //     {itemName: ItemID.Cotton, count: _.random(20, 40)},
        // ];

        let heroes = this.state.heroes;
        let enemies = this.state.enemies;
        let veins = this.state.veins;
        let loot = this.state.items;

        return (
            <div>
                <div className={'row'} key={0}>
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
                                <button className={'btn btn_primary'}>Охота</button>
                                <button className={'btn btn_primary'}>Забрать добычу</button>
                                <button className={'btn btn_danger'}>Удалить локацию</button>
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
                                            if (!hero) return;

                                            return <tr key={index}>
                                                <td>{hero.heroClassName} {hero.isDead ? '(X)' : ''}</td>
                                                <td>{hero.level}</td>
                                                <td>{hero.attackPower}</td>
                                                <td>{hero.currentHealthPoints}/{hero.maxHealthPoints}</td>
                                                <td>
                                                    Убрать {/*todo: Ссылка в виде строки*/}
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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