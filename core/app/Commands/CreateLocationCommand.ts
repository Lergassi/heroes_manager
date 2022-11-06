import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import MainLocationListComponent from '../Components/MainLocationListComponent.js';
import LocationFactory from '../Factories/LocationFactory.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {CommandID} from '../../types/enums/CommandID.js';

export default class CreateLocationCommand extends Command {
    get name(): string {
        return CommandID.create_location;
    }

    configure() {
        super.configure();

        this.addArgument('level', '', true);
    }

    async execute(input: Input) {
        let level = parseInt(input.getArgument('level'), 10);

        let mainLocationList = this.container.get<MainLocationListComponent>(ContainerID.MainLocationList);
        let locationFactory = this.container.get<LocationFactory>(ContainerID.LocationFactory);

        mainLocationList.create(
            level,
            locationFactory,
        );
    }
}