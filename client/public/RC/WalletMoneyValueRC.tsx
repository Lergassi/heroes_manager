import React from 'react';
import WalletInterface, {WalletInterfaceRender} from '../../../core/app/Interfaces/WalletInterface.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface.js';

export interface WalletMoneyValueRCProps {
    container: ContainerInterface;
    wallet: WalletInterface;
}

interface WalletMoneyValueRCState {
    money: number;
}

export default class WalletMoneyValueRC extends React.Component<WalletMoneyValueRCProps, WalletMoneyValueRCState> implements RCUpdateInterface, WalletInterfaceRender {
    constructor(props: WalletMoneyValueRCProps) {
        super(props);

        this.state = {
            money: 0,
        };

        this.props.container.set<WalletMoneyValueRC>(ServiceID.UI_Wallet, this);
        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    updateByRequest(): void {
        this.props.wallet.renderByRequest(this);
    }

    updateValue(value: number): void {
        this.setState((state) => {
            return {
                money: value,
            } as WalletMoneyValueRCState;
        });
    }

    render() {
        return (
            <span>
                {this.state.money}
            </span>
        );
    }
}