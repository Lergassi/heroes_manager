import EntityManager from '../../../source/EntityManager.js';
import Currency from '../../Entities/Currency.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import HeroRole from '../../Entities/HeroRole.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class HeroRoleFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    create(
        id: string,
        name: string,
        description: string,
        sort: number,
    ) {
        return this._entityManager.add<HeroRole>(EntityID.HeroRole, id, new HeroRole(
            id,
            name,
            description,
            sort,
        ));
    }
}