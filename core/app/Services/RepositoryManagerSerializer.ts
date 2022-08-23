import Serializer from '../../source/Serializer.js';
import EntityManager from '../../source/EntityManager.js';

export default class RepositoryManagerSerializer {
    private _serializer: Serializer;

    constructor(serializer: Serializer) {
        this._serializer = serializer;
    }

    serialize(entityManager: EntityManager) {
        let data = [];

        for (const repositoryKey in entityManager['_repositories']) {
            for (let i = 0; i < entityManager['_repositories'][repositoryKey]['_items'].length; i++) {
                data.push(this._serializer.serialize(entityManager['_repositories'][repositoryKey]['_items'][i]));
            }
        }

        return data;
    }

    unserialize(data) {
        // let meta = this._serializer.getMetadata();

        // let entityManager = new RepositoryManager();
        // for (let entityMetaIndex = 0; entityMetaIndex < meta.length; entityMetaIndex++) {
        //     if (!entitiesObjectData.hasOwnProperty(meta[entityMetaIndex].classname)) {
        //         continue;
        //     }
        //     /**
        //      * Оставлено как было в js проекте для совместимости. Но отдельных репозиториев пока не будет.
        //      */
        //     let repository = new Repository(meta[entityMetaIndex].classname);
        //     entityManager.addRepository(meta[entityMetaIndex].classname, repository);
        //     for (let entityDataIndex = 0; entityDataIndex < entitiesObjectData[meta[entityMetaIndex].classname].length; entityDataIndex++) {
        //         let entityObjectData = entitiesObjectData[meta[entityMetaIndex].classname][entityDataIndex];
        //         let loader = new meta[entityMetaIndex]['loader']();
        //         let entity = loader.load(entityObjectData, entityManager);
        //         repository.add(entity);
        //     }
        // }
        //
        // return entityManager;

        for (let i = 0; i < data.length; i++) {
            console.log(this._serializer.unserialize(data[i]));
        }
    }
}