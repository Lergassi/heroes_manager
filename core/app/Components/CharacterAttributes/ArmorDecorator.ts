import CharacterAttribute from '../CharacterAttribute.js';
import {float, integer, unsigned} from '../../../types/main.js';
import _ from 'lodash';
import {assert, assertNotNil, assertIsPositive} from '../../../source/assert.js';
import HealthPoints from '../HealthPoints.js';
import DamageControllerInterface from '../../Interfaces/DamageControllerInterface.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import CharacterAttributeInterface from '../../Decorators/CharacterAttributeInterface.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';

export default class ArmorDecorator implements DamageControllerInterface {
    private readonly _healthPoints: DamageControllerInterface;
    private readonly _protection: CharacterAttributeInterface;
    private readonly _maxProtection: float;
    private readonly _onePercentArmorProtectionValue: integer;   //Каждые n брони = 1% блокировки.

    constructor(
        healthPoints: DamageControllerInterface,
        protection: CharacterAttributeInterface,
    ) {
        assertNotNil(healthPoints);
        assertNotNil(protection);

        this._maxProtection = 0.5;
        this._onePercentArmorProtectionValue = 10;
        this._healthPoints = healthPoints;
        this._protection = protection;
    }

    //todo: Далее можно сделать механику модификации урона в виде цепочки или декораторов .damage(42) где урон проходит через все привязаные методы.
    //todo: Если урон < 10, то логика защиты практически не работает. Рашить далее.
    takeDamage(damage: unsigned, afterDiedCallback?): void {
        assertIsPositive(damage);

        let protectDamage = _.ceil(+((damage * this._calcProtectionModifier()).toFixed(4)), 0);
        let finalDamage = damage - protectDamage;

        //todo: Нужно решить задачу с сообщением и расчетами. Если герой мертвый, то нанести урон нельзя и расчеты сделаны зря. А после урона вывести сообщение нельзя иначе сначала будет сообщение об уроне, а потом про блокировку. Можно вообще не выводить сообщения. И сообщения только для разработчика. Для пользователя можно сделать другую систему сообщений с передачей через метод.
        //todo: Или можно сделать отдельный класс для урона и методы для уменьшения урона. И в конце будет метод print() и метод печатает блокированный урон и сколько дошло до цели.
        debug(DebugNamespaceID.Log)(sprintf('Блокировано урона (%f): %d/%d.', this._calcProtectionModifier(), damage - finalDamage, damage));
        this._healthPoints.takeDamage(finalDamage, afterDiedCallback);
    }

    private _calcProtectionModifier(): number {
        let protection = +(this._protection.finalValue / this._onePercentArmorProtectionValue / 100).toFixed(4);

        return protection <= this._maxProtection ? protection : this._maxProtection;
    }

    canTakeDamage(): boolean {
        return this._healthPoints.canTakeDamage();
    }
}