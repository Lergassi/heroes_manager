import ArmorMaterial from '../Entities/ArmorMaterial.js';

export default class ArmorMaterialSaver {
    save(armorMaterial) {
        return {
            name: ArmorMaterial.name,
            _id: armorMaterial['_id'],
            _name: armorMaterial['_name'],
            _alias: armorMaterial['_alias'],
            _description: armorMaterial['_description'],
            _sort: armorMaterial['_sort'],
        };
    }
}