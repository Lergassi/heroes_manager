import {database} from '../../data/ts/database.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import Random from './Random.js';
import _ from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import {CharacterAttributeConfig, StartCharacterAttributeConfig} from '../../config/start_character_values.js';

//todo: Разделить: начальные атрибуты, по уровню.
export default class CharacterAttributeValueGeneratorByConfig {
    private readonly _config: StartCharacterAttributeConfig;
    private readonly _defaults: CharacterAttributeConfig;

    private readonly _maxHealthPointsStep = 10;

    constructor(config: StartCharacterAttributeConfig, defaults: CharacterAttributeConfig = {}) {
        this._config = config;
        this._defaults = defaults;
    }

    generate(heroClassID: HeroClassID, characterAttributeID: CharacterAttributeID): number {
        let values = database.heroes.character_attributes.startValue(heroClassID, characterAttributeID);

        return  _.random(values[0], values[1]);
    }
}