import Repository from '../../source/Repository.js';
import ArmorMaterial from '../DataObjects/ArmorMaterial.js';

export default class ArmorMaterialRepository extends Repository {
    constructor() {
        super(ArmorMaterial.name);

        let id = 1;

        this.add(ArmorMaterial.create(
            id++,
            'Латы',
            'armor_material_plate',
            '',
            500,
        ));
        this.add(ArmorMaterial.create(
            id++,
            'Кожа',
            'armor_material_leather',
            '',
            510,
        ));
        this.add(ArmorMaterial.create(
            id++,
            'Ткань',
            'armor_material_cloth',
            '',
            520,
        ));
    }
}