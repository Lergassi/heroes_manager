import ClientContainerConfigure from './app/ClientContainerConfigure.js';
import Container from '../core/source/Container.js';
import ClientRender from './public/ClientRender.js';
import debug from 'debug';
import _ from 'lodash';

let container = new Container();

(new ClientContainerConfigure()).configure(container);

let debugNamespaces = [
    'debug',
    'log',
    'log:*',
];
debug.enable(_.join(debugNamespaces, ','));

let appRender = new ClientRender();
appRender.render();

debug('log')('Создание клиенте завершено (index.js).');