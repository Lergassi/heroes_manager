import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';

export default class DeleteHeroCommand extends Command {
    get name(): string {
        return 'delete_hero';
    }

    configure() {
        super.configure();
        this.addArgument('hero_id', '', true);
    }

    async execute(input: Input) {
        //todo: Где то должна происходить проверка возможности полностью удалить героя.
        let heroId = parseInt(input.getArgument('hero_id'));

        let hero = this.container.get<GameObjectStorage>('player.gameObjectStorage').getOneByID(heroId);

        this.container.get<MainHeroListComponent>('player.heroesListComponent').deleteHero(hero, this.container.get<GameObjectStorage>('player.gameObjectStorage'));
        // this.container.get<GameObjectStorage>('player.gameObjectStorage').remove(hero);
    }
}