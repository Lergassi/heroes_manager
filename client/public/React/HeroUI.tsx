import React from 'react';
import MainHeroListComponent, {
    MainHeroListComponentEventCode
} from '../../../core/app/Components/MainHeroListComponent.js';
import EquipSlotComponentControllerComponent from '../../../core/app/Components/EquipSlotComponentControllerComponent.js';
import EquipSlotComponent, {EquipSlotComponentEventCode} from '../../../core/app/Components/EquipSlotComponent.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import LevelRange from '../../../core/app/Components/ExperienceComponent.js';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import {
    ItemStorageCollectionRComponentProps,
    ItemStorageCollectionRComponentState
} from './ItemStorageUI.js';
import MainItemStorageListComponent from '../../../core/app/Components/MainItemStorageListComponent.js';
import ItemStorageSlotComponent from '../../../core/app/Components/ItemStorageSlotComponent.js';
import CharacterAttributeComponent from '../../../core/app/Components/CharacterAttributeComponent.js';
import HealthPointsComponent from '../../../core/app/Components/HealthPointsComponent.js';
import MagicPointsComponent from '../../../core/app/Components/MagicPointsComponent.js';
import AttackPowerComponent from '../../../core/app/Components/AttackPowerComponent.js';
import GameObject from '../../../core/source/GameObject.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import AppError from '../../../core/source/Errors/AppError.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import MainHeroTableRowRComponent from './MainHeroTableRowRComponent.js';
import ExperienceComponent from '../../../core/app/Components/ExperienceComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';
import {ContainerKey} from '../../../core/app/consts.js';

interface HeroListRComponentProps {
    container: ContainerInterface;
    heroListComponent: MainHeroListComponent;
}

interface HeroListRComponentState {
    heroListComponent: MainHeroListComponent;
    selectedHero: GameObject;
}

export class HeroListRComponent extends React.Component<HeroListRComponentProps, HeroListRComponentState> implements RComponentUpdateInterface {
    private readonly _container: ContainerInterface;

    constructor(props: HeroListRComponentProps) {
        super(props);

        this._container = props.container;

        this.state = {
            heroListComponent: props.heroListComponent,
            selectedHero: null,
        };

        //todo: Шаблонный метод?
        // this.state.heroListComponent.assignRComponent(this);
        // for (let i = 0; i < props.heroListComponent.heroes.length; i++) {
        //     props.heroListComponent.heroes[i].assignRComponent(this);
        // }
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
        // EventSystem.addListener([
        //     MainHeroListComponentEventCode.CreateHero,
        //     MainHeroListComponentEventCode.DeleteHero,
        // ], (target) => {
        //     this.setState((state) => {
        //         return {
        //             heroListComponent: state.heroListComponent,
        //         };
        //     });
        // });

        this.selectHero = this.selectHero.bind(this);
        this.deleteHero = this.deleteHero.bind(this);
    }

    update(): void {
        this.setState(state => ({
            heroListComponent: state.heroListComponent,
        }));
    }

    selectHero(hero: GameObject) {
        console.log('selectHero', hero);
        this.setState((state) => ({
            selectedHero: hero,
        }));
        window['sandbox']['showHero']();    //todo: Пока так. От чего будет зависеть окно отображение героя пока не ясно.
    }

    async deleteHero(hero: GameObject) {
        console.log('deleteHero', hero);
        await this._container.get<GameConsole>('gameConsole').run('delete_hero', [hero['_id'].toString()]);
    }

