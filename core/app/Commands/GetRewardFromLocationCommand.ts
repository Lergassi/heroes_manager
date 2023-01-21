import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import Location from '../Components/Location.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import Wallet from '../Components/Wallet.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import WalletInterface from '../Interfaces/WalletInterface.js';

export default class GetRewardFromLocationCommand extends Command {
    get name(): string {
        return CommandID.get_reward_from_location;
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);

        // this
        //     .container.get<GameObjectStorage>(ContainerID.GameObjectStorage)
        //     .getOneByID(locationID)
        //     ?.get<LocationComponent>(LocationComponent.name)
        //     ?.moveItems(this.container.get<ItemStorageManager>(ContainerID.ItemStorageManager))
        // ;
        this
            .container.get<GameObjectStorage>(ServiceID.GameObjectStorage)
            .getOneByID(locationID)
            ?.get<Location>(ComponentID.Location)
            ?.getReward({
                // itemStorage: this.container.get<ItemStorageManager>(ContainerID.ItemStorageManager),
                itemStorage: this.container.get<ItemStorageInterface>(ServiceID.ItemStorageController),
                wallet: this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByTag('#wallet').get<WalletInterface>(ComponentID.Wallet),
            })
        ;
    }
}