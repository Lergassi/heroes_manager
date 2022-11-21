import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import HeroListRC from './HeroListRC.js';
import {HeroClassID} from '../../../core/types/enums/HeroClassID.js';
import {EnemyID} from '../../../core/types/enums/EnemyID.js';
import ItemStorageRC from './ItemStorageRC.js';
import ItemSlotRC from './ItemSlotRC.js';
import {ItemID} from '../../../core/types/enums/ItemID.js';

export interface LocationRCProps {

}

export interface LocationRCState {

}

export default class LocationRC extends React.Component<LocationRCProps, LocationRCState> {
    constructor(props: LocationRCProps) {
        super(props);
    }

    render() {
        //todo: В заготовки групп.
        let heroGroup = [
            // {heroClass: HeroClassID.Warrior, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
            undefined,
            {heroClass: HeroClassID.FireMage, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
            {heroClass: HeroClassID.Gunslinger, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
            // undefined,
            // undefined,
            {heroClass: HeroClassID.Rogue, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
            {heroClass: HeroClassID.Paladin, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
        ];

        let heroGroupElements = [];
        for (let i = 0; i < heroGroup.length; i++) {
            if (!heroGroup[i]) continue;

            heroGroupElements.push(
                <tr key={i}>
                    <td>{heroGroup[i].heroClass}</td>
                    <td>{heroGroup[i].level}</td>
                    <td>{heroGroup[i].healthPoints}</td>
                    <td>{heroGroup[i].attackPower}</td>
                    <td><button className={'btn btn_danger'}>Удалить</button></td>
                </tr>
            );
        }

        let enemyGroup = [
            {enemyType: EnemyID.Boar, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
            {enemyType: EnemyID.Fox, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
            // undefined,
            {enemyType: EnemyID.Bear, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
            // undefined,
            {enemyType: EnemyID.Wolf, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
            {enemyType: EnemyID.Skeleton, level: _.random(1, 100), attackPower: _.random(18, 26), healthPoints: _.random(8, 12) * 10},
            // undefined,
        ];

        let enemyGroupElements = [];
        for (let i = 0; i < enemyGroup.length; i++) {
            if (!enemyGroup[i]) continue;

            enemyGroupElements.push(
                <tr key={i}>
                    <td>{enemyGroup[i].enemyType}</td>
                    <td>{enemyGroup[i].level}</td>
                    <td>{enemyGroup[i].healthPoints}</td>
                    <td>{enemyGroup[i].attackPower}</td>
                </tr>
            );
        }

        let veins = [
            {item: ItemID.IronOre, count: _.random(20, 40)},
            {item: ItemID.Herb_1, count: _.random(20, 40)},
            {item: ItemID.Herb_2, count: _.random(20, 40)},
            {item: ItemID.Wood, count: _.random(20, 40)},
            {item: ItemID.Cotton, count: _.random(20, 40)},
        ];
        let veinsElements = [];
        for (let i = 0; i < veins.length; i++) {
            veinsElements.push(
                <tr key={i}>
                    <td>{veins[i].item}</td>
                    <td>{veins[i].count}</td>
                    <td>{_.ceil(veins[i].count * 0.4)}</td>
                </tr>
            );
        }

        return (
            <div>
                <div className={'row'}>
                    <div className={'col col-25'}>
                        <div className={'block'}>
                            <h3 className={'block'}>Информация</h3>
                            <ul>
                                <li>Уровень: 10</li>
                                <li>Эффективность сбора: 0.4</li>
                                <li>Время до закрытия: 8 часов</li>
                            </ul>
                        </div>
                        <div className={'block'}>
                            <h3 className={'block'}>Управление</h3>
                            <button className={'btn btn_primary'}>Охота</button>
                            <button className={'btn btn_primary'}>Забрать добычу</button>
                            <button className={'btn btn_danger'}>Удалить локацию</button>
                        </div>
                        <div className={'block'}>
                            <h3 className={'block'}>Журнал</h3>
                        </div>
                    </div>
                    <div className={'col col-25'}>
                        <h3 className={'m-bottom'}>Герои</h3>
                        <table className={'basic-table'}>
                            <tr>
                                <th>Класс</th>
                                <th>Уровень</th>
                                <th>Сила атаки</th>
                                <th>Очки здоровья</th>
                                <th>Управление</th>
                            </tr>
                            {heroGroupElements}
                        </table>
                    </div>
                    <div className={'col col-25'}>
                        <h3 className={'m-bottom'}>Враги</h3>
                        <table className={'basic-table'}>
                            <tr>
                                <th>Тип</th>
                                <th>Уровень</th>
                                <th>Сила атаки</th>
                                <th>Очки здоровья</th>
                            </tr>
                            {enemyGroupElements}
                        </table>
                    </div>
                    <div className={'col col-25'}>
                        <div className={'block'}>
                            <h3 className={'m-bottom'}>Ресурсы для сбора</h3>
                            <table className={'basic-table'}>
                                <tr>
                                    <th>Ресурс</th>
                                    <th>Кол-во</th>
                                    <th>Эффективность сбора (0.4)</th>
                                </tr>
                                {veinsElements}
                            </table>
                        </div>
                        <div className={'block'}>
                            <h3 className={'block'}>Добыча</h3>
                            <ItemStorageRC
                                size={10}
                                columns={5}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}