import _ from 'lodash';
import debug from 'debug';
import {item_category_ratios} from '../../../../../data/ts/item_category_ratios.js';
import {item_attributes_formulas} from '../../formulas/item_attributes_formulas.js';

export default class CharacterAttributeTransfer {
    private readonly _config = {
        characterAttributeToAttackPowerRatio: 2,
    };

    characterAttributeToAttackPower(characterAttribute: number): number {
        return item_attributes_formulas.characterAttributeToAttackPower(characterAttribute, this._config.characterAttributeToAttackPowerRatio);
    }

    attackPowerToCharacterAttribute_reverse(attackPower: number): number {
        return item_attributes_formulas.attackPowerToCharacterAttribute_revers(attackPower, this._config.characterAttributeToAttackPowerRatio);
    }
}