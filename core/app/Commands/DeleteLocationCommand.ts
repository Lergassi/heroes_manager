import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import MainLocationList from '../Components/MainLocationList.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';

export default class DeleteLocationCommand extends Command {
    get name(): string {
        return CommandID.delete_location;
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);

        this
            .container
            .get<MainLocationList>(ServiceID.MainLocationList)
            .delete(
                this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(locationID),
                this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage),
            );
    }
}