import ArmorMaterial from '../Entities/ArmorMaterial.js';
import EntityManager from '../../source/EntityManager.js';

export default class ArmorMaterialLoader {
    load(data: object, entityManager: EntityManager) {
        let armorMaterial = Object.create(ArmorMaterial.prototype);

        armorMaterial['_id'] = <number>data['_id'];
        armorMaterial['_name'] = data['_name'];
        armorMaterial['_alias'] = data['_alias'];
        armorMaterial['_description'] = data['_description'];
        armorMaterial['_sort'] = <number>data['_sort'];

        return armorMaterial;
    }
}