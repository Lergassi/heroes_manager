import EntityManager from '../EntityManager.js';

export default class EntityManagerFacade {
    private _entityManager: EntityManager;

    constructor(entityManager: EntityManager) {
        this._entityManager = entityManager;
    }

    // entity<Entity>(module: Entity, alias: string): Entity {
    entity<Entity>(module, alias: string): Entity {
        //todo: Сделано так, пока поиск объектов сделан через this.constructor.name === name;
        //@ts-ignore
        let moduleName = module.name;
        return this._entityManager.getRepository<Entity>(moduleName).getOneByAlias(alias);
    }
}