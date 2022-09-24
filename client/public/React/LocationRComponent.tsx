import React from 'react';
import GameObject from '../../../core/source/GameObject.js';
import LocationComponent from '../../../core/app/Components/LocationComponent.js';

export interface LocationRComponentProps {
    locationComponent: LocationComponent;
}

export interface LocationRComponentState {

}

export class LocationRComponent extends React.Component<LocationRComponentProps, LocationRComponentState> {
    constructor(props: LocationRComponentProps) {
        super(props);
    }

    render() {
        let locationComponent = this.props.locationComponent;
        // console.log('level', this.props.location.getComponent<LocationComponent>('locationComponent')['_level']);
        let element;
        this.props.locationComponent.render((values) => {
            // element = <div>this is callback</div>
            element = (
                <div className={'block'}>
                    <div className={'block__title'}>Location, level: {values['level']['_min']}-{values['level']['_max']}</div>
                    <div>GatheringItemPoints: </div>
                    {/*<HeroGroupRComponent*/}
                    {/*    heroGroupComponent={}*/}
                    {/*/>*/}
                </div>
            );
        });
        console.log('element', element);
        // values.level;
        // values.gatheringItemPoints;
        // values.heroGroupComponent;

        // return (
        //     <div className={'block'}>
        //         <div className={'block__title'}>Location, level: </div>
        //         <div>GatheringItemPoints: </div>
        //         {/*<HeroGroupRComponent*/}
        //         {/*    heroGroupComponent={}*/}
        //         {/*/>*/}
        //     </div>
        // );
        return element;
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