import {unsigned} from '../../types/types.js';

export default interface DamageControllerInterface {
    damage(value: unsigned): void;
}