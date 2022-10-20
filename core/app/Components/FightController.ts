import {assertNotNil} from '../../source/assert.js';
import debug from 'debug';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import CharacterIsDeadError from '../../source/Errors/CharacterIsDeadError.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';

export default class FightController {
    private _attackController: AttackControllerInterface;
    private _damageController: DamageControllerInterface;

    constructor(
        attackController: AttackControllerInterface,
        damageController: DamageControllerInterface,
    ) {
        assertNotNil(attackController);
        assertNotNil(damageController);

        this._attackController = attackController;
        this._damageController = damageController;
    }

    hit(target: FightController): void {
        assertNotNil(target);

        let damage = this._attackController.attack();
        target._damageController.damage(damage);
    }

    exchangeHits(target: FightController) {
        assertNotNil(target);

        this.hit(target);
        target.hit(this);
    }

    fightToDead(target: FightController) {
        assertNotNil(target);

        let maxHits = 1_000;
        let currentHit = 0;
        while (currentHit < maxHits) {
            this.exchangeHits(target);
            // try {
            //     this.hit(target);
            // } catch (e) {
            //     if (e instanceof CharacterIsDeadError) {
            //         break;
            //     }
            // }
            ++currentHit;
        }
        if (currentHit >= maxHits) {
            //todo: Чтото делать.
            debug('error')('Ошибка при симуляции боя. Достигнуто максимальное количество ударов.');
        }
    }
}