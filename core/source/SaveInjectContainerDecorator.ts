import ContainerInterface from './ContainerInterface.js';
import Serializer from './Serializer.js';
import _ from 'lodash';

export default class SaveInjectContainerDecorator implements ContainerInterface {
    private readonly _container: ContainerInterface;
    private readonly _serializer: Serializer;
    private readonly _metadata;
    private readonly _data;

    constructor(serializer: Serializer, container: ContainerInterface, data = {}) {
        this._serializer = serializer;
        this._container = container;
        // this._metadata = metadata;
        this._data = data;
    }

    set<T>(key: string, value: (container: ContainerInterface) => T): void;
    set<T>(key: string, value: T): void;
    set<T>(key: string, value: T | ((container: ContainerInterface) => T)): void {
        let data = _.find(this._data, (item) => {
            return item['serviceName'] === key;
        });

        if (data) {
            // console.log('Save inject work!');
            // this._container.set(key, this._data[key]);
            // this._container.set(key, value);
            this._container.set(key, this._serializer.unserialize(data));
        } else {
            this._container.set(key, value);
        }
    }

    get(key: string): any {
        return this._container.get(key);
    }

    has(key: string): boolean {
        return this._container.has(key);
    }

    remove(key: string): void {
        this._container.remove(key);
    }
}