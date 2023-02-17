import FightController from '../../core/app/Components/FightController.js';
import FightGroupController from '../../core/app/Components/FightGroupController.js';
import EnemyFactory from '../../core/app/Factories/EnemyFactory.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import {EnemyTypeID} from '../../core/types/enums/EnemyTypeID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';
import _ from 'lodash';

export default class EnemySandboxController extends AbstractSandboxController {
    run(): void {
        // this._devEnemyFactoryWithStrategy();
        this._devEnemySquad();
    }

    private _devEnemyFactoryWithStrategy() {
        let enemyFactory = this.container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let level = 1;
        let enemyTypeID = EnemyTypeID.EnemyType01;
        let enemy = enemyFactory.createSquad(enemyTypeID, level);
    }

    private _devEnemySquad() {
        let enemyFactory = this.container.get<EnemyFactory>(ServiceID.EnemyFactory);``
        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);

        let heroes = [
            heroFactory.create(HeroClassID.Warrior, 1),
            heroFactory.create(HeroClassID.Barbarian, 1),
            heroFactory.create(HeroClassID.Gunslinger, 1),
            heroFactory.create(HeroClassID.FireMage, 1),
            heroFactory.create(HeroClassID.Support1, 1),
        ];

        let enemies = [
            enemyFactory.createSquad(EnemyTypeID.Boar, 1),
            enemyFactory.createSquad(EnemyTypeID.Boar, 1),
            enemyFactory.createSquad(EnemyTypeID.Boar, 1),
            enemyFactory.createSquad(EnemyTypeID.Boar, 1),
            enemyFactory.createSquad(EnemyTypeID.Boar, 1),
        ];

        let heroFightGroupController = new FightGroupController();
        let enemyFightGroupController = new FightGroupController({
            deleteDeadCharacter: true,
        });
        let fightController = new FightController(heroFightGroupController, enemyFightGroupController);

        heroFightGroupController.addCharacter(heroes[0]);
        heroFightGroupController.addCharacter(heroes[1]);
        heroFightGroupController.addCharacter(heroes[2]);

        enemyFightGroupController.addCharacter(enemies[0]);

        // let squad = new EnemySquad(
        //     EnemyTypeID.Boar,
        //     1,
        //     10,
        //     enemyFactory,
        // );

        // fightController.fight();

        let hits = 50;
        _.forEach(_.range(0, hits), (item) => {
            // squad.damage(50);
            // squad.attackTo(heroes[0].get<DamageControllerInterface>(ComponentID.DamageController));
            fightController.fight();
        });
    }
}