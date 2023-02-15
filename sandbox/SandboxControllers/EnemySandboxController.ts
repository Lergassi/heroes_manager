import _CharacterFightGroup from '../../core/app/Components/FightLegacy/_CharacterFightGroup.js';
import EnemyFactory from '../../core/app/Factories/EnemyFactory.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import EnemySquadController from '../../core/app/Services/EnemySquadController.js';
import {EnemyTypeID} from '../../core/types/enums/EnemyTypeID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class EnemySandboxController extends AbstractSandboxController {
    run(): void {
        // this._devEnemyFactoryWithStrategy();
        this._devEnemySquad();
    }

    private _devEnemyFactoryWithStrategy() {
        let enemyFactory = this.container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let level = 1;
        let enemyTypeID = EnemyTypeID.EnemyType01;
        let enemy = enemyFactory.create(enemyTypeID, level);
    }

    private _devEnemySquad() {
        let enemyFactory = this.container.get<EnemyFactory>(ServiceID.EnemyFactory);``
        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);

        let heroFightGroup = new _CharacterFightGroup();
        heroFightGroup.addCharacter(heroFactory.create(HeroClassID.Warrior, 1));
        heroFightGroup.addCharacter(heroFactory.create(HeroClassID.Warrior, 1));
        heroFightGroup.addCharacter(heroFactory.create(HeroClassID.Warrior, 1));
        heroFightGroup.addCharacter(heroFactory.create(HeroClassID.Warrior, 1));
        console.log(heroFightGroup);

        let enemySquadController = new EnemySquadController(
            enemyFactory,
        );

        enemySquadController.createSquad(EnemyTypeID.EnemyType01, 1, 10);
        enemySquadController.createSquad(EnemyTypeID.EnemyType02, 1, 10);
        console.log(enemySquadController);

        heroFightGroup.attackTo(enemySquadController.fightGroup);
        console.log('-'.repeat(32));
        enemySquadController.fightGroup.attackTo(heroFightGroup);
        console.log('-'.repeat(32));
        console.log('-'.repeat(32));
    }
}