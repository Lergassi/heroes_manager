import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import HeroClass from '../Entities/HeroClass.js';
import HeroFactory from '../Factories/HeroFactory.js';
import GameObject from '../../source/GameObject.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import EntityManager from '../../source/EntityManager.js';
import Security from '../../../server/source/Security.js';

export default class CreateHeroCommand extends Command {
    get name(): string {
        return 'create_hero';
    }
    configure() {
        super.configure();
        this.addArgument('hero_class_alias', '', true);
        this.addArgument('level', '', false, 1);
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsPlayerLoaded();

        let heroClassAlias: string = input.getArgument('hero_class_alias');
        let heroClass: HeroClass = this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>('HeroClass').getOneByAlias(heroClassAlias);

        let heroFactory: HeroFactory = this.container.get<HeroFactory>('player.heroFactory');

        let hero: GameObject = heroFactory.create(heroClass);
        this.container.get<GameObjectStorage>('player.gameObjectStorage').add(hero);
    }
}