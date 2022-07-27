import Input from '../../../core/source/GameConsole/Input.js';
import Command from '../../../core/source/GameConsole/Command.js';
import UserDBObjectFactory from '../Factories/UserDBObjectFactory.js';
import UserDBObjectRepository from '../Repositories/UserDBObjectRepository.js';
import UserDBObject from '../DBObjects/UserDBObject.js';
import {v4} from 'uuid';
import fs from 'fs';
import {Pool} from 'mysql';
import debug from 'debug';
import path from 'path';
import Security from '../../source/Security.js';
import AppError from '../../../core/source/AppError.js';

//todo: Не работает.
export default class CreateUserEnvironmentSyncCommand extends Command {
    get name(): string {
        return 'create_user_env_sync';
    }

    get description(): string {
        return 'Создает пользователя в бд и окружение.';
    }

    configure() {
        super.configure();
        this.addArgument('email', '', true);
        this.addArgument('password', '', true);
    }

    async execute(input: Input, callback = undefined) {
        this.container.get<Security>('server.security').assertIsUserAlreadyLoaded();

        let email = input.getArgument('email').trim();
        let password = input.getArgument('password');

        let userDBObjectFactory: UserDBObjectFactory = this.container.get<UserDBObjectFactory>('server.userDBObjectFactory');
        let userDBObject = userDBObjectFactory.create(email, password);

        let pool: Pool = this.container.get<Pool>('server.database.pool');
        let userDBObjectRepository = this.container.get<UserDBObjectRepository<UserDBObject>>('server.userDBObjectRepository');

        // let result = await userDBObjectRepository.saveSync(userDBObject);
        // // this.container.set('result', result)
        // console.log('result', result);

        return new Promise((resolve, reject) => {
        // new Promise((resolve, reject) => {
            pool.getConnection(async (error, connection) => {
                await new Promise((resolve1, reject1) => {
                    connection.beginTransaction(async (error1) => {
                        if (error1) {
                            return reject1(error1);
                        }
                        // userDBObjectRepository.save(connection, userDBObject, resolve, reject);
                        let result = await userDBObjectRepository.saveSync(userDBObject);
                        this.container.set('result', result)
                        console.log('result in promise', result);
                        throw new AppError('42');

                        // return resolve(200);
                        return resolve1(connection);
                    });//beginTransaction
                })
                    .then((result) => {
                        console.log('beginTransaction promise then');
                        // connection.commit();
                        connection.rollback();

                        return resolve(result);
                    })
                    .catch((error) => {
                        console.log('beginTransaction promise catch');
                        connection.rollback();

                        return reject(error);
                    })
                ;
            });//end Promise connection.beginTransaction
        })
            .then((result) => {
                console.log('top promise then');
                // connection.commit();
            })
            .catch(((error) => {
                console.log('top promise catch');
                // debug('error')(error);
                // connection.rollback();
            }))
        ;

        // pool.getConnection((err, connection) => {
        //     new Promise((resolve, reject) => {
        //         connection.beginTransaction(async (error) => {
        //             // userDBObjectRepository.save(connection, userDBObject, resolve, reject);
        //             let result = await userDBObjectRepository.saveSync(userDBObject);
        //             this.container.set('result', result)
        //             console.log(result);
        //         });//beginTransaction
        //     })
        //         .then(() => {
        //             // //todo: Делать проверки перед всеми операциями и только в конце их выполнять. canCreateUserSaveDir(), etc.
        //             // debug('info')('Пользователь создан: ', userDBObject['_id']);
        //             //
        //             // let userSaveDir = path.resolve(
        //             //     this.container.get<object>('server.config')['savesDir'],
        //             //     userDBObject['_id'],
        //             // );
        //             // fs.mkdirSync(userSaveDir);
        //             // fs.chownSync(userSaveDir, 1001, 1001);
        //             //
        //             // debug('info')('Директория создана: ' + userSaveDir);
        //             //
        //             // //Сохранение в файл.
        //             // // let userSave = new Save(new Date(), userGameObject.save());
        //             // // let userSaveObject = userSave.save();
        //             // //
        //             // // let fileSystemFacade = this.container.get('fileSystemFacade');
        //             // // let file = this.container.get('paths').getUserSaveFile(userDatabaseObject.id);
        //             // //
        //             // // fileSystemFacade.writeFileSync(file, JSON.stringify(userSaveObject));
        //             //
        //             // connection.commit();
        //             // // connection.rollback();
        //             //
        //             // //todo: Заменить на GameObject.
        //             // // this.container.set('server.userDBObject', userGameObject);
        //             // // this.container.set('server.userDBObject', userDBObject);
        //             // this.container.get<Security>('server.security').loginUser(userDBObject);
        //             // // if (callback) {
        //             // //     callback();
        //             // // }
        //         })
        //         .catch((error) => {
        //             debug('error')(error);
        //             connection.rollback();
        //         })
        //     ;
        // });//end Promise connection.beginTransaction
    }
}