import CharacterAttribute from './CharacterAttribute.js';
import ActionStateController from './ActionStateController.js';
import Endurance from './Endurance.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import _, {curryRight, round} from 'lodash';
import {assert, assertAction} from '../../source/assert.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import HeroActivityStateController, {HeroActivityStateCode} from './HeroActivityStateController.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import AppError from '../../source/Errors/AppError.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import EquipSlotInterface from "../Interfaces/EquipSlotInterface";

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
            debug(DebugNamespaceID.Throw)('Персонаж не может атаковать.');
            return 0;
        }

        //todo: Нет проверки возможности атаковать цель.
        let damage = this._attackPower.value;
        debug(DebugNamespaceID.Log)('Атака: ' + damage);
        let resultDamage = target.damage(damage, afterDiedTargetCallback);

        //todo: Перенести в другое место.
        this._endurance?.remove(this._options.enduranceForHit);
        // this._endurance?.remove(90);

        return resultDamage;
    }

    canAttack(): boolean {
        if (!this._actionStateController.canAction()) return false;

        if (this._rightHand?.isFree()) {
            debug(DebugNamespaceID.Throw)('У героя нет оружия.');
            return false;
        }

        return true;
    }
}