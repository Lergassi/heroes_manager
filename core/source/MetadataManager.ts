// import {Metadata, MetadataCollection} from '../config/metadata.js';
import AppError from './Errors/AppError.js';
import {SerializeType} from './Serializer.js';
import ContainerInterface from './ContainerInterface.js';
import EntityManager from './EntityManager.js';

export interface MappingField {
    type: SerializeType;
}

export interface Metadata {
    module: {
        name: string;
        prototype: object;
    };
    mapping: {
        [fieldKey: string]: MappingField;
    };
    finderCallback?: FinderCallback;
}

type FinderCallback = <T>(container: ContainerInterface, classname: string, id: number) => T;

export function repositoryManagerFinderCallback<T>(container: ContainerInterface, classname: string, id: number): T {
    return container.get<EntityManager>('core.entityManager').getRepository<T>(classname).findOneByID(id);
}

export interface MetadataCollection {
    [key: string]: Metadata;
}

export default class MetadataManager {
    private readonly _metadata: MetadataCollection;

    constructor(metadata: MetadataCollection = {}) {
        this._metadata = metadata;
    }

    addMetadata(metadata: Metadata): void {
        if (!this.hasMetadata(metadata.module.name)) {
            this._metadata[metadata.module.name] = metadata;
        }
    }

    hasMetadata(classname: string): boolean {
        return this._metadata.hasOwnProperty(classname);
    }

    getMetadata(classname: string): Metadata {
        if (!this.hasMetadata(classname)) {
            throw AppError.metadataNotFound(classname);
        }

        return this._metadata[classname];
    }
}