import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import Random from './Random.js';
import _ from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import {CharacterAttributeConfig, StartCharacterAttributeConfig} from '../../config/start_character_values.js';

export default class CharacterAttributeValueGeneratorByConfig {
    private readonly _config: StartCharacterAttributeConfig;
    private readonly _defaults: CharacterAttributeConfig;

    private readonly _maxHealthPointsStep = 10;

    constructor(config: StartCharacterAttributeConfig, defaults: CharacterAttributeConfig = {}) {
        this._config = config;
        this._defaults = defaults;
    }

    generate(
        heroClassID: HeroClassID,
        characterAttributeID: CharacterAttributeID,
    ): number {
        if (!this._hasHeroClassConfig(heroClassID)) {
            debug(DebugNamespaceID.Warning)(sprintf('Для класса %s не найдены начальные значения и будут указаны по умолчанию.', heroClassID, characterAttributeID));
            return 0;
        }

        let config = this._config[heroClassID][characterAttributeID];
        if (!config) {
            // config = this._defaults[characterAttributeID];
            return 0;   //todo: По-умочанию.
        }

        //todo: Сделать валидацию в момент создания + oop. Сюда уже должны приходить правильные данные и не в виде массива.
        // config = config ?? [0, 0];
        // config = [config[0] || 0, config[1] || 0];

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

    private _hasHeroClassConfig(ID: HeroClassID): boolean {
        return this._config.hasOwnProperty(ID);
    }

    private _defaultValue() {
        return [0, 0];
    }
}