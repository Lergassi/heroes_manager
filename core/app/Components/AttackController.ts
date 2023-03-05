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

export default class AttackController implements AttackControllerInterface {
    private readonly _rangeSide: number;  //todo: Диапазон должен быть задан, а не вычисляемым.
    private readonly _attackPower: CharacterAttributeInterface;
    private readonly _actionStateController: ActionStateController;
    /**
     * @dev Для врагов null до разделения логики для героев и для врагов.
     * @private
     */
    private readonly _endurance?: Endurance;

    constructor(
        attackPowerCharacterAttribute: CharacterAttributeInterface, //todo: Нужен дополнительная логика с числом для врагов.
        actionStateController: ActionStateController,
        endurance?: Endurance,
    ) {
        this._endurance = endurance;
        assert(!_.isNil(attackPowerCharacterAttribute));
        assert(!_.isNil(actionStateController));

        this._rangeSide = 2;
        this._attackPower = attackPowerCharacterAttribute;
        this._actionStateController = actionStateController;
    }

    // /**
    //  * @deprecated Нужно сразу указывать диапазон без таких вычислений.
    //  */
    // value(): {left: number; right: number} {
    //     let left = this._attackPower.finalValue -
    //         round(this._rangeSide, 0)
    //     ;
    //     left = left < 0 ? 0 : left;
    //
    //     let right = this._attackPower.finalValue +
    //         round(this._rangeSide, 0)
    //         ;
    //
    //     return {
    //         left: left,
    //         right: right,
    //     };
    // }

    attackTo(target: DamageControllerInterface, afterDiedTargetCallback?: RewardOptions): number {
        if (!this.canAttack()) {
            debug(DebugNamespaceID.Throw)('Персонаж не может атаковать.');
            return 0;
        }

        //todo: Нет проверки возможности атаковать цель.
        let damage = this._generateAttack();
        debug(DebugNamespaceID.Log)('Атака: ' + damage);
        let resultDamage = target.damage(damage, afterDiedTargetCallback);

        this._endurance?.remove(2);
        // this._endurance?.remove(90);

        return resultDamage;
    }

    canAttack(): boolean {
        return this._actionStateController.canAction();
    }

    private _generateAttack(): number {
        // let value = this.value();

        // return _.random(value.left, value.right);
        return this._attackPower.value;
    }
}