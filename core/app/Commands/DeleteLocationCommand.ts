import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import MainLocationListComponent from '../Components/MainLocationListComponent.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';

export default class DeleteLocationCommand extends Command {
    get name(): string {
        return CommandNameID.delete_location;
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);

        this
            .container
            .get<MainLocationListComponent>(ContainerID.MainLocationList)
            .delete(
                this.container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByID(locationID),
                this.container.get<GameObjectStorage>(ContainerID.GameObjectStorage),
            );
    }
}