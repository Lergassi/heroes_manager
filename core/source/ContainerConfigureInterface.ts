import ContainerInterface from './ContainerInterface.js';

// export default abstract class ContainerConfigureInterface {
export default interface ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface;
}