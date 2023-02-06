import {database} from '../../core/data/ts/database.js';
import {EnemyTypeID} from '../../core/types/enums/EnemyTypeID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class DatabaseTSSandboxController extends AbstractSandboxController {
    run(): void {
        this._getStarted();
    }

    private _getStarted() {
        let ID = EnemyTypeID.EnemyType01;
        let level = 1;
        let enemyLoot = database.enemies.loot.find(ID);
        console.log(enemyLoot);
    }
}