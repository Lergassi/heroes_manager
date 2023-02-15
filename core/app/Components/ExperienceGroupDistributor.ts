import _ from 'lodash';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ExperienceDistributorInterface from '../Interfaces/ExperienceDistributorInterface.js';
import Experience from './Experience.js';

//todo: Подобные объекты стоит выделить в отдельный компонент у группы и получать через .get<ExperienceInterface>(ComponentID.GroupExperienceDistributor)
export default class ExperienceGroupDistributor implements ExperienceDistributorInterface {
    private readonly _experiences: Experience[];

    constructor() {
        this._experiences = [];
    }

    add(experience: Experience): void {
        if (!_.includes(this._experiences, experience)) this._experiences.push(experience);
    }

    remove(experience: Experience): void {
        _.pull(this._experiences, experience);
    }

    addExp(value: number): void {
        if (!this._experiences.length) return;

        let expForTarget = _.round(value / this._experiences.length);
        for (let i = 0; i < this._experiences.length; i++) {
            this._experiences[i].addExp(expForTarget);
        }
        debug(DebugNamespaceID.Debug)(sprintf('Распределение опыта (целей) на_цель/всего_опыта:  (%s) %s/%s.', this._experiences.length, expForTarget, value));
    }
}