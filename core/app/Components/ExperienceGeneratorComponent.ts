import {unsigned} from '../types.js';
import Component from '../../source/Component.js';
import HealthPointsComponent, {HealthPointsComponentEventCode} from './HealthPointsComponent.js';
import EventSystem from '../../source/EventSystem.js';
import ExperienceComponent from './ExperienceComponent.js';
import {round} from 'lodash';

export default class ExperienceGeneratorComponent extends Component {
    /**
     * Точное значение выдаваемое компонентом. Множители рассчитываются не ТУТ!!!
     * @private
     */
    private readonly _exp: unsigned;

    //todo: Надо както сделать без зависимости. healthPointsComponent передается только для EventSystem, который работает сейчас через статичные методы.
    constructor(options: {
        exp: unsigned,
    }) {    //todo: Тут должны быть компонент не игрока, а группы героев и игрока.
        super();
        this._exp = options.exp;

        // EventSystem.addListener({
        //     codes: HealthPointsComponentEventCode.Died,
        //     listener: {
        //         callback: (target) => {
        //             let length = this._experienceComponents.length;
        //             for (let i = 0; i < this._experienceComponents.length; i++) {
        //                 this._experienceComponents[i].addExp(round(this._exp / length, 0));
        //             }
        //         },
        //         target: healthPointsComponent,
        //     },
        // });
    }

    distribute(experienceComponents: ExperienceComponent[]) {
        let length = experienceComponents.length;
        for (let i = 0; i < experienceComponents.length; i++) {
            experienceComponents[i].addExp(round(this._exp / length, 0));
        }
    }

    distribute2(experienceDistributeController: any) {
        experienceDistributeController.add(this._exp);  //Объект сам разберется как распределить опыт.
    }
}