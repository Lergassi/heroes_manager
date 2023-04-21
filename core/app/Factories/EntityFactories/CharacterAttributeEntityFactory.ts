import CharacterAttributeEntity from '../../Entities/CharacterAttributeEntity.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class CharacterAttributeEntityFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    create(
        id: string,
        name: string,
        sort: number,
    ) {
        return this._entityManager.add<CharacterAttributeEntity>(EntityID.CharacterAttribute, id, new CharacterAttributeEntity(
            id,
            name,
            sort,
        ));
    }
}