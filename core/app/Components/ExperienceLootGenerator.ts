import {unsigned} from '../../types/main.js';
import Experience from './Experience.js';
import {round} from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ExperienceDistributorInterface from '../Interfaces/ExperienceDistributorInterface.js';

export default class ExperienceLootGenerator {
    /**
     * Точное значение выдаваемое компонентом. Множители рассчитываются не тут. todo: Какой множитель?
     * @private
     */
    private readonly _exp: number;

    constructor(exp: number) {
        this._exp = exp;
    }

    distribute(experienceDistributor: ExperienceDistributorInterface) {
        experienceDistributor.addExp(this._exp);
    }
}