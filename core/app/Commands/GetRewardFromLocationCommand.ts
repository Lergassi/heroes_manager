import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import LocationComponent from '../Components/LocationComponent.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import WalletComponent from '../Components/WalletComponent.js';

export default class GetRewardFromLocationCommand extends Command {
    get name(): string {
        return CommandNameID.get_reward_from_location;
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
            .container.get<GameObjectStorage>(ContainerID.GameObjectStorage)
            .getOneByID(locationID)
            ?.get<LocationComponent>(LocationComponent.name)
            ?.getReward({
                itemStorage: this.container.get<ItemStorageManager>(ContainerID.ItemStorageManager),
                wallet: this.container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByTag('#wallet.' + CurrencyID.Gold).get<WalletComponent>(WalletComponent.name),
            })
        ;
    }
}