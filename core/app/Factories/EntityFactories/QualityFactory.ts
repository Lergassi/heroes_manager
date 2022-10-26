import CharacterAttributeEntity from '../../Entities/CharacterAttributeEntity.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import EntityManager from '../../../source/EntityManager.js';
import Quality from '../../Entities/Quality.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class QualityFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }
    create(
        id: string,
        name: string,
        sort: number,
    ) {
        return this._entityManager.add<Quality>(EntityID.Quality, id, new Quality(
            id,
            name,
            sort,
        ));
    }
}