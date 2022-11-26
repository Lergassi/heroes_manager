import React from 'react';
import {IconID} from '../../../core/types/enums/IconID.js';
import MainHeroListElementRC from './MainHeroListElementRC.js';
import {HeroClassID} from '../../../core/types/enums/HeroClassID.js';
import MainHeroListComponent from '../../../core/app/Components/MainHeroListComponent.js';
import _ from 'lodash';
import {EquipSlotID} from '../../../core/types/enums/EquipSlotID.js';
import ItemSlotRC from './ItemSlotRC.js';

export class MainHeroListElement {
    heroClassIconID: IconID;
    heroClassName: HeroClassID;
    exp: number;
    totalExpToLevelUp: number;
    level: number;
    strength: number;
    agility: number;
    intelligence: number;
    currentHealthPoints: number;
    maxHealthPoints: number;
    attackPower: number;
    equip: [];
}

export interface HeroListUIProps {
    mainHeroList: MainHeroListComponent;
}

export interface HeroListUIState {
    heroes: MainHeroListElement[];
}

export default class MainHeroListRC extends React.Component<HeroListUIProps, HeroListUIState> {
    constructor(props: HeroListUIProps) {
        super(props);

        this.state = {
            heroes: [],
        };
    }

    componentDidMount() {
        // this.addHero({
        //     heroClassName: HeroClassID.Warrior,
        //     heroClassIconID: IconID.Shield01,
        //     exp: 0,
        //     totalExpToLevelUp: 1000,
        //     level: 1,
        //     strength: 10,
        //     agility: 20,
        //     intelligence: 30,
        //     attackPower: 42,
        //     currentHealthPoints: 80,
        //     maxHealthPoints: 100,
        //     equip: [],
        // });
        // this.addHero({
        //     heroClassName: HeroClassID.Warrior,
        //     heroClassIconID: IconID.Shield01,
        //     exp: 0,
        //     totalExpToLevelUp: 1000,
        //     level: 1,
        //     strength: 10,
        //     agility: 20,
        //     intelligence: 30,
        //     attackPower: 42,
        //     currentHealthPoints: 80,
        //     maxHealthPoints: 100,
        //     equip: [],
        // });
        // this.addHero({
        //     heroClassName: HeroClassID.Warrior,
        //     heroClassIconID: IconID.Shield01,
        //     exp: 0,
        //     totalExpToLevelUp: 1000,
        //     level: 1,
        //     strength: 10,
        //     agility: 20,
        //     intelligence: 30,
        //     attackPower: 42,
        //     currentHealthPoints: 80,
        //     maxHealthPoints: 100,
        //     equip: [],
        // });

        this.props.mainHeroList.attach({
            addHero: (heroListElement) => {
                this.addHero(heroListElement);
            },
            deleteHero: (index) => {
                this.removeHero(index);
            },
            //todo: Тут можно передавать просто строку, которую можно менять внутри героев.
            // readHeroClass: (index, value) => {
            //     this.updateHeroClass(index, value);
            // },
            updateExp: (index, value) => {
                this.updateExp(index, value);
            },
            updateTotalExpToLevelUp: (index, value) => {
                this.updateTotalExpToLevelUp(index, value);
            },
            updateLevel: (index, value) => {
                this.updateLevel(index, value);
            },
        });
    }

    // // update(index: number, property: keyof MainHeroListElement, value: any) {
    // update(index: number, values: Partial<MainHeroListElement>) {
    // // update(index: number, values: {[key in MainHeroListElement]: any}) {
    // // update(index: number, property: string, value) {
    //     let heroes = [...this.state.heroes];
    //     let hero = heroes[index];
    //     assertNotNil(hero);
    //
    //     // hero[property] = value;
    //     for (const valuesKey in values) {
    //         hero[valuesKey] = values[valuesKey];
    //     }
    //
    //     this.setState((state) => {
    //         return {
    //             heroes: heroes,
    //         };
    //     });
    // }

    addHero(hero: MainHeroListElement) {
        this.setState((state) => {
            let heroes = [...state.heroes];
            heroes.push(hero);

            return {
                heroes: heroes,
            };
        });
    }

    removeHero(index: number) {
        this.setState((state) => {
            let heroes = [...state.heroes];
            _.pullAt(heroes, index);

            return {
                heroes: heroes,
            };
        });
    }

    // updateHero(index: number, property: string, value: any) {
    //
    // }

    _updateState(index, callback: (hero: MainHeroListElement) => void) {
        this.setState((state) => {
            let heroes = [...state.heroes];
            let hero = heroes[index];

            callback(hero);

            return {
                heroes: heroes,
            };
        });
    }

    // updateHeroClass(index: number, value: string) {
    //     this._updateState(index, (hero) => {
    //         hero.heroClassName = value as HeroClassID;
    //     });
    // }

    updateExp(index: number, value: number) {
        this._updateState(index, (hero) => {
            hero.exp = value;
        });
    }

