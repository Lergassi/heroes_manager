import {unsigned} from '../../types/main.js';

export default interface DamageControllerInterface {
    damage(value: unsigned): void;
}