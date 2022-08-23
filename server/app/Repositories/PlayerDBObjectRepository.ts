import Repository from '../../../core/source/Repository.js';
import {Pool} from 'mysql';
import AppError from '../../../core/source/AppError.js';
import UserDBObject from '../DBObjects/UserDBObject.js';
import * as dateFns from 'date-fns';
import {DateFormat} from '../../../core/source/DateFormat.js';
import PlayerDBObject, {PlayerState} from '../DBObjects/PlayerDBObject.js';
import UserDBObjectRepository from './UserDBObjectRepository.js';
import {sprintf} from 'sprintf-js';

export default class PlayerDBObjectRepository<Entity> extends Repository<Entity> {
    private _pool: Pool;
    private _userDBObjectRepository: UserDBObjectRepository<UserDBObject>;

    constructor(entityName: string, pool: Pool, userDBObjectRepository: UserDBObjectRepository<UserDBObject>) {
        super(entityName);
        this._pool = pool;
        this._userDBObjectRepository = userDBObjectRepository;
    }

    // async loadOneById(id) {
    //     let query = 'select * from players where id = ?';
    //     return this._selectQuery(query, [id]);
    // }

    async loadOneByName(userDBObject: UserDBObject, name: string) {
        let query = 'select * from players where name = ? and user_id = ?';
        return this._selectQuery(query, [name, userDBObject['_id']]);
    }

    private async _selectQuery(query, values) {
        return new Promise((resolve, reject) => {
            this._pool.query(query, values, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }

                if (!results.length) {
                    //todo: Перенести выше.
                    return reject(new AppError(sprintf('Игрок с id(%s) не найден.', values[0])));
                }

                const playerDBObject = Object.create(PlayerDBObject.prototype);

                playerDBObject['_id'] = results[0]['id'];
                playerDBObject['_createdAt'] = new Date(results[0]['created_at']);
                playerDBObject['_name'] = results[0]['name'];
                playerDBObject['_salt'] = <PlayerState>results[0]['salt'];
                playerDBObject['_userDBObject'] = this._userDBObjectRepository.getOneByID(results[0]['user_id']);

                this.add(playerDBObject);

                return resolve(playerDBObject);
            }.bind(this));
        });
    }

    save(connection, playerDBObject: PlayerDBObject, resolve, reject) {
        let rawValues = [
            playerDBObject['_id'],
            dateFns.format(playerDBObject['_createdAt'], DateFormat.MYSQL),
            playerDBObject['_name'],
            playerDBObject['_state'],
            playerDBObject['_userDBObject']['_id'],
        ];

        let query = 'insert into players (id, created_at, name, state, user_id) value (?, ?, ?, ?, ?)';

        connection.query(query, rawValues, (error, results, fields) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    }
}