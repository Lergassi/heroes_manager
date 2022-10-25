import fs from 'fs';
import EntityManager from '../../source/EntityManager.js';
import save_load_meta from '../../meta/save_load.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';

/**
 * @deprecated
 */
export default class RepositoryManagerFileLoader {
    load(pathData: string, container: ContainerInterface): EntityManager {
        let meta = save_load_meta;
        let entityManager = new EntityManager();

        // let entitiesJsonData = fs.readFileSync(pathData, 'utf-8');
        // let entitiesObjectData = JSON.parse(entitiesJsonData);
        // // console.log(entitiesObjectData);
        // for (let entityMetaIndex = 0; entityMetaIndex < meta.length; entityMetaIndex++) {
        //     if (!entitiesObjectData.hasOwnProperty(meta[entityMetaIndex].classname)) {
        //         continue;
        //     }
        //     /**
        //      * Оставлено как было в js проекте для совместимости. Но отдельных репозиториев пока не будет.
        //      */
        //     // let repository = new Repository(meta[entityMetaIndex].classname);
        //     // entityManager.addRepository(meta[entityMetaIndex].classname, repository);
        //     let repository = entityManager.get(meta[entityMetaIndex].classname as EntityID, '42');
        //     for (let entityDataIndex = 0; entityDataIndex < entitiesObjectData[meta[entityMetaIndex].classname].length; entityDataIndex++) {
        //         let entityObjectData = entitiesObjectData[meta[entityMetaIndex].classname][entityDataIndex];
        //         let loader = new meta[entityMetaIndex]['loader']();
        //         let entity = loader.load(entityObjectData, entityManager);
        //         repository.add(entity);
        //     }
        // }

        return entityManager;
    }
}