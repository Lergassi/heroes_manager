import Container from '../../core/source/Container.js';
import AbstractContainerConfigure from '../../core/source/AbstractContainerConfigure.js';
import AutoIncrementIdGenerator from '../../core/source/AutoIncrementIdGenerator.js';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: Container): Container {

        return container;
    }
}