import {unsigned} from '../../types/main.js';
import Component from '../../source/Component.js';
import ExperienceComponent from './ExperienceComponent.js';
import {round} from 'lodash';

export default class ExperienceGeneratorComponent {
    /**
     * Точное значение выдаваемое компонентом. Множители рассчитываются не ТУТ!!!
     * @private
     */
    private readonly _exp: unsigned;

    //todo: Надо както сделать без зависимости. healthPointsComponent передается только для EventSystem, который работает сейчас через статичные методы.
    constructor(options: {
        exp: unsigned,
    }) {    //todo: Тут должны быть компонент не игрока, а группы героев и игрока.
        this._exp = options.exp;
    }

    distribute(experienceComponents: ExperienceComponent[]) {
        let length = experienceComponents.length;
        for (let i = 0; i < experienceComponents.length; i++) {
            experienceComponents[i].addExp(round(this._exp / length, 0));
        }
    }

    distribute2(experienceDistributeController: any) {
        experienceDistributeController.add(this._exp);  //Объект сам разберется как распределить опыт, по аналогии с генератором золота.
    }
}