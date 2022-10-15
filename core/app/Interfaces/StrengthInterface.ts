import {unsigned} from '../types.js';

export default interface StrengthInterface {
    value(): number;
    add(value: unsigned): void;
}