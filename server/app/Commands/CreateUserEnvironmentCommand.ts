import Input from '../../../core/source/GameConsole/Input.js';
import Command from '../../../core/source/GameConsole/Command.js';
import UserDBObjectFactory from '../Factories/UserDBObjectFactory.js';
import UserDBObjectRepository from '../Repositories/UserDBObjectRepository.js';
import UserDBObject from '../DBObjects/UserDBObject.js';
import fs from 'fs';
import {Pool} from 'mysql';
import Security from '../../source/Security.js';
import PathResolver from '../../source/PathResolver.js';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import DebugApp from '../../../core/app/Services/DebugApp.js';

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
        this.container.get<Security>('server.security').assertIsUserAlreadyLoaded();

        let email = input.getArgument('email').trim();
        let password = input.getArgument('password');

        let userDBObjectFactory: UserDBObjectFactory = this.container.get<UserDBObjectFactory>('server.userDBObjectFactory');
        let userDBObject = userDBObjectFactory.create(email, password);

        let pool: Pool = this.container.get<Pool>('server.database.pool');

        let userDBObjectRepository = this.container.get<UserDBObjectRepository<UserDBObject>>('server.userDBObjectRepository');

        pool.getConnection((err, connection) => {
            new Promise((resolve, reject) => {
                connection.beginTransaction((error) => {
                    userDBObjectRepository.save(connection, userDBObject, resolve, reject);
                });//beginTransaction
            })
                .then(() => {
                    //todo: Делать проверки перед всеми операциями и только в конце их выполнять. canCreateUserSaveDir(), etc.
                    DebugApp.debug(DebugNamespaceID.Info)('Пользователь создан: ', userDBObject['_id']);

                    //todo: Сделать все доступные пути. test
                    let userSaveDir = this.container.get<PathResolver>('server.pathResolver').resolve(
                        'server/data/saves',
                        userDBObject['_id'].toString(),
                    );
                    fs.mkdirSync(userSaveDir);
                    fs.chownSync(userSaveDir, 1001, 1001);

                    DebugApp.debug(DebugNamespaceID.Info)('Директория создана: ' + userSaveDir);

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
                    // this.container.set('server.userDBObject', userGameObject);
                    // this.container.set('server.userDBObject', userDBObject);
                    this.container.get<Security>('server.security').loginUser(userDBObject);
                })
                .catch((error) => {
                    DebugApp.debug(DebugNamespaceID.Error)(error);
                    connection.rollback();
                })
            ;
        });//end Promise connection.beginTransaction
    }
}