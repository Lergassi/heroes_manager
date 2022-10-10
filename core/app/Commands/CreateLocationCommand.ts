import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {ContainerKey} from '../consts.js';
import MainLocationListComponent from '../Components/MainLocationListComponent.js';
import LocationFactory from '../Factories/LocationFactory.js';
import {unsigned} from '../types.js';
import ExperienceComponent from '../Components/ExperienceComponent.js';
import LevelRange from '../LevelRange.js';

export default class CreateLocationCommand extends Command {
    get name(): string {
        return 'create_location';
    }

    configure() {
        super.configure();

        // this.addArgument('min_level', '', true);
        // this.addArgument('max_level', '', true);
        this.addArgument('level', '', true);
    }

    async execute(input: Input) {
        // let minLevel = parseInt(input.getArgument('min_level'), 10);
        // let maxLevel = parseInt(input.getArgument('max_level'), 10);
        let level = parseInt(input.getArgument('level'), 10);

        let mainLocationListComponent = this.container.get<MainLocationListComponent>(ContainerKey.MainLocationListComponent);
        let locationFactory = this.container.get<LocationFactory>(ContainerKey.LocationFactory);

        mainLocationListComponent.create({
            level: level,
        }, locationFactory);
    }
}