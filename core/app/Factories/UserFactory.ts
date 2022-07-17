import AutoIncrementIDGenerator from '../../source/AutoIncrementIDGenerator.js';
import PasswordHasher from '../../../server/source/PasswordHasher.js';
import GameObject from '../../source/GameObject.js';
import UserComponent from '../Components/UserComponent.js';

export default class UserFactory {
    private readonly _idGenerator: AutoIncrementIDGenerator;

    constructor(idGenerator: AutoIncrementIDGenerator) {
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