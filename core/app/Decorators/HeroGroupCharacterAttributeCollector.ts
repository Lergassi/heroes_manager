import HeroGroupInterface from '../Interfaces/HeroGroupInterface.js';
import {assert} from '../../source/assert.js';
import _ from 'lodash';
import GameObject from '../../source/GameObject.js';
import TotalCharacterAttributeValueCollectorComponent
    from '../Components/TotalCharacterAttributeValueCollectorComponent.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class HeroGroupCharacterAttributeCollector implements HeroGroupInterface {
    private readonly _heroGroup: HeroGroupInterface;
    private readonly _totalCollectors: TotalCharacterAttributeValueCollectorComponent[];

    constructor(options: {
        heroGroup: HeroGroupInterface,
    }) {
        assert(!_.isNil(options));
        assert(!_.isNil(options.heroGroup));
        // assert(options.characterAttributeValueCollector instanceof TotalCharacterAttributeValueCollectorComponent);

        this._heroGroup = options.heroGroup;
        this._totalCollectors = [];
    }

    addHero(hero: GameObject): void {
        this._heroGroup.addHero(hero);
        this._totalCollectors.push(hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name));
    }

    removeHero(hero: GameObject): void {
        this._heroGroup.removeHero(hero);
        _.pullAt(
            this._totalCollectors,
            _.indexOf(this._totalCollectors, hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name))
        );
    }

    totalValue(ID: CharacterAttributeID) {
        return _.sum(_.map(this._totalCollectors, (totalCollector) => {
            return totalCollector.totalValue(ID);
        }));
    }
}