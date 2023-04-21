import ActionStateController from './ActionStateController.js';
import Endurance from './Endurance.js';
import _ from 'lodash';
import {assert} from '../../source/assert.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface';
import DebugApp from '../Services/DebugApp.js';

export default class AttackController implements AttackControllerInterface {
    private readonly _attackPower: CharacterAttributeInterface;
    private readonly _actionStateController: ActionStateController;

    private readonly _options = {
        enduranceForHit: 1,
    };

    /**
     * @dev Для врагов null до разделения логики для героев и для врагов.
     * @private
     */
    private readonly _endurance?: Endurance;

    /**
     * @dev Для врагов null до разделения логики для героев и для врагов.
     * @private
     */
    private readonly _rightHand?: EquipSlotInterface;

    constructor(
        attackPowerCharacterAttribute: CharacterAttributeInterface, //todo: Нужен дополнительная логика с числом для врагов.
        actionStateController: ActionStateController,
        rightHand?: EquipSlotInterface,
        endurance?: Endurance,
    ) {
        assert(!_.isNil(attackPowerCharacterAttribute));
        assert(!_.isNil(actionStateController));

        this._attackPower = attackPowerCharacterAttribute;
        this._actionStateController = actionStateController;
        this._rightHand = rightHand;
        this._endurance = endurance;
    }

    attackTo(target: DamageControllerInterface, afterDiedTargetCallback?: RewardOptions): number {
        if (!this.canAttack()) {
            DebugApp.debug(DebugNamespaceID.Throw)('Персонаж не может атаковать.');
            return 0;
        }

        //todo: Нет проверки возможности атаковать цель.
        let damage = this._attackPower.value;
        DebugApp.debug(DebugNamespaceID.Log)('Атака: ' + damage);
        let resultDamage = target.damage(damage, afterDiedTargetCallback);

        //todo: Перенести в другое место.
        // this._endurance?.remove(this._options.enduranceForHit);

        return resultDamage;
    }

    canAttack(): boolean {
        if (!this._actionStateController.canAction()) return false;

        if (this._rightHand?.isFree()) {
            DebugApp.debug(DebugNamespaceID.Throw)('У героя нет оружия.');
            return false;
        }

        return true;
    }
}