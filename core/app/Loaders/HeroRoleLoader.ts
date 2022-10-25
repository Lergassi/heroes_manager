import HeroRole from '../Entities/HeroRole.js';
import EntityManager from '../../source/EntityManager.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';

export default class HeroRoleLoader {
    load(data: object, entityManager: EntityManagerInterface) {
        let heroRole = Object.create(HeroRole.prototype);

        heroRole['_id'] = <number>data['_id'];
        heroRole['_name'] = data['_name'];
        heroRole['_alias'] = data['_alias'];
        heroRole['_description'] = data['_description'];
        heroRole['_sort'] = <number>data['_sort'];

        return heroRole;
    }
}