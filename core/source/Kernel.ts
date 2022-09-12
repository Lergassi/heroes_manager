import ContainerInterface from './ContainerInterface.js';

export enum GameState {

}

export default class Kernel {
    private _container: ContainerInterface;

    constructor(container: ContainerInterface) {
        this._container = container;
    }
}