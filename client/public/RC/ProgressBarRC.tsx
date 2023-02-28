import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {assertIsGreaterThanOrEqual} from '../../../core/source/assert.js';

export interface ProgressBarRCProps {
    maxValue: number;
    currentValue: number;
}

export interface ProgressBarRCState {

}

export default class ProgressBarRC extends React.Component<ProgressBarRCProps, ProgressBarRCState> {
    constructor(props: ProgressBarRCProps) {
        // assertIsGreaterThanOrEqual(props.currentValue, 0);
        // assertIsGreaterThanOrEqual(props.maxValue, 0);
        // assertIsGreaterThanOrEqual(props.maxValue, 0);

        super(props);
    }

    render() {
        let maxValue = this.props.maxValue;
        let currentValue = this.props.currentValue;

        let style = {
            width: currentValue > maxValue ? '100%' : (currentValue / maxValue * 100) + '%',
        };

        return (
            <div className={'progress-bar'}>
                <div className={'progress-bar__max-value'}></div>
                <div className={'progress-bar__current-value'} style={style}></div>
            </div>
        );
    }
}