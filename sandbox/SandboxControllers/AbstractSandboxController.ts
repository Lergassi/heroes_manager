import _ from 'lodash';
import debug from 'debug';
import ContainerInterface from '../../core/source/ContainerInterface.js';

export default abstract class AbstractSandboxController {
    private _container: ContainerInterface;

    get container(): ContainerInterface {
        return this._container;
    }

    constructor(container: ContainerInterface) {
        this._container = container;
    }

    abstract run(): void;
}