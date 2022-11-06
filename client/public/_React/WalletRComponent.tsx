import React from 'react';
import WalletComponent from '../../../core/app/Components/WalletComponent.js';
import {EventCode} from '../../../core/types/enums/EventCode.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import EventSystemFactory from '../../../core/app/Services/EventSystemFactory.js';
import {ContainerID} from '../../../core/types/enums/ContainerID.js';
import EventSystem from '../../../core/source/EventSystem.js';

interface WalletRComponentProps {
    container: ContainerInterface;
    wallet: WalletComponent;
}

interface WalletRComponentState {
    wallet: WalletComponent;
}

export class WalletRComponent extends React.Component<WalletRComponentProps, WalletRComponentState> {
    constructor(props: WalletRComponentProps) {
        super(props);

        this.state = {
            wallet: props.wallet,
        };

        // let a: any = {};
        // a.addListener([EventCode.Wallet_Update], this, {
        //     wallet: 'wallet',
        // });
        // let _callback = (target: any) => {
        //     target.setState((state) => {
        //         return {
        //             'wallet': state['wallet'],
        //         }
        //     });
        // };

        // let _callback = (codes, rComponent, stateOptions) => {
        //     console.log('codes', codes);
        //     console.log('rComponent', rComponent);
        //     console.log('state', stateOptions);
        //     console.log('setState', rComponent['setState']);
        //     rComponent.setState((state) => {
        //         let _stateOptions = {};
        //         for (const stateOptionsKey in stateOptions) {
        //             _stateOptions[stateOptionsKey] = state[stateOptionsKey];
        //         }
        //         console.log('_stateOptions', _stateOptions);
        //         return _stateOptions;
        //     });
        // };
        // let _callback = function(codes, rComponent, state) {
        //     console.log('codes', codes);
        //     console.log('rComponent', rComponent);
        //     console.log('state', state);
        //     console.log('setState', rComponent['setState']);
        //
        // };
        // _callback([1,2,3], this, {
        //     wallet: 'wallet',
        // });
        // this.props.wallet.addListener([EventCode.Wallet_Update], (target) => {
        //     // this.setState((state: WalletRComponentState) => {
        //     //     return {
        //     //         wallet: state.wallet,
        //     //     };
        //     // });
        //     _callback([EventCode.Wallet_Update], this, {
        //         wallet: 'wallet',
        //     });
        // });

        // let factory: any = {
        //     addListener: (target: EventSubscriberInterface, codes: string | string[], rComponent, stateOptions: string[]) => {
        //         target.addListener(codes, (target) => {
        //             rComponent.setState((state) => {
        //                 let _stateOptions = {};
        //                 for (let i = 0; i < stateOptions.length; i++) {
        //                     _stateOptions[stateOptions[i]] = state[stateOptions[i]];
        //                 }
        //                 console.log('factory rComponent.setState work');
        //
        //                 return _stateOptions;
        //             });
        //         });
        //     },
        // };
        // factory.addListener(this.props.wallet, [EventCode.Wallet_Update], this, ['wallet']);

        // let eventSystemFactory = this.props.container.get<EventSystemFactory>(ContainerID.EventSystemFactory);
        // eventSystemFactory.addRenderListener<WalletRComponent>(this.props.wallet, [EventCode.Wallet_AddCurrency, EventCode.Wallet_RemoveCurrency], this, ['wallet']);

        // EventSystem.addListener({
        //     codes: [
        //         EventCode.Wallet_AddCurrency,
        //         EventCode.Wallet_RemoveCurrency,
        //     ],
        //     listener: {
        //         callback: (target) => {
        //             this.setState((state) => {
        //                 return {
        //                     wallet: state.wallet,
        //                 };
        //             });
        //         },
        //     },
        // });
    }

    render() {
        let wallet = this.state.wallet;
        // let wallet = this.props.wallet;

        let result;
        wallet.render((options) => {
            result = (<span><span>{options.currency.id}</span>: {options.value}</span>);
        });
        // wallet.render2((options) => {
        //     result = (<span>Currency: {options.value()}</span>);
        // });

        return (
            <div>
                <span>{result}</span>
            </div>
        );
    }
}