import EntityManager from '../../source/EntityManager.js';
import CharacterAttribute, {CharacterAttributeAlias} from '../Entities/CharacterAttribute.js';
import {CharacterAttributeIncrease} from '../../source/IncreaseList.js';
import {CharacterAttributeIncreaseObject} from '../Entities/Item.js';

export type CharacterAttributeIncreaseObjectBuilder = {[alias: string]: number};
// export type CharacterAttributeIncreaseObjectBuilder = {[alias: CharacterAttributeEnum]: number};

export default class CharacterAttributeIncreaseBuilder {
    private _entityManager: EntityManager;

    constructor(entityManager: EntityManager) {
        this._entityManager = entityManager;
    }

    // build(values: {[alias: string]: number}): {[alias: string]: CharacterAttributeIncrease} {
    build(values: CharacterAttributeIncreaseObjectBuilder): CharacterAttributeIncreaseObject {
        let result: CharacterAttributeIncreaseObject = {};
        for (const alias in values) {
            let characterAttribute = this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(alias);
            result[alias] = new CharacterAttributeIncrease(characterAttribute, values[alias]);
        }

        return result;
    }
}