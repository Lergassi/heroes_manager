import ContainerConfigure from '../../server/app/ContainerConfigure.js';
import Container from '../../core/source/Container.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Router from '../../server/source/Router.js';

export default class TestContainerConfigure {
    private _name: string = 'Test class: server/ContainerConfigure';

    run() {
        debug('test:server')(sprintf('Run test: %s', this._name));

        let container = (new ContainerConfigure()).configure(new Container());

        //Первым аргументов результат для удобства отображения в консоли.
        debug('test:server')('%o', container.get<object>('server.config') instanceof Object, 'config instanceof Object');
        debug('test:server')('%o', container.get<object>('server.config').hasOwnProperty('env'), 'config has env property');

        debug('test:server')('%o', container.get<Router>('server.router') instanceof Router, 'router instanceof Router');
    }
}