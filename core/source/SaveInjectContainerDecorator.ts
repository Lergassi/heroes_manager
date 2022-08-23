import ContainerInterface from './ContainerInterface.js';
import Serializer, {DataInterface} from './Serializer.js';
import _ from 'lodash';
import debug from 'debug';

export default class SaveInjectContainerDecorator implements ContainerInterface {
    private readonly _container: ContainerInterface;
    private readonly _serializer: Serializer;
    private readonly _data;

    constructor(serializer: Serializer, container: ContainerInterface, data = {}) {
        this._serializer = serializer;
        this._container = container;
        this._data = data;
    }

    set<T>(key: string, value: (container: ContainerInterface) => T): void;
    set<T>(key: string, value: T): void;
    set<T>(key: string, value: T | ((container: ContainerInterface) => T)): void {
        let data = <DataInterface>_.find(this._data, (item) => {
            return item['serviceName'] === key;
        });

        if (data) {
            debug('log')('Контейнер установлен из сохранений %s.', data.classname);
            this._container.set(key, this._serializer.unserialize(data));
        } else {
            this._container.set(key, value);
        }
    }

    get<T>(key: string): T {
        return this._container.get(key);
    }

    has(key: string): boolean {
        return this._container.has(key);
    }

    remove(key: string): void {
        this._container.remove(key);
    }
}