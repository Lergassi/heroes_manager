import React from 'react';
import MainLocationList, {MainLocationListComponentEventCode} from '../../../core/app/Components/MainLocationList.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import EventSystem from '../../../core/source/EventSystem.js';

export type MainLocationListRComponentProps = {
    container: ContainerInterface;
    mainLocationListComponent: MainLocationList;
}

export type MainLocationListRComponentState = {
    mainLocationListComponent: MainLocationList;
}

export default class MainLocationListRComponent extends React.Component<MainLocationListRComponentProps, MainLocationListRComponentState> {
    constructor(props: MainLocationListRComponentProps) {
        super(props);

        this.state = {
            mainLocationListComponent: props.mainLocationListComponent,
        };

        EventSystem.addListener({
            codes: [
                MainLocationListComponentEventCode.AddLocation,
                MainLocationListComponentEventCode.DeleteLocation,
            ],
            listener: {
                callback: (target) => {
                    this.setState((state) => {
                        return {
                            mainLocationListComponent: state.mainLocationListComponent,
                        };
                    });
                },
                target: props.mainLocationListComponent,
            },
        });
    }

    render() {
        // let mainLocationListComponent = this.state.mainLocationListComponent;
        // let list = [];
        // mainLocationListComponent.render((values) => {
        //     _.map(values.locations, (location, index) => {
        //         list.push(<LocationRComponent
        //             key={location.ID}
        //             container={this.props.container}
        //             location={location}
        //         />);
        //     })
        // });

        return (
            // <div className={'block'}>
            //     <div className={'block__title'}>Locations</div>
            //     <div className={'block__content'}>{list}</div>
            // </div>
            <div>
                {/*{list}*/}
            </div>
        );
    }
}