import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';

export interface ProgressBarRCProps {
    maxValue?: number;
    currentValue?: number;
}

export interface ProgressBarRCState {
    maxValue: number;
    currentValue: number;
}

export default class ProgressBarRC extends React.Component<ProgressBarRCProps, ProgressBarRCState> {
    constructor(props: ProgressBarRCProps) {
        super(props);

        this.state = {
            maxValue: props.maxValue,
            currentValue: props.currentValue,
        };
    }

    render() {
        let style = {
            width: _.random(20, 80) + '%',
        };

        return (
            <div className={'progress-bar'}>
                <div className={'progress-bar__max-value'}></div>
                <div className={'progress-bar__current-value'} style={style}></div>
            </div>
        );
    }
}