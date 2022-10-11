import React from 'react';
import GameObject from '../../../core/source/GameObject.js';
import LocationComponent, {LocationComponentEventCode} from '../../../core/app/Components/LocationComponent.js';
import LevelRange from '../../../core/app/LevelRange.js';
import HeroGroupComponent from '../../../core/app/Components/HeroGroupComponent.js';
import _ from 'lodash';
import ItemStorageComponent from '../../../core/app/Components/ItemStorageComponent.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';

export interface LocationRComponentProps {
    container: ContainerInterface;
    location: GameObject;
}

export interface LocationRComponentState {
    location: GameObject;
}

export class LocationRComponent extends React.Component<LocationRComponentProps, LocationRComponentState> {
    constructor(props: LocationRComponentProps) {
        super(props);

        this.state = {
            location: props.location,
        };

        let callback = (target) => {
            this.setState((state) => {
                return {
                    location: state.location,
                };
            });
        };

        EventSystem.addListener({
            codes: [
                LocationComponentEventCode.AddHero,
                LocationComponentEventCode.RemoveHero,
                LocationComponentEventCode.Start,
                LocationComponentEventCode.Start,
                LocationComponentEventCode.ItemsGenerated,
                LocationComponentEventCode.GetItems,
            ],
            listener: {
                callback: callback,
            },
        });
    }

    render() {
        let location = this.state.location;

        let locationComponentElement;
        let locationComponent = location.getComponent<LocationComponent>('locationComponent');
        locationComponent.render((values) => {
            locationComponentElement = (
                <div className={'block__title'}>Location ({location['_id']}), level: {values.level}</div>
            );
        });

        let heroGroupComponent = location.getComponent<HeroGroupComponent>('heroGroupComponent');
        let heroGroupComponentTableRows = [];
        heroGroupComponent.render((values) => {
            for (const position in values.heroes) {
                heroGroupComponentTableRows.push(<tr key={position}>
                    <td>{values.heroes[position].isBusy() ? (<span>{values.heroes[position]['_hero']['_id']}</span>) : 'free'}</td>
                </tr>);
            }
        });
        let heroGroupComponentTable = (
            <table className={'basic-table'}>
                <tbody>{heroGroupComponentTableRows}</tbody>
            </table>
        );

        //todo: Отдельный класс.
        let itemsElementTableRows = [];
        location.getComponent<ItemStorageComponent>('itemStorageComponent').render((values) => {
            _.map(values.slots, (value, index) => {
                itemsElementTableRows.push((<tr key={index}>
                    <td>
                        <ItemStackTextRComponent
                            itemStack={value['_itemStack']}
                        ></ItemStackTextRComponent>
                    </td>
                </tr>));
            });
        });
        let itemsElementTable = (
            <table className={'basic-table'}>
                <tbody>{itemsElementTableRows}</tbody>
            </table>
        );

        return (
            <div className={'block'}>
                <div className={'block__title'}>{locationComponentElement}</div>
                <div className={'block__content'}>
                    <div>HeroGroupComponent:</div>
                    {heroGroupComponentTable}
                    <div>Items:</div>
                    {itemsElementTable}
                </div>
            </div>
        );
    }
}

// export class GatheringItemPointRComponent extends React.Component<any, any> {
//     constructor(props) {
//         super(props);
//     }
// }
//
// export class HeroGroupRComponent extends React.Component<any, any> {
//     constructor(props) {
//         super(props);
//     }
// }
//
// export class HeroGroupLocationRComponent extends React.Component<any, any> {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (
//             <HeroGroupRComponent
//
//             />
//         );
//     }
// }

// export interface LevelRangeDefaultRenderProps {
//     levelRange: LevelRange;
// }
//
// export class LevelRangeDefaultRender extends React.Component<LevelRangeDefaultRenderProps, any> {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         let levelRange = this.props.levelRange;
//
//         let element;
//         {levelRange.render((values) => {
//             element = (<span>
//                 {values.min} - {values.max}
//             </span>);
//         })}
//
//         return (<span>
//             {element}
//         </span>);
//     }
// }

// export class Listener {
//     private _code: string;
//
//     equalCode(code: string) {
//         return this._code === code;
//     }
// }
//
// export class UniversalListener {
//     equalCode(code: string) {
//         return true;
//     }
// }