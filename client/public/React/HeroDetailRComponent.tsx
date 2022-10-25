import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import React from 'react';
import ExperienceComponent from '../../../core/app/Components/ExperienceComponent.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import EquipSlotRComponent from './EquipSlotRComponent.js';
import {EquipSlotID} from '../../../core/types/enums/EquipSlotID.js';
import CharacterAttribute from '../../../core/app/Components/CharacterAttribute.js';
import {CharacterAttributeID} from '../../../core/types/enums/CharacterAttributeID.js';
import HealthPointsComponent from '../../../core/app/Components/HealthPointsComponent.js';
import MagicPointsComponent from '../../../core/app/Components/MagicPointsComponent.js';
import AttackController from '../../../core/app/Components/AttackController.js';

export interface HeroDetailRComponentProps {
    hero?: GameObject,
}

export interface HeroDetailRComponentState {
    hero?: GameObject,
    visible: boolean,
}

export default class HeroDetailRComponent extends React.Component<HeroDetailRComponentProps, HeroDetailRComponentState> {
    constructor(props: HeroDetailRComponentProps) {
        super(props);

        this.state = {
            hero: null,
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

        let hero = this.props.hero;
        if (!hero) {
            return;
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
                        <td>{hero.get<HeroComponent>(HeroComponent.name)['_heroClass']['_name']}</td>
                    </tr>
                    <tr>
                        <td>Сила</td>
                        <td>{hero.get<CharacterAttribute>(CharacterAttributeID.Strength).value()}</td>
                    </tr>
                    <tr>
                        <td>Ловкость</td>
                        <td>{hero.get<CharacterAttribute>(CharacterAttributeID.Agility).value()}</td>
                    </tr>
                    <tr>
                        <td>Интеллект</td>
                        <td>{hero.get<CharacterAttribute>(CharacterAttributeID.Intelligence).value()}</td>
                    </tr>
                    <tr>
                        <td>Сила атаки</td>
                        <td>{hero.get<CharacterAttribute>(CharacterAttributeID.AttackPower).value()}</td>
                    </tr>
                    <tr>
                        <td>Очки здоровья</td>
                        <td>{hero.get<HealthPointsComponent>(HealthPointsComponent.name)['_currentHealthPoints']}/{hero.get<HealthPointsComponent>(HealthPointsComponent.name)['_maxHealthPoints']['value']()}</td>
                    </tr>
                    <tr>
                        <td>Очки магии</td>
                        <td>{hero.get<MagicPointsComponent>(MagicPointsComponent.name)['_currentMagicPoints']}/{hero.get<MagicPointsComponent>(MagicPointsComponent.name)['_maxMagicPoints']['value']()}</td>
                    </tr>
                    </tbody>
                </table>
                <div>Экипировка</div>
                <table className={'basic-table'}>
                    <tbody>
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.RightHand)}
                        name={'Правая рука'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.LeftHand)}
                        name={'Левая рука'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Head)}
                        name={'Голова'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Neck)}
                        name={'Шея'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Shoulders)}
                        name={'Плечи'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Chest)}
                        name={'Грудь'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Wrist)}
                        name={'Запя'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Hands)}
                        name={'Руки'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Waist)}
                        name={'Талия'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Legs)}
                        name={'Ноги'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Foots)}
                        name={'Ступни'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Finger_1)}
                        name={'Палец 1'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Finger_2)}
                        name={'Палец 2'}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Trinket)}
                        name={'Тринкет'}
                        updateHandler={this.updateHandler}
                    />
                    </tbody>
                </table>
            </div>
        );
    }
}