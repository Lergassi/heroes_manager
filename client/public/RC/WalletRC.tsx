import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletInterface, {WalletInterfaceRender} from '../../../core/app/Interfaces/WalletInterface.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import {UI_WindowOptions} from '../../types/main.js';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface.js';
import WalletMoneyValueRC from './WalletMoneyValueRC.js';

export interface WalletRCProps {
    container: ContainerInterface;
    wallet: WalletInterface;
    window: UI_WindowOptions;
}

export interface WalletRCState {
    // money: number;
    window: UI_WindowOptions;
}

// export default class WalletRC extends React.Component<WalletRCProps, WalletRCState> implements RCUpdateInterface, WalletInterfaceRender {
export default class WalletRC extends React.Component<WalletRCProps, WalletRCState> {
    constructor(props: WalletRCProps) {
        super(props);

        this.state = {
            // money: 0,
            window: {
                show: true,
            },
        };

        // this.props.container.set<WalletRC>(ServiceID.UI_Wallet, this);
        // this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    // updateByRequest(): void {
    //     if (!(this.state.window.show && this.props.window.show)) return;
    //
    //     this.props.wallet.renderByRequest(this);
    // }
    //
    // updateValue(value: number): void {
    //     this.setState((state) => {
    //         return {
    //             money: value,
    //         } as WalletRCState;
    //     });
    // }

    render() {
        if (!(this.state.window.show && this.props.window.show)) return;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Золото</div>
                    <div className={'widget__content'}>
                        {/*{this.state.money}*/}
                        <WalletMoneyValueRC
                            container={this.props.container}
                            wallet={this.props.wallet}
                        />
                    </div>
                </div>
            </div>
        );
    }
}