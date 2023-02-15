import React from 'react';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import Experience, {ExperienceComponentEventCode} from '../../../core/app/Components/Experience.js';
import EventSystem from '../../../core/source/EventSystem.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import HealthPoints, {
    HealthPointsComponentEventCode
} from '../../../core/app/Components/HealthPoints.js';
import MagicPointsComponent from '../../../core/app/Components/MagicPointsComponent.js';
import ExperienceTextRenderRComponent from './ExperienceTextRenderRComponent.js';
import {EquipSlotComponentEventCode} from '../../../core/app/Components/EquipSlotComponent.js';
import CharacterAttributeCollector from '../../../core/app/Components/CharacterAttributeCollector.js';
import AttackController from '../../../core/app/Components/AttackController.js';
import {CharacterAttributeID} from '../../../core/types/enums/CharacterAttributeID.js';
import TotalCharacterAttributeValueCollectorComponent
    from '../../../core/app/Components/TotalCharacterAttributeValueCollectorComponent.js';
import AttackPower from '../../../core/app/Components/CharacterAttributes/AttackPowerDependentIncreaseDecorator.js';
import CharacterAttribute from '../../../core/app/Components/CharacterAttribute.js';
import {CharacterAttributes} from '../../../core/types/main.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import TakeComponent from '../../../core/app/Components/TakeComponent.js';

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

        EventSystem.addListener({
            codes: [
                ExperienceComponentEventCode.AddExp,
                ExperienceComponentEventCode.AddLevel,
                EquipSlotComponentEventCode.CreateItemStack,
                EquipSlotComponentEventCode.DestroyItemStack,
                HealthPointsComponentEventCode.Damage,
                HealthPointsComponentEventCode.Died,
                HealthPointsComponentEventCode.Resurrect,
            ],
            listener: {
                callback: (target) => {
                    this.setState((state) => {
                        return {
                            hero: state.hero,
                        };
                    });
                },
            },
        });
    }

    render() {
        let hero = this.state.hero;

        return (
            <tr key={hero.ID}>
                <td>{hero.ID}</td>
                <td>{hero.get<HeroComponent>(ComponentID.Hero)['_heroClass']['_name']}</td>
                <td>
                    <ExperienceTextRenderRComponent
                        experienceComponent={hero.get<Experience>(ComponentID.Experience)}
                    />
                </td>
                <td>{hero.get<HealthPoints>(ComponentID.HealthPoints)['_currentHealthPoints']}/{hero.get<HealthPoints>(ComponentID.HealthPoints)['_maxHealthPoints']['finalValue']}</td>
                <td>{hero.get<HealthPoints>(ComponentID.HealthPoints)['_isDead'] ? 'Мертвый' : 'Живой'}</td>
                {/*<td>{hero.get<MagicPointsComponent>(MagicPointsComponent.name)['_currentMagicPoints']}/{hero.get<MagicPointsComponent>(MagicPointsComponent.name)['_maxMagicPoints']['value']()}</td>*/}
                <td>{hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).AttackPower.finalValue}</td>
                <td>
                    {hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).Strength.finalValue}/
                    {hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).Agility.finalValue}/
                    {hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).Intelligence.finalValue}
                </td>
                <td>
                    {hero.get<TakeComponent>(TakeComponent.name)['_state']}
                </td>
                <td>
                    <button onClick={this.props.selectHero.bind(this, hero)}>showHero</button>
                    <button onClick={this.props.deleteHero.bind(this, hero)}>Удалить</button>
                </td>
            </tr>
        );
    }
}