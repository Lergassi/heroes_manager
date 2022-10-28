import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import Random from './Random.js';
import _ from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import {StartCharacterAttributeConfig} from '../../config/start_character_values.js';

export default class CharacterAttributeValueGeneratorByConfig {
    private readonly _config: StartCharacterAttributeConfig;
    private readonly _defaults;

    private readonly _maxHealthPointsStep = 10;

    constructor(config: StartCharacterAttributeConfig, defaults = '') {
        this._config = config;
        this._defaults = defaults;
    }

    generate(
        heroClassID: HeroClassID,
        characterAttributeID: CharacterAttributeID,
    ): number {
        let config = this._config[heroClassID]?.[characterAttributeID];
        if (!config) {
            debug(DebugNamespaceID.Warning)(sprintf('Для класса %s не найдены начальные значения для %s и будут указаны по умолчанию.', heroClassID, characterAttributeID));
            return 0;
        }

        //todo: Сделать валидацию в момент создания + oop.
        config = [config[0] || 0, config[1] || 0];

        //todo: oop
        let value = 0;
        switch (characterAttributeID) {
            case CharacterAttributeID.MaxHealthPoints:
                value = Random.one(_.range(config[0], config[1], this._maxHealthPointsStep));
                break;
            default:
                value = _.random(config[0], config[1]);
                break;
        }

        return value;
    }
}