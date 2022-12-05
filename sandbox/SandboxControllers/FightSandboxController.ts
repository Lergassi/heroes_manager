import AbstractSandboxController from './AbstractSandboxController.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import {ContainerID} from '../../core/types/enums/ContainerID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import EnemyFactory from '../../core/app/Factories/EnemyFactory.js';
import {EnemyID} from '../../core/types/enums/EnemyID.js';
import FightController from '../../core/app/Components/FightController.js';

export default class FightSandboxController extends AbstractSandboxController {
    run(): void {
        let heroes = [
            this.container.get<HeroFactory>(ContainerID.HeroFactory).create(HeroClassID.Warrior, 1),
            this.container.get<HeroFactory>(ContainerID.HeroFactory).create(HeroClassID.Rogue, 1),
            this.container.get<HeroFactory>(ContainerID.HeroFactory).create(HeroClassID.Gunslinger, 1),
            this.container.get<HeroFactory>(ContainerID.HeroFactory).create(HeroClassID.FireMage, 1),
            this.container.get<HeroFactory>(ContainerID.HeroFactory).create(HeroClassID.Priest, 1),
        ];
        console.log(heroes);

        let enemies = [
            this.container.get<EnemyFactory>(ContainerID.EnemyFactory).create(EnemyID.Bear, 1),
            this.container.get<EnemyFactory>(ContainerID.EnemyFactory).create(EnemyID.Bear, 1),
            this.container.get<EnemyFactory>(ContainerID.EnemyFactory).create(EnemyID.Bear, 1),
            this.container.get<EnemyFactory>(ContainerID.EnemyFactory).create(EnemyID.Bear, 1),
            this.container.get<EnemyFactory>(ContainerID.EnemyFactory).create(EnemyID.Bear, 1),
        ];
        console.log(enemies);

        // let fightController = new FightController();
    }
}