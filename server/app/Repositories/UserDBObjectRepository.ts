import Repository from '../../../core/source/Repository.js';
import {Connection, Pool} from 'mysql';
import AppError from '../../../core/source/AppError.js';
import UserDBObject, {UserDBObjectState} from '../DBObjects/UserDBObject.js';
import debug from 'debug';
import dateFns from 'date-fns';
import {DateFormat} from '../../../core/source/DateFormat.js';

export default class UserDBObjectRepository<Entity> extends Repository<Entity> {
    private _pool: Pool;

    constructor(entityName: string, pool: Pool) {
        super(entityName);
        this._pool = pool;
    }

    async loadOneById(id) {
        let query = 'select * from users where id = ?';
        let user = await this._selectQuery(query, [id]);

        //todo: Отлов ошибок.
        //todo: Перенести в один метод.
        if (!user) {
            throw new AppError('Пользователь не найден.');
        }

        return user;
    }

    async loadOneByEmail(email) {
        let query = 'select * from users where email = ?';
        let user = await this._selectQuery(query, [email]);

        //todo: Отлов ошибок.
        //todo: Перенести в один метод.
        if (!user) {
            throw new AppError('Пользователь не найден.');
        }

        return user;
    }

    private _selectQuery(query, values) {
        return new Promise((resolve, reject) => {
            this._pool.query(query, values, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }

                //todo: Сделать return reject когда будет переделан механизм отлова ошибок.
                if (!results.length) {
                    return resolve(undefined);
                }

                return resolve(UserDBObject.create(
                    results[0].id,
                    new Date(results[0].created_at),
                    results[0].email,
                    results[0].salt,
                    results[0].password,
                    <UserDBObjectState>results[0].state,
                    Boolean(results[0].is_verified),
                ));
            }.bind(this));
        });
    }

    async save(user: UserDBObject) {
        return new Promise((resolve, reject) => {
            let rawValues = [
                user['_id'],
                dateFns.format(user['_createdAt'], DateFormat.MYSQL),
                user['_email'],
                user['_salt'],
                user['_passwordHash'],
                user['_state'],
                user['_isVerified'],
            ];

            let query = 'insert into users (id, created_at, email, salt, password, state, is_verified) value (?, ?, ?, ?, ?, ?, ?)';

            this._pool.query(query, rawValues, (error, results, fields) => {
                if (error) {
                    return reject(error);
                }

                return resolve(true);
            });
        });
    }
}