    updateTotalExpToLevelUp(index: number, value: number) {
        this._updateState(index, (hero) => {
            hero.totalExpToLevelUp = value;
        });
    }

    updateLevel(index: number, value: number) {
        this._updateState(index, (hero) => {
            hero.level = value;
        });
    }

    updateHealthPoints(index: number, value: number) {
        this._updateState(index, (hero) => {
            hero.currentHealthPoints = value;
        });
    }

    updateMaxHealthPoints(index: number, value: number) {
        this._updateState(index, (hero) => {
            hero.maxHealthPoints = value;
        });
    }

    updateAttackPower(index: number, value: number) {
        this._updateState(index, (hero) => {
            hero.attackPower = value;
        });
    }

    updateStrength(index: number, value: number) {
        this._updateState(index, (hero) => {
            hero.strength = value;
        });
    }

    updateAgility(index: number, value: number) {
        this._updateState(index, (hero) => {
            hero.agility = value;
        });
    }

    updateIntelligence(index: number, value: number) {
        this._updateState(index, (hero) => {
            hero.intelligence = value;
        });
    }

    // updateEquipSlot(index: number, ID: EquipSlotID, iconID: IconID) {
    //
    // }

    render() {
        let heroes = this.state.heroes;
        // console.log(heroes);

        let equipSlots = [
            {equipSlotID: EquipSlotID.Head, iconID: IconID.Helmet01},
            {equipSlotID: EquipSlotID.Shoulders, iconID: IconID.ShoulderPads01},
            {equipSlotID: EquipSlotID.Chest, iconID: IconID.Breastplate01},
            {equipSlotID: EquipSlotID.Wrist, iconID: IconID.Bracelet01},
            {equipSlotID: EquipSlotID.Hands, iconID: IconID.Gloves02},
            {equipSlotID: EquipSlotID.Waist, iconID: IconID.Belt01},
            {equipSlotID: EquipSlotID.Legs, iconID: IconID.Pants01},
            {equipSlotID: EquipSlotID.Foots, iconID: IconID.Boot01},
            {equipSlotID: EquipSlotID.Neck, iconID: IconID.Amulet01},
            {equipSlotID: EquipSlotID.Finger_1, iconID: IconID.Ring01},
            {equipSlotID: EquipSlotID.Finger_2, iconID: IconID.Ring01},
            {equipSlotID: EquipSlotID.Trinket, iconID: IconID.Trinket01},
            {equipSlotID: EquipSlotID.RightHand, iconID: IconID.Sword01},
            {equipSlotID: EquipSlotID.LeftHand, iconID: IconID.Sword01},
        ];

        let equipHeadElements = [];
        for (let i = 0; i < equipSlots.length; i++) {
            equipHeadElements.push(<ItemSlotRC
                key={i}
                blockSize={34}
                // blockSize={50}
                backgroundIconID={equipSlots[i].iconID}
            />);
        }

        let equip = [
            {equipSlotID: EquipSlotID.Head, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Shoulders, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Chest, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Wrist, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Hands, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Waist, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Legs, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Foots, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Neck, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Finger_1, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Finger_2, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.Trinket, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.RightHand, iconID: IconID.Question01},
            {equipSlotID: EquipSlotID.LeftHand, iconID: IconID.Question01},
        ];

        let equipElements = [];
        for (let i = 0; i < equip.length; i++) {
            equipElements.push(<ItemSlotRC
                key={i}
                blockSize={34}
            />);
        }

        let elements = [];
        for (let i = 0; i < heroes.length; i++) {
            elements.push(
                <MainHeroListElementRC
                    key={i}
                    heroClassIcon={heroes[i].heroClassIconID}
                    heroClass={heroes[i].heroClassName}
                    level={heroes[i].level}
                    exp={heroes[i].exp}
                    totalExpToLevelUp={heroes[i].totalExpToLevelUp}
                    attackPower={heroes[i].attackPower}
                    currentHealthPoints={heroes[i].currentHealthPoints}
                    maxHealthPoints={heroes[i].maxHealthPoints}
                    // state={}
                    strength={heroes[i].strength}
                    agility={heroes[i].agility}
                    intelligence={heroes[i].intelligence}
                    equip={equip}
                />
            );
        }

        return (
            <div className={'hero-list-wrapper'}>
                <table className={'hero-list-table'}>
                    <tbody>
                    <tr className={'hero-list-table-row'}>
                        {/*<th></th>*/}
                        <th>Класс</th>
                        <th>Роль</th>
                        <th style={{width: '220px'}}>Уровень (опыт)</th>
                        <th>Очки здоровья</th>
                        <th>Статус</th>
                        <th>Сила атаки</th>
                        <th>СИЛ/ЛОВ/ИНТ</th>
                        {/*<th>Статус</th>*/}
                        <th>{equipHeadElements}</th>
                        <th>Управление</th>
                    </tr>
                    {elements}
                    </tbody>
                </table>
            </div>
        );
    }//end render
}