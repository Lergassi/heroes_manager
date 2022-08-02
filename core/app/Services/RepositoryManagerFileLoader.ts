import ArmorMaterial from '../Entities/ArmorMaterial.js';
import Item from '../Entities/Item.js';
import path from 'path';
import fs from 'fs';
import RepositoryManager from '../../source/RepositoryManager.js';
import Repository from '../../source/Repository.js';
import ItemRepository from '../Repositories/ItemRepository.js';
import {debugEquipSlot, debugRepositoryManager} from '../../debug/debug_functions.js';
import save_load_meta from '../../meta/save_load.js';
import EquipSlot from '../Entities/EquipSlot.js';
import ContainerInterface from '../../source/ContainerInterface.js';

export default class RepositoryManagerFileLoader {
    load(pathData: string, container: ContainerInterface): RepositoryManager {
        let meta = save_load_meta;
        let repositoryManager = new RepositoryManager();

        let entitiesJsonData = fs.readFileSync(pathData, 'utf-8');
        let entitiesObjectData = JSON.parse(entitiesJsonData);
        for (let entityMetaIndex = 0; entityMetaIndex < meta.length; entityMetaIndex++) {
            if (!entitiesObjectData.hasOwnProperty(meta[entityMetaIndex].classname)) {
                continue;
            }
            /**
             * Оставлено как было в js проекте для совместимости. Но отдельных репозиториев пока не будет.
             */
            let repository = new Repository(meta[entityMetaIndex].classname);
            repositoryManager.addRepository(meta[entityMetaIndex].classname, repository);
            for (let entityDataIndex = 0; entityDataIndex < entitiesObjectData[meta[entityMetaIndex].classname].length; entityDataIndex++) {
                let entityObjectData = entitiesObjectData[meta[entityMetaIndex].classname][entityDataIndex];
                let loader = new meta[entityMetaIndex]['loader']();
                let entity = loader.load(entityObjectData, repositoryManager);
                repository.add(entity);
            }
        }

        return repositoryManager;
    }
}