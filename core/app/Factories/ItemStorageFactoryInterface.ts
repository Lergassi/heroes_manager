import GameObject from '../../source/GameObject.js';

export default interface ItemStorageFactoryInterface {
    create(size: number): GameObject;
}