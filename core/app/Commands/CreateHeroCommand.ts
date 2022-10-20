import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import HeroClass from '../Entities/HeroClass.js';
import HeroFactory from '../Factories/HeroFactory.js';
import EntityManager from '../../source/EntityManager.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';
import {unsigned} from '../types.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';

export default class CreateHeroCommand extends Command {
    get name(): string {
        return CommandNameID.create_hero;
    }

    configure() {
        super.configure();
        this.addArgument('alias', '', true);
        this.addArgument('level', '', false, 1);
    }

    async execute(input: Input) {
        let heroClassAlias: string = input.getArgument('alias');
        let level: unsigned = parseInt(input.getArgument('level'), 10);

        let heroClass: HeroClass = this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>('HeroClass').getOneByAlias(heroClassAlias);

        this.container.get<MainHeroListComponent>(ContainerKey.MainHeroListComponent).createHero({
            heroClass: heroClass,
            level: level,
            heroFactory: this.container.get<HeroFactory>(ContainerKey.HeroFactory),
        });
    }
}