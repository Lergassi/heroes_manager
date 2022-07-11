import config from '../config/main.js';
import Container from '../../core/source/Container.js';
import AbstractContainerConfigure from '../../core/source/AbstractContainerConfigure.js';
import Router from '../source/Router.js';
import SiteRoutes from './Routes/SiteRoutes.js';
import AdminRoutes from './Routes/AdminRoutes.js';
import DevRoutes from './Routes/DevRoutes.js';
import SandboxRoutes from './Routes/SandboxRoutes.js';
import TestRoutes from './Routes/TestRoutes.js';
import mysql from 'mysql';
import PasswordHasher from '../source/PasswordHasher.js';
import UserDBObjectRepository from './Repositories/UserDBObjectRepository.js';
import UserDBObject from './DBObjects/UserDBObject.js';
import UserDBObjectFactory from './Factories/UserDBObjectFactory.js';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: Container): Container {
        container.set('config', config);
        container.set('router', (container) => {
            let router = new Router(container, container.get('config').services.router.controllerDir);

            (new SiteRoutes()).register(router);
            (new AdminRoutes()).register(router);

            //todo: Только для dev.
            (new DevRoutes()).register(router);
            (new SandboxRoutes()).register(router);
            (new TestRoutes()).register(router);

            return router;
        });
        container.set('database.pool', (container) => {
            let config = container.get('config');

            return mysql.createPool({
                connectionLimit : config.services.database.connectionLimit,
                host            : config.services.database.host,
                user            : config.services.database.user,
                password        : config.services.database.password,
                database        : config.services.database.name,
            })
        });
        container.set('passwordHasher', (container) => {
            return new PasswordHasher();
        });
        container.set('userDBObjectFactory', (container) => {
            return new UserDBObjectFactory(container.get('database.pool'), container.get('passwordHasher'));
        });
        container.set('userDBObjectRepository', (container) => {
            // return new UserDBObjectRepository(UserDBObject.name, container.get('database.pool'));
            return new UserDBObjectRepository<UserDBObject>(UserDBObject.name, container.get('database.pool'));
        });

        return container;
    }
}