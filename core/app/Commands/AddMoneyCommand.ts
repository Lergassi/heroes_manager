import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import WalletInterface from '../Interfaces/WalletInterface.js';

export default class AddMoneyCommand extends Command {
    get name(): string {
        return CommandID.add_money;
    }

    configure() {
        super.configure();
        this.addArgument('value', '', true);
    }

    async execute(input: Input) {
        let value = parseInt(input.getArgument('value'), 10);

        this
            .container
            .get<WalletInterface>(ServiceID.Wallet)
            ?.add(value)
        ;
    }
}