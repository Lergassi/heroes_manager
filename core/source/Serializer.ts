import AppError from './AppError.js';
import {sprintf} from 'sprintf-js';
import ContainerInterface from './ContainerInterface.js';
import _, {setWith} from 'lodash';
import RepositoryManager from './RepositoryManager.js';

export enum PrimitiveType {
    undefined = 'undefined',
    boolean = 'boolean',
    number = 'number',
    string = 'string',
    bigint = 'bigint',
    symbol = 'symbol',
}

export enum SerializeType {
    // Undefined = 'Undefined',
    Boolean = 'Boolean',
    Number = 'Number',
    String = 'String',
    Bigint = 'Bigint',
    Symbol = 'Symbol',
    Object = 'Object',
    Collection = 'Collection',
    Link = 'link',
    LinkCollection = 'LinkCollection',
}

export default class Serializer {
    private readonly _metadata: object;
    private readonly _container: ContainerInterface;
    private readonly _links: {};

    constructor(metadata: object, container: ContainerInterface) {
        this._metadata = metadata;
        this._container = container;
        this._links = {};
    }

    hasMetadata(name: string): boolean {
        return this._metadata.hasOwnProperty(name);
    }

    getMetadata(name: string) {
        return this._metadata[name];
    }

    serialize(object) {
        let objectMetadata = this.getMetadata(object.constructor.name);
        if (!objectMetadata) {
            return undefined;
        }

        let serializeObject = {
            classname: object.constructor.name,
            data: {},
        };
        //todo: Убрать в класс.
        if (objectMetadata.hasOwnProperty('serviceName')) {
            serializeObject['serviceName'] = objectMetadata['serviceName'];
        }
        for (const fieldKey in objectMetadata.mapping) {
            if (!object.hasOwnProperty(fieldKey)) {
                throw new AppError(sprintf('Поле "%s" не найдено в объекте "%s".', fieldKey, object.constructor.name));
            }

            // if (objectMetadata.mapping[fieldKey].hasOwnProperty('serializeCallback')) {
            //     serializeObject[fieldKey] = objectMetadata.mapping[fieldKey]['serializeCallback'](this, object);
            //     continue;
            // }

            switch (objectMetadata.mapping[fieldKey].type) {
                case SerializeType.Boolean:
                case SerializeType.Number:
                case SerializeType.String:
                case SerializeType.Bigint:
                    serializeObject.data[fieldKey] = object[fieldKey];
                    break;
                case SerializeType.Object:
                    if (typeof object[fieldKey] !== 'undefined') {
                        serializeObject.data[fieldKey] = this.serialize(object[fieldKey]);
                    } else {
                        serializeObject.data[fieldKey] = undefined;
                    }
                    break;
                case SerializeType.Collection:
                    serializeObject.data[fieldKey] = this._serializeCollection(object[fieldKey])
                    break;
                case SerializeType.Link:
                    serializeObject.data[fieldKey] = this._serializeLinkObject(object[fieldKey]);
                    break;
                case SerializeType.LinkCollection:
                    serializeObject.data[fieldKey] = this._serializeLinkCollection(object[fieldKey]);
                    break;
                default:
                    throw new AppError(sprintf('Тип "%s" не поддерживается системой сериализации.', objectMetadata.mapping[fieldKey].type));
                    break;
            }//end switch (objectMetadata.mapping[fieldKey].type)
        }//end for (const fieldKey in objectMetadata.mapping)

        return serializeObject;
    }

    unserialize(data) {
        let objectMetadata = this.getMetadata(data['classname']);
        if (!objectMetadata) {
            throw AppError.metadataNotFound(data['classname']);
        }
        // console.log('data', data);
        // console.log('objectMetadata', objectMetadata);

        let object = Object.create(objectMetadata['prototype']);

        // if (!this._links.hasOwnProperty(object.constructor.name)) {
        //     this._links[object.constructor.name] = {};
        // }
        // this._links[object.constructor.name][object['_id']] = object;

        let mapping = objectMetadata['mapping'];
        for (const fieldKey in mapping) {
            // console.log(mapping[fieldKey].type);
            switch (mapping[fieldKey].type) {
                case SerializeType.Boolean:
                case SerializeType.Number:
                case SerializeType.String:
                case SerializeType.Bigint:
                    object[fieldKey] = data['data'][fieldKey];
                    break;
                case SerializeType.Object:
                    if (data['data'][fieldKey] !== undefined) {
                        object[fieldKey] = this.unserialize(data['data'][fieldKey]);
                    } else {
                        object[fieldKey] = undefined;
                    }
                    break;
                case SerializeType.Collection:
                    object[fieldKey] = this._unserializeCollection(data['data'][fieldKey])
                    break;
                case SerializeType.Link:
                    object[fieldKey] = this._unserializeLinkObject(data['data'][fieldKey]);
                    break;
                case SerializeType.LinkCollection:
                    object[fieldKey] = this._userializeLinkCollection(data['data'][fieldKey]);
                    break;
                default:
                    throw new AppError(sprintf('Тип "%s" не поддерживается системой сериализации.', objectMetadata.mapping[fieldKey].type));
                    break;
            }//end switch

            if (fieldKey === '_id') {
                this._addLink(object);
            }
        }//end forin

        return object;
    }

    private _serializeCollection(collection) {
        let result = [];
        for (let i = 0; i < collection.length; i++) {
            if (PrimitiveType[typeof collection[i]]) {
                result.push(collection[i]);
            } else if (this.hasMetadata(collection[i].constructor.name)) {
                result.push(this.serialize(collection[i]));
            }
            //else: Объекты для которых нет метаданные не сериализуются.
        }

        return result;
    }

    private _unserializeCollection(data) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i]);
            if (PrimitiveType[typeof data[i]]) {
                result.push(data[i]);
            } else {
                result.push(this.unserialize(data[i]));
            }
        }

        return result;
    }

    private _serializeLinkCollection(collection) {
        return _.map(collection, (item) => {
            return this._serializeLinkObject(item);
        });
    }

    private _userializeLinkCollection(data) {
        return _.map(data, (item) => {
            return this._unserializeLinkObject(item);
        });
    }

    private _serializeLinkObject(object) {
        let idGetMethodNames = [
            '_id',
            'id',
        ];

        let idGetMethodName: string = _.filter(idGetMethodNames, (idGetMethodName) => {
            return object.hasOwnProperty(idGetMethodName);
        })[0].toString();
        if (!idGetMethodName) {
            throw new AppError(sprintf('У объекта "%s" не найден ни один из методов доступа "(%s)".',
                object.constructor.name,
                _.join(idGetMethodNames, ', '),
            ));
        }

        return {
            classname: object.constructor.name,
            id: object[idGetMethodName],
        };
    }

    private _unserializeLinkObject(data) {
        //todo: Временно. Место поиска Link объектов надо указывать в метаданных.
        if (this._links.hasOwnProperty(data['classname'])) {
            return this._links[data['classname']][data['id'].toString()];
        } else {
            return this._container.get<RepositoryManager>('core.repositoryManager').getRepository(data['classname']).getOneByID(data['id']);
        }
    }

    private _addLink(object) {
        if (!this._links.hasOwnProperty(object.constructor.name)) {
            this._links[object.constructor.name] = {};
        }
        this._links[object.constructor.name][object['_id']] = object;
    }
}