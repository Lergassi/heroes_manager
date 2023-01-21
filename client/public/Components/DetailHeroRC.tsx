import React from 'react';
import HealthPoints from '../../../core/app/Components/HealthPoints.js';
import Location from '../../../core/app/Components/Location.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import {EquipSlotID} from '../../../core/types/enums/EquipSlotID.js';
import Item from '../../../core/app/Entities/Item.js';
import {CharacterAttributeID} from '../../../core/types/enums/CharacterAttributeID.js';
import Experience from '../../../core/app/Components/Experience.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import CharacterAttribute from '../../../core/app/Components/CharacterAttribute.js';
import EquipSlotInterface from '../../../core/app/Interfaces/EquipSlotInterface.js';
import CharacterAttributeInterface from '../../../core/app/Decorators/CharacterAttributeInterface.js';
import _ from 'lodash';
import CharacterStateController from '../../../core/app/Components/CharacterStateController.js';
import {UI_ItemCount} from '../../../core/types/main.js';

export interface DetailHeroRCProps {
    container: ContainerInterface;
}

export interface DetailHeroRCState {
    hero: GameObject;

    window: {
        show: boolean,
    };

    heroClassName: string;

    currentHealthPoints: number;
    maxHealthPoints: number;
    isDead: boolean;

    level: number;
    exp: number;
    totalExpToLevelUp: number;

    currentMagicPoints: number;
    maxMagicPoints: number;

    [CharacterAttributeID.Strength]: number;
    [CharacterAttributeID.Agility]: number;
    [CharacterAttributeID.Intelligence]: number;
    [CharacterAttributeID.AttackPower]: number;
    [CharacterAttributeID.Protection]: number;

    [EquipSlotID.Head]: string;
    [EquipSlotID.Shoulders]: string;
    [EquipSlotID.Chest]: string;
    [EquipSlotID.Wrist]: string;
    [EquipSlotID.Hands]: string;
    [EquipSlotID.Waist]: string;
    [EquipSlotID.Legs]: string;
    [EquipSlotID.Foots]: string;
    [EquipSlotID.Neck]: string;
    [EquipSlotID.Finger01]: string;
    [EquipSlotID.Finger02]: string;
    [EquipSlotID.Trinket]: string;
    [EquipSlotID.RightHand]: string;
    [EquipSlotID.LeftHand]: string;
}

/**
 * todo:
 * - Класс.
 * - Уровень и опыт.
 * - Атрибуты.
 * - Средний илвл.
 * - Экипировка.
 * - Здоровье.
 * - Мана.
 * - Атака.
 */
export default class DetailHeroRC extends React.Component<DetailHeroRCProps, DetailHeroRCState> /*todo: Реализовать все интерфейсы или разделить на отдельные классы. */ {
    private readonly _characterAttributeIDs = [
        CharacterAttributeID.Strength,
        CharacterAttributeID.Agility,
        CharacterAttributeID.Intelligence,
        CharacterAttributeID.AttackPower,
        CharacterAttributeID.Protection,
    ];

    private readonly _equipSlotIDs = [
        EquipSlotID.Head,
        EquipSlotID.Shoulders,
        EquipSlotID.Chest,
        EquipSlotID.Wrist,
        EquipSlotID.Hands,
        EquipSlotID.Waist,
        EquipSlotID.Legs,
        EquipSlotID.Foots,
        EquipSlotID.Neck,
        EquipSlotID.Finger01,
        EquipSlotID.Finger02,
        EquipSlotID.Trinket,
        EquipSlotID.RightHand,
        EquipSlotID.LeftHand,
    ];

