import Container from '../../core/source/Container.js';
import AbstractContainerConfigure from '../../core/source/AbstractContainerConfigure.js';
import AutoIncrementIDGenerator from '../../core/source/AutoIncrementIDGenerator.js';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: Container): Container {

        return container;
    }
}