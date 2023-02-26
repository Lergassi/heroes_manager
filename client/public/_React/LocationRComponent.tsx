import React from 'react';
import GameObject from '../../../core/source/GameObject.js';
import Location, {LocationEventCode} from '../../../core/app/Components/Location.js';
import HeroGroup from '../../../core/app/Components/HeroGroup.js';
import _, {values} from 'lodash';
import ItemStorageComponent from '../../../core/app/Components/ItemStorageComponent.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import ItemStackTextRComponent from './ItemStackTextRComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import Bag from '../../../core/app/Components/Bag.js';
import ItemStorageRC_Legacy from '../RComponents/ItemStorageRC_Legacy.js';

export interface LocationRComponentProps {
    container: ContainerInterface;
    location: GameObject;
}

export interface LocationRComponentState {
    location: GameObject;
    heroes: {ID: number}[];
}

export class LocationRComponent extends React.Component<LocationRComponentProps, LocationRComponentState> {
    constructor(props: LocationRComponentProps) {
        super(props);

        this.state = {
            location: props.location,
            heroes: [
                {ID: undefined},
                {ID: undefined},
                {ID: undefined},
                {ID: undefined},
                {ID: undefined},
            ],
        };

        EventSystem.addListener({
            codes: [
                LocationEventCode.AddHero,
                LocationEventCode.RemoveHero,
                LocationEventCode.Start,
                LocationEventCode.GatheringItems,
                LocationEventCode.GetItems,
                LocationEventCode.Update,
            ],
            listener: {
                callback: (target) => {
                    this.setState((state) => {
                        return {
                            location: state.location,
                        };
                    });
                },
            },
        });
    }

    componentDidMount() {
        // this.props.location.getComponent<HeroGroup>('heroGroupComponent').render((index, ID) => {
        //     this.setState((state) => {
        //         let heroes = [...this.state.heroes];
        //         heroes[index].ID = ID;
        //
        //         return {
        //             location: state.location,
        //             heroes: heroes,
        //         };
        //     });
        // });
    }

    render() {
        // let location = this.state.location;
        // let heroes = this.state.heroes;
        // console.log('heroes', heroes);
        //
        // let locationComponentElement;
        // let locationComponent = location.getComponent<LocationComponent>(ComponentID.Location);
        // locationComponent.render((values) => {
        //     locationComponentElement = (
        //         <div className={'block__title'}>Location ({location['_id']}), level: {values.level}</div>
        //     );
        // });
        //
        // let heroGroupComponent = location.getComponent<HeroGroup>('heroGroupComponent');
        // let heroGroupComponentTableRows = [];
        // let template = (index, ID) => {
        //     return <tr key={index}>
        //         <td>{ID ? (<span>{ID}</span>) : 'free'}*</td>
        //     </tr>
        // };
        // // heroGroupComponent.render((values) => {
        // //     for (const position in values.heroes) {
        // //         heroGroupComponentTableRows.push(<tr key={position}>
        // //             <td>{values.heroes[position].isBusy() ? (<span>{values.heroes[position]['_hero']['_id']}</span>) : 'free'}</td>
        // //         </tr>);
        // //     }
        // // });
        //
        // // heroGroupComponent.render((index, ID) => {
        // //     heroGroupComponentTableRows.push(template(index, ID));
        // // });
        // for (let i = 0; i < heroes.length; i++) {
        //     heroGroupComponentTableRows.push(template(i, heroes[i].ID));
        // }
        //
        // let heroGroupComponentTable = (
        //     <table className={'basic-table'}>
        //         <tbody>{heroGroupComponentTableRows}</tbody>
        //     </table>
        // );
        //
        // // let itemsElementTableRows = [];
        // // location.get<ItemStorageComponent>(ComponentID.ItemStorageComponent).render((values) => {
        // //     _.map(values.slots, (value, index) => {
        // //         itemsElementTableRows.push((<tr key={index}>
        // //             <td>
        // //                 <ItemStackTextRComponent
        // //                     itemStack={value['_itemStack']}
        // //                 ></ItemStackTextRComponent>
        // //             </td>
        // //         </tr>));
        // //     });
        // // });
        // // let itemsElementTable = (
        // //     <table className={'basic-table'}>
        // //         <tbody>{itemsElementTableRows}</tbody>
        // //     </table>
        // // );
        //
        // // location.get<ItemStorageV2>(ComponentID.ItemStorageComponent).atta
        //
        // //todo: Временно.
        // // console.log(location.get<LocationComponent>(LocationComponent.name)['_gatheringItemPoints']);
        // let gatheringItemPointsRows = location.get<LocationComponent>(ComponentID.Location)['_gatheringItemPoints']?.map((value, index) => {
        //     return (
        //         <tr key={index}>
        //             <td>{value.item.name}</td>
        //             <td>{value.count.value}/{value.count.period}с</td>
        //             <td>{value.type}</td>
        //         </tr>
        //     );
        // });
        // let gatheringItemPointsTable = (
        //     <table className={'basic-table'}>
        //         <tbody>{gatheringItemPointsRows}</tbody>
        //     </table>
        // );
        //
        // return (
        //     <div className={'widget'}>
        //         <div className={'widget__title'}>{locationComponentElement}</div>
        //         <div className={'widget__content'}>
        //             <div>GatheringItemPoints:</div>
        //             {gatheringItemPointsTable}
        //             <div>HeroGroupComponent:</div>
        //             {heroGroupComponentTable}
        //             <div>Items:</div>
        //             {/*{itemsElementTable}*/}
        //             {/*{items}*/}
        //             <ItemStorageRC
        //                 size={5}
        //                 columns={5}
        //                 itemStorage={location.get<ItemStorageV2>(ComponentID.ItemStorageComponent)}
        //             />
        //         </div>
        //     </div>
        // );
        return undefined;
    }
}