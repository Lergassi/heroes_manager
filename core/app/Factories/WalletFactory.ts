import GameObject from '../../source/GameObject.js';
import AutoIncrementIDGenerator from '../../source/AutoIncrementIDGenerator.js';
import WalletComponent from '../Components/WalletComponent.js';

export type WalletFactoryConfig = {

};

export default class WalletFactory {
    private readonly _idGenerator: AutoIncrementIDGenerator;
    private _config: WalletFactoryConfig;

    constructor(idGenerator: AutoIncrementIDGenerator, config: WalletFactoryConfig = {}) {
        this._idGenerator = idGenerator;
        this._config = config;
    }

    create(currency, value = 0) {
        let wallet = new GameObject(this._idGenerator.generateID());

        wallet.name = 'Wallet';
        wallet.addTags([
            '#wallet',
            '#wallet.' + currency.alias
        ]);

        wallet.addComponent(new WalletComponent(
            this._idGenerator.generateID(),
            wallet,
            currency,
            value,
        ));

        return wallet;
    }
}