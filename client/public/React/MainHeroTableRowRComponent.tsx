import React from 'react';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import ExperienceComponent, {ExperienceComponentEventCode} from '../../../core/app/Components/ExperienceComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import HealthPointsComponent from '../../../core/app/Components/HealthPointsComponent.js';
import MagicPointsComponent from '../../../core/app/Components/MagicPointsComponent.js';
import AttackPowerComponent from '../../../core/app/Components/AttackPowerComponent.js';
import CharacterAttributeComponent from '../../../core/app/Components/CharacterAttributeComponent.js';
import CharacterAttributeValueRComponent from './CharacterAttributeValueRComponent.js';
import ExperienceTextRenderRComponent from './ExperienceTextRenderRComponent.js';
import {CharacterAttributeID} from '../../../core/app/types.js';
import {EquipSlotComponentEventCode} from '../../../core/app/Components/EquipSlotComponent.js';

export type HeroTableRowRComponentProps = {
    container: ContainerInterface;
    hero: GameObject;
    selectHero: Function;
    deleteHero: Function;
}
export type HeroTableRowRComponentState = {
    hero: GameObject;
}

export default class MainHeroTableRowRComponent extends React.Component<HeroTableRowRComponentProps, HeroTableRowRComponentState> {
    constructor(props: HeroTableRowRComponentProps) {
        super(props);

        this.state = {
            hero: props.hero,
        };

        let callback = (target) => {
            this.setState((state) => {
                return {
                    hero: state.hero,
                };
            });
        };

        //todo: И так на каждый компонент?
        EventSystem.addListener({
            codes: [
                ExperienceComponentEventCode.AddExp,
                ExperienceComponentEventCode.AddLevel,
                EquipSlotComponentEventCode.Clear,
            ],
            listener: {
                callback: callback,
                // target: ,
            },
        });
    }

    render() {
        let hero = this.state.hero;

        return (
            <tr
                key={hero['_id']}
            >
                <td>{hero['_id']}</td>
                <td>{hero.get<HeroComponent>('heroComponent').heroClass.name}</td>
                <td><ExperienceTextRenderRComponent
                    experienceComponent={hero.get<ExperienceComponent>(ExperienceComponent.name)}
                /></td>
                <td>{hero.get<HealthPointsComponent>('healthPointsComponent').currentHealthPoints}/{hero.get<HealthPointsComponent>('healthPointsComponent').maxHealthPoints}</td>
                <td>{hero.get<MagicPointsComponent>('magicPointsComponent').currentMagicPoints}/{hero.get<MagicPointsComponent>('magicPointsComponent').maxMagicPoints}</td>
                <td>{hero.get<AttackPowerComponent>('attackPowerComponent')['_baseMinAttackPower']}-{hero.get<AttackPowerComponent>('attackPowerComponent')['_baseMaxAttackPower']}</td>
                <td>
                    <CharacterAttributeValueRComponent
                        characterAttributeComponent={hero.get<CharacterAttributeComponent>(CharacterAttributeID.Strength)}
                    />
                    /
                    <CharacterAttributeValueRComponent
                        characterAttributeComponent={hero.get<CharacterAttributeComponent>(CharacterAttributeID.Agility)}
                    />
                    /
                    <CharacterAttributeValueRComponent
                        characterAttributeComponent={hero.get<CharacterAttributeComponent>(CharacterAttributeID.Intelligence)}
                    />
                </td>
                <td>
                    {hero.get<HeroComponent>('heroComponent').state}
                </td>
                <td>
                    <button onClick={this.props.selectHero.bind(this, hero)}>showHero</button>
                    <button onClick={this.props.deleteHero.bind(this, hero)}>Удалить</button>
                    {/*<button onClick={this.props.selectHero(hero)}>showHero</button>*/}
                    {/*<button onClick={this.props.deleteHero(hero)}>Удалить</button>*/}
                </td>
            </tr>
        );
    }
}