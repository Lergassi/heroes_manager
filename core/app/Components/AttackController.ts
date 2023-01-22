import CharacterAttribute from './CharacterAttribute.js';
import {unsigned} from '../../types/main.js';
import LifeStateController from './LifeStateController.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import _, {curryRight, round} from 'lodash';
import {assert, assertAction} from '../../source/assert.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import HeroActivityStateController, {CharacterActivityStateCode} from './HeroActivityStateController.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import AppError from '../../source/Errors/AppError.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';

export default class AttackController implements AttackControllerInterface {
    private readonly _rangeSide: unsigned;  //todo: Диапазон должен быть задан, а не вычисляемым.
    private readonly _attackPowerCharacterAttribute: CharacterAttributeInterface;
    private readonly _lifeStateController: LifeStateController;

    constructor(
        attackPowerCharacterAttribute: CharacterAttributeInterface, //todo: Нужен дополнительная логика с числом для врагов.
        stateController: LifeStateController,
    ) {
        assert(!_.isNil(attackPowerCharacterAttribute));
        assert(!_.isNil(stateController));
        // assert(options.attackPowerCharacterAttributeComponent instanceof CharacterAttributeComponent);
        // assert(options.attackPower instanceof CharacterAttributeValueCollector);
        // assert(!_.isNil(options.dependentCharacterAttributeComponents));

        this._rangeSide = 2;
        this._attackPowerCharacterAttribute = attackPowerCharacterAttribute;
        this._lifeStateController = stateController;
    }

    /**
     * @deprecated Нужно сразу указывать диапазон без таких вычислений.
     */
    value(): {left: number; right: number} {
        let left = this._attackPowerCharacterAttribute.finalValue -
            round(this._rangeSide, 0)
        ;
        left = left < 0 ? 0 : left;

        let right = this._attackPowerCharacterAttribute.finalValue +
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
        return this._lifeStateController.canAction();
    }

    attackTo(target: DamageControllerInterface, afterDiedTargetCallback?: RewardOptions): boolean {
        if (!this.canAttack()) {
            debug(DebugNamespaceID.Throw)('Персонаж не может атаковать.');
            return false;
        }

        let damage = this.generateAttack();
        debug(DebugNamespaceID.Log)('Атака: ' + damage);
        target.takeDamage(damage, afterDiedTargetCallback);

        return true;
    }
}