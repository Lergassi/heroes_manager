import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import Wallet from '../../../core/app/Components/Wallet.js';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface.js';
import {assert, assertNotNil} from '../../../core/source/assert.js';

export interface WalletRC2Props {
    // currency: number;
    // wallet: WalletComponent;
}

export interface WalletRC2State {
    value: number;
    // wallet: WalletComponent;
}

export default class WalletRC2 extends React.Component<WalletRC2Props, WalletRC2State> {
    private _target: Wallet;

    constructor(props: WalletRC2Props) {
        super(props);

        this.state = {
            // value: props.value,
            // wallet: null,
            value: 0,
        };
        // window['_walletrc2'] = this;
    }

    // updateValue(target, value) {
    updateValue(value) {
        // console.log('this._target', this._target);
        // console.log('target', target);
        // assertNotNil(this._target, 'Объект не прикреплен.');
        // assert(this._target && this._target === target);

        // console.log('WalletRC2.setValue', value);
        this.setState({
            value: value,
        });
    }

    // add(value) {
    //     this._target?.add(value);
    // }

    // remove() {
    //     this._target.remove();
    // }


    attach(target: Wallet) {
    // attach(target: AttachInterface) {
        if (this._target && this._target !== target) {
            // this._target.detach();
            // this.detach();
        }

        if (this._target && this._target === target) return;

        this._target = target;
        // target.attach(this);
        console.log('окно открывается');
    }

    detach() {
        if (!this._target) return;

        // this._target.detach();
        this._target = null;
        console.log('окно закрывается');
    }

    render() {
        // if (!this.state.wallet) return <div>Кошелек не установлен.</div>
        // if (!this.state.value) return <div>Кошелек не установлен.</div>

        return (
            <div>
                <div>WalletRC2</div>
                {/*Значение: {this.state.value}*/}
                {/*Значение: {this.state.wallet}*/}
                Золото: {this.state.value}
            </div>
        );
    }
}