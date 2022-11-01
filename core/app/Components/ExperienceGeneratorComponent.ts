import {unsigned} from '../../types/main.js';
import ExperienceComponent from './ExperienceComponent.js';
import {round} from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ExperienceDistributorInterface from '../Interfaces/ExperienceDistributorInterface.js';

export default class ExperienceGeneratorComponent {
    /**
     * Точное значение выдаваемое компонентом. Множители рассчитываются не тут.
     * @private
     */
    private readonly _exp: unsigned;

    //todo: Надо както сделать без зависимости. healthPointsComponent передается только для EventSystem, который работает сейчас через статичные методы.
    constructor(
        exp: unsigned,
    ) {    //todo: Тут должны быть компонент не игрока, а группы героев и игрока.
        this._exp = exp;
    }

    distribute(experienceDistributor: ExperienceDistributorInterface) {
        // debug(DebugNamespaceID.Log)('Опыт в луте: ' + this._exp);
        experienceDistributor.addExp(this._exp);
    }
}