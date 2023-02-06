import AbstractSandboxController from './AbstractSandboxController.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import EnemyFactory from '../../core/app/Factories/EnemyFactory.js';
import {EnemyTypeID} from '../../core/types/enums/EnemyTypeID.js';
import FightController from '../../core/app/Components/FightController.js';

export default class FightSandboxController extends AbstractSandboxController {
    run(): void {
        let heroes = [
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1),
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Rogue, 1),
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Gunslinger, 1),
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.FireMage, 1),
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Priest, 1),
        ];
        console.log(heroes);

        let enemies = [
            this.container.get<EnemyFactory>(ServiceID.EnemyFactory).create(EnemyTypeID.Bear, 1),
            this.container.get<EnemyFactory>(ServiceID.EnemyFactory).create(EnemyTypeID.Bear, 1),
            this.container.get<EnemyFactory>(ServiceID.EnemyFactory).create(EnemyTypeID.Bear, 1),
            this.container.get<EnemyFactory>(ServiceID.EnemyFactory).create(EnemyTypeID.Bear, 1),
            this.container.get<EnemyFactory>(ServiceID.EnemyFactory).create(EnemyTypeID.Bear, 1),
        ];
        console.log(enemies);

        // let fightController = new FightController();
    }
}