import React from 'react';
import {unsigned} from '../../../core/types/main.js';
import _ from 'lodash';

interface WalletRComponentProps {
    // container: ContainerInterface;
    // wallet: WalletComponent;
}

interface WalletRComponentState {
    value: unsigned;
    // wallet: WalletComponent;
}

export class WalletRComponent extends React.Component<WalletRComponentProps, WalletRComponentState> {
    constructor(props: WalletRComponentProps) {
        super(props);

        this.state = {
            value: null,
        };

        window['_wallet_rc'] = this;

        this.setValue = this.setValue.bind(this);
    }

    setValue(value) {
        console.log('WalletRComponent updateValue', this);
        this.setState({
            value: value,
        });
    }

    render() {
        if (_.isNil(this.state.value)) return <span>Кошелек не задан.</span>

        return (
            <div>
                <span>Золото!: {this.state.value}</span>
            </div>
        );
    }
}