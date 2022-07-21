import Repository from '../../../core/source/Repository.js';
import {Connection, Pool} from 'mysql';
import AppError from '../../../core/source/AppError.js';
import UserDBObject, {UserDBObjectState} from '../DBObjects/UserDBObject.js';
import debug from 'debug';
import dateFns from 'date-fns';
import {DateFormat} from '../../../core/source/DateFormat.js';
import fns from 'date-fns';

export default class UserDBObjectRepository<Entity> extends Repository<Entity> {
    private _pool: Pool;

    constructor(entityName: string, pool: Pool) {
        super(entityName);
        this._pool = pool;
    }

    async loadOneById(id) {
        let query = 'select * from users where id = ?';
        return this._selectQuery(query, [id]);
    }

    async loadOneByEmail(email, callback = undefined) {
        let query = 'select * from users where email = ?';
        return this._selectQuery(query, [email], callback);
    }

    private async _selectQuery(query, values, callback = undefined) {
        return new Promise((resolve, reject) => {
            this._pool.query(query, values, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }

                if (!results.length) {
                    return reject(new AppError('Пользователь не найден.'));
                }

                const userDBObject = Object.create(UserDBObject.prototype);

                userDBObject['_id'] = results[0]['id'];
                userDBObject['_createdAt'] = new Date(results[0]['created_at']);
                userDBObject['_email'] = results[0]['email'];
                userDBObject['_salt'] = results[0]['salt'];
                userDBObject['_password'] = results[0]['password'];
                userDBObject['_state'] = <UserDBObjectState>results[0]['state'];
                userDBObject['_isVerified'] = Boolean(results[0]['is_verified']);

                return resolve(userDBObject);
            });
        });
    }

    save(connection, userDBObject: UserDBObject, resolve, reject) {
        let rawValues = [
            userDBObject['_id'],
            dateFns.format(userDBObject['_createdAt'], DateFormat.MYSQL),
            userDBObject['_email'],
            userDBObject['_salt'],
            userDBObject['_passwordHash'],
            userDBObject['_state'],
            userDBObject['_isVerified'],
        ];

        let query = 'insert into users (id, created_at, email, salt, password, state, is_verified) value (?, ?, ?, ?, ?, ?, ?)';

        connection.query(query, rawValues, (error, results, fields) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    }
}