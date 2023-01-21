import Experience from '../Components/Experience.js';
import {unsigned} from '../../types/main.js';

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

    create(options: ExperienceComponentFactoryCreateOptions): Experience {
        return new Experience(
            options.level,
            this._maxLevel,
        );
    }
}