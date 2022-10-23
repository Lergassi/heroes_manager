import GameObject from '../../source/GameObject.js';

//todo: Не актуально. Теперь фабрика всегда добавляет объект в gameObjectStorage.
export default interface ItemStorageFactoryInterface {
    create(size: number): GameObject;
}