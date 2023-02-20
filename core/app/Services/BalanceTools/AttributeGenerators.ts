import _ from 'lodash';
import debug from 'debug';
import ItemAttributeGenerator from './CharacterAttributeDataGeneration/v0_0_2/ItemAttributeGenerator.js';
import EnemyCharacterAttributeGenerator from './EnemyCharacterAttributeGenerator.js';
import HeroCharacterAttributeGenerator from './HeroCharacterAttributeGenerator.js';

export default class AttributeGenerators {
    private readonly _itemAttributeGenerator: ItemAttributeGenerator;
    private readonly _heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator;
    private readonly _enemyCharacterAttributeGenerator: EnemyCharacterAttributeGenerator;

    get itemAttributeGenerator(): ItemAttributeGenerator {
        return this._itemAttributeGenerator;
    }

    get heroCharacterAttributeGenerator(): HeroCharacterAttributeGenerator {
        return this._heroCharacterAttributeGenerator;
    }

    get enemyCharacterAttributeGenerator(): EnemyCharacterAttributeGenerator {
        return this._enemyCharacterAttributeGenerator;
    }

    constructor() {
        this._itemAttributeGenerator = new ItemAttributeGenerator();
        this._heroCharacterAttributeGenerator = new HeroCharacterAttributeGenerator();
        this._enemyCharacterAttributeGenerator = new EnemyCharacterAttributeGenerator(this._heroCharacterAttributeGenerator);
    }
}