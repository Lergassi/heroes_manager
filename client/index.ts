import ClientContainerConfigure from './app/ClientContainerConfigure.js';
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import Container from '../core/source/Container.js';
import BasicTestReactComponent from './public/BasicTestReactComponent.js';
import ClientRender from './public/ClientRender.js';
import debug from 'debug';
import _ from 'lodash';

let container = new Container();

(new ClientContainerConfigure()).configure(container);

let debugNamespaces = [
    'debug',
    'client:*',
    'core:*',
];
debug.enable(_.join(debugNamespaces, ','));

let appRender = new ClientRender();
appRender.render();