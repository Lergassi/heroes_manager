// import Container from '../core/source/Container.js';
// import ArmorMaterial from '../core/app/Entities/ArmorMaterial.js';
// import debug from 'debug';
// import DebugContainer from '../core/source/Debug/DebugContainer.js';
// import coreConfig from '../core/config/main.js';
// import clientConfig from '../client/config/main.js';
// import serverConfig from '../server/config/main.js';
// import ClientContainerConfigure from '../client/app/ContainerConfigure.js';
// import ServerContainerConfigure from '../server/app/ContainerConfigure.js';
// import SiteRoutes from '../server/app/Routes/SiteRoutes.js';
// import mysql from 'mysql';
// import UserDBObject, {UserDBObjectState} from '../server/app/DBObjects/UserDBObject.js';
// import UserDBObjectRepository from '../server/app/Repositories/UserDBObjectRepository.js';
// import {v4} from 'uuid';
// import PasswordHasher from '../server/source/PasswordHasher.js';
// import UserDBObjectFactory from '../server/app/Factories/UserDBObjectFactory.js';
// // import * from 'uuid';
//
// class Point {
//     x: number;
//     y: number;
// }
//
// class AppDebugger {
//     _items;
//     constructor() {
//         this._items = [];
//     }
//
//     createContainer() {
//         let container = new DebugContainer();
//         this._items.push(container);
//
//         return container;
//     }
//
//     debug() {
//         for (let i = 0; i < this._items.length; i++) {
//             debug('debug')('%o', this._items[i]);
//         }
//     }
// }
//
// export let containerConfigure = function () {
//     let container = new Container();
// }
//
// export function testObjectDebugger() {
//     let appDebugger = new AppDebugger();
//
//     const armorMaterialRepository = new ArmorMaterialRepository();
//     armorMaterialRepository.debug(appDebugger.createContainer());
//     // console.log(appDebugger);
//     // appDebugger.debug();
//     // console.log(armorMaterialRepository.getOneByAlias('armor_material_plate'));
//
//     // debug('debug')('%O', debugContainer);
//     // debug('debug')('%o', debugContainer);
//     // debug('debug')('%j', debugContainer);
//
//     let plate: ArmorMaterial = armorMaterialRepository.getOneByAlias('armor_material_plate');
//     let leather: ArmorMaterial = armorMaterialRepository.getOneByAlias('armor_material_leather');
//     let cloth: ArmorMaterial = armorMaterialRepository.getOneByAlias('armor_material_cloth');
//     // console.log(plate);
//     // plate.debug();
//     // console.log(util.inspect(plate, {
//     //     showHidden: false,
//     //     depth: null,
//     // }));
//     // debug('debug')('%j', plate);
//     // const debugContainer = new DebugContainer();
//
//     // let objectDebugger = {};
//
//     // appDebugger.createContainer();
//
//     let debugContainer = {};
//     // plate.debug(debugContainer);
//     // leather.debug(debugContainer);
//     // cloth.debug(debugContainer);
//
//     // plate.debug(appDebugger.createContainer());
//     // leather.debug(appDebugger.createContainer());
//     // cloth.debug(appDebugger.createContainer());
//
//     // console.log('console.log', debugContainer);
//     // console.log('console.log', appDebugger);
//     // debug('debug')('%O', debugContainer);
//     // debug('debug')('%o', debugContainer);
//     // debug('debug')('%j', debugContainer);
//     // totalDebugger.push(objectDebugger);
//     // totalDebugger.push(objectDebugger);
//     // totalDebugger.push(objectDebugger);
//     // totalDebugger.push(objectDebugger);
//     // testAllDebugFormatters(objectDebugger);
//     // testAllDebugFormatters(totalDebugger);
//     // debugHandler(appDebugger);
//     // debugHandler({});
//     appDebugger.debug();
// }
//
// function testAllDebugFormatters(debugContainer) {
//     debug('debug')('%O', debugContainer);
//     debug('debug')('%o', debugContainer);
//     debug('debug')('%s', debugContainer);
//     debug('debug')('%d', debugContainer);
//     debug('debug')('%j', debugContainer);
//     debug('debug')('%%', debugContainer);
// }
//
// function debugHandler(appDebugger: any);
// function debugHandler(appDebugger: AppDebugger);
// function debugHandler(appDebugger: AppDebugger | any) {
//     if (appDebugger instanceof AppDebugger) {
//         appDebugger.debug();
//     } else {
//         debug('debug')('%o', appDebugger);
//     }
// }
//
// let o1 = {
//     repository: {
//         length: 3,
//         0: {_id: 1, name: 'Латы', alias: 'plate'},
//         1: {_id: 1, name: 'Кожа', alias: 'leather'},
//         2: {_id: 1, name: 'Ткань', alias: 'cloth'},
//     }
// };
// let o2 = {
//     length: 3,
//     0: {_id: 1, name: 'Латы', alias: 'plate'},
//     1: {_id: 1, name: 'Кожа', alias: 'leather'},
//     2: {_id: 1, name: 'Ткань', alias: 'cloth'},
// };
// let o3 = [
//     'ArmorMaterialRepository.length: 3',
//     {_id: 1, name: 'Латы', alias: 'plate'},
//     {_id: 1, name: 'Кожа', alias: 'leather'},
//     {_id: 1, name: 'Ткань', alias: 'cloth'},
// ];
// /*
// debug:
// length: 3
// {_id: 1, name: 'Латы', alias: 'plate'}
// {_id: 1, name: 'Кожа', alias: 'leather'}
// {_id: 1, name: 'Ткань', alias: 'cloth'}
//  */
//
// function testConfig() {
//     debug('debug')('%O', coreConfig);
//     debug('debug')('%O', clientConfig);
//     debug('debug')('%O', serverConfig);
// }
//
// export function testCore() {
//
// }
//
// export function testClient() {
//     let container = new Container();
//     let containerConfigure = new ClientContainerConfigure();
//     containerConfigure.configure(container);
//     debug('debug:client')(container.get('config'));
// }
//
// export function testServer() {
//     let container = createServerContainer();
//     console.log(container);
// }
//
// export function testCommon() {
//
// }
//
// export function devRouteRegistration() {
//     let container = createServerContainer();
//
//     let siteRoutes = new SiteRoutes();
//     siteRoutes.register(container.get('router'));
// }
//
// function createClientContainer() {
//     let container = new Container();
//     let containerConfigure = new ClientContainerConfigure();
//     containerConfigure.configure(container);
//
//     return container;
// }
//
// function createServerContainer() {
//     let container = new Container();
//     let containerConfigure = new ServerContainerConfigure();
//     containerConfigure.configure(container);
//
//     return container;
// }
//
// export function mysqlGetStarted() {
//     let container = createServerContainer();
//     let config = container.get('config');
//
//     let connection = mysql.createConnection({
//         host     : config.db_host,
//         user     : config.db_user,
//         password : config.db_password,
//         database : config.db_database_name,
//     });
//
//     // connection.connect();
//
//     // connection.query('select * from users', function (error, results, fields) {
//     //     if (error) throw error;
//     //     console.log('users: ', results);
//     // });
//
//     // connection.end();
//
//     connection.connect((error) => {
//         if (error) throw error;
//
//         console.log('connected as id ' + connection.threadId);
//         connection.query('select * from users', function (error, results, fields) {
//             if (error) throw error;
//             console.log('users: ', results);
//         });
//     });
// }
//
// export function devMysqlPooling(pool) {
//     // let container = createServerContainer();
//     // let config = container.get('config');
//     //
//     // let pool  = mysql.createPool({
//     //     connectionLimit : 3,
//     //     host            : config.db_host,
//     //     user            : config.db_user,
//     //     password        : config.db_password,
//     //     database        : config.db_database_name,
//     // });
//
//     // pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     //     if (error) throw error;
//     //     console.log('The solution is: ', results[0].solution);
//     // });
//
//     pool.query('select * from users', function (error, results, fields) {
//         if (error) throw error;
//         console.log('users: ', results.length);
//     });
//     pool.query('select * from users', function (error, results, fields) {
//         if (error) throw error;
//         console.log('users: ', results.length);
//     });
//     pool.query('select * from users', function (error, results, fields) {
//         if (error) throw error;
//         console.log('users: ', results.length);
//     });
// }
//
// export function devMysqlPoolingFromContainer() {
//     let container = createServerContainer();
//     let pool = container.get('database.pool');
//     devMysqlPooling(pool);
// }
//
// export async function devUserRepository() {
//     let container = createServerContainer();
//
//     let ID = '751003f2-16de-4967-b292-a9dd10c13c23';
//     let email = 'user03@email.com';
//
//     let userRepository = new UserDBObjectRepository(UserDBObject.name, container.get('database.pool'));
//     debug('debug')('%O', await userRepository.loadOneById(ID));
//     debug('debug')('%O', await userRepository.loadOneByEmail(email));
// }
//
// export async function dev_userRepository_save() {
//     let container: Container = createServerContainer();
//     let passwordHasher: PasswordHasher = container.get('passwordHasher');
//     let userRepository: UserDBObjectRepository = container.get('userDBObjectRepository');
//
//     let id = v4();
//     let salt = passwordHasher.salt();
//     let data = {
//         id: id,
//         createdAt: '2022-05-31 05:16:06',
//         email: id + '@email.com',
//         salt: salt,
//         passwordHash: passwordHasher.hash('password', salt),
//         state: UserDBObjectState.ACTIVE,
//         isVerified: false,
//     };
//
//     let user = UserDBObject.create(
//         <string>data.id,
//         new Date(data.createdAt),
//         data.email,
//         data.salt,
//         data.passwordHash,
//         <UserDBObjectState>data.state,
//         data.isVerified,
//     );
//     // debug('debug')(user);
//     let r = await userRepository.save(user);
//     console.log('r', r);
//     console.log('user', user);
// }
//
// export function createUser() {
//     console.log(UserDBObject.create(
//         '42',
//         new Date(),
//         'user01@email.com',
//         'salt',
//         'passwordHash',
//         UserDBObjectState.ACTIVE,
//         false,
//     ));
// }
//
// export function createUserFromRawData() {
//     let data = {
//         id: '751003f2-16de-4967-b292-a9dd10c13c23',
//         createdAt: '2022-05-31 05:16:06',
//         email: 'user01@email.com',
//         salt: 'salt',
//         passwordHash: 'passwordHash',
//         // state: 1,
//         state: 'ACTIVE',
//         isVerified: 'false',
//     };
//
//     console.log(UserDBObject.create(
//         <string>data.id,
//         new Date(data.createdAt),
//         data.email,
//         data.salt,
//         data.passwordHash,
//         <UserDBObjectState>data.state,
//         // <boolean>data.isVerified,
//         // data.isVerified,
//         false,
//     ));
// }
//
// export function testUsageEnum() {
//     // testNumericEnumAssert(UserState.ACTIVE)
//     // testNumericEnumAssert(1)
//     // testNumericEnumAssert(42)
//
//     let value = 'Up';
//
//     // testStringEnumAssert(Direction.Up);
//     // testStringEnumAssert(Direction['Up']);
//     // testStringEnumAssert(Direction[value]);
//     // console.log(keyof Point);
//     type P = keyof Point;
//     type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
//     // type ID = number | string;
//     type ID = number;
//     // let id: ID = 42;
//     // let id: ID = 'asd';
//     // let log: LogLevelStrings = 'ERROR';
//     // console.log(P);
//     // console.log(LogLevelStrings.);
//     // console.log(ID);
//
//     type State = 'ACTIVE' | 'BANNED';
//
//     // let state: UserState = 'BANNED';
//     // let state: UserState = UserState.BANNED;
//     let state: UserDBObjectState = UserDBObjectState['ACTIVE'];
//     // let state: State = 'BANNED';
// }
//
// function testNumericEnumAssert(state: UserDBObjectState) {
//     console.log('state', state);
// }
//
// // function testStringEnumAssert(direction: Direction) {
// //     console.log('direction', direction);
// // }
//
// export async function dev_userFactory() {
//     let container: Container = createServerContainer();
//     let userFactory: UserDBObjectFactory = container.get('userDBObjectFactory');
//     let userRepository: UserDBObjectRepository = container.get('userDBObjectRepository');
//
//     let user = userFactory.create('user100@email.com', 'qweasdzxc');
//     await userRepository.save(user);
// }