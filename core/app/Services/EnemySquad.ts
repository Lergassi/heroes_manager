import debug from 'debug';
import _ from 'lodash';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import GameObject from '../../source/GameObject.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import HealthPoints from '../Components/HealthPoints.js';
import EnemyFactory from '../Factories/EnemyFactory.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';

/**
 * GameObject
 *
 */
export default class EnemySquad implements DamageControllerInterface, AttackControllerInterface {
    private readonly _enemyFactory: EnemyFactory;
    private readonly _squad: {enemyTypeID: EnemyTypeID, level: number, count: number, enemy: GameObject};

    get isDead(): boolean {
        return this._squad.count <= 0;
    }

    constructor(enemyTypeID: EnemyTypeID, level: number, count: number, enemyFactory: EnemyFactory) {
        assertNotNil(enemyTypeID);
        assertIsGreaterThanOrEqual(level, 1);
        assertIsGreaterThanOrEqual(count, 1);
        assertNotNil(enemyFactory);

        this._enemyFactory = enemyFactory;
        this._squad = {
            enemyTypeID: enemyTypeID,
            level: level,
            count: count,
            enemy: this._enemyFactory.createSquad(enemyTypeID, level),
        };
    }

    canDamage(): boolean {
        if (this._squad.count <= 0 || this._squad.count > 0 && _.isNil(this._squad.enemy)) {
            debug(DebugNamespaceID.Throw)('Отряд пустой.');
            return false;
        }

        return true;
    }

    damage(damage: number, rewardOptions?: RewardOptions): number {
        if (!this.canDamage()) {
            debug(DebugNamespaceID.Throw)('Объект не может получить урон.');
            return 0;
        }

        let resultDamage = this._squad.enemy.get<DamageControllerInterface>(ComponentID.DamageController).damage(damage, rewardOptions);

        if (this._squad.enemy.get<HealthPoints>(ComponentID.HealthPoints).isDead) {
            this._squad.count--;

            if (this._squad.count > 0) {
                this._squad.enemy = this._enemyFactory.createSquad(this._squad.enemyTypeID, this._squad.level);
                debug(DebugNamespaceID.Debug)('Создан новый враг в отряде. Врагов: ' + this._squad.count);
            } else {
                debug(DebugNamespaceID.Log)('Отряд умер.');
            }
        }

        return resultDamage;
    }

    attackTo(target: DamageControllerInterface, rewardOptions?: RewardOptions): number {
        console.log('attackTo');

        return 0;
    }
    canAttack(): boolean {
        return false;
    }
}

class EnemySquadDamageController implements DamageControllerInterface {
    canDamage(): boolean {
        return false;
    }

    damage(value: number, rewardOptions?: RewardOptions): number {
        return 0;
    }
}