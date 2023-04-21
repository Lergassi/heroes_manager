// import {Metadata, MetadataCollection} from '../config/metadata.js';
import AppError from './Errors/AppError.js';
import {SerializeType} from './Serializer.js';
import ContainerInterface from './ContainerInterface.js';
import {EntityID} from '../types/enums/EntityID.js';
import {ServiceID} from '../types/enums/ServiceID.js';
import EntityManagerInterface from '../app/Interfaces/EntityManagerInterface.js';

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
    return container.get<EntityManagerInterface>(ServiceID.EntityManager).get<T>(classname as EntityID/*todo: НЕ РАБОТАЕТ: classname as EntityID. Сменить выше на EntityID.*/, String(id));
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