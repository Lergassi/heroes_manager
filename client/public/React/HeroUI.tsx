import React from 'react';
import HeroListComponent from '../../../core/app/Components/HeroListComponent.js';
import EquipSlotComponentControllerComponent from '../../../core/app/Components/EquipSlotComponentControllerComponent.js';
import EquipSlotComponent from '../../../core/app/Components/EquipSlotComponent.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import LevelComponent from '../../../core/app/Components/LevelComponent.js';
import {RComponentUpdateInterface} from '../../source/RComponentBridge.js';
import {
    ItemStackRComponent,
    ItemStorageCollectionRComponentProps,
    ItemStorageCollectionRComponentState
} from './ItemStorageUI.js';
import ItemStorageListComponent from '../../../core/app/Components/ItemStorageListComponent.js';
import ItemStorageSlotComponent from '../../../core/app/Components/ItemStorageSlotComponent.js';
import CharacterAttributeComponent from '../../../core/app/Components/CharacterAttributeComponent.js';
import HealthPointsComponent from '../../../core/app/Components/HealthPointsComponent.js';
import MagicPointsComponent from '../../../core/app/Components/MagicPointsComponent.js';
import AttackPowerComponent from '../../../core/app/Components/AttackPowerComponent.js';
import GameObject from '../../../core/source/GameObject.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import AppError from '../../../core/source/AppError.js';

interface HeroListRComponentProps {
    container: ContainerInterface;
    heroListComponent: HeroListComponent;
    itemStorageCollection: ItemStorageListComponent;
}

interface HeroListRComponentState {
    heroListComponent: HeroListComponent;
    itemStorageCollection: ItemStorageListComponent;
    selectedHero: GameObject;
}

export class HeroListRComponent extends React.Component<HeroListRComponentProps, HeroListRComponentState> implements RComponentUpdateInterface {
    private readonly _container: ContainerInterface;

    constructor(props: HeroListRComponentProps) {
        super(props);

        this._container = props.container;

        this.state = {
            heroListComponent: props.heroListComponent,
            itemStorageCollection: props.itemStorageCollection,
            selectedHero: null,
        };

        //todo: Шаблонный метод?
        this.state.heroListComponent.assignRComponent(this);

        this.delete = this.delete.bind(this);
        this.updateHandler = this.updateHandler.bind(this);

        window['sandbox']['heroListUpdate'] = this.refresh.bind(this); //Работает.
    }

    refresh() {
        this.setState((state) => ({
            heroListComponent: state.heroListComponent,
        }));
    }

    delete(hero: GameObject) {
        this._container.get<GameConsole>('gameConsole').run('delete_hero', [hero['_id'].toString()]);
    }

    update(target): void {
        this.setState(state => ({
            heroListComponent: target,
        }));
    }

    selectHero(hero: GameObject) {
        this.setState((state) => ({
            selectedHero: hero,
        }));
        window['sandbox']['showHero']();
    }

    updateHandler() {
        this.setState((state) => ({
            heroListComponent: state.heroListComponent,
        }));
    }

    render() {
        let heroList = this.state.heroListComponent.heroes.map((hero) => {
            return (
                <tr
                    key={hero['_id']}
                >
                    <td>{hero['_id']}</td>
                    <td>{hero.get<HeroComponent>('heroComponent').heroClass.name}</td>
                    <td>{hero.get<LevelComponent>('levelComponent').level} ({hero.get<LevelComponent>('levelComponent').exp})</td>
                    <td>{hero.get<HealthPointsComponent>('healthPointsComponent').currentHealthPoints}/{hero.get<HealthPointsComponent>('healthPointsComponent').maxHealthPoints}</td>
                    <td>{hero.get<MagicPointsComponent>('magicPointsComponent').currentMagicPoints}/{hero.get<MagicPointsComponent>('magicPointsComponent').maxMagicPoints}</td>
                    <td>{hero.get<AttackPowerComponent>('attackPowerComponent').baseMinAttackPower}-{hero.get<AttackPowerComponent>('attackPowerComponent').baseMaxAttackPower}</td>
                    {/*<td>*/}
                    {/*    {hero.get<CharacterAttributeComponent>('strength').finalValue}/{hero.get<CharacterAttributeComponent>('agility').finalValue}/{hero.get<CharacterAttributeComponent>('intelligence').finalValue}*/}
                    {/*</td>*/}
                    <td>
                        <CharacterAttributeValueRComponent
                            characterAttributeComponent={hero.get<CharacterAttributeComponent>('strength')}
                        />
                        /
                        <CharacterAttributeValueRComponent
                            characterAttributeComponent={hero.get<CharacterAttributeComponent>('agility')}
                        />
                        /
                        <CharacterAttributeValueRComponent
                            characterAttributeComponent={hero.get<CharacterAttributeComponent>('intelligence')}
                        />
                    </td>
                    <td>
                        {/*<button onClick={() => {*/}
                        {/*    window['sandbox']['setHero'](hero);*/}
                        {/*    window['sandbox']['showHero']();*/}
                        {/*}}>showHero</button>*/}
                        <button onClick={this.selectHero.bind(this, hero)}>showHero</button>
                        <button onClick={this.delete.bind(this, hero)}>Удалить</button>
                    </td>
                </tr>
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
                <HeroRComponent
                    container={this._container}
                    // updateHandler={this.updateHandler}
                    hero={this.state.selectedHero}
                />
            </div>
        );
    }
}

export interface HeroRComponentProps {
    container: ContainerInterface,
    // updateHandler: () => void,
    // hero: GameObject,
    hero?: GameObject,
}

export interface HeroRComponentState {
    hero?: GameObject,
    visible: boolean,
}

// export class HeroRComponent extends React.Component<HeroRComponentProps, HeroRComponentState> implements RComponentUpdateInterface {
// export class HeroRComponent extends React.Component<HeroRComponentProps, HeroRComponentState> implements RComponentUpdateInterface {
export class HeroRComponent extends React.Component<HeroRComponentProps, HeroRComponentState> {
    private readonly _container: ContainerInterface;

    constructor(props: HeroRComponentProps) {
        super(props);

        this._container = props.container;
        this.state = {
            hero: null,
            visible: false,
        };

        this.setHero = this.setHero.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.updateHandler = this.updateHandler.bind(this);

        window['sandbox']['setHero'] = this.setHero;
        window['sandbox']['showHero'] = this.show;
        window['sandbox']['hideHero'] = this.hide;
    }

    update(target): void {
        this.setState((state) => ({
            hero: target,
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
                            <td>Уровень</td>
                            <td>{hero.get<LevelComponent>('levelComponent').level}</td>
                        </tr>
                        <tr>
                            <td>Опыт</td>
                            <td>{hero.get<LevelComponent>('levelComponent').exp}</td>
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

        this.clearHandler = this.clearHandler.bind(this);
    }

    update(target) {
        this.setState((state) => ({
            equipSlotComponent: target,
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
                    <ItemStackRComponent
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
                {characterAttributeComponent.finalValue}
            </span>
        );
    }
}