import CharacterAttribute from './CharacterAttribute.js';
import {unsigned} from '../../types/main.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import _, {curryRight, round} from 'lodash';
import {assert, assertAction} from '../../source/assert.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import CharacterStateController, {CharacterStateCode} from './CharacterStateController.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import AppError from '../../source/Errors/AppError.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {EnemyRewardOptions} from '../Interfaces/FightControllerInterface.js';

export default class AttackController implements AttackControllerInterface {
    private readonly _rangeSide: unsigned;
    private readonly _attackPowerCharacterAttribute: CharacterAttributeInterface;
    private readonly _stateController: CharacterStateController;

    constructor(
        attackPowerCharacterAttribute: CharacterAttributeInterface, //todo: Нужен дополнительная логика с числом для врагов.
        stateController: CharacterStateController,
    ) {
        assert(!_.isNil(attackPowerCharacterAttribute));
        assert(!_.isNil(stateController));
        // assert(options.attackPowerCharacterAttributeComponent instanceof CharacterAttributeComponent);
        // assert(options.attackPower instanceof CharacterAttributeValueCollector);
        // assert(!_.isNil(options.dependentCharacterAttributeComponents));

        this._rangeSide = 2;
        this._attackPowerCharacterAttribute = attackPowerCharacterAttribute;
        this._stateController = stateController;
    }

    /**
     * @deprecated Нужно сразу указывать диапазон без таких вычислений.
     */
    value(): {left: number; right: number} {
        let left = this._attackPowerCharacterAttribute.value() -
            round(this._rangeSide, 0)
        ;
        left = left < 0 ? 0 : left;

        let right = this._attackPowerCharacterAttribute.value() +
            round(this._rangeSide, 0)
            ;

        return {
            left: left,
            right: right,
        };
    }

    /**
     * @deprecated
     */
    generateAttack(): number {
        let value = this.value();

        return _.random(value.left, value.right);
    }

    canAttack(): boolean {
        return !this._stateController.hasState(CharacterStateCode.Dead);
    }

    attackTo(target: DamageControllerInterface, afterDiedTargetCallback?: EnemyRewardOptions): boolean {
        if (!this.canAttack()) {
            debug(DebugNamespaceID.Throw)('Персонаж не может атаковать.');
            return;
        }

        let damage = this.generateAttack();
        debug(DebugNamespaceID.Log)('Атака: ' + damage);
        target.takeDamage(damage, afterDiedTargetCallback);

        return true;
    }
}