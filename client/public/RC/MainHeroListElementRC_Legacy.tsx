import React from 'react';
import ProgressBarRC from './ProgressBarRC.js';
import GameObject from '../../../core/source/GameObject.js';
import {CharacterAttributeID} from '../../../core/types/enums/CharacterAttributeID.js';

export interface MainHeroListElementRCProps {
    hero?: GameObject;
}

// export interface MainHeroListElementRCProps {
//     // heroClassIcon: string;
//     heroClass: string;
//     level: number;
//     exp: number;
//     totalExpToLevelUp: number;
//     attackPower: number;
//     currentHealthPoints: number;
//     maxHealthPoints: number;
//     // state: string;
//     strength: number;
//     agility: number;
//     intelligence: number;
//     itemLevel: number;
//     // equip: {equipSlotID: EquipSlotID, iconID: IconID}[];
// }

export interface MainHeroListElementRCState {
    hero: GameObject;

    heroClassName: string;

    currentHealthPoints: number;
    maxHealthPoints: number;
    isDead: boolean;

    level: number;
    exp: number;
    totalExpToLevelUp: number;

    itemLevel: number;

    [CharacterAttributeID.Strength]: number;
    [CharacterAttributeID.Agility]: number;
    [CharacterAttributeID.Intelligence]: number;
    [CharacterAttributeID.AttackPower]: number;
}

export default class MainHeroListElementRC_Legacy extends React.Component<MainHeroListElementRCProps, MainHeroListElementRCState> {
    constructor(props: MainHeroListElementRCProps) {
        super(props);
        // console.log('props.hero', props.hero);

        this.state = {
            // hero: props.hero,
            hero: undefined,

            heroClassName: '',

            currentHealthPoints: 0,
            maxHealthPoints: 0,
            isDead: false,

            level: 0,
            exp: 0,
            totalExpToLevelUp: 0,

            itemLevel: 0,

            [CharacterAttributeID.Strength]: 0,
            [CharacterAttributeID.Agility]: 0,
            [CharacterAttributeID.Intelligence]: 0,
            [CharacterAttributeID.AttackPower]: 0,
        };

        // this.updateHero = this.updateHero.bind(this);
        // this.updateHeroClassName = this.updateHeroClassName.bind(this);
        // this.updateExperience = this.updateExperience.bind(this);
        // this.updateCharacterAttribute = this.updateCharacterAttribute.bind(this);
        // this.updateItemLevel = this.updateItemLevel.bind(this);
    }

    // componentDidMount() {
    //     this.updateHero(this.props.hero);
    // }
    //
    // componentWillUnmount() {
    //
    // }
    //
    // updateHero(hero: GameObject = undefined) {
    //     console.log('updateHero hero', hero);
    //     if (!hero) return;
    //     if (this.state.hero && this.state.hero === hero) return;
    //
    //     // if (this.state.hero) {
    //     //     this.removeHero();
    //     // }
    //     this.removeHero();
    //
    //     this.setState((state) => {
    //         return {
    //             hero: hero,
    //         };
    //     });
    // }
    //
    // removeHero(): void {
    //     if (!this.state.hero) return;
    //
    //     this.state.hero.get<HeroComponent>(ComponentID.Hero).removeRender(this.updateHeroClassName);
    //     this.state.hero.get<Experience>(ComponentID.Experience).removeRender(this.updateExperience);
    //     this.state.hero.get<CharacterAttributeInterface>(CharacterAttributeID.Strength).removeRender(this.updateCharacterAttribute);
    //     this.state.hero.get<CharacterAttributeInterface>(CharacterAttributeID.Agility).removeRender(this.updateCharacterAttribute);
    //     this.state.hero.get<CharacterAttributeInterface>(CharacterAttributeID.Intelligence).removeRender(this.updateCharacterAttribute);
    //     this.state.hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower).removeRender(this.updateCharacterAttribute);
    //     this.state.hero.get<AverageItemLevel>(ComponentID.AverageItemLevel).removeRender(this.updateItemLevel);
    //
    //     this.setState((state) => {
    //         return {
    //             hero: undefined,
    //         };
    //     });
    // }
    //
    // updateHeroClassName(heroClassName: string): void {
    //     this.setState((state) => {
    //         return {
    //             heroClassName: heroClassName,
    //         };
    //     });
    // }
    //
    // updateExperience(level: number, exp: number, totalExpToLevelUp: number): void {
    //     // console.log('MainHeroListElementRC.updateExperience');
    //     this.setState((state) => {
    //         return {
    //             level: level,
    //             exp: exp,
    //             totalExpToLevelUp: totalExpToLevelUp,
    //         };
    //     });
    // }
    //
    // updateCharacterAttribute(ID: CharacterAttributeID, value: number): void {
    //     this.setState((state) => {
    //         let newState = {} as MainHeroListElementRCState;
    //         newState[ID] = value;
    //
    //         return newState;
    //     });
    // }
    //
    // updateItemLevel(value: number): void {
    //     this.setState((state) => {
    //         return {
    //             itemLevel: value,
    //         };
    //     });
    // }

    render() {
        if (!this.state.hero) return;
        // if (!this.props.hero) return;
        // console.log('this.props.hero', this.props.hero);

        return (
            // <tr>
            //     {/*<td>1</td>*/}
            //     <td>{this.state.hero.ID}</td>
            //     <td>{this.state.level}</td>
            //     <td>{this.state.exp}</td>
            //     <td>{this.state.totalExpToLevelUp}</td>
            // </tr>
            <tr className={'hero-list-table-row'}>
                <td>
                    {/*<span className={'hero-list-table-row__icon-wrapper'}>*/}
                    {/*    <span className={'icon icon_34 icon_' + this.props.hero.heroClassIcon}></span>*/}
                    {/*</span>*/}
                    <span
                        className={'hero-list-table-row__name'}>{this.state.heroClassName} ({this.state.hero.ID})</span>
                </td>
                <td>Танк</td>
                <td>
                    <div className={'hero-list-table-row__level'}>{this.state.level} ур.</div>
                    <div className={'hero-list__progress-bar-wrapper'}>
                        <ProgressBarRC
                            maxValue={this.state.totalExpToLevelUp}
                            currentValue={this.state.exp}
                        />
                    </div>
                </td>
                <td>{this.state.itemLevel}</td>
                <td>{this.state.currentHealthPoints}/{this.state.maxHealthPoints}</td>
                <td><s>Живой</s></td>
                <td>{this.state.AttackPower}</td>
                <td>{this.state.Strength}/{this.state.Agility}/{this.state.Intelligence}</td>
                {/*<td>Свободен</td>*/}
                {/*<td>*/}
                {/*    {_.map(this.state.equip, (equip, index) => {*/}
                {/*        return <ItemSlotRC*/}
                {/*            key={index}*/}
                {/*            blockSize={34}*/}
                {/*            // backgroundIconID={equip.iconID}*/}
                {/*        />*/}
                {/*    })}*/}
                {/*</td>*/}
                <td><s>удалить, детали</s></td>
            </tr>
        );
    }
}