import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {ContainerKey} from '../consts.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import LocationComponent from '../Components/LocationComponent.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';

export default class GetItemsFromLocationCommand extends Command {
    get name(): string {
        return 'location.get_items';
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);

        this
            .container.get<GameObjectStorage>(ContainerKey.GameObjectStorage)
            .getOneByID(locationID)
            ?.get<LocationComponent>('locationComponent')
            ?.moveItems(this.container.get<ItemStorageManager>(ContainerKey.ItemStorageManager))
        ;
    }
}