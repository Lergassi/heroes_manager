import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import LocationComponent from '../Components/LocationComponent.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import WalletComponent from '../Components/WalletComponent.js';
import {ComponentID} from '../../types/enums/ComponentID.js';

export default class ToggleLocationCommand extends Command {
    get name(): string {
        return CommandNameID.toggle_location;
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);    //todo: Можно сделать единую "точку входа" для однотипных команд.

        this.container
            .get<GameObjectStorage>(ContainerID.GameObjectStorage)
            .getOneByID(locationID)
            ?.get<LocationComponent>(LocationComponent.name)
            .toggleState({
                wallet: this.container
                    .get<GameObjectStorage>(ContainerID.GameObjectStorage)
                    .getOneByTag('#wallet.' + CurrencyID.Gold)
                    .get<WalletInterface>(ComponentID.Wallet)
            });
    }
}