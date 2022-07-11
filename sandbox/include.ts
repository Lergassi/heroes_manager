import Container from '../core/source/Container.js';
import ContainerConfigure from '../server/app/ContainerConfigure.js';
import ArmorMaterial from '../core/app/Entities/ArmorMaterial.js';
import debug from 'debug';
import Repository from '../core/source/Repository.js';
import fs from 'fs';
import path from 'path';
import TestRepository from './ts/TestRepository.js';
import Item from '../core/app/Entities/Item.js';
import RepositoryManager from '../core/source/RepositoryManager.js';
import RepositoryManagerFileLoader from '../core/app/Services/RepositoryManagerFileLoader.js';

const container: Container = (new ContainerConfigure()).configure(new Container());
// console.log(container);

export function entityGetStarted() {
    let id = 1;
    // let plate = ArmorMaterial.create(
    //     id++,
    //     'Латы',
    //     'armor_material_plate',
    //     '',
    //     500,
    // );
    // let plate = new ArmorMaterial(
    //     id++,
    //     'Латы',
    //     'armor_material_plate',
    //     '',
    //     500,
    // );
    // console.log(plate);

    let armorMaterialRepository = new Repository<ArmorMaterial>(ArmorMaterial.name);
    // armorMaterialRepository.add(new ArmorMaterial(
    //     id++,
    //     'Латы',
    //     'armor_material_plate',
    //     '',
    //     500,
    // ));
    // armorMaterialRepository.add(new ArmorMaterial(
    //     id++,
    //     'Кожа',
    //     'armor_material_leather',
    //     '',
    //     510,
    // ));
    // armorMaterialRepository.add(new ArmorMaterial(
    //     id++,
    //     'Ткань',
    //     'armor_material_cloth',
    //     '',
    //     520,
    // ));
    // console.log(armorMaterialRepository);

    let pathData = path.resolve(process.env.PROJECT_DIR, 'core/data/entities.json');
    let entitiesJsonData = fs.readFileSync(pathData, 'utf-8');
    let entitiesObjectData = JSON.parse(entitiesJsonData);

    for (let i = 0; i < entitiesObjectData['armorMaterial'].length; i++) {
        armorMaterialRepository.add(new ArmorMaterial(
            <number>entitiesObjectData['armorMaterial'][i]['_id'],
            entitiesObjectData['armorMaterial'][i]['_name'],
            entitiesObjectData['armorMaterial'][i]['_alias'],
            entitiesObjectData['armorMaterial'][i]['_description'],
            <number>entitiesObjectData['armorMaterial'][i]['_sort'],
        ));
    }
    console.log(armorMaterialRepository);
}

export function testRepositoryGeneric() {
    let armorMaterialRepository = new TestRepository<ArmorMaterial>();
    let plate = new ArmorMaterial(
        42,
        'Латы',
        'armor_material_plate',
        '',
        500,
    );
    // let item = new Item();
    armorMaterialRepository.add(plate);
    // armorMaterialRepository.add(item);
    console.log(armorMaterialRepository);
}

export function testRepositoryManager() {
    let repositoryManager = new RepositoryManager();

    let armorMaterialRepository = new Repository<ArmorMaterial>(ArmorMaterial.name);
    loadArmorMaterial(armorMaterialRepository);
    // repositoryManager.addRepository<ArmorMaterial>(ArmorMaterial.name, armorMaterialRepository);
    repositoryManager.addRepository(ArmorMaterial.name, armorMaterialRepository);
    console.log(repositoryManager['_repositories'][ArmorMaterial.name]);
}

function loadArmorMaterial(repository) {
    let pathData = path.resolve(process.env.PROJECT_DIR, 'core/data/entities.json');
    let entitiesJsonData = fs.readFileSync(pathData, 'utf-8');
    let entitiesObjectData = JSON.parse(entitiesJsonData);

    for (let i = 0; i < entitiesObjectData['armorMaterial'].length; i++) {
        repository.add(new ArmorMaterial(
            <number>entitiesObjectData['armorMaterial'][i]['_id'],
            entitiesObjectData['armorMaterial'][i]['_name'],
            entitiesObjectData['armorMaterial'][i]['_alias'],
            entitiesObjectData['armorMaterial'][i]['_description'],
            <number>entitiesObjectData['armorMaterial'][i]['_sort'],
        ));
    }
}

export function devEntityLoader() {
    let dataLoader = new RepositoryManagerFileLoader();

    return dataLoader.load(path.resolve(process.env.PROJECT_DIR, 'core/data/entities.json'), container);
}

export function testLiteralTypes() {
    // let x: "hello" = "hello";
    // x = "hello";
    // x = "howdy";

    // let entityName: ArmorMaterial.name = ;
}

export function testItemCategoryLoader() {

}