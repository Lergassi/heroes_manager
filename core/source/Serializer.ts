import AppError from './AppError.js';
import {sprintf} from 'sprintf-js';
import ContainerInterface from './ContainerInterface.js';
import _ from 'lodash';
import MetadataManager from './MetadataManager.js';

export enum PrimitiveType {
    undefined = 'undefined',
    boolean = 'boolean',
    number = 'number',
    string = 'string',
    // bigint = 'bigint',
    symbol = 'symbol',
}

export enum SerializeType {
    // Undefined = 'Undefined',
    Boolean = 'Boolean',
    Number = 'Number',
    String = 'String',
    // Bigint = 'Bigint',
    // Symbol = 'Symbol',
    Object = 'Object',          //Объект, на который нет ссылок.
    Collection = 'Collection',  //
    Link = 'Link',              //Объект существует в единочном экземляре.
    LinkCollection = 'LinkCollection',
}

export interface DataInterface {
    classname: string;
    data: object;
}

export class ProxyLink {
    public o;
    public property: string;
    public classname: string;
    public id: number;

    constructor(o, property: string, classname: string, id: number) {
        this.o = o;
        this.property = property;
        this.classname = classname;
        this.id = id;
    }
}

interface SerializeData {
    classname: string;
    data: object;
}

interface SerializedObject {
    classname: string;
    data: object;
}

export default class Serializer {
    private readonly _metadataManager: MetadataManager;
    private readonly _container: ContainerInterface;
    private readonly _links: {};
    private readonly _objects: {[key: string]: any};
    private readonly _linkRequests: any[];

    constructor(container: ContainerInterface, metadataManager: MetadataManager) {
        this._container = container;
        this._metadataManager = metadataManager;
        this._links = {};
        this._objects = [];
        this._linkRequests = [];
    }

    serialize<T>(o: T): SerializedObject {
        let objectMetadata = this._metadataManager.getMetadata(o.constructor.name);

        let serializedObject: SerializedObject = {
            classname: o.constructor.name,
            data: {},
        };

        //todo: Убрать в класс.
        if (objectMetadata.hasOwnProperty('serviceName')) {
            serializedObject['serviceName'] = objectMetadata['serviceName'];
        }
        for (const fieldKey in objectMetadata.mapping) {
            if (!o.hasOwnProperty(fieldKey)) {
                throw new AppError(sprintf('Поле "%s" не найдено в объекте "%s".', fieldKey, o.constructor.name));
            }

            switch (objectMetadata.mapping[fieldKey].type) {
                case SerializeType.Boolean:
                case SerializeType.Number:
                case SerializeType.String:
                    serializedObject.data[fieldKey] = o[fieldKey];
                    break;
                case SerializeType.Object:
                    serializedObject.data[fieldKey] = o[fieldKey] === null ?
                        serializedObject.data[fieldKey] = null :
                        serializedObject.data[fieldKey] = this.serialize(o[fieldKey]);
                    break;
                case SerializeType.Link:
                    serializedObject.data[fieldKey] = this._serializeLinkObject(o[fieldKey]);
                    break;
                case SerializeType.Collection:
                    serializedObject.data[fieldKey] = this._serializeCollection(o[fieldKey])
                    break;
                case SerializeType.LinkCollection:
                    serializedObject.data[fieldKey] = this._serializeLinkCollection(o[fieldKey]);
                    break;
                default:
                    throw new AppError(sprintf('Тип "%s" не поддерживается системой сериализации.', objectMetadata.mapping[fieldKey].type));
                    break;
            }//end switch (objectMetadata.mapping[fieldKey].type)

            this._checkUndefined(serializedObject.data[fieldKey]);
        }//end for (const fieldKey in objectMetadata.mapping)

        return serializedObject;
    }

