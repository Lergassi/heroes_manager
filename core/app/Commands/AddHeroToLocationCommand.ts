import Input from '../../source/GameConsole/Input.js';
import Command from '../../source/GameConsole/Command.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {assert} from '../../source/assert.js';
import _ from 'lodash';
import LocationComponent from '../Components/LocationComponent.js';
import {ContainerKey} from '../../types/containerKey.js';

export default class AddHeroToLocationCommand extends Command {
    get name(): string {
        return 'location.add_hero';
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
        this.addArgument('hero_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);
        let heroID = parseInt(input.getArgument('hero_id'), 10);

        let hero = this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).getOneByID(heroID);
        let location = this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).getOneByID(locationID);

        location
            ?.get<LocationComponent>('locationComponent').addHero(hero);
    }
}