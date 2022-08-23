import Currency from '../Entities/Currency.js';
import EntityManager from '../../source/EntityManager.js';

export default class CurrencyLoader {
    load(data: object, entityManager: EntityManager) {
        let currency = Object.create(Currency.prototype);

        currency['_id'] = <number>data['_id'];
        currency['_name'] = data['_name'];
        currency['_alias'] = data['_alias'];
        currency['_description'] = data['_description'];
        currency['_sort'] = <number>data['_sort'];

        return currency;
    }
}