import GameObject from '../../source/GameObject.js';
import Experience from '../Components/Experience.js';
import {unsigned} from '../../types/main.js';
import HeroCharacterAttributeGenerator from '../Services/BalanceTools/HeroCharacterAttributeGenerator.js';

export type ExperienceComponentFactoryCreateOptions = {
    level: number;
    hero: GameObject;
}

export type ExperienceComponentFactoryOptions = {
    maxLevel: number;
    heroCharacterAttributeValueGenerator: HeroCharacterAttributeGenerator;
}

export default class ExperienceComponentFactory {
    private readonly _maxLevel: number;
    private readonly _heroCharacterAttributeValueGenerator: HeroCharacterAttributeGenerator;

    constructor(options: ExperienceComponentFactoryOptions) {
        this._maxLevel = options.maxLevel;
        this._heroCharacterAttributeValueGenerator = options.heroCharacterAttributeValueGenerator;
    }

    create(options: ExperienceComponentFactoryCreateOptions): Experience {
        return new Experience(
            options.level,
            this._maxLevel,
            options.hero,
            this._heroCharacterAttributeValueGenerator,
        );
    }
}