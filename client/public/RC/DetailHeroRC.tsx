import _ from 'lodash';
import React from 'react';
import Endurance from '../../../core/app/Components/Endurance.js';
import EquipController from '../../../core/app/Components/EquipController.js';
import Experience from '../../../core/app/Components/Experience.js';
import HealthPoints from '../../../core/app/Components/HealthPoints.js';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import ItemStorageController from '../../../core/app/Components/ItemStorages/ItemStorageController.js';
import CharacterAttributeInterface from '../../../core/app/Decorators/CharacterAttributeInterface.js';
import EquipSlotInterface from '../../../core/app/Interfaces/EquipSlotInterface.js';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface.js';
import {assertNotNil} from '../../../core/source/assert.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';
import {CharacterAttributeID} from '../../../core/types/enums/CharacterAttributeID.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import {EquipSlotID} from '../../../core/types/enums/EquipSlotID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_ItemCount} from '../../../core/types/main.js';
import UIUpdater from '../../app/UIUpdater.js';
import {UI_WindowOptions} from '../../types/main.js';
import EquipItemListRC from './EquipItemListRC.js';

export interface DetailHeroRCProps {
    container: ContainerInterface;
    /**
     * Для списка экипировки.
     */
    itemStorage: ItemStorageInterface;
    window: UI_WindowOptions;
}

export interface DetailHeroRCState {
    hero: GameObject;

    window: UI_WindowOptions;

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

export default class DetailHeroRC extends React.Component<DetailHeroRCProps, DetailHeroRCState> /*todo: Реализовать все интерфейсы или разделить на отдельные классы. */ {
    private readonly _characterAttributeIDs = [
        CharacterAttributeID.Strength,
        CharacterAttributeID.Agility,
        CharacterAttributeID.Intelligence,
        CharacterAttributeID.AttackPower,
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

        this.props.container.set<DetailHeroRC>(ServiceID.UI_DetailHero, this);
        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);

        this.hide = this.hide.bind(this);
    }