    render() {
        let heroList = this.state.heroListComponent.heroes.map((hero, index) => {
            return (
                <MainHeroTableRowRComponent
                    key={hero['_id']}
                    container={this._container}
                    hero={hero}
                    selectHero={this.selectHero}
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
                    container={this._container}
                    hero={this.state.selectedHero}
                />
            </div>
        );
    }
}

export interface HeroDetailRComponentProps {
    container: ContainerInterface,
    hero?: GameObject,
}

export interface HeroDetailRComponentState {
    hero?: GameObject,
    visible: boolean,
}

export class HeroDetailRComponent extends React.Component<HeroDetailRComponentProps, HeroDetailRComponentState> {
    private readonly _container: ContainerInterface;

    constructor(props: HeroDetailRComponentProps) {
        super(props);

        this._container = props.container;
        this.state = {
            hero: null,
            // visible: false,
            visible: true,
        };

        this.setHero = this.setHero.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.updateHandler = this.updateHandler.bind(this);

        window['sandbox']['showHero'] = this.show;
        window['sandbox']['hideHero'] = this.hide;
    }

    update(): void {
        this.setState((state) => ({
            hero: state.hero,
            visible: state.visible,
        }));
    }

    show() {
        //todo: Пока тестирую react проверки не будет. В рендер null отправиться не успевает.
        // if (!this.state.hero) {
        //     throw new AppError('hero не установлен.');
        // }

        this.setState((state) => ({
            visible: true,
        }));
    }

    hide() {
        this.setState((state) => ({
            visible: false,
        }));
    }

    setHero(hero: GameObject) {
        this.setState(function () {
            hero.assignRComponent(this);
            return {
                hero: hero,
            };
        });
    }

    updateHandler() {
        this.setState((state) => ({
            hero: state.hero,
        }));
    }

    render() {
        if (!this.state.visible) return null;

        let hero = this.props.hero; //todo: Это можно сделать в виде отдельного компонента. Например выбор кнопкой мыши.
        if (!hero) {
            return (<div>Герой не выбран.</div>);
        }

        return (
            <div className={'block'}>
                <div>Hero</div>
                <button onClick={this.hide}>Закрыть</button>
                <table className={'basic-table'}>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>{hero['_id']}</td>
                        </tr>
                        <tr>
                            <td>Уровень (опыт)</td>
                            <td>{hero.get<ExperienceComponent>(ExperienceComponent.name).level} ({hero.get<ExperienceComponent>(ExperienceComponent.name).exp})</td>
                        </tr>
                        <tr>
                            <td>Класс</td>
                            <td>{hero.get<HeroComponent>('heroComponent').heroClass.name}</td>
                        </tr>
                    </tbody>
                </table>
                <div>Экипировка</div>
                <table className={'basic-table'}>
                    <tbody>
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('right_hand')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('left_hand')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('head')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('neck')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('shoulders')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('chest')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('wrist')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('hands')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('waist')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('legs')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('foots')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('finger_1')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('finger_2')}
                            updateHandler={this.updateHandler}
                        />
                        <EquipSlotRComponent
                            equipSlotComponent={hero.get('trinket')}
                            updateHandler={this.updateHandler}
                        />
                    </tbody>
                </table>
            </div>
        );
    }
}

export interface EquipSlotRComponentProps {
    equipSlotComponent: EquipSlotComponent,
    updateHandler: () => void,
}

export interface EquipSlotRComponentState {
    equipSlotComponent: EquipSlotComponent,
}

export class EquipSlotRComponent extends React.Component<EquipSlotRComponentProps, EquipSlotRComponentState> implements RComponentUpdateInterface {
    constructor(props: EquipSlotRComponentProps) {
        super(props);

        this.state = {
            equipSlotComponent: props.equipSlotComponent,
        };

        this.state.equipSlotComponent.assignRComponent(this);
        // EventSystem.addListener({
        //     codes: [
        //         EquipSlotComponentEventCode.PlaceItemStack,
        //         EquipSlotComponentEventCode.Clear,
        //     ],
        //     listener: {
        //         callback: (target) => {
        //             console.log(4242424);
        //             this.setState((state) => {
        //                 return {
        //                     equipSlotComponent: state.target,
        //                 };
        //             });
        //         },
        //         target: this.state.equipSlotComponent,
        //     },
        // });

        this.clearHandler = this.clearHandler.bind(this);
    }

    // update(target) {
    update() {
        this.setState((state) => ({
            // equipSlotComponent: target,
            equipSlotComponent: state.equipSlotComponent,
        }));
    }

    clearHandler() {
        this.props.equipSlotComponent.clear();
        this.props.updateHandler();
    }

    render() {
        // let equipSlotComponent = this.state.equipSlotComponent;
        let equipSlotComponent = this.props.equipSlotComponent;
        return (
            <tr>
                <td>{equipSlotComponent['_id']}</td>
                <td>{equipSlotComponent.equipSlot.name}</td>
                <td>
                    <ItemStackTextRComponent
                        itemStack={equipSlotComponent.itemStack}
                    />
                </td>
                <td><button onClick={this.clearHandler}>Очистить</button></td>
            </tr>
        );
    }
}

export interface CharacterAttributeValueRComponentProps {
    characterAttributeComponent: CharacterAttributeComponent;
}

export interface CharacterAttributeValueRComponentState {

}

/**
 * Выводит только финальное значение атрибута. По текущей логике компонент должен зависить от всех слотов.
 */
export class CharacterAttributeValueRComponent extends React.Component<CharacterAttributeValueRComponentProps, CharacterAttributeValueRComponentState> {
    render() {
        let characterAttributeComponent = this.props.characterAttributeComponent;

        return (
            <span>
                {characterAttributeComponent.getFinalValue()}
            </span>
        );
    }
}