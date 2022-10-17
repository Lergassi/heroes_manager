import {integer, unsigned} from '../types.js';
import HealthPointsComponent from './HealthPointsComponent.js';
import CharacterAttribute from './CharacterAttribute.js';
import ArmorDecorator from './CharacterAttributes/ArmorDecorator.js';

export default class DamageController {
    private readonly _healthPoints: HealthPointsComponent;
    private readonly _defence: ArmorDecorator;

    constructor(
        healthPoints: HealthPointsComponent,
        defence: ArmorDecorator,
    ) {
        this._healthPoints = healthPoints;
        this._defence = defence;
    }

    damage(value: integer): void {
        let damage = value;
        // damage = this._defence.damage(damage);

        this._healthPoints.damage(damage);
    }
}