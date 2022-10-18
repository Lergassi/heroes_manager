import CharacterAttribute from '../CharacterAttribute.js';
import {float, integer, unsigned} from '../../types.js';
import _ from 'lodash';
import {assert, assertNotNil, assertPositive} from '../../../source/assert.js';
import HealthPointsComponent from '../HealthPointsComponent.js';
import DamageControllerInterface from '../../Interfaces/DamageControllerInterface.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import CharacterAttributeInterface from '../../Decorators/CharacterAttributeInterface.js';

//@decorator
export default class ArmorDecorator implements DamageControllerInterface {
// export default class Armor {
    // private readonly _healthPoints: DamageInterface;
    private readonly _healthPoints: DamageControllerInterface;
    // private readonly _protection: CharacterAttribute;
    private readonly _protection: CharacterAttributeInterface;
    private readonly _maxProtection: float;
    private readonly _onePercentArmorProtectionValue: integer;   //Каждые n брони = 1% блокировки.

    // private _default: {
    //     maxProtection: float;
    // } = {
    //     maxProtection: 0.3,
    // };

    constructor(
        healthPoints: DamageControllerInterface,
        // protection: CharacterAttribute,
        protection: CharacterAttributeInterface,
        // options?: {
        //
        // },
    ) {
        assertNotNil(healthPoints);
        assertNotNil(protection);
        this._healthPoints = healthPoints;
        this._protection = protection;

        // this._maxProtection = options?.maxProtection || this._default.maxProtection;
        this._maxProtection = 0.5;
        this._onePercentArmorProtectionValue = 10;
    }

    //todo: Далее можно сделать механику модификации урона в виде цепочки или декораторов .damage(42) где урон проходит через все привязаные методы.
    //todo: Если урон < 10, то логика защиты практически не работает. Рашить далее.
    // finalDamage(damage: unsigned): void {
    // damage(damage: unsigned): number {
    damage(damage: unsigned): void {
        assertPositive(damage);

        // let protectDamage = +((damage * this._calcProtectionModifier()).toFixed(4));
        let protectDamage = _.ceil(+((damage * this._calcProtectionModifier()).toFixed(4)), 0);
        // console.log('protectDamage', protectDamage);
        let finalDamage = damage - protectDamage;

        //todo: Нужно решить задачу с сообщением и расчетами. Если герой мертвый, то нанести урон нельзя и расчеты сделаны зря. А после урона вывести сообщение нельзя иначе сначала будет сообщение об уроне, а потом про блокировку. Можно вообще не выводить сообщения. И сообщения только для разработчика. Для пользователя можно сделать другую систему сообщений с передачей через метод.
        debug('log')(sprintf('Блокировано урона (%f): %d/%d.', this._calcProtectionModifier(), damage - finalDamage, damage));
        this._healthPoints.damage(finalDamage);

        // return finalDamage;
    }

    private _calcProtectionModifier(): number {
        let protection = +(this._protection.value() / this._onePercentArmorProtectionValue / 100).toFixed(4);

        return protection <= this._maxProtection ? protection : this._maxProtection;
    }
}