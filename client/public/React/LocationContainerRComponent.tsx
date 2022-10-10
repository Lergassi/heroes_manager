import React from 'react';
import GameObject from '../../../core/source/GameObject.js';
import LocationComponent, {LocationComponentEventCode} from '../../../core/app/Components/LocationComponent.js';
import LevelRange from '../../../core/app/LevelRange.js';
import HeroGroupComponent from '../../../core/app/Components/HeroGroupComponent.js';
import _ from 'lodash';
import HeroComponent from '../../../core/app/Components/HeroComponent.js';
import ItemStorageComponent from '../../../core/app/Components/ItemStorageComponent.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import EventSystem from '../../../core/source/EventSystem.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import {ContainerKey} from '../../../core/app/consts.js';

export interface LocationRComponentProps {
    container: ContainerInterface;
    location: GameObject;
}

export interface LocationRComponentState {
    location: GameObject;
}

export class LocationContainerRComponent extends React.Component<LocationRComponentProps, LocationRComponentState> {
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

        // EventSystem.addListener([
        //     LocationComponentEventCode.AddHero,
        //     LocationComponentEventCode.RemoveHero,
        //     LocationComponentEventCode.Start,
        //     LocationComponentEventCode.Start,
        //     LocationComponentEventCode.ItemsGenerated,
        // ], callback);
    }

    render() {
        // let location = this.props.location;
        let location = this.state.location;

        // console.log('this.props.location', location);
        // console.log('this.props.location.locationComponent', locationComponent);
        // let locationComponent = this.props.locationComponent;
        // console.log('level', this.props.location.getComponent<LocationComponent>('locationComponent')['_level']);

        let locationComponentElement;
        let locationComponent = location.getComponent<LocationComponent>('locationComponent');
        locationComponent.render((values) => {
            locationComponentElement = (
                <div className={'block__title'}>Location, level: {values.level}</div>
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

        let itemsElementTableRows = [];
        location.getComponent<ItemStorageComponent>('itemStorageComponent').render((values) => {
            _.map(values.slots, (value, index) => {
                itemsElementTableRows.push((<tr key={index}>
                    {/*<td>{value.isBusy() ? <span>{value['_itemStack']['_item']['name']} ({value['_itemStack']['_count']})</span> : 'free'}</td>*/}
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

export class GatheringItemPointRComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
}

export class HeroGroupRComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
}

export class HeroGroupLocationRComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HeroGroupRComponent

            />
        );
    }
}

//
export interface LevelRangeDefaultRenderProps {
    levelRange: LevelRange;
}

export class LevelRangeDefaultRender extends React.Component<LevelRangeDefaultRenderProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        let levelRange = this.props.levelRange;

        let element;
        {levelRange.render((values) => {
            element = (<span>
                {values.min} - {values.max}
            </span>);
        })}

        return (<span>
            {element}
        </span>);
    }
}

export class Listener {
    private _code: string;

    equalCode(code: string) {
        return this._code === code;
    }
}

export class UniversalListener {
    equalCode(code: string) {
        return true;
    }
}