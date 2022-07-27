import Quality from '../Entities/Quality.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import RepositoryManager from '../../source/RepositoryManager.js';

export default class QualityLoader {
    load(data: object, repositoryManager: RepositoryManager) {
        let quality = Object.create(Quality.prototype);

        quality['_id'] = <number>data['_id'];
        quality['_name'] = data['_name'];
        quality['_alias'] = data['_alias'];
        quality['_description'] = data['_description'];
        quality['_sort'] = <number>data['_sort'];

        return quality;
    }
}