import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletInterface, {WalletInterfaceRender} from '../../../core/app/Interfaces/WalletInterface.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface.js';
import {WalletRCState} from './WalletRC.js';

export interface WalletMoneyCounterRCProps {
    container: ContainerInterface;
    wallet: WalletInterface;
}

interface WalletMoneyCounterRCState {
    money: number;
}

export default class WalletMoneyCounterRC extends React.Component<WalletMoneyCounterRCProps, WalletMoneyCounterRCState> implements RCUpdateInterface, WalletInterfaceRender {
    constructor(props: WalletMoneyCounterRCProps) {
        super(props);

        this.state = {
            money: 0,
        };

        this.props.container.set<WalletMoneyCounterRC>(ServiceID.UI_Wallet, this);
        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    updateByRequest(): void {
        this.props.wallet.renderByRequest(this);
    }

    updateValue(value: number): void {
        this.setState((state) => {
            return {
                money: value,
            } as WalletMoneyCounterRCState;
        });
    }

    render() {
        return (
            <div>
                WalletMoneyCounterRC: {this.state.money}
            </div>
        );
    }
}