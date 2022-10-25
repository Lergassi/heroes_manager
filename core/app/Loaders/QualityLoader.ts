import Quality from '../Entities/Quality.js';
import EntityManager from '../../source/EntityManager.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';

export default class QualityLoader {
    load(data: object, entityManager: EntityManagerInterface) {
        let quality = Object.create(Quality.prototype);

        quality['_id'] = <number>data['_id'];
        quality['_name'] = data['_name'];
        quality['_alias'] = data['_alias'];
        quality['_description'] = data['_description'];
        quality['_sort'] = <number>data['_sort'];

        return quality;
    }
}