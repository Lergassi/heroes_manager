import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {assertNotNil} from '../../source/assert.js';
import HealthPoints from '../Components/HealthPoints.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';

export default class ResurrectHeroCommand extends Command {
    get name(): string {
        return CommandID.resurrect_hero;
    }

    configure() {
        super.configure();
        this.addArgument('hero_id', '', true);
    }

    async execute(input: Input) {
        let heroID = parseInt(input.getArgument('hero_id'), 10);
        let hero = this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(heroID);
        assertNotNil(hero);

        hero.get<HealthPoints>(ComponentID.HealthPoints).resurrect();
    }
}