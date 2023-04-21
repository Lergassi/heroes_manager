import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import Location from '../Components/Location.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';

export default class ToggleLocationCommand extends Command {
    get name(): string {
        return CommandID.toggle_location;
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);    //todo: Можно сделать единую "точку входа" для однотипных команд.

        this.container
            .get<GameObjectStorage>(ServiceID.GameObjectStorage)
            .getOneByID(locationID)
            ?.get<Location>(ComponentID.Location)
            .toggleState();
    }
}