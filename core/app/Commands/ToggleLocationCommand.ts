import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import LocationComponent from '../Components/LocationComponent.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';

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
            .get<GameObjectStorage>(ContainerKey.GameObjectStorage)
            .getOneByID(locationID)
            ?.get<LocationComponent>(LocationComponent.name)
            .toggleState();
    }
}