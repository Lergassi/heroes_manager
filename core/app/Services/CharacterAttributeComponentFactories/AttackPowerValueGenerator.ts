import {unsigned} from '../../types.js';
import ItemCharacterAttributeCollector from '../../Components/ItemCharacterAttributeCollector.js';
import CharacterAttribute from '../../Components/CharacterAttribute.js';
import _ from 'lodash';
import DefaultCharacterAttributeComponentFactory from './DefaultCharacterAttributeComponentFactory.js';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';

export default class AttackPowerValueGenerator {
    // generate(options: {
    //     level: unsigned;
    //     leftRangeSide?: unsigned;
    //     rightRangeSide?: unsigned;
    // }): number[] {
    //     let leftRangeSide = options.leftRangeSide || 5;
    //     let rightRangeSide = options.rightRangeSide || 5;
    //
    //     let value = _.random(16, 24) * options.level;
    //
    //     let left = value - leftRangeSide;
    //     left = left < 0 ? 0 : left;
    //     let right = value + rightRangeSide;
    //
    //     return [
    //         left,
    //         right,
    //     ];
    // }
    generate(options: {
        level: unsigned;
    }): number {
        return _.random(16, 24) * options.level;
    }
}