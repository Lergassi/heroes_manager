import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import _ from 'lodash';
import UserDBObjectRepository from '../Repositories/UserDBObjectRepository.js';
import UserDBObject from '../DBObjects/UserDBObject.js';
import debug from 'debug';
import AppError from '../../../core/source/AppError.js';
import finalhandler from 'finalhandler';

export default class LoadUserEnvironmentCommand extends Command {
    get name(): string {
        return 'load_user_env';
    }

    configure() {
        super.configure();
        this.addArgument('email', '', true);
    }

    async execute(input: Input) {
        // console.log(req);
        // return;
        this.container.get('security').assertIsUserAlreadyLoaded();

        const email = _.trim(input.getArgument('email'));
        const userDBObjectRepository: UserDBObjectRepository<UserDBObject> = this.container.get('userDBObjectRepository');
        // userDBObjectRepository.loadOneByEmail(email, (userDBObject) => {
        //     console.log(userDBObject);
        //     if (userDBObject) {
        //         this.container.set('user', userDBObject);
        //         debug('info')('Пользователь загружен, ID: ' + userDBObject['_id']);
        //     } else {
        //         console.log('Пользователь не найден.');
        //     }
        // });

        // console.log(1);
        // userDBObjectRepository.loadOneByEmail(email)
        //     .then((userDBObject) => {
        //         // console.log('execute then', result);
        //         this.container.set('user', userDBObject);
        //         debug('info')('Пользователь загружен, ID: ' + userDBObject['_id']);
        //     })
        //     .catch((error) => {
        //         // console.log('execute catch', error);
        //         debug('error')(error);
        //         // throw error;
        //     })
        // ;
        // console.log(2);

        // console.log(1);
        // const userDBObject = await userDBObjectRepository.loadOneByEmail(email)
        //     // .then((result) => {
        //     //     console.log('await then', result);
        //     // })
        //     .catch((error) => {
        //         console.log('await catch', error);
        //         // throw new AppError('42');
        //     })
        // ;
        // this.container.set('user', userDBObject);
        // debug('info')('Пользователь загружен, ID: ' + userDBObject['_id']);
        // console.log(2);

        const userDBObject = await userDBObjectRepository.loadOneByEmail(email);
        this.container.set('user', userDBObject);
        debug('info')('Пользователь загружен, ID: ' + userDBObject['_id']);
    }
}