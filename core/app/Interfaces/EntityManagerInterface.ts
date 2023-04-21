import {EntityID} from '../../types/enums/EntityID.js';

export default interface EntityManagerInterface {
    add<T>(entityID: EntityID, ID: string, entity: T): T;

    // add<T>(entityID: EntityID, entity: T): T;
    get<T>(entityID: EntityID, ID: string): T;

    map<T>(entityID: EntityID, callback: (entity: T) => void);
}