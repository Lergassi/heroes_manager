import React from 'react';
import MainLocationListComponent, {
    MainLocationListComponentEventCode
} from '../../core/app/Components/MainLocationListComponent.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import EventSystem from '../../core/source/EventSystem.js';
import {ContainerKey} from '../../core/app/consts.js';
import {LocationComponentEventCode} from '../../core/app/Components/LocationComponent.js';
import {LocationContainerRComponent} from './React/LocationContainerRComponent.js';
import _ from 'lodash';

export type MainLocationListRComponentProps = {
    container: ContainerInterface;
    mainLocationListComponent: MainLocationListComponent;
}

export type MainLocationListRComponentState = {
    mainLocationListComponent: MainLocationListComponent;
}

export default class MainLocationListRComponent extends React.Component<MainLocationListRComponentProps, MainLocationListRComponentState> {
    constructor(props: MainLocationListRComponentProps) {
        super(props);

        this.state = {
            mainLocationListComponent: props.mainLocationListComponent,
        };

        let callback = (target) => {
            this.setState((state) => {
                return {
                    mainLocationListComponent: state.mainLocationListComponent,
                };
            });
        };

        EventSystem.addListener({
            codes: [
                MainLocationListComponentEventCode.CreateLocation,
                MainLocationListComponentEventCode.DeleteLocation,
            ],
            listener: {
                callback: callback,
                target: props.mainLocationListComponent,
            },
        });
    }

    render() {
        let mainLocationListComponent = this.state.mainLocationListComponent;
        let list = [];
        mainLocationListComponent.render((values) => {
            _.map(values.locations, (value, index) => {
                list.push(<LocationContainerRComponent
                    key={index}
                    container={this.props.container}
                    location={value}
                />);
            })
        });

        return (
            <div>
                {list}
            </div>
        );
    }

    renderList() {
        let mainLocationListComponent = this.state.mainLocationListComponent;

        let rows = [];
        for (let i = 0; i < mainLocationListComponent['_locations'].length; i++) {
            rows.push(
                <tr key={i}>
                    <td>{mainLocationListComponent['_locations'][i]['_id']}</td>
                </tr>);
        }

        let table = (
            <table>
                <tbody>{rows}</tbody>
            </table>
        );

        return (
            <div className={'block'}>
                <div className={'block__title'}>Location list</div>
                <div className={'block__content'}>
                    {table}
                </div>
            </div>
        );
    }
}