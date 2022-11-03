import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import {ComponentID} from '../../types/enums/ComponentID.js';

export default class AddGoldCommand extends Command {
    get name(): string {
        return CommandNameID.add_gold;
    }

    configure() {
        super.configure();
        this.addArgument('value', '', true);
    }

    async execute(input: Input) {
        let value = parseInt(input.getArgument('value'), 10);

        this
            .container
            .get<GameObjectStorage>(ContainerID.GameObjectStorage)
            ?.getOneByTag('#wallet.' + CurrencyID.Gold)
            ?.get<WalletInterface>(ComponentID.Wallet)
            .add(value)
        ;
    }
}