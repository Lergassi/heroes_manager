import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {CommandID} from '../../types/enums/CommandID.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import {ComponentID} from '../../types/enums/ComponentID.js';

export default class AddGoldCommand extends Command {
    get name(): string {
        return CommandID.add_gold;
    }

    configure() {
        super.configure();
        this.addArgument('value', '', true);
    }

    async execute(input: Input) {
        let value = parseInt(input.getArgument('value'), 10);

        this
            .container
            .get<GameObjectStorage>(ServiceID.GameObjectStorage)
            ?.getOneByTag('#wallet.' + CurrencyID.Gold)
            ?.get<WalletInterface>(ComponentID.Wallet)
            .add(value)
        ;
    }
}