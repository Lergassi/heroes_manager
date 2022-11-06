import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {assertNotNil} from '../../source/assert.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import {CommandID} from '../../types/enums/CommandID.js';

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
        let hero = this.container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByID(heroID);
        assertNotNil(hero);

        hero.get<HealthPointsComponent>(HealthPointsComponent.name).resurrect();
    }
}