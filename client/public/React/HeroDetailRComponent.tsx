import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import React from 'react';
import ExperienceComponent from '../../../core/app/Components/ExperienceComponent.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import EquipSlotRComponent from './EquipSlotRComponent.js';
import {EquipSlotID} from '../../../core/app/types.js';

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
            // return (<div>Герой не выбран.</div>);
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
                        <td>{hero.get<HeroComponent>('heroComponent').heroClass.name}</td>
                    </tr>
                    </tbody>
                </table>
                <div>Экипировка</div>
                <table className={'basic-table'}>
                    <tbody>
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.RightHand)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.LeftHand)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Head)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Neck)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Shoulders)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Chest)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Wrist)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Hands)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Waist)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Legs)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Foots)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Finger_1)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Finger_2)}
                        updateHandler={this.updateHandler}
                    />
                    <EquipSlotRComponent
                        equipSlotComponent={hero.get(EquipSlotID.Trinket)}
                        updateHandler={this.updateHandler}
                    />
                    </tbody>
                </table>
            </div>
        );
    }
}