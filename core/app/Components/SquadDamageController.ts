import _ from 'lodash';
import debug from 'debug';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import {FightGroupControllerInterface} from '../Interfaces/FightGroupControllerInterface.js';
import CharacterAttribute from './CharacterAttribute.js';
import HealthPoints from './HealthPoints.js';
import LifeStateController from './LifeStateController.js';

//todo: Перенести в отряд.
export interface SquadDamageControllerRenderInterface {
    updateCount?(count: number): void;
}

export default class SquadDamageController implements DamageControllerInterface {
    private readonly _healthPoints: HealthPoints;
    private _count: number;

    constructor(
        healthPoints: HealthPoints,
        count: number,
    ) {
        assertNotNil(healthPoints);
        assertIsGreaterThanOrEqual(count, 1);

        this._healthPoints = healthPoints;
        this._count = count;
    }

    canDamage(): boolean {
        if (this._count <= 0) {
            debug(DebugNamespaceID.Log)('Отряд мёрт.');
            return false;
        }

        if (this._healthPoints.isDead) {
            debug(DebugNamespaceID.Error)('Враг в отряде мертвый.');
            return false;
        }

        return false;
    }

    damage(damage: number, rewardOptions?: RewardOptions): number {
        let resultDamage = this._healthPoints.damage(damage, rewardOptions);

        if (this._healthPoints.isDead) {
            this._count--;
            debug(DebugNamespaceID.Log)('Умер враг в отряде, остаток: ' + this._count);
            if (this._count > 0) {
                this._healthPoints.resurrect();
            }
        }

        return resultDamage;
    }

    renderByRequest(ui: SquadDamageControllerRenderInterface): void {
        ui.updateCount?.(this._count);
    }
}