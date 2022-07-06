import Container from '../../core/source/Container.js';
import AbstractContainerConfigure from '../../core/source/AbstractContainerConfigure.js';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: Container): Container {
        return container;
    }
}