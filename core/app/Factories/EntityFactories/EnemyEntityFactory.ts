import {EntityID} from '../../../types/enums/EntityID.js';
import EnemyEntity from '../../Entities/EnemyEntity.js';
import {ItemLoot, unsigned} from '../../../types/main.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class EnemyEntityFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    create(
        id: string,
        name: string,
        loot: ItemLoot[],
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