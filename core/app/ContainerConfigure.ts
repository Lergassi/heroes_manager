import Container from '../source/Container.js';
import AbstractContainerConfigure from '../source/AbstractContainerConfigure.js';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: Container): Container {
        return container;
    }
}