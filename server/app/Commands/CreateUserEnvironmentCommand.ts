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

export default class CreateUserEnvironmentCommand extends Command {
    get name(): string {
        return 'create_user_env';
    }

    get description(): string {
        return 'Создает пользователя в бд и окружение.';
    }

    configure() {
        super.configure();
        this.addArgument('email', '', true);
        this.addArgument('password', '', true);
    }

    async execute(input: Input) {
        // this.container.get('security').assertIsUserAlreadyLoaded();

        let email = input.getArgument('email').trim();
        let password = input.getArgument('password');

        let userDBObjectFactory: UserDBObjectFactory = this.container.get('userDBObjectFactory');
        let userDBObject = userDBObjectFactory.create(email, password);

        let pool: Pool = this.container.get('database.pool');

        let userDBObjectRepository: UserDBObjectRepository<UserDBObject> = this.container.get('userDBObjectRepository');

        pool.getConnection((err, connection) => {
            new Promise((resolve, reject) => {
                connection.beginTransaction((error) => {
                    userDBObjectRepository.save(connection, userDBObject, resolve, reject);
                    debug('info')('Пользователь создан: ', userDBObject['_id']);
                    this.container.set('userDBObject', userDBObject);
                });//beginTransaction
            })
                .then(() => {
                    //todo: Делать проверки перед всеми операциями и только в конце их выполнять. canCreateUserSaveDir(), etc.
                    let userSaveDir = path.resolve(
                        this.container.get('config.server').projectDir,
                        this.container.get('config.server').dataDir,
                        this.container.get('config.server').savesDir,
                        userDBObject['_id'],
                    );
                    fs.mkdirSync(userSaveDir);
                    fs.chownSync(userSaveDir, 1001, 1001);

                    debug('info')('Директория создана: ' + userSaveDir);

                    //Сохранение в файл.
                    // let userSave = new Save(new Date(), userGameObject.save());
                    // let userSaveObject = userSave.save();
                    //
                    // let fileSystemFacade = this.container.get('fileSystemFacade');
                    // let file = this.container.get('paths').getUserSaveFile(userDatabaseObject.id);
                    //
                    // fileSystemFacade.writeFileSync(file, JSON.stringify(userSaveObject));

                    connection.commit();

                    //todo: Заменить на GameObject.
                    // this.container.set('user', userGameObject);
                    this.container.set('user', userDBObject);
                })
                .catch((error) => {
                    debug('error')(error);
                    connection.rollback();
                })
            ;
        });//getConnection
    }
}