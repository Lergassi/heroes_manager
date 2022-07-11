import ArmorMaterial from '../core/app/Entities/ArmorMaterial.js';
import ArmorMaterialSaver from '../core/app/Savers/ArmorMaterialSaver.js';
import ArmorMaterialLoader from '../core/app/Loaders/ArmorMaterialLoader.js';
import DefaultLoader from '../core/app/Loaders/DefaultLoader.js';
import Container from '../core/source/Container.js';

let meta = {
    classname: ArmorMaterial.name,
    prototype: ArmorMaterial.prototype,
    saver: ArmorMaterialSaver,
    loader: ArmorMaterialLoader,
    mapping: {
        _id: '_id',
        _name: '_name',
        _alias: '_alias',
        _description: '_description',
        _sort: '_sort',
    },
};

let data = {
    classname: 'ArmorMaterial',
    _id: 1,
    _name: "Латы",
    _alias: "armor_material_plate",
    _description: "",
    _sort: 500
};

let defaultLoader = new DefaultLoader(meta);
let armorMaterial = defaultLoader.load(data, new Container());
console.log(armorMaterial);