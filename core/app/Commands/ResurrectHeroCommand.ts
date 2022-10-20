import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
import {assertNotNil} from '../../source/assert.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';

export default class ResurrectHeroCommand extends Command {
    get name(): string {
        return 'resurrect_hero';
    }

    configure() {
        super.configure();
        this.addArgument('hero_id', '', true);
    }

    async execute(input: Input) {
        let heroID = parseInt(input.getArgument('hero_id'), 10);
        let hero = this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).getOneByID(heroID);
        assertNotNil(hero);

        hero.get<HealthPointsComponent>(HealthPointsComponent.name).resurrect();
    }
}