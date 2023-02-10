import _ from 'lodash';
import debug from 'debug';
import {item_category_ratios} from '../../../../data/ts/item_category_ratios.js';
import {formulas} from './formulas.js';

export default class CharacterAttributeTransfer {
    private readonly _config = {
        characterAttributeToAttackPowerRatio: 2,
    };

    characterAttributeToAttackPower(characterAttribute: number): number {
        return formulas.characterAttributeToAttackPower(characterAttribute, this._config.characterAttributeToAttackPowerRatio);
    }

    attackPowerToCharacterAttribute_reverse(attackPower: number): number {
        return formulas.attackPowerToCharacterAttribute(attackPower, this._config.characterAttributeToAttackPowerRatio);
    }
}