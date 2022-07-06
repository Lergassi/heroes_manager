import PasswordHasher from '../../source/PasswordHasher.js';
import {Pool} from 'mysql';
import {v4} from 'uuid';
import UserDBObject, {UserDBObjectState} from '../DBObjects/UserDBObject.js';

export default class UserDBObjectFactory {
    private readonly _pool: Pool;
    private readonly _passwordHasher: PasswordHasher;

    constructor(pool: Pool, passwordHasher: PasswordHasher) {
        this._pool = pool;
        this._passwordHasher = passwordHasher;
    }

    //todo: Сделать проверку данных. email, id, etc...
    create(email, password) {
        let id = v4();
        let salt = this._passwordHasher.salt();

        return UserDBObject.create(
            id,
            new Date(),
            email,
            salt,
            this._passwordHasher.hash(password, salt),
            UserDBObjectState.ACTIVE,
            false,
        );
    }
}