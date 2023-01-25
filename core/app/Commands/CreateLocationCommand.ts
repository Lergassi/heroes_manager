import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import MainLocationList from '../Components/MainLocationList.js';
import LocationFactory from '../Factories/LocationFactory.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';

export default class CreateLocationCommand extends Command {
    get name(): string {
        return CommandID.create_location;
    }

    configure() {
        super.configure();

        this.addArgument('level', '', false, '1');
    }

    async execute(input: Input) {
        let level = parseInt(input.getArgument('level'), 10);

        let mainLocationList = this.container.get<MainLocationList>(ServiceID.MainLocationList);
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);

        mainLocationList.create(
            level,
            locationFactory,
        );
    }
}