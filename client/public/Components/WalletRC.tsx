import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletInterface, {WalletInterfaceRender} from '../../../core/app/Interfaces/WalletInterface.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';

export interface WalletRCProps {
    container: ContainerInterface;
    wallet: WalletInterface;
}

export interface WalletRCState {
    money: number;
}

export default class WalletRC extends React.Component<WalletRCProps, WalletRCState> implements WalletInterfaceRender {
    constructor(props: WalletRCProps) {
        super(props);

        this.state = {
            money: 0,
        };

        this.props.container.set<WalletRC>(ServiceID.UI_Wallet, this);
    }

    updateByRequest(): void {
        this.props.wallet.renderByRequest(this);
    }

    updateValue(value: number): void {
        this.setState((state) => {
            return {
                money: value,
            } as WalletRCState;
        });
    }

    render() {
        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Золото</div>
                    <div className={'widget__content'}>
                        {this.state.money}
                    </div>
                </div>
            </div>
        );
    }
}