    updateByRequest(): void {
        if (!(this.state.window.show && this.props.window.show)) return;
        if (!this.state.hero) return;

        this.state.hero.get<HeroComponent>(ComponentID.Hero)?.renderByRequest(this);
        this.state.hero.get<Experience>(ComponentID.Experience)?.renderByRequest(this);
        this.state.hero.get<HealthPoints>(ComponentID.HealthPoints)?.renderByRequest(this);
        _.map(this._characterAttributeIDs, (ID) => {
            this.state.hero.get<CharacterAttributeInterface>(ID)?.renderByRequest(this);
        });
        _.map(this._equipSlotIDs, (ID) => {
            this.state.hero.get<EquipSlotInterface>(ID)?.renderByRequest(this);
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

    updateHero(hero: GameObject, options: {show?: boolean} = {show: false}): void {
        assertNotNil(hero);
        // if (this.state.hero && this.state.hero === hero) return; //За обновление отвечает updateByRequest.
        // if (this.state.hero) {
        //     // this.removeHero();
        // }

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

        if (options?.show) this.show();
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
            newState[ID] = item.itemID;

            return newState;
        });
    }
    // clearEquipSlot(ID: EquipSlotID): void {}

    clearEquipSlot(equipSlotID: EquipSlotID) {
        // this.state.hero.get<EquipController>(ComponentID.EquipController).clear(equipSlotID);
        this.state.hero.get<EquipController>(ComponentID.EquipController).removeEquipTo(equipSlotID, this.props.itemStorage);
    }

    render() {
        if (!(this.state.window.show && this.props.window.show)) return;
        if (!this.state.hero) return;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>DetailHeroRC<button className={'btn btn_default btn_right btn_close-table'} onClick={this.hide}>CLOSE</button></div>
                    <div className={'widget__content'}>
                        <div className={'detail-hero'}>
                            <div className={'detail-hero-summary'}>
                                <div className={'block'}>
                                    <button className={'btn btn_default'} onClick={() => {
                                        this.state.hero.get<HealthPoints>(ComponentID.HealthPoints).resurrect();
                                    }}>RESURRECT</button>
                                    <button className={'btn btn_default only-dev'} onClick={() => {
                                        this.state.hero.get<Endurance>(ComponentID.Endurance).reset();
                                    }}>RESET_ENDURANCE</button>
                                    {/*<button className={'btn btn_danger'} onClick={() => {*/}
                                    {/*    this.state.hero.get<HealthPoints>(ComponentID.HealthPoints).kill();*/}
                                    {/*}}>KILL</button>*/}
                                </div>
                                <div className={'block'}>
                                    <div className={'block'}><h3>Характеристики</h3></div>
                                    <div>HeroClass: {this.state.heroClassName}</div>
                                    <div>Уровень: {this.state.level}</div>
                                    <div>Опыт: ({this.state.exp}/{this.state.totalExpToLevelUp})</div>
                                    <div>Здоровье: {this.state.currentHealthPoints}/{this.state.maxHealthPoints}</div>
                                    <div>LifeState: {!this.state.isDead ? 'Живой' : 'Мертвый'}</div>
                                </div>
                                <div>
                                    <div className={'block'}><h3>Аттрибуты</h3></div>
                                    <div className={'block'}>
                                        <table className={'basic-table'}>
                                            <tr>
                                                <td>{CharacterAttributeID.Strength}</td>
                                                <td>{this.state.Strength}</td>
                                            </tr>
                                            <tr>
                                                <td>{CharacterAttributeID.Agility}</td>
                                                <td>{this.state.Agility}</td>
                                            </tr>
                                            <tr>
                                                <td>{CharacterAttributeID.Intelligence}</td>
                                                <td>{this.state.Intelligence}</td>
                                            </tr>
                                            <tr>
                                                <td>{CharacterAttributeID.AttackPower}</td>
                                                <td>{this.state.AttackPower}</td>
                                            </tr>
                                            <tr>
                                                <td>{CharacterAttributeID.Protection}</td>
                                                <td>{this.state.Protection}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className={'detail-hero-equip'}>
                                <div>
                                    <h3>Экипировка:</h3>
                                    <div className={'block'}>
                                        <EquipItemListRC
                                            container={this.props.container}
                                            equipSlotIDs={this._equipSlotIDs}
                                            itemStorageController={this.props.container.get<ItemStorageController>(ServiceID.ItemStorageController)}
                                            equipController={this.state.hero.get<EquipController>(ComponentID.EquipController)}
                                        />
                                    </div>
                                    <table className={'basic-table'}>
                                        <tbody>
                                        <tr>
                                            <th style={{width: '300px'}}>EquipSlotID</th>
                                            <th style={{width: '300px'}}>Item</th>
                                            <th style={{}}>Ctrl</th>
                                        </tr>
                                        {this._renderEquipSlot(EquipSlotID.Head)}
                                        {this._renderEquipSlot(EquipSlotID.Shoulders)}
                                        {this._renderEquipSlot(EquipSlotID.Chest)}
                                        {this._renderEquipSlot(EquipSlotID.Wrist)}
                                        {this._renderEquipSlot(EquipSlotID.Hands)}
                                        {this._renderEquipSlot(EquipSlotID.Waist)}
                                        {this._renderEquipSlot(EquipSlotID.Legs)}
                                        {this._renderEquipSlot(EquipSlotID.Foots)}
                                        {this._renderEquipSlot(EquipSlotID.RightHand)}
                                        {this._renderEquipSlot(EquipSlotID.LeftHand)}
                                        {this._renderEquipSlot(EquipSlotID.Neck)}
                                        {this._renderEquipSlot(EquipSlotID.Finger01)}
                                        {this._renderEquipSlot(EquipSlotID.Finger02)}
                                        {this._renderEquipSlot(EquipSlotID.Trinket)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>{/*end detail-hero*/}
                    </div>{/*end content*/}
                </div>{/*end widget*/}
            </div>
        );
    }//end render

    private _renderEquipSlot(ID: EquipSlotID) {
        return <tr key={ID}>
            <td>{ID}</td>
            <td>{this.state[ID] ? this.state[ID] : 'free'}</td>
            <td><button className={'btn btn_default'} onClick={this.clearEquipSlot.bind(this, ID)}>CLEAR</button></td>
        </tr>
    }
}