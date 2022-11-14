import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import {IconID} from '../../../core/types/enums/IconID.js';
import ProgressBarRC from './ProgressBarRC.js';
import {EquipSlotID} from '../../../core/types/enums/EquipSlotID.js';
import ItemStorageSlotRC from './ItemStorageSlotRC.js';
import ItemSlotRC from './ItemSlotRC.js';

export interface HeroListUIProps {

}

export interface HeroListUIState {

}

export default class DetailHeroListRC extends React.Component<HeroListUIProps, HeroListUIState> {
    constructor(props: HeroListUIProps) {
        super(props);
    }

    // render() {
    //     let heroes = [
    //         {name: 'Воин', icon: IconID.Warrior01},
    //         {name: 'Маг', icon: IconID.Fire01},
    //         {name: 'Разбойник', icon: IconID.Dagger01},
    //         {name: 'Маг', icon: IconID.Fire01},
    //         {name: 'Маг', icon: IconID.Fire01},
    //         {name: 'Воин', icon: IconID.Warrior01},
    //         {name: 'Шаман', icon: IconID.Plant01},
    //         {name: 'Стрелок', icon: IconID.CowboyHat01},
    //         {name: 'Друид', icon: IconID.BearPawPrint01},
    //         {name: 'Друид', icon: IconID.BearPawPrint01},
    //         {name: 'Стрелок', icon: IconID.CowboyHat01},
    //         {name: 'Воин', icon: IconID.Warrior01},
    //     ];
    //
    //     let elements = [];
    //     for (let i = 0; i < heroes.length; i++) {
    //         elements.push(
    //             <div key={i} className={'hero-list-table-row'}>
    //                 <div className={'hero-list-table__cell'}><span className={'hero-list-table-row__icon-wrapper'}><span className={'icon icon_32 icon_' + heroes[i].icon}></span></span><span className={'hero-list-table-row__name'}>{heroes[i].name}</span></div>
    //                 <div className={'hero-list-table__cell'}>Танк</div>
    //                 <div className={'hero-list-table__cell'}>
    //                     <div className={'hero-list-table-row__level'}>42 ур.</div>
    //                     {/*<div className={'progress-bar-wrapper'}>*/}
    //                     {/*    <ProgressBarRC*/}
    //                     {/*        maxValue={1000}*/}
    //                     {/*        currentValue={0}*/}
    //                     {/*    />*/}
    //                     {/*</div>*/}
    //                 </div>
    //                 <div className={'hero-list-table__cell'}>100/100</div>
    //                 <div className={'hero-list-table__cell'}>Живой</div>
    //                 <div className={'hero-list-table__cell'}>50</div>
    //                 <div className={'hero-list-table__cell'}>10/20/30</div>
    //                 <div className={'hero-list-table__cell'}>Свободен</div>
    //                 <div className={'hero-list-table__cell'}>удалить, показать</div>
    //                 <div className={'clearfix'}></div>
    //             </div>
    //         );
    //     }
    //
    //     return (
    //         <div className={'hero-list-wrapper'}>
    //             <div className={'hero-list-table'}>
    //                 {elements}
    //             </div>
    //         </div>
    //     );
    // }//end render

    render() {
        let heroes = [
            {name: 'Воин', icon: IconID.Warrior01},
            {name: 'Маг', icon: IconID.Fire01},
            {name: 'Разбойник', icon: IconID.Dagger01},
            {name: 'Маг', icon: IconID.Fire01},
            {name: 'Маг', icon: IconID.Fire01},
            {name: 'Воин', icon: IconID.Warrior01},
            {name: 'Шаман', icon: IconID.Plant01},
            {name: 'Стрелок', icon: IconID.CowboyHat01},
            {name: 'Друид', icon: IconID.BearPawPrint01},
            {name: 'Друид', icon: IconID.BearPawPrint01},
            {name: 'Стрелок', icon: IconID.CowboyHat01},
            {name: 'Воин', icon: IconID.Warrior01},
        ];

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
                // blockSize={32}
                blockSize={50}
                backgroundIconID={equipSlots[i].iconID}
            />);
        }

        let equip = [
            {ID: EquipSlotID.Head, item: IconID.Question01},
            {ID: EquipSlotID.Shoulders, item: IconID.Question01},
            {ID: EquipSlotID.Chest, item: IconID.Question01},
            {ID: EquipSlotID.Wrist, item: IconID.Question01},
            {ID: EquipSlotID.Hands, item: IconID.Question01},
            {ID: EquipSlotID.Waist, item: IconID.Question01},
            {ID: EquipSlotID.Legs, item: IconID.Question01},
            {ID: EquipSlotID.Foots, item: IconID.Question01},
            {ID: EquipSlotID.Neck, item: IconID.Question01},
            {ID: EquipSlotID.Finger_1, item: IconID.Question01},
            {ID: EquipSlotID.Finger_2, item: IconID.Question01},
            {ID: EquipSlotID.Trinket, item: IconID.Question01},
            {ID: EquipSlotID.RightHand, item: IconID.Question01},
            {ID: EquipSlotID.LeftHand, item: IconID.Question01},
        ];

        let equipElements = [];
        for (let i = 0; i < equip.length; i++) {
            equipElements.push(<ItemSlotRC
                // blockSize={32}
                blockSize={50}
            />);
        }

        let elements = [];
        for (let i = 0; i < heroes.length; i++) {
            elements.push(
                <tr key={i} className={'hero-list-table-row'}>
                    {/*<td><span className={'hero-list-table-row__icon-wrapper'}><span className={'icon icon_32 icon_' + heroes[i].icon}></span></span><span className={'hero-list-table-row__name'}>{heroes[i].name}</span></td>*/}
                    <td><span className={'hero-list-table-row__icon-wrapper'}><span className={'icon icon_50 icon_' + heroes[i].icon}></span></span><span className={'hero-list-table-row__name'}>{heroes[i].name}</span></td>
                    <td>Танк</td>
                    <td>
                        <div className={'hero-list-table-row__level'}>42 ур.</div>
                        <div className={'hero-list__progress-bar-wrapper'}>
                            <ProgressBarRC
                                maxValue={1000}
                                currentValue={0}
                            />
                        </div>
                    </td>
                    <td>100/100</td>
                    <td>Живой</td>
                    <td>50</td>
                    <td>10/20/30</td>
                    {/*<td>Свободен</td>*/}
                    <td>
                        {equipElements}
                    </td>
                    {/*<td>удалить, показать</td>*/}
                </tr>
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
                            {/*<th>Управление</th>*/}
                            <th>{equipHeadElements}</th>
                        </tr>
                        {elements}
                    </tbody>
                </table>
            </div>
        );
    }//end render

    private _renderRow() {

    }
}