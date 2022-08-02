import ContainerInterface from './ContainerInterface.js';

export default abstract class ContainerConfigureInterface {
    abstract configure(container: ContainerInterface): ContainerInterface;
}