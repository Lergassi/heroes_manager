import Input from '../../source/GameConsole/Input.js';
import Command from '../../source/GameConsole/Command.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {assert, assertNotNil} from '../../source/assert.js';
import _ from 'lodash';
import Location from '../Components/Location.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';

export default class AddHeroToLocationCommand extends Command {
    get name(): string {
        return CommandID.add_hero_to_location;
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
        this.addArgument('hero_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);
        let heroID = parseInt(input.getArgument('hero_id'), 10);

        let location = this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(locationID);
        let hero = this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(heroID);

        assertNotNil(location);
        assertNotNil(hero);

        location
            ?.get<Location>(ComponentID.Location)
            .addHero(hero);
    }
}