import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import MainLocationListComponent from '../Components/MainLocationListComponent.js';
import {ContainerKey} from '../../types/containerKey.js';

export default class DeleteLocationCommand extends Command {
    get name(): string {
        return 'location.delete';
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);

        this
            .container
            .get<MainLocationListComponent>(ContainerKey.MainLocationListComponent)
            .delete(
                this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).getOneByID(locationID),
                this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage),
            );
    }
}