    // unserialize<T>(data: object): T {
    unserialize<T>(data: DataInterface): T {
        // console.log('data:');
        // console.dir(data, {depth: 10});
        let objectMetadata = this._metadataManager.getMetadata(data['classname']);
        // console.log('objectMetadata', objectMetadata);

        let object = Object.create(objectMetadata.module.prototype);

        let mapping = objectMetadata.mapping;
        for (const fieldKey in mapping) {
            switch (mapping[fieldKey].type) {
                case SerializeType.Boolean:
                    object[fieldKey] = Boolean(data['data'][fieldKey]);
                    break;
                case SerializeType.Number:
                    object[fieldKey] = Number(data['data'][fieldKey]);
                    break;
                case SerializeType.String:
                    object[fieldKey] = data['data'][fieldKey];
                    break;
                case SerializeType.Object:
                    if (data['data'][fieldKey] !== null) {
                        object[fieldKey] = this.unserialize(data['data'][fieldKey]);
                    } else {
                        object[fieldKey] = null;
                    }
                    break;
                case SerializeType.Collection:
                    object[fieldKey] = this._unserializeCollection(data['data'][fieldKey])
                    break;
                case SerializeType.Link:
                    if (data['data'][fieldKey] !== null) {
                        object[fieldKey] = this._unserializeLinkObject(data['data'][fieldKey]);
                        if (object[fieldKey] === null || object[fieldKey] === undefined) {
                            this._linkRequests.push({
                                // object: object,
                                // property: fieldKey,
                                link: data['data'][fieldKey],
                                callback: (linkInstance) => {
                                    object[fieldKey] = linkInstance;
                                },
                            });
                        }
                    } else {
                        object[fieldKey] = null;
                    }
                    break;
                case SerializeType.LinkCollection:
                    //todo: Тут нужна установка запроса на Link.
                    object[fieldKey] = this._userializeLinkCollection(data['data'][fieldKey]);
                    break;
                default:
                    throw new AppError(sprintf('Тип "%s" не поддерживается системой сериализации.', objectMetadata.mapping[fieldKey].type));
                    break;
            }//end switch
        }//end for (const fieldKey in mapping)

        /**
         * Предполагается пока, что Link может быть только на объекты у которых есть id. Пока id есть не у всех.
         * todo: Позже будет единый контейнер для хранения всех объектов.
         */
        if (object.constructor.name && object.hasOwnProperty('_id')) {
            if (!this._objects.hasOwnProperty(object.constructor.name)) {
                this._objects[object.constructor.name] = {};
            }
            this._objects[object.constructor.name][object['_id']] = object;
        }

        return object;
    }

    /**
     * Примеры примитивных типов: tags.
     *
     * @param collection
     * @private
     */
    private _serializeCollection(collection) {
        let result = [];
        for (let i = 0; i < collection.length; i++) {
            this._checkUndefined(collection[i]);
            if (PrimitiveType[typeof collection[i]] || collection[i] === null) {
                result.push(collection[i]);
            } else if (this._metadataManager.hasMetadata(collection[i].constructor.name)) {
                result.push(this.serialize(collection[i]));
            } else {
                throw new AppError(sprintf('SerializeType.Collection содержит не поддерживаемый тип %s или для объекта не указаны метаданные.', collection[i]?.constructor?.name ?? typeof collection[i]));
            }
            //else: Объекты для которых нет метаданные не сериализуются.
        }

        return result;
    }

    private _unserializeCollection(data) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            if (PrimitiveType[typeof data[i]] || data[i] === null) {
                result.push(data[i]);
            } else {
                result.push(this.unserialize(data[i]));
            }
        }

        return result;
    }

    private _serializeLinkObject(object) {
        if (!object) {
            return null;
        }

        let idGetMethodNames = [
            '_id',
            'id',
        ];

        let idGetMethodName: string = _.filter(idGetMethodNames, (idGetMethodName) => {
            return object.hasOwnProperty(idGetMethodName);
        })[0].toString();
        if (!idGetMethodName) {
            throw new AppError(sprintf('У объекта "%s" не найден ни один из методов доступа к "(%s)".',
                object.constructor.name,
                _.join(idGetMethodNames, ', '),
            ));
        }

        return {
            classname: object.constructor.name,
            id: object[idGetMethodName],
        };
    }

    //todo: Может целевой объект сюда передавать?
    private _unserializeLinkObject(data) {
        let linkObject;
        let callback = this._metadataManager.getMetadata(data['classname']).finderCallback;
        if (callback) {
            linkObject = callback(this._container, data['classname'], data['id']);
        }

        // if (linkObject === undefined) {
        //     this._linkRequests.push({
        //         object: object,
        //         property: fieldKey,
        //         link: data,
        //     });
        // }

        return linkObject;
    }

    private _serializeLinkCollection(collection) {
        return _.map(collection, (item) => {
            this._checkUndefined(item);
            return this._serializeLinkObject(item);
        });
    }

    private _userializeLinkCollection(data) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            let object = this._unserializeLinkObject(data[i]);
            result.push(object);
            if (object === null || object === undefined) {
                //length нужно сохранить, чтобы в замыкании было текущее значение, а не последнее (maxLength).
                let length = result.length;
                this._linkRequests.push({
                    link: data[i],
                    callback: (linkInstance) => {
                        result[length - 1] = linkInstance;
                    },
                });
            }
        }

        return result;
    }

    /**
     * todo: Временно. Вызывается вручную после обработки всех данных. Также finish нужен только для десериализации.
     */
    finish() {
        for (let i = 0; i < this._linkRequests.length; i++) {
            let link = this
                ?._objects[this._linkRequests[i]['link']['classname']]
                ?.[this._linkRequests[i]['link']['id']];
            if (link) {
                this._linkRequests[i]['callback'](link);
            } else {
                throw new AppError(sprintf('Finish: Объект Link %s(%s) не найден.', this._linkRequests[i]['link']['classname'], this._linkRequests[i]['link']['id']));
            }
        }

        this._linkRequests.splice(0, this._linkRequests.length);
    }

    //todo: Временное тестовое решение.
    private _checkUndefined(value) {
        if (typeof value === 'undefined') {
            throw new AppError('Значение не должно быть undefined.');
        }
    }
}