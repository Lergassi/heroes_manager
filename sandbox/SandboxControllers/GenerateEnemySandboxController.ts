import ItemStorage from '../../core/app/Components/ItemStorages/ItemStorage.js';
import Experience from '../../core/app/Components/Experience.js';
import HealthPoints from '../../core/app/Components/HealthPoints.js';
import Wallet from '../../core/app/Components/Wallet.js';
import EnemyFactory from '../../core/app/Factories/EnemyFactory.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {ComponentID} from '../../core/types/enums/ComponentID.js';
import {EnemyTypeID} from '../../core/types/enums/EnemyTypeID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class GenerateEnemySandboxController extends AbstractSandboxController {
    run(): void {
        this._getStarted();
    }

    private _getStarted() {
        let enemyFactory = this.container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let enemy = enemyFactory.createSquad(EnemyTypeID.EnemyType01, 1);
        console.log(enemy);

        let itemStorage = new ItemStorage(20, this.container.get<EntityManagerInterface>(ServiceID.EntityManager));
        let wallet = new Wallet();
        let exp = new Experience(1, 100);
        enemy.get<HealthPoints>(ComponentID.HealthPoints).kill({
            itemStorage: itemStorage,
            wallet: wallet,
            experienceDistributor: exp,
        });
    }
}