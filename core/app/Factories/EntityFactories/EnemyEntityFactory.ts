import EntityManager from '../../../source/EntityManager.js';
import Currency from '../../Entities/Currency.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import EnemyEntity from '../../Entities/EnemyEntity.js';
import {EnemyID} from '../../../types/enums/EnemyID.js';
import {Loot, unsigned} from '../../types.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class EnemyEntityFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    create(
        id: string,
        name: string,
        loot: Loot[],
        exp: unsigned,
        gold: unsigned[],
    ) {
        return this._entityManager.add<EnemyEntity>(EntityID.EnemyEntity, id, new EnemyEntity(
            id,
            name,
            loot,
            exp,
            gold,
        ));
    }
}