export class TestItem {
    private _properties;

    // constructor(properties: {[key: string]: T}) {
    // }
}

import ArmorMaterial from './Entities/ArmorMaterial.js';
import {CharacterAttributeIncrease} from '../source/IncreaseList.js';
import CharacterAttribute from './Entities/CharacterAttribute.js';
import EntityManager from '../source/EntityManager.js';

let entityManager = new EntityManager();

let properties = {
    // 'stackSize': 1,
    isEquipable: true,  //todo: Возможна должна быть зависимость с increase.
    armorMaterial: entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('plate'),  //todo: Возможные ошибки! Был репозиторий вместо сущности!
    //todo: Пока без "интерфейса".
    increase: [
        new CharacterAttributeIncrease(entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('strength'), 42),
        new CharacterAttributeIncrease(entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('stamina'), 42),
        new CharacterAttributeIncrease(entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('protection'), 42),
    ],
};