import WalletInterface from '../Interfaces/WalletInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import DebugApp from '../Services/DebugApp.js';

export default class GoldLootGenerator {
    private readonly _value: number;

    constructor(value: number) {
        this._value = value;
    }

    transfer(wallet: WalletInterface) {
        wallet.add(this._value);
        DebugApp.debug(DebugNamespaceID.Log)('Генерация золота в луте: ' + this._value);
    }
}