    constructor(props: DetailHeroRCProps) {
        super(props);

        this.state = {
            hero: undefined,

            window: {
                show: false,
            },

            heroClassName: '',

            currentHealthPoints: 0,
            maxHealthPoints: 0,
            isDead: false,

            level: 0,
            exp: 0,
            totalExpToLevelUp: 0,

            currentMagicPoints: 0,
            maxMagicPoints: 0,

            [CharacterAttributeID.Strength]: 0,
            [CharacterAttributeID.Agility]: 0,
            [CharacterAttributeID.Intelligence]: 0,
            [CharacterAttributeID.AttackPower]: 0,
            [CharacterAttributeID.Protection]: 0,

            [EquipSlotID.Head]: undefined,
            [EquipSlotID.Shoulders]: undefined,
            [EquipSlotID.Chest]: undefined,
            [EquipSlotID.Wrist]: undefined,
            [EquipSlotID.Hands]: undefined,
            [EquipSlotID.Waist]: undefined,
            [EquipSlotID.Legs]: undefined,
            [EquipSlotID.Foots]: undefined,
            [EquipSlotID.Neck]: undefined,
            [EquipSlotID.Finger01]: undefined,
            [EquipSlotID.Finger02]: undefined,
            [EquipSlotID.Trinket]: undefined,
            [EquipSlotID.RightHand]: undefined,
            [EquipSlotID.LeftHand]: undefined,
        };

        // this.updateHeroClassName = this.updateHeroClassName.bind(this);
        // this.updateExperience = this.updateExperience.bind(this);
        // this.updateHealthPoints = this.updateHealthPoints.bind(this);
        // this.updateCharacterAttributeFinalValue = this.updateCharacterAttributeFinalValue.bind(this);
        // this.updateEquipSlot = this.updateEquipSlot.bind(this);

        this.props.container.set<DetailHeroRC>(ServiceID.UI_DetailHero, this);

        // window['app']['sandbox'][ServiceID.UI_DetailHero] = {};
        // window['app']['sandbox'][ServiceID.UI_DetailHero]['updateHero'] = (hero: GameObject) => {
        //     this.updateHero(hero);
        //     this.show();
        // };
    }

    updateByRequest(): void {
        if (!this.state.window.show) return;
        if (!this.state.hero) return;

        this.state.hero.get<HeroComponent>(ComponentID.Hero).renderByRequest(this);
        this.state.hero.get<Experience>(ComponentID.Experience).renderByRequest(this);
        this.state.hero.get<HealthPoints>(ComponentID.HealthPoints).renderByRequest(this);
        _.map(this._characterAttributeIDs, (ID) => {
            this.state.hero.get<CharacterAttributeInterface>(ID).renderByRequest(this);
        });
        _.map(this._equipSlotIDs, (ID) => {
            this.state.hero.get<EquipSlotInterface>(ID).renderByRequest(this);
        });
    }

    show(): void {
        this.setState((state) => {
            return {
                window: {
                    show: true,
                },
            } as DetailHeroRCState;
        });
    }

    hide() {
        this.setState((state) => {
            return {
                window: {
                    show: false,
                },
            } as DetailHeroRCState;
        });
    }

    toggleWindow(): void {
        this.setState((state) => {
            return {
                window: {
                    show: !state.window.show,
                },
            } as DetailHeroRCState;
        });
    }

    updateHero(hero: GameObject): void {
        if (this.state.hero && this.state.hero === hero) return;
        if (this.state.hero) {
            // this.removeHero();
        }

        this.setState((state) => {
            return {
                hero: hero,
            } as DetailHeroRCState;
        });

        // hero.get<HeroComponent>(ComponentID.Hero).render(this.updateHeroClassName);
        // // hero.get<HeroComponent>(ComponentID.Hero).renderByRequest(this);
        // hero.get<Experience>(ComponentID.Experience).render(this.updateExperience);
        // // hero.get<Experience>(ComponentID.Experience).renderByObject(this);
        // // hero.get<Experience>(ComponentID.Experience).renderByRequest(this);
        // _.map(this._characterAttributeIDs, (ID) => {
        //     hero.get<CharacterAttributeInterface>(ID).render(this.updateCharacterAttributeFinalValue);
        // });
        // _.map(this._equipSlotIDs, (ID) => {
        //     hero.get<EquipSlotInterface>(ID).render(this.updateEquipSlot);
        // });

        //todo: Событие на удаление героя или блокировка героя когда окно открыто.

        // this.show();
    }

    removeHero(): void {
        if (!this.state.hero) return;

        // this.state.hero.get<HeroComponent>(ComponentID.Hero).removeRender(this.updateHeroClassName);
        // this.state.hero.get<Experience>(ComponentID.Experience).removeRender(this.updateExperience);
        // _.map(this._characterAttributeIDs, (ID) => {
        //     this.state.hero.get<CharacterAttribute>(ID).removeRender(this.updateCharacterAttributeFinalValue);
        // });
        // _.map(this._equipSlotIDs, (ID) => {
        //     this.state.hero.get<EquipSlotInterface>(ID).removeRender(this.updateEquipSlot);
        // });

        this.setState((state) => {
            return {
                window: {
                    show: false,
                },
                hero: undefined,
            } as DetailHeroRCState;
        });
    }

