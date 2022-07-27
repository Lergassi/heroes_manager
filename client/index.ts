import ClientContainerConfigure from './app/ContainerConfigure.js';
import CoreContainerConfigure from '../core/app/ContainerConfigure.js';
import Container from '../core/source/Container.js';

const container = new Container();
(new ClientContainerConfigure()).configure(container);

// const coreContainer = new CoreContainerConfigure();
// coreContainer.configure(container);