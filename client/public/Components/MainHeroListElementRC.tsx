import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import ProgressBarRC from './ProgressBarRC.js';
import HeroClass from '../../../core/app/Entities/HeroClass.js';
import GameObject from '../../../core/source/GameObject.js';
import {IconID} from '../../../core/types/enums/IconID.js';
import {HeroClassID} from '../../../core/types/enums/HeroClassID.js';
import {EquipSlotID} from '../../../core/types/enums/EquipSlotID.js';
import ItemSlotRC from './ItemSlotRC.js';

export interface MainHeroListElementRCProps {
    heroClassIcon: string;
    heroClass: string;
    level: number;
    exp: number;
    totalExpToLevelUp: number;
    attackPower: number;
    currentHealthPoints: number;
    maxHealthPoints: number;
    // state: string;
    strength: number;
    agility: number;
    intelligence: number;
    equip: {equipSlotID: EquipSlotID, iconID: IconID}[];
}

export interface MainHeroListElementRCState {

}

export default class MainHeroListElementRC extends React.Component<MainHeroListElementRCProps, MainHeroListElementRCState> {
    constructor(props: MainHeroListElementRCProps) {
        super(props);
    }

    render() {
        return (
            <tr className={'hero-list-table-row'}>
                <td><span className={'hero-list-table-row__icon-wrapper'}><span className={'icon icon_34 icon_' + this.props.heroClassIcon}></span></span><span className={'hero-list-table-row__name'}>{this.props.heroClass}</span></td>
                <td>Танк</td>
                <td>
                    <div className={'hero-list-table-row__level'}>{this.props.level} ур.</div>
                    <div className={'hero-list__progress-bar-wrapper'}>
                        <ProgressBarRC
                            maxValue={this.props.totalExpToLevelUp}
                            currentValue={this.props.exp}
                        />
                    </div>
                </td>
                <td>{this.props.currentHealthPoints}/{this.props.maxHealthPoints}</td>
                <td><s>Живой</s></td>
                <td>{this.props.attackPower}</td>
                <td>{this.props.strength}/{this.props.agility}/{this.props.intelligence}</td>
                {/*<td>Свободен</td>*/}
                <td>
                    {_.map(this.props.equip, (equip, index) => {
                        return <ItemSlotRC
                            key={index}
                            blockSize={34}
                            // backgroundIconID={equip.iconID}
                        />
                    })}
                </td>
                <td><s>удалить, показать</s></td>
            </tr>
        );
    }
}