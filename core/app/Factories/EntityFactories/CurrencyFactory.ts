import EntityManager from '../../../source/EntityManager.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import Currency from '../../Entities/Currency.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class CurrencyFactory {
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
        return this._entityManager.add<Currency>(EntityID.Currency, id, new Currency(
            id,
            name,
            description,
            sort,
        ));
    }
}