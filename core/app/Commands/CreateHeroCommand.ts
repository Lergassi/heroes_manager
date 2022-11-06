import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import HeroClass from '../Entities/HeroClass.js';
import HeroFactory from '../Factories/HeroFactory.js';
import EntityManager from '../../source/EntityManager.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';
import {unsigned} from '../../types/main.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {EntityID} from '../../types/enums/EntityID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';

export default class CreateHeroCommand extends Command {
    get name(): string {
        return CommandID.create_hero;
    }

    configure() {
        super.configure();
        this.addArgument('hero_class_ID', '', true);
        this.addArgument('level', '', false, 1);
    }

    async execute(input: Input) {
        let heroClassID = input.getArgument('hero_class_ID');
        let level = parseInt(input.getArgument('level'), 10);

        let heroClass: HeroClass = this.container.get<EntityManagerInterface>(ContainerID.EntityManager).get<HeroClass>(EntityID.HeroClass, heroClassID);

        this.container.get<MainHeroListComponent>(ContainerID.MainHeroList).createHero(
            heroClass,
            level,
            this.container.get<HeroFactory>(ContainerID.HeroFactory),
        );
    }
}