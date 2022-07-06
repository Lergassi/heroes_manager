import Container from './Container.js';

export default abstract class AbstractContainerConfigure {
    abstract configure(container: Container): Container;
}