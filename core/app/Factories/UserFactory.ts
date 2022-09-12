import GameObject from '../../source/GameObject.js';
import UserComponent from '../Components/UserComponent.js';
import UUIDGenerator from '../../source/UUIDGenerator.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';

export default class UserFactory {
    private readonly _idGenerator: IDGeneratorInterface;

    constructor(idGenerator: IDGeneratorInterface) {
        this._idGenerator = idGenerator;
    }

    create(): GameObject {
        let userGameObject = new GameObject(this._idGenerator.generateID());

        userGameObject.name = 'User';
        userGameObject.addTags('#user');

        userGameObject.addComponent(new UserComponent(
            this._idGenerator.generateID(),
            userGameObject,
        ));

        return userGameObject;
    }
}