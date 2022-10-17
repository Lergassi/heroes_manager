import {unsigned} from '../types.js';

export default interface DamageControllerInterface {
    damage(value: unsigned): void;
}