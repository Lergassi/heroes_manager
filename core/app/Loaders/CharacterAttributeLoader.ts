import CharacterAttributeEntity from '../Entities/CharacterAttributeEntity.js';
import EntityManager from '../../source/EntityManager.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';

export default class CharacterAttributeLoader {
    load(data: object, entityManager: EntityManagerInterface) {
        let characterAttribute = Object.create(CharacterAttributeEntity.prototype);

        characterAttribute['_id'] = <number>data['_id'];
        characterAttribute['_name'] = data['_name'];
        characterAttribute['_alias'] = data['_alias'];
        characterAttribute['_description'] = data['_description'];
        characterAttribute['_sort'] = <number>data['_sort'];

        return characterAttribute;
    }
}