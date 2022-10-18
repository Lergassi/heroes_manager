import React from 'react';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import ExperienceComponent, {ExperienceComponentEventCode} from '../../../core/app/Components/ExperienceComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import HealthPointsComponent from '../../../core/app/Components/HealthPointsComponent.js';
import MagicPointsComponent from '../../../core/app/Components/MagicPointsComponent.js';
import ExperienceTextRenderRComponent from './ExperienceTextRenderRComponent.js';
import {EquipSlotComponentEventCode} from '../../../core/app/Components/EquipSlotComponent.js';
import CharacterAttributeCollector from '../../../core/app/Components/CharacterAttributeCollector.js';
import AttackPowerComponent from '../../../core/app/Components/AttackPowerComponent.js';
import {CharacterAttributeID} from '../../../core/types/enums/CharacterAttributeID.js';
import TotalCharacterAttributeValueCollectorComponent
    from '../../../core/app/Components/TotalCharacterAttributeValueCollectorComponent.js';
import AttackPower from '../../../core/app/Components/CharacterAttributes/AttackPowerDependentIncreaserDecorator.js';
import Strength from '../../../core/app/Components/CharacterAttributes/Strength.js';
import CharacterAttribute from '../../../core/app/Components/CharacterAttribute.js';
import {CharacterAttributes} from '../../../core/app/types.js';
import {GameObjectKey} from '../../../core/types/enums/GameObjectKey.js';

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
                <td>{hero.get<HeroComponent>(HeroComponent.name).heroClass.name}</td>
                <td><ExperienceTextRenderRComponent
                    experienceComponent={hero.get<ExperienceComponent>(ExperienceComponent.name)}
                /></td>
                <td>{hero.get<HealthPointsComponent>(HealthPointsComponent.name)['_currentHealthPoints']}/{hero.get<HealthPointsComponent>(HealthPointsComponent.name)['_maxHealthPoints']['value']()}</td>
                <td>{hero.get<MagicPointsComponent>(MagicPointsComponent.name)['_currentMagicPoints']}/{hero.get<MagicPointsComponent>(MagicPointsComponent.name)['_maxMagicPoints']['value']()}</td>
                {/* todo: Сделать отдельный компонент для вывода значений, который получаются одним методом. */}
                <td>{hero.get<AttackPowerComponent>(AttackPowerComponent.name).value().left}-{hero.get<AttackPowerComponent>(AttackPowerComponent.name).value().right}</td>
                {/*<td>{hero.get<AttackPower>(CharacterAttributeID.AttackPower).value()[0]}-{hero.get<AttackPower>(CharacterAttributeID.AttackPower).value()[1]}</td>*/}
                {/*<td>{hero.get<CharacterAttributeCollectorComponent>(CharacterAttributeCollectorComponent.name).totalValue(CharacterAttributeID.AttackPower)}</td>*/}
                <td>
                    {/*<CharacterAttributeValueRComponent*/}
                    {/*    characterAttributeComponent={hero.get<CharacterAttributeComponent>(CharacterAttributeID.Strength)}*/}
                    {/*/>*/}
                    {/*/*/}
                    {/*<CharacterAttributeValueRComponent*/}
                    {/*    characterAttributeComponent={hero.get<CharacterAttributeComponent>(CharacterAttributeID.Agility)}*/}
                    {/*/>*/}
                    {/*/*/}
                    {/*<CharacterAttributeValueRComponent*/}
                    {/*    characterAttributeComponent={hero.get<CharacterAttributeComponent>(CharacterAttributeID.Intelligence)}*/}
                    {/*/>*/}
                    {/*{hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.Strength)}/*/}
                    {/*{hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.Agility)}/*/}
                    {/*{hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.Intelligence)}*/}
                    {/*{hero.get<CharacterAttributeComponent>(CharacterAttributeID.Strength).value()}/*/}
                    {hero.get<CharacterAttributes>(GameObjectKey.CharacterAttributes)[CharacterAttributeID.Strength].value()}/
                    {hero.get<CharacterAttributes>(GameObjectKey.CharacterAttributes)[CharacterAttributeID.Agility].value()}/
                    {hero.get<CharacterAttributes>(GameObjectKey.CharacterAttributes)[CharacterAttributeID.Intelligence].value()}
                </td>
                <td>
                    {hero.get<HeroComponent>(HeroComponent.name).state}
                </td>
                <td>
                    <button onClick={this.props.selectHero.bind(this, hero)}>showHero</button>
                    <button onClick={this.props.deleteHero.bind(this, hero)}>Удалить</button>
                </td>
            </tr>
        );
    }
}