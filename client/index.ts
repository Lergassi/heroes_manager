import ClientContainerConfigure from './app/ContainerConfigure.js';
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import Container from '../core/source/Container.js';
import BasicTestReactComponent from './public/BasicTestReactComponent.js';
import ClientRender from './public/ClientRender.js';
import debug from 'debug';

let container = new Container();

(new ClientContainerConfigure()).configure(container);

debug.enable('*');

let appRender = new ClientRender();
appRender.render();