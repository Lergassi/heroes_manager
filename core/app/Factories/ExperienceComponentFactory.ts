import ExperienceComponent from '../Components/ExperienceComponent.js';
import {unsigned} from '../types.js';
import EventSystem from '../../source/EventSystem.js';

export type ExperienceComponentFactoryCreateOptions = {
    level: unsigned;
}

export type ExperienceComponentFactoryOptions = {
    maxLevel: unsigned;
}

export default class ExperienceComponentFactory {
    private readonly _maxLevel: unsigned;

    constructor(options: ExperienceComponentFactoryOptions) {
        this._maxLevel = options.maxLevel;
    }

    create(options: ExperienceComponentFactoryCreateOptions): ExperienceComponent {
        return new ExperienceComponent(
            options.level,
            this._maxLevel,
        );
    }
}