    updateHeroClassName(heroClassName: string): void {
        this.setState((state) => {
            return {
                heroClassName: heroClassName,
            } as DetailHeroRCState;
        });
    }

    updateExperience(level: number, exp: number, totalExpToLevelUp: number): void {
        this.setState((state) => {
            return {
                level: level,
                exp: exp,
                totalExpToLevelUp: totalExpToLevelUp,
            } as DetailHeroRCState;
        });
    }

    updateLevel(value: number): void {
        this.setState((state) => {
            return {
                level: value,
            } as DetailHeroRCState;
        });
    }
    updateExp(value: number): void {
        this.setState((state) => {
            return {
                exp: value,
            } as DetailHeroRCState;
        });
    }
    updateTotalExpToLevelUp(value: number): void {
        this.setState((state) => {
            return {
                totalExpToLevelUp: value,
            } as DetailHeroRCState;
        });
    }

    updateHealthPoints(currentHealthPoints: number, maxHealthPoints: number): void {
        this.setState((state) => {
            return {
                currentHealthPoints: currentHealthPoints,
                maxHealthPoints: maxHealthPoints,
            } as DetailHeroRCState;
        });
    }

    updateDeadState(isDead: boolean): void {
        this.setState((state) => {
            return {
                isDead: isDead,
            } as DetailHeroRCState;
        });
    }

    updateCharacterAttributeFinalValue(ID: CharacterAttributeID, value: number): void {
        this.setState((state) => {
            let newState = {} as DetailHeroRCState;
            newState[ID] = value;

            return newState;
        });
    }

    // updateEquipSlot(ID: EquipSlotID, item: Item | undefined): void {
    updateEquipSlot(ID: EquipSlotID, item: UI_ItemCount): void {
        this.setState((state) => {
            let newState = {} as DetailHeroRCState;
            newState[ID] = item.itemName;

            return newState;
        });
    }
    // clearEquipSlot(ID: EquipSlotID): void {}

    render() {
        if (!this.state.window.show) return;
        if (!this.state.hero) return <div>Герой не выбран.</div>;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Герой<span className={'widget__close'}>x</span></div>
                    <div className={'widget__content'}>
                        <div>{this.state.heroClassName}, {this.state.level} ({this.state.exp}/{this.state.totalExpToLevelUp})</div>
                        <div>Здоровье: {this.state.currentHealthPoints}/{this.state.maxHealthPoints}</div>
                        <div>Состояние: {!this.state.isDead ? 'Живой' : 'Мертвый'}</div>
                        <div>
                            <h4>Аттрибуты:</h4>
                            <ul>
                                <li>Сила: {this.state.Strength}</li>
                                <li>Ловкость: {this.state.Agility}</li>
                                <li>Интеллект: {this.state.Intelligence}</li>
                                <li>Сила атаки: {this.state.AttackPower}</li>
                                <li>Защита: {this.state.Protection}</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Экипировка:</h4>
                            <ul>
                                <li>Голова: {this.state.Head ? this.state.Head : 'Пусто'}</li>
                                <li>Плечи: {this.state.Shoulders ? this.state.Shoulders : 'Пусто'}</li>
                                <li>Грудь: {this.state.Chest ? this.state.Chest : 'Пусто'}</li>
                                <li>Запястье: {this.state.Wrist ? this.state.Wrist : 'Пусто'}</li>
                                <li>Руки: {this.state.Hands ? this.state.Hands : 'Пусто'}</li>
                                <li>Талия: {this.state.Waist ? this.state.Waist : 'Пусто'}</li>
                                <li>Ноги: {this.state.Legs ? this.state.Legs : 'Пусто'}</li>
                                <li>Ступни: {this.state.Foots ? this.state.Foots : 'Пусто'}</li>
                                <li>Правая рука: {this.state.RightHand ? this.state.RightHand : 'Пусто'}</li>
                                <li>Левая рука: {this.state.LeftHand ? this.state.LeftHand : 'Пусто'}</li>
                                <li>Шея: {this.state.Neck ? this.state.Neck : 'Пусто'}</li>
                                <li>Палец 1: {this.state.Finger01 ? this.state.Finger01 : 'Пусто'}</li>
                                <li>Палец 2: {this.state.Finger02 ? this.state.Finger02 : 'Пусто'}</li>
                                <li>Тринкет: {this.state.Trinket ? this.state.Trinket : 'Пусто'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}