import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import HealthPoints from './HealthPoints.js';
import DebugApp from '../Services/DebugApp.js';

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

    damage(damage: number, rewardOptions?: RewardOptions): number {
        let resultDamage = this._healthPoints.damage(damage, rewardOptions);

        if (this._healthPoints.isDead) {
            this._count--;
            DebugApp.debug(DebugNamespaceID.Log)('Умер враг в отряде, остаток: ' + this._count);
            if (this._count > 0) {
                this._healthPoints.resurrect();
            }
        }

        return resultDamage;
    }

    canDamage(): boolean {
        if (this._count <= 0) {
            DebugApp.debug(DebugNamespaceID.Log)('Отряд мёрт.');
            return false;
        }

        if (this._healthPoints.isDead) {
            DebugApp.debug(DebugNamespaceID.Error)('Враг в отряде мертвый.');
            return false;
        }

        return false;
    }

    renderByRequest(ui: SquadDamageControllerRenderInterface): void {
        ui.updateCount?.(this._count);
    }
}