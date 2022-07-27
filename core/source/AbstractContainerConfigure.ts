import Container from './Container.js';
import ContainerInterface from './ContainerInterface.js';

export default abstract class AbstractContainerConfigure {
    abstract configure(container: ContainerInterface): ContainerInterface;
}