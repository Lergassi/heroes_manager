import CharacterAttribute from '../Entities/CharacterAttribute.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import RepositoryManager from '../../source/RepositoryManager.js';

export default class CharacterAttributeLoader {
    load(data: object, repositoryManager: RepositoryManager) {
        let characterAttribute = Object.create(CharacterAttribute.prototype);

        characterAttribute['_id'] = <number>data['_id'];
        characterAttribute['_name'] = data['_name'];
        characterAttribute['_alias'] = data['_alias'];
        characterAttribute['_description'] = data['_description'];
        characterAttribute['_sort'] = <number>data['_sort'];

        return characterAttribute;